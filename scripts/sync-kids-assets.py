#!/usr/bin/env python3
"""Import owner-approved 2026-10-16 Kids hero from Faith Reins media library.
Only crops/resizes approved pixels; never generates or redraws brand artwork.
"""
import hashlib, io, json, os
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageFilter, ImageOps

URL = "https://static.wixstatic.com/media/8fe1a1_8c5023f6b1844f4d80689ad4c52503b3~mv2.png"
ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "public/assets/shop/v7"
BRAND = ROOT / "brand/v7-design-system/foundations/photography/storefront/kids"

def write_webp(im, path, q=85):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, format="WEBP", quality=q, method=6)
    return {"path":str(path.relative_to(ROOT)),"width":im.width,"height":im.height,
            "sha256":hashlib.sha256(path.read_bytes()).hexdigest(),"bytes":path.stat().st_size}

def crop(im, box):
    return ImageOps.fit(im.crop(box), (900,1200), Image.Resampling.LANCZOS, centering=(.5,.39))

def main():
    if os.getenv("KIDS_SOURCE_FILE"):
        data=Path(os.environ["KIDS_SOURCE_FILE"]).read_bytes()
    else:
        req=Request(URL,headers={"User-Agent":"FaithReinsAssetSync/1.0"})
        with urlopen(req,timeout=120) as f: data=f.read()
    im=Image.open(io.BytesIO(data)).convert("RGB")
    if im.width<1000 or im.height<1400 or not (.5 < im.width/im.height < .8):
        raise ValueError(f"Unexpected Kids hero dimensions: {im.size}")
    BRAND.mkdir(parents=True,exist_ok=True)
    master=BRAND/"kids-mobile-approved-master.png"
    # Store the approved original, unchanged.
    master.write_bytes(data)
    files=[]
    files.append(write_webp(im, WEB/"heroes/kids-mobile.webp",87))
    files.append(write_webp(im, BRAND/"kids-mobile.webp",87))
    # Responsive desktop adaptation: identical approved photograph and logos;
    # softened surrounding backdrop leaves left space for LIVE HTML headline.
    bg=ImageOps.fit(im.crop((0,0,im.width,600)),(1536,1024),Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(25))
    fg=im.resize((696,1044),Image.Resampling.LANCZOS)
    bg.paste(fg,(770,-6))
    files.append(write_webp(bg,WEB/"heroes/kids-desktop.webp",86))
    files.append(write_webp(bg,BRAND/"kids-desktop.webp",86))
    # Concept crops until supplier product photography is commissioned.
    crops={
      "kids-cream-seal-tee-product.webp": (90,370,535,1060),
      "kids-cream-seal-tee-styled.webp": (0,110,520,1200),
      "kids-forest-green-seal-hoodie-product.webp": (475,420,970,1190),
      "kids-forest-green-seal-hoodie-styled.webp": (430,180,1015,1310),
    }
    for name,area in crops.items():
        files.append(write_webp(crop(im,area),WEB/"catalog"/name,85))
    manifest={
      "category":"kids","status":"owner-approved visual concept; supplier pending",
      "approvalDate":"2026-10-16","source":URL,
      "master":str(master.relative_to(ROOT)),
      "sourceSha256":hashlib.sha256(data).hexdigest(),"files":files,
      "note":"Tee and hoodie are sourcing concepts, not for sale. The immutable V7 seal masters in brand/v7-design-system/approved/seal are the production artwork, not embedded photo pixels. No text is baked into the hero."
    }
    doc=ROOT/"docs/storefront-heroes/kids-assets.json"
    doc.parent.mkdir(parents=True,exist_ok=True)
    doc.write_text(json.dumps(manifest,indent=2)+"\n")
    print("\n".join(f"{x['path']} {x['width']}x{x['height']} {x['bytes']} B" for x in files))

if __name__=="__main__": main()
