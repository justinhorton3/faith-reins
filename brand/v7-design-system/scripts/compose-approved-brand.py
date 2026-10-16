#!/usr/bin/env python3
"""Faith Reins V7: place EXACT approved SVGs on an already-unbranded photo.

`render CONFIG.json` produces an immutable branded PNG and a JSON proof.
`verify CONFIG.json` reproduces pixel-identically using the hashed V7 masters.

Install: python -m pip install pillow cairosvg
This tool never creates or redraws logos. Visual review for stray marks and
realistic garment placement remains mandatory before approval/publication.
"""
import argparse
import hashlib
import io
import json
from pathlib import Path
import xml.etree.ElementTree as ET

# These are immutable names in the V7 release manifest, not search terms.
ALLOWED_MASTERS = {
    "horse-green": "approved/horse/horse-master-green.svg",
    "seal-solid-green": "approved/seal/faith-reins-v7-seal-solid-green.svg",
    "seal-solid-white": "approved/seal/faith-reins-v7-seal-solid-white.svg",
    "seal-two-color": "approved/seal/faith-reins-v7-seal-green.svg",
    "seal-ivory": "approved/seal/faith-reins-v7-seal-ivory.svg",
    "document-stacked-green": "approved/document-logo/faith-reins-v7-document-stacked-green.svg",
    "document-stacked-cream": "approved/document-logo/faith-reins-v7-document-stacked-cream.svg",
    "document-stacked-black": "approved/document-logo/faith-reins-v7-document-stacked-black.svg",
    "website-horizontal-green": "approved/website-logo/faith-reins-v7-website-horizontal-green.svg",
    "website-horizontal-cream": "approved/website-logo/faith-reins-v7-website-horizontal-cream.svg",
}


def sha(data):
    return hashlib.sha256(data).hexdigest()


def require(condition, message):
    if not condition:
        raise ValueError(message)


def read_config(config_path):
    obj = json.loads(config_path.read_text(encoding="utf-8"))
    require(obj.get("schema") == "faith-reins-v7-brand-composition/1", "Unknown composition schema")
    require(obj.get("unbranded_source_visual_reviewed") is True,
            "Reject source until a human confirms no existing, generated, or rejected marks")
    require(isinstance(obj.get("source_sha256"), str) and len(obj["source_sha256"]) == 64,
            "The source file must be pinned to its SHA-256 digest")
    require(isinstance(obj.get("marks"), list) and len(obj["marks"]) > 0,
            "Provide at least one mark")
    source = (config_path.parent / obj["source"]).resolve()
    dest = (config_path.parent / obj["output"]).resolve()
    require(source.is_file(), f"Missing unbranded photo: {source}")
    require(source != dest, "Never overwrite the original unbranded photograph")
    require(dest.suffix.lower() == ".png", "Proof must be a lossless PNG; make WebP only after review")
    require(sha(source.read_bytes()) == obj["source_sha256"], "Unbranded input hash mismatch")
    for item in obj["marks"]:
        require(item.get("asset") in ALLOWED_MASTERS, "Rejected/unapproved asset: " + str(item.get("asset")))
        center = item.get("center")
        require(isinstance(center, list) and len(center) == 2 and
                all(isinstance(v, (float, int)) and 0.0 <= v <= 1.0 for v in center),
                "center must be [x, y] normalized to 0..1")
        width = item.get("width")
        require(isinstance(width, (float, int)) and 0.01 <= width <= 0.35,
                "width must be 0.01..0.35 of image width")
        deg = item.get("rotation_deg", 0.0)
        require(isinstance(deg, (float, int)) and -45 <= deg <= 45,
                "Rotation must be within -45..45 degrees")
        opacity = item.get("opacity", 1.0)
        require(isinstance(opacity, (float, int)) and 0.1 <= opacity <= 1.0,
                "Opacity must be 0.1..1.0")
    return obj, source, dest


def load_v7_masters(root, items):
    release = json.loads((root / "RELEASE-MANIFEST.json").read_text(encoding="utf-8"))
    expected = {v["path"]: v["sha256"] for v in release["assets"]}
    result = {}
    for item in items:
        name = item["asset"]
        relative = ALLOWED_MASTERS[name]
        target = (root / relative).resolve()
        require(target.is_relative_to(root.resolve()), "Asset escaped V7 root")
        require(relative in expected and target.is_file(), "Asset not in locked V7 release manifest: " + relative)
        data = target.read_bytes()
        require(sha(data) == expected[relative], "Approved SVG hash mismatch: " + relative)
        document = ET.fromstring(data)
        tags = [n.tag.rsplit('}', 1)[-1] for n in document.iter()]
        require("svg" == tags[0] and "image" not in tags and "text" not in tags,
                "Approved master must contain vector-only outlined geometry: " + relative)
        result[name] = {"path": relative, "sha256": sha(data), "bytes": data}
    return result


