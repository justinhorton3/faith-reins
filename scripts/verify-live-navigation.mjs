import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { NAVIGATION, POLICY_LINKS } from '../src/lib/navigation.mjs';

const origin = process.argv[2] || 'https://www.faithreins.com';
const targets = [...new Set(['/account', '/site-map', '/get-involved', '/volunteer', '/give', '/contact', ...POLICY_LINKS.map(x => x[1]), ...NAVIGATION.flatMap(x => [x.href, x.action[1], ...x.links.map(link => link.href)])])];
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
async function get(path) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(20000), headers: { 'Cache-Control': 'no-cache' } });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}
async function verify() {
  const home = await (await get('/')).text();
  for (const group of NAVIGATION) assert.ok(home.includes(`data-mega-menu="${group.id}"`), `Missing ${group.label} menu`);
  assert.ok(home.includes('/account.html'), 'Hosted account link missing');
  for (let i = 0; i < targets.length; i += 6) {
    await Promise.all(targets.slice(i, i + 6).map(async target => {
      const [route, fragment] = target.split('#');
      const html = await (await get(route + '.html')).text();
      if (fragment) assert.ok(html.includes(`id="${fragment}"`), `Missing live section ${target}`);
      if (route === '/account') {
        assert.match(html, /name="robots"[^>]*content="[^"]*noindex/, 'Account must remain noindex');
        assert.ok(html.includes('data-account-login'), 'Account sign-in entry missing');
      }
      if (route === '/shop') assert.ok(html.includes('/assets/shop/v7/barn-collection.webp'), 'Approved Shop hero missing');
    }));
  }
  const hats = await (await get('/shop/hats.html')).text();
  assert.ok(hats.includes('hats-ranch-desktop.webp') && hats.includes('hats-ranch-mobile.webp'), 'Approved Hats heroes missing');
  for (const asset of ['/assets/shop/v7/barn-collection.webp', '/assets/shop/v7/heroes/hats-ranch-desktop.webp', '/assets/shop/v7/heroes/hats-ranch-mobile.webp']) {
    const bytes = Buffer.from(await (await get(asset)).arrayBuffer());
    assert.equal(sha(bytes), sha(fs.readFileSync(new URL('../public' + asset, import.meta.url))), `Live asset differs: ${asset}`);
  }
  console.log(`Deployment verified at ${origin}: six menus, ${targets.length} destinations/sections, account entry and three approved hero assets.`);
}
let error;
for (let attempt = 1; attempt <= 6; attempt++) {
  try { await verify(); error = null; break; }
  catch (failure) {
    error = failure;
    console.error(`Verification attempt ${attempt}: ${failure.message}`);
    if (attempt < 6) await new Promise(resolve => setTimeout(resolve, 10000));
  }
}
if (error) throw error;
