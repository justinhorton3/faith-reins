#!/usr/bin/env python3
"""Render Faith Reins shop product images (v6 artwork on illustrated garments).

Garments are parametric SVG flat-lays shaded in the browser; the print is the
archived v6 artwork from this package,
placed per the v6 print spec. These are product illustrations, not photographs.

Usage: python3 legacy/v6-reference/scripts/render-merch.py --output /new/staging/path [slug ...]
Needs: playwright (chromium), Pillow.
Output: external staging directory only; never run as part of a website build
"""
import base64, json, math, os, sys, argparse
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description="Historical V6 illustrations; never approved V7 photos")
parser.add_argument('--output', type=Path, required=True)
parser.add_argument('slugs', nargs='*')
args = parser.parse_args()
OUT = args.output.resolve()
if ROOT in OUT.parents or OUT == ROOT or OUT.exists():
    raise SystemExit("Use a new external staging directory")
ART = ROOT / "merch-artwork"
if any((parent / ".git").exists() for parent in (OUT, *OUT.parents)):
    raise SystemExit("Use staging outside repositories")
SIZE = 1200

FABRIC = {
    "forest": {"base": "#1F3D31", "light": "#2B4E40", "dark": "#14291F", "seam": "#10221A", "rib": "#1A3529"},
    "natural": {"base": "#ECE4D3", "light": "#F6F0E4", "dark": "#D6CBB4", "seam": "#C2B59B", "rib": "#E2D8C4"},
    "heather": {"base": "#B9B6AC", "light": "#CBC8BF", "dark": "#9C998F", "seam": "#8A877E", "rib": "#B0ADA3"},
}
BG = "#F4EFE5"

_art_cache = {}
def art(name):
    if name not in _art_cache:
        p = ART / f"{name}.png"
        w, h = Image.open(p).size
        _art_cache[name] = ("data:image/png;base64," + base64.b64encode(p.read_bytes()).decode(), w / h)
    return _art_cache[name]

def defs(f=None):
    shades = "".join(f"""<linearGradient id="shade-{n}" x1="0" y1="0" x2="1" y2="0.35"><stop offset="0" stop-color="{c['light']}"/><stop offset=".45" stop-color="{c['base']}"/><stop offset="1" stop-color="{c['dark']}"/></linearGradient>""" for n, c in FABRIC.items())
    return f"""<defs>{shades}
<linearGradient id="vshade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".10"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
<radialGradient id="floor" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5a4a30" stop-opacity=".18"/><stop offset="1" stop-color="#5a4a30" stop-opacity="0"/></radialGradient>
<filter id="drop" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#3b2f1c" flood-opacity=".22"/></filter>
<filter id="tex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="t"><feFuncA type="linear" slope=".10"/></feComponentTransfer><feComposite in="t" in2="SourceGraphic" operator="in"/></filter>
<filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
<filter id="softer"><feGaussianBlur stdDeviation="14"/></filter>
</defs>"""

def mirror(pts):
    return [(1000 - x, y) for x, y in pts]

def fmt(p):
    return f"{p[0]:.1f},{p[1]:.1f}"

# ---------------- Tops ----------------
CUTS = {
    # sh: shoulder half width, cw: chest, ww: waist, hw: hem, ay: armpit y, wy: waist y, hy: hem y
    "mens":    dict(sh=205, cw=222, ww=218, hw=222, y0=200, ay=372, wy=640, hy=860, neck=62, drop=46),
    "womens":  dict(sh=180, cw=200, ww=170, hw=196, y0=208, ay=372, wy=600, hy=836, neck=74, drop=70),
    "youth":   dict(sh=190, cw=205, ww=203, hw=206, y0=212, ay=376, wy=620, hy=810, neck=64, drop=44),
    "toddler": dict(sh=190, cw=210, ww=210, hw=214, y0=232, ay=390, wy=600, hy=770, neck=70, drop=46),
}
SCALE = {"mens": 1.0, "womens": 1.0, "youth": 0.86, "toddler": 0.72}

