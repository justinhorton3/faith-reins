// Faith Reins — browser behavior: mobile drawer, Wix forms, Wix donations.
import { createFormStore } from "./wix/form-store.js";
import { fetchCampaign } from "./wix/campaigns.js";
import { createDonationStore } from "./wix/donation-store.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === "class") n.className = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
};

/* ---------- Drawer ---------- */
(() => {
  const drawer = $("#drawer");
  if (!drawer) return;
  const opener = $("[data-drawer-open]");
  const open = () => { drawer.hidden = false; document.body.classList.add("drawer-open"); opener?.setAttribute("aria-expanded", "true"); $("[data-drawer-close]", drawer)?.focus(); };
  const close = () => { drawer.hidden = true; document.body.classList.remove("drawer-open"); opener?.setAttribute("aria-expanded", "false"); opener?.focus(); };
  opener?.addEventListener("click", open);
  $$("[data-drawer-close]", drawer).forEach((b) => b.addEventListener("click", close));
  drawer.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  matchMedia("(min-width: 1024px)").addEventListener("change", (m) => { if (m.matches && !drawer.hidden) close(); });
})();

/* ---------- Forms ---------- */
const FIELD_TYPE = { email: "email", phone: "tel", number: "number", url: "url", password: "password", date: "date", time: "time" };

function fieldNode(store, f) {
  const id = `f-${f.target}-${Math.random().toString(36).slice(2, 7)}`;
  const wrap = el("div", { class: "field" + (f.control === "textarea" || f.wide ? " field--wide" : ""), "data-target": f.target });
  const req = f.required ? el("span", { class: "req", "aria-hidden": "true" }, "*") : null;
  const err = el("div", { class: "error", id: `${id}-err`, role: "alert" });
  const describe = { "aria-describedby": `${id}-err` };
  const value = () => store.getState().values[f.target];
  const labelFor = el("label", { for: id }, f.label, req);
  let control;
  switch (f.control) {
    case "textarea":
      control = el("textarea", { id, name: f.target, rows: 5, placeholder: f.placeholder, "aria-required": f.required || null, ...describe });
      control.addEventListener("input", () => store.setValue(f.target, control.value));
      wrap.append(labelFor, control);
      break;
    case "select":
      control = el("select", { id, name: f.target, "aria-required": f.required || null, ...describe },
        el("option", { value: "" }, f.placeholder || "Select one"),
        f.choices.map((c) => el("option", { value: c.value }, c.label)));
      control.addEventListener("change", () => store.setValue(f.target, control.value));
      wrap.append(labelFor, control);
      break;
    case "radio":
    case "checkboxGroup": {
      const multi = f.control === "checkboxGroup";
      const set = el("fieldset", { ...describe }, el("legend", {}, f.label, req));
      f.choices.forEach((c, i) => {
        const input = el("input", { type: multi ? "checkbox" : "radio", name: `${f.target}${multi ? "" : "-r"}`, value: c.value, id: `${id}-${i}` });
        input.addEventListener("change", () => {
          if (multi) {
            const cur = new Set(value() || []);
            input.checked ? cur.add(c.value) : cur.delete(c.value);
            store.setValue(f.target, [...cur]);
          } else store.setValue(f.target, c.value);
        });
        set.append(el("label", { class: "choice", for: `${id}-${i}` }, input, c.label));
      });
      wrap.append(set);
      break;
    }
    case "checkbox": {
      control = el("input", { type: "checkbox", id, name: f.target, ...describe });
      control.addEventListener("change", () => store.setValue(f.target, control.checked));
      wrap.append(el("label", { class: "choice", for: id }, control, f.label, req));
      break;
    }
    default:
      control = el("input", { type: FIELD_TYPE[f.control] || "text", id, name: f.target, placeholder: f.placeholder, autocomplete: f.identifier === "email" ? "email" : null, "aria-required": f.required || null, ...describe });
      control.addEventListener("input", () => store.setValue(f.target, control.value));
      wrap.append(labelFor, control);
  }
  if (f.description) wrap.append(el("div", { class: "help" }, f.description));
  control?.addEventListener("blur", () => store.validate(f.target));
  wrap.append(err);
  return wrap;
}

function mountForm(host) {
  const store = createFormStore({ formId: host.dataset.formId });
  const submitLabel = host.dataset.submit || "Submit";
  const successText = host.dataset.success || "Thank you. Our team will be in touch.";
  const two = host.dataset.layout === "two";
  const wide = new Set((host.dataset.wide || "").split(",").filter(Boolean));
  host.textContent = "";
  const skeleton = el("div", { class: "form-skeleton", role: "status" }, "Loading form…");
  host.append(skeleton);
  let built = null;

  const build = (state) => {
    const fieldsBox = el("div", { class: "wix-form__fields" });
    const nodes = {};
    for (const f of state.form.fields) {
      if (wide.has(f.identifier) || wide.has(f.target)) f.wide = true;
      nodes[f.target] = fieldNode(store, f);
      fieldsBox.append(nodes[f.target]);
    }
    const status = el("div", { class: "form-status form-status--error", role: "alert", hidden: true });
    const ok = el("div", { class: "form-status form-status--ok", role: "status", hidden: true });
    const btn = el("button", { class: "btn" + (host.dataset.btn ? ` ${host.dataset.btn}` : ""), type: "submit" }, submitLabel);
    const form = el("form", { class: "wix-form" + (two ? " wix-form--two" : ""), novalidate: true }, fieldsBox, status, ok, btn);
    form.addEventListener("submit", (e) => store.submit(e));
    host.textContent = "";
    host.append(form);
    built = { form, nodes, status, ok, btn };
  };

  const render = () => {
    const s = store.getState();
    if (s.loading && !s.form) return;
    if (!s.form) {
      skeleton.className = "form-status form-status--error";
      skeleton.textContent = s.errors["@form"] || "This form is unavailable right now. Please call or email us instead.";
      return;
    }
    if (!built) build(s);
    for (const [target, node] of Object.entries(built.nodes)) {
      const msgs = Object.entries(s.errors).filter(([k]) => k.split("/")[0] === target).map(([, m]) => m);
      node.classList.toggle("is-invalid", msgs.length > 0);
      $(".error", node).textContent = msgs.join(" ");
      const c = $("input,select,textarea", node);
      if (c) c.setAttribute("aria-invalid", msgs.length ? "true" : "false");
    }
    const formErr = s.errors["@form"];
    built.status.hidden = !formErr;
    built.status.textContent = formErr || "";
    built.btn.disabled = s.loading;
    built.btn.textContent = s.loading ? "Sending…" : submitLabel;
    if (s.outcome) {
      built.form.reset();
      built.ok.hidden = false;
      built.ok.textContent = s.outcome.message || successText;
      built.btn.hidden = true;
      $$(".field", built.form).forEach((n) => (n.hidden = true));
      if (s.outcome.action === "REDIRECT" && s.outcome.url && !s.outcome.newTab) location.href = s.outcome.url;
    }
  };
  store.subscribe(render);
  store.start();
  render();
}
$$("[data-wix-form]").forEach(mountForm);

