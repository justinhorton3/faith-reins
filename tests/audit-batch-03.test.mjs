import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseHTML } from "linkedom";
import { sponsorsBlock } from "../src/lib/blocks.mjs";
import { isIndexableRoute } from "../src/lib/indexability.mjs";
import { AUDIT_REDIRECTS, configureAuditRedirects, redirectPlan } from "../scripts/configure-audit-redirects.mjs";
import { verifyAuditRedirects } from "../scripts/verify-audit-redirects.mjs";

test("empty/unapproved sponsor feeds show an opportunity without empty logo tiers", () => {
  const html = sponsorsBlock([{ name: "Unconfirmed Company", logo: "/assets/company.svg" }, { name: "Gold sponsor", approvedForPublication: true }]);
  const { document } = parseHTML(html);
  assert.equal(document.querySelectorAll("img,.tier,.logo-slot").length, 0);
  assert.equal(document.querySelector("a").getAttribute("href"), "/sponsorships");
  assert.doesNotMatch(html, /Unconfirmed Company|Gold sponsor/);
  const named = sponsorsBlock([{ name: "Example & Co", approvedForPublication: true, tier: "Gold", logo: "/assets/sponsor-gold.svg" }]);
  assert.match(named, /Example &amp; Co/);
  assert.doesNotMatch(named, /<img|Platinum|Silver|Bronze/);
});

test("actual CMS hydration carries explicit sponsor approval into the shared renderer", async t => {
  const { document, window } = parseHTML('<html><body><div data-cms="sponsors"></div></body></html>');
  const old = { document: globalThis.document, window: globalThis.window };
  Object.assign(globalThis, { document, window });
  t.after(() => { for (const [key, value] of Object.entries(old)) value === undefined ? delete globalThis[key] : globalThis[key] = value; });
  window.__frApi = async (url, method, body) => {
    assert.equal(body.dataCollectionId, "Sponsors");
    return { dataItems: [
      { data: { name: "Approved Example", approvedForPublication: true } },
      { data: { name: "Unapproved Example", approvedForPublication: false } },
      { data: { name: "String Flag Example", approvedForPublication: "true" } },
    ] };
  };
  await import("../src/scripts/cms.js?audit=" + Math.random());
  for (let i = 0; i < 6; i++) await new Promise(resolve => setImmediate(resolve));
  assert.match(document.body.textContent, /Approved Example/);
  assert.doesNotMatch(document.body.textContent, /Unapproved Example|String Flag Example/);
});

test("redirect configuration defaults to read-only and recognizes existing exact redirects", async () => {
  const methods = [];
  const result = await configureAuditRedirects({ request: async (url, method) => { methods.push(method); return { redirects: [] }; } });
  assert.deepEqual(methods, ["GET"]);
  assert.equal(result.applied, false);
  assert.deepEqual(result.plan.map(({ present, ...item }) => item), AUDIT_REDIRECTS);
  assert.equal(redirectPlan([{ from: "/shop/mens/", to: "/shop/men.html" }])[0].present, true);
});

test("redirect apply checks before each create and sends no force-replacement option", async () => {
  const methods = [], existing = [];
  const result = await configureAuditRedirects({ apply: true, request: async (url, method, body) => {
    methods.push(method);
    if (method === "GET") return { redirects: structuredClone(existing) };
    assert.deepEqual(Object.keys(body.redirect).sort(), ["from", "to"]);
    const redirect = { ...body.redirect, id: "created-" + existing.length };
    existing.push(redirect);
    return { redirect };
  } });
  assert.deepEqual(methods, ["GET", "GET", "POST", "GET", "POST"]);
  assert.equal(result.results.filter(item => item.created).length, 2);
});

test("source, target and overlapping group conflicts stop the whole redirect group before writes", async () => {
  for (const existing of [
    [{ from: "/shop/mens/", to: "/somewhere-else" }],
    [{ from: "/shop/men.html/", to: "/somewhere-else" }],
    [{ from: "/shop", to: "/somewhere-else", options: { groupRedirect: true } }],
    [{ from: "/shop/mens", to: "/shop/men.html", language: "fr" }],
  ]) {
    const methods = [];
    await assert.rejects(configureAuditRedirects({ apply: true, request: async (url, method) => { methods.push(method); return { redirects: existing }; } }), /conflict/);
    assert.deepEqual(methods, ["GET"]);
  }
  assert.throws(() => redirectPlan(undefined), /redirects array/);
});

