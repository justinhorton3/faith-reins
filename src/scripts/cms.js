// Live Wix CMS content. Each [data-cms] block ships with the fallback copy baked in at build time;
// when its collection has items, they replace the block, so edits in the Wix dashboard
// (CMS > Team, Horses, Testimonials, FAQ, Sponsors) show without a redeploy.
// Any failure (collection missing, empty, offline) leaves the built HTML untouched.
import { teamBlock, horsesBlock, testimonialsBlock, faqBlock, sponsorsBlock } from "../lib/blocks.mjs";

// Wix image fields come back as wix:image://v1/<mediaId>/<name>#...; plain URLs pass through.
const media = (v) => {
  if (!v) return "";
  if (typeof v === "object") v = v.url || v.src || "";
  const m = /^wix:image:\/\/v1\/([^/#]+)/.exec(v);
  return m ? `https://static.wixstatic.com/media/${m[1]}` : /^(https?:)?\/\//.test(v) || v.startsWith("/") ? v : "";
};
const str = (v) => (v == null ? "" : String(v));
const url = (v) => (/^https?:\/\//i.test(str(v)) ? str(v) : "");

// Rich-text answers are admin-authored HTML; keep formatting and links, drop anything executable.
function cleanHtml(html) {
  const doc = new DOMParser().parseFromString(`<div>${str(html)}</div>`, "text/html");
  doc.querySelectorAll("script,style,iframe,object,embed,form,link,meta").forEach((n) => n.remove());
  doc.querySelectorAll("*").forEach((n) => {
    for (const a of [...n.attributes]) {
      if (/^on/i.test(a.name) || a.name === "style" || (/^(href|src)$/i.test(a.name) && /^\s*(javascript|data):/i.test(a.value))) n.removeAttribute(a.name);
    }
  });
  return doc.body.firstChild.innerHTML;
}

const BLOCKS = {
  team: { collection: "Team", render: teamBlock, map: (d) => ({ name: str(d.name), role: str(d.role), credentials: str(d.credentials), bio: str(d.bio), photo: media(d.photo) }) },
  horses: { collection: "Horses", render: horsesBlock, map: (d) => ({ name: str(d.name), trait: str(d.trait), bio: str(d.bio), note: str(d.note), photo: media(d.photo) }) },
  testimonials: { collection: "Testimonials", render: testimonialsBlock, map: (d) => ({ quote: str(d.quote), name: str(d.name), context: str(d.context) }) },
  faq: { collection: "FAQ", render: faqBlock, map: (d) => ({ category: str(d.category), question: str(d.question), answer: cleanHtml(d.answer) }) },
  sponsors: { collection: "Sponsors", render: sponsorsBlock, map: (d) => ({ name: str(d.name), tier: str(d.tier), logo: media(d.logo), website: url(d.website) }) },
};

async function load(host) {
  const b = BLOCKS[host.dataset.cms];
  if (!b || typeof window.__frApi !== "function") return;
  try {
    const r = await window.__frApi("/wix-data/v2/items/query", "POST", {
      dataCollectionId: b.collection,
      query: { sort: [{ fieldName: "sortOrder", order: "ASC" }], paging: { limit: 100 } },
    });
    const items = (r.dataItems || []).map((it) => b.map(it.data || {})).filter((it) => it.name || it.quote || it.question);
    if (!items.length) return;
    // An entry with no photo keeps the photo the built page shows for the same name.
    const built = new Map([...host.querySelectorAll(".profile")].map((p) => [p.querySelector(".profile__name")?.textContent.trim(), p.querySelector("img.profile__img")?.getAttribute("src")]));
    for (const it of items) if ("photo" in it && !it.photo && built.get(it.name)) it.photo = built.get(it.name);
    host.innerHTML = b.render(items);
    host.dataset.cmsLive = "";
  } catch {
    /* keep the built content */
  }
}

document.querySelectorAll("[data-cms]").forEach(load);
