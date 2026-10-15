# Men's polo showcase

The first premium shop page is `/shop/mens-polo`. It uses exact, independently committed website copies of six approved V7 originals: product and styled views for White, Cream and Forest Green. Asset hashes and the source revision are recorded in `polo-showcase-assets.json`; normal builds never read brand assets or that provenance file.

The page has color-aware photography, thumbnail switching, swipe gestures, scrollable zoom with keyboard controls, reference size selection, an inline size-guide dialog, bounded quantity controls, product details and a color collection. The White reference chart is a website-owned snapshot of the Port Authority K500 candidate audited in PR #20; it does not apply to Cream or Forest Green. Candidate measurements do not establish final fit or production approval.

The small Out of stock label and disabled Add to bag control remain unchanged by color, size or quantity. There is no checkout handler, price, shipping date or coming-soon banner on this page. Product structured data intentionally omits an Offer until a retail price exists. The existing shop card uses the approved White photo and the same unavailable label. Old saved `mens-polo` bag entries are filtered out before display or checkout. Other products retain their existing behavior.

## Branch audit before implementation

At the start of this change, remote main was `9a2fb925a01da9634e83c533d30e86c4bc84fc91`.

| Branch / PR | Comparison with main | Disposition |
| --- | --- | --- |
| `feat/website-v7-identity` / #16 | 2 commits ahead, 0 behind; 8 identity-related files | Remains separate for visual review |
| `feat/printful-catalog-audit` / #20 | 1 commit ahead, 0 behind; audit and reference package changes | Remains separate for review; White chart evidence reused as an explicit website snapshot |
| `archive/pre-cleanup-2026-10-15` | 93 ahead, 3 behind; preserved history | Keep archived; do not merge wholesale |

Implementation starts from main on `feat/polo-showcase`. No archived runtime changes, identity updates or catalog-wide supplier substitutions are included.

## Verification

Run the existing ownership/independence checks and the focused browser suite:

```sh
npm ci
npm run build
python3 scripts/validate-brand-boundaries.py
python3 scripts/check-website-independence.py
npx playwright test tests/polo-showcase.spec.js --reporter=line
```

The focused GitHub workflow installs Chromium on its disposable runner, exercises purchase blocking across all three colors and six sizes, checks stale bag entries, image switching/zoom, unit conversion, collection navigation and 1440px/390px layouts. Screenshots are retained as a workflow artifact. No browser executable is committed.

Main's Wix deploy workflow is manual (`workflow_dispatch`), targets the live site and is not an automatic preview publisher. Merging a PR alone does not establish a hosted preview deployment.
