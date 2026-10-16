#!/usr/bin/env python3
"""Restore ONLY the owner-attached approved Outerwear photograph.

The desktop image and mobile crop and both vest gallery crops come from
ONE immutable JPEG; no additional generated model, background or logo.
The rejected desktop/mobile source masters are deleted from V7.
"""
import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BRAND_ROOT = ROOT / "brand/v7-design-system"
ARCHIVE = BRAND_ROOT / "foundations/photography/storefront/outerwear"
WEB = ROOT / "public/assets/shop/v7"
MANIFEST = ROOT / "docs/storefront-heroes/outerwear-assets.json"
CATALOG_MANIFEST = ROOT / "docs/catalog-showcase-assets.json"
CHECKSUMS = BRAND_ROOT / "FILE-CHECKSUMS.json"

# This is the exact JPEG the owner attached and explicitly identified as
# the ONLY approved Outerwear image in chat on October 16, 2026.
SOURCE_URL = "https://static.wixstatic.com/media/8fe1a1_f7128d8eb9964050a2e7c7560464b56f~mv2.jpg"
OWNER_UPLOAD_SHA256 = "a8672ffbb2420f4088a6a9bc878d9ab32c550e69d1bdc68666d57cf9696dead1"
EXPECTED_SIZE = (1279, 861)
OLD_MASTERS = ["outerwear-desktop-approved-master.png", "outerwear-mobile-approved-master.png"]


def sha(data):
    return hashlib.sha256(data).hexdigest()


def save_webp(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert("RGB").save(path, format="WEBP", quality=87, method=6)
    return {
        "path": path.relative_to(ROOT).as_posix(),
        "width": img.width, "height": img.height,
        "bytes": path.stat().st_size, "sha256": sha(path.read_bytes())
    }


def replace_doc(path, substitutions):
    text = path.read_text()
    for before, after in substitutions.items():
        text = text.replace(before, after)
    path.write_text(text)
    return text


def main():
    with urlopen(Request(SOURCE_URL, headers={"User-Agent": "FaithReinsOwnerApprovedAsset/1.0"}), timeout=90) as response:
        data = response.read()
    master_sha = sha(data)
    # Source content must match the *actual image the user attached*, not merely
    # a visually similar newer image from an AI generator.
    if master_sha != OWNER_UPLOAD_SHA256:
        raise RuntimeError(
            "Owner photo was transformed by upload media hosting; refusing to overwrite approved assets. "
            f"Expected {OWNER_UPLOAD_SHA256}, got {master_sha}"
        )
    with Image.open(io.BytesIO(data)) as f:
        if f.format != "JPEG" or f.size != EXPECTED_SIZE:
            raise RuntimeError(f"Unexpected source image {f.format} {f.size}")
        original = ImageOps.exif_transpose(f).convert("RGB")

    ARCHIVE.mkdir(parents=True, exist_ok=True)
    master_path = ARCHIVE / "outerwear-approved-master.jpg"
    master_path.write_bytes(data)

    # Desktop is the same photo scaled/cropped to the original template aspect.
    desktop = ImageOps.fit(original, (1536, 1024), Image.Resampling.LANCZOS, centering=(.5, .5))
    # Mobile uses ONLY the center-right crop of the owner's approved frame,
    # keeping both people and both approved chest logos visible.
    crop_width = round(original.height * 2 / 3)
    crop_left = 525
    mobile = original.crop((crop_left, 0, crop_left + crop_width, original.height))
    mobile = mobile.resize((1024, 1536), Image.Resampling.LANCZOS)

    exports = []
    for name, im in [("desktop", desktop), ("mobile", mobile)]:
        exports.append(save_webp(im, WEB / "heroes" / f"outerwear-{name}.webp"))
        exports.append(save_webp(im, ARCHIVE / f"outerwear-{name}.webp"))

    # Existing new men's vest listing stays intact; both gallery crops
    # are now from this same owner-approved photograph, never extra artwork.
    gallery = [
        ("styled", (740, 0, 1279, 861)),
        ("product", (850, 160, 1230, 800)),
    ]
    for view, bounds in gallery:
        crop = original.crop(bounds)
        crop = ImageOps.fit(crop, (1086, 1448), Image.Resampling.LANCZOS)
        exports.append(save_webp(crop, WEB / "catalog" / f"mens-forest-green-quilted-vest-{view}.webp"))

    removed = []
    for old in OLD_MASTERS:
        path = ARCHIVE / old
        if path.exists():
            path.unlink()
            removed.append(path.relative_to(ROOT).as_posix())

    MANIFEST.write_text(json.dumps({
        "category": "outerwear",
        "approval": "Owner approved ONLY attached desktop scene; reaffirmed 2026-10-16",
        "singleSourceOnly": True,
        "source": {
            "url": SOURCE_URL,
            "path": master_path.relative_to(ROOT).as_posix(),
            "sha256": master_sha,
            "bytes": len(data),
            "width": original.width,
            "height": original.height,
            "mime": "image/jpeg"
        },
        "derivativePolicy": "Desktop and mobile are exclusively crops/resizes of the same approved photo; men's vest gallery derived from same photo.",
        "removedSupersededMasters": removed,
        "exportedAssets": exports,
        "noTextInPhotograph": True,
        "liveRelease": False
    }, indent=2) + "\n")

    # Fix proof-of-origin catalog records, but not any existing approved PNGs.
    catalog = json.loads(CATALOG_MANIFEST.read_text())
    for rec in catalog["assets"]:
        if rec.get("catalogId") == "mens-forest-green-quilted-vest":
            view = rec["view"]
            file = next(x for x in exports if x["path"].endswith(f"mens-forest-green-quilted-vest-{view}.webp"))
            rec.update({
                "source": master_path.relative_to(ROOT).as_posix(),
                "sourceSha256": master_sha,
                "website": file["path"],
                "sha256": file["sha256"],
                "reviewStatus": "owner_approved_single_source_lifestyle_crop_supplier_pending"
            })
    CATALOG_MANIFEST.write_text(json.dumps(catalog, indent=2) + "\n")

    master_ref = "foundations/photography/storefront/outerwear/outerwear-approved-master.jpg"
    storefront = BRAND_ROOT / "merchandise/storefront/outerwear.md"
    product = BRAND_ROOT / "merchandise/product-catalog/mens-forest-green-quilted-vest.md"
    replace_doc(storefront, {
        "foundations/photography/storefront/outerwear/outerwear-desktop-approved-master.png": master_ref,
        "foundations/photography/storefront/outerwear/outerwear-mobile-approved-master.png": master_ref,
        "Owner image approval:** October 16, 2026.": "Owner image approval:** October 16, 2026; only the attached photograph is approved (reaffirmed).",
        "Revision approved: women's cream chest mark reduced; men's vest chest icon placed on wearer’s left breast away from zipper.": "Approved single photograph shows the cream quarter-zip and forest-green men's vest with the approved chest marks; no alternate generated scene is approved."
    })
    replace_doc(product, {
        "foundations/photography/storefront/outerwear/outerwear-mobile-approved-master.png": master_ref,
        "foundations/photography/storefront/outerwear/outerwear-desktop-approved-master.png": master_ref,
        "Final Outerwear desktop and mobile images, October 16, 2026": "One owner-attached approved source photograph, October 16, 2026; mobile is a crop",
    })

    # Keep the portable V7 package hash-accurate and avoid orphaned rejected files.
    checks = json.loads(CHECKSUMS.read_text())
    for name in OLD_MASTERS:
        checks.pop(f"foundations/photography/storefront/outerwear/{name}", None)
    checks[master_ref] = master_sha
    for rec in exports:
        if rec["path"].startswith("brand/v7-design-system/"):
            checks[rec["path"].removeprefix("brand/v7-design-system/")] = rec["sha256"]
    for doc in [storefront, product]:
        checks[doc.relative_to(BRAND_ROOT).as_posix()] = sha(doc.read_bytes())
    CHECKSUMS.write_text(json.dumps(checks, indent=2) + "\n")
    print(json.dumps({
        "sourceSha256": master_sha, "singleSource": True,
        "removed": removed, "exports": exports
    }, indent=2))


if __name__ == "__main__":
    main()