/* ---------- Donations ---------- */
async function mountGive(host) {
  host.textContent = "";
  host.append(el("div", { class: "form-skeleton", role: "status" }, "Loading giving options…"));
  let campaign;
  try { campaign = await fetchCampaign(host.dataset.campaign); } catch (e) { campaign = null; }
  host.textContent = "";
  if (!campaign) {
    host.append(el("div", { class: "form-status form-status--error" }, "Online giving is unavailable right now. Please contact us and we will help you give."));
    return;
  }
  const store = createDonationStore(campaign, { origin: location.origin, paths: { thankYou: "/give/thank-you/", campaign: "/give/" } });
  const o = campaign.options;
  const freqBox = el("div", { class: "seg", role: "group", "aria-label": "Gift frequency" });
  const amtBox = el("div", { class: "amounts", role: "group", "aria-label": "Gift amount" });
  const customInput = el("input", { id: "give-custom", type: "text", inputmode: "decimal", placeholder: "Enter an amount", autocomplete: "off" });
  const customErr = el("div", { class: "error", role: "alert" });
  const customField = el("div", { class: "field", hidden: true }, el("label", { for: "give-custom" }, "Other amount (USD)"), customInput, customErr);
  customInput.addEventListener("input", () => store.setCustomAmount(customInput.value));
  const fee = el("input", { type: "checkbox", id: "give-fee" });
  fee.addEventListener("change", () => store.setCoverFee(fee.checked));
  const feeRow = o.askCoverFee ? el("label", { class: "choice field", for: "give-fee", style: "display:flex;gap:10px;align-items:center" }, fee, "Add the processing fee so more of my gift goes to care") : null;
  const note = el("textarea", { id: "give-note", rows: 2, maxlength: o.commentMaxLength, placeholder: "Optional note" });
  note.addEventListener("input", () => store.setNote(note.value));
  const noteField = o.commentsEnabled ? el("div", { class: "field" }, el("label", { for: "give-note" }, "Add a note (optional)"), note) : null;
  const total = el("p", { class: "give-total", "aria-live": "polite" });
  const err = el("div", { class: "form-status form-status--error", role: "alert", hidden: true });
  const btn = el("button", { class: "btn btn--block", type: "button" }, "Continue to secure donation");
  btn.addEventListener("click", () => { store.donate().catch(() => {}); });
  const freqBtns = o.frequencies.map((fq) => {
    const b = el("button", { type: "button" }, fq.label);
    b.addEventListener("click", () => store.setFrequency(fq.value));
    freqBox.append(b);
    return [fq.value, b];
  });
  const presetBtns = o.presets.map((p) => {
    const b = el("button", { type: "button" }, p.label);
    b.addEventListener("click", () => store.selectPreset(p.amount));
    amtBox.append(b);
    return [p.amount, b];
  });
  let customBtn = null;
  if (o.customAmount.enabled) {
    customBtn = el("button", { type: "button" }, "Custom");
    customBtn.addEventListener("click", () => { store.selectCustom(); customInput.focus(); });
    amtBox.append(customBtn);
  }
  if (!campaign.acceptsDonations) btn.disabled = true;
  host.append(
    el("div", { class: "give-box" },
      o.frequencies.length > 1 ? freqBox : null, amtBox, customField, feeRow, noteField, total, err, btn,
      el("p", { class: "form-note" }, "You will finish your gift on a secure Wix checkout page.")));
  const render = () => {
    const s = store.getState();
    freqBtns.forEach(([v, b]) => b.setAttribute("aria-pressed", String(s.frequency === v)));
    presetBtns.forEach(([a, b]) => b.setAttribute("aria-pressed", String(!s.customMode && s.presetAmount === a)));
    customBtn?.setAttribute("aria-pressed", String(s.customMode));
    customField.hidden = !s.customMode;
    customErr.textContent = s.showErrors && s.messages.customAmount ? s.messages.customAmount : "";
    fee.checked = !!s.coverFee;
    total.textContent = s.amount && s.fee ? `Total with fee: ${s.totalLabel}` : "";
    btn.disabled = s.submitting || !campaign.acceptsDonations;
    btn.textContent = s.submitting ? "Opening checkout…" : s.valid && s.amount ? s.buttonLabel : "Continue to secure donation";
    err.hidden = !s.error;
    err.textContent = s.error || "";
  };
  store.subscribe(render);
  render();
}
$$("[data-give]").forEach(mountGive);
