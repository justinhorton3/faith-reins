# Outerwear — V7 approved category implementation

**Owner image approval:** October 16, 2026; only the attached photograph is approved (reaffirmed). **Live release:** not part of these source changes.

- Category: `/shop/outerwear`; Wix-hosted static filename `/shop/outerwear.html`.
- H1: Outerwear. SEO title: Quarter-Zips, Quilted Vests & Hoodies | Faith Reins.
- Hero: adult woman in cream quarter-zip and distinct man in forest-green diamond-quilted vest, horse by barn at golden hour.
- Approved single photograph shows the cream quarter-zip and forest-green men's vest with the approved chest marks; no alternate generated scene is approved.
- No embedded HTML headings, captions, buttons or wordmarks in photographic files. Use actual HTML.
- Desktop source: `foundations/photography/storefront/outerwear/outerwear-approved-master.jpg`.
- Mobile source: `foundations/photography/storefront/outerwear/outerwear-approved-master.jpg`.
- Independent website copies: `/assets/shop/v7/heroes/outerwear-desktop.webp` and `/assets/shop/v7/heroes/outerwear-mobile.webp`.
- Provenance: `docs/storefront-heroes/outerwear-assets.json`.
- Product families: `men-quilted-vest`, `quarter-zip`, `quilted-vest`, `heritage-hoodie`, `womens-hoodie`, `boys-hoodie`, `girls-hoodie`.
- New men’s vest specification: [product catalog record](../product-catalog/mens-forest-green-quilted-vest.md).
- Category’s CollectionPage + ItemList + BreadcrumbList, H1, canonical and OG image come from the shared template.
- Source imagery is a styling reference. Confirm supplier, stock, price and sample before actual merchandising/checkout.

## Locked image QA — 2026-10-16

The owner's **final revised images** are already preserved in V7 and copied into website-owned assets. Their binary provenance was re-verified on 2026-10-16:

| Asset | Relative V7 location | SHA-256 |
| --- | --- | --- |
| Desktop photographic master | `foundations/photography/storefront/outerwear/outerwear-desktop-approved-master.png` | `c9e0d01cf59e74a7c5fdcec2afaf610611a10787f2a7b9d7e7e19b8f2e8ec363` |
| Mobile photographic master | `foundations/photography/storefront/outerwear/outerwear-mobile-approved-master.png` | `cda9c9a3500ae45f859d504815dc0359a0d73c0d361cb6a39fe7f31b1e00dc4c` |

- **Cream quarter-zip on the woman:** the visible V7-style **horse emblem** in the photo is **80% of its previous linear width and height** (not 80% area). Keep it at her left chest, clear of the placket. The photo shows a horse icon, **not the circular rope seal**; do not silently replace it with another mark.
- **Forest-green men's quilted vest:** cream horse emblem centered over the **wearer's left breast**, with conspicuous clear space from the center zipper. Do not position the emblem against the zip seam.
- Keep both models, original barn-and-horse farm setting, fabric colors and edits identical; no promotional copy, category title, button, border or watermark baked into either hero photograph.
- Website category text and button are semantic HTML, not raster text. The source photos and WebP site copies must not be overwritten by other generated variants.
- **Asset verification is not vector-geometry verification.** The embedded horse artwork is part of an approved **photographic concept**; real print/embroidery files must come from the immutable `approved/horse/horse-master-green.svg` master (and approved seal masters only when specified). The supplied concept image is not approved production vector art or a supplier sew-out.
- The category's exact image source, dimensions, SHA-256 and website copies are recorded in [the provenance manifest](../../../../docs/storefront-heroes/outerwear-assets.json) (repository-relative path: `docs/storefront-heroes/outerwear-assets.json`).
