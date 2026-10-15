# Faith Reins Design System V7

**This self-contained directory is the authoritative V7 source and reference.** Copy it alone to another project; it does not depend on the website or the sibling V6 archive. Open [index.html](index.html) for the offline guide and [catalog](merchandise/product-catalog/README.md) for all 42 designs and 84 original views.

The website owns separate committed asset copies. No website import, symlink, runtime URL or build step may read from this package. V7 changes and future V8 work reach the website only through a deliberate, reviewed copy into website-owned paths.

## Contents

| Folder | Purpose |
|---|---|
| `approved/` | Exact approved identity masters and original product PNGs; 82 approved references and two separately labeled companion views |
| `foundations/` | Fonts and bundled licenses, colors, tokens, layout, hero originals, paired crops, supporting imagery and icon references |
| `exports/` | Existing web, print and icon derivatives; website snapshots retain historical status |
| `components/`, `patterns/`, `templates/` | Portable CSS, examples, local interactions, page contracts and editable applications |
| `merchandise/` | One product catalog, original-image manifest, approval evidence and sourcing notes |
| `guidelines/` | [Available guidance and PDF status](guidelines/README.md) |
| `proofboards/` | Existing vector usage and comparison boards |
| `legacy/`, `candidates/` | Historical or unapproved references; never select as current artwork |
| `scripts/` | Package validation and explicit external staging; no automatic website updates |

## Status and preservation

Version: `7.0.0-local-review.1`, consolidated October 15, 2026. Existing approvals are preserved. Newly authored materials remain reviewable reference implementations; cleanup does not approve artwork, supplier specifications or live deployment.

All original approved artwork and product images retain their exact bytes. Master/export roles and product/styled pairs are intentional. The [consolidation ledger](REPOSITORY-CONSOLIDATION.json) records preserved files and hashes; archived documents retain old wording and paths as historical evidence. [Source provenance](SOURCE-PROVENANCE.json) records earlier package origins.

**PDF pending:** upload deferred by the owner because the original exceeded the 100 MB upload limit. It is not required for cleanup or standalone validation. Available HTML and Markdown guidance is included.

## Use and validation

Run `python3 scripts/validate.py --check` from this directory; only Python's standard library is required. Without `--check`, validation refreshes the report. Regenerate `FILE-CHECKSUMS.json` after intentional content updates. Historical source documents are not active instructions.

Read [MIGRATION.md](MIGRATION.md) before handoff. The exporter takes `--output /new/external/staging-directory`, refuses to write inside a repository and never updates the website. No generator is needed to browse or use the package.

Print/embroidery proofs, supplier measurements, pricing, fulfillment and website publication remain separate work. [QA-CHECKLIST.md](QA-CHECKLIST.md) distinguishes completed and pending checks.
