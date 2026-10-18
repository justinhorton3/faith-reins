import test from "node:test";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";
import { pages } from "../src/lib/build.mjs";
import { header, footer } from "../src/lib/lib.mjs";
import { isIndexableRoute } from "../src/lib/indexability.mjs";
import { newsDate, WITHHELD_NEWS_SLUGS } from "../src/lib/news.mjs";

test("news is discoverable in desktop About, mobile About, footer and homepage", () => {
  const { document } = parseHTML(header() + footer());
  for (const selector of ['[data-mega-menu="about"]', '[data-mobile-group]', '.site-footer__sitemap']) {
    const link = document.querySelector(selector).querySelector('a[href="/news"]');
    assert.match(link.textContent, /News & Updates/);
  }
  assert.match(pages.find(p => p.route === "/").body, /href="\/news"[^>]*>Read News &amp; Updates/);
});

test("source news is newest-first, dated and honest about pre-opening status", () => {
  const { document } = parseHTML(pages.find(p => p.route === "/news").body);
  const cards = [...document.querySelectorAll(".post-card")];
  assert.deepEqual(cards.map(c => c.getAttribute("href")), ["/news/preparing-to-open", "/news/faith-reins-mission"]);
  assert.deepEqual(cards.map(c => c.dataset.postDate), ["2026-10-18", "2026-10-01"]);
  assert.match(pages.find(p => p.route === "/news/preparing-to-open").body, /not yet open for care/);
  assert.equal(newsDate("2026-10-18"), "October 18, 2026");
  assert.equal(newsDate("unknown"), "Date unavailable");
});

test("unverified legacy stories keep useful noindex pages without their old claims", () => {
  for (const slug of WITHHELD_NEWS_SLUGS) {
    const page = pages.find(p => p.route === `/news/${slug}`);
    assert(page);
    assert.equal(isIndexableRoute(page.route), false);
    assert.match(page.body, /href="\/news"/);
    assert.doesNotMatch(page.body, /twelve children|week seven|Registration for fall|second licensed|data-wix-post/);
  }
  const mission = pages.find(p => p.route === "/news/faith-reins-mission");
  assert.doesNotMatch(mission.body, /clinical literature|real evidence|— Donna|data-wix-post/);
});

async function browserFixture(t, { markup, posts = [], slug = "" }) {
  const { document, window } = parseHTML(`<html><body>${markup}</body></html>`);
  const keys = ["document", "window", "location", "fetch"];
  const old = Object.fromEntries(keys.map(k => [k, globalThis[k]]));
  const requests = [], redirects = [];
  Object.assign(globalThis, { document, window, location: { search: `?slug=${slug}`, replace: href => redirects.push(href) }, fetch: async url => {
    requests.push(url);
    if (url.endsWith("/oauth2/token")) return { ok: true, json: async () => ({ access_token: "test", expires_in: 3600 }) };
    if (url.includes("/blog/v3/posts?")) return { ok: true, json: async () => ({ posts }) };
    throw new Error(`Unexpected request: ${url}`);
  } });
  t.after(() => { for (const k of keys) old[k] === undefined ? delete globalThis[k] : globalThis[k] = old[k]; });
  await import(`../src/scripts/site.js?news-test=${Math.random()}`);
  for (let i = 0; i < 12; i++) await new Promise(resolve => setImmediate(resolve));
  return { document, requests, redirects };
}

test("Wix hydration merges dates, suppresses held stories and avoids static duplicates", async t => {
  const f = await browserFixture(t, {
    markup: pages.find(p => p.route === "/news").body,
    posts: [
      { slug: "older-update", title: "Older", publishedDate: "2026-09-01", status: "PUBLISHED" },
      { slug: "latest-update", title: "Latest", publishedDate: "2026-10-19", status: "PUBLISHED" },
      { slug: "summer-eal-program-2026", title: "Unverified summer", publishedDate: "2026-10-20" },
      { slug: "faith-reins-mission", title: "Duplicate mission", publishedDate: "2026-10-20" },
      { slug: "draft", title: "Draft", status: "DRAFT" },
    ],
  });
  const cards = [...f.document.querySelectorAll(".post-card")];
  assert.deepEqual(cards.map(c => c.dataset.postDate), ["2026-10-19", "2026-10-18", "2026-10-01", "2026-09-01"]);
  assert.doesNotMatch(f.document.body.textContent, /Unverified summer|Duplicate mission|Draft/);
});

for (const slug of ["welcome-second-slp", "faith-reins-mission"]) test(`query-string access protects ${slug} from stale Wix content`, async t => {
  const f = await browserFixture(t, { markup: '<div data-wix-post data-slug-param="slug"></div>', slug });
  assert.equal(f.requests.length, 0);
  if (slug === "welcome-second-slp") assert.match(f.document.body.textContent, /Post not found/);
  else assert.deepEqual(f.redirects, ["/news/faith-reins-mission"]);
});
