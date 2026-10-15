# V7 Implementation Map — Existing Website

This is **not** authorization to deploy. It documents exactly where approved logo files should eventually replace old references.

## Existing code baseline

| Code location | Current observed use | V7 change after sign-off |
| --- | --- | --- |
| ../src/lib/lib.mjs | lockup() renders horse mark, FAITH REINS and “Pediatric & Equine Therapy” | Point horse/lockup to approved V7 geometry/asset, keeping layout and semantic text |
| ../src/lib/lib.mjs header() | full header, tablet/mobile compact header and menu drawer | verify consistent lockup and mobile sizing without changing routes/CTA |
| ../src/lib/lib.mjs footer() | inverse dark lockup inside footer | approved cream-on-green variant |
| ../src/styles/global.css | .lockup / .site-header / .drawer and 1279, 1023, 767px breakpoints | minimally tune logo dimensions and alignment only when needed |
| ../src/layouts/Base.astro | structured-data logo still points to /assets/v6/horse-mark-green.png | update logo structured-data URL only after production asset exists and is deployed |
| ../public/assets/v6/ | current raster horse marks | retain for rollback; V7 SVGs get separate paths |
| ../public/favicon.svg, ../public/favicon.png, ../public/apple-touch-icon.png | site/app icons | derive tested favicon/touch sizes from master; no blurred downscale |
| ../tests/ and ../playwright.config.ts | current browser automation | add logo pixel/geometry and responsive screenshot assertions |

Current architecture is **Astro + Wix Headless**, not a Wix Editor page rebuild. Existing site CSS already implements brand colors and responsive layouts.

## Asset usage matrix

| Surface | Asset | Notes |
| --- | --- | --- |
| Desktop / wide header | website horizontal green | match current L1 mark, type scale and rules |
| Tablet header | website horizontal/compact per actual width | test 1024, 960, 768 |
| Mobile header | approved compact/full as legible | test 390, 375, 320; avoid illegible subline |
| Mobile menu drawer | approved compact lockup | do not break menu open/close behavior |
| Dark green footer | website horizontal inverse | no light-on-light or low-contrast use |
| Browser favicon / mobile bookmark | isolated horse mark | validate at 16, 32 and 180px exports |
| Documents / PDFs | document logo | separate from website navigation logo |
| Donation certificates / formal collateral | seal | do not place full seal in site header |
| Merchandise | approved horse and seal | require vendor-specific minimum detail QA |

## Integration steps (later PR only)

1. Put approved assets in stable public web paths and retain V6 versions.
2. Swap shared lockup references in lib.mjs once rather than editing individual pages.
3. Update structured data, favicon and apple-touch assets only once approved.
4. Check text metrics and intrinsic SVG viewBox against current header/footer CSS.
5. Run Astro build and Playwright smoke/book-give/shop tests; add responsive screenshot checks.
6. Preview PR and compare across page types; publish only upon explicit request.

## Scope boundary

Any issue found in legacy content (e.g. placeholder profile or postal-address field) should be recorded as a **separate website QA issue**, not silently fixed during V7 logo rollout. Preserve photography and other visual systems.
