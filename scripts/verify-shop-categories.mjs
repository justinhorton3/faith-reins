import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { shopCategories, productsForCategory } from '../src/lib/shop-categories.mjs';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
const wix = process.argv.includes('--wix');
const url = route => route + (wix ? '.html' : '');
const file = route => path.join('dist', route.slice(1) + (wix ? '.html' : '/index.html'));
const routes = new Set(shopCategories.map(c => c.route));
assert.equal(routes.size, shopCategories.length, 'Duplicate category route');
const heroes = new Set();
for (const category of shopCategories) {
  const products = productsForCategory(category);
  assert.ok(products.length, `${category.key}: empty category`);
  assert.equal(products.length, category.products.length, `${category.key}: missing or duplicate products`);
  assert.ok(category.route.startsWith('/shop/'));
  for (const image of [category.hero.desktop, category.hero.mobile]) {
    assert.ok(fs.existsSync('public' + image), `${category.key}: missing image ${image}`);
    assert.ok(!heroes.has(image), `Reused hero: ${image}`);
    heroes.add(image);
  }
  const html = fs.readFileSync(file(category.route), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${category.key}: H1 count`);
  assert.ok(html.includes(`href="https://www.faithreins.com${url(category.route)}"`), `${category.key}: canonical`);
  assert.ok(html.includes(`content="https://www.faithreins.com${category.hero.desktop}"`), `${category.key}: social image`);
  assert.ok(!html.includes('name="robots" content="noindex'), `${category.key}: unexpectedly noindex`);
  const cards = [...html.matchAll(/class="merch-card" href="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(cards, products.map(p => url('/shop/' + p.slug)), `${category.key}: category product mismatch`);
  for (const c of shopCategories) assert.ok(html.includes(`href="${url(c.route)}"`), `${category.key}: category navigation`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const graph = schemas.find(s => s['@graph'])?.['@graph'];
  assert.ok(graph?.some(s => s['@type'] === 'CollectionPage'));
  const list = graph.find(s => s['@type'] === 'ItemList');
  assert.equal(list.numberOfItems, products.length);
  assert.deepEqual(list.itemListElement.map(i => i.url), products.map(p => 'https://www.faithreins.com' + url('/shop/' + p.slug)));
  assert.equal(graph.find(s => s['@type'] === 'BreadcrumbList').itemListElement.at(-1).item, 'https://www.faithreins.com' + url(category.route));
  if (category.key === 'outerwear') assert.ok(['quarter-zip','quilted-vest','heritage-hoodie','womens-hoodie','boys-hoodie','girls-hoodie'].every(slug => category.products.includes(slug)));
  if (category.key === 'kids') assert.ok(products.every(p => p.group === 'youth'));
  if (category.key === 'hats') assert.ok(products.every(p => p.collection === 'Headwear'));
}
for (const product of PRODUCTS) assert.equal(product.availability, 'out-of-stock', 'Purchasing state changed');
console.log(`Verified ${shopCategories.length} categories, ${heroes.size} distinct responsive hero assets, metadata, breadcrumbs, product membership and ${wix ? 'Wix' : 'Astro'} URLs.`);
