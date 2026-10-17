# Persona sitemap and shared navigation

Approved by Justin Horton on October 17, 2026. Implement on `feat/persona-sitemap-navigation`, branched from main at `95f7b1161cf5c63400423c4267f0385850d137b4`.

## Outcome

Give families, referring providers, donors, volunteers, and returning shoppers clear journeys, using one primary home for each subject. Deliver the approved full-width mega-menu treatment with a solid, constant header. Keep V7 logos, existing approved photography, product artwork, and hosting-compatible URLs.

Primary order: **About | Therapies | For Families | For Providers | Get Involved | Shop**. Our Horses moves under About, with contextual links from EAL and sponsorships. Donate remains a direct action. The utility bar contains phone, Contact, My Account, and Bag.

Source of truth: `brand/v7-design-system/architecture/sitemap.md`, based on the approved three-page Faith Reins Proposed Sitemap PDF.

## Commit sequence

1. `docs: record approved persona sitemap and execution plan`
   - Record page ownership, route inventory, scope, and release checks.
2. `feat: add shared persona navigation and accessible mega menus`
   - Central registry for desktop/mobile/footer; six full-width menu panels, supported by current photography.
   - Solid header; responsive layout; one open panel; Escape/outside click; focus return; mobile accordion; Donate direct action.
3. `feat: clarify family and provider journeys and add involvement pages`
   - Keep one therapy page per service; add useful page-section anchors.
   - Family preparation, callback, payment, FAQs; provider assessment, referral and coordination.
   - New Get Involved overview and dedicated Volunteer With Us page; existing Join Our Team becomes the careers destination while preserving existing volunteer anchors.
   - Donor paths to mission, team, impact, giving and sponsorships; no invented qualifications, outcomes, credentials or financial figures.
4. `feat: add account entry and complete sitemap navigation`
   - My Account is a persistent, real destination, including mobile access.
   - Inspect documented Wix account/login capabilities. Link only verified supported destinations; clearly explain unavailable self-service and provide a working assistance path. No fabricated dashboards, order history, donation receipts or working-login claims.
   - Shared footer sitemap, in-page FAQ groups, old routes retained; preserve unique existing page heroes.
5. `test: validate persona navigation and hosted routes`
   - Build, hosting postbuild, existing shop route/brand checks, focused navigation and persona-path tests.
   - Check all menu targets and fragments, new page SEO, desktop/tablet/mobile geometry, keyboard behavior and account fallback.
   - Preview branch via existing Wix preview workflow; inspect deployed HTML/assets and representative screens.
6. `docs: record preview verification and release readiness`
   - Update this checklist with commit/preview evidence and any account capability limitations.
   - Merge the verified PR to main, release that merged source, verify live routes/header/shop heroes, record release result.

## Scope boundaries

- This is navigation, content organization and account entry work. Account history, recurring-gift administration, volunteer scheduling and clinical portals are not assumed implemented by a sitemap.
- Keep guest purchase/giving behavior and existing checkout availability; do not activate products or change prices.
- Reuse existing forms without expanding collection of clinical information. Public callback/inquiry copy asks visitors not to submit medical details.
- Keep current URL aliases and `.html` hosting output; no unrelated routing migration or asset cleanup.
- Keep unsupported account capabilities explicit in the plan and user-facing help, never represented by fake data or nonfunctional controls.
- Follow the existing preview/release pipeline; do not deploy branch code directly to production.

## Verification and release checklist

- [x] Create isolated branch from current main.
- [x] Commit approved sitemap and this plan before implementation.
- [x] Implement six shared mega menus and mobile navigation.
- [x] Add Get Involved and Volunteer pages and consolidate audience journeys.
- [x] Add account entry and document verified capabilities.
- [x] Update footer and FAQ anchors; preserve all existing page/product routes.
- [x] Build, route/anchor audit, focused behavior checks and existing regression checks pass.
- [x] Branch preview succeeds and is checked.
- [x] Merge PR to main.
- [x] Release merged source and verify live site.

