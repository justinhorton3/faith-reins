import { auth } from '@wix/essentials';
import { orders } from '@wix/ecom';
import { receipts } from '@wix/get-paid';
import { AccountError } from '../lib/account/core.mjs';

const API = 'https://www.wixapis.com';
async function memberRequest(token, path, body) {
  const response = await fetch(API + path, {
    method: body ? 'PATCH' : 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 401 || response.status === 403) throw new AccountError(401, 'SIGN_IN_REQUIRED', 'Please sign in again to view your account.');
  if (!response.ok) throw new Error('Member service unavailable');
  return response.json();
}
// Elevation is only reachable through the account handler after current-member verification.
export const accountDriver = {
  currentMember: async token => (await memberRequest(token, '/members/v1/members/my?fieldsets=FULL')).member,
  updateMember: async (token, member) => (await memberRequest(token, `/members/v1/members/${member.id}`, { member })).member,
  searchOrders: search => auth.elevate(orders.searchOrders)(search),
  getOrder: id => auth.elevate(orders.getOrder)(id),
  queryReceipts: query => auth.elevate(receipts.queryReceipts)(query),
};
