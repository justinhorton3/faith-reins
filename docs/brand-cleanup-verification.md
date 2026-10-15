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
- PDF upload is deferred by owner instruction because the original exceeded the 100 MB limit. Available HTML and Markdown guidance remains usable; there is no active broken PDF link.
- The old automatic artwork-commit workflow now validates without writing artwork. The obsolete execution-plan workflow now checks directory ownership instead of invoking an already-missing script.

## Existing environment limitations

- `npm ci` fails on the existing lockfile: missing TypeScript 5.9.3 peer entry. `npm install --package-lock=false --no-audit --no-fund` installs local dependencies for verification; package.json and package-lock.json are unchanged.
- Playwright Chromium installation failed because the download returned an invalid ZIP. Browser rendering, responsive interaction, form behavior and visual screenshots were not verified. No transaction or form submission was performed.
- Physical embroidery/print proofs and supplier availability remain outside this cleanup.

## Branch retirement

The package's `BRANCH-RETIREMENT.json` records the audited heads and proposed actions for all 17 non-main branches. Fifteen are retirement candidates after consolidation/preservation; two contain unmerged website/workflow work and remain for separate review. The six PR #12 transfer-manifest entries exactly match original sizes and SHA-256 values in the canonical package. Branch deletions and archival refs must be confirmed separately in the retirement record; this verification does not claim they have occurred.