## Progress

October 17: Main inspected; no AGENTS.md files found. Existing Astro static build and Wix postbuild aliases are retained. Wix Members Area, Stores V3, Donations and Forms are installed; this alone does not establish that a member portal is implemented. The existing preview workflow is product-specific and will be adapted to verify the sitemap release without changing its production isolation.

October 17 implementation: Six desktop mega menus and six mobile accordion groups now share the navigation registry. Get Involved, Volunteer, Account and Site Map destinations are present; old routes and volunteer links remain usable. Family and provider content have distinct purposes. The existing V7 artwork and Shop/Hats hero assignments are unchanged.

Account capability: Wix-managed OAuth login, PKCE callback verification, current-member lookup and logout are connected. The published domain and localhost account callback URIs are allowed; the original checkout redirect domains are preserved. A live visitor-token and login-redirect check returned HTTP 200. Order history and recurring-gift administration remain team-assisted, with working contact paths rather than simulated dashboards. Login is separate from clinical records.

Verification so far: 14 focused browser checks passed (six navigation/account tests plus eight existing hero/responsive checks). All six desktop menu screens and the mobile drawer were visually reviewed; no runtime errors were observed. Hosted-route checks validated 43 navigation destinations/sections, and existing category route and brand-boundary checks passed. The preview workflow now verifies the new destinations; the existing production workflow can release this sitemap only from main when its dated release marker is merged.

Preview verification (October 17): [PR #35](https://github.com/justinhorton3/faith-reins/pull/35) produced a working [Wix branch preview](https://uenvom-headless-euakgvyvzax-donnaehorton-140c.wix-site-host.com/) from `c92fda1c0b0378382f42f5148523bb6eaf439969`. The hosted solid header, full-screen Get Involved panel and volunteer journey were inspected; all menu photographs loaded. Fourteen navigation/hero browser checks and four catalog variant regression checks passed locally. Six GitHub workflows passed, including navigation, catalog, shop routes, shop heroes, repository independence and preview. The standalone V7 validator identified the new sitemap document missing from its checksum inventory; its SHA-256 is now included without changing approved assets. Final branch checks must all pass before merge.

Release procedure: merge this PR with its individual commits preserved. The dated sitemap marker triggers the existing main-only Wix static-site release workflow. Verify the merge SHA, successful deployment, live navigation, all shared menu targets and the new involvement/account/sitemap routes. Rollback, if needed, uses the prior main source `95f7b1161cf5c63400423c4267f0385850d137b4` through the same release pipeline.

Release attempt: PR #35 merged as `b38edb467f3447877e95751577cbb28955c5b27f`, whose tree exactly matches the verified preview. All seven final branch workflows passed. The older multipart upload in Deploy web returned HTTP 400. Follow-up branch `fix/sitemap-release-cli`, based on that merge, replaces the upload with documented `wix release`, the same method as the last successful production release, and adds post-publication route/asset checks.

Release complete: [PR #36](https://github.com/justinhorton3/faith-reins/pull/36) merged as `e13cd8973d36bc53d804cc08b035d2805aad0a27`. [Deploy web run 39052696863](https://github.com/justinhorton3/faith-reins/actions/runs/39052696863) succeeded on October 17, 2026. Its post-publication check verified all six menus, 43 navigation destinations/sections, the account entry/noindex policy, and byte-identical approved Shop/Hats images. The live solid sticky header, family mega menu and sitemap were also inspected in the browser. The completed release record is in [PR #35](https://github.com/justinhorton3/faith-reins/pull/35#issuecomment-6237358255).

Remaining account follow-ups, outside this navigation release: verify login/callback/logout with a real test member (current member tests use controlled fixtures), and separately implement self-service order history, receipts and recurring-gift management. These remain team-assisted on the released site.
