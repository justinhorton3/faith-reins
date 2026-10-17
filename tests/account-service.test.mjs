import test from 'node:test';
import assert from 'node:assert/strict';
import { handleAccountRequest } from '../src/server/account-handler.mjs';
import { ownsOrder, memberIdentity, profilePatch } from '../src/lib/account/core.mjs';

const alice = { id: '11111111-1111-4111-8111-111111111111', contactId: '22222222-2222-4222-8222-222222222222', status: 'APPROVED', loginEmail: 'member-a@example.test', contact: { firstName: 'Member A', phones: ['555-0101', '555-0102'] } };
const bob = { id: '33333333-3333-4333-8333-333333333333', contactId: '44444444-4444-4444-8444-444444444444', status: 'APPROVED' };
const request = (path = 'session', options = {}) => new Request('https://www.faithreins.com/api/account/' + path, { headers: { Authorization: 'Bearer controlled-test-member-token' }, ...options });

test('signed-out requests are rejected before a privileged adapter is reached', async () => {
  let called = false;
  const result = await handleAccountRequest(new Request('https://www.faithreins.com/api/account/session'), 'session', { currentMember() { called = true; } });
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
  assert.equal(result.headers.get('Vary'), 'Authorization');
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
