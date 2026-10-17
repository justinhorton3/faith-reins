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
- [ ] Implement six shared mega menus and mobile navigation.
- [ ] Add Get Involved and Volunteer pages and consolidate audience journeys.
- [ ] Add account entry and document verified capabilities.
- [ ] Update footer and FAQ anchors; preserve all existing page/product routes.
- [ ] Build, route/anchor audit, focused behavior checks and existing regression checks pass.
- [ ] Branch preview succeeds and is checked.
- [ ] Merge PR to main.
- [ ] Release merged source and verify live site.

## Progress

October 17: Main inspected; no AGENTS.md files found. Existing Astro static build and Wix postbuild aliases are retained. Wix Members Area, Stores V3, Donations and Forms are installed; this alone does not establish that a member portal is implemented. The existing preview workflow is product-specific and will be adapted to verify the sitemap release without changing its production isolation.
