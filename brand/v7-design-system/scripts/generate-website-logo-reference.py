#!/usr/bin/env python3
"""Compile the approved V7 website lockup using *the exact tracked V6 Hanken Grotesk WOFF*.
Outputs self-contained, font-independent SVG paths and PNG proofs. No changes to website code.
"""
from __future__ import annotations
from pathlib import Path
import copy, re, hashlib, argparse
from xml.etree import ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image, ImageDraw
import cairosvg

V7=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description="Historical logo recipe; output requires separate artwork review")
parser.add_argument('--output',type=Path,required=True)
args=parser.parse_args()
FONT=V7/"foundations/fonts/hanken-grotesk.woff"
CAND=V7/"candidates/website-logo"
OUT=args.output.resolve()
if OUT==V7 or V7 in OUT.parents:
    raise SystemExit("Use an external staging directory; approved artwork is immutable")
if OUT.exists():
    raise SystemExit("Output directory must not already exist")
if any((parent / ".git").exists() for parent in (OUT, *OUT.parents)):
    raise SystemExit("Use staging outside repositories")
OUT.mkdir(parents=True,exist_ok=True)
NS="{http://www.w3.org/2000/svg}"
ET.register_namespace("","http://www.w3.org/2000/svg")
FONT_FAMILY="Hanken Grotesk"
CAPTION="PEDIATRIC & EQUINE THERAPY"
COLORS={"green":"#B08D57", "cream":"#D5BC8A"}
font=TTFont(str(FONT))
if "fvar" in font:
    from fontTools.varLib.instancer import instantiateVariableFont
    font=instantiateVariableFont(font,{"wght":600},inplace=False)
upem=font["head"].unitsPerEm
glyphs=font.getGlyphSet()
cmap=font.getBestCmap()
hmtx=font["hmtx"].metrics
font_hash=hashlib.sha256(FONT.read_bytes()).hexdigest()
def text_path(text, x=800, baseline=306, target_width=940):
    chars=[cmap[ord(ch)] for ch in text]
    adv=sum(hmtx[n][0] for n in chars)
    tracking_em=.20
    px=target_width/(adv/upem + tracking_em*(len(chars)-1))
    scale=px/upem
    advance=0.0
    out=[]
    for i,name in enumerate(chars):
        pen=SVGPathPen(glyphs)
        p=TransformPen(pen,(scale,0,0,-scale,x+advance,baseline))
        glyphs[name].draw(p)
        path=pen.getCommands()
        if path:out.append(path)
        advance += hmtx[name][0]*scale
        if i<len(chars)-1: advance+=px*tracking_em
    return " ".join(out),px

for color in ("green","cream"):
    input_path=CAND/f"faith-reins-v7-website-horizontal-{color}.svg"
    root=ET.parse(input_path).getroot()
    tag=root.find(f".//{NS}g[@id='tagline']")
    if tag is None: raise RuntimeError("Missing tagline group")
    children=list(tag)
    if len(children)!=3: raise RuntimeError(f"Expected 3 tagline children; got {len(children)}")
    old=children[1]
    tag.remove(old)
    outline,size=text_path(CAPTION)
    el=ET.Element(NS+"path",{"id":"hanken-grotesk-v6-exact-outline","d":outline,"fill":COLORS[color]})
    tag.insert(1,el)
    for child in children[::2]:
        child.set("stroke",COLORS[color])
    title=root.find(NS+"title")
    if title is not None: title.text="Faith Reins — Pediatric & Equine Therapy"
    desc=root.find(NS+"desc")
    if desc is not None: desc.text="Faith Reins horizontal website logo using the approved horse mark, Libre Caslon Text wordmark, and true Hanken Grotesk 600 subtitle vector outlines."
    root.set("data-font-family",FONT_FAMILY)
    root.set("data-font-weight","600")
    root.set("data-font-sha256",font_hash)
    svg=ET.tostring(root,encoding="unicode")
    if any(tok in svg.lower() for tok in ("<image", "base64", "data:image", "<text")):
        raise AssertionError("Production SVG must use self-contained path artwork")
    svg_path=OUT/f"faith-reins-v7-website-horizontal-{color}.svg"
    svg_path.write_text(svg,encoding="utf-8")
    png_path=OUT/f"faith-reins-v7-website-horizontal-{color}.png"
    cairosvg.svg2png(bytestring=svg.encode(),write_to=str(png_path),output_width=2252,output_height=384)
    print(f"{svg_path}: Hanken size {size:.2f}; sha256 {hashlib.sha256(svg.encode()).hexdigest()}")

# Responsive *visual proofs* only: all three examples use the SAME underlying SVG.
widths=[("Desktop",580),("Tablet",430),("Mobile",290)]
for color,bg in (("green","#F3EEE4"),("cream","#173A2E")):
    svg=(OUT/f"faith-reins-v7-website-horizontal-{color}.svg").read_bytes()
    sheet=Image.new("RGB",(820,590),bg)
    d=ImageDraw.Draw(sheet)
    ink="#173A2E" if color=="green" else "#F3EEE4"
    top=24
    for label,w in widths:
        d.text((34,top),f"{label} — same logo, {w}px wide",fill=ink)
        scale=w/2252
        data=cairosvg.svg2png(bytestring=svg,output_width=w,output_height=round(384*scale))
        import io
        img=Image.open(io.BytesIO(data)).convert("RGBA")
        sheet.paste(img,(35,top+33),img)
        top+=170
    sheet.save(OUT/f"faith-reins-v7-{color}-responsive-proof.png")
print("V7 artwork generated without modifying public/ or src/")
