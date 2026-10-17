import test from 'node:test';
import assert from 'node:assert/strict';
import { handleAccountRequest } from '../src/server/account-handler.mjs';
import { AccountError, ownsOrder, memberIdentity, profilePatch, orderQuery, orderDTO, STORES_APP, DONATIONS_APP } from '../src/lib/account/core.mjs';

const alice = { id: '11111111-1111-4111-8111-111111111111', contactId: '22222222-2222-4222-8222-222222222222', status: 'APPROVED', loginEmailVerified: true, loginEmail: 'member-a@example.test', contact: { firstName: 'Member A', phones: ['555-0101', '555-0102'] } };
const bob = { id: '33333333-3333-4333-8333-333333333333', contactId: '44444444-4444-4444-8444-444444444444', status: 'APPROVED', loginEmailVerified: true };
const request = (path = 'session', options = {}) => new Request('https://www.faithreins.com/api/account/' + path, { headers: { Authorization: 'Bearer controlled-test-member-token' }, ...options });

test('signed-out requests are rejected before business data is queried', async () => {
  let called = false;
  const result = await handleAccountRequest(new Request('https://www.faithreins.com/api/account/orders'), 'orders', { currentMember: async () => { throw new AccountError(401, 'SIGN_IN_REQUIRED', 'Please sign in.'); }, searchOrders() { called = true; } });
  assert.equal(result.status, 401); assert.equal(called, false);
  assert.match(result.headers.get('Cache-Control'), /private, no-store/);
});
test('invalid and blocked member identities cannot open a session', async () => {
  for (const member of [{}, { ...alice, status: 'BLOCKED' }, { ...alice, id: '' }]) {
    const result = await handleAccountRequest(request(), 'session', { currentMember: async () => member });
    assert.equal(result.status, 401);
  }
});
test('session returns only the account profile allowlist', async () => {
  const result = await handleAccountRequest(request(), 'session', { currentMember: async () => ({ ...alice, privateNotes: 'never return', contact: { ...alice.contact, customFields: { medicalDetails: 'never return' } } }) });
  const body = await result.json();
  assert.equal(body.profile.firstName, 'Member A');
  assert.ok(!JSON.stringify(body).includes('never return'));
  assert.ok(!JSON.stringify(body).includes(alice.contactId));
  assert.equal(result.headers.get('Vary'), 'Cookie');
});
test('member and trusted contact ownership cannot be overridden by email or a conflicting member ID', () => {
  const identity = memberIdentity(alice);
  assert.equal(ownsOrder(identity, { buyerInfo: { memberId: alice.id } }), true);
  assert.equal(ownsOrder(identity, { buyerInfo: { contactId: alice.contactId } }), true);
  assert.equal(ownsOrder(identity, { buyerInfo: { memberId: bob.id, contactId: alice.contactId } }), false);
  assert.equal(ownsOrder(identity, { buyerInfo: { email: alice.loginEmail } }), false);
  assert.equal(ownsOrder(identity, { buyerInfo: { contactId: bob.contactId } }), false);
});
test('profile writes cannot inject identity fields or replace additional phone numbers', () => {
  const fields = { firstName: 'New', lastName: 'Name', nickname: 'New Name', phone: '+1 555-0103' };
  assert.throws(() => profilePatch({ ...fields, id: bob.id }, alice));
  assert.throws(() => profilePatch({ ...fields, loginEmail: 'other@example.test' }, alice));
  const patch = profilePatch(fields, alice);
  assert.equal(patch.id, alice.id); assert.deepEqual(patch.contact.phones, ['+1 555-0103', '555-0102']);
});
test('unexpected upstream errors do not reveal tokens or customer records', async () => {
  const result = await handleAccountRequest(request(), 'session', { currentMember: async () => { throw new Error('secret-token/customer-record'); } });
  assert.equal(result.status, 503); assert.ok(!(await result.text()).includes('secret-token'));
});

const orderId = '55555555-5555-4555-8555-555555555555';
const order = (buyerInfo = { memberId: alice.id }, appId = STORES_APP) => ({ _id: orderId, number: '1001', buyerInfo, currency: 'USD', paymentStatus: 'PAID', status: 'APPROVED', priceSummary: { total: { amount: '25.00' } }, lineItems: [{ productName: { original: 'Faith Reins gift' }, quantity: 1, catalogReference: { appId, catalogItemId: 'campaign', options: appId === DONATIONS_APP ? { frequency: 'MONTH' } : {} }, totalPriceAfterTax: { amount: '25.00' } }] });
const driver = extras => ({ currentMember: async () => alice, searchOrders: async () => ({ orders: [order()], metadata: {} }), getOrder: async () => order(), ...extras });

