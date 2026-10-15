# Faith Reins Design System V7

Version: **7.0.0-local-review.1** | Built October 13, 2026 | Website: https://www.faithreins.com/

## Start here

Open **[index.html](index.html)** after extracting the ZIP. It is an offline visual guide with a searchable 42-design catalog, exact SVG artwork, component examples and application templates. Read the printable **[V7 guide](guidelines/Faith-Reins-Design-System-V7.pdf)** for staff and suppliers.

This package builds the full system around the approved V7 identity and V6 website language. Previously approved masters and images retain their approval status. Newly authored documentation, tokens, component implementations and templates are **ready for review**, not a claim of new owner sign-off or live deployment.

## Folder contract

| Folder | Purpose |
|---|---|
| `approved/horse`, `approved/website-logo`, `approved/document-logo`, `approved/seal` | Exact approved SVG masters, unchanged |
| `approved/product-images` | 84 unchanged original PNGs; 82 approved references and 2 companion views |
| `foundations` | Palette, fonts, tokens, photography and layout rules |
| `components` | Framework-independent CSS, examples, and a small local interaction script |
| `patterns` | Website composition contracts |
| `templates` | Editable letterhead, presentation, social and signage SVGs; print letterhead HTML |
| `merchandise` | Existing approval records, sourcing notes and self-contained 42-design product catalog |
| `proofboards` | Existing V7 SVG comparison/usage boards |
| `candidates` | Prior drafts; excluded from current asset selection |
| `legacy` | Historical artwork and source instructions; excluded from production selection |
| `scripts` | Asset validation, checksum verification and repository export helpers |

## Delivery contents

- 10 exact approved identity SVGs, unchanged. Original supplied website-logo PNGs are retained.
- 84 original product PNGs; all recovered. 72 checked against previously recorded SHA-256 values. 12 cream/white sources identified by the approved persistent IDs and visually assigned; new checksums recorded now.
- 42 product design documents. Size labels are proposed; no supplier-verified measurements, fabric, care or price is implied.
- V6 website photography and fonts carried forward as reference assets. Old shop hero images are quarantined under `legacy/v6-reference/photography`.
- Source branch tree: `92eea891560b7b41f7339e14b5af6937efa935d2`.

## Copying into the repository

Follow [MIGRATION.md](MIGRATION.md). Copy this top-level `v7-design-system` directory into the repository. Existing candidates/legacy files remain preserved. Do not commit recovered Library staging files or the ZIP itself into the website public directory. Deployment remains a separate step.

Run `python3 v7-design-system/scripts/validate.py` to check hashes, links, catalogs and SVG structure. Run `python3 v7-design-system/scripts/export-repo-assets.py --repo /path/to/faith-reins` to explicitly create `/product-catalog/images`, `/images/products`, product detail files and `/public/assets/v7`. Existing different files are not overwritten.

See [QA-CHECKLIST.md](QA-CHECKLIST.md) for completed checks and remaining responsive, accessibility, vendor and deployment verification.
