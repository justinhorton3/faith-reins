import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { parseHTML } from 'linkedom';
import { inspectPublishedMetadata } from '../scripts/audit-live-metadata.mjs';

const repo = path.resolve(import.meta.dirname, '..');
const cleanCode = 'import sys; from scripts.seo_ownership import source_owned_seo; sys.stdout.write(source_owned_seo(sys.stdin.read())[0])';
const clean = html => execFileSync('python3', ['-c', cleanCode], { cwd: repo, input: html, encoding: 'utf8' });
const wrap = head => '<!doctype html><html><head>' + head + '</head><body>Unchanged body</body></html>';

test('ownership pass retains explicit source values and removes conflicting Wix SEO fields only', () => {
  const source = '<title>Exact source &amp; title</title><meta name="description" content="Source description"><link rel="canonical" href="https://www.faithreins.com/example"><meta property="og:title" content="Source social"><meta name="twitter:title" content="Source X">';
  const injected = '<title wix-seo-tag="true">Wrong title</title><meta wix-seo-tag="true" name="description" content="Wrong description"><link wix-seo-tag="true" rel="canonical" href="https://www.faithreins.com/wrong"><meta wix-seo-tag="true" property="og:title" content="Wrong social"><meta wix-seo-tag="true" name="twitter:title" content="Wrong X">';
  assert.equal(clean(wrap(source + injected)), wrap(source));
  assert.equal(clean(wrap(injected + source)), wrap(source));
});

test('ownership edits are byte-preserving for embeds, scripts, JSON-LD, verification, images and unmatched fields', () => {
  const source = '<title>Thérapie 🐎</title>\r\n<meta property="og:image" content="https://example.test/approved.webp">';
  const retained = '\r\n<!-- <title wix-seo-tag="true">comment</title> -->' +
    '<script>const x = "<title wix-seo-tag=\\"true\\">literal</title>";</script>' +
    '<script type="application/ld+json">{"name":"Example & Co","path":"/raw"}</script>' +
    '<script wix-seo-tag="true" type="application/ld+json">{"@type":"WebSite"}</script>' +
    '<meta wix-seo-tag="true" name="google-site-verification" content="verification-value">' +
    '<meta wix-seo-tag="true" property="og:locale" content="en_US">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<link rel="icon" href="/favicon.svg">';
  const injected = "<TITLE wix-seo-tag='true'>Wrong</TITLE>\r\n<meta property='og:image' wix-seo-tag='true' content='https://example.test/wrong.webp'/>";
  const original = wrap(source + retained + injected);
  const expected = wrap(source + retained + '\r\n');
  assert.equal(clean(original), expected);
});

test('ambiguous source ownership fails closed instead of deleting tags', () => {
  const cases = [
    wrap('<title wix-seo-tag="true">Only Wix</title>'),
    wrap('<title>A</title><title>B</title><title wix-seo-tag="true">C</title>'),
    wrap('<title> </title><title wix-seo-tag="true">C</title>'),
    wrap('<title>A</title><meta wix-seo-tag="true" name="description" content="No source">'),
    wrap('<title wix-seo-tag="false">Unknown owner</title>'),
    '<html><head><title>Unclosed</head><body></body></html>',
    wrap('<title>A</title><meta name="description" name="description" content="Ambiguous">'),
  ];
  for (const html of cases) {
    const result = spawnSync('python3', ['-c', cleanCode], { cwd: repo, input: html, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /SeoOwnershipError/);
  }
});

test('source noindex survives, stronger Wix robots restrictions block removal, and cleaning is idempotent', () => {
  const source = '<title>A</title><meta name="robots" content="noindex, nofollow">';
  const injected = '<title wix-seo-tag="true">B</title><meta wix-seo-tag="true" name="robots" content="none">';
  const once = clean(wrap(source + injected));
  assert.equal(once, wrap(source));
  assert.equal(clean(once), once);
  const stronger = spawnSync('python3', ['-c', cleanCode], { cwd: repo, input: wrap('<title>A</title><meta name="robots" content="index,follow"><meta wix-seo-tag="true" name="robots" content="noindex">'), encoding: 'utf8' });
  assert.notEqual(stronger.status, 0);
  assert.match(stronger.stderr, /weaken injected robots/);
  const unmatched = wrap('<title>A</title><meta wix-seo-tag="true" name="robots" content="noindex">');
  assert.equal(clean(unmatched), unmatched);
});

test('real hosting postbuild cleans before canonical conversion and preflights every file before writes', t => {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), 'fr-seo-ownership-'));
  t.after(() => fs.rmSync(dist, { recursive: true, force: true }));
  const page = wrap('<title>A</title><meta name="description" content="Description"><link rel="canonical" href="https://www.faithreins.com/example"><meta name="robots" content="noindex,follow"><title wix-seo-tag="true">B</title><link wix-seo-tag="true" rel="canonical" href="https://www.faithreins.com/example/">');
  fs.mkdirSync(path.join(dist, 'example'));
  fs.writeFileSync(path.join(dist, 'example/index.html'), page);
  fs.writeFileSync(path.join(dist, 'index.html'), wrap('<title>Home</title>'));
  fs.writeFileSync(path.join(dist, 'bad.html'), wrap('<title> </title><title wix-seo-tag="true">B</title>'));
  const blocked = spawnSync('python3', ['scripts/wix-postbuild.py', '--dist', dist], { cwd: repo, encoding: 'utf8' });
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr, /SEO ownership blocked publication/);
  assert.equal(fs.readFileSync(path.join(dist, 'example/index.html'), 'utf8'), page);
  fs.unlinkSync(path.join(dist, 'bad.html'));
  execFileSync('python3', ['scripts/wix-postbuild.py', '--dist', dist], { cwd: repo });
  const html = fs.readFileSync(path.join(dist, 'example.html'), 'utf8');
  const { document } = parseHTML(html);
  assert.equal(document.querySelectorAll('title').length, 1);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://www.faithreins.com/example.html');
  assert.equal(document.querySelector('meta[name="robots"]').content, 'noindex,follow');
  assert.equal(document.querySelectorAll('[wix-seo-tag]').length, 0);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dist, '_wix/pages.json'), 'utf8')), [{ path: '/', static: true }]);
  execFileSync('python3', ['scripts/wix-postbuild.py', '--dist', dist], { cwd: repo });
  assert.equal(fs.readFileSync(path.join(dist, 'example.html'), 'utf8'), html);
});

test('artifact and live verifier reject duplicate social images, URLs, X metadata and robots too', () => {
  const page = { route: '/example', title: 'Example | Faith Reins', description: 'Description' };
  const base = '<title>Example | Faith Reins</title><meta name="description" content="Description"><link rel="canonical" href="https://www.faithreins.com/example.html"><meta property="og:title" content="Example">';
  assert.equal(inspectPublishedMetadata(wrap(base), page).passed, true);
  for (const field of ['og:image', 'og:url', 'twitter:title', 'twitter:description', 'robots']) {
    const attr = field.startsWith('og:') ? 'property' : 'name';
    const meta = `<meta ${attr}="${field}" content="value">`;
    const result = inspectPublishedMetadata(wrap(base + meta + meta), page);
    assert.equal(result.passed, false, field);
    assert.ok(result.issues.some(issue => issue.startsWith(field + ':')), field);
  }
});
