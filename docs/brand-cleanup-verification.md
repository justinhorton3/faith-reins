# Brand cleanup verification — October 15, 2026

Baseline: `6e848fa72c775a98fd098b533e7090ecd47d5824`.

## Website preservation

- All website source files under `src/` and all 96 website-owned files under `public/` remain byte-identical to baseline.
- Website builds with the entire `brand/` directory temporarily absent: 64 generated pages, all 166 output files byte-identical to the baseline build.
- Local Astro preview serves all 63 generated content routes and 91 referenced local asset URLs successfully. CSS font URLs also resolve. The existing dynamic `/news/post/` shell has no static H1 until content loads; its generated output is unchanged.
- Website dependency files and deployment workflow are unchanged. Root brand-generation recipes were moved into the reference package and require explicit external staging; they are not website build inputs.

## Package preservation and portability

- Existing canonical visual/font/license files retain original bytes; all 10 approved master hashes and 84 product image hashes match their recorded sources.
- The 42 product descriptions and size qualifications are retained. Ownership metadata now describes canonical package links and separate website copies.
- The consolidation ledger records preserved source paths, hashes and historical status. Legacy and WIP references are not promoted to approved imagery.
- Standalone package validation checks original hashes, preserved sources, full package checksums, local HTML/Markdown/CSS targets, SVG structure and absence of symlinks. The same checks run on an isolated copy outside the repository.
- The PDF follow-up branch restores all 18 original pages as six lossless volumes. The complete edition is 84,343,199 bytes, below 100 MB. All 18 page renders and text match the source; all 43 embedded images retain their dimensions and decoded pixels. Each split page also matches the complete guide. No approved source imagery changed.
- The old automatic artwork-commit workflow now validates without writing artwork. The obsolete execution-plan workflow now checks directory ownership instead of invoking an already-missing script.

## Existing environment limitations

- `npm ci` fails on the existing lockfile: missing TypeScript 5.9.3 peer entry. `npm install --package-lock=false --no-audit --no-fund` installs local dependencies for verification; package.json and package-lock.json are unchanged.
- Playwright Chromium installation failed because the download returned an invalid ZIP. Browser rendering, responsive interaction, form behavior and visual screenshots were not verified. No transaction or form submission was performed.
- Physical embroidery/print proofs and supplier availability remain outside this cleanup.

## Branch retirement

The package's `BRANCH-RETIREMENT.json` records 14 deleted branches, verified through GitHub UI and API after cleanup PR #14 merged. Four branches remain because they contain unmerged work: `claude/session-2026-10-12`, `fix/wix-headless-deploy-config`, `feat/v7-merchandise-system` and `wip/shop-photo-logo-swap`. Their audited heads are recorded for separate review. No archival tags were created. The local symbolic `origin` alias was not a real branch.

The six PR #12 transfer-manifest entries exactly match original sizes and SHA-256 values in the canonical package; PR #12 was closed as superseded. The PDF is being delivered on its own `docs/v7-brand-guide-pdf` branch after cleanup.