def body_path(k, neck_style):
    sh, cw, ww, hw = k["sh"], k["cw"], k["ww"], k["hw"]
    y0, ay, wy, hy, nk, dr = k["y0"], k["ay"], k["wy"], k["hy"], k["neck"], k["drop"]
    S = (500 + sh, y0 + 34)
    A = (500 + cw, ay)
    W = (500 + ww, wy)
    H = (500 + hw, hy)
    d = f"M {500 - nk},{y0} "
    # neckline
    if neck_style == "v":
        d += f"L 500,{y0 + dr * 1.6} L {500 + nk},{y0} "
    elif neck_style == "none":
        d += f"Q 500,{y0 + 18} {500 + nk},{y0} "
    else:
        d += f"C {500 - nk * .55},{y0 + dr} {500 + nk * .55},{y0 + dr} {500 + nk},{y0} "
    d += f"L {fmt(S)} "
    d += f"C {S[0] + 6},{S[1] + 60} {A[0] - 2},{A[1] - 70} {fmt(A)} "
    d += f"C {A[0] - 4},{(A[1] + W[1]) / 2} {W[0] + 2},{W[1] - 80} {fmt(W)} "
    d += f"C {W[0] - 1},{W[1] + 80} {H[0] - 2},{H[1] - 90} {fmt(H)} "
    d += f"Q 500,{hy + 10} {1000 - H[0]},{H[1]} "
    Wl, Al, Sl = (1000 - W[0], W[1]), (1000 - A[0], A[1]), (1000 - S[0], S[1])
    d += f"C {1000 - H[0] + 2},{H[1] - 90} {Wl[0] - 2},{Wl[1] + 80} {fmt(Wl)} "
    d += f"C {Wl[0] - 2},{Wl[1] - 80} {Al[0] + 4},{(Al[1] + Wl[1]) / 2} {fmt(Al)} "
    d += f"C {Al[0] + 2},{Al[1] - 70} {Sl[0] - 6},{Sl[1] + 60} {fmt(Sl)} Z"
    return d, S, A, H

def sleeve_path(k, length, angle_deg, cuff_w, side=1):
    """Sleeve from shoulder point S to armpit A, extended outward at angle (degrees below horizontal)."""
    sh, cw, y0, ay = k["sh"], k["cw"], k["y0"], k["ay"]
    S = (500 + sh, y0 + 34)
    A = (500 + cw, ay)
    a = math.radians(angle_deg)
    ux, uy = math.cos(a), math.sin(a)          # sleeve direction
    nx, ny = -uy, ux                           # normal (toward underarm)
    top_end = (S[0] + ux * length, S[1] + uy * length)
    bot_end = (top_end[0] + nx * cuff_w, top_end[1] + ny * cuff_w)
    pts = [S, top_end, bot_end, A]
    if side < 0:
        pts = mirror(pts)
    S_, T_, B_, A_ = pts
    d = f"M {fmt(S_)} L {fmt(T_)} L {fmt(B_)} Q {(B_[0] + A_[0]) / 2},{(B_[1] + A_[1]) / 2 + 6} {fmt(A_)} Z"
    return d, T_, B_

def rib_band(x1, y1, x2, y2, height, fab, nlines=40, vertical=True):
    c = FABRIC[fab]
    out = f'<path d="M {x1},{y1} L {x2},{y2} L {x2},{y2 + height} L {x1},{y1 + height} Z" fill="{c["rib"]}"/>'
    lines = "".join(f'<line x1="{x1 + (x2 - x1) * i / nlines:.1f}" y1="{y1 + (y2 - y1) * i / nlines + 3:.1f}" x2="{x1 + (x2 - x1) * i / nlines:.1f}" y2="{y1 + (y2 - y1) * i / nlines + height - 3:.1f}" stroke="{c["seam"]}" stroke-opacity=".35" stroke-width="1.4"/>' for i in range(1, nlines))
    return out + lines

def cuff(T, B, fab, depth=34):
    """Rib cuff at sleeve end, quadrilateral extending the sleeve direction."""
    c = FABRIC[fab]
    vx, vy = B[0] - T[0], B[1] - T[1]
    L = math.hypot(vx, vy); nx, ny = -vy / L, vx / L   # perpendicular (sleeve direction outward sign may vary)
    # choose direction pointing away from body center
    mid = ((T[0] + B[0]) / 2, (T[1] + B[1]) / 2)
    if (mid[0] - 500) * nx < 0: nx, ny = -nx, -ny
    T2 = (T[0] + nx * depth, T[1] + ny * depth); B2 = (B[0] + nx * depth, B[1] + ny * depth)
    s = f'<path d="M {fmt(T)} L {fmt(T2)} L {fmt(B2)} L {fmt(B)} Z" fill="{c["rib"]}" stroke="{c["seam"]}" stroke-width="1.5" stroke-opacity=".6"/>'
    for i in range(1, 9):
        t = i / 9
        p1 = (T[0] + vx * t, T[1] + vy * t); p2 = (T2[0] + vx * t, T2[1] + vy * t)
        s += f'<line x1="{p1[0]:.1f}" y1="{p1[1]:.1f}" x2="{p2[0]:.1f}" y2="{p2[1]:.1f}" stroke="{c["seam"]}" stroke-opacity=".35" stroke-width="1.3"/>'
    return s

