#!/usr/bin/env python3
"""Replace the old (v4) logo in the original product photos with v6 artwork.

For each swap: detect old-logo pixels inside `box`, inpaint them from the surrounding
material, then composite v6 artwork centered in `target` (defaults to box), modulated
by the material's light and shadow so it reads as printed, embroidered or debossed.
Output is a 1200 x 1200 square (cropped around `cx`, or padded with a blurred
extension of the photo for very wide images).

Sources: scripts/merch/source/ (the original v4 photos, kept as inputs only).
Usage: python3 scripts/merch/swap_logo.py [slug ...]
"""
import sys
from pathlib import Path
import numpy as np
import cv2
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(__file__).resolve().parent / "source"
ART = ROOT / "brand/FaithReins_DesignSystem_v6/assets/merch-artwork"
OUT = ROOT / "public/assets/shop"
SIZE = 1200

def S(box, art, target=None, **kw):
    return dict(box=box, art=art, target=target or box, **kw)

# Coordinates are in source-photo pixels. fit "h" fits height; curve bends for mugs;
# tint recolors the artwork (deboss/engrave); frame "pad" for very wide photos; cx = crop center.
JOBS = {
    "mens-tee":         dict(src="merch-men-tee.webp", swaps=[S((170, 164, 242, 188), "fr-horizontal-cream", (172, 166, 240, 186))]),
    "womens-tee":       dict(src="merch-women-tee.webp", swaps=[S((104, 174, 258, 218), "fr-horizontal-green", (108, 178, 252, 214))], cx=180),
    "childrens-tee":    dict(src="merch-children-tee.webp", swaps=[S((178, 164, 224, 208), "fr-mark-green", (184, 170, 220, 202), fit="h")]),
    "long-sleeve-tee":  dict(src="merch-long-sleeve.webp", swaps=[S((368, 170, 448, 234), "fr-mark-cream", (376, 178, 440, 226), fit="h")]),
    "crewneck":         dict(src="merch-crewneck.webp", swaps=[S((392, 256, 490, 334), "fr-mark-cream", (400, 262, 484, 328), fit="h")]),
    "heritage-hoodie":  dict(src="merch-men-hoodie.webp", swaps=[
                            S((110, 122, 178, 150), "fr-horizontal-cream", (114, 126, 174, 146)),
                            S((222, 92, 352, 224), "fr-stacked-cream", (240, 132, 336, 186), thresh=30, grow=3, mode="smooth", sigma=7)], cx=200),
    "womens-hoodie":    dict(src="merch-women-hoodie.webp", swaps=[S((74, 96, 216, 244), "fr-stacked-green", (92, 140, 200, 196), thresh=26, grow=4, mode="smooth", sigma=9)]),
    "childrens-hoodie": dict(src="merch-children-hoodie.webp", swaps=[S((130, 144, 224, 176), "fr-horizontal-cream", (134, 148, 220, 172))], cx=160),
    "mens-polo":        dict(src="merch-men-polo.webp", swaps=[S((176, 148, 250, 176), "fr-horizontal-cream", (178, 151, 248, 172))], cx=170),
    "womens-polo":      dict(src="merch-women-polo.webp", swaps=[S((184, 148, 260, 178), "fr-horizontal-green", (186, 151, 256, 174))], cx=180),
    "youth-polo":       dict(src="merch-youth-polo.webp", swaps=[S((188, 156, 228, 192), "fr-mark-cream", (194, 162, 224, 188), fit="h")], cx=165),
    "caps":             dict(src="merch-caps.webp", cx=150, swaps=[
                            S((82, 66, 172, 142), "fr-mark-cream", (90, 72, 166, 136), fit="h"),
                            S((256, 56, 336, 124), "fr-mark-green", (262, 62, 330, 120), fit="h")]),
    "youth-cap":        dict(src="merch-caps.webp", cx=292, swaps=[
                            S((82, 66, 172, 142), "fr-mark-cream", (90, 72, 166, 136), fit="h"),
                            S((256, 56, 336, 124), "fr-mark-green", (262, 62, 330, 120), fit="h")]),
    "beanie":           dict(src="merch-beanie.webp", swaps=[S((248, 372, 420, 508), "fr-mark-cream", (258, 382, 410, 498), fit="h", mode="smooth", sigma=6, tex=(-172, 0))]),
    "coffee-mug":       dict(src="merch-mug.webp", swaps=[S((44, 94, 194, 140), "fr-horizontal-green", (46, 100, 192, 132), curve=.18)], cx=125),
    "travel-mug":       dict(src="merch-travel-mug.webp", swaps=[S((148, 248, 446, 342), "fr-horizontal-green", (160, 262, 436, 330), curve=.15)]),
    "keychains":        dict(src="merch-keychains.webp", swaps=[
                            S((62, 106, 152, 188), "fr-mark-green", (72, 116, 146, 180), fit="h", tint=(58, 26, 12), opacity=.78, thresh=30),
                            S((206, 124, 286, 184), "fr-mark-green", (214, 128, 280, 178), fit="h", tint=(52, 36, 14), opacity=.9, thresh=46, mode="smooth", sigma=4)], cx=135),
    "stickers":         dict(src="merch-stickers.webp", swaps=[S((236, 26, 600, 104), "fr-horizontal-cream", (246, 34, 590, 98), thresh=40)], frame="pad"),
}

