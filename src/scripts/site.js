// Faith Reins browser script: drawer, Wix forms, Wix donations. Plain ES module, no dependencies.
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

/* Drawer */
(() => {
  const d = $("#drawer"), o = $("[data-drawer-open]");
  if (!d) return;
  const set = (open) => { d.hidden = !open; document.body.classList.toggle("drawer-open", open); o.setAttribute("aria-expanded", open); (open ? $("[data-drawer-close]", d) : o).focus(); };
  o.addEventListener("click", () => set(true));
  $$("[data-drawer-close]", d).forEach((b) => b.addEventListener("click", () => set(false)));
  d.addEventListener("keydown", (e) => e.key === "Escape" && set(false));
})();

/* Forms — fields render as real static HTML at build time (src/lib/lib.mjs's `form()`);
   Wix Forms' GetForm/CreateSubmission reject the site's anonymous visitor identity outright,
   so submission goes through this site's own /api/submit-form endpoint (elevated server-side)
   instead of straight to Wix. */
const phone = (v) => { const d = v.replace(/[^\d+]/g, ""); return d[0] === "+" ? d : d.length === 10 ? "+1" + d : d.length === 11 && d[0] === "1" ? "+" + d : d; };

function wireForm(form) {
  const kind = form.dataset.submitKind;
  const bad = $(".form-status--error", form), ok = $(".form-status--ok", form);
  const btn = $("button[type=submit]", form);
  const label = btn.textContent;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    bad.hidden = true;
    const out = {};
    for (const el of form.elements) {
      if (!el.name || !el.value.trim()) continue;
      out[el.name] = el.type === "tel" ? phone(el.value.trim()) : el.value.trim();
    }
    btn.disabled = true;
    btn.textContent = "Sending…";
    try {
      const r = await fetch("/api/submit-form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, submissions: out }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || "Request failed");
      track("form_submit", { form_kind: kind });
      form.reset();
      $$(".field", form).forEach((n) => (n.hidden = true));
      btn.hidden = true;
      ok.hidden = false;
      ok.textContent = form.dataset.success || "Thank you. Our team will be in touch.";
    } catch (x) {
      bad.hidden = false;
      bad.textContent = "We could not send this right now. Please try again, or contact us directly.";
      btn.disabled = false;
      btn.textContent = label;
    }
  });
}
$$("form.wix-form[data-submit-kind]").forEach(wireForm);

/* Contact form pre-fill from URL params (?order=... passed by shop checkout fallback) */
(function prefillContact() {
  const params = new URLSearchParams(location.search);
  const order = params.get("order");
  if (!order || !location.pathname.includes("/contact")) return;
  const ta = $("form.wix-form[data-submit-kind='contact'] textarea");
  if (ta && !ta.value) ta.value = "Order inquiry: " + order;
}());

/* Donations */
const FREQ = { ONE_TIME: "One-time", WEEK: "Weekly", MONTH: "Monthly", YEAR: "Yearly" };
const money = (n) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));

async function mountGive(host) {
  host.textContent = "";
  const seg = h("div", { class: "seg", role: "group", "aria-label": "Gift type" });
  const body = h("div", { class: "give-box__body" });
  host.append(h("div", { class: "give-box" }, seg, body));
  const modes = [
    ["once", "Give once", renderOnce],
    ["monthly", "Give monthly", renderMonthly],
  ];
  const btns = modes.map(([key, label, render]) => {
    const b = h("button", { type: "button", onclick: () => setMode(key) }, label);
    seg.append(b);
    return [key, b, render];
  });
  function setMode(key) {
    btns.forEach(([k, b]) => b.setAttribute("aria-pressed", k === key));
    body.textContent = "";
    body.append(h("div", { class: "form-skeleton", role: "status" }, "Loading…"));
    const entry = btns.find(([k]) => k === key);
    entry[2](body);
  }
  const requested = new URLSearchParams(location.search).get("mode");
  setMode(modes.some(([k]) => k === requested) ? requested : "once");
}
$$("[data-give]").forEach(mountGive);

