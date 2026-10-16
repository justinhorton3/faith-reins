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
    CHECKSUMS.write_text(json.dumps(checks, indent=2) + "\n")
    print(json.dumps({"imported": files}, indent=2))

if __name__ == "__main__":
    main()