def load_art(name, tint=None):
    im = Image.open(ART / f"{name}.png").convert("RGBA")
    im = im.crop(im.getbbox())
    if tint:
        a = np.array(im); a[..., :3] = tint; im = Image.fromarray(a)
    return im

def cylinder(art, k):
    """Bend artwork like a print on a cylinder: edges compressed toward the sides."""
    a = np.array(art); h, w = a.shape[:2]
    theta = k * np.pi / 2 + 1e-3
    u = np.linspace(-1, 1, w)
    src = np.arcsin(np.clip(u * np.sin(theta), -1, 1)) / theta
    sx = ((src + 1) / 2 * (w - 1)).astype(np.float32)
    mapx = np.tile(sx, (h, 1)); mapy = np.tile(np.arange(h, dtype=np.float32)[:, None], (1, w))
    return Image.fromarray(cv2.remap(a, mapx, mapy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0)))

def erase(img, sw, orig):
    """Remove old-logo pixels. mode "telea" (small marks) or "smooth" (large badges:
    continues surrounding shading). tex=(dx, dy) adds fine texture copied from an offset region."""
    x0, y0, x1, y1 = sw["box"]
    roi = img[y0:y1, x0:x1].astype(np.int16)
    border = np.concatenate([roi[0], roi[-1], roi[:, 0], roi[:, -1]])
    base = np.median(border, axis=0)
    dist = np.sqrt(((roi - base) ** 2).sum(axis=2))
    mask = np.zeros(img.shape[:2], np.uint8)
    mask[y0:y1, x0:x1] = (dist > sw.get("thresh", 38)).astype(np.uint8) * 255
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=sw.get("grow", 2))
    if sw.get("mode") == "smooth":
        keep = (mask == 0).astype(np.float32)
        sig = sw.get("sigma", 8)
        num = cv2.GaussianBlur(img.astype(np.float32) * keep[..., None], (0, 0), sig)
        den = cv2.GaussianBlur(keep, (0, 0), sig)[..., None] + 1e-4
        fill = num / den
        out = img.astype(np.float32)
        out[mask > 0] = fill[mask > 0]
    else:
        out = cv2.inpaint(img, mask, sw.get("radius", 4), cv2.INPAINT_TELEA).astype(np.float32)
    if sw.get("tex"):
        dx, dy = sw["tex"]
        src = orig[y0 + dy:y1 + dy, x0 + dx:x1 + dx].astype(np.float32)
        detail = src - cv2.GaussianBlur(src, (0, 0), 1.6)
        feather = cv2.GaussianBlur(mask[y0:y1, x0:x1].astype(np.float32) / 255, (0, 0), 1.2)[..., None]
        out[y0:y1, x0:x1] += detail * feather * sw.get("tex_amt", 1.0)
    return out.clip(0, 255).astype(np.uint8)