/* Give once — one-time, no login required (Wix Donations). */
async function renderOnce(host) {
  host.textContent = "";
  host.append(h("div", { class: "form-skeleton", role: "status" }, "Loading giving options…"));
  let c;
  try {
    const r = await fetch("/api/give-campaign");
    const j = await r.json();
    if (!r.ok || !j.ok) throw new Error();
    c = j.campaign;
  } catch (e) { c = null; }
  host.textContent = "";
  if (!c || c.archived || ["EXPIRED", "GOAL_REACHED"].includes(c.status)) {
    host.append(h("div", { class: "form-status form-status--error" }, "Online giving is unavailable right now. Please contact us and we will help you give."));
    return;
  }
  const amt = (p) => Number((p && p.amount) || 0);
  const presets = (c.predefinedDonationAmounts || []).map((p) => amt(p.price)).filter((n) => n > 0);
  const freqs = (c.donationFrequencies || []).filter((f) => FREQ[f]);
  if (!freqs.length) freqs.push("ONE_TIME");
  const min = amt((c.customAmountOptions || {}).minimum) || 1;
  const st = { freq: freqs[0], amount: presets[0] || null, custom: false, text: "", fee: !!c.askDonorCoverFee, note: "", email: "", busy: false };
  const value = () => (st.custom ? Number(st.text.replace(/[\s,$]/g, "")) || null : st.amount);
  const fb = h("div", { class: "seg", role: "group", "aria-label": "Gift frequency" });
  const ab = h("div", { class: "amounts", role: "group", "aria-label": "Gift amount" });
  const ci = h("input", { id: "give-custom", type: "text", inputmode: "decimal", placeholder: "Enter an amount", autocomplete: "off", oninput: () => { st.text = ci.value; draw(); } });
  const ce = h("div", { class: "error", role: "alert" });
  const cf = h("div", { class: "field", hidden: true }, h("label", { for: "give-custom" }, "Other amount (USD)"), ci, ce);
  const ei = h("input", { id: "give-email", type: "email", autocomplete: "email", required: true, oninput: () => { st.email = ei.value; draw(); } });
  const ee = h("div", { class: "error", role: "alert" });
  const emailRow = h("div", { class: "field" }, h("label", { for: "give-email" }, "Email", h("span", { class: "req", "aria-hidden": "true" }, "*")), ei, ee, h("p", { class: "form-note" }, "We'll email your giving receipt here."));
  const fee = h("input", { type: "checkbox", id: "give-fee", onchange: () => { st.fee = fee.checked; draw(); } });
  const feeRow = c.askDonorCoverFee ? h("label", { class: "choice", for: "give-fee" }, fee, "Add the processing fee so more of my gift goes to care") : null;
  const note = h("textarea", { id: "give-note", rows: 2, maxlength: 100, placeholder: "Optional note", oninput: () => { st.note = note.value; } });
  const noteRow = c.commentsEnabled ? h("div", { class: "field" }, h("label", { for: "give-note" }, "Add a note (optional)"), note) : null;
  const tot = h("p", { class: "give-total", "aria-live": "polite" });
  const bad = h("div", { class: "form-status form-status--error", role: "alert", hidden: true });
  const go = h("button", { class: "btn btn--block", type: "button", onclick: donate }, "Continue to secure donation");
  const fbtns = freqs.map((f) => { const b = h("button", { type: "button", onclick: () => { st.freq = f; draw(); } }, FREQ[f]); fb.append(b); return [f, b]; });
  const pbtns = presets.map((n) => { const b = h("button", { type: "button", onclick: () => { st.amount = n; st.custom = false; draw(); } }, money(n)); ab.append(b); return [n, b]; });
  let cb = null;
  if (c.customAmountEnabled) { cb = h("button", { type: "button", onclick: () => { st.custom = true; draw(); ci.focus(); } }, "Custom"); ab.append(cb); }
  host.append(...[freqs.length > 1 ? fb : null, ab, cf, emailRow, feeRow, noteRow, tot, bad, go, h("p", { class: "form-note" }, "You will finish your gift on a secure Wix checkout page.")].filter((n) => n != null));
  function draw() {
    fbtns.forEach(([f, b]) => b.setAttribute("aria-pressed", st.freq === f));
    pbtns.forEach(([n, b]) => b.setAttribute("aria-pressed", !st.custom && st.amount === n));
    cb && cb.setAttribute("aria-pressed", st.custom);
    cf.hidden = !st.custom;
    const v = value();
    ce.textContent = st.custom && st.text && (!v || v < min) ? "The minimum donation is " + money(min) + "." : "";
    const f = v && st.fee ? Math.round(v * 2.9) / 100 : 0;
    tot.textContent = f ? "Total with fee: " + money(Math.round((v + f) * 100) / 100) : "";
    go.disabled = st.busy;
    go.textContent = st.busy ? "Opening checkout…" : v && v >= min ? "Donate " + money(v + f) + (st.freq === "ONE_TIME" ? "" : " " + FREQ[st.freq]) : "Continue to secure donation";
  }
  async function donate() {
    const v = value();
    bad.hidden = true;
    ee.textContent = "";
    if (!v || v < min) { ce.textContent = "Enter an amount of " + money(min) + " or more."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(st.email)) { ee.textContent = "Enter a valid email address."; ei.focus(); return; }
    st.busy = true; draw();
    try {
      const r = await fetch("/api/give-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: v, email: st.email, coverFee: st.fee && c.askDonorCoverFee, note: st.note.trim() }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Request failed");
      track("begin_checkout", { currency: "USD", value: v + (st.fee ? Math.round(v * 2.9) / 100 : 0), items: [{ item_name: "Donation" }] });
      location.href = j.url;
    } catch (e) {
      st.busy = false; draw();
      bad.hidden = false;
      bad.textContent = "We could not start the checkout. Please try again, or contact us and we will help you give.";
    }
  }
  draw();
}

