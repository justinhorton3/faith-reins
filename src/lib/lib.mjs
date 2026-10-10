// Shared HTML helpers for the Faith Reins static build.
import media from "./media.json" with { type: "json" };

export { media };
export const FORMS = {
  contact: "23cf24ab-86ff-4595-8a3b-7535900f4a23",
  appointment: "31632052-e00f-473d-9edd-e64c699b83ef",
  sponsor: "17fc908b-9d0d-4554-8b4f-f45d009b1721",
};
export const CAMPAIGN = "fea961a8-acc5-428b-801c-b64f4c6603f4";

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const img = (key) => {
  if (!media[key]) throw new Error("missing media key " + key);
  return media[key];
};

const P = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
  hand: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 14a1.6 1.6 0 0 1 2.6-1.8L7 13"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M9 7h6"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  home: '<path d="M3 11 12 4l9 7M5 10v10h14V10"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  horse: '<path d="M4 20c0-6 2-10 6-12l2-4 2 3 4 1v3l-3 1c0 3 1 5 1 8M10 8l-3 2"/>',
};
export const icon = (name) => `<i class="ic i-${P[name] ? name : "star"}"></i>`;
export const iconCss = () => ".ic{display:inline-block;width:24px;height:24px;flex:none;background:currentColor;-webkit-mask:var(--m) center/contain no-repeat;mask:var(--m) center/contain no-repeat}" + Object.entries(P).map(([k, v]) => `.i-${k}{--m:url("data:image/svg+xml,${(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#000' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'>${v.replace(/"/g, "'")}</svg>`).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23")}")}`).join("");

export const btn = (label, href, kind = "", arrow = false) =>
  `<a class="btn${kind ? " btn--" + kind : ""}" href="${href}">${esc(label)}</a>`;
export const link = (label, href) => `<a class="text-link" href="${href}">${esc(label)}</a>`;

export function hero({ key, h1, body, ctas = [], focus, short = false, mobileFocus }) {
  const d = img(`hero-${key}-desktop`), m = img(`hero-${key}-mobile`);
  return `<section class="hero${short ? " hero--short" : ""}"${focus ? ` style="--focus:${focus}"` : ""}>
  <picture><source media="(max-width: 767px)" srcset="${m}"><img src="${d}" alt="" fetchpriority="high"></picture>
  <div class="container hero__content"><div class="hero__copy"><h1>${esc(h1)}</h1><p>${esc(body)}</p>
  ${ctas.length ? `<div class="btn-row">${ctas.map((c) => btn(c[0], c[1], c[2] || "light")).join("")}</div>` : ""}</div></div></section>`;
}

export const section = (inner, cls = "") => `<section class="section${cls ? " " + cls : ""}"><div class="container">${inner}</div></section>`;
export const head = (h2, p = "", left = false) => `<div class="section-head${left ? " section-head--left" : ""}"><h2>${esc(h2)}</h2>${p ? `<p>${esc(p)}</p>` : ""}</div>`;
export const grid = (n, items) => `<div class="grid grid--${n}">${items.join("")}</div>`;

export function card({ ic, title, text, href, linkLabel = "Learn more", center = false }) {
  return `<div class="card${center ? " card--center" : ""}">${ic ? `<span class="icon-badge${center ? "" : " icon-badge--sm"}">${icon(ic)}</span>` : ""}<h3>${esc(title)}</h3><p>${esc(text)}</p>${href ? link(linkLabel, href) : ""}</div>`;
}
export function steps(list, gold = false) {
  return `<div class="steps">${list.map(([t, p], i) => `<div class="step"><span class="step__num${gold ? " step__num--gold" : ""}">${i + 1}</span><div><h3>${esc(t)}</h3><p>${esc(p)}</p></div></div>`).join("")}</div>`;
}
export function checks(list) {
  return `<ul class="check-list">${list.map(([t, p]) => `<li>${icon("check")}<div><strong>${esc(t)}</strong>${p ? `<span>${esc(p)}</span>` : ""}</div></li>`).join("")}</ul>`;
}
export function faq(list) {
  return `<div class="faq">${list.map(([q, a]) => `<details><summary>${esc(q)}</summary><div class="faq__a">${a}</div></details>`).join("")}</div>`;
}
export function cta({ h2, p, buttons, green = false }) {
  return `<div class="cta-band${green ? " cta-band--green" : ""}"><div class="cta-band__copy"><h2 class="h-card">${esc(h2)}</h2>${p ? `<p>${esc(p)}</p>` : ""}</div><div class="btn-row">${buttons.join("")}</div></div>`;
}
export const split = (text, image, alt = "", reverse = false) =>
  `<div class="split">${reverse ? `<img src="${image}" alt="${esc(alt)}" loading="lazy">${text}` : `${text}<img src="${image}" alt="${esc(alt)}" loading="lazy">`}</div>`;
export const notice = (t) => `<div class="notice">${icon("info")}<p>${esc(t)}</p></div>`;
export const form = (kind, { submit, success, layout = "", wide = "", btnKind = "" }) =>
  `<div data-wix-form data-form-id="${FORMS[kind]}" data-submit="${esc(submit)}" data-success="${esc(success)}"${layout ? ` data-layout="${layout}"` : ""}${wide ? ` data-wide="${wide}"` : ""}${btnKind ? ` data-btn="${btnKind}"` : ""}><noscript>Please enable JavaScript to use this form.</noscript></div>`;

/* ---------- Shell ---------- */
const NAV = [
  ["About", "/our-mission", false, ["/our-mission", "/our-team", "/our-horses"]],
  ["Services & Programs", "/services-programs", true, ["/services-programs", "/speech-language-therapy", "/occupational-therapy", "/physical-therapy", "/counseling", "/equine-assisted-learning"]],
  ["For Families", "/for-families", true, ["/for-families", "/book-online", "/payment-and-insurance", "/faq"]],
  ["Get Involved", "/give", false, ["/give", "/sponsorships", "/impact-and-stewardship", "/our-partners", "/join-our-team"]],
  ["Shop", "/shop", false, ["/shop"]],
];
const DRAWER = [["Home", "/", ["/"]], ...NAV.map(([l, h, , m]) => [l, h, m]), ["Contact", "/contact", ["/contact"]]];

export function header(route) {
  const cur = (m) => (m.includes(route) ? ' aria-current="page"' : "");
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container site-header__inner">
<a class="site-header__logo" href="/" aria-label="Faith Reins home"><img src="${img("logo")}" alt="Faith Reins" width="152" height="53"></a>
<nav class="site-nav" aria-label="Primary">
${NAV.map(([l, h, t, m]) => `<a class="nav-link"${t ? " data-tablet" : ""} href="${h}"${cur(m)}>${esc(l)}</a>`).join("\n")}
${btn("Donate", "/give")}
<button class="menu-btn" type="button" data-drawer-open aria-label="Open menu" aria-controls="drawer" aria-expanded="false">${icon("menu")}</button>
</nav></div></header>
<div class="drawer" id="drawer" hidden role="dialog" aria-modal="true" aria-label="Menu"><div class="drawer__scrim" data-drawer-close></div>
<div class="drawer__panel"><div class="drawer__top"><img src="${img("logo")}" alt="Faith Reins" width="136" height="48"><button class="menu-btn" type="button" data-drawer-close aria-label="Close menu" style="display:inline-flex">${icon("close")}</button></div>
${btn("Donate", "/give")}
${DRAWER.map(([l, h, m]) => `<a class="drawer-link" href="${h}"${cur(m)}>${esc(l)}</a>`).join("\n")}
</div></div>`;
}

export function footer() {
  const links = [["About", "/our-mission"], ["Services & Programs", "/services-programs"], ["For Families", "/for-families"], ["Shop", "/shop"], ["Give", "/give"], ["Volunteer & Careers", "/join-our-team"], ["FAQ", "/faq"]];
  return `<footer class="site-footer"><div class="container"><div class="site-footer__grid">
<div class="site-footer__brand"><img src="${img("logo-white")}" alt="Faith Reins" width="210" height="64">
<address><span><a href="tel:+18708184087">870-818-4087</a></span><span><a href="mailto:info@faithreins.com">info@faithreins.com</a></span><span>226 Ouachita County Rd 45</span><span>Camden, AR 72711</span><span>Clinic: M–F 8:00 AM – 5:00 PM</span><span>Private sessions by appointment</span></address></div>
<ul class="site-footer__links" aria-label="Footer">${links.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join("")}</ul>
<div class="site-footer__connect"><h2>Connect with us</h2>
${form("contact", { submit: "Send message", success: "Thank you. We received your message.", btnKind: "accent" })}
<p class="form-note mt-16">Please do not include medical information.</p></div>
</div>
<div class="site-footer__bottom"><span>© ${new Date().getFullYear()} Faith Reins. All rights reserved.</span><nav aria-label="Legal"><a href="/privacy-policy">Privacy</a><a href="/accessibility">Accessibility</a><a href="/donation-policy">Donation Policy</a></nav></div>
</div></footer>`;
}
