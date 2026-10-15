# V7 Merchandise & E-commerce Image System

**Status:** proposed implementation spec — no production changes
**Branch:** `feat/v7-merchandise-system`
**Brand source of truth:** approved V7 SVGs in `approved/`
**Visual reference:** V4 website mockups and existing shop implementation
**Guardrail:** never alter the live site as part of design development.

## Goal

Build a consistent merchandise catalog and product-image system for mission-support purchases. Merchandise supports donations; it must not compete with or obscure the primary Donate path.

## Product families

Initial catalog (small launch collection, roughly 20 SKUs total):

- T-shirts: adult unisex, adult women’s fit, youth/children’s
- Polos: adult unisex/men’s and women’s fit; youth only if supplier blanks support it
- Hoodies: adult unisex, adult women’s fit, youth/children’s
- Hats
- Mugs
- Keychains
- Number/vehicle stickers

Do not imply that gendered fits are different products when the print/artwork is the same; use one product with a fit/size variant where the store platform supports it. Create separate listings only when the blank, cut, price, or print placement materially differs.

## V7 logo rules

Use only the approved assets below; do not ask image generation to redraw, approximate, spell, or recreate the brand:

- Website wordmark: `approved/website-logo/faith-reins-v7-website-horizontal-green.svg` and cream inverse
- Formal seal: `approved/seal/faith-reins-v7-seal-green.svg`, cream inverse, or black
- Approved horse master: `approved/horse/horse-master-green.svg` with color variants derived from the same geometry

For product art, prefer the approved seal for a centered chest/hoodie graphic and the isolated horse or approved horizontal wordmark for a small left chest, sleeve, hat, or accessory. Confirm minimum detail and embroidery suitability with the vendor. Never use the document logo as a substitute for the website lockup unless the specific product design is approved for that use.

All generated product photography must start with a neutral garment/product and leave a clean, unobstructed print area. Place the actual approved SVG on top in a deterministic compositing step after generation. AI-generated text/logo artwork is not an acceptable final product asset.

## Image deliverables per listing

1. **Primary** — front 3/4 or straight-on product image, product centered, print readable.
2. **Back** — only when the garment has a back print; otherwise omit.
3. **Detail** — close crop of the actual V7 print/embroidery, only if it adds information.
4. **Color variants** — one image per genuinely offered garment color, with identical crop, lighting and scale.
5. **Fit variants** — adult unisex/men’s, women’s fit and youth/children’s must show the actual blank/cut. Do not represent a women’s or youth cut using a recolored adult garment.
6. **Size variants** — XS–XXL (or vendor-supported range) are selectable options, not separate photos unless the actual product/cut differs.
7. **Context/lifestyle** — optional secondary image; keep it consistent and do not reuse the V4 homepage hero photo.

## Proposed asset naming

Use stable slugs and include view, color and fit; use lower-case kebab case:

`{product}-{fit}-{color}-{view}-v7.webp`

Examples:
- `tee-adult-unisex-forest-front-v7.webp`
- `tee-womens-cream-front-v7.webp`
- `tee-youth-forest-front-v7.webp`
- `hoodie-adult-unisex-cream-front-v7.webp`
- `polo-womens-forest-left-chest-v7.webp`
- `hat-adult-forest-front-v7.webp`
- `mug-cream-seal-front-v7.webp`

Keep source renders and composed final exports in separate folders. Never overwrite V4 assets or approved V7 logo masters.

## Product art directions

### A — Signature Seal
- Forest-green or cream garment
- Approved green/gold seal on cream/white garment; approved cream seal on forest-green garment
- Center chest for tees and hoodies; maintain vendor-safe print margins
- No rope border or newly invented seal treatments

### B — Minimal Horse
- Approved horse only, in one approved color
- Small left chest on polo/tee/hoodie; small front placement on hat where embroidery supports the detail
- No added tagline unless it is part of an approved lockup

### C — Wordmark
- Approved horizontal website lockup on selected tees/hoodies only when it remains readable at real print size
- Preserve the exact “Pediatric & Equine Therapy” caption and proportions; never rearrange or independently retype the lockup

### D — Accessories
- Mug: centered seal on the front; optional mirrored second-side placement only if requested
- Keychain: use simplified approved horse/seal geometry only after manufacturer confirms minimum line/edge size
- Sticker: use approved horse or full seal with transparent/white-cutline option; no improvised typography

## Suggested catalog organization

- Apparel
  - T-shirts
  - Polos
  - Hoodies
  - Hats
- Accessories
  - Mugs
  - Keychains
  - Vehicle / number stickers

Keep Shop as a normal desktop navigation item and within the mobile hamburger menu. Do not add site search. Keep Donate visually primary and present; product pages should include a short, mission-first line and a secondary Donate link, not guilt-driven copy.

## Implementation and review sequence

1. Inventory existing shop data, supplier blanks, pricing, available sizes/colors, V4 mockups and image paths.
2. Confirm which of the ~20 listings are genuinely distinct products versus variant options.
3. Generate blank-product base photography for each distinct garment cut and accessory.
4. Composite the exact approved V7 SVGs onto the images; verify color, placement, scale and print safe area.
5. Produce consistent thumbnails, product-detail images, responsive crops and alt text.
6. Wire variants to the actual store data; ensure size/color/fit selection maps to the correct variant/SKU.
7. Validate keyboard/touch selection, stock/price updates, cart, checkout, mobile grid and Playwright shop tests.
8. Review screenshot contact sheets and actual supplier proof before approval.
9. Deploy only after explicit owner instruction.

## Acceptance checklist

- [ ] Every visible mark is an exact approved V7 asset; no AI-recreated logo/text.
- [ ] Adult, women’s and youth cuts are represented by the correct garment silhouettes.
- [ ] Variant labels, size ranges, colors, prices and inventory match supplier/store data.
- [ ] Same product variants use consistent framing and lighting.
- [ ] Product images are sharp, compressed, accessible and correctly alt-texted.
- [ ] No V4 homepage hero photo is reused as merchandise/lifestyle photography.
- [ ] No new site search, navigation, checkout or donation-flow redesign.
- [ ] Shop/cart/checkout Playwright tests pass.
- [ ] All generated/composited images remain in the development branch until approved.
- [ ] Live site remains unchanged until separate deployment approval.

## Open inputs to resolve from repository/vendor inventory

- Exact existing product list and current SKU/product IDs
- Supplier and garment blank model per fit
- Available garment colors and size ranges
- Product prices and inventory/fulfillment mapping
- Existing V4 product mockups and their approved placement/color decisions
- Whether each garment supports screen print, DTG, heat transfer or embroidery


## Approved one-color merchandising rule — 2026-10-12

All **core merchandise** mockups, product photographs and catalog renderings must display a **single-ink logo treatment**. Use exact approved SVG vector artwork composited after product imagery is created: `approved/seal/faith-reins-v7-seal-solid-green.svg` on light products, `approved/seal/faith-reins-v7-seal-solid-white.svg` on dark products, or the approved horse icon alone where an understated accent works better. The standard line excludes gold from decorative marks. Only approved formal, donor, or explicitly special-edition products may use the two-color green/gold seal.

Model apparel with natural left-chest placements where relevant; validate fabric texture, mark scale and visual legibility before moving from mockups to actual supplier proofs. Do not treat AI-rendered logo approximations from previous concept boards as production source files.