/* Give monthly — recurring, requires a login to manage/cancel (Wix Pricing Plans). Wix's
   hosted checkout prompts for that login/signup itself; we only need to start the flow. */
async function renderMonthly(host) {
  host.textContent = "";
  host.append(h("div", { class: "form-skeleton", role: "status" }, "Loading giving plans…"));
  let plans;
  try {
    const r = await fetch("/api/giving-plans");
    const j = await r.json();
    if (!r.ok || !j.ok) throw new Error();
    plans = j.plans;
  } catch (e) { plans = null; }
  host.textContent = "";
  if (!plans || !plans.length) {
    host.append(h("div", { class: "form-status form-status--error" }, "Monthly giving is unavailable right now. Please contact us and we will help you give."));
    return;
  }
  const st = { planId: plans[0].id, busy: false };
  const ab = h("div", { class: "amounts", role: "group", "aria-label": "Monthly gift amount" });
  const bad = h("div", { class: "form-status form-status--error", role: "alert", hidden: true });
  const go = h("button", { class: "btn btn--block", type: "button", onclick: start }, "Continue to secure checkout");
  const note = h("p", { class: "form-note" }, "You'll sign in or create an account on a secure Wix checkout page — this is how you'll manage or cancel the gift later.");
  const pbtns = plans.map((p) => {
    const b = h("button", { type: "button", onclick: () => { st.planId = p.id; draw(); } }, money(p.amount) + "/mo");
    ab.append(b);
    return [p.id, b];
  });
  host.append(ab, bad, go, note);
  function draw() {
    pbtns.forEach(([id, b]) => b.setAttribute("aria-pressed", st.planId === id));
    go.disabled = st.busy;
    go.textContent = st.busy ? "Opening checkout…" : "Continue to secure checkout";
  }
  async function start() {
    bad.hidden = true;
    st.busy = true; draw();
    try {
      const r = await fetch("/api/give-monthly-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: st.planId }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "Request failed");
      const plan = plans.find((p) => p.id === st.planId);
      track("begin_checkout", { currency: "USD", value: plan ? plan.amount : 0, items: [{ item_name: "Monthly giving" }] });
      location.href = j.url;
    } catch (e) {
      st.busy = false; draw();
      bad.hidden = false;
      bad.textContent = "We could not start the checkout. Please try again, or contact us and we will help you give.";
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

  const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const tag = (p) => (p.tags && p.tags[0] ? p.tags[0].label : "News");

  host.innerHTML = posts.map((p) => {
    const img = p.coverImage && p.coverImage.url ? `<div class="post-card__cover"><img src="${p.coverImage.url}" alt="${p.title}" loading="lazy" width="800" height="450"></div>` : "";
    const slug = "/news/" + (p.slug || p.id);
    return `<a class="post-card" href="${slug}">
      ${img}
      <div class="post-card__inner">
        <div class="post-card__meta"><span class="post-tag">${tag(p)}</span><span class="post-date">${fmt(p.publishedDate)}</span></div>
        <h2 class="post-card__title">${p.title}</h2>
        <p class="post-card__summary">${p.excerpt || ""}</p>
        <span class="post-card__read">Read more →</span>
      </div>
    </a>`;
  }).join("");
}
$$("[data-wix-blog]").forEach(mountBlog);

/* Blog post — mounts on [data-wix-post] with data-slug.
   Fetches full post content and replaces static body when connected.
*/
async function mountPost(host) {
  const slug = host.dataset.slug;
  if (!slug) return;
  let post;
  try {
    const r = await api(`/blog/v3/posts/slugs/${slug}?fieldsets=CONTENT,CONTENT_TEXT,RICH_CONTENT`, "GET");
    post = r.post;
  } catch {
    return; // keep static HTML intact
  }
  if (!post) return;

  const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const tag = (p) => (p.tags && p.tags[0] ? p.tags[0].label : "News");
  const body = post.contentText || post.excerpt || "";

  host.innerHTML = `
    <p class="post-meta"><a href="/news">← News &amp; Updates</a> &nbsp;·&nbsp; <span class="post-tag">${tag(post)}</span> &nbsp;·&nbsp; ${fmt(post.publishedDate)}</p>
    <h1>${post.title}</h1>
    <p class="lead muted">${post.excerpt || ""}</p>
    <hr style="border:none;border-top:1px solid #e0dbd4;margin:1.5rem 0">
    <div class="post-body">${body}</div>
  `;
}
$$("[data-wix-post]").forEach(mountPost);