def place(big, sw, s):
    tx0, ty0, tx1, ty1 = [round(v * s) for v in sw["target"]]
    tw, th = tx1 - tx0, ty1 - ty0
    art = load_art(sw["art"], sw.get("tint"))
    r = art.width / art.height
    if sw.get("fit") == "h" or tw / th > r:
        nh = th; nw = round(th * r)
    else:
        nw = tw; nh = round(tw / r)
    art = art.resize((nw, nh), Image.LANCZOS)
    if sw.get("curve"):
        art = cylinder(art, sw["curve"])
    px, py = tx0 + (tw - nw) // 2, ty0 + (th - nh) // 2
    under = big[py:py + nh, px:px + nw]
    lum = cv2.GaussianBlur(under.mean(axis=2), (0, 0), 3)
    shade = np.clip(lum / max(lum.mean(), 1), .78, 1.15)[..., None]
    a = np.array(art).astype(np.float32)
    rgb = np.clip(a[..., :3] * shade, 0, 255)
    alpha = a[..., 3:] / 255 * sw.get("opacity", .93)
    comp = under * (1 - alpha) + rgb * alpha
    big[py:py + nh, px:px + nw] = cv2.GaussianBlur(comp, (0, 0), sw.get("soft", .6))

def frame(img, job):
    h, w = img.shape[:2]
    if job.get("frame") == "pad":
        side = max(w, h)
        edge = np.concatenate([img[:4].reshape(-1, 3), img[-4:].reshape(-1, 3)])
        bg = np.empty((side, side, 3), np.float32); bg[:] = np.median(edge, axis=0) * .92
        yy = np.linspace(-1, 1, side)[:, None]; xx = np.linspace(-1, 1, side)[None, :]
        bg *= (1 - .18 * (xx ** 2 + yy ** 2))[..., None]
        y = (side - h) // 2
        fade = np.ones((h, 1), np.float32); f = max(h // 12, 8)
        fade[:f, 0] = np.linspace(0, 1, f); fade[-f:, 0] = np.linspace(1, 0, f)
        bg[y:y + h] = bg[y:y + h] * (1 - fade[..., None]) + img * fade[..., None]
        return bg
    side = min(w, h)
    cx = job.get("cx", w / 2) * (w / job["_w"])
    x = int(np.clip(cx - side / 2, 0, w - side)); y = (h - side) // 2
    return img[y:y + side, x:x + side]

def run(slug, job):
    img = np.array(Image.open(SRC / job["src"]).convert("RGB"))
    orig = img.copy()
    for sw in job["swaps"]:
        img = erase(img, sw, orig)
    s = SIZE * 1.0 / min(img.shape[:2]) if job.get("frame") != "pad" else SIZE * 1.0 / max(img.shape[:2])
    big = Image.fromarray(img).resize((round(img.shape[1] * s), round(img.shape[0] * s)), Image.LANCZOS)
    big = np.array(big.filter(ImageFilter.UnsharpMask(radius=1.6, percent=60, threshold=2))).astype(np.float32)
    for sw in job["swaps"]:
        place(big, sw, s)
    job["_w"] = img.shape[1]
    out = frame(big, job)
    out = cv2.resize(out, (SIZE, SIZE), interpolation=cv2.INTER_AREA) if out.shape[0] != SIZE else out
    OUT.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(OUT / f"{slug}.webp", "WEBP", quality=88, method=6)
    print("swapped", slug)

if __name__ == "__main__":
    want = set(sys.argv[1:])
    for slug, job in JOBS.items():
        if not want or slug in want:
            run(slug, job)
