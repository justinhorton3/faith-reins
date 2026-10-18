import test from "node:test";
import assert from "node:assert/strict";
import { parseHTML } from "linkedom";
import { form, FORMS } from "../src/lib/lib.mjs";
import { NEWSLETTER_TARGETS, NEWSLETTER_REQUEST } from "../src/lib/form-presentation.mjs";

// Matches the Contact schema read on 2026-10-18, with no real personal data.
function contactSchema() {
  return { formFields: [
    [NEWSLETTER_TARGETS.name, "Your name", "TEXT_INPUT", true, "UNKNOWN_FORMAT"],
    [NEWSLETTER_TARGETS.email, "Email", "CONTACTS_EMAIL", true, "EMAIL"],
    ["phone_i700qq", "Phone", "CONTACTS_PHONE", false, "PHONE"],
    [NEWSLETTER_TARGETS.message, "Message", "TEXT_AREA", true, "UNKNOWN_FORMAT"],
  ].map(([target, label, identifier, required, format]) => ({
    identifier, fieldType: "INPUT", inputOptions: { target, required, stringOptions: {
      componentType: "TEXT_INPUT", validation: { format }, textInputOptions: { label },
    } },
  })) };
}

async function fixture(t, { purpose = "newsletter", schema = contactSchema(), failSubmit = false } = {}) {
  const { window, document } = parseHTML("<!doctype html><html><body>" + form("contact", {
    purpose, submit: "Request updates", success: "We received your request for email updates.",
  }) + "</body></html>");
  const globals = ["window", "document", "location", "fetch"];
  const old = Object.fromEntries(globals.map(k => [k, globalThis[k]]));
  const requests = [];
  Object.assign(globalThis, { window, document, location: new URL("https://example.test/"), fetch: async (url, options = {}) => {
    requests.push({ url, method: options.method || "GET", body: options.body && JSON.parse(options.body) });
    let value;
    if (url.endsWith("/oauth2/token")) value = { access_token: "test-token", expires_in: 3600 };
    else if (url.endsWith("/form-schema-service/v4/forms/" + FORMS.contact)) value = { form: schema };
    else if (url.endsWith("/form-submission-service/v4/submissions")) {
      if (failSubmit) return { ok: false, status: 503, json: async () => ({ message: "Unavailable" }) };
      value = { submission: { status: "CONFIRMED" } };
    } else throw new Error("Unexpected request: " + url);
    return { ok: true, json: async () => value };
  } });
  t.after(() => { for (const key of globals) old[key] === undefined ? delete globalThis[key] : globalThis[key] = old[key]; });
  await import("../src/scripts/site.js?newsletter-fixture=" + Math.random());
  const settle = async () => { for (let i = 0; i < 12; i++) await new Promise(resolve => setImmediate(resolve)); };
  await settle();
  const rendered = document.querySelector("form");
  // linkedom omits HTMLFormElement.reset; the browser supplies this method.
  if (rendered) rendered.reset = () => { for (const input of rendered.querySelectorAll("input,textarea")) input.value = ""; };
  const input = (type, value) => {
    const el = document.querySelector('input[type="' + type + '"]');
    el.value = value; el.dispatchEvent(new window.Event("input"));
  };
  const submit = async () => { rendered.dispatchEvent(new window.Event("submit", { cancelable: true })); await settle(); };
  return { document, requests, input, submit };
}

test("newsletter asks only for name and email and submits explicit update intent", async t => {
  const f = await fixture(t);
  assert.deepEqual([...f.document.querySelectorAll("input")].map(n => n.type), ["text", "email"]);
  assert.equal(f.document.querySelector("textarea"), null);
  assert.equal(f.document.querySelector('input[type="email"]').getAttribute("autocomplete"), "email");
  await f.submit();
  assert.equal(f.requests.filter(r => r.url.endsWith("/submissions")).length, 0);
  f.input("text", "Test Visitor"); f.input("email", "invalid-email"); await f.submit();
  assert.match(f.document.body.textContent, /Enter an email address/);
  assert.equal(f.requests.filter(r => r.url.endsWith("/submissions")).length, 0);
  f.input("email", "newsletter@example.test"); await f.submit();
  assert.deepEqual(f.requests.find(r => r.url.endsWith("/submissions")).body, { submission: {
    formId: FORMS.contact, submissions: {
      [NEWSLETTER_TARGETS.name]: "Test Visitor",
      [NEWSLETTER_TARGETS.email]: "newsletter@example.test",
      [NEWSLETTER_TARGETS.message]: NEWSLETTER_REQUEST,
    },
  } });
  const success = f.document.querySelector(".form-status--ok");
  assert.equal(success.hidden, false);
  assert.match(success.textContent, /request for email updates/);
  assert.equal(f.document.querySelector("button").hidden, true);
});

test("failed update request preserves fields for retry and shows no success", async t => {
  const f = await fixture(t, { failSubmit: true });
  f.input("text", "Test Visitor"); f.input("email", "newsletter@example.test"); await f.submit();
  assert.equal(f.document.querySelector(".form-status--ok").hidden, true);
  assert.equal(f.document.querySelector(".form-status--error").hidden, false);
  assert.equal(f.document.querySelector("button").disabled, false);
  assert.equal(f.document.querySelector('input[type="email"]').value, "newsletter@example.test");
});

test("new required backend fields stop newsletter rendering instead of omitting them", async t => {
  const schema = contactSchema();
  schema.formFields.push({ fieldType: "INPUT", inputOptions: { target: "new_required_field", required: true } });
  const f = await fixture(t, { schema });
  assert.equal(f.document.querySelector("form"), null);
  assert.match(f.document.body.textContent, /unavailable right now/);
  assert.equal(f.requests.filter(r => r.url.endsWith("/submissions")).length, 0);
});

test("general contact keeps its phone and required message fields", async t => {
  const f = await fixture(t, { purpose: "" });
  assert.equal(f.document.querySelectorAll(".field").length, 4);
  assert.ok(f.document.querySelector('input[type="tel"]'));
  assert.ok(f.document.querySelector("textarea"));
  f.input("text", "Test Visitor"); f.input("email", "contact@example.test"); await f.submit();
  assert.equal(f.requests.filter(r => r.url.endsWith("/submissions")).length, 0);
  assert.match(f.document.querySelector("textarea").closest(".field").textContent, /This field is required/);
});
