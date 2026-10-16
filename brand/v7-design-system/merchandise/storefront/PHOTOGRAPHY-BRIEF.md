# Storefront farm lifestyle photography

Direction accepted October 16, 2026. See [execution plan](EXECUTION-PLAN.md) for the page and commit sequence.

Use the existing [Our Mission farm master](../../foundations/photography/masters/hero-our-mission.jpg) as the primary setting reference and the [home master](../../foundations/photography/masters/hero-home.jpg) for natural light, timber fencing and wooded pasture. These references establish photographic continuity; do not repeat those photographs as store heroes.

People wear or use merchandise from [approved product originals](../../approved/product-images/README.md). Preserve the actual garment shape, forest green/cream/white colors, logo design, chest or cap placement and print/embroidery treatment. Product images illustrate concepts; they do not establish final supplier specifications.

Compose one distinct image per page. Keep a quiet area for live HTML text, natural interaction, visible faces and identifiable merchandise. Avoid studio backdrops, product piles, dramatic fashion poses, artificial color filters, generic horse icons and text embedded in the image. Keep horses in the background when appropriate rather than competing with the product.

Scene assignments are recorded in the execution plan. Generated masters and responsive web exports live under `foundations/photography/storefront/`, with a per-category JSON provenance record containing the exact prompt, source references and hashes, export sizes and review notes. Website copies live independently under `public/assets/shop/v7/heroes/`.

Status vocabulary: `generated-concept-implementation-reviewed` means inspected for page use by the implementation agent; `owner-approved` is reserved for an explicit owner image approval. Do not overwrite existing approvals or historical hero records.

## Outerwear reference lock — October 16, 2026

The desktop and mobile Outerwear masters in `foundations/photography/storefront/outerwear/` are the **final reviewed photographic reference pair**, not new logo assets. **No regeneration** is required for this category. The woman's cream quarter-zip horse emblem is scaled to **80% of the previous icon's width and height**, and the man's forest-green quilted vest emblem is centered on the wearer's left breast, comfortably away from the zipper. This hero-photography scale is not a new universal embroidery specification. For actual production use the unchanged V7 `approved/horse/horse-master-green.svg` vector; verify all supplier sample measurements separately. Never insert page headings or CTAs into the image. See `merchandise/storefront/outerwear.md` for provenance and product linkage.
