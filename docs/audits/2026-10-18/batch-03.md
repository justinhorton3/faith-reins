# Batch 03 — EAL, stewardship, sponsors and search routes

Scope: FR-11 through FR-15 on `Audit_10.18.26`. The original audit is a baseline and remains unchanged. Branch implementations, owner content and hosting release work are distinguished below; none is certified as a live fix.

| Finding | Branch implementation | Still open |
| --- | --- | --- |
| FR-11: EAL inherits clinical payment framing | EAL has a dedicated page composition with nonclinical scope, supervised ground-based activities, program fit, safety, referral and cost questions. The next step is a callback about availability and participation. Clinical insurance CTAs and the Often paired with framing are removed from this page. | Program lead review of participation/payment details and deployed device checks. No fees, funding commitments or clinical coverage are invented. |
| FR-12: impact promise lacks evidence | The page describes intended uses of support and stewardship commitments. A dated reporting-status section states that outcomes and a financial summary are not published here, with email/contact routes for donor questions. The gift confirmation links to Stewardship & reporting. | Owner-verified results and financial reporting remain unavailable. Any later results need a reporting period, source and accountable owner before publication. This batch supplies the honest interim presentation, not an impact report. |
| FR-13: empty sponsor placeholders | Empty or unapproved feeds show a clearly labeled sponsorship invitation. No empty tiers or tier-placeholder logos render. Named records require explicit publication approval; approved names can render without a logo. The shared renderer covers build and CMS hydration. | Add/confirm the CMS Boolean `approvedForPublication`, default false. Partnerships must confirm the sponsor identity, tier and permission before setting it true; only approved logo assets should be attached. No live CMS data or schema changed in this batch. |
| FR-14: competing legacy men canonical | `/shop/mens` is removed as an HTML page. Known stale postbuild copies are removed too. Versioned release configuration prepares exact permanent hosting redirects for `/shop/mens` and `/shop/mens.html` to `/shop/men.html`. | Apply the guarded redirects as part of release, then verify direct HTTP 301 responses and the final canonical destination. No live redirect was created. |
| FR-15: unsuitable sitemap entries | Shared exact route policy drives Astro XML filtering, noindex tags and the postbuild hosting registry. It excludes account/API routes, bare post template, confirmation pages, errors and the retired alias. Canonical aliases, refresh pages and other noindex HTML are excluded from the registry. Actual account/confirmation files remain available. Men's polo is restored after the old prefix filter incorrectly excluded it. | Confirm the deployed registry and Wix-generated page sitemap after release. The installed-app pricing-plan sitemap and its broken `/pricing-plans/plans-pricing` entry remain unresolved; local XML cannot overwrite that reserved hosting endpoint. |

## Source and hosting boundary

Wix's [sitemap documentation](https://dev.wix.com/docs/go-headless/wix-managed-headless/full-integration-astro/feature-guides/seo/about-sitemaps-in-the-astro-integration) identifies the page registry as the source of `pages-sitemap.xml`, while installed business solutions generate their own sitemaps. [Reserved paths](https://dev.wix.com/docs/go-headless/wix-managed-headless/full-integration-astro/development/reserved-url-paths-for-the-astro-integration) include `/sitemap.xml` and `*-sitemap.xml`; this branch adds no competing files at those endpoints.

The project already writes its static hosting registry in `scripts/wix-postbuild.py`. That existing output now registers only indexable canonical pages, using `src/lib/indexability.json` and the emitted HTML. This changes discovery metadata, not account authorization or the account worker. The XML from Astro and the hosting registry are checked against the same expected set.

Read-only SEO inspection returned classic static-page identities that do not map to this project's headless routes. No page IDs were guessed and no SEO tags were overwritten. Hosting metadata duplication is still FR-16 for the next batch. The broken pricing-plan entry needs its owning Wix business-solution setting identified before a change is made; disabling the whole site, removing an app or altering invoice/payment configuration is outside this correction.

## Redirect configuration at release

Read-only inspection on October 18 returned no existing redirects for the Faith Reins site. The release script re-reads current state, so it does not rely on that snapshot.

With a Faith Reins site-scoped admin token in the process environment as `WIX_ADMIN_TOKEN`:

```sh
node scripts/configure-audit-redirects.mjs --check
```

After release is authorized, while the current legacy fallback still exists, verify `/shop/men.html` is the correct live destination and apply:

```sh
node scripts/configure-audit-redirects.mjs --apply
```

Then deploy the branch through the existing account-aware release pipeline. Its new read-only preflight verifies both public 301 responses and the canonical destination before uploading; it blocks publication if the redirect setup is missing. Run the same check with `node scripts/verify-audit-redirects.mjs`. Wix redirects take effect immediately and take precedence over pages, so this order avoids an interval where the retired URL has no fallback. The script checks the whole group before any write, then lists again before each create. A conflicting source, a redirect starting at the target, an overlapping group redirect or a language-specific conflict stops the operation. It never deletes, force-replaces or automatically retries a redirect. If one create succeeds and a later one fails, inspect current state before continuing.

After deployment, verify each legacy form returns one direct 301 to `/shop/men.html`, the target returns 200, and no legacy HTML or sitemap entry competes with it. Read `/sitemap.xml` and every child sitemap. Confirm only intended canonical/indexable pages are listed, and resolve the separate pricing-plan 404 before closing FR-15. Local verification does not certify these live results.

## Verification

- `npm run test:audit`: 22 tests pass, including ten new sponsor/CMS, redirect conflict, no-retry, production-preflight, route-boundary and postbuild artifact regressions. Network requests in tests are mocked; no sponsor data or redirects were written.
- `node --test tests/account-service.test.mjs`: 18 existing account tests pass.
- `npm run build`: 94 output pages, comprising 93 registered pages and the error page. The retired legacy men route is no longer generated.
- Hosting postbuild and `node scripts/verify-audit-seo.mjs`: 84 indexable pages; source XML matches the hosting registry; excluded account/confirmation files remain; stale men alias removed; men's polo included.
- Navigation and shop-category checks pass. `git diff --check` passes.
- Desktop/tablet/mobile rendering, live hosting behavior, real impact reporting and sponsor permissions remain open.

No merge, deployment, live redirect, CMS change or payer/payment configuration change is included.
