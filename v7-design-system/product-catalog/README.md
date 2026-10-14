# V7 Merchandise Catalog — Store Handoff

This folder defines the metadata and acceptance rules for publishing approved Faith Reins merchandise in the website store. It does **not** change the approved product photographs, authorize unapproved variants, or imply that Printful has been configured.

## Product detail file convention

Use **one Markdown file per product family** (not per size), under `products/`. Each file should contain:

| Field | Meaning |
| --- | --- |
| Product ID and title | Stable store identity and customer-facing name |
| Audience and fit | Men's, women's, youth or unisex as applicable |
| Description | Customer-facing copy tied to the approved design |
| Variants | Approved color and size combinations in one table |
| Mockup reference | Exact approved image path for each visual variant |
| Print artwork | Separate production SVG/PNG path, if actually available |
| Fulfillment | Vendor/product mapping, initially `not configured` |
| Price and inventory | `TBD` until confirmed |
| Approval and proof | Owner approval, source hash, garment/embroidery proof status |

Do not invent SKU numbers, exact garment measurements, prices, material composition, or Printful product IDs. Supplier size charts must be sourced from the selected actual blank/product before checkout is enabled.

## Initial catalog scope

The approved merchandise direction includes apparel (men's and women's shirts, polos, quarter-zips, hoodies, vest and hats), youth clothing, and accessories (mug, notebook, keychain, water bottle/thermos and embroidered throw blanket). Only publish combinations with verified approved reference images. Other requested ideas are not automatically approved products.

## Brand rules

- Use exact approved V7 horse/seal artwork. Never substitute a new horse, simplified trace, monogram or regenerated logo.
- Premium small horse-only embroidery is the direction for polos, quarter-zips and vests; cap art is centered, and blanket embroidery belongs in a corner.
- Preserve approved cream/green and tonal-green variants where the approval record supports them.
- The embroidered throw blanket has approved green-on-cream and cream-on-green treatments.
- No `fr` monogram: the exploratory concept was rejected.
- The store is distinct from the Donate journey. Merchandise purchases must not be represented as equivalent to a direct charitable gift.

## Publication gates

1. Verify the exact approved mockup and its source hash.
2. Match each variant to a source image; do not reuse one photo for a different variant.
3. Check the actual fulfillment product, its available sizes/colors, print area and embroidery limitations.
4. Obtain a vendor proof before declaring production artwork ready.
5. Confirm price, fulfillment/tax/shipping policy and accessibility copy.
6. Add to Wix as a **draft** until fulfillment and purchase flow are tested.

**Status:** Documentation scaffold only. No product imagery, variant inventory, Wix products or Printful listings were created in this PR.
