import { AccountError, memberIdentity, profileDTO } from '../lib/account/core.mjs';

export function accountJSON(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'private, no-store, max-age=0', Pragma: 'no-cache', Vary: 'Authorization', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
}
export async function handleAccountRequest(request, action, driver) {
  try {
    const authorization = request.headers.get('Authorization') || '';
    if (!/^Bearer [^\s]{16,16000}$/.test(authorization)) throw new AccountError(401, 'SIGN_IN_REQUIRED', 'Please sign in to view your account.');
    if (!['GET', 'PATCH'].includes(request.method)) throw new AccountError(405, 'METHOD_NOT_ALLOWED', 'This action is not supported.');
    const token = authorization.slice(7);
    const member = await driver.currentMember(token);
    const identity = memberIdentity(member);
    if (request.method === 'GET' && action === 'session') return accountJSON({ profile: profileDTO(member) });
    throw new AccountError(404, 'NOT_FOUND', 'This account page is not available.');
  } catch (error) {
    if (error instanceof AccountError) return accountJSON({ error: { code: error.code, message: error.message } }, error.status);
    return accountJSON({ error: { code: 'SERVICE_UNAVAILABLE', message: 'We could not load your account right now. Please try again or contact our team.' } }, 503);
  }
}