def print_image(name, cx, cy, width, opacity=0.96):
    uri, ratio = art(name)
    h = width / ratio
    return f'<image href="{uri}" x="{cx - width / 2:.1f}" y="{cy - h / 2:.1f}" width="{width:.1f}" height="{h:.1f}" opacity="{opacity}" preserveAspectRatio="xMidYMid meet"/>'

def top(spec):
    """spec: style (tee|longsleeve|crewneck|hoodie|polo), cut, fabric, print {art, place, width}"""
    style, cut, fab = spec["style"], spec["cut"], spec["fabric"]
    k = dict(CUTS[cut])
    c = FABRIC[fab]
    long_sleeve = style in ("longsleeve", "crewneck", "hoodie")
    neck = "v" if (cut == "womens" and style == "tee" and spec.get("vneck")) else ("none" if style in ("hoodie", "polo") else "crew")
    body, S, A, H = body_path(k, neck)
    parts = []
    # hood behind the body
    if style == "hoodie":
        nk, y0 = k["neck"], k["y0"]
        hood = f"M {500 - nk - 95},{y0 + 50} C {500 - nk - 150},{y0 - 150} {500 + nk + 150},{y0 - 150} {500 + nk + 95},{y0 + 50} Z"
        parts.append(f'<path d="{hood}" fill="url(#shade)" stroke="{c["seam"]}" stroke-width="2" stroke-opacity=".7"/>')
        parts.append(f'<path d="{hood}" fill="url(#vshade)"/>')
        inner = f"M {500 - nk - 40},{y0 + 36} C {500 - nk - 70},{y0 - 85} {500 + nk + 70},{y0 - 85} {500 + nk + 40},{y0 + 36} Z"
        parts.append(f'<path d="{inner}" fill="{c["dark"]}" opacity=".85"/>')
    # sleeves
    if long_sleeve:
        length = {"mens": 470, "womens": 445, "youth": 410, "toddler": 330}[cut]
        sl = [sleeve_path(k, length, 71, 112 if cut != "womens" else 100, s) for s in (1, -1)]
    else:
        length = {"mens": 150, "womens": 108, "youth": 140, "toddler": 128}[cut]
        sl = [sleeve_path(k, length, 34, 128 if cut != "womens" else 112, s) for s in (1, -1)]
    for d, T, B in sl:
        parts.append(f'<path d="{d}" fill="url(#shade)" stroke="{c["seam"]}" stroke-width="2" stroke-opacity=".7"/>')
        parts.append(f'<path d="{d}" fill="url(#vshade)"/>')
        if long_sleeve:
            parts.append(cuff(T, B, fab, 30 if cut != "toddler" else 24))
        elif style == "polo":
            parts.append(cuff(T, B, fab, 18))
        else:
            # hem stitch near sleeve end
            vx, vy = B[0] - T[0], B[1] - T[1]; L = math.hypot(vx, vy); nx, ny = -vy / L, vx / L
            mid = ((T[0] + B[0]) / 2, (T[1] + B[1]) / 2)
            if (mid[0] - 500) * nx > 0: nx, ny = -nx, -ny
            p1 = (T[0] + nx * 16, T[1] + ny * 16); p2 = (B[0] + nx * 16, B[1] + ny * 16)
            parts.append(f'<line x1="{p1[0]:.1f}" y1="{p1[1]:.1f}" x2="{p2[0]:.1f}" y2="{p2[1]:.1f}" stroke="{c["seam"]}" stroke-width="1.6" stroke-dasharray="5 5" stroke-opacity=".7"/>')
    # body
    parts.append(f'<path d="{body}" fill="url(#shade)" stroke="{c["seam"]}" stroke-width="2" stroke-opacity=".7"/>')
    parts.append(f'<path d="{body}" fill="url(#vshade)"/>')
    parts.append(f'<path d="{body}" fill="#000" filter="url(#tex)"/>')
    # soft folds
    hy, ay = k["hy"], k["ay"]
    parts.append(f'<g filter="url(#softer)" opacity=".55"><path d="M {500 - k["cw"] * .55},{ay + 60} Q {500 - k["cw"] * .35},{(ay + hy) / 2} {500 - k["cw"] * .5},{hy - 30}" stroke="{c["light"]}" stroke-width="26" fill="none"/><path d="M {500 + k["cw"] * .6},{ay + 90} Q {500 + k["cw"] * .42},{(ay + hy) / 2 + 40} {500 + k["cw"] * .58},{hy - 20}" stroke="{c["dark"]}" stroke-width="30" fill="none"/></g>')
    # neck trims
    nk, y0, dr = k["neck"], k["y0"], k["drop"]
    if style in ("tee", "longsleeve", "crewneck"):
        w = 16 if style != "crewneck" else 24
        if neck == "v":
            parts.append(f'<path d="M {500 - nk},{y0} L 500,{y0 + dr * 1.6} L {500 + nk},{y0}" stroke="{c["rib"]}" stroke-width="{w}" fill="none"/>')
        else:
            parts.append(f'<path d="M {500 - nk},{y0} C {500 - nk * .55},{y0 + dr} {500 + nk * .55},{y0 + dr} {500 + nk},{y0}" stroke="{c["rib"]}" stroke-width="{w}" fill="none"/>')
            parts.append(f'<path d="M {500 - nk},{y0} C {500 - nk * .55},{y0 + dr} {500 + nk * .55},{y0 + dr} {500 + nk},{y0}" stroke="{c["seam"]}" stroke-width="1.5" stroke-opacity=".6" fill="none" transform="translate(0,{w / 2})"/>')
        # back-neck shadow
        parts.append(f'<path d="M {500 - nk + 8},{y0 + 2} Q 500,{y0 + 16} {500 + nk - 8},{y0 + 2}" stroke="{c["dark"]}" stroke-width="8" fill="none" opacity=".8"/>')
    if style == "crewneck" or style == "hoodie":
        parts.append(rib_band(500 - k["hw"] + 2, hy - 44, 500 + k["hw"] - 2, hy - 44, 46, fab, 60))
    if style == "hoodie":
        # neckline of hood front, drawstrings, pocket
        parts.append(f'<path d="M {500 - nk - 30},{y0 + 30} Q 500,{y0 + 70} {500 + nk + 30},{y0 + 30}" stroke="{c["seam"]}" stroke-width="3" fill="none" opacity=".8"/>')
        for dx in (-26, 26):
            parts.append(f'<path d="M {500 + dx},{y0 + 52} q {dx * .2},60 {dx * .1},{110 if cut != "toddler" else 80}" stroke="{FABRIC["natural"]["light"] if fab == "forest" else FABRIC["forest"]["base"]}" stroke-width="7" stroke-linecap="round" fill="none"/>')
        py = hy - 250 if cut != "toddler" else hy - 190
        pw, pb = k["cw"] * .62, k["cw"] * .78
        parts.append(f'<path d="M {500 - pw},{py} L {500 + pw},{py} L {500 + pb},{hy - 52} L {500 - pb},{hy - 52} Z" fill="{c["base"]}" stroke="{c["seam"]}" stroke-width="2" stroke-opacity=".7"/>')
        parts.append(f'<path d="M {500 - pw - 20},{py + 40} L {500 - pw},{py} M {500 + pw + 20},{py + 40} L {500 + pw},{py}" stroke="{c["dark"]}" stroke-width="6" opacity=".7"/>')
    if style == "polo":
        # collar wings and placket
        cl = f"M {500 - nk - 14},{y0 - 4} L {500 - nk + 30},{y0 + 92} L 500,{y0 + 40} L {500 + nk - 30},{y0 + 92} L {500 + nk + 14},{y0 - 4} Q 500,{y0 - 26} {500 - nk - 14},{y0 - 4} Z"
        parts.append(f'<path d="{cl}" fill="{c["light"]}" stroke="{c["seam"]}" stroke-width="2"/>')
        parts.append(f'<path d="M 488,{y0 + 40} L 512,{y0 + 40} L 512,{y0 + 190} L 488,{y0 + 190} Z" fill="{c["base"]}" stroke="{c["seam"]}" stroke-width="1.6"/>')
        for by in (y0 + 80, y0 + 125, y0 + 170):
            parts.append(f'<circle cx="500" cy="{by}" r="6.5" fill="{FABRIC["natural"]["light"] if fab == "forest" else "#CFC4AE"}" stroke="{c["seam"]}" stroke-width="1"/>')
    # hem stitch
    if style not in ("crewneck", "hoodie"):
        parts.append(f'<path d="M {500 - k["hw"] + 6},{hy - 18} Q 500,{hy - 8} {500 + k["hw"] - 6},{hy - 18}" stroke="{c["seam"]}" stroke-width="1.6" stroke-dasharray="5 5" stroke-opacity=".7" fill="none"/>')
    # print
    pr = spec.get("print")
    if pr:
        place, width = pr["place"], pr["width"]
        if place == "left-chest":
            cx, cy = 500 + k["cw"] * .46, ay + 14
        elif place == "center-chest":
            cx, cy = 500, ay + (30 if style != "hoodie" else -5)
        else:  # full-front
            cx, cy = 500, ay + 120 if style != "hoodie" else ay + 70
        parts.append(print_image(pr["art"], cx, cy, width))
    # fabric texture over everything garment
    garment = "".join(parts)
    sc = SCALE[cut]
    tx = 500 - 500 * sc
    ty = 520 - 540 * sc
    return f'<ellipse cx="500" cy="{ty + (k["hy"] + 30) * sc}" rx="{330 * sc}" ry="26" fill="url(#floor)"/><g transform="translate({tx:.1f},{ty:.1f}) scale({sc})" filter="url(#drop)">{garment}</g>'

