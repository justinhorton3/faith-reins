# Batch 04 — Product information, forms, giving instructions and SEO ownership

Scope: FR-16 through FR-20 on `Audit_10.18.26`, based on batch 03 (`636aa49`). Four findings have branch fixes; FR-16 has a source-preview improvement and diagnostics, while the hosting duplication remains unresolved. The original audit remains an unchanged baseline.

| Finding | Branch changes | Remaining work |
| --- | --- | --- |
| FR-16: duplicated hosting SEO tags | Social images reuse the page's approved hero and dimensions, with explicit category/product imagery preserved. The local SEO check now verifies one matching title, description, canonical and social title on every registered page. A separate read-only live checker detects both duplicates and generic hosting replacements. | The Wix injection/source ownership migration is still open. It must preserve page-specific metadata before source tags can be removed safely. See evidence below. |
| FR-17: guide labels promise missing measurements | Guide buttons, dialog title and close-button name follow the selected variant. A variant with a measurement table uses Size & fit guide; other apparel uses Size information, hats use Fit information, and other items use Item information. Reference sizes are shown with an explicit unconfirmed-measurements note. | Verified Printful variant dimensions, materials and care data remain required before selling. The existing two reference measurement tables are unchanged. No purchasing or supplier integration is enabled. |
| FR-18: unrelated legacy recommendations | All 17 retained legacy-only product routes have explicit relevant-category alternatives and a category CTA. Hats lead to Hats; keychains/stickers lead to Home & gifts; youth garments lead to Kids. Unknown legacy slugs require an explicit mapping. These unavailable helper pages are noindex and excluded from both sitemap sources. | Confirm the deployed pages and any future exact replacement/redirect decision. Existing bookmarks remain useful; no unverified exact equivalents are claimed. |
| FR-19: field requirements and errors are not associated | Shared rendering supplies native required/ARIA semantics, stable unique help/error IDs, descriptions and invalid states across text, textarea, select, radio and checkbox controls. Errors clear as corrected; first-error focus is preserved. Checkbox groups explain the minimum selection without making every checkbox required. Callback guidance and newsletter wire targets are retained. | Actual screen-reader, keyboard and device validation after deployment. DOM tests exercise the browser script with mocked Wix requests. |
| FR-20: recurring management promises conflict | Policy, recurring account page and authenticated account copy share one assistance message. Accounts show recorded payments; donors contact staff for changes/cancellations. The existing 5-business-day notice period is retained. Giving confirmation links to the specific assistance section. | Operations should verify the deployed staff-assisted workflow. No self-service billing change/cancel function is promised or added. |

## FR-16: confirmed live conflict and safe ownership boundary

The read-only check of `/shop/mens-polo.html` during this batch returned HTTP 200 and:

| Tag | Source value | Additional Wix-injected value |
| --- | --- | --- |
| Title | Men’s Horse Polo \| Shop \| Faith Reins | Shop \| Faith Reins |
| Canonical | `https://www.faithreins.com/shop/mens-polo.html` | The same URL again |
| Social title | Men’s Horse Polo \| Shop | Shop \| Faith Reins |

There are two title tags, two canonicals and two `og:title` tags; description occurs once. The extra elements carry `wix-seo-tag="true"`. The live diagnostic correctly exits with failure for this known issue. That failure is not reported as a passed release check.

Wix's [Manage SEO for Main Pages](https://dev.wix.com/docs/go-headless/wix-managed-headless/full-integration-astro/feature-guides/seo/manage-seo-for-main-pages) guidance recommends a single dashboard owner and removing competing hard-coded tags. That transition still needs verified route-specific records preserving the current titles, descriptions, canonicals and social previews. The previous batch's classic-page discovery did not establish that mapping; this batch's read-only List SEO Patterns returned no stored patterns. The installed `@wix/astro` configuration does not expose an SEO opt-out flag. No undocumented flag, guessed page identity or live SEO write is used here, and valid source metadata is retained.

The next implementation must establish the supported per-route hosting configuration, prepare its complete metadata from current source, read/merge any existing settings, and verify the resolved output. Only then should the duplicate source tags be removed for hosting. Validate the resulting hosted HTML across all canonical routes; a local build cannot reproduce edge injection.

Run the read-only diagnostic for one known route:

```sh
node scripts/audit-live-metadata.mjs /shop/mens-polo
```

With no route arguments it checks the source's indexable pages in bounded groups of four. It performs GET requests with redirects disabled and no automatic retry. It does not change Wix settings or page content.

## Validation

- `npm run test:audit`: 32 passing tests, including ten new DOM/behavior regressions. Coverage includes selected-variant guide labels, preserved measurement tables, required/group semantics, linked errors and correction states, first-error focus, unique IDs across two forms, relevant legacy destinations and indexability, authenticated read-only recurring assistance, source hero selection and live metadata diagnostics.
- `node --test tests/account-service.test.mjs tests/account-artifacts.test.mjs`: 22 existing account and artifact-security tests pass.
- Public build: 94 output pages (93 registered pages plus the error page). Hosting postbuild, source metadata checks across all 93 registered pages, six persona menus/43 destinations and all six shop categories pass. The XML and hosting registry agree on 67 indexable pages; all 17 unavailable legacy helper pages remain served with noindex. `git diff --check` passes.
- No real forms, transactions, donor account data or Wix settings were changed. No visual/device or assistive-technology pass is claimed.

## Branch and integration notes

Workspace maintenance removed the transient checkout; work was recovered from the committed audit branch. Main was at `306cd99` when reviewed and had newer header/logo changes. This batch does not edit header/navigation styles, approved artwork, production-release workflow or mission/vision copy. The eventual integration must preserve newer main work.

No merge, publication or deployment is included. Insurance remains deferred as requested in batch 02.
