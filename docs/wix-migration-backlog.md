# Archived Wix migration: implementation queue

This is a code audit and task breakdown, not a claim that the archived integration works in the hosted environment. Recover selected changes into new branches based on current main; preserve the independent website asset copies and the existing clinical request flow. Keep website identity PR #16 separate from runtime migration.

## Immutable sources

- [Runtime migration snapshot](https://github.com/justinhorton3/faith-reins/tree/b28004e117e4f77bb01a36a4e1e8c2d94c1d717f): 15 commits absent from main at retirement, including forms, giving, accounts and the Astro/Wix hosting change.
- [Deployment snapshot](https://github.com/justinhorton3/faith-reins/tree/b3cbe7af342bb2d6d871706d315019e277708808): three deployment/workflow commits.
- Recovery anchor: archive/pre-cleanup-2026-10-15 at 3f4180094c48d021eda8ce24b106438caf5c68e2. Both snapshots are verified ancestors. Do not merge the archive branch into main.

API signatures and hosting requirements must be checked against current official Wix documentation during implementation. Comments saying an endpoint was validated are historical notes, not executable test evidence.

## Work order and completion criteria

| Task | Scope and source files in the runtime snapshot | Depends on | Required evidence |
| --- | --- | --- | --- |
| WIX-01 — Hosting and build spike | package.json, astro.config.mjs, wix.config.json, src/pages/[...slug].astro | None | Reproducible npm ci; documented SDK/adapter compatibility; local and hosted route checks; missing asset/API requests identified. Resolve the preview 404 mentioned in astro.config.mjs before adopting server output. No application migration in this spike. |
| WIX-02 — Request and identity boundaries | astro.config.mjs; src/wix/members/auth.ts, member-store.ts, members.ts; all src/pages/api routes | WIX-01 | Explain and remove the blanket checkOrigin:false setting unless a narrowly scoped, tested alternative is necessary. Tests distinguish missing, expired and authenticated sessions and reject requests from disallowed origins on state-changing routes. Elevated calls accept only server-controlled resource identifiers or validated selections. |
| WIX-03 — Contact, appointment and sponsor forms | src/pages/api/submit-form.ts; src/lib/lib.mjs; src/hooks/forms/useWixForm.ts | WIX-02 | Keep the server-side form/field allow-list. Validate input types, lengths and required values; reject unknown form kinds. Tests cover successful receipt, validation errors, upstream failure, retry/double submission and client error states. Hosted verification must confirm an actual stored submission rather than only a success message. Preserve request-first clinical copy; changing /book-online to redirect to /contact is a separate content decision. |
| WIX-04 — One-time giving | src/pages/api/give-campaign.ts, give-checkout.ts; src/wix/money.ts | WIX-02 | Verify current SDK contracts and campaign configuration. Test amount/currency/precision bounds, malformed email and body types, optional fee behavior, unavailable campaign and upstream failures. Prevent duplicate checkout starts; only show success after the expected checkout redirect/result. Keep one-time giving distinct from recurring plans and merchandise. |
| WIX-05 — Member account and invoice isolation | src/pages/api/account-invoices.ts; src/components/account/BillingPanel.tsx; src/components/members/* | WIX-02 | Preserve the useful session-derived contactId filter. Tests prove anonymous requests fail and member A cannot receive member B's invoices. Verify login, logout, session expiry and return paths in hosting. Confirm invoice IDs, links, dates and currency formatting against real permitted responses; do not accept contact IDs supplied by the browser. |
| WIX-06 — Monthly giving and receipt behavior | src/pages/api/give-monthly-checkout.ts, giving-plans.ts; src/components/account/GivingPanel.tsx; src/wix/pricing-plans/* | WIX-04, WIX-05 | Preserve server validation of public, buyable plans and additionally verify intended giving-plan membership. Tests cover unavailable tiers, price/frequency disclosure, checkout/login return, current membership and cancellation states. Verify receipts for first and subsequent payments using currently supported Wix behavior. The archived test comments describe a first-payment-only receipt gap; that historical claim is not independently verified here. |
| WIX-07 — CMS, blog, booking and store parity | src/lib/build.mjs; src/wix/blog/*, bookings/*, storefront/*; corresponding components/hooks | WIX-01, WIX-02 | Compare against current main's route and content inventory. Preserve working CMS fallbacks, article URLs, clinical CTAs, product statuses and mobile navigation. Demonstrate product/variant/cart consistency and booking-request behavior; supplier options remain qualified. Replacing existing CMS code and redirecting appointment routes must not happen incidentally through a wholesale merge. |
| WIX-08 — Preview/release workflow | .github/workflows/deploy-web.yml in the deployment snapshot | WIX-01; release only after relevant application tasks pass | Pin the CLI to a verified version; use npm ci without an install fallback. Keep permissions scoped per job and secrets out of fork builds/logs. Separate previews from production release. Determine the intended preview backend and data behavior before enabling automatic uploads or PR comments. Demonstrate a hosted preview, production release procedure and rollback without publishing as part of this audit. |

Each row should become a small implementation PR with its stated evidence. WIX-03, WIX-04, WIX-05 and WIX-07 can proceed independently after their common prerequisites; monthly giving follows the account and one-time-giving work. Deploy only the completed slices required for a release.

## Tests that must improve before migration

The archived tests/book-give.spec.js explicitly skips its staging-only manual checks. Its giving-options test accepts either a giving widget or an error element, so a passing result does not establish working checkout. Replace that success criterion with distinct happy-path and expected-failure tests. Add API contract tests with controlled responses before hosted verification. Mocked/local tests do not establish that hosting-injected elevated credentials work.

The same file records proposed live form submissions, payments, cancellations and receipt checks. Those actions were not performed by this audit. Use a documented test environment and explicit execution scope when performing transactional acceptance checks later.

## Current status

All eight tasks are queued; no archived application code, hosting configuration or account state was changed. The lockfile repair and brand-independent build check are already delivered in PR #18 and should be retained by every migration slice. The [branch review](branch-review-2026-10-15.md) explains why the old branches were retired rather than merged wholesale.