test('unverified email cannot reveal pre-existing contact-linked records', async () => {
  let queried = false;
  const result = await handleAccountRequest(request('orders'), 'orders', driver({ currentMember: async () => ({ ...alice, loginEmailVerified: false }), searchOrders: async () => { queried = true; } }));
  assert.equal(result.status, 403); assert.equal(queried, false);
  assert.equal((await result.json()).error.code, 'EMAIL_VERIFICATION_REQUIRED');
});
test('history query has fixed ownership and catalog restrictions', () => {
  const query = orderQuery(memberIdentity(alice), 'giving');
  assert.equal(query.cursorPaging.limit, 20);
  assert.deepEqual(query.filter.$and[0].$or, [{ 'buyerInfo.memberId': { $eq: alice.id } }, { 'buyerInfo.contactId': { $eq: alice.contactId } }]);
  assert.deepEqual(query.filter.$and[1], { 'lineItems.catalogReference.appId': { $hasSome: [DONATIONS_APP] } });
  assert.throws(() => orderQuery(memberIdentity(alice), 'admin'));
  assert.throws(() => orderQuery(memberIdentity(alice), 'all', 'x'.repeat(16001)));
});
test('a forged cursor cannot return another member’s order', async () => {
  const result = await handleAccountRequest(request('orders?cursor=forged'), 'orders', driver({ searchOrders: async () => ({ orders: [order({ memberId: bob.id, email: alice.loginEmail })] }) }));
  assert.equal(result.status, 404); assert.ok(!(await result.text()).includes('1001'));
});
test('browser-selected owner filters are rejected before order search', async () => {
  let queried = false;
  const result = await handleAccountRequest(request('orders?memberId=' + bob.id), 'orders', driver({ searchOrders: async () => { queried = true; } }));
  assert.equal(result.status, 400); assert.equal(queried, false);
});
test('order details and receipts require ownership before receipt lookup', async () => {
  let queried = false;
  for (const action of ['orders/' + orderId, 'orders/' + orderId + '/receipts']) {
    const result = await handleAccountRequest(request(action), action, driver({ getOrder: async () => order({ memberId: bob.id }), queryReceipts: async () => { queried = true; } }));
    assert.equal(result.status, 404); assert.ok(!(await result.text()).includes('1001'));
  }
  assert.equal(queried, false);
});
test('invalid detail IDs do not call a privileged lookup', async () => {
  let queried = false;
  const action = 'orders/not-a-guid';
  const result = await handleAccountRequest(request(action), action, driver({ getOrder: async () => { queried = true; } }));
  assert.equal(result.status, 404); assert.equal(queried, false);
});
test('receipt lookup returns only issued, safe documents for the owned order', async () => {
  const receipt = { sourceReference: { externalReferenceId: orderId, receiptOrderType: 'WIX_ECOM' }, customer: { contactId: alice.contactId }, numbering: { displayNumber: 'R-1001' }, document: { status: 'AVAILABLE', downloadUrl: 'https://files.wixstatic.com/receipt.pdf' } };
  const action = 'orders/' + orderId + '/receipts';
  const result = await handleAccountRequest(request(action), action, driver({ queryReceipts: async query => {
    assert.deepEqual(query.filter, { 'sourceReference.externalReferenceId': { $eq: orderId } });
    return { receipts: [receipt, { ...receipt, customer: { contactId: bob.contactId } }, { ...receipt, document: { status: 'PROCESSING' } }, { ...receipt, document: { status: 'AVAILABLE', downloadUrl: 'javascript:alert(1)' } }, { ...receipt, sourceReference: { ...receipt.sourceReference, externalReferenceId: bob.id } }] };
  } }));
  const data = await result.json(); assert.equal(data.receipts.length, 1); assert.equal(data.receipts[0].number, 'R-1001');
  assert.ok(!JSON.stringify(data).includes(alice.contactId));
});
test('unrelated or clinical catalog records are excluded', () => {
  assert.equal(orderDTO(memberIdentity(alice), order({ memberId: alice.id }, 'unrelated-service')), null);
  const mixed = order(); mixed.lineItems.push({ catalogReference: { appId: 'unrelated-service' } });
  assert.equal(orderDTO(memberIdentity(alice), mixed), null);
});
test('history preserves pagination without exposing buyer or billing details', async () => {
  const raw = order(); raw.billingInfo = { secret: 'private-billing' }; raw.buyerInfo.email = alice.loginEmail;
  const result = await handleAccountRequest(request('orders'), 'orders', driver({ searchOrders: async () => ({ orders: [raw], metadata: { hasNext: true, cursors: { next: 'next-page' } } }) }));
  const data = await result.json(); assert.equal(data.orders.length, 1); assert.equal(data.nextCursor, 'next-page');
  assert.ok(!JSON.stringify(data).includes('private-billing')); assert.ok(!JSON.stringify(data).includes(alice.loginEmail));
});
test('profile writes require same-origin JSON and only update the current member', async () => {
  let updates = 0; let changed = false;
  const fields = { firstName: 'Updated', lastName: 'Name', nickname: 'Updated Name', phone: '' };
  const adapters = driver({ currentMember: async () => changed ? { ...alice, contact: { ...alice.contact, firstName: 'Updated' } } : alice, updateMember: async patch => { assert.equal(patch.id, alice.id); updates++; changed = true; } });
  const send = (origin, body = fields) => handleAccountRequest(request('profile', { method: 'PATCH', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }), 'profile', adapters);
  assert.equal((await send('https://other.example')).status, 403);
  assert.equal((await send('https://www.faithreins.com', { ...fields, memberId: bob.id })).status, 400);
  assert.equal(updates, 0);
  const response = await send('https://www.faithreins.com');
  assert.equal(response.status, 200); assert.equal(updates, 1); assert.equal((await response.json()).profile.firstName, 'Updated');
});
test('oversized and malformed profile requests cannot write', async () => {
  let wrote = false;
  for (const body of ['{bad', 'x'.repeat(4097)]) {
    const result = await handleAccountRequest(request('profile', { method: 'PATCH', headers: { Origin: 'https://www.faithreins.com', 'Content-Type': 'application/json' }, body }), 'profile', driver({ updateMember: async () => { wrote = true; } }));
    assert.equal(result.status, 400);
  }
  assert.equal(wrote, false);
});
