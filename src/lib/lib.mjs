// Faith Reins v6 components for the static build. Markup only; styles live in src/styles/global.css.
// Follows brand/FaithReins_DesignSystem_v6 (tokens, components, ui_kits/website).
import media from "./media.json" with { type: "json" };
import { NAVIGATION, POLICY_LINKS, matchesNavigation } from "./navigation.mjs";

export { media };
export const FORMS = {
  contact: "2dcfa70f-a58e-4a15-8011-194ffa131a42",
  appointment: "c0fdca58-8027-46af-998d-a1feaaed2493",
  sponsor: "811ee3c1-d782-4ce6-ac01-703ae9b47b1b",
};
export const CAMPAIGN = "6f213c29-26a1-478d-9461-40b5164c26e1";

export const SITE = {
  phone: "870-818-4087",
  tel: "+18708184087",
  email: "info@faithreins.com",
  street: "226 Ouachita County Rd 45",
  city: "Camden, AR 72711",
  hours: "Clinic: M–F 8:00 AM – 5:00 PM",
  appt: "Private sessions by appointment",
};

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const img = (key) => {
  if (!media[key]) throw new Error("missing media key " + key);
  return media[key];
};
const cx = (...c) => c.filter(Boolean).join(" ");
const attr = (k, v) => (v == null || v === false ? "" : ` ${k}="${esc(v)}"`);

/* ---------- Core ---------- */
// kind: "" (primary green) | "accent" (gold) | "outline" | "outline-inv"
export const btn = (label, href, kind = "", { size, block } = {}) =>
  `<a class="${cx("btn", kind && "btn--" + kind, size === "sm" && "btn--sm", block && "btn--block")}" href="${href}">${esc(label)}</a>`;
export const tlink = (label, href, { inv = false, arrow = false, cls = "" } = {}) =>
  `<a class="${cx("tlink", inv && "tlink--inv", cls)}" href="${href}">${esc(label)}${arrow ? '<span aria-hidden="true">→</span>' : ""}</a>`;
export const eyebrow = (text, { inv = false, rule = false } = {}) =>
  `<span class="${cx("eyebrow", inv && "eyebrow--inv", rule && "eyebrow--rule")}">${esc(text)}</span>`;

/* ---------- Brand ---------- */
// Lockup L1: horse mark, FAITH REINS, tagline between gold rules. Sizes xs | sm | md.
export function lockup({ size = "sm", tone = "light" } = {}) {
  // Approved V7 horizontal lockup (horse, wordmark and subtitle as one vector). The subtitle stays at every size.
  const src = img(tone === "light" ? "lockup-green" : "lockup-cream");
  return `<img class="${cx("lockup", "lockup--" + size)}" src="${src}" alt="Faith Reins, Pediatric &amp; Equine Therapy" width="2252" height="384">`;
}

/* ---------- Layout ---------- */
// tone: page | sand | paper | white | green ; pad: default | tight | none
export const section = (inner, { tone = "page", pad = "", id = "", cls = "" } = {}) =>
  `<section class="${cx("sec", tone !== "page" && "sec--" + tone, pad && "sec--" + pad, cls)}"${attr("id", id || null)}><div class="sec__in">${inner}</div></section>`;
// stack: "tablet" (default, stacks below 1024) | "mobile"
export const split = (left, right, { cols = "1fr 1fr", stack = "tablet", align = "start", gap } = {}) =>
  `<div class="${cx("split", stack === "mobile" && "split--late")}" style="--cols:${cols};--align:${align}${gap ? ";--split-gap:" + gap + "px" : ""}"><div>${left}</div><div>${right}</div></div>`;
export const stack = (...parts) => `<div class="stack">${parts.join("")}</div>`;
export const panel = (inner) => `<div class="panel">${inner}</div>`;

/* ---------- Content ---------- */
export function sh({ eyebrow: eb, title, body, link: lk, face = "display", size = "md", center = false, inv = false, h = 2 }) {
  return `<div class="${cx("sh", center && "sh--center", size === "sm" && "sh--sm", face === "serif" && "sh--serif", inv && "sh--inv")}">${eb ? eyebrow(eb, { inv }) : ""}<h${h} class="sh__title">${title}</h${h}>${body ? `<p class="sh__body">${body}</p>` : ""}${lk ? tlink(lk[0], lk[1], { inv }) : ""}</div>`;
}

