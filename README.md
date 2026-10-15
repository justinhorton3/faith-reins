# Faith Reins website and brand reference

The Astro website is in src/ with its own committed asset copies in public/. Wix supplies connected CMS, forms, giving and commerce services. The canonical, portable V7 reference is [brand/v7-design-system](brand/v7-design-system/README.md).

## Ownership

- Design system: approved originals, fonts, icons, imagery, tokens, examples, templates and catalog records live together under brand/v7-design-system/.
- Website: public/ assets and src/ styles are independent snapshots. Do not import, symlink or copy from brand/ during a normal build. Updating V7 or introducing V8 must not change the website implicitly.
- V6: brand/FaithReins_DesignSystem_v6/ is a historical archive; V7 does not depend on it.
- PDF: all 18 original pages are included as six lossless volumes under `brand/v7-design-system/guidelines/`.

## Website development

Run npm install, npm run dev, npm run build and npm test as appropriate. The existing lockfile lacks a TypeScript peer entry for npm ci on the audit environment; this cleanup leaves dependencies unchanged. See [cleanup verification](docs/brand-cleanup-verification.md) for the exact validation results.

## Brand validation and handoff

Run python3 brand/v7-design-system/scripts/validate.py --check. Open brand/v7-design-system/index.html for the offline guide. Read [MIGRATION.md](brand/v7-design-system/MIGRATION.md) before staging assets for another project or a separate website update. [docs/brand-asset-map.json](docs/brand-asset-map.json) records asset provenance; the website does not read it.

## Editing content in Wix CMS

These blocks read from Wix CMS collections (Wix dashboard → CMS), so edits there go live without a redeploy:

| Collection | Page | Notes |
|---|---|---|
| Team | Our Team | Blank photo keeps the current placeholder. The "Now hiring" card stays in code. |
| Horses | Our Horses | Blank photo keeps the current horse photo for that name. |
| Testimonials | Home | |
| FAQ | FAQ | `Group` sets the heading; groups appear in the order of their first question. |
| Sponsors | Our Partners | Empty collection shows the placeholder tiers. |

`Sort order` controls order (lowest first). The built HTML carries the copy in `src/lib/content.mjs` as a fallback, and `src/scripts/cms.js` swaps in the CMS items in the browser. The FAQ's search-engine data (JSON-LD) still comes from `content.mjs`, so update both when an FAQ answer changes materially.
