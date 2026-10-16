import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
import CATEGORIES from '../src/lib/shop-category-pages.json' with { type: 'json' };
import { pages } from '../src/lib/pages-main.mjs';

const root=path.resolve(import.meta.dirname,'..');
const permanent=['men','women','kids','outerwear','hats','home-gifts'];
assert.deepEqual(CATEGORIES.map(c=>c.key), ['men','women','kids']);
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
console.log('Shop SEO category route contract: Men, Women and Kids verified.');