const MOBILE_FOCUS = { "book-online": "12% 50%", contact: "22% 50%", counseling: "88% 50%", "for-families": "72% 50%", give: "82% 50%", "for-referring-providers": "58% 50%", "speech-language-therapy": "35% 50%" };
export function hero({ key, eyebrow: eb, title, lead, primary, secondary, size = "page", pos = "50% 50%", mpos }) {
  const d = img(`hero-${key}-desktop`), m = img(`hero-${key}-mobile`);
  const p = primary ? btn(primary[0], primary[1], primary[2] || "accent") : "";
  const s = secondary ? btn(secondary[0], secondary[1], "outline-inv") : "";
  return `<section class="hero hero--${size}" style="--pos:${pos};--mpos:${mpos || MOBILE_FOCUS[key] || "50% 50%"}">
<picture><source media="(max-width: 767px)" srcset="${m}" width="767" height="900"><img class="hero__img" src="${d}" alt="" fetchpriority="high" width="1440" height="800"></picture>
<div class="hero__scrim"></div>
<div class="hero__body">${eb ? eyebrow(eb, { inv: true, rule: true }) : ""}<h1 class="hero__title">${title}</h1>${lead ? `<p class="hero__lead">${lead}</p>` : ""}${p || s ? `<div class="hero__actions">${p}${s}</div>` : ""}</div>
</section>`;
}
// Sand title band for pages without a photo (legal, thank-you, news).
export const titleBand = ({ eyebrow: eb, title, body }) => section(sh({ eyebrow: eb, title, body, h: 1 }), { tone: "sand", pad: "tight", cls: "sec--title" });

export function therapyIndex(items) {
  return `<div class="tix">${items.map((it, i) => `<a class="tix__row" href="${it.href}"><span class="tix__num">${String(i + 1).padStart(2, "0")}</span><span class="tix__text"><span class="tix__title">${esc(it.title)}</span><span class="tix__desc">${esc(it.desc)}</span></span><span class="tix__media">${it.image ? `<img src="${it.image}" alt="" loading="lazy" width="140" height="84" style="object-position:${it.pos || "50% 50%"}">` : ""}<span class="tix__arrow" aria-hidden="true">→</span></span></a>`).join("")}</div>`;
}
export function tiles(items, { bg = "white" } = {}) {
  return `<div class="tiles tiles--${bg}"><div class="tiles__in">${items.map((it) => `<div class="tile">${eyebrow(it.eyebrow)}<span class="tile__title">${esc(it.title)}</span>${tlink(it.label, it.href)}</div>`).join("")}</div></div>`;
}
export function splitFeature({ image, pos = "50% 50%", alt = "", eyebrow: eb, title, body, actions = "", variant = "inset", reverse = false, bg = "" }) {
  const text = `<div class="sf__text">${eb ? eyebrow(eb) : ""}<h2 class="sf__title">${title}</h2>${body ? `<p class="sf__body">${body}</p>` : ""}${actions ? `<div class="sf__actions">${actions}</div>` : ""}</div>`;
  const pic = `<img class="sf__img" src="${image}" alt="${esc(alt)}" loading="lazy" style="object-position:${pos}">`;
  return `<section class="${cx("sf", "sf--" + variant, reverse && "sf--reverse", bg && "sf--bg-" + bg)}">${pic}${text}</section>`;
}
export const steps = (items) =>
  `<ol class="steps steps--${Math.min(items.length, 4)}">${items.map(([t, p], i) => `<li class="step"><span class="step__num">${i + 1}</span><div class="step__text"><span class="step__title">${esc(t)}</span>${p ? `<span class="step__body">${esc(p)}</span>` : ""}</div></li>`).join("")}</ol>`;
// items: "text" | [title, body]
export const checks = (items, { cols = 1 } = {}) =>
  `<ul class="checks${cols > 1 ? " checks--2" : ""}">${items.map((it) => {
    const [t, b] = Array.isArray(it) ? it : [it, ""];
    return `<li class="${b ? "check check--rich" : "check"}"><span class="check__dot" aria-hidden="true"></span><span class="check__text"><span class="check__title">${esc(t)}</span>${b ? `<span class="check__body">${esc(b)}</span>` : ""}</span></li>`;
  }).join("")}</ul>`;
// items: { eyebrow, meta, title, body, link: [label, href], strong, html }
export const infoGrid = (items, { cols = 3 } = {}) =>
  `<div class="info info--${cols}">${items.map((it) => `<div class="${cx("info__item", it.strong && "info__item--strong")}">${it.eyebrow ? eyebrow(it.eyebrow) : ""}${it.meta ? `<span class="info__meta">${esc(it.meta)}</span>` : ""}<span class="info__title">${esc(it.title)}</span>${it.body ? `<span class="info__body">${it.html ? it.body : esc(it.body)}</span>` : ""}${it.link ? tlink(it.link[0], it.link[1]) : ""}</div>`).join("")}</div>`;
export const testimonial = ({ quote, name, context }) =>
  `<figure class="quote"><span class="quote__mark" aria-hidden="true">“</span><blockquote class="quote__text">${esc(quote)}</blockquote><figcaption class="quote__cap"><span class="quote__name">${esc(name)}</span>${context ? `<span class="quote__ctx">${esc(context)}</span>` : ""}</figcaption></figure>`;
