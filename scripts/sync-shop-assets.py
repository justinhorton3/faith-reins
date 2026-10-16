#!/usr/bin/env python3
"""Import the two owner-approved Shop photos as unchanged V7 masters.

This performs image-format conversion only; no regenerated people, products,
identity artwork or scene changes. Manifest records exact source checksums.
"""
import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
V7 = ROOT / "brand/v7-design-system"
ARCHIVE = V7 / "foundations/photography/storefront/shop"
WEB = ROOT / "public/assets/shop/v7/heroes"
MANIFEST = ROOT / "docs/storefront-heroes/shop-assets.json"
CHECKSUMS = V7 / "FILE-CHECKSUMS.json"

SOURCES = {
    "desktop": {
        "url": "https://static.wixstatic.com/media/8fe1a1_db49ada37a0c42e3bf0e61d9541479bc~mv2.png",
        "sha256": "b95879f7c19a16cfc08950aa6eaef370cdd142968a7ff51729627a2be1e24807",
        "size": (1536, 1024),
    },
    "mobile": {
        "url": "https://static.wixstatic.com/media/8fe1a1_192549095e6f4d80bb5e3f077dda13a8~mv2.png",
        "sha256": "aca935db3c9b61d1de33e83d347a0f05c337e405b8f372441b955f54755052b0",
        "size": (1024, 1536),
    },
}

def sha(data):
    return hashlib.sha256(data).hexdigest()

def export(im, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, "WEBP", quality=88, method=6)
    data = path.read_bytes()
    return {
        "path": path.relative_to(ROOT).as_posix(),
        "width": im.width, "height": im.height,
        "bytes": len(data), "sha256": sha(data),
    }

