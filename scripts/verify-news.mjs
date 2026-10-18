// Exercise the actual postbuild browser bundle with hosted .html URLs.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseHTML } from "linkedom";

const dist = path.resolve(import.meta.dirname, "../dist");
const { document: page } = parseHTML(fs.readFileSync(path.join(dist, "news.html"), "utf8"));
const file = [...page.querySelectorAll('script[type="module"][src]')]
  .map(script => path.join(dist, script.getAttribute("src")))
  .find(filename => fs.readFileSync(filename, "utf8").includes("/blog/v3/posts?"));
assert(file, "The hosted news bundle is missing");
const { document, window } = parseHTML(`<html><body>${page.querySelector("#news-grid").outerHTML}</body></html>`);
Object.assign(globalThis, { document, window, location: new URL("https://example.test/news.html"), fetch: async url => {
  if (url.endsWith("/oauth2/token")) return { ok: true, json: async () => ({ access_token: "test", expires_in: 3600 }) };
  assert(url.includes("/blog/v3/posts?"), `Unexpected request: ${url}`);
  return { ok: true, json: async () => ({ posts: [
    { slug: "faith-reins-mission", title: "Duplicate", publishedDate: "2026-10-20" },
    { slug: "summer-eal-program-2026", title: "Held", publishedDate: "2026-10-20" },
    { slug: "new-update", title: "New", publishedDate: "2026-10-19", status: "PUBLISHED" },
    { slug: "old-update", title: "Old", publishedDate: "2026-09-01", status: "PUBLISHED" },
  ] }) };
} });
await import(pathToFileURL(file).href);
for (let i = 0; i < 20; i++) await new Promise(resolve => setImmediate(resolve));
const cards = [...document.querySelectorAll(".post-card")];
assert.deepEqual(cards.map(card => card.dataset.postDate), ["2026-10-19", "2026-10-18", "2026-10-01", "2026-09-01"]);
assert.doesNotMatch(document.body.textContent, /Duplicate|Held/);
assert.equal(cards[0].getAttribute("href"), "/news/post.html?slug=new-update");
assert.equal(cards[1].getAttribute("href"), "/news/preparing-to-open.html");
assert.equal(cards[2].getAttribute("href"), "/news/faith-reins-mission.html");
console.log("Hosted news verified: newest-first merged posts, canonical links, no duplicates and no revived withheld stories.");