# ---------------- Accessories ----------------
def cap(spec):
    fab = spec["fabric"]; c = FABRIC[fab]
    sc = 0.86 if spec.get("youth") else 1.0
    g = []
    crown = "M 250,610 C 250,330 380,250 500,250 C 620,250 750,330 750,610 Q 500,640 250,610 Z"
    g.append(f'<path d="{crown}" fill="url(#shade)" stroke="{c["seam"]}" stroke-width="2"/>')
    g.append(f'<path d="{crown}" fill="url(#vshade)"/>')
    for d in ("M 500,252 L 500,600", "M 500,252 C 420,300 380,450 372,600", "M 500,252 C 580,300 620,450 628,600"):
        g.append(f'<path d="{d}" stroke="{c["seam"]}" stroke-width="2" stroke-dasharray="6 5" fill="none" opacity=".7"/>')
    g.append(f'<circle cx="500" cy="254" r="12" fill="{c["base"]}" stroke="{c["seam"]}" stroke-width="2"/>')
    visor = "M 300,604 C 400,632 600,632 700,604 C 724,650 690,722 500,742 C 310,722 276,650 300,604 Z"
    g.append(f'<path d="{visor}" fill="{c["dark"]}" stroke="{c["seam"]}" stroke-width="2"/>')
    g.append(f'<path d="M 318,622 C 410,648 590,648 682,622 C 694,656 664,708 500,724 C 336,708 306,656 318,622 Z" fill="{c["base"]}" opacity=".5"/>')
    g.append(f'<path d="M 316,690 C 400,728 600,728 684,690" stroke="{c["seam"]}" stroke-width="2" stroke-dasharray="6 5" fill="none" opacity=".7"/>')
    g.append(print_image(spec["art"], 500, 440, 210))
    tx, ty = 500 - 500 * sc, 520 - 520 * sc
    return f'<ellipse cx="500" cy="{ty + 770 * sc}" rx="{300 * sc}" ry="26" fill="url(#floor)"/><g transform="translate({tx},{ty}) scale({sc})" filter="url(#drop)">{"".join(g)}</g>'