def main():
    checks = json.loads(CHECKSUMS.read_text())
    ARCHIVE.mkdir(parents=True, exist_ok=True)
    files = []
    for key, source in SOURCES.items():
        request = Request(source["url"], headers={"User-Agent": "FaithReinsOwnerApprovedImage/1.0"})
        with urlopen(request, timeout=120) as response:
            data = response.read()
        if sha(data) != source["sha256"]:
            raise RuntimeError(
                f"Refusing to replace approved Shop {key}: "
                f"expected {source['sha256']}, received {sha(data)}"
            )
        with Image.open(io.BytesIO(data)) as original:
            if original.format != "PNG" or original.size != source["size"]:
                raise RuntimeError(f"Unexpected {key} source: {original.format}, {original.size}")
            photo = original.convert("RGB")
        master = ARCHIVE / f"shop-approved-{key}-master.png"
        master.write_bytes(data)
        checks[master.relative_to(V7).as_posix()] = sha(data)
        web = export(photo, WEB / f"shop-{key}.webp")
        v7 = export(photo, ARCHIVE / f"shop-{key}.webp")
        checks[(ARCHIVE / f"shop-{key}.webp").relative_to(V7).as_posix()] = v7["sha256"]
        files.append({
            "view": key, "sourceUrl": source["url"],
            "approvedMaster": master.relative_to(ROOT).as_posix(),
            "masterSha256": sha(data), "website": web, "v7Archive": v7,
        })
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps({
        "category": "shop", "approved": "2026-10-16",
        "review": "Owner approved the specific desktop and mobile farm scene",
        "sourcePolicy": "Keep exact source images; no visual retouch or logo regeneration",
        "usage": "Shop landing hero, not any individual product/category page",
        "identityNote": "Any depicted marks are approved lifestyle concept imagery; final production logo files remain the exact V7 SVG masters.",
        "noBakedInPageText": True, "releasedToLiveSite": False,
        "images": files,
    }, indent=2) + "\n")
    # Keep the standalone V7 design-system documentation aligned with the
    # owner-approved Shop pair; never reinterpret or regenerate approved art.
    brief_path = V7 / "merchandise/SHOP-HERO-BRIEF.md"
    brief = brief_path.read_text()
    headline = """# Shop hero — owner-approved V7 ranch photography

**Approved by owner:** October 16, 2026 — both 1536 × 1024 desktop and 1024 × 1536 mobile photographic compositions.

| View | Portable source master | Portable WebP copy |
| --- | --- | --- |
| Desktop | \`foundations/photography/storefront/shop/shop-approved-desktop-master.png\` | \`foundations/photography/storefront/shop/shop-desktop.webp\` |
| Mobile | \`foundations/photography/storefront/shop/shop-approved-mobile-master.png\` | \`foundations/photography/storefront/shop/shop-mobile.webp\` |

Two adults in forest-green and cream merchandise stand beside a horse at the ranch. The **Shop landing page only** uses these approved photographs. The earlier barn-table product collection scene is retained as historical concept art, not the current landing hero. Responsive website files are independent copies at \`public/assets/shop/v7/heroes/shop-{desktop,mobile}.webp\`. Live text stays in HTML, with a dark green text panel on desktop and text above the portrait on mobile.

**Brand integrity:** User-approved lifestyle mock photography is not production logo artwork. The V7 identity masters in \`approved/\` remain immutable and authoritative for embroidery, printing and manufacturing. Source photographs are byte-preserved; no AI-generated replacement marks or scenes are accepted.

**Implementation:** Responsive hero, six linked collection tiles, all approved catalog product cards and separate merch corner retained. Unique social sharing photo; checkout remains disabled. No live-site release was requested.

---

"""
    if not brief.startswith("# Shop hero — owner-approved"):
        brief_path.write_text(headline + brief)
    checks[brief_path.relative_to(V7).as_posix()] = sha(brief_path.read_bytes())

    plan_path = V7 / "merchandise/storefront/EXECUTION-PLAN.md"
    plan = plan_path.read_text().replace(
        "- Shop: next category to review individually before committing a hero.",
        "- Shop: owner-approved desktop/mobile ranch photograph pair archived in V7 and wired to the main Shop hero, with HTML copy, six category links, existing catalog and merch corner preserved. Not released to live site."
    )
    plan_path.write_text(plan)
    checks[plan_path.relative_to(V7).as_posix()] = sha(plan_path.read_bytes())

    seo_path = V7 / "merchandise/storefront/SEO-ROUTES.md"
    seo = seo_path.read_text().replace(
        "| Shop | \`/shop\` | \`/shop.html\` | Existing |",
        "| Shop | \`/shop\` | \`/shop.html\` | Approved responsive V7 hero and six linked categories |"
    )
    if "## Main Shop hero" not in seo:
        seo += """
## Main Shop hero

The main Shop landing remains at \`/shop\` with current Wix static output \`/shop.html\`. Its approved desktop and mobile photographic hero assets have dedicated website copies, unique OG/Twitter preview image metadata, HTML heading and CTA, six category navigation tiles, complete approved product catalog, and unchanged merch-corner section. There is no claim of live publication, inventory or confirmed manufacturing artwork. Clean URL redirects require separate verification.
"""
    seo_path.write_text(seo)
    checks[seo_path.relative_to(V7).as_posix()] = sha(seo_path.read_bytes())

    shop_doc = V7 / "merchandise/storefront/shop.md"
    shop_doc.write_text("""# Main Shop — approved V7 hero

Approved October 16, 2026: distinct golden-hour ranch scene with a man and woman and nearby horse. The exact 1536 × 1024 desktop and 1024 × 1536 mobile originals are archived at \`foundations/photography/storefront/shop/shop-approved-{desktop,mobile}-master.png\`, with same-scene WebP conversions next to each original.

Use **only** on the main Shop landing. Do not replace any category heroes. All page headings, CTAs and navigation are accessible HTML, not text embedded in the photo. Website serves its independent responsive exports under \`public/assets/shop/v7/heroes/shop-{desktop,mobile}.webp\`.

The owner approved the lifestyle concept imagery, not supplier production artwork. Exact V7 SVG logo masters remain the sole source for printed/embroidered graphics. The old barn collection and merch corner originals remain intact. Supplier inventory and checkout are not enabled; no live release was made.
""")
    checks[shop_doc.relative_to(V7).as_posix()] = sha(shop_doc.read_bytes())
    CHECKSUMS.write_text(json.dumps(checks, indent=2) + "\n")
    print(json.dumps({"imported": files}, indent=2))

if __name__ == "__main__":
    main()
