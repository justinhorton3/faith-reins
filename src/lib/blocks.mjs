// CMS-backed blocks. Each renderer takes plain items and returns the block's inner HTML.
// The build calls them with the fallback copy in content.mjs; the browser (src/scripts/cms.js)
// calls the same functions with live Wix CMS items, so both paths produce identical markup.
import { profile, profileGrid, testimonial, faqList, section, split, sh, eyebrow, btn, tlink, esc } from "./lib.mjs";

/* ---------- Team ---------- */
const HIRING = `<div class="profile profile--hiring">${eyebrow("Now hiring")}<span class="profile__name">Speech-Language Pathologist</span><span class="profile__meta">M.S., CCC-SLP required</span><span class="profile__body">We are growing our SLP team to serve more children in South Arkansas. We are looking for a licensed, ASHA-certified clinician who wants to practice in a supportive, faith-rooted setting with a caseload focused on pediatrics. Competitive salary, collaborative team, and a barn out back.</span>${btn("Apply now", "/join-our-team", "accent", { size: "sm" })}</div>`;
export const isPublishedTeamMember = p => {
  const name = String(p.name || "").trim().replace(/\s+/g, " ");
  return !!name && !/^(sample name|your name|first(?:name)? last(?:name)?|tbd|placeholder|coming soon)$/i.test(name);
};
export function teamBlock(items) {
  // The same filter runs at build time and after CMS hydration. Do not publish sample
  // identities or turn an absent portrait into an illustrated clinician photograph.
  const cards = items.filter(isPublishedTeamMember).map(p => {
    const image = /(?:^|\/)avatar-[abc]\.(?:svg|png|webp)(?:[?#].*)?$/i.test(p.photo || "") ? "" : p.photo;
    return profile({ image, alt: p.name, eyebrow: p.role, name: p.name, meta: p.credentials, body: p.bio });
  });
  cards.splice(Math.min(3, cards.length), 0, HIRING);
  return profileGrid(cards, { cols: 3 });
}

/* ---------- Horses ---------- */
export const horsesBlock = (items) =>
  profileGrid(items.map((h) => profile({ image: h.photo, alt: h.name, eyebrow: h.trait, name: h.name, body: h.bio, note: h.note, ratio: "1 / 1" })), { cols: 4 });

/* ---------- Testimonials ---------- */
export const testimonialsBlock = (items) => items.map(testimonial).join("");

/* ---------- FAQ ---------- */
// Groups keep the order of their first question; questions keep their own order.
export function faqGroups(items) {
  const groups = new Map();
  for (const it of items) {
    const g = it.category || "General";
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push([it.question, it.answer]);
  }
  return [...groups];
}
export const faqGroupId = group => String(group).toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const faqBlock = (items) =>
  faqGroups(items).map(([group, qs], i) => section(split(
    sh({ eyebrow: String(i + 1).padStart(2, "0"), title: esc(group), size: "sm" }),
    faqList(qs, { openFirst: i === 0 }), { cols: "320px 1fr", gap: 64 }), { tone: i % 2 ? "paper" : "page", pad: "tight", id: faqGroupId(group) })).join("");

/* ---------- Sponsors ---------- */
const TIERS = ["Platinum", "Gold", "Silver", "Bronze"];
export function isPublishedSponsor(item) {
  const name = String(item?.name || "").trim().replace(/\s+/g, " ");
  return item?.approvedForPublication === true && !!name &&
    !/^(?:(?:platinum|gold|silver|bronze) sponsor|sample(?: sponsor| name)?|sponsor name|your (?:name|logo|company(?: name)?)|placeholder|tbd|coming soon)$/i.test(name);
}
const sponsorLogo = src => /(?:^|\/)sponsor-(?:platinum|gold|silver|bronze)(?:[.?#]|$)/i.test(src || "") ? "" : src;
export function sponsorsBlock(items) {
  items = items.filter(isPublishedSponsor);
  if (!items.length) return `<p>Help support families, programs and horse care through a community sponsorship.</p>${tlink("Explore sponsorship opportunities", "/sponsorships")}`;
  const order = [...TIERS, ...new Set(items.map((s) => s.tier).filter((t) => t && !TIERS.includes(t)))];
  return order.map((tier) => {
    const list = items.filter((s) => (s.tier || "Bronze") === tier);
    if (!list.length) return "";
    const logos = list.map((s) => {
      const logo = sponsorLogo(s.logo);
      const inner = logo ? `<img src="${esc(logo)}" alt="${esc(s.name)}" loading="lazy">` : `<span class="logo-slot__name">${esc(s.name)}</span>`;
      return `<div class="logo-slot">${s.website ? `<a href="${esc(s.website)}" target="_blank" rel="noopener">${inner}</a>` : inner}</div>`;
    }).join("");
    return `<div class="tier"><span class="tier__name">${esc(tier)}</span><div class="logos logos--${Math.max(3, Math.min(list.length, 5))}">${logos}</div></div>`;
  }).join("");
}
