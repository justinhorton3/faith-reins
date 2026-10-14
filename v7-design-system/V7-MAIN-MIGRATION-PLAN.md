# Faith Reins V7 — Core Design System Migration

Source of truth: `Faith-Reins-V7-Design-System-Assets.zip` (2026-10-13 package, 262,236,732 bytes).

## Pull-request sequence

1. **V7 core** — approved horse master, horizontal website logo, document logos, seal, brand usage standards, typography, color tokens, asset register and foundation documentation. Exclude merchandise imagery.
2. **Website** — component specifications, templates, photography and hero-image mappings.
3. **Catalog** — merchandise product detail files, sizes, variants and asset mappings.
4. **Apparel images** — approved clothing product and styled imagery in manageable batches.
5. **Accessories images** — approved drinkware, journals, blankets and other product imagery.
6. **Validation** — cross-reference audits, provenance/checksums, final release verification.

## Core acceptance checklist

- [ ] Approved assets copied byte-for-byte from canonical archive.
- [ ] Approved artwork kept separate from candidates and legacy.
- [ ] Horse icon, horizontal logo with “Pediatric & Equine Therapy”, document logos, and final seal included.
- [ ] Brand guidelines and tokens documented with authoritative usage instructions.
- [ ] Asset register matches committed files.
- [ ] No merchandise product photography in this PR.
- [ ] Review file sizes and diffs before merge.

## Source structure

Core sources include `v7-design-system/approved/{horse,website-logo,document-logo,seal}/`, `BRAND-USAGE-STANDARDS.md`, `ASSET-REGISTER.md`, `foundations/`, and `tokens/`.

**Migration rule:** Do not regenerate, recolor, modify, or replace approved images. Copy original bytes and validate SHA-256 against the archive manifest. This branch is intentionally isolated from the obsolete merchandise branch.
