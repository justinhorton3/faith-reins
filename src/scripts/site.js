// Faith Reins browser script: shell, drawer, Wix forms, Wix donations. Plain ES module, no dependencies.
import { GIFT_FREQUENCIES, givingOptions, giftTotals, giftCatalogOptions } from "../lib/giving.mjs";
import { presentFormFields } from "../lib/form-presentation.mjs";
const CLIENT = "d2d17c20-0426-4ff7-9bc8-4dd8b3a51e12";
const API = "https://www.wixapis.com";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const h = (t, a = {}, ...k) => {
  const n = document.createElement(t);
  for (const [x, v] of Object.entries(a)) {
    if (v === false || v == null) continue;
    if (x.startsWith("on")) n.addEventListener(x.slice(2), v);
    else n.setAttribute(x, v === true ? "" : v);
  }
  n.append(...k.flat().filter((c) => c != null));
  return n;
};

/* Wix visitor token + REST helper */
let tok = null;
async function token() {
  if (tok && tok.exp > Date.now() + 6e4) return tok.v;
  const r = await fetch(API + "/oauth2/token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientId: CLIENT, grantType: "anonymous" }) });
  if (!r.ok) throw new Error("Could not reach the service. Please try again.");
  const j = await r.json();
  tok = { v: j.access_token, exp: Date.now() + j.expires_in * 1e3 };
  return tok.v;
}
async function api(path, method = "POST", body) {
  const r = await fetch(API + path, { method, headers: { Authorization: await token(), "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error(j.message || "Request failed (" + r.status + ")"); e.details = j.details; throw e; }
  return j;
}

// Expose api for cart.js and other modules loaded after this script
window.__frApi = api;

/* Analytics — fires to GA4 (gtag) and Wix Analytics REST when connected */
function track(event, params = {}) {
  // GA4
  if (typeof gtag === "function") gtag("event", event, params);
  // Wix Analytics REST (no-op until Wix Analytics app is added to the dashboard)
  // api("/analytics/v2/events", "POST", { event: { eventType: event, eventData: params } }).catch(() => {});
}

/* Forms */
const text = (n) => (typeof n === "string" ? n : n && n.nodes ? n.nodes.map((c) => (c.textData ? c.textData.text : "") + text(c)).join("") : "");
const phone = (v) => { const d = v.replace(/[^\d+]/g, ""); return d[0] === "+" ? d : d.length === 10 ? "+1" + d : d.length === 11 && d[0] === "1" ? "+" + d : d; };
let formSequence = 0;
function fieldError(field, value) {
  const v = typeof value === "string" ? value.trim() : value;
  const empty = v == null || v === "" || (Array.isArray(v) && !v.length) || (field.kind === "check" && !v);
  if (field.required && empty) return "This field is required.";
  if (field.kind === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter an email address like name@example.com.";
  return "";
}

function parseForm(form) {
  const order = new Map();
  let i = 0;
  for (const s of form.steps || []) for (const it of ((s.layout || {}).large || {}).items || []) order.set(it.fieldId, i++);
  return (form.formFields || [])
    .filter((f) => f.fieldType === "INPUT" && f.inputOptions && f.inputOptions.target && !f.hidden)
    .sort((a, b) => (order.get(a.id || a._id) ?? 999) - (order.get(b.id || b._id) ?? 999))
    .map((f) => {
      const io = f.inputOptions;
      const sub = Object.values(io).find((v) => v && typeof v === "object" && v.componentType) || {};
      const comp = Object.entries(sub).find(([k, v]) => k.endsWith("Options") && v && typeof v === "object");
      const c = comp ? comp[1] : {};
      const fmt = (sub.validation || {}).format;
      const ct = sub.componentType;
      let kind = "text";
      if (ct === "DROPDOWN") kind = "select";
      else if (ct === "RADIO_GROUP") kind = "radio";
      else if (ct === "CHECKBOX_GROUP") kind = "checks";
      else if (ct === "CHECKBOX") kind = "check";
      else if (ct === "PHONE_INPUT" || fmt === "PHONE") kind = "tel";
      else if (fmt === "EMAIL") kind = "email";
      else if (f.identifier === "TEXT_AREA") kind = "area";
      return { target: io.target, required: !!io.required, kind, label: text(c.label) || io.target, ph: c.placeholder || "", opts: (c.options || []).map((o) => ({ v: String(o.value), l: String(o.label ?? o.value) })), id: f.identifier };
    });
}

async function mountForm(host) {
  const id = host.dataset.formId, wide = (host.dataset.wide || "").split(",");
  host.textContent = "";
  const load = h("div", { class: "form-skeleton", role: "status" }, "Loading form…");
  host.append(load);
  let fields;
  try {
    fields = parseForm((await api("/form-schema-service/v4/forms/" + id, "GET")).form);
    fields = presentFormFields(fields, host.dataset.purpose);
  } catch (e) {
    load.className = "form-status form-status--error";
    load.textContent = "This form is unavailable right now. Please call or email us instead.";
    return;
  }
  const vals = {}, nodes = {};
  const formPrefix = "fr-form-" + ++formSequence;
  const showError = (field, message) => {
    const [wrap, error, controls, group] = nodes[field.target];
    wrap.classList.toggle("is-invalid", !!message);
    error.textContent = message;
    error.hidden = !message;
    for (const control of controls) control.setAttribute("aria-invalid", String(!!message));
    group?.setAttribute("aria-invalid", String(!!message));
  };
  const box = h("div", { class: "wix-form__fields" });
  for (const [index, f] of fields.entries()) {
    if (f.hidden) { vals[f.target] = f.preset; continue; }
    const fid = formPrefix + "-" + index;
    const err = h("div", { class: "error", id: fid + "-error", role: "alert", hidden: true });
    const w = h("div", { class: "field" + (f.kind === "area" || wide.includes(f.target) ? " field--wide" : "") });
    const lab = h("label", { for: fid }, f.label, f.required ? h("span", { class: "req", "aria-hidden": "true" }, "*") : null);
    const help = f.help ? h("p", { class: "form-note", id: fid + "-help" }, f.help) : null;
    const groupHelp = f.kind === "checks" && f.required ? h("p", { class: "form-note", id: fid + "-required" }, "Required. Select at least one option.") : null;
    const set = (v) => {
      vals[f.target] = v;
      if (nodes[f.target]?.[1].textContent) showError(f, fieldError(f, v));
    };
    if (f.kind === "select") {
      const s = h("select", { id: fid, onchange: () => set(s.value) }, h("option", { value: "" }, f.ph || "Select one"), f.opts.map((o) => h("option", { value: o.v }, o.l)));
      w.append(lab, s);
    } else if (f.kind === "radio" || f.kind === "checks") {
      const fs = h("fieldset", { role: f.kind === "radio" ? "radiogroup" : "group", "aria-labelledby": fid + "-legend" }, h("legend", { id: fid + "-legend" }, f.label, f.required ? h("span", { class: "req", "aria-hidden": "true" }, "*") : null));
      f.opts.forEach((o, n) => {
        const inp = h("input", { type: f.kind === "radio" ? "radio" : "checkbox", name: fid, value: o.v, id: fid + n, onchange: () => set(f.kind === "radio" ? o.v : $$("input:checked", fs).map((x) => x.value)) });
        fs.append(h("label", { class: "choice", for: fid + n }, inp, o.l));
      });
      w.append(fs);
    } else if (f.kind === "check") {
      const inp = h("input", { type: "checkbox", id: fid, onchange: () => set(inp.checked) });
      w.append(h("label", { class: "choice", for: fid }, inp, f.label, f.required ? h("span", { class: "req", "aria-hidden": "true" }, "*") : null));
    } else {
      const el = f.kind === "area" ? h("textarea", { id: fid, rows: 5, placeholder: f.ph, "aria-describedby": help?.id, oninput: () => set(el.value) }) : h("input", { id: fid, type: f.kind === "text" ? "text" : f.kind, placeholder: f.ph, autocomplete: f.autocomplete, oninput: () => set(el.value) });
      w.append(lab, el);
    }
    if (help) w.append(help);
    if (groupHelp) w.append(groupHelp);
    const controls = $$("input,select,textarea", w);
    const description = [help?.id, groupHelp?.id, err.id].filter(Boolean).join(" ");
    for (const control of controls) {
      control.setAttribute("aria-describedby", description);
      control.setAttribute("aria-invalid", "false");
      // A checkbox group requires at least one choice, not every checkbox.
      if (f.required && f.kind !== "checks") {
        control.setAttribute("required", "");
        control.setAttribute("aria-required", "true");
      }
    }
    const group = $("fieldset", w);
    if (group) {
      group.setAttribute("aria-describedby", description);
      group.setAttribute("aria-invalid", "false");
      if (f.required && f.kind === "radio") group.setAttribute("aria-required", "true");
    }
    w.append(err);
    nodes[f.target] = [w, err, controls, group];
    box.append(w);
  }
  const bad = h("div", { class: "form-status form-status--error", role: "alert", hidden: true });
  const ok = h("div", { class: "form-status form-status--ok", role: "status", hidden: true });
  const label = host.dataset.submit || "Submit";
  const btn = h("button", { class: "btn" + (host.dataset.btn ? " " + host.dataset.btn : ""), type: "submit" }, label);
  const form = h("form", { class: "wix-form" + (host.dataset.layout === "two" ? " wix-form--two" : ""), novalidate: true }, box, bad, ok, btn);
  host.textContent = "";
  host.append(form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    bad.hidden = true;
    let first = null;
    for (const f of fields) {
      if (f.hidden) continue;
      const [w] = nodes[f.target];
      const m = fieldError(f, vals[f.target]);
      showError(f, m);
      if (m && !first) first = w;
    }
    if (first) { $("input,select,textarea", first)?.focus(); return; }
    const out = {};
    for (const f of fields) {
      const v = vals[f.target];
      if (v == null || v === "" || (Array.isArray(v) && !v.length) || v === false) continue;
      out[f.target] = f.kind === "tel" ? phone(v) : typeof v === "string" ? v.trim() : v;
    }
    btn.disabled = true;
    btn.textContent = "Sending…";
    try {
      const r = await api("/form-submission-service/v4/submissions", "POST", { submission: { formId: id, submissions: out } });
      const s = r.submission || r;
      if (!["CONFIRMED", "PENDING", "PAYMENT_WAITING"].includes(s.status)) throw new Error("Your message could not be sent. Please try again.");
      track("form_submit", { form_id: id, form_name: host.dataset.submit || "form" });
      form.reset();
      $$(".field", form).forEach((n) => (n.hidden = true));
      btn.hidden = true;
      ok.hidden = false;
      ok.textContent = host.dataset.success || "Thank you. Our team will be in touch.";
    } catch (x) {
      const v = (((x.details || {}).validationError || {}).fieldViolations || [])[0];
      bad.hidden = false;
      bad.textContent = v ? "Please check your entries and try again." : "We could not send this right now. Please try again, or contact us directly.";
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}
$$("[data-wix-form]").forEach(mountForm);

/* Contact form pre-fill from URL params (?order=... passed by shop checkout fallback) */
(function prefillContact() {
  const params = new URLSearchParams(location.search);
  const order = params.get("order");
  if (!order || !location.pathname.includes("/contact")) return;
  const host = $("[data-wix-form]");
  if (!host) return;
  const tryFill = () => {
    const ta = $("textarea", host);
    if (ta && !ta.value) {
      ta.value = "Order inquiry: " + order;
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  // Form loads asynchronously — poll until textarea appears
  const iv = setInterval(() => { if ($("textarea", host)) { tryFill(); clearInterval(iv); } }, 200);
  setTimeout(() => clearInterval(iv), 10000);
}());

/* Donations */
const FREQ = GIFT_FREQUENCIES;
const money = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));
async function mountGive(host) {
  const cid = host.dataset.campaign;
  host.textContent = "";
  host.append(h("div", { class: "form-skeleton", role: "status" }, "Loading giving options…"));
  let c;
  try { c = (await api("/donation-campaigns/v2/donation-campaigns/" + cid, "GET")).donationCampaign; } catch (e) { c = null; }
  host.textContent = "";
  if (!c || c.archived || ["EXPIRED", "GOAL_REACHED"].includes(c.status)) {
    host.append(h("div", { class: "form-status form-status--error" }, "Online giving is unavailable right now. Please contact us and we will help you give."));
    return;
  }
  const amt = (p) => Number((p && p.amount) || 0);
  const requested = new URLSearchParams(location.search).get("frequency");
  const options = givingOptions(c, requested);
  const presets = options.amounts, freqs = options.frequencies;
  const min = amt((c.customAmountOptions || {}).minimum) || 1;
  const st = { freq: options.frequency, amount: presets[0] || null, custom: false, text: "", fee: false, note: "", busy: false };
  const value = () => (st.custom ? Number(st.text.replace(/[\s,$]/g, "")) || null : st.amount);
  const fb = h("div", { class: "seg", role: "group", "aria-label": "Gift frequency" });
  const ab = h("div", { class: "amounts", role: "group", "aria-label": "Gift amount" });
  const ci = h("input", { id: "give-custom", type: "text", inputmode: "decimal", placeholder: "Enter an amount", autocomplete: "off", oninput: () => { st.text = ci.value; draw(); } });
  const ce = h("div", { class: "error", role: "alert" });
  const cf = h("div", { class: "field", hidden: true }, h("label", { for: "give-custom" }, "Other amount (USD)"), ci, ce);
  const fee = h("input", { type: "checkbox", id: "give-fee", onchange: () => { st.fee = fee.checked; draw(); } });
  fee.checked = st.fee;
  const feeRow = c.askDonorCoverFee ? h("label", { class: "choice", for: "give-fee" }, fee, "Add the processing fee so more of my gift goes to care") : null;
  const note = h("textarea", { id: "give-note", rows: 2, maxlength: 100, placeholder: "Optional note", oninput: () => { st.note = note.value; } });
  const noteRow = c.commentsEnabled ? h("div", { class: "field" }, h("label", { for: "give-note" }, "Add a note (optional)"), note) : null;
  const tot = h("p", { class: "give-total", "aria-live": "polite" });
  const bad = h("div", { class: "form-status form-status--error", role: "alert", hidden: true });
  const go = h("button", { class: "btn btn--block", type: "button", onclick: donate }, "Continue to secure donation");
  const fbtns = freqs.map((f) => { const b = h("button", { type: "button", onclick: () => { st.freq = f; draw(); } }, FREQ[f]); fb.append(b); return [f, b]; });
  const pbtns = presets.map((n) => { const b = h("button", { type: "button", onclick: () => { st.amount = n; st.custom = false; draw(); } }, money(n)); ab.append(b); return [n, b]; });
  let cb = null;
  if (c.customAmountEnabled) { cb = h("button", { type: "button", onclick: () => { st.custom = true; draw(); ci.focus(); } }, "Other"); ab.append(cb); }
  const unavailable = options.requestedUnavailable ? h("p", { class: "form-note", role: "status" },
    "The requested gift frequency is not available online. ", h("a", { href: "/contact" }, "Contact us about recurring giving"), ". The options below show the available frequencies.") : null;
  host.append(h("div", { class: "give-box" }, unavailable, freqs.length > 1 ? fb : h("p", { class: "form-note" }, FREQ[st.freq] + " gift"), ab, cf, feeRow, noteRow, tot, bad, go, h("p", { class: "form-note" }, "You will finish your gift on a secure Wix checkout page.")));
  function draw() {
    fbtns.forEach(([f, b]) => b.setAttribute("aria-pressed", st.freq === f));
    pbtns.forEach(([n, b]) => b.setAttribute("aria-pressed", !st.custom && st.amount === n));
    cb && cb.setAttribute("aria-pressed", st.custom);
    cf.hidden = !st.custom;
    const v = value();
    ce.textContent = st.custom && st.text && (!v || v < min) ? "The minimum donation is " + money(min) + "." : "";
    const quote = giftTotals(v, st.fee && c.askDonorCoverFee);
    fee.checked = st.fee;
    const period = { WEEK: " per week", MONTH: " per month", YEAR: " per year" }[st.freq] || "";
    tot.textContent = quote.amount ? "Total" + period + ": " + money(quote.total) + (quote.fee ? " (includes " + money(quote.fee) + " optional processing fee)" : "") : "";
    go.disabled = st.busy;
    go.textContent = st.busy ? "Opening checkout…" : v && v >= min ? "Donate " + money(quote.total) + (st.freq === "ONE_TIME" ? "" : " " + FREQ[st.freq]) : "Continue to secure donation";
  }
  async function donate() {
    const v = value();
    bad.hidden = true;
    if (!v || v < min) { ce.textContent = "Enter an amount of " + money(min) + " or more."; return; }
    st.busy = true; draw();
    try {
      const opt = giftCatalogOptions(v, st.freq, st.fee, c);
      const cart = await api("/ecom/v2/carts", "POST", { cart: { source: { channelType: "WEB" }, ...(st.note.trim() ? { note: st.note.trim() } : {}) }, catalogItems: [{ quantity: 1, catalogReference: { appId: "333b456e-dd48-4d6b-b32b-9fd48d74e163", catalogItemId: cid, options: opt } }] });
      const id = cart._id || cart.id || (cart.cart && (cart.cart._id || cart.cart.id));
      const s = await api("/headless/v1/redirect-session", "POST", { ecomCheckout: { checkoutId: id }, callbacks: { postFlowUrl: location.origin + "/give/", thankYouPageUrl: location.origin + "/give/thank-you/" } });
      track("begin_checkout", { currency: "USD", value: giftTotals(v, st.fee && c.askDonorCoverFee).total, items: [{ item_id: cid, item_name: "Donation" }] });
      location.href = s.redirectSession.fullUrl;
    } catch (e) {
      st.busy = false; draw();
      bad.hidden = false;
      bad.textContent = /premium|payment/i.test(e.message) ? "Online giving is not switched on yet. Please contact us and we will help you give." : "We could not start the checkout. Please try again.";
    }
  }
  draw();
}
$$("[data-give]").forEach(mountGive);

/* Blog — mounts on [data-wix-blog].
   When Wix Blog is connected, posts from the dashboard replace static HTML.
   Wix Blog API v3: GET /blog/v3/posts?fieldsets=CONTENT_TEXT&sort=publishedDate:desc&limit=20
   Each post: { id, title, slug, excerpt, coverImage { url }, publishedDate, tags[{label}] }
*/
async function mountBlog(host) {
  let posts;
  try {
    const r = await api("/blog/v3/posts?fieldsets=CONTENT_TEXT&sort=publishedDate:desc&limit=20", "GET");
    posts = (r.posts || []).filter((p) => p.status === "PUBLISHED" || !p.status);
  } catch {
    return; // keep static HTML intact when blog not yet connected
  }
  if (!posts.length) return;

  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const tag = (p) => (p.tags && p.tags[0] ? p.tags[0].label : "News");

  // Keep the static posts (they have their own pages) and add Wix posts in front of them.
  // Wix posts have no static page, so they open the shared /news/post page by slug.
  const staticHrefs = new Set($$("a.post-card", host).map((a) => a.getAttribute("href").replace(/\.html$/, "")));
  posts = posts.filter((p) => !staticHrefs.has("/news/" + (p.slug || p.id)));
  if (!posts.length) return;

  host.insertAdjacentHTML("afterbegin", posts.map((p) => {
    const cover = (p.media && p.media.wixMedia && p.media.wixMedia.image && p.media.wixMedia.image.url) || (p.coverImage && p.coverImage.url);
    const img = cover ? `<div class="post-card__cover"><img src="${esc(cover)}" alt="${esc(p.title)}" loading="lazy" width="800" height="450"></div>` : "";
    const slug = "/news/post?slug=" + encodeURIComponent(p.slug || p.id);
    return `<a class="post-card" href="${slug}">
      ${img}
      <div class="post-card__inner">
        <div class="post-card__meta"><span class="post-tag">${esc(tag(p))}</span><span class="post-date">${fmt(p.firstPublishedDate || p.publishedDate)}</span></div>
        <h2 class="post-card__title">${esc(p.title)}</h2>
        <p class="post-card__summary">${esc(p.excerpt)}</p>
        <span class="post-card__read">Read more →</span>
      </div>
    </a>`;
  }).join(""));
}
$$("[data-wix-blog]").forEach(mountBlog);

/* Blog post — mounts on [data-wix-post].
   Static post pages pass data-slug and keep their own HTML unless Wix has a post with that slug.
   The shared /news/post page passes data-slug-param and reads the slug from the URL (?slug=).
*/
async function mountPost(host) {
  const fromUrl = !!host.dataset.slugParam;
  const slug = fromUrl ? new URLSearchParams(location.search).get(host.dataset.slugParam) : host.dataset.slug;
  const notFound = () => {
    if (fromUrl) host.innerHTML = `<p class="post-meta"><a href="/news">← News &amp; Updates</a></p><h1>Post not found</h1><p>This post may have moved or been removed. <a href="/news">See all news &amp; updates</a>.</p>`;
  };
  if (!slug) return notFound();
  let post;
  try {
    const r = await api(`/blog/v3/posts/slugs/${encodeURIComponent(slug)}?fieldsets=CONTENT_TEXT`, "GET");
    post = r.post;
  } catch {
    return notFound(); // static pages keep their HTML intact
  }
  if (!post) return notFound();

  const esc = (s) => String(s || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const tag = (p) => (p.tags && p.tags[0] ? p.tags[0].label : "News");
  const paras = (post.contentText || post.excerpt || "").split(/\n+/).filter(Boolean).map((t) => `<p>${esc(t)}</p>`).join("");
  const cover = post.media && post.media.wixMedia && post.media.wixMedia.image && post.media.wixMedia.image.url;

  if (fromUrl) document.title = `${post.title} | News | Faith Reins`;
  host.innerHTML = `
    <p class="post-meta"><a href="/news">← News &amp; Updates</a> &nbsp;·&nbsp; <span class="post-tag">${esc(tag(post))}</span> &nbsp;·&nbsp; ${fmt(post.firstPublishedDate || post.publishedDate)}</p>
    <h1>${esc(post.title)}</h1>
    ${cover ? `<img src="${esc(cover)}" alt="" loading="lazy" style="width:100%;height:auto;border-radius:8px;margin:1rem 0">` : ""}
    <hr style="border:none;border-top:1px solid #e0dbd4;margin:1.5rem 0">
    <div class="post-body">${paras}</div>
  `;
}
$$("[data-wix-post]").forEach(mountPost);
