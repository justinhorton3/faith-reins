import test from "node:test";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";
import { GIFT_AMOUNTS, givingOptions, giftTotals, giftCatalogOptions } from "../src/lib/giving.mjs";
import { presentFormFields } from "../src/lib/form-presentation.mjs";
import { teamBlock } from "../src/lib/blocks.mjs";
import { pages } from "../src/lib/build.mjs";
import { CAMPAIGN } from "../src/lib/lib.mjs";
import { campaignReleaseUpdate, configureAuditGiving } from "../scripts/configure-audit-giving.mjs";

const campaign = () => ({
  id: CAMPAIGN, revision: "7", status: "COLLECTING", archived: false,
  customAmountEnabled: true, customAmountOptions: { minimum: { amount: "5" } },
  donationFrequencies: ["ONE_TIME", "MONTH"], askDonorCoverFee: true,
  predefinedDonationAmounts: [25, 50, 100, 250].map(n => ({ id: "preset-" + n, price: { amount: String(n) } })),
});

async function fixture(t, markup, { query = "", campaignData = campaign(), formData } = {}) {
  const { window, document } = parseHTML("<!doctype html><html><body>" + markup + "</body></html>");
  const old = Object.fromEntries(["window", "document", "location", "fetch"].map(k => [k, globalThis[k]]));
  const requests = [];
  Object.assign(globalThis, { window, document, location: new URL("https://example.test/give" + query), fetch: async (url, options = {}) => {
    const body = options.body ? JSON.parse(options.body) : undefined;
    requests.push({ url, method: options.method || "GET", body });
    let value;
    if (url.endsWith("/oauth2/token")) value = { access_token: "test-token", expires_in: 3600 };
    else if (url.includes("/donation-campaigns/")) value = { donationCampaign: campaignData };
    else if (url.includes("/form-schema-service/")) value = { form: formData };
    else if (url.endsWith("/ecom/v2/carts")) value = { id: "test-cart" };
    else if (url.endsWith("/headless/v1/redirect-session")) value = { redirectSession: { fullUrl: "https://example.test/mock-checkout" } };
    else throw new Error("Unexpected network request: " + url);
    return { ok: true, json: async () => value };
  } });
  t.after(() => { for (const [key, value] of Object.entries(old)) value === undefined ? delete globalThis[key] : globalThis[key] = value; });
  await import("../src/scripts/site.js?fixture=" + Math.random());
  for (let i = 0; i < 20 && !document.querySelector(".give-box,form.wix-form"); i++) await new Promise(resolve => setImmediate(resolve));
  return { document, window, requests, button: name => [...document.querySelectorAll("button")].find(b => b.textContent === name), settle: async () => { for (let i = 0; i < 5; i++) await new Promise(resolve => setImmediate(resolve)); } };
}

test("fresh giving widget has no fee until the donor chooses it", async t => {
  const f = await fixture(t, '<div data-give data-campaign="' + CAMPAIGN + '"></div>');
  assert.deepEqual([...f.document.querySelectorAll(".amounts button")].map(b => b.textContent), ["$50", "$100", "$250", "$500", "Other"]);
  assert.equal(f.document.querySelector("#give-fee").checked, false);
  f.button("$100").click();
  assert.ok(f.button("Donate $100"));
  const fee = f.document.querySelector("#give-fee");
  fee.checked = true; fee.dispatchEvent(new f.window.Event("change"));
  assert.ok(f.button("Donate $102.90"));
  assert.match(f.document.querySelector(".give-total").textContent, /\$2\.90 optional processing fee/);
  fee.checked = false; fee.dispatchEvent(new f.window.Event("change"));
  f.button("Donate $100").click(); await f.settle();
  const cart = f.requests.find(r => r.url.endsWith("/ecom/v2/carts"));
  assert.deepEqual(cart.body.catalogItems[0].catalogReference.options, { amount: 100, frequency: "ONE_TIME" });
});

test("monthly entry preserves frequency and sends base amount plus explicit fee choice", async t => {
  const f = await fixture(t, '<div data-give data-campaign="' + CAMPAIGN + '"></div>', { query: "?frequency=MONTH" });
  f.button("$100").click();
  assert.equal(f.button("Monthly").getAttribute("aria-pressed"), "true");
  assert.match(f.document.querySelector(".give-total").textContent, /Total per month: \$100/);
  const fee = f.document.querySelector("#give-fee");fee.checked = true;fee.dispatchEvent(new f.window.Event("change"));
  f.button("Donate $102.90 Monthly").click();await f.settle();
  const cart = f.requests.find(r => r.url.endsWith("/ecom/v2/carts"));
  assert.deepEqual(cart.body.catalogItems[0].catalogReference.options, { amount: 100, frequency: "MONTH", donorCoveringFees: true });
});