// items: [question, answerHtml]
export const faqList = (items, { openFirst = false } = {}) =>
  `<div class="faq">${items.map(([q, a], i) => `<details${openFirst && i === 0 ? " open" : ""}><summary>${esc(q)}</summary><div class="faq__a">${a}</div></details>`).join("")}</div>`;
export function ctaBand({ tone = "green", eyebrow: eb, title, body, primary, secondary }) {
  const g = tone === "green";
  return `<section class="cta cta--${tone}"><div class="cta__in"><div class="cta__copy">${eb ? eyebrow(eb, { inv: g }) : ""}<h2 class="cta__title">${esc(title)}</h2>${body ? `<p class="cta__body">${esc(body)}</p>` : ""}</div><div class="cta__actions">${primary ? btn(primary[0], primary[1], g ? "accent" : "") : ""}${secondary ? btn(secondary[0], secondary[1], g ? "outline-inv" : "outline") : ""}</div></div></section>`;
}
export const photoBand = ({ image, pos = "50% 50%", caption = "", alt = "" }) =>
  `<figure class="band"><img src="${image}" alt="${esc(alt)}" loading="lazy" style="object-position:${pos}">${caption ? `<figcaption>${esc(caption)}</figcaption>` : ""}</figure>`;
export const profile = ({ image, pos = "50% 50%", alt, eyebrow: eb, name, meta, body, note, ratio = "4 / 5" }) =>
  `<div class="profile">${image ? `<img class="profile__img" src="${image}" alt="${esc(alt || name)}" loading="lazy" style="aspect-ratio:${ratio};object-position:${pos}">` : ""}<div class="profile__text">${eb ? eyebrow(eb) : ""}<span class="profile__name">${esc(name)}</span>${meta ? `<span class="profile__meta">${esc(meta)}</span>` : ""}${body ? `<span class="profile__body">${esc(body)}</span>` : ""}${note ? `<span class="profile__note">${esc(note)}</span>` : ""}</div></div>`;
export const profileGrid = (cards, { cols = 4 } = {}) => `<div class="profiles profiles--${cols}">${cards.join("")}</div>`;
export const notice = (t) => `<div class="note">${eyebrow("Please note")}<p>${esc(t)}</p></div>`;
export const reach = (label, valueHtml, { big = false } = {}) =>
  `<div class="reach">${eyebrow(label)}<span class="${big ? "reach__big" : "reach__val"}">${valueHtml}</span></div>`;
export const form = (kind, { submit, success, layout = "", wide = "", btnKind = "", purpose = "" }) =>
  `<div data-wix-form data-form-id="${FORMS[kind]}" data-submit="${esc(submit)}" data-success="${esc(success)}"${layout ? ` data-layout="${layout}"` : ""}${wide ? ` data-wide="${wide}"` : ""}${btnKind ? ` data-btn="btn--${btnKind}"` : ""}${purpose ? ` data-purpose="${esc(purpose)}"` : ""}><noscript>Please enable JavaScript to use this form, or call ${SITE.phone}.</noscript></div>`;