def beanie(spec):
    fab = spec["fabric"]; c = FABRIC[fab]
    g = []
    dome = "M 290,560 C 270,330 380,220 500,220 C 620,220 730,330 710,560 Z"
    g.append(f'<defs><clipPath id="domeclip"><path d="{dome}"/></clipPath></defs>')
    g.append(f'<path d="{dome}" fill="url(#shade)" stroke="{c["seam"]}" stroke-width="2"/>')
    ribs = "".join(f'<path d="M {500 + i * 24},{200} Q {500 + i * 27},420 {500 + i * 26},560" stroke="{c["seam"]}" stroke-opacity=".32" stroke-width="2.4" fill="none"/>' for i in range(-10, 11))
    g.append(f'<g clip-path="url(#domeclip)">{ribs}</g>')
    g.append(f'<path d="{dome}" fill="url(#vshade)"/>')
    g.append(f'<path d="M 270,540 L 730,540 L 742,740 L 258,740 Z" fill="{c["rib"]}" stroke="{c["seam"]}" stroke-width="2"/>')
    for i in range(0, 41):
        x = 262 + i * 12
        g.append(f'<line x1="{x}" y1="546" x2="{x - 2}" y2="734" stroke="{c["seam"]}" stroke-opacity=".38" stroke-width="2"/>')
    g.append(f'<path d="M 270,540 L 730,540 L 742,740 L 258,740 Z" fill="url(#vshade)"/>')
    g.append(print_image(spec["art"], 500, 640, 120))
    return f'<ellipse cx="500" cy="770" rx="300" ry="26" fill="url(#floor)"/><g filter="url(#drop)">{"".join(g)}</g>'

