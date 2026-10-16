#!/usr/bin/env python3
"""Import the OWNER-APPROVED Outerwear desktop and mobile images without regeneration."""
import hashlib, io, json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT=Path(__file__).resolve().parents[1]
SOURCE={
  "desktop":"https://static.wixstatic.com/media/8fe1a1_8e29a544ad104328821e70bdcd0a539b~mv2.png",
  "mobile":"https://static.wixstatic.com/media/8fe1a1_a1a2aeb75468495db713ea1f84c731c3~mv2.png",
}
WEB=ROOT/"public/assets/shop/v7"
BRAND=ROOT/"brand/v7-design-system/foundations/photography/storefront/outerwear"
DOC=ROOT/"docs/storefront-heroes/outerwear-assets.json"

def digest(data):return hashlib.sha256(data).hexdigest()
def save(im,path,q=85):
    path.parent.mkdir(parents=True,exist_ok=True)
    im.convert("RGB").save(path,format="WEBP",quality=q,method=6)
    return {"path":str(path.relative_to(ROOT)),"width":im.width,"height":im.height,"bytes":path.stat().st_size,"sha256":digest(path.read_bytes())}

def download(url):
    with urlopen(Request(url,headers={"User-Agent":"FaithReinsAssetSync/1.0"}),timeout=90) as response:return response.read()

def main():
    images={};records=[];archives=[]
    BRAND.mkdir(parents=True,exist_ok=True)
    for name,expected in [("desktop",(1536,1024)),("mobile",(1024,1536))]:
        raw=download(SOURCE[name]);im=Image.open(io.BytesIO(raw)).convert("RGB")
        if im.size!=expected:raise RuntimeError(f"Unexpected {name} size {im.size}; expected {expected}")
        master=BRAND/f"outerwear-{name}-approved-master.png"
        master.write_bytes(raw)
        archives.append({"path":str(master.relative_to(ROOT)),"bytes":len(raw),"sha256":digest(raw)})
        images[name]=im
        records.append(save(im,WEB/"heroes"/f"outerwear-{name}.webp",87))
        records.append(save(im,BRAND/f"outerwear-{name}.webp",87))
    # Men’s approved vest concept; these are candid PHOTO CROPS, never a manufactured
    # supplier catalog product photograph. Preserve the exact horse on left chest.
    styled=images["desktop"].crop((950,30,1536,1000))
    product=images["mobile"].crop((505,40,1024,1300))
    for view,im in [("styled",styled),("product",product)]:
        crop=ImageOps.fit(im,(1086,1448),method=Image.Resampling.LANCZOS,centering=(0.5,0.25))
        records.append(save(crop,WEB/"catalog"/f"mens-forest-green-quilted-vest-{view}.webp",85))
    manifest={
       "category":"outerwear","review":"Owner approved revised desktop and mobile image October 16, 2026",
       "sourceUrls":SOURCE,"originalMasters":archives,"exportedAssets":records,
       "notes":[
         "No page text is embedded in hero images. Heading and CTA are HTML.",
         "Men’s Forest Green Quilted Vest listing uses two close-up crops of the approved hero, not unapproved supplier product photography.",
         "The proposed men’s vest is separate from the existing unisex quilted vest visual catalog family.",
         "Supplier, stock, fit, embroidery placement and color matching await confirmation.",
         "For actual manufacturing and decoration use only approved original V7 vector identity masters; never trace generated pixels."
       ]
    }
    DOC.parent.mkdir(parents=True,exist_ok=True)
    DOC.write_text(json.dumps(manifest,indent=2)+"\n")
    # V7 checksums: keep source masters unchanged and register every new V7 file.
    checkfile=ROOT/"brand/v7-design-system/FILE-CHECKSUMS.json"
    reg=json.loads(checkfile.read_text())
    prefix="brand/v7-design-system/"
    for rec in archives+records:
        if rec["path"].startswith(prefix):
            reg[rec["path"][len(prefix):]]=rec["sha256"]
    checkfile.write_text(json.dumps(reg,indent=2)+"\n")
    print(json.dumps({"exports":records,"masters":archives},indent=2))

if __name__=="__main__":main()