test("unsupported monthly giving is disclosed without inventing a checkout option", async t => {
  const c = campaign();c.donationFrequencies = ["ONE_TIME"];
  const f = await fixture(t, '<div data-give data-campaign="' + CAMPAIGN + '"></div>', { query: "?frequency=MONTH", campaignData: c });
  assert.match(f.document.querySelector('[role="status"]').textContent, /not available online/);
  assert.equal(f.button("Monthly"), undefined);
  assert.throws(() => giftCatalogOptions(100, "MONTH", false, c));
});

test("gift totals round in cents and respect campaign amount capabilities", () => {
  assert.deepEqual(giftTotals(100, true), { amount: 100, fee: 2.9, total: 102.9 });
  assert.deepEqual(giftTotals(5.01, true), { amount: 5.01, fee: .15, total: 5.16 });
  assert.deepEqual(giftTotals("invalid", true), { amount: 0, fee: 0, total: 0 });
  const c = campaign();c.customAmountEnabled = false;assert.deepEqual(givingOptions(c).amounts, [25, 50, 100, 250]);
  c.customAmountEnabled = true;c.customAmountOptions.maximum = { amount: "100" };assert.deepEqual(givingOptions(c).amounts, [50, 100]);
});

test("callback presentation changes only the opted-in prompt and keeps the wire target", async t => {
  const old = { target: "callback_notes", kind: "area", label: "Tell us about your child", required: false };
  assert.strictEqual(presentFormFields([old], "contact")[0], old);
  const shown = presentFormFields([old], "callback")[0];assert.equal(shown.target, old.target);assert.equal(shown.required, false);
  const formData = { formFields: [{ fieldType: "INPUT", identifier: "TEXT_AREA", inputOptions: { target: old.target, required: false, stringOptions: { componentType: "TEXT_INPUT", textInputOptions: { label: old.label } } } }] };
  const f = await fixture(t, '<div data-wix-form data-form-id="callback-form" data-purpose="callback"></div>', { formData });
  assert.match(f.document.querySelector("label").textContent, /Callback or scheduling preferences/);
  assert.doesNotMatch(f.document.body.textContent, /Tell us about your child/);
  const input = f.document.querySelector("textarea");
  for (const id of input.getAttribute("aria-describedby").split(/\s+/)) assert.ok(f.document.getElementById(id));
});

test("sample team records never render, including incoming CMS records", () => {
  const rendered = teamBlock([{ name: "  Sample  Name  ", role: "Clinical Director", credentials: "O.T.D." }, { name: "Donna Horton", role: "Founder", bio: "Existing approved biography", photo: "/assets/avatar-a.svg" }]);
  assert.doesNotMatch(rendered, /Sample Name|O\.T\.D\.|avatar-[abc]/);
  assert.match(rendered, /Donna Horton/);
  const page = pages.find(p => p.route === "/our-team");assert.doesNotMatch(page.body, /Sample Name|avatar-[abc]/);
  assert.match(pages.find(p => p.route === "/book-online").body, /data-purpose="callback"/);
  assert.match(pages.find(p => p.route === "/").body, /give\?frequency=MONTH#gift/);
});

test("release configuration preserves IDs and revision, and defaults to read-only", async () => {
  const current = campaign();current.donationFrequencies = ["ONE_TIME"];
  const calls = [];
  const request = async (url, method, body) => { calls.push({ method, body });return { donationCampaign: method === "GET" ? current : { ...current, ...body.donationCampaign, revision: "8" } }; };
  const plan = await configureAuditGiving({ request });assert.equal(plan.applied, false);assert.equal(calls.length, 1);
  const update = campaignReleaseUpdate(current);assert.equal(update.donationCampaign.revision, "7");assert.equal(update.donationCampaign.predefinedDonationAmounts[0].id, "preset-50");
  assert.deepEqual(update.donationCampaign.predefinedDonationAmounts.map(p => Number(p.price.amount)), GIFT_AMOUNTS);
  const applied = await configureAuditGiving({ request, apply: true });assert.equal(applied.applied, true);assert.deepEqual(applied.settings.donationFrequencies, ["ONE_TIME", "MONTH"]);
  assert.equal(calls.filter(c => c.method === "PATCH").length, 1);
});

test("release configuration refuses the wrong campaign, inactive campaign or missing revision", () => {
  for (const override of [{ id: "another-site" }, { revision: "" }, { archived: true }, { status: "EXPIRED" }]) assert.throws(() => campaignReleaseUpdate({ ...campaign(), ...override }));
});
