#!/usr/bin/env python3
"""Archive owner-approved Hats artwork, without creating new photos or logos."""
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps, ImageFilter
import hashlib, io, json, math

ROOT=Path(__file__).resolve().parents[1]
SOURCE_URL="https://static.wixstatic.com/media/8fe1a1_b6cea94e312742f6854bc348b46b6fef~mv2.png"
SOURCE_ASSET="7203064a-513e-4021-a141-0191b7c85eff"
WIXEL_LINK="https://links.wixel.com/link/8zl4nwlpUK"
BRAND=ROOT/"brand/v7-design-system"
ARCHIVE=BRAND/"foundations/photography/storefront/hats"
WEB=ROOT/"public/assets/shop/v7/heroes"
MANIFEST=ROOT/"docs/storefront-heroes/hats-assets.json"
CHECKS=BRAND/"FILE-CHECKSUMS.json"

def sha(data): return hashlib.sha256(data).hexdigest()
def webp(im,path):
    path.parent.mkdir(parents=True,exist_ok=True)
    im.convert("RGB").save(path,format="WEBP",quality=86,method=6)
    return {"path":path.relative_to(ROOT).as_posix(),"width":im.width,"height":im.height,"bytes":path.stat().st_size,"sha256":sha(path.read_bytes())}

def main():
    with urlopen(Request(SOURCE_URL,headers={"User-Agent":"FaithReinsApprovedHats/1.0"}),timeout=100) as response:
        data=response.read()
    source=Image.open(io.BytesIO(data))
    im=ImageOps.exif_transpose(source).convert("RGB")
    if im.width < 700 or im.height < 550:
        raise ValueError(f"Unexpected Hats image too small: {im.size}")
    ARCHIVE.mkdir(parents=True,exist_ok=True)
    master=ARCHIVE/"hats-approved-master.png"
    # Preserve approved original bytes without alterations.
    master.write_bytes(data)
    # The category HTML provides copy and CTA. Do not paint text onto the photograph.
    desktop=ImageOps.fit(im,(1536,1024),method=Image.Resampling.LANCZOS,centering=(0.50,0.50))
    # For the mobile page, extend *the same* approved pixels into a blurred
    # portrait background and show the entire source composition above the HTML copy.
    portrait_bg=ImageOps.fit(im,(1024,1536),method=Image.Resampling.LANCZOS,
                              centering=(.5,.5)).filter(ImageFilter.GaussianBlur(32))
    # Show a full-width, uncropped instance of the approved source in upper part
    # so both hats remain visible; no new models or emblems.
    inset_width=1024
    inset_height=round(im.height*(inset_width/im.width))
    if inset_height > 1350:
        inset_height=1350
        inset_width=round(im.width*(inset_height/im.height))
    sharp=im.resize((inset_width,inset_height),Image.Resampling.LANCZOS)
    x=(1024-inset_width)//2
    y=max(60, min(280, int((1536-inset_height)*.27)))
    portrait_bg.paste(sharp,(x,y))
    exports=[]
    for label,asset in [("desktop",desktop),("mobile",portrait_bg)]:
        exports.append(webp(asset,WEB/f"hats-{label}.webp"))
        exports.append(webp(asset,ARCHIVE/f"hats-{label}.webp"))
    manifest={
      "category":"hats","review":"Owner explicitly approved the Wixel Hats hero October 16, 2026",
      "approvedSourceAssetId":SOURCE_ASSET,"approvedSourceLink":WIXEL_LINK,
      "original":{ "url":SOURCE_URL,"path":master.relative_to(ROOT).as_posix(),
                   "sha256":sha(data),"bytes":len(data),"width":im.width,"height":im.height},
      "derivatives":exports,
      "mobileComposition":"Derived solely from approved image; uncropped source centered atop blurred extension of same pixels, no new source photo",
      "textInImage":False,"siteReleased":False,
      "sourceIdentityNote":"This is the exact user-approved Wixel hero; original V7 horse SVG and original cap product images remain unchanged. Product supplier pending."
    }
    MANIFEST.parent.mkdir(parents=True,exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest,indent=2)+"\n")
    checks=json.loads(CHECKS.read_text())
    checks["foundations/photography/storefront/hats/hats-approved-master.png"]=sha(data)
    for rec in exports:
        if rec["path"].startswith("brand/v7-design-system/"):
            checks[rec["path"].removeprefix("brand/v7-design-system/")]=rec["sha256"]
    CHECKS.write_text(json.dumps(checks,indent=2)+"\n")
    print(json.dumps({"source":manifest["original"],"exports":exports},indent=2))

if __name__=="__main__":main()
