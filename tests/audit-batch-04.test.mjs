import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
import LEGACY from '../src/lib/legacy-product-routes.json' with { type: 'json' };
import CATEGORIES from '../src/lib/shop-category-pages.json' with { type: 'json' };
import { productShowcase } from '../src/lib/product-showcase.mjs';
import { productGuide } from '../src/lib/product-guide.mjs';
import { legacyProductAlternatives, retainedLegacyRoutes } from '../src/lib/legacy-product-alternatives.mjs';
import { isIndexableRoute } from '../src/lib/indexability.mjs';
import { pages } from '../src/lib/build.mjs';
import { form } from '../src/lib/lib.mjs';
import { RECURRING_GIFT_HELP } from '../src/lib/giving-support.mjs';
import { inspectPublishedMetadata, auditLiveMetadata } from '../scripts/audit-live-metadata.mjs';
import { heroSocialImage } from '../src/lib/social-image.mjs';

const settle = async () => { for (let i = 0; i < 12; i++) await new Promise(resolve => setImmediate(resolve)); };
function dom(t, markup, pathname = '/') {
  const { document, window } = parseHTML('<!doctype html><html><body>' + markup + '</body></html>');
  const keys = ['document', 'window', 'location', 'fetch'];
  const old = Object.fromEntries(keys.map(key => [key, globalThis[key]]));
  Object.assign(globalThis, { document, window, location: new URL('https://example.test' + pathname) });
  t.after(() => { for (const key of keys) old[key] === undefined ? delete globalThis[key] : globalThis[key] = old[key]; });
  return { document, window };
}
function schema() {
  const definitions = [
    ['name', 'Your name', 'TEXT_INPUT', 'UNKNOWN_FORMAT', true],
    ['email', 'Email', 'TEXT_INPUT', 'EMAIL', true],
    ['select', 'Topic', 'DROPDOWN', 'UNKNOWN_FORMAT', true],
    ['radio', 'Contact preference', 'RADIO_GROUP', 'UNKNOWN_FORMAT', true],
    ['checks', 'Interests', 'CHECKBOX_GROUP', 'UNKNOWN_FORMAT', true],
    ['check', 'Contact permission', 'CHECKBOX', 'UNKNOWN_FORMAT', true],
    ['notes', 'Old notes', 'TEXT_AREA', 'UNKNOWN_FORMAT', false],
  ];
  return { formFields: definitions.map(([target, label, ct, format, required]) => ({
    fieldType: 'INPUT', identifier: ct, inputOptions: { target, required, stringOptions: {
      componentType: ct === 'TEXT_AREA' ? 'TEXT_INPUT' : ct, validation: { format },
      componentOptions: { label, options: [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }] },
    } },
  })) };
}
async function formFixture(t, instances = 1) {
  const f = dom(t, Array.from({ length: instances }, () => form('appointment', { purpose: 'callback', submit: 'Send', success: 'Received' })).join(''));
  f.requests = [];
  globalThis.fetch = async (url, options = {}) => {
    const body = options.body && JSON.parse(options.body);
    f.requests.push({ url, method: options.method || 'GET', body });
    const value = url.endsWith('/oauth2/token') ? { access_token: 'test-token', expires_in: 3600 } : url.includes('/form-schema-service/') ? { form: schema() } : url.endsWith('/submissions') ? { submission: { status: 'CONFIRMED' } } : null;
    assert.ok(value, 'Unexpected network request: ' + url);
    return { ok: true, json: async () => value };
  };
  await import('../src/scripts/site.js?audit04=' + Math.random()); await settle();
  for (const form of f.document.querySelectorAll('form')) form.reset = () => {};
  f.event = (node, name) => node.dispatchEvent(new f.window.Event(name, { cancelable: true }));
  return f;
}

test('required semantics and descriptions cover text, select, radio, checkbox groups and callback help', async t => {
  const { document } = await formFixture(t);
  const fields = [...document.querySelectorAll('.field')];
  for (const field of fields) for (const control of field.querySelectorAll('input,select,textarea')) {
    assert.equal(control.getAttribute('aria-invalid'), 'false');
    for (const id of control.getAttribute('aria-describedby').split(/\s+/)) assert.ok(document.getElementById(id));
  }
  for (const index of [0, 1, 2, 3, 5]) for (const control of fields[index].querySelectorAll('input,select')) {
    assert.ok(control.hasAttribute('required'));
    assert.equal(control.getAttribute('aria-required'), 'true');
  }
  assert.equal(fields[3].querySelector('fieldset').getAttribute('aria-required'), 'true');
  assert.match(fields[4].textContent, /Required. Select at least one/);
  assert.ok([...fields[4].querySelectorAll('input')].every(input => !input.hasAttribute('required') && !input.hasAttribute('aria-required')));
  const textarea = document.querySelector('textarea');
  assert.ok(!textarea.hasAttribute('required'));
  assert.match(document.getElementById(textarea.getAttribute('aria-describedby').split(' ')[0]).textContent, /Do not include medical/);
});

