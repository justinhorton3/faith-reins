# V7 Geometry, Responsive and Regression QA

Use this checklist for each approved asset and again when code is updated. Mark evidence in the asset register and PR.

## 1. SVG master geometry

- [ ] XML/SVG parses; viewBox matches art; no clipping or unused large empty padding.
- [ ] Paths are true vectors (no embedded raster/image href/base64).
- [ ] Smooth contours have low-noise Bézier segments; no accidental pixel-stair geometry.
- [ ] Intentional pointed mane/ear tips stay sharp, while curved cheek/jaw transitions stay smooth.
- [ ] Forehead, eye, muzzle, lower jaw, ear and mane match owner-approved reference.
- [ ] No unintended loops, artifacts, visible seams or isolated islands.
- [ ] All color variants use identical path geometry and consistent proportions.
- [ ] Correct contrast on cream, white and forest-green background.
- [ ] Compare SVG rasterized at 1x and 4x against approved artwork; inspect 400% zoom.

## 2. Size and device scenarios

| Class | CSS width | Inspection |
| --- | --- | --- |
| desktop wide | 1440 | full logo, header navigation, inverse footer |
| desktop | 1280 | lockup width and CTA spacing near nav collapse |
| narrow desktop | 1024 | menu breakpoint and lockup sizing |
| tablet | 768 | header transition, safe padding, no truncation |
| large phone | 390 | tagline legibility, mobile drawer |
| phone | 375 | mark clarity and touch targets |
| small phone | 320 | no horizontal scrolling, accessible menu |

Test at 1x and 2x deviceScaleFactor where supported; verify local font loading. Minimum practical icon checks at 16, 24, 32 and 48px. Preview document/seal at typical letterhead and social/print sizes.

## 3. Functional acceptance

- [ ] Current page routes and all established nav labels unchanged.
- [ ] Header + footer variants consistently updated across route types.
- [ ] Drawer opens/closes, has correct focus and tap target minimum 44x44 CSS px.
- [ ] Booking/referral forms, donation links and shop/cart remain functional.
- [ ] Desktop/mobile hero image crops and full-width imagery unchanged.
- [ ] Typography does not reflow headings or cause logo overflow.
- [ ] No unplanned content/SEO/metadata changes; branded structured data correct.
- [ ] Existing Playwright smoke.spec.js, book-give.spec.js and shop.spec.js pass.
- [ ] Visual diffs attached with before/after screenshots for header/footer and key pages.
- [ ] Owner approves before any production publish.

## 4. Acceptance evidence

Capture and link:
- signed-off proofboard for each family;
- exported SVG master hash and asset size;
- sample desktop/tablet/mobile screenshots;
- SVG geometry QA results;
- regression test command and outcome;
- known issues, explicit exclusions and rollback plan.

Do not claim a check passed without running it.
