import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { NAVIGATION, POLICY_LINKS, matchesNavigation } from '../src/lib/navigation.mjs';
import { pages } from '../src/lib/build.mjs';
import { header, footer } from '../src/lib/lib.mjs';

const root = path.resolve(import.meta.dirname, '..');
const expected = ['About', 'Therapies', 'For Families', 'For Providers', 'Get Involved', 'Shop'];
assert.deepEqual(NAVIGATION.map(group => group.label), expected);
const byRoute = new Map(pages.map(page => [page.route, page]));
assert.equal(byRoute.size, pages.length, 'Duplicate page routes');
const destinations = new Set(['/account', '/site-map', '/get-involved', '/volunteer', '/give', '/contact', ...POLICY_LINKS.map(link => link[1])]);
for (const group of NAVIGATION) {
  destinations.add(group.href); destinations.add(group.action[1]);
  for (const link of group.links) {
    destinations.add(link.href);
    assert.ok(fs.existsSync(path.join(root, 'public', link.image)), `Missing menu photo ${link.image}`);
  }
}
for (const target of destinations) {
  const [route, fragment] = target.split('#');
  const page = byRoute.get(route);
  assert.ok(page, `Menu destination is missing: ${target}`);
  if (fragment) assert.ok(page.body.includes(`id="${fragment}"`), `Missing section: ${target}`);
  const built = path.join(root, 'dist', `${route.slice(1)}.html`);
  assert.ok(fs.existsSync(built), `Missing hosted page ${built}; run build and wix-postbuild first`);
  const html = fs.readFileSync(built, 'utf8');
  if (fragment) assert.ok(html.includes(`id="${fragment}"`), `Missing hosted section: ${target}`);
}
const shell = header('/get-involved');
assert.equal((shell.match(/data-mega-menu=/g) || []).length, 6);
assert.equal((shell.match(/data-mobile-group/g) || []).length, 6);
const utility = shell.split('<header')[0];
assert.ok(utility.includes('href="/account"'));
assert.ok(!utility.includes('/for-referring-providers'), 'Provider utility duplicate returned');
assert.ok(!shell.includes('>Our Horses<span'), 'Horses should be inside About');
assert.ok(footer().includes('aria-label="Footer sitemap"'));
for (const page of pages) {
  const owners = NAVIGATION.filter(group => matchesNavigation(page.route, group));
  assert.ok(owners.length <= 1, `Competing menu ownership: ${page.route}`);
}
const account = byRoute.get('/account');
assert.ok(account.seo.noindex, 'Account page must not be indexed');
assert.ok(account.body.includes('data-account-login'), 'Real login entry missing');
assert.ok(account.body.includes('Giving support') && account.body.includes('Order help'));
const home = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
for (const target of destinations) {
  const [route, fragment] = target.split('#');
  if (!fragment) assert.ok(home.includes(`href="${route}.html"`) || route === '/site-map', `Hosted link missing: ${route}`);
}
console.log(`Persona sitemap verified: six menus, ${destinations.size} destinations/sections, account entry and shared footer.`);
