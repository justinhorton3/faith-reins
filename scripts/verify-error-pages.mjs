// Run after the static build, before or after Wix's hosting transformation.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseHTML } from "linkedom";

const dist = path.resolve(import.meta.dirname, "../dist");
const art = "/assets/error-pages/background-";
const headings = new Set();
const contactHref = fs.existsSync(path.join(dist, "contact.html")) ? "/contact.html" : "/contact";

for (const status of [400, 404, 500]) {
  const file = [path.join(dist, `${status}.html`), path.join(dist, `${status}/index.html`)].find(fs.existsSync);
  assert.ok(file, `Built ${status} page is missing`);
  const { document } = parseHTML(fs.readFileSync(file, "utf8"));
  const section = document.querySelector(`[data-error-status="${status}"]`);
  assert.ok(section, `${status}: the shared error template is missing`);
  assert.equal(document.querySelectorAll("h1").length, 1);
  headings.add(document.querySelector("h1").textContent);
  assert.match(section.querySelector(".eyebrow").textContent, new RegExp(`^${status} · `));
  assert.equal(section.querySelectorAll("picture").length, 1);
  const picture = section.querySelector("picture");
  assert.equal(picture.getAttribute("aria-hidden"), "true");
  assert.deepEqual([...picture.querySelectorAll("source")].map(source => [source.getAttribute("media"), source.getAttribute("srcset")]), [
    ["(max-width: 767px)", `${art}mobile.webp`],
    ["(max-width: 1023px)", `${art}tablet.webp`],
  ]);
  assert.equal(picture.querySelector("img").getAttribute("src"), `${art}desktop.webp`);
  assert.equal(picture.querySelector("img").getAttribute("alt"), "");
  assert.deepEqual([...section.querySelectorAll("a")].map(a => a.getAttribute("href")), ["/", contactHref]);
  assert.match(document.querySelector('meta[name="robots"]').content, /\bnoindex\b/);
}
assert.equal(headings.size, 3, "Each error must explain its own recovery context");

for (const format of ["desktop", "tablet", "mobile"]) {
  const filename = path.join(dist, `${art.slice(1)}${format}.webp`);
  assert.ok(fs.statSync(filename).size < 250000, `${format}: background exceeds the image budget`);
}
assert.deepEqual(fs.readdirSync(path.join(dist, "assets/error-pages")).sort(), ["background-desktop.webp", "background-mobile.webp", "background-tablet.webp"]);
const sitemap = fs.readFileSync(path.join(dist, "sitemap-0.xml"), "utf8");
assert.doesNotMatch(sitemap, /<loc>[^<]*\/(?:400|404|500)(?:\.html|\/)?<\/loc>/);
console.log("Error pages verified: 400/404/500 share the approved responsive artwork, retain distinct messages, and stay out of search indexing.");
