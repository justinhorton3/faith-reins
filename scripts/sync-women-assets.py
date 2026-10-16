#!/usr/bin/env python3
"""Archive the already-approved Women’s farm porch hero from Wix media.
No new logo, typography, models, or apparel variants are generated.
"""
import hashlib, io, json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageFilter

ROOT=Path(__file__).resolve().parents[1]
URL="https://static.wixstatic.com/media/8fe1a1_2a4ba41ddf3247a8aa25ac8866478446~mv2.png"
WEB=ROOT/"public/assets/shop/v7/heroes"
BRAND=ROOT/"brand/v7-design-system/foundations/photography/storefront/women"
MANIFEST=ROOT/"docs/storefront-heroes/women-assets.json"

def digest(buf): return hashlib.sha256(buf).hexdigest()
def savewebp(img,path,quality=86):
    path.parent.mkdir(parents=True,exist_ok=True)
    img.convert("RGB").save(path,"WEBP",quality=quality,method=6)
    return {"path":str(path.relative_to(ROOT)),"width":img.width,"height":img.height,
            "bytes":path.stat().st_size,"sha256":digest(path.read_bytes())}

def main():
    req=Request(URL,headers={"User-Agent":"FaithReins-ApprovedAssetSync/1.0"})
    with urlopen(req,timeout=120) as response: content=response.read()
    portrait=Image.open(io.BytesIO(content)).convert("RGB")
    if portrait.size != (1122,1402):
        raise RuntimeError(f"Unexpected approved Women’s image: {portrait.size}")
    BRAND.mkdir(parents=True,exist_ok=True)
    master=BRAND/"women-approved-mobile-master.png"
    master.write_bytes(content)
    # Website mobile composition: preserve the owner-approved photograph.
    files=[
        savewebp(portrait,WEB/"women-mobile.webp",87),
        savewebp(portrait,BRAND/"women-mobile.webp",87),
    ]
    # Desktop: feather original image into a blurred expansion of its own scene.
    # No invented photos, overlay text or brand marks.
    W,H=1536,1024
    bg=Image.Image if False else None
    from PIL import ImageOps
    bg=ImageOps.fit(portrait,(W,H),Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(32))
    sharp=portrait.resize((round(portrait.width*H/portrait.height),H),Image.Resampling.LANCZOS)
    xpos=W-sharp.width
    mask=Image.new("L",sharp.size)
    pixels=mask.load()
    for y in range(sharp.height):
        for x in range(sharp.width):
            pixels[x,y]=int(255*min(1.0,x/165))
    bg.paste(sharp,(xpos,0),mask)
    files.extend([
      savewebp(bg,WEB/"women-desktop.webp",85),
      savewebp(bg,BRAND/"women-desktop.webp",85),
    ])
    manifest={"category":"women","status":"owner-approved photographic scene; website conversion","approvalDate":"2026-10-16",
      "sourceUrl":URL,
      "sourceSha256":digest(content),
      "master":str(master.relative_to(ROOT)),
      "description":"Two distinct women in V7 forest-green horse hoodie and cream horse polo, branded coffee mug, farm porch, horse in pasture.",
      "processing":"Lossy WebP website copies; desktop uses blurred expansion of this exact approved photo. No regenerated logos or text.",
      "files":files,"liveRelease":False}
    MANIFEST.parent.mkdir(parents=True,exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest,indent=2)+"\n")
    # Standalone V7 package must track every added file in its checksum inventory.
    checks_path=ROOT/"brand/v7-design-system/FILE-CHECKSUMS.json"
    checks=json.loads(checks_path.read_text())
    checks[str(master.relative_to(ROOT/"brand/v7-design-system"))]=digest(content)
    for item in files:
        if item["path"].startswith("brand/v7-design-system/"):
            checks[item["path"].replace("brand/v7-design-system/","",1)]=item["sha256"]
    checks_path.write_text(json.dumps(checks,indent=2)+"\n")
    print(json.dumps({"files":files,"originalBytes":len(content)},indent=2))

if __name__=="__main__":main()
