#!/usr/bin/env python3
"""Import the ONE owner-approved Wixel Hats hero and wire the Hats category.

Source asset is retained untouched. All desktop/mobile website images are
cropped from the SAME approved photograph. This script does not make or alter
any horse branding, new products, or invented merchandise.
"""
from __future__ import annotations
import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BRAND_ROOT = ROOT / "brand/v7-design-system"
ARCHIVE = BRAND_ROOT / "foundations/photography/storefront/hats"
PUBLIC = ROOT / "public/assets/shop/v7/heroes"
ASSET_DOC = ROOT / "docs/storefront-heroes/hats-assets.json"
CATEGORY_JSON = ROOT / "src/lib/shop-category-pages.json"
CHECKSUMS = BRAND_ROOT / "FILE-CHECKSUMS.json"
ROUTE_TEST = ROOT / "scripts/verify-shop-category-routes.mjs"
SEO_DOC = BRAND_ROOT / "merchandise/storefront/SEO-ROUTES.md"
PLAN = BRAND_ROOT / "merchandise/storefront/EXECUTION-PLAN.md"
HATS_DOC = BRAND_ROOT / "merchandise/storefront/hats.md"

WIX_URL = "https://static.wixstatic.com/media/8fe1a1_b6cea94e312742f6854bc348b46b6fef~mv2.png"
WIXEL_URL = "https://links.wixel.com/link/8zl4nwlpUK/raw"
WIXEL_ASSET_ID = "7203064a-513e-4021-a141-0191b7c85eff"


def hash_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def write_webp(im: Image.Image, path: Path) -> dict:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, format="WEBP", quality=87, method=6)
    return {
        "path": path.relative_to(ROOT).as_posix(),
        "width": im.width,
        "height": im.height,
        "bytes": path.stat().st_size,
        "sha256": hash_bytes(path.read_bytes()),
    }