test("a failed redirect write is reported without automatic retries", async () => {
  let posts = 0;
  await assert.rejects(configureAuditRedirects({ apply: true, request: async (url, method) => {
    if (method === "GET") return { redirects: [] };
    posts++;
    throw new Error("HTTP 403");
  } }), /HTTP 403/);
  assert.equal(posts, 1);
});

test("release preflight verifies direct permanent redirects and a successful destination", async () => {
  const requests = [];
  const result = await verifyAuditRedirects({ fetcher: async (url, options) => {
    requests.push({ url, options });
    return { status: url.endsWith("/shop/men.html") ? 200 : 301, headers: new Headers({ location: "/shop/men.html" }) };
  } });
  assert.equal(result.verified, 2);
  assert.equal(requests.length, 3);
  assert.ok(requests.every(request => request.options.redirect === "manual" && request.url.startsWith("https://www.faithreins.com/")));
});

test("release preflight rejects fallback HTML, temporary/wrong redirects and chained destinations", async () => {
  for (const [status, location, targetStatus] of [[200, "/shop/men.html", 200], [302, "/shop/men.html", 200], [301, "/shop/men", 200], [301, "/shop/men.html", 301]]) {
    await assert.rejects(verifyAuditRedirects({ fetcher: async url => ({ status: url.endsWith("/shop/men.html") ? targetStatus : status, headers: new Headers({ location }) }) }), /Release blocked/);
  }
});

test("indexability handles hosted URLs and route boundaries without hiding men's polo", () => {
  for (const route of ["/account", "/account/orders.html", "/news/post?slug=example", "/give/thank-you/", "/shop/thank-you.html/", "/shop/mens", "/404.html", "/api/account/orders"]) assert.equal(isIndexableRoute(route), false, route);
  for (const route of ["/", "/shop/men.html", "/shop/mens-polo", "/news/postscript", "/accountability", "https://www.faithreins.com/shop/mens-polo.html"]) assert.equal(isIndexableRoute(route), true, route);
});

test("postbuild excludes nonindexable/alias entries while retaining their served files", t => {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), "faith-reins-audit-"));
  t.after(() => fs.rmSync(dist, { recursive: true, force: true }));
  const page = (route, { noindex = false, canonical = route } = {}) => {
    const file = path.join(dist, route === "/" ? "index.html" : route.slice(1) + "/index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `<html><head><link rel="canonical" href="https://www.faithreins.com${canonical === "/" ? "" : canonical}">${noindex ? '<meta name="robots" content="follow, NOINDEX">' : ""}</head><body><a href="/shop/mens-polo">Polo</a></body></html>`);
  };
  page("/"); page("/shop/mens-polo"); page("/account"); page("/give/thank-you"); page("/shop/thank-you"); page("/news/post");
  page("/shop/mens", { canonical: "/shop/men" });
  page("/hidden-example", { noindex: true }); page("/another-alias", { canonical: "/shop/mens-polo" });
  execFileSync("python", [path.resolve(import.meta.dirname, "../scripts/wix-postbuild.py"), "--dist", dist]);
  const registry = JSON.parse(fs.readFileSync(path.join(dist, "_wix/pages.json"), "utf8"));
  assert.deepEqual(registry, [{ path: "/", static: true }, { path: "/shop/mens-polo.html", static: true }]);
  assert.ok(fs.existsSync(path.join(dist, "account.html")), "Account file must remain available");
  assert.ok(fs.existsSync(path.join(dist, "give/thank-you.html")), "Confirmation file must remain available");
  assert.ok(!fs.existsSync(path.join(dist, "shop/mens.html")), "Retired alias copies must be removed on repeat builds");
  assert.match(fs.readFileSync(path.join(dist, "index.html"), "utf8"), /href="\/shop\/mens-polo.html"/);
});