test('form errors stay associated, focus the first error and clear after correction without requiring every checkbox', async t => {
  const f = await formFixture(t), fields = [...f.document.querySelectorAll('.field')];
  const first = fields[0].querySelector('input'); let focused = false; first.focus = () => { focused = true; };
  f.event(f.document.querySelector('form'), 'submit'); await settle();
  assert.equal(focused, true);
  for (const field of fields.slice(0, 6)) {
    const error = field.querySelector('.error');
    assert.equal(error.hidden, false);
    assert.match(error.textContent, /required/);
    assert.ok([...field.querySelectorAll('input,select')].every(input => input.getAttribute('aria-invalid') === 'true'));
  }
  const description = first.getAttribute('aria-describedby');
  first.value = '   '; f.event(first, 'input'); assert.equal(first.getAttribute('aria-invalid'), 'true');
  first.value = 'Test Visitor'; f.event(first, 'input');
  assert.equal(first.getAttribute('aria-describedby'), description);
  assert.equal(first.getAttribute('aria-invalid'), 'false'); assert.equal(fields[0].querySelector('.error').hidden, true);
  const email = fields[1].querySelector('input'); email.value = 'invalid'; f.event(email, 'input');
  assert.match(fields[1].querySelector('.error').textContent, /email address/);
  email.value = ' test@example.test '; f.event(email, 'input'); assert.equal(email.getAttribute('aria-invalid'), 'false');
  const select = fields[2].querySelector('select'); select.querySelector('option[value="a"]').selected = true; f.event(select, 'change');
  f.event(fields[3].querySelector('input'), 'change');
  const choice = fields[4].querySelector('input'); choice.checked = true; choice.setAttribute('checked', ''); f.event(choice, 'change');
  const check = fields[5].querySelector('input'); check.checked = true; f.event(check, 'change');
  f.event(f.document.querySelector('form'), 'submit'); await settle();
  const sent = f.requests.find(request => request.url.endsWith('/submissions'));
  assert.ok(sent, 'One checked interest should satisfy the group');
  assert.deepEqual(sent.body.submission.submissions, { name: 'Test Visitor', email: 'test@example.test', select: 'a', radio: 'a', checks: ['a'], check: true });
});

test('multiple form instances have unique IDs and keep descriptions inside their own form', async t => {
  const { document } = await formFixture(t, 2);
  const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const control of document.querySelectorAll('input,select,textarea')) for (const id of control.getAttribute('aria-describedby').split(' ')) assert.equal(document.getElementById(id).closest('form'), control.closest('form'));
});

test('actual product interaction updates guide labels, title and close name when a variant has no measurements', async t => {
  const product = PRODUCTS.find(product => product.slug === 'mens-polo');
  const { document } = dom(t, productShowcase(product).body);
  await import('../src/scripts/product-showcase.js?audit04=' + Math.random());
  assert.equal(document.querySelector('#pdp-size-guide').textContent, 'Size & fit guide');
  document.querySelector('[data-pdp-color="mens-cream-polo"]').click();
  assert.equal(document.querySelector('#pdp-size-guide').textContent, 'Size information');
  assert.equal(document.querySelector('#pdp-fit-guide').textContent, 'Open size information');
  assert.equal(document.querySelector('#pdp-guide-title').textContent, 'Size information');
  assert.equal(document.querySelector('#pdp-guide-close').getAttribute('aria-label'), 'Close size information');
  const active = [...document.querySelectorAll('[data-pdp-guide]')].filter(node => !node.hidden);
  assert.equal(active.length, 1); assert.equal(active[0].querySelector('table'), null);
  assert.match(active[0].textContent, /Reference sizes/);
  assert.equal(document.querySelector('#pdp-add-to-bag').disabled, true);
  document.querySelector('[data-pdp-color="mens-white-polo"]').click();
  assert.equal(document.querySelector('#pdp-guide-title').textContent, 'Size & fit guide');
});

test('catalog information labels preserve existing measurement tables and make no missing-dimensions promise', () => {
  let tables = 0;
  for (const product of PRODUCTS) {
    const { document } = parseHTML(productShowcase(product).body);
    assert.equal(document.querySelector('#pdp-size-guide').textContent, productGuide(product, product.variants[0]).label);
    for (const variant of product.variants) {
      const panel = document.querySelector(`[data-pdp-guide="${variant.id}"]`);
      assert.equal(!!panel.querySelector('table'), productGuide(product, variant).hasMeasurements);
      if (panel.querySelector('table')) tables++;
    }
  }
  assert.equal(tables, 2);
  assert.equal(productGuide(PRODUCTS.find(p => p.slug === 'coffee-mug'), PRODUCTS.find(p => p.slug === 'coffee-mug').variants[0]).label, 'Item information');
});

