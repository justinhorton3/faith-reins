// Validate the transformed local build. Wix's live business-solution sitemaps
// still require a separate release check; a local pass does not certify those.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseHTML } from "linkedom";
import { pages } from "../src/lib/build.mjs";
import { isIndexableRoute } from "../src/lib/indexability.mjs";

const dist = path.resolve(import.meta.dirname, "../dist");
const origin = "https://www.faithreins.com";
const hosted = route => route === "/" ? "/" : route + ".html";
const filename = route => path.join(dist, route === "/" ? "index.html" : route.slice(1) + ".html");
const expected = pages.filter(page => isIndexableRoute(page.route) && !page.seo?.noindex && (!page.seo?.canonicalRoute || page.seo.canonicalRoute === page.route)).map(page => hosted(page.route)).sort();
const registry = JSON.parse(fs.readFileSync(path.join(dist, "_wix/pages.json"), "utf8"));
assert.deepEqual(registry.map(page => page.path).sort(), expected, "Hosting page registry must contain exactly the indexable canonical pages");
for (const page of pages) {
  const { document } = parseHTML(fs.readFileSync(filename(page.route), "utf8"));
  const noindex = [...document.querySelectorAll('meta[name="robots"]')].some(meta => /\bnoindex\b/i.test(meta.content));
  assert.equal(noindex, !isIndexableRoute(page.route) || !!page.seo?.noindex, page.route);
  if (!expected.includes(hosted(page.route))) continue;
  const canonical = [...document.querySelectorAll('link[rel="canonical"]')].map(link => link.href);
  assert.deepEqual(canonical, [origin + (page.route === "/" ? "" : hosted(page.route))], page.route);
}
const xml = fs.readFileSync(path.join(dist, "sitemap-0.xml"), "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(urls.sort(), expected.map(route => origin + route).sort(), "Astro XML must match the canonical registry");
assert.ok(expected.includes("/shop/mens-polo.html"), "A prefix exclusion must not hide men's polo");
assert.ok(!fs.existsSync(filename("/shop/mens")), "Legacy men's HTML must not compete with the HTTP redirect");
assert.ok(!fs.existsSync(path.join(dist, "sitemap.xml")), "Do not override Wix's reserved sitemap index");
console.log(`Audit SEO build verified: ${expected.length} indexable pages; excluded pages retained as files with noindex; legacy men alias removed.`);