def mug(spec):
    g = []
    cer, cer_d, rim = "#F3EDE1", "#D9CFBC", "#E7DECC"
    if spec.get("travel"):
        g.append(f'<path d="M 690,330 C 820,330 830,560 690,600" stroke="{cer_d}" stroke-width="44" fill="none" stroke-linecap="round"/>')
        g.append(f'<path d="M 690,330 C 800,335 805,555 690,595" stroke="{cer}" stroke-width="28" fill="none" stroke-linecap="round"/>')
        g.append('<path d="M 330,250 L 670,250 L 650,800 C 650,830 350,830 350,800 Z" fill="url(#mugshade)" stroke="#C8BCA4" stroke-width="2"/>')
        g.append('<rect x="318" y="196" width="364" height="70" rx="10" fill="#9EA49F" stroke="#7E847F" stroke-width="2"/>')
        g.append('<rect x="330" y="186" width="340" height="22" rx="8" fill="#2C3530"/>')
        g.append('<rect x="318" y="255" width="364" height="14" fill="#B9BEB9"/>')
        g.append(print_image(spec["art"], 500, 520, 230))
        floor = 830
    else:
        g.append(f'<path d="M 700,410 C 850,400 860,640 700,640" stroke="{cer_d}" stroke-width="54" fill="none" stroke-linecap="round"/>')
        g.append(f'<path d="M 700,410 C 830,405 835,635 700,635" stroke="{cer}" stroke-width="34" fill="none" stroke-linecap="round"/>')
        g.append('<path d="M 300,330 L 700,330 L 700,740 C 700,790 300,790 300,740 Z" fill="url(#mugshade)" stroke="#C8BCA4" stroke-width="2"/>')
        g.append(f'<ellipse cx="500" cy="330" rx="200" ry="34" fill="{rim}" stroke="#C8BCA4" stroke-width="2"/>')
        g.append('<ellipse cx="500" cy="334" rx="182" ry="26" fill="#CFC4AE"/>')
        g.append(print_image(spec["art"], 500, 545, 330))
        floor = 790
    shade = '<linearGradient id="mugshade" x1="0" x2="1"><stop offset="0" stop-color="#E1D8C6"/><stop offset=".3" stop-color="#FBF7EF"/><stop offset=".7" stop-color="#EFE8DA"/><stop offset="1" stop-color="#CFC4AE"/></linearGradient>'
    return f'<defs>{shade}</defs><ellipse cx="500" cy="{floor}" rx="300" ry="28" fill="url(#floor)"/><g filter="url(#drop)">{"".join(g)}</g>'

def keychain(spec):
    g = []
    g.append('<circle cx="500" cy="230" r="70" fill="none" stroke="#A9A39A" stroke-width="16"/>')
    g.append('<circle cx="500" cy="230" r="70" fill="none" stroke="#D8D3CA" stroke-width="6"/>')
    g.append('<rect x="470" y="290" width="60" height="70" rx="10" fill="#B3ACA1" stroke="#8D867B" stroke-width="2"/>')
    tag = "M 360,360 L 640,360 C 680,360 700,380 700,420 L 700,700 C 700,780 600,830 500,830 C 400,830 300,780 300,700 L 300,420 C 300,380 320,360 360,360 Z"
    g.append('<defs><linearGradient id="leather" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A86B3C"/><stop offset=".55" stop-color="#8A5329"/><stop offset="1" stop-color="#6B3E1D"/></linearGradient></defs>')
    g.append(f'<path d="{tag}" fill="url(#leather)" stroke="#5A3418" stroke-width="2"/>')
    g.append(f'<path d="{tag}" fill="none" stroke="#E2B98A" stroke-width="2.4" stroke-dasharray="8 7" transform="translate(500,595) scale(.92) translate(-500,-595)" opacity=".8"/>')
    g.append('<circle cx="500" cy="400" r="16" fill="#5A3418"/>')
    g.append(print_image(spec["art"], 500, 620, 300, 0.95))
    return f'<ellipse cx="500" cy="850" rx="260" ry="24" fill="url(#floor)"/><g filter="url(#drop)">{"".join(g)}</g>'

