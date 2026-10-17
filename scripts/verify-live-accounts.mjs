import assert from 'node:assert/strict';

const origin = process.argv[2] || 'https://www.faithreins.com';
const routes = ['/account', '/account/orders', '/account/giving', '/account/recurring', '/account/profile', '/account/order'];
const get = path => fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000), headers: { 'Cache-Control': 'no-cache' } });
for (const route of routes) {
  const response = await get(route + '.html');
  assert.equal(response.status, 200, `Account route unavailable: ${route}`);
  const html = await response.text();
  assert.match(html, /name="robots"[^>]*content="[^"]*noindex/, 'Account must remain noindex');
  assert.ok(html.includes('/api/auth/login?returnToUrl='), 'Native sign-in entry missing');
  assert.ok(html.includes('data-mega-menu="involved"'), 'Approved navigation missing');
}
for (const path of ['/api/account/session', '/api/account/orders?kind=shop', '/api/account/orders?kind=giving', '/api/account/orders?kind=recurring']) {
  const response = await get(path);
  assert.equal(response.status, 401, `Signed-out access was not rejected: ${path}`);
  assert.equal((await response.json()).error?.code, 'SIGN_IN_REQUIRED');
  assert.match(response.headers.get('cache-control') || '', /no-store/);
  assert.match(response.headers.get('vary') || '', /cookie/i);
}
for (const path of ['/_worker.js/index.js', '/.wix-server/index.js', '/.env.local']) {
  const response = await get(path);
  assert.equal(response.ok, false, `Private build file is publicly accessible: ${path}`);
}
console.log(`Account deployment verified at ${origin}: six noindex pages, native sign-in, four protected reads and private build files.`);