def main():
    req = Request(WIX_URL, headers={"User-Agent": "FaithReins-V7-ApprovedHero/1.0"})
    with urlopen(req, timeout=120) as resp:
        content = resp.read()

    image = Image.open(io.BytesIO(content))
    if image.format != "PNG":
        raise RuntimeError(f"Unexpected source format: {image.format}; only archived PNG was approved")
    if image.width < 900 or image.height < 600:
        raise RuntimeError(f"Hats approved source unexpectedly small: {image.size}")
    image = ImageOps.exif_transpose(image).convert("RGB")
    ARCHIVE.mkdir(parents=True, exist_ok=True)

    master = ARCHIVE / "hats-owner-approved-master.png"
    master.write_bytes(content)  # Retain source bytes unchanged, never regenerate.

    # Responsive crops from ONE approved image. There are no alternative
    # generated source scenes or logo replacements.
    desktop = ImageOps.fit(
        image, (1536, 1024), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5)
    )
    mobile = ImageOps.fit(
        image, (1024, 1536), method=Image.Resampling.LANCZOS, centering=(0.53, 0.5)
    )
    exports = []
    for size_name, view in [("desktop", desktop), ("mobile", mobile)]:
        exports.append(write_webp(view, PUBLIC / f"hats-{size_name}.webp"))
        exports.append(write_webp(view, ARCHIVE / f"hats-{size_name}.webp"))

    manifest = {
        "category": "hats",
        "approved": True,
        "approvalDate": "2026-10-16",
        "assetId": WIXEL_ASSET_ID,
        "originalWixelUrl": WIXEL_URL,
        "archivalWixUrl": WIX_URL,
        "master": master.relative_to(ROOT).as_posix(),
        "masterSha256": hash_bytes(content),
        "sourceDimensions": [image.width, image.height],
        "derivativePolicy": "One owner-approved photo; desktop and mobile are crops, never independent generated compositions.",
        "exportedAssets": exports,
        "containsWebsiteText": False,
        "supplierStatus": "Existing approved V7 Horse Cap: Forest Green, Cream and White; out of stock pending supplier.",
        "liveRelease": False,
    }
    ASSET_DOC.parent.mkdir(parents=True, exist_ok=True)
    ASSET_DOC.write_text(json.dumps(manifest, indent=2) + "\n")

    categories = json.loads(CATEGORY_JSON.read_text())
    if any(c["key"] == "hats" for c in categories):
        raise RuntimeError("Hats is already registered, refusing duplicate.")
    categories.append({
        "label": "Hats",
        "heading": "Faith Reins Hats",
        "title": "Faith Reins Horse Caps in Forest Green, Cream & White",
        "lead": "Everyday comfort. A familiar horse.",
        "description": "Explore Faith Reins horse-logo caps in forest green, cream and white. A classic everyday accessory inspired by our mission.",
        "productHeading": "The everyday horse cap.",
        "intro": "Three familiar colors. One simple horse signature. Discover the Faith Reins forest-green, cream and white cap concepts. Final supplier specifications and availability are pending.",
        "products": ["caps"],
        "key": "hats",
        "route": "/shop/hats",
        "hero": {
            "desktop": "/assets/shop/v7/heroes/hats-desktop.webp",
            "mobile": "/assets/shop/v7/heroes/hats-mobile.webp",
            "width": 1536,
            "height": 1024,
            "mobileWidth": 1024,
            "mobileHeight": 1536,
            "desktopFocus": "center",
            "mobileFocus": "center",
            "alt": "Faith Reins horse caps featured in a natural farm lifestyle setting, with forest-green and cream hats."
        }
    })
    CATEGORY_JSON.write_text(json.dumps(categories, indent=2) + "\n")

    test = ROUTE_TEST.read_text()
    before = "['men','women','kids','outerwear']);"
    after = "['men','women','kids','outerwear','hats']);"
    if before not in test:
        raise RuntimeError("Shop route test changed; refusing unreviewed modification")
    ROUTE_TEST.write_text(test.replace(before, after).replace(
        "Men, Women, Kids and Outerwear verified.",
        "Men, Women, Kids, Outerwear and Hats verified."
    ))

    seo = SEO_DOC.read_text()
    old = "| Hats | \`/shop/hats\` | \`/shop/hats.html\` | Awaiting hero approval |"
    new = "| Hats | \`/shop/hats\` | \`/shop/hats.html\` | Approved and implemented |"
    if old not in seo:
        raise RuntimeError("V7 SEO locked route contract changed; cannot update Hats status.")
    SEO_DOC.write_text(seo.replace(old, new))

    HATS_DOC.write_text(
        "# Hats — V7 approved category hero and page\n\n"
        "**Owner approval:** October 16, 2026. **Release:** not performed.\n\n"
        "- Category route: \`/shop/hats\` (Wix static filename \`/shop/hats.html\`).\n"
        "- H1: Faith Reins Hats. Page copy and CTA are separate HTML elements.\n"
        "- The existing V7 \`caps\` product family is used without alteration.\n"
        "- Approved cap variants: forest-green, cream and white; supplier selection pending.\n"
        "- One approved photograph, Wixel asset ID \`" + WIXEL_ASSET_ID + "\`, "
        "archived unchanged at \`foundations/photography/storefront/hats/hats-owner-approved-master.png\`.\n"
        "- Website desktop/mobile copies: \`public/assets/shop/v7/heroes/hats-desktop.webp\` and "
        "\`public/assets/shop/v7/heroes/hats-mobile.webp\`.\n"
        "- The mobile image is a crop of the approved source, not a second generated image.\n"
        "- Exact checksums and URL lineage: \`docs/storefront-heroes/hats-assets.json\`.\n"
        "- Existing product detail: \`/shop/caps\`; three variants in that single canonical product.\n"
        "- SEO CollectionPage, ItemList, BreadcrumbList and on-page navigation use the shared category renderer.\n"
        "- No inventing new V7 logo artwork, pricing or stock information. Checkout remains disabled.\n"
    )

    plan = PLAN.read_text()
    plan += (
        "\n## Hats milestone — 2026-10-16\n\n"
        "- Owner approved the Wixel Hats lifestyle hero, now archived without re-generating.\n"
        "- \`/shop/hats\` and responsive assets integrated. Existing \`caps\` product family reused.\n"
        "- Next visual approval gate: \`/shop/home-gifts\`; then refresh Shop landing and complete final SEO/release QA.\n"
    )
    PLAN.write_text(plan)

    checks = json.loads(CHECKSUMS.read_text())
    checks[master.relative_to(BRAND_ROOT).as_posix()] = hash_bytes(content)
    for item in exports:
        if item["path"].startswith("brand/v7-design-system/"):
            checks[item["path"].removeprefix("brand/v7-design-system/")] = item["sha256"]
    for doc in [SEO_DOC, HATS_DOC, PLAN]:
        checks[doc.relative_to(BRAND_ROOT).as_posix()] = hash_bytes(doc.read_bytes())
    CHECKSUMS.write_text(json.dumps(checks, indent=2) + "\n")
    print(json.dumps({
        "source": master.relative_to(ROOT).as_posix(),
        "sourceDimensions": image.size,
        "heroExports": exports,
        "product": "caps",
        "route": "/shop/hats",
    }, indent=2))


if __name__ == "__main__":
    main()
