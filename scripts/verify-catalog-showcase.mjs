import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/catalog-showcase-assets.json')));
const variants = PRODUCTS.flatMap(product => product.variants);
assert.equal(PRODUCTS.length, 18);
assert.equal(variants.length, 42);
assert.equal(new Set(PRODUCTS.map(product => product.slug)).size, 18);
assert.equal(new Set(variants.map(variant => variant.id)).size, 42);
assert.equal(manifest.assets.length, 84);
for (const product of PRODUCTS) {
  assert.equal(product.availability, 'out-of-stock');
  assert.equal(product.price, undefined, 'No unverified retail price');
  assert.ok(product.desc && product.fitNote && product.careNote);
  for (const variant of product.variants) {
    for (const view of ['product', 'styled']) {
      const image = variant.images[view];
      assert.ok(image.src.startsWith('/assets/shop/v7/'));
      const relative = 'public' + image.src;
      const record = manifest.assets.find(asset => asset.website === relative && asset.catalogId === variant.id && asset.view === view);
      assert.ok(record, `Missing provenance: ${relative}`);
      const bytes = fs.readFileSync(path.join(root, relative));
      assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), record.sha256, relative);
      assert.equal(bytes.subarray(1,4).toString(), 'PNG');
      assert.equal(bytes.readUInt32BE(16), image.width);
      assert.equal(bytes.readUInt32BE(20), image.height);
    }
    if (variant.guide) {
      assert.ok(['mens-white-polo','mens-forest-green-hoodie'].includes(variant.id));
      assert.ok(variant.guide.rows.every(row => variant.sizes.includes(row[0])));
    }
  }
}
// Inspect actual generated pages, including legacy URLs, for release blockers.
const htmlFiles = fs.readdirSync(path.join(root, 'dist/shop'), { recursive: true }).filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, 'dist/shop', file), 'utf8');
  assert.ok(!html.includes('schema.org/InStock'), file);
  assert.ok(!html.includes('Ships within 5–7 business days'), file);
  assert.ok(!html.includes('id="atb"'), 'Old add-to-bag path: ' + file);
}
console.log('Catalog verified: 18 families, 42 variants, 84 unchanged original images; ordering closed.');