/* ---------- Shell: approved persona sitemap ---------- */
const bars = `<span class="bars" aria-hidden="true"><i></i><i></i><i></i></span>`;
const currentLink = (route, href) => route === href.split('#')[0] && !href.includes('#') ? ' aria-current="page"' : '';
function megaMenu(group, route) {
  return `<details class="mega-nav-item${matchesNavigation(route, group) ? ' is-current' : ''}" data-mega-menu="${group.id}" name="primary-mega-menu">
<summary class="nav-link" id="nav-${group.id}" aria-controls="mega-${group.id}">${esc(group.label)}<span class="mega-toggle" aria-hidden="true"></span></summary>
<section class="mega-panel" id="mega-${group.id}" aria-labelledby="nav-${group.id}"><div class="mega-panel__in">
<div class="mega-panel__top">${eyebrow(group.eyebrow)}<div class="mega-panel__tools"><a class="mega-panel__overview" href="${group.href}">${esc(group.overview)} <span aria-hidden="true">↗</span></a><button class="mega-close" type="button" data-mega-close aria-label="Close ${esc(group.label)} menu">Close <span aria-hidden="true">×</span></button></div></div>
<div class="mega-grid">${group.links.map(link => `<a class="mega-card" href="${link.href}"${currentLink(route, link.href)}><img class="mega-card__image" src="${link.image}" alt="" width="90" height="76" loading="lazy"><span class="mega-card__copy">${link.group ? `<span class="mega-card__group">${esc(link.group)}</span>` : ''}<span class="mega-card__title">${esc(link.label)} <span class="mega-card__arrow" aria-hidden="true">↗</span></span><span class="mega-card__description">${esc(link.description)}</span></span></a>`).join('')}</div>
<div class="mega-panel__foot"><p>${esc(group.prompt)}</p>${tlink(group.action[0], group.action[1], { arrow: true })}</div>
</div></section></details>`;
}
function mobileGroup(group, route) {
  return `<details class="drawer-group" name="mobile-navigation" data-mobile-group><summary class="drawer-link">${esc(group.label)}<span class="mega-toggle" aria-hidden="true"></span></summary><div class="drawer-group__links"><a class="drawer-group__overview" href="${group.href}"${currentLink(route, group.href)}>${esc(group.overview)} <span aria-hidden="true">→</span></a><div class="drawer-group__grid">${group.links.map(link => `<a class="drawer-card" href="${link.href}"${currentLink(route, link.href)}><img src="${link.image}" alt="" width="72" height="60" loading="lazy"><span>${esc(link.label)}</span></a>`).join('')}</div><a class="drawer-group__action" href="${group.action[1]}">${esc(group.action[0])} <span aria-hidden="true">→</span></a></div></details>`;
}
export function header(route = '') {
  return `<a class="skip-link" href="#main">Skip to content</a>
<div class="utility"><div class="utility__in"><span class="utility__tag">A non-profit serving South Arkansas families</span><span class="utility__links"><a href="tel:${SITE.tel}">${SITE.phone}</a><a href="/contact">Contact</a><a href="/account"${currentLink(route, '/account')}>My Account</a><button class="cart-btn" id="cart-btn" type="button" aria-haspopup="dialog" aria-label="Shopping bag">Bag<span class="cart-badge" id="cart-badge" hidden>0</span></button></span></div></div>
<header class="site-header"><div class="site-header__in"><a class="site-header__logo" href="/" aria-label="Faith Reins home">${lockup({ size: 'sm' })}</a><nav class="site-nav" aria-label="Primary"><div class="site-nav__links">${NAVIGATION.map(group => megaMenu(group, route)).join('')}</div>${btn('Donate', '/give', '', { size: 'sm' })}</nav><div class="site-header__compact"><span class="site-header__support">${btn('Donate', '/give', '', { size: 'sm' })}</span><button class="menu-btn" type="button" data-drawer-open aria-label="Open menu" aria-controls="drawer" aria-expanded="false">${bars}</button><noscript><a href="/site-map">Site map</a></noscript></div></div></header>
<div class="drawer" id="drawer" hidden role="dialog" aria-modal="true" aria-label="Menu"><div class="drawer__panel"><div class="drawer__top">${lockup({ size: 'xs' })}<button class="menu-btn menu-btn--open" type="button" data-drawer-close aria-label="Close menu">${bars}</button></div><nav aria-label="Mobile navigation"><a class="drawer-link drawer-link--account" href="/account">My Account</a><button class="drawer-link drawer-bag" type="button" data-drawer-bag>Shopping bag <span aria-hidden="true">↗</span></button><a class="drawer-link" href="/">Home</a>${NAVIGATION.map(group => mobileGroup(group, route)).join('')}<a class="drawer-link drawer-link--account" href="/contact">Contact</a></nav><div class="drawer__foot">${btn('Donate', '/give', '', { block: true })}<a class="drawer__phone" href="tel:${SITE.tel}">${SITE.phone}</a></div></div><div class="drawer__scrim" data-drawer-close></div></div>`;
}

export function footer() {
  return `<footer class="site-footer"><div class="site-footer__in"><div class="site-footer__overview"><div class="site-footer__brand">${lockup({ size: 'sm', tone: 'dark' })}<p>A non-profit pediatric and equine therapy practice serving the children and families of South Arkansas.</p><address><a href="tel:${SITE.tel}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a><br>${SITE.street}<br>${SITE.city}</address></div><div class="gift"><span class="gift__title">Keep care close to home.</span><span class="gift__body">Your gift helps children and families reach care and helps us care for our horses.</span>${btn('Donate', '/give', 'accent', { size: 'sm', block: true })}${tlink('My Account', '/account', { inv: true })}</div></div>
<nav class="site-footer__sitemap" aria-label="Footer sitemap">${NAVIGATION.map(group => `<div class="site-footer__col"><span class="site-footer__head">${esc(group.label)}</span><a href="${group.href}">${esc(group.overview)}</a>${group.links.filter(link => link.href !== group.href).map(link => `<a href="${link.href}">${esc(link.label)}</a>`).join('')}</div>`).join('')}</nav>
<div class="site-footer__bottom"><span>501(c)(3) non-profit · Camden, Arkansas</span><nav aria-label="Legal"><a href="/site-map">Site map</a>${POLICY_LINKS.map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join('')}</nav><span>© ${new Date().getFullYear()} Faith Reins</span></div></div></footer>`;
}
