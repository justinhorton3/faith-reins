import { auth } from '@wix/essentials';
import { orders } from '@wix/ecom';
import { receipts } from '@wix/get-paid';
import { members } from '@wix/members';
import { AccountError } from '../lib/account/core.mjs';

// Elevation is only reachable through the account handler after current-member verification.
export const accountDriver = {
  currentMember: async () => {
    try { return (await members.getCurrentMember({ fieldsets: ['FULL'] })).member; }
    catch { throw new AccountError(401, 'SIGN_IN_REQUIRED', 'Please sign in again to view your account.'); }
  },
  updateMember: member => members.updateMember(member.id, { contact: member.contact, profile: member.profile }),
  searchOrders: search => auth.elevate(orders.searchOrders)(search),
  getOrder: id => auth.elevate(orders.getOrder)(id),
  queryReceipts: query => auth.elevate(receipts.queryReceipts)(query),
};
