#!/usr/bin/env python3
"""Move owner-approved two-cap ranch hero from Shop to Hats, restore former Shop hero."""
import hashlib
import json
import shutil
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
v7 = root / "brand/v7-design-system"
old_commit = "8f05b578b7f4a79bbf32dbf63a4eea01a963f231"

def digest(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def put(path, text):
    (root / path).write_text(text)

def patch(path, before, after):
    f = root / path
    text = f.read_text()
    if before not in text:
        raise RuntimeError("Cannot find expected source in " + path)
    f.write_text(text.replace(before, after, 1))

def main():
    manifest = json.loads((root / "docs/storefront-heroes/shop-assets.json").read_text())
    photos = {img["view"]: img for img in manifest["images"]}
    assert set(photos) == {"desktop", "mobile"}
    archive = v7 / "foundations/photography/storefront/hats"
    archive.mkdir(parents=True, exist_ok=True)
    new_v7 = []
    for view in ["desktop", "mobile"]:
        files = [
            (root / ("public/assets/shop/v7/heroes/shop-" + view + ".webp"),
             root / ("public/assets/shop/v7/heroes/hats-ranch-" + view + ".webp")),
            (v7 / ("foundations/photography/storefront/shop/shop-" + view + ".webp"),
             archive / ("hats-ranch-" + view + ".webp")),
            (v7 / ("foundations/photography/storefront/shop/shop-approved-" + view + "-master.png"),
             archive / ("hats-ranch-" + view + "-approved-master.png"))
        ]
        for src, dst in files:
            assert src.exists(), str(src)
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
            assert digest(src) == digest(dst)
            if dst.is_relative_to(v7):
                new_v7.append(dst)
        assert digest(files[0][1]) == photos[view]["website"]["sha256"]
        assert digest(files[2][1]) == photos[view]["masterSha256"]

    # Restore earlier approved Shop artwork and its responsive style without
    # rolling back the site, category content or the unrelated merch corner.
    for path in ["src/lib/shop-hero.mjs", "src/styles/shop-hero.css", "tests/shop-hero.spec.js"]:
        original = subprocess.check_output(["git", "show", old_commit + ":" + path], cwd=root)
        (root / path).write_bytes(original)

    categories_path = root / "src/lib/shop-category-pages.json"
    categories = json.loads(categories_path.read_text())
    hats = next(item for item in categories if item["key"] == "hats")
    assert hats["hero"]["desktop"] == "/assets/shop/v7/heroes/hats-desktop.webp"
    hats["hero"].update({
        "desktop": "/assets/shop/v7/heroes/hats-ranch-desktop.webp",
        "mobile": "/assets/shop/v7/heroes/hats-ranch-mobile.webp",
        "width": 1536, "height": 1024,
        "mobileWidth": 1024, "mobileHeight": 1536,
        "desktopFocus": "center", "mobileFocus": "center",
        "alt": "Two adults wearing forest-green and cream Faith Reins caps near a horse at the ranch."
    })
    categories_path.write_text(json.dumps(categories, indent=2, ensure_ascii=False) + "\n")

    patch("src/lib/pages-main.mjs",
      '{ image: "https://www.faithreins.com/assets/shop/v7/heroes/shop-desktop.webp", imageAlt: "A man and a woman wearing Faith Reins merchandise at the ranch", imageWidth: 1536, imageHeight: 1024 }',
      '{ image: "https://www.faithreins.com/assets/shop/v7/barn-collection.webp", imageAlt: "Green hoodie, cream tee, cap and mug on a natural barn table", imageWidth: 2172, imageHeight: 724 }')

    with (root / "tests/shop-hero.spec.js").open("a") as out:
        out.write("""
test('Shop collection photo and Hats duo are correctly assigned', async ({page}) => {
  await page.goto('/shop');
  await expect(page.locator('.shop-editorial__scene img')).toHaveAttribute('src',/barn-collection.webp$/);
  await page.goto('/shop/hats');
  await expect(page.locator('.hero--collection img')).toHaveAttribute('src',/hats-ranch-desktop.webp$/);
  await expect(page.locator('.hero--collection source')).toHaveAttribute('srcset',/hats-ranch-mobile.webp$/);
});
""")
    guard = "assert.ok(shopPage?.body.includes('shop-category-tiles__grid'), 'Shop must show visual category navigation');"
    patch("scripts/verify-shop-category-routes.mjs", guard,
      """const hatsPage=CATEGORIES.find(c=>c.key==='hats');
assert.equal(hatsPage.hero.desktop,'/assets/shop/v7/heroes/hats-ranch-desktop.webp');
assert.equal(hatsPage.hero.mobile,'/assets/shop/v7/heroes/hats-ranch-mobile.webp');
""" + guard + """
assert.ok(shopPage.body.includes('/assets/shop/v7/barn-collection.webp'), 'Shop photo must be original collection image');
assert.ok(!shopPage.body.includes('/assets/shop/v7/heroes/shop-desktop.webp'), 'Hats image must not be on Shop');""")

    put("brand/v7-design-system/merchandise/storefront/shop.md",
      """# Main Shop hero - original approved V7 barn-table collection image

Owner correction, October 16, 2026: the main Shop (sometimes called Store)
must use the previously approved natural barn-table assortment, not the
couple in embroidered caps. Its image and V7 source master were preserved.

Site hero: public/assets/shop/v7/barn-collection.webp (2172 x 724).
Archive: foundations/photography/shop-lifestyle/barn-collection-master.png.
This photo shows V7 merchandise and represents the complete collection.
Keep the live headings and calls to action as HTML. Preserve the separate
merch corner, six category tiles, out-of-stock status and locked V7 logos.
Route: /shop (host-compatible /shop.html).

The duo formerly on Shop is assigned ONLY to Hats as its own images.
""")

    put("brand/v7-design-system/merchandise/storefront/hats.md",
      """# Hats - owner-corrected V7 ranch duo hero

Owner correction, October 16, 2026: the two-adult golden-hour ranch image,
featuring forest-green and cream Faith Reins caps, was incorrectly used for
main Shop. Those EXACT owner-approved desktop/mobile photos belong to Hats.

Website: public/assets/shop/v7/heroes/hats-ranch-desktop.webp and
public/assets/shop/v7/heroes/hats-ranch-mobile.webp.
V7 image archive: foundations/photography/storefront/hats/hats-ranch-
desktop.webp and hats-ranch-mobile.webp.
Original source PNG files in the same folder: hats-ranch-desktop-approved-
master.png and hats-ranch-mobile-approved-master.png.
All files are byte-identical copies; no logos or scene were regenerated.

The earlier Wixel Hats hero and its derivatives remain archived and
approved; they are now an inactive alternative, not deleted.
Category retains the single caps product family with its previous colors,
page SEO, and disabled checkout. Wix static route: /shop/hats.html.
""")

    hat_record = root / "docs/storefront-heroes/hats-assets.json"
    old_hat = json.loads(hat_record.read_text())
    old_hat["activeHero"] = "Two-person ranch cap hero, corrected from Shop"
    old_hat["originalWixelStatus"] = "Archived approved alternative"
    old_hat["currentManifest"] = "docs/storefront-heroes/hats-ranch-assets.json"
    hat_record.write_text(json.dumps(old_hat, indent=2) + "\n")

    manifest["status"] = "Owner corrected placement: this pair is Hats only"
    manifest["usage"] = "Hats, not main Shop"
    manifest["movedTo"] = "docs/storefront-heroes/hats-ranch-assets.json"
    (root / "docs/storefront-heroes/shop-assets.json").write_text(json.dumps(manifest, indent=2) + "\n")

    put("docs/storefront-heroes/hats-ranch-assets.json", json.dumps({
      "category": "hats",
      "approvedAssignment": "Owner correction 2026-10-16",
      "originalsUnchanged": True,
      "source": "docs/storefront-heroes/shop-assets.json",
      "originalSha256": {v: photos[v]["masterSha256"] for v in photos},
      "webSha256": {v: photos[v]["website"]["sha256"] for v in photos},
      "retainedOlderApprovedHatsWixelArtwork": True
    }, indent=2) + "\n")

    shop_record = root / "docs/shop-hero-image.json"
    info = json.loads(shop_record.read_text())
    info["activeHero"] = "public/assets/shop/v7/barn-collection.webp"
    info["status"] = "Owner-corrected: restored original approved barn-table collection photograph"
    info["misassignedHatsDuoMovedTo"] = "docs/storefront-heroes/hats-ranch-assets.json"
    shop_record.write_text(json.dumps(info, indent=2) + "\n")

    brief = v7 / "merchandise/SHOP-HERO-BRIEF.md"
    old_brief = brief.read_text()
    intro = """# Shop/Hats hero placement correction - October 16, 2026

The main Shop uses the previously approved barn-table merchandise collection
scene at public/assets/shop/v7/barn-collection.webp.
Hats uses the owner-corrected green/cream cap ranch duo with independent
desktop/mobile asset paths. The original V7 logo masters, older Hats art,
merch corner and existing product catalog remain unchanged.
Historical sections below were superseded by this owner's correction.

---

"""
    if not old_brief.startswith("# Shop/Hats hero placement correction"):
        brief.write_text(intro + old_brief)

    seo = v7 / "merchandise/storefront/SEO-ROUTES.md"
    content = seo.read_text().replace(
        "| Shop | /shop | /shop.html | Approved responsive V7 hero and six linked categories |",
        "| Shop | /shop | /shop.html | Restored barn-table hero |")
    content += """
## Approved hero placement correction - October 16, 2026

Shop uses its former natural barn-table collection hero. Hats uses the
two-adult green/cream cap duo. This changes only photo assignments and
related alt/social images; static hosting paths, products and checkout
are otherwise unchanged.
"""
    seo.write_text(content)
    plan = v7 / "merchandise/storefront/EXECUTION-PLAN.md"
    with plan.open("a") as out:
        out.write("""
## Owner correction - Store versus Hats (October 16, 2026)

Restore original Shop barn-table hero and move the already-approved
two-cap ranch duo to the Hats page, with separate identical photo files.
Preserve prior Wixel Hats artwork, V7 identity masters and existing merch.
""")

    checksum = v7 / "FILE-CHECKSUMS.json"
    table = json.loads(checksum.read_text())
    for f in new_v7 + [
        v7 / "merchandise/storefront/shop.md",
        v7 / "merchandise/storefront/hats.md",
        brief, seo, plan
    ]:
        table[f.relative_to(v7).as_posix()] = digest(f)
    checksum.write_text(json.dumps(table, indent=2) + "\n")
    print("Shop/Hats corrected with exact artwork and matching checksums.")

if __name__ == "__main__":
    main()
