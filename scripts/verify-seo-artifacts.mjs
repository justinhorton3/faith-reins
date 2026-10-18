// Check the actual postbuilt output; independent of the broader audit branch.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parseHTML } from 'linkedom';
import { pages } from '../src/lib/build.mjs';
import { inspectPublishedMetadata } from './audit-live-metadata.mjs';

const dist = path.resolve(import.meta.dirname, '../dist');
for (const page of pages) {
  const file = path.join(dist, page.route === '/' ? 'index.html' : page.route.slice(1) + '.html');
  const html = fs.readFileSync(file, 'utf8');
  const result = inspectPublishedMetadata(html, page);
  assert.ok(result.passed, page.route + ': ' + result.issues.join('; '));
  const { document } = parseHTML(html);
  const noindex = [...document.querySelectorAll('meta[name="robots"]')].some(node => /\bnoindex\b/i.test(node.content));
  assert.equal(noindex, !!page.seo?.noindex, page.route + ': existing indexability must be preserved');
}
const { document: error } = parseHTML(fs.readFileSync(path.join(dist, '404.html'), 'utf8'));
assert.equal(error.querySelectorAll('head title').length, 1, '404 title');
assert.equal(error.querySelectorAll('head link[rel="canonical"]').length, 1, '404 canonical');
// Preserve main's existing error-page policy; the broader audit owns changes
// to indexability and error handling, not this isolated duplicate-tag fix.
assert.ok(error.querySelectorAll('meta[name="robots"]').length <= 1, '404 robots must not be duplicated');
console.log(`Source-owned SEO verified for ${pages.length} registered pages plus 404; existing noindex retained.`);
