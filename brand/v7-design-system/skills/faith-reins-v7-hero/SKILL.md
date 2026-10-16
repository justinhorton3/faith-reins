# Faith Reins V7 Brand-Correct Hero Skill

**Purpose:** Create high-quality Faith Reins site/store heroes without ever accepting an AI-invented or modified horse, seal, wordmark or merchandise logo.

## Before generation — mandatory

1. Read `approved/README.md`, `BRAND-USAGE-STANDARDS.md`, and the relevant merchandise product-catalog `.md` documents. Confirm the route, product style/color and permitted logo family. The only logo masters are the SVGs listed in `RELEASE-MANIFEST.json`; the tool checks their SHA-256 fingerprints. The **small, elegant V7 horse icon** is `approved/horse/horse-master-green.svg`; approved one-color seals are `approved/seal/faith-reins-v7-seal-solid-{green,white}.svg`. Do **not** substitute the generic *galloping horse*, a freshly generated illustrated horse head, or an `FR` monogram.
2. Look at the previously approved hero register and choose a distinct background and models. Do not reuse another category hero, invent catalog garments, or change merchandise already approved by the owner.
3. Generate a **clean, completely unbranded photographic base** with all garment panels, mugs, bottle or journal areas blank. Explicitly prohibit all icons, animals printed on products, badges, text, watermarks, page UI, logos and inscriptions. AI tools are used **only** for photography, never to draw, reinterpret, patch, or render a V7 identity mark.
4. Inspect the result visually. If the generator introduces **any** horse emblem or text on merchandise, **reject the photo** or clean only the relevant background area and manually re-inspect it. Do NOT use prompt-only 'fix the logo', style transfer or a lookalike. Keep accepted scene/person/background unchanged while branding is composited.

## Exact-vector branding

1. Prepare a JSON recipe from [the example](EXAMPLE.json). Use only IDs from the `ALLOWED_MASTERS` registry in `scripts/compose-approved-brand.py`. Express `center` and visible artwork `width` as fractions of the photograph dimensions. Get actual measurements from approved artwork: **left chest belongs to the wearer's left**, not the viewer's left; keep clear of zippers, seams, neckline and folds. For Hats, center the icon on the approved cap panel. Throws use their approved corner embroidery. Do not rescale seals by improvisation; use owner-requested relative change (e.g., 50%, 80%) against the prior approved width and height.
2. SHA-pin the pristine, logo-free source in the recipe; set `unbranded_source_visual_reviewed` to `true` **only after visually checking that no generated marks remain**. Do not mark this true by default. Preserve the source photo and the recipe. Use the CLI to composite the locked SVG outlines without changing geometry or using a raster cut-out:

   ```sh
   python3 -m pip install pillow cairosvg
   python3 scripts/compose-approved-brand.py render /path/to/home-gifts-desktop.json
   python3 scripts/compose-approved-brand.py verify /path/to/home-gifts-desktop.json
   ```

3. Review the proof image at 100% and the final intended mobile/desktop hero crops. The verifier guarantees the composited pixels came from the exact SHA-locked V7 masters **but cannot detect a stray horse that was present in the original generated base**, nor judge fabric perspective, naturalness or aesthetic placement. Do not claim automatic visual correctness. **If the result needs changes, create a new image revision** with a new recipe and repeat verification.
4. Compositing PNGs are lossless proofs; create website-specific WebP copies only *after* image approval. Preserve the master, proof and recipe in the V7 photography archive and copy only deliberate independent website derivatives to `public/assets/`. No website build should import from V7 directories.

## Approval / release checklist

- Approved catalog SKU and colors visible? Same subject and farm setting? No baked-in headline, button, QR code, stray marking or new merchandise?
- Is the **exact approved logo family** used? Was the source visually checked clean? Did `verify` succeed after the last change? Does the left-chest mark sit on the **wearer's left**, with clear space from the zipper?
- Does the mobile version preserve branding, faces and products? Is the desktop text area usable for HTML copy and contrast?
- Did the owner explicitly approve **this exact desktop/mobile image pair**, not merely the overall theme? Document approval date, scene identity, file hashes, product links and review status.
- For future Git commits: use small category-specific changes, run the V7 package and shop-route validators, inspect previews, then commit to `main` only after visual approval. Release/publishing remains separate.

## Hard stops

- **Never:** redraw the horse, commission a new horse shape, assume generated marks are V7, promote a draft to approved, use a rejected alternative, or replace an approved composition when asked only for positioning.
- No production files from screenshots or pixels embedded in hero photos. Supplier art must come from the verified V7 SVG master, with a vendor print/embroidery proof.
- An automated SHA check does not confer brand approval or legal ownership of AI-generated photo subjects; human visual and owner approval are still required.

## Failure recovery

If an image shows the wrong horse, stop generating new 'corrections' and determine whether the underlying photo can be made fully clean **without changing the approved scene**. Reject any base that retains the bad icon. Reapply the locked SVG by the compositing script, verify and show the image. If you cannot clean the photo reliably, explain the blocker and request a clean unbranded base, rather than passing off another generated logo.