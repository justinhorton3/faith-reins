import { AccountError, memberIdentity, profileDTO, profilePatch, history, ownedOrder, orderReceipts, invalid } from '../lib/account/core.mjs';

export function accountJSON(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'private, no-store, max-age=0', Pragma: 'no-cache', Vary: 'Cookie', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
}
export async function handleAccountRequest(request, action, driver) {
  try {
    if (!['GET', 'PATCH'].includes(request.method)) throw new AccountError(405, 'METHOD_NOT_ALLOWED', 'This action is not supported.');
    const member = await driver.currentMember();
    const identity = memberIdentity(member);
    if (request.method === 'GET' && action === 'session') return accountJSON({ profile: profileDTO(member) });
    const url = new URL(request.url);
    if (request.method === 'GET' && action === 'orders') {
      if ([...url.searchParams.keys()].some(key => !['kind', 'cursor'].includes(key))) throw invalid('Please use the account history controls.');
      return accountJSON(await history(driver, identity, url.searchParams.get('kind') || 'all', url.searchParams.get('cursor') || ''));
    }
    const record = action.match(/^orders\/([^/]+)(\/receipts)?$/);
    if (request.method === 'GET' && record) {
      if (url.search) throw invalid('Please open the order from your account.');
      return accountJSON(record[2] ? await orderReceipts(driver, identity, record[1]) : { order: await ownedOrder(driver, identity, record[1]) });
    }
    if (request.method === 'PATCH' && action === 'profile') {
      if (request.headers.get('Origin') !== url.origin) throw new AccountError(403, 'INVALID_ORIGIN', 'Please save your profile from your Faith Reins account.');
      if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) throw invalid('Please use the profile form.');
      if (Number(request.headers.get('Content-Length')) > 4096) throw invalid('The profile form is too large.');
      const text = await request.text();
      if (new TextEncoder().encode(text).byteLength > 4096) throw invalid('The profile form is too large.');
      let input;
      try { input = JSON.parse(text); } catch { throw invalid('Please check the profile form.'); }
      await driver.updateMember(profilePatch(input, member));
      const updated = await driver.currentMember();
      memberIdentity(updated);
      return accountJSON({ profile: profileDTO(updated) });
    }
    throw new AccountError(404, 'NOT_FOUND', 'This account page is not available.');
  } catch (error) {
    if (error instanceof AccountError) return accountJSON({ error: { code: error.code, message: error.message } }, error.status);
    return accountJSON({ error: { code: 'SERVICE_UNAVAILABLE', message: 'We could not load your account right now. Please try again or contact our team.' } }, 503);
  }
}
