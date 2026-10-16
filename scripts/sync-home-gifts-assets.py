#!/usr/bin/env python3
"""Import the owner-approved Home & Gifts image pair without regenerating a pixel.

Use only the two images approved in the chat on October 16, 2026.
Preserves original PNGs under the standalone V7 archive and exports independent
website WebP copies. Production logo artwork always comes from V7 approved SVGs.
"""
import hashlib
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRAND_ROOT = ROOT / "brand/v7-design-system"
BRAND = BRAND_ROOT / "foundations/photography/storefront/home-gifts"
WEBSITE = ROOT / "public/assets/shop/v7/heroes"
MANIFEST = ROOT / "docs/storefront-heroes/home-gifts-assets.json"
CHECKSUMS = BRAND_ROOT / "FILE-CHECKSUMS.json"
APPROVED = {
    "desktop": {
        "url": "https://static.wixstatic.com/media/8fe1a1_c8f72fe747514c2b834b73315bb1ed52~mv2.png",
        "size": (1536, 1024),
        "sha256": "ec3abc1a486a6619e4aa1cb78fe9c2bd675bf882ca01f599c035769081ad196f",
    },
    "mobile": {
        "url": "https://static.wixstatic.com/media/8fe1a1_e13b0525eb7d44c4b500faab4a8e1ee5~mv2.png",
        "size": (1024, 1536),
        "sha256": "8eeb493f6f597c317590f6d6e3e6aea7045b0c6c55bc73bf3b3cd8f8ff1a3c3d",
    },
}
def digest(data): return hashlib.sha256(data).hexdigest()

def webp(im, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, format="WEBP", quality=88, method=6)
    data = path.read_bytes()
    return {
      "path": path.relative_to(ROOT).as_posix(), "width": im.width,
      "height": im.height, "sha256": digest(data), "bytes": len(data)
    }

def main():
    checks=json.loads(CHECKSUMS.read_text())
    rows=[]
    BRAND.mkdir(parents=True, exist_ok=True)
    for key, item in APPROVED.items():
        req=Request(item["url"], headers={"User-Agent":"FaithReinsOwnerApprovedImage/1.0"})
        with urlopen(req,timeout=120) as response: raw=response.read()
        if digest(raw) != item["sha256"]:
            raise RuntimeError(f"Approved {key} upload has unexpected bytes; refusing to replace the approved asset")
        im=Image.open(io.BytesIO(raw))
        if im.format!="PNG" or im.size!=item["size"]:
            raise RuntimeError(f"Approved {key} image differs: {im.format} {im.size}")
        master=BRAND/f"home-gifts-{key}-approved-master.png"
        master.write_bytes(raw)
        checks[master.relative_to(BRAND_ROOT).as_posix()] = digest(raw)
        output=webp(im,WEBSITE/f"home-gifts-{key}.webp")
        archive=webp(im,BRAND/f"home-gifts-{key}.webp")
        checks[(BRAND/f"home-gifts-{key}.webp").relative_to(BRAND_ROOT).as_posix()] = archive["sha256"]
        rows.append({"role":key,"sourceUrl":item["url"],"master":master.relative_to(ROOT).as_posix(),
                     "sourceSha256":digest(raw),"website":output,"archive":archive})
    MANIFEST.parent.mkdir(parents=True,exist_ok=True)
    MANIFEST.write_text(json.dumps({
       "category":"home-gifts",
       "approvedInChat":"2026-10-16",
       "status":"owner-approved desktop/mobile lifestyle concept; supplier availability not confirmed",
       "noBakedInPageText":True,
       "logoPolicy":"Visible photographed marks are conceptual imagery; production must use exact approved V7 SVG master assets. No new identity artwork has been created.",
       "images":rows,
       "releasedToLiveSite":False
    },indent=2)+"\n")
    CHECKSUMS.write_text(json.dumps(checks,indent=2)+"\n")
    print(json.dumps({"imported":rows},indent=2))

if __name__=="__main__": main()
