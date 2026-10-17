// Pure account rules. Production adapters live in src/server and never enter browser bundles.
export const DONATIONS_APP = '333b456e-dd48-4d6b-b32b-9fd48d74e163';
export const STORES_APP = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export class AccountError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
export const invalid = message => new AccountError(400, 'INVALID_REQUEST', message);
export const missing = () => new AccountError(404, 'NOT_FOUND', 'This record is not available in your account.');
export function memberIdentity(member) {
  const id = member?.id || member?._id;
  if (!UUID.test(id || '') || member.status !== 'APPROVED') throw new AccountError(401, 'SIGN_IN_REQUIRED', 'Please sign in again to view your account.');
  if (member.loginEmailVerified !== true) throw new AccountError(403, 'EMAIL_VERIFICATION_REQUIRED', 'Please verify your sign-in email before viewing private account records. Contact our team if you need help.');
  return { id, contactId: UUID.test(member.contactId || '') ? member.contactId : '' };
}
export function ownsOrder(identity, order) {
  const buyer = order?.buyerInfo || {};
  if (buyer.memberId) return buyer.memberId === identity.id;
  return Boolean(identity.contactId && buyer.contactId === identity.contactId);
}
export function profileDTO(member) {
  return { firstName: member.contact?.firstName || '', lastName: member.contact?.lastName || '', nickname: member.profile?.nickname || '', phone: member.contact?.phones?.[0] || '', loginEmail: member.loginEmail || '', memberSince: member.createdDate || member._createdDate || '' };
}
export function profilePatch(input, member) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(key => !['firstName', 'lastName', 'nickname', 'phone'].includes(key))) throw invalid('Please submit only the profile fields shown.');
  const clean = {};
  for (const key of ['firstName', 'lastName', 'nickname', 'phone']) {
    if (typeof input[key] !== 'string' || input[key].length > (key === 'phone' ? 40 : 80) || /[\u0000-\u001f\u007f<>]/.test(input[key])) throw invalid('Please check your name and phone details.');
    clean[key] = input[key].trim();
  }
  if (clean.phone && !/^[+()\d .-]{5,40}$/.test(clean.phone)) throw invalid('Please enter a valid phone number.');
  const contact = { firstName: clean.firstName, lastName: clean.lastName };
  if (clean.phone) contact.phones = [clean.phone, ...(member.contact?.phones || []).slice(1).filter(phone => phone !== clean.phone)];
  return { id: member.id || member._id, contact, profile: { nickname: clean.nickname } };
}

export function orderQuery(identity, kind = 'all', cursor = '') {
  if (!['all', 'shop', 'giving', 'recurring'].includes(kind) || typeof cursor !== 'string' || cursor.length > 16000 || /[\u0000-\u001f]/.test(cursor)) throw invalid('Please choose a valid account history page.');
  const owners = [{ 'buyerInfo.memberId': { $eq: identity.id } }];
  if (identity.contactId) owners.push({ 'buyerInfo.contactId': { $eq: identity.contactId } });
  const apps = kind === 'shop' ? [STORES_APP] : kind === 'all' ? [STORES_APP, DONATIONS_APP] : [DONATIONS_APP];
  return { filter: { $and: [{ $or: owners }, { 'lineItems.catalogReference.appId': { $hasSome: apps } }] }, sort: [{ fieldName: 'createdDate', order: 'DESC' }], cursorPaging: { limit: 20, ...(cursor ? { cursor } : {}) } };
}
const asDate = value => {
  const parsed = value instanceof Date ? value : new Date(value || '');
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : '';
};
const amount = value => typeof value?.amount === 'string' && /^-?\d+(\.\d+)?$/.test(value.amount) ? value.amount : null;
export function orderDTO(identity, order, kind = 'all') {
  if (!ownsOrder(identity, order)) throw missing();
  const lines = order.lineItems || [];
  if (!lines.length || lines.some(line => ![STORES_APP, DONATIONS_APP].includes(line.catalogReference?.appId))) return null;
  const wanted = lines.filter(line => kind === 'all' || (kind === 'shop' ? line.catalogReference.appId === STORES_APP : line.catalogReference.appId === DONATIONS_APP));
  const items = wanted.map(line => {
    const isGift = line.catalogReference.appId === DONATIONS_APP;
    const frequency = isGift && ['WEEK', 'MONTH', 'YEAR'].includes(line.catalogReference.options?.frequency) ? line.catalogReference.options.frequency : '';
    const subscriptionId = isGift && UUID.test(line.subscriptionInfo?.id || '') ? line.subscriptionInfo.id : '';
    return { name: String(line.productName?.original || (isGift ? 'Donation' : 'Shop item')).slice(0, 300), quantity: Number.isSafeInteger(line.quantity) && line.quantity > 0 ? line.quantity : 1, amount: amount(line.totalPriceAfterTax), kind: isGift ? 'giving' : 'shop', frequency, subscriptionId, subscriptionTitle: isGift ? String(line.subscriptionInfo?.subscriptionOptionTitle || '').slice(0, 150) : '' };
  }).filter(item => kind !== 'recurring' || item.frequency || item.subscriptionId);
  const id = order._id || order.id;
  if (!items.length || !UUID.test(id || '')) return null;
  return { id, number: String(order.number || '').slice(0, 60), date: asDate(order.purchasedDate || order._createdDate || order.createdDate), currency: /^[A-Z]{3}$/.test(order.currency || '') ? order.currency : '', total: amount(order.priceSummary?.total), paymentStatus: String(order.paymentStatus || 'UNKNOWN').slice(0, 40), fulfillmentStatus: String(order.fulfillmentStatus || 'UNKNOWN').slice(0, 40), status: String(order.status || 'UNKNOWN').slice(0, 40), items };
}
export async function ownedOrder(driver, identity, id) {
  if (!UUID.test(id || '')) throw missing();
  let raw;
  try { raw = await driver.getOrder(id); } catch (error) {
    if (error?.httpStatus === 404 || error?.details?.httpStatus === 404 || error?.status === 404) throw missing();
    throw error;
  }
  const data = orderDTO(identity, raw);
  if (!data) throw missing();
  return data;
}
export async function history(driver, identity, kind, cursor) {
  const result = await driver.searchOrders(orderQuery(identity, kind, cursor));
  const items = (result.orders || []).map(order => orderDTO(identity, order, kind)).filter(Boolean);
  const next = result.metadata?.hasNext && typeof result.metadata?.cursors?.next === 'string' ? result.metadata.cursors.next : '';
  return { orders: items, nextCursor: next };
}
export function receiptDTO(receipt, identity, orderId) {
  const source = receipt.sourceReference || {};
  if (source.externalReferenceId !== orderId || source.receiptOrderType !== 'WIX_ECOM') return null;
  if (receipt.customer?.contactId && receipt.customer.contactId !== identity.contactId) return null;
  if (receipt.document?.status !== 'AVAILABLE') return null;
  let url;
  try { url = new URL(receipt.document.downloadUrl); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password) return null;
  return { number: String(receipt.numbering?.displayNumber || receipt.numbering?.number || '').slice(0, 100), date: asDate(receipt._createdDate || receipt.createdDate), downloadUrl: url.href };
}
export async function orderReceipts(driver, identity, orderId) {
  await ownedOrder(driver, identity, orderId);
  const result = await driver.queryReceipts({ filter: { 'sourceReference.externalReferenceId': { $eq: orderId } }, cursorPaging: { limit: 100 } });
  return { receipts: (result.receipts || []).map(receipt => receiptDTO(receipt, identity, orderId)).filter(Boolean), moreAvailable: Boolean(result.pagingMetadata?.hasNext) };
}
