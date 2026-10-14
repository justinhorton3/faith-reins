# Local package to repository

## Safe handoff

1. Extract ZIP. Confirm the top-level folder is `v7-design-system`.
2. Copy it into a local repository branch; do not deploy as part of the copy.
3. Review `RELEASE-MANIFEST.json`, `ASSET-REGISTER.md`, and the visual guide.
4. Run `python3 v7-design-system/scripts/validate.py`.
5. To fill the previously requested root folders, explicitly run `python3 v7-design-system/scripts/export-repo-assets.py --repo /absolute/path/to/faith-reins`.
6. Review the generated `/product-catalog`, `/images/products`, and `/public/assets/v7` changes. The export script checks every collision before writing and refuses to overwrite different files. Existing root product records must be reconciled manually if they differ.
7. Integrate shared logo markup and token imports in a separate code change. Do not reconstruct the wordmark from live text. Point to the exact horizontal SVG with accessible brand name and reserved intrinsic dimensions.
8. Update footer and structured-data logo references; prepare favicon/touch exports separately for review; compare representative pages at 1440, 1280, 1024, 768, 390, 375 and 320px.
9. Reconcile catalog options, ordering state, pricing and size charts with the exact Printful blanks. Build, test and preview before publication.

## Directory mapping

| Package | Repository target |
|---|---|
| `approved/product-images/*.png` | identical originals in `product-catalog/images` and `images/products` |
| `merchandise/product-catalog/*.md` | root `product-catalog/*.md`, rewritten image/artwork links |
| `approved/*/*.svg` | `public/assets/v7/<family>/` copies |

The archive's new files can be committed by the owner. No GitHub mutation, site publication or Printful product creation occurred during package creation.
