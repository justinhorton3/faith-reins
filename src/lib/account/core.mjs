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
  if (!UUID.test(member?.id || '') || member.status !== 'APPROVED') throw new AccountError(401, 'SIGN_IN_REQUIRED', 'Please sign in again to view your account.');
  return { id: member.id, contactId: UUID.test(member.contactId || '') ? member.contactId : '' };
}
export function ownsOrder(identity, order) {
  const buyer = order?.buyerInfo || {};
  if (buyer.memberId) return buyer.memberId === identity.id;
  return Boolean(identity.contactId && buyer.contactId === identity.contactId);
}
export function profileDTO(member) {
  return { firstName: member.contact?.firstName || '', lastName: member.contact?.lastName || '', nickname: member.profile?.nickname || '', phone: member.contact?.phones?.[0] || '', loginEmail: member.loginEmail || '', memberSince: member.createdDate || '' };
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
  return { id: member.id, contact, profile: { nickname: clean.nickname } };
}