test('all retained legacy routes are excluded from indexing and lead to a relevant current category', () => {
  const legacy = LEGACY.filter(legacy => !PRODUCTS.some(product => product.slug === legacy.slug));
  assert.deepEqual(retainedLegacyRoutes.sort(), legacy.map(product => '/shop/' + product.slug).sort());
  for (const product of legacy) {
    const { category, suggestions } = legacyProductAlternatives(product.slug, PRODUCTS, CATEGORIES);
    assert.ok(suggestions.length && suggestions.every(product => category.products.includes(product.slug)));
    const page = pages.find(page => page.route === '/shop/' + product.slug);
    assert.equal(page.seo.noindex, true); assert.equal(isIndexableRoute(page.route), false);
    const { document } = parseHTML('<html><body>' + page.body + '</body></html>');
    assert.ok(document.querySelector(`a[href="${category.route}"]`));
    assert.match(document.body.textContent, /not currently available/);
  }
  for (const slug of ['beanie', 'keychains', 'stickers']) assert.ok(legacyProductAlternatives(slug, PRODUCTS, CATEGORIES).suggestions.every(product => product.collection !== 'Polos'));
  assert.throws(() => legacyProductAlternatives('unknown-item', PRODUCTS, CATEGORIES), /Choose a relevant category/);
});

test('authenticated recurring account stays read-only and provides the same assistance as the donation policy', async t => {
  const page = pages.find(page => page.route === '/account/recurring');
  const { document } = dom(t, page.body, '/account/recurring'); const requests = [];
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    const value = url.endsWith('/session') ? { profile: { firstName: 'Test', lastName: 'Visitor' } } : url.includes('/orders?kind=recurring') ? { orders: [], nextCursor: '' } : null;
    assert.ok(value, 'Unexpected account request: ' + url);
    return { ok: true, json: async () => value };
  };
  await import('../src/scripts/account.js?audit04=' + Math.random()); await settle();
  assert.match(document.querySelector('.account-note').textContent, /request a change or cancellation/);
  assert.ok(document.querySelector('.account-note a[href="/contact#account-help"]'));
  assert.ok(requests.length === 2 && requests.every(request => request.options.method === 'GET'));
  assert.ok(page.body.includes(RECURRING_GIFT_HELP));
  const policy = pages.find(page => page.route === '/donation-policy');
  assert.ok(policy.body.includes(RECURRING_GIFT_HELP));
  assert.ok(!policy.body.includes('by logging in to your donor account'));
});

test('metadata inspection distinguishes valid page SEO from duplicate injected or generic titles', () => {
  const page = { route: '/shop/example', title: 'Example Product | Shop | Faith Reins', description: 'Example description' };
  const html = `<html><head><title>${page.title}</title><link rel="canonical" href="https://www.faithreins.com/shop/example.html"><meta property="og:title" content="Example Product | Shop"><meta name="description" content="${page.description}"></head></html>`;
  assert.equal(inspectPublishedMetadata(html, page).passed, true);
  const duplicate = html.replace('</head>', '<title wix-seo-tag="true">Shop | Faith Reins</title><meta wix-seo-tag="true" property="og:title" content="Shop | Faith Reins"></head>');
  const result = inspectPublishedMetadata(duplicate, page);
  assert.equal(result.passed, false); assert.equal(result.counts.title, 2);
  assert.ok(result.issues.some(issue => issue.includes('page-specific source')));
});

test('social previews reuse each page hero instead of defaulting every service to the home image', () => {
  let heroes = 0;
  for (const page of pages) {
    if (!page.body.includes('class="hero__img"')) continue;
    const image = heroSocialImage(page.body);
    assert.ok(image && image.url.startsWith('https://www.faithreins.com/'));
    assert.ok(image.width > 0 && image.height > 0);
    heroes++;
  }
  assert.ok(heroes > 10);
  const speech = heroSocialImage(pages.find(page => page.route === '/speech-language-therapy').body);
  const home = heroSocialImage(pages.find(page => page.route === '/').body);
  assert.notEqual(speech.url, home.url);
  assert.equal(heroSocialImage('<p>No photo hero</p>'), null);
});

test('live metadata audit is a bounded read-only diagnostic and rejects unknown routes', async () => {
  const requests = [];
  const results = await auditLiveMetadata({ routes: ['/shop/mens-polo'], fetcher: async (url, options) => { requests.push({ url, options }); return { status: 503 }; } });
  assert.equal(results[0].passed, false);
  assert.equal(requests[0].options.redirect, 'manual');
  assert.equal(requests[0].options.method, undefined);
  await assert.rejects(auditLiveMetadata({ routes: ['https://example.test/private'], fetcher: async () => { throw new Error('Should not fetch'); } }), /Unknown registered route/);
});
