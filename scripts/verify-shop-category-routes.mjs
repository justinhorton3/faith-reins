import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
import CATEGORIES from '../src/lib/shop-category-pages.json' with { type: 'json' };
import { pages } from '../src/lib/pages-main.mjs';

const root=path.resolve(import.meta.dirname,'..');
const permanent=['men','women','kids','outerwear','hats','home-gifts'];
assert.deepEqual(CATEGORIES.map(c=>c.key), ['men','women','kids','outerwear','hats','home-gifts']);
assert.equal(new Set(CATEGORIES.map(c=>c.route)).size,CATEGORIES.length);
for(const category of CATEGORIES){
  assert.ok(permanent.includes(category.key));
  assert.equal(category.route,'/shop/'+category.key);
  assert.ok(category.title && category.heading && category.description && category.intro);
  assert.ok(pages.some(p=>p.route===category.route));
  assert.equal(new Set(category.products).size, category.products.length);
  for(const slug of category.products){ assert.ok(PRODUCTS.some(p=>p.slug===slug), 'Missing product '+slug); }
  for(const src of [category.hero.desktop,category.hero.mobile]){
    assert.ok(fs.existsSync(path.join(root,'public',src)), 'Missing approved hero '+src);
  }
  const built=path.join(root,'dist/shop',category.key+'.html');
  if(fs.existsSync(built)){
    const html=fs.readFileSync(built,'utf8');
    assert.ok(html.includes('https://www.faithreins.com/shop/'+category.key+'.html'), 'Host URL missing in '+built);
    assert.ok(html.includes('application/ld+json'), 'Structured data absent '+built);
    assert.ok(html.includes(category.hero.desktop) && html.includes(category.hero.mobile), 'Responsive hero absent '+built);
  }
}
const old=pages.find(p=>p.route==='/shop/mens');
assert.ok(old && old.seo.noindex && old.seo.canonicalRoute==='/shop/men', 'Old mens route must be noindex and point to men');
const shopPage=pages.find(p=>p.route==='/shop');
const hatsPage=CATEGORIES.find(c=>c.key==='hats');
assert.equal(hatsPage.hero.desktop,'/assets/shop/v7/heroes/hats-ranch-desktop.webp');
assert.equal(hatsPage.hero.mobile,'/assets/shop/v7/heroes/hats-ranch-mobile.webp');
assert.ok(shopPage?.body.includes('shop-category-tiles__grid'), 'Shop must show visual category navigation');
assert.ok(shopPage.body.includes('/assets/shop/v7/barn-collection.webp'), 'Shop photo must be original collection image');
assert.ok(!shopPage.body.includes('/assets/shop/v7/heroes/shop-desktop.webp'), 'Hats image must not be on Shop');
assert.ok(shopPage.body.indexOf('shop-category-tiles__grid') < shopPage.body.indexOf('id="shop-products"'), 'Visual categories must precede products');
assert.equal((shopPage.body.match(/class="shop-category-tile"/g)||[]).length, CATEGORIES.length, 'Six category tiles required');
const { header } = await import('../src/lib/lib.mjs');
const topNav=header('/shop/women');
assert.ok(topNav.includes('data-mega-menu="shop"'), 'Desktop Shop mega menu missing');
assert.ok(topNav.includes('data-mobile-group'), 'Mobile Shop group missing');
for (const c of CATEGORIES) {
  assert.ok(shopPage.body.includes('class="shop-category-tile" href="'+c.route+'"'), 'Missing tile '+c.key);
  assert.ok(topNav.includes('class="mega-card" href="'+c.route+'"'), 'Missing desktop menu '+c.key);
  assert.ok(topNav.includes('class="drawer-card" href="'+c.route+'"'), 'Missing mobile menu '+c.key);
}
const shopBuilt=path.join(root,'dist/shop.html');
if (fs.existsSync(shopBuilt)) {
  const html=fs.readFileSync(shopBuilt,'utf8');
  assert.ok(html.indexOf('shop-category-tiles__grid') < html.indexOf('id="shop-products"'));
  for (const c of CATEGORIES) assert.ok(html.includes('class="shop-category-tile" href="'+c.route+'.html"'), 'Missing hosted category tile '+c.key);
}
console.log('Shop SEO category route contract: Men, Women, Kids, Outerwear, Hats and Home & Gifts verified.');