def stickers(spec):
    g = []
    round_uri, _ = art("fr-sticker-round"); bar_uri, br = art("fr-sticker-bar")
    g.append(f'<g transform="rotate(-8 360 420)"><circle cx="360" cy="420" r="232" fill="#FFFFFF"/><image href="{round_uri}" x="140" y="200" width="440" height="440"/></g>')
    g.append(f'<g transform="rotate(5 610 700)"><rect x="330" y="590" width="560" height="{560 / br + 30:.0f}" rx="22" fill="#FFFFFF"/><image href="{bar_uri}" x="345" y="605" width="530" height="{530 / br:.0f}"/></g>')
    mark_uri, mr = art("fr-mark-green")
    g.append(f'<g transform="rotate(10 720 330)"><circle cx="720" cy="330" r="130" fill="#FFFFFF"/><circle cx="720" cy="330" r="114" fill="#ECE4D3"/><image href="{mark_uri}" x="635" y="{330 - 85 / mr * 1:.0f}" width="170" height="{170 / mr:.0f}"/></g>')
    return f'<g filter="url(#drop)">{"".join(g)}</g>'

RENDER = {"top": top, "cap": cap, "beanie": beanie, "mug": mug, "keychain": keychain, "stickers": stickers}

def item(spec):
    fab = spec.get("fabric", "natural")
    return RENDER[spec["kind"]](spec).replace("url(#shade)", f"url(#shade-{fab})")

def svg_for(spec):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="{SIZE}" height="{SIZE}">{defs()}<rect width="1000" height="1000" fill="{BG}"/>{item(spec)}</svg>'

def hero_svg(w, h, placements, catalog):
    """placements: (slug, x, y, size) in hero pixel units; items drawn in order."""
    by = {i["slug"]: i["render"] for i in catalog}
    body = "".join(f'<svg x="{x}" y="{y}" width="{sz}" height="{sz}" viewBox="0 0 1000 1000" overflow="visible">{item(by[slug])}</svg>' for slug, x, y, sz in placements)
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{defs()}<rect width="{w}" height="{h}" fill="{BG}"/>{body}</svg>'

HEROES = {
    "hero-shop-desktop": (1600, 800, [("caps", 1300, 170, 250), ("heritage-hoodie", 760, 150, 470), ("womens-tee", 1080, 200, 430), ("coffee-mug", 1330, 420, 230)]),
    "hero-shop-mobile": (800, 1000, [("caps", 560, 40, 200), ("heritage-hoodie", 60, 10, 430), ("womens-tee", 370, 70, 380)]),
}

def main():
    catalog = json.loads((ROOT / "production/products.json").read_text())
    want = set(args.slugs)
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": SIZE, "height": SIZE})
        for it in catalog:
            if want and it["slug"] not in want:
                continue
            pg.set_content(f'<html><body style="margin:0">{svg_for(it["render"])}</body></html>')
            png = OUT / f"{it['slug']}.png"
            pg.locator("svg").first.screenshot(path=str(png))
            Image.open(png).convert("RGB").save(OUT / f"{it['slug']}.webp", "WEBP", quality=86, method=6)
            png.unlink()
            print("rendered", it["slug"])
        if not want or "hero" in want:
            for name, (w, h, pl) in HEROES.items():
                pg.set_viewport_size({"width": w, "height": h})
                pg.set_content(f'<html><body style="margin:0">{hero_svg(w, h, pl, catalog)}</body></html>')
                png = OUT / f"{name}.png"
                pg.locator("svg").first.screenshot(path=str(png))
                Image.open(png).convert("RGB").save(OUT / f"{name}.webp", "WEBP", quality=86, method=6)
                png.unlink()
                print("rendered", name)
        b.close()

if __name__ == "__main__":
    main()