def compose(config, source, masters):
    try:
        from PIL import Image
        import cairosvg
    except ImportError as exc:
        raise RuntimeError("Install pillow and cairosvg; no generated-logo fallback permitted") from exc
    with Image.open(source) as photo:
        image = photo.convert("RGBA")
    for m in config["marks"]:
        vector = masters[m["asset"]]["bytes"]
        intended_width = max(8, round(image.width * m["width"]))
        # Render SVG (exact outlines), then trim transparent canvas whitespace.
        blob = cairosvg.svg2png(bytestring=vector, output_width=intended_width * 3)
        with Image.open(io.BytesIO(blob)) as rendered:
            mark = rendered.convert("RGBA")
        bbox = mark.getchannel("A").getbbox()
        require(bbox is not None, "The approved SVG was empty")
        mark = mark.crop(bbox)
        mark = mark.resize((intended_width, max(1, round(intended_width * mark.height / mark.width))),
                           Image.Resampling.LANCZOS)
        rotation = m.get("rotation_deg", 0.0)
        if rotation:
            mark = mark.rotate(rotation, Image.Resampling.BICUBIC, expand=True)
        opacity = m.get("opacity", 1.0)
        if opacity != 1:
            mark.putalpha(mark.getchannel("A").point(lambda a: round(a * opacity)))
        x, y = round(image.width * m["center"][0]), round(image.height * m["center"][1])
        corner = (round(x - mark.width / 2), round(y - mark.height / 2))
        require(corner[0] >= 0 and corner[1] >= 0 and
                corner[0] + mark.width <= image.width and corner[1] + mark.height <= image.height,
                "Logo extends beyond frame: " + m["asset"])
        image.alpha_composite(mark, dest=corner)
    return image.convert("RGB")


def proof(config, source, dest, masters, result_hash):
    return {
        "schema": "faith-reins-v7-brand-proof/1",
        "status": "composition-verified-not-owner-approved",
        "unbranded_source_sha256": config["source_sha256"],
        "output_sha256": result_hash,
        "marks": [
            {"asset": x["asset"], "approved_svg": masters[x["asset"]]["path"],
             "svg_sha256": masters[x["asset"]]["sha256"],
             "center": x["center"], "width": x["width"],
             "rotation_deg": x.get("rotation_deg", 0.0),
             "opacity": x.get("opacity", 1.0)} for x in config["marks"]
        ],
        "visual_quality_review": "required",
        "owner_hero_approval": "required",
        "production_print_proof": "separate-supplier-review-required",
    }


def run(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("render", "verify"))
    parser.add_argument("config", type=Path)
    parser.add_argument("--v7-root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args(argv)
    config_path = args.config.resolve()
    config, source, dest = read_config(config_path)
    masters = load_v7_masters(args.v7_root.resolve(), config["marks"])
    composition = compose(config, source, masters)
    if args.action == "render":
        require(not dest.exists(), "Output exists. Use a new revision; do not silently overwrite reviewed artwork")
        dest.parent.mkdir(parents=True, exist_ok=True)
        composition.save(dest, format="PNG", compress_level=6)
        report = proof(config, source, dest, masters, sha(dest.read_bytes()))
        Path(str(dest) + ".v7-proof.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        print(json.dumps({"generated": str(dest), "proof": str(dest)+".v7-proof.json", "status": report["status"]}))
    else:
        from PIL import Image
        require(dest.is_file(), "Missing branded image")
        with Image.open(dest) as actual:
            expected_bytes = composition.tobytes()
            require(actual.convert("RGB").size == composition.size and
                    actual.convert("RGB").tobytes() == expected_bytes,
                    "Branded result is NOT pixel-identical to official SVG composition")
        report = json.loads(Path(str(dest) + ".v7-proof.json").read_text(encoding="utf-8"))
        require(report == proof(config, source, dest, masters, sha(dest.read_bytes())),
                "Approval/provenance proof was altered")
        print(json.dumps({"verified": str(dest), "masters": len(masters),
                          "result": "pixel-identical; still requires human visual review"}))


if __name__ == "__main__":
    try:
        run()
    except (ValueError, FileNotFoundError, json.JSONDecodeError) as exc:
        raise SystemExit("V7 brand check rejected this image: " + str(exc)) from exc