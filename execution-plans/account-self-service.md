# Account self-service execution plan

Authorized October 17, 2026. Branch: `feat/account-self-service`, created from main at `3e5e7482ebdc3432efef7b1ef59d6ee2abde8430`.

## Outcome

Extend My Account into a useful, secure area for shoppers and donors using the existing Faith Reins design. Provide Overview, My Orders, My Giving, Recurring Giving and Profile & Settings. Keep the published navigation, existing URLs, approved artwork, product availability and payment processing intact.

The first release prioritizes authenticated purchase/donation history, issued receipt access and profile updates. Recurring-gift actions ship only when their documented Wix integration is proven. Historical guest records are not assigned solely from a typed email address. Clinical records and volunteer scheduling remain outside this account project.

## Architecture and security

- The current Astro site publishes static files. Introduce a supported protected runtime for narrow account endpoints; confirm the Wix hosting/auth contract before changing deployment. Public pages and hosting-compatible `.html` links remain available.
- Verify the current member on each private request. Derive ownership on the server; never accept a browser-selected member/contact identity. Verify ownership again before returning any order, receipt or subscription detail.
- Use member permissions where supported. Privileged business calls require a narrowly authorized backend operation; administrative credentials and broad business responses never enter the browser.
- Return only the fields needed for the account experience. Account responses are private and not cached; no customer records are embedded in public HTML, analytics or logs.
- Use actual issued receipts. Display loading, empty, signed-out and error states distinctly; never substitute demo account data.
- Wix remains the source of truth for orders, gifts, profiles and billing. Only supported management actions are exposed.

## Commit sequence

1. `docs: plan secure account self-service delivery` — record scope, branch, sequence and acceptance criteria before code changes.
2. `feat: add protected member account services` — establish supported server runtime and authenticated data access; validate input and ownership.
3. `feat: build account overview and order giving history` — branded account layout, navigation, paginated histories and detail views.
4. `feat: connect profile receipts and recurring giving capabilities` — profile editing and issued receipts; recurring status/management only where the documented integration permits it.
5. `test: verify account isolation and self-service journeys` — two-member isolation, signed-out/expired sessions, invalid IDs, safe output, pagination, profile validation and existing navigation/shop regressions.
6. `docs: record account preview and release verification` — review hosted preview, resolve checks, merge focused commits, release from main and verify production.

## Acceptance and release checklist

- [x] Create branch from current main.
- [x] Commit execution plan before implementation.
- [ ] Confirm runtime, identity, order, receipt, profile and subscription contracts.
- [x] Implement protected services with ownership enforced on every private read/write.
- [x] Implement account pages with real data and honest states.
- [ ] Complete supported profile/receipt/recurring-gift features and document any external capability limits.
- [ ] Pass meaningful security/behavior tests and existing navigation/shop checks.
- [ ] Verify hosted preview, including direct account URLs and signed-out API rejection.
- [ ] Complete real-member validation when a suitable test session is available; record fixture-only checks separately.
- [ ] Merge reviewed changes to main, release and verify live routes and access protection.

## Progress

October 17: Branch created from current main. Existing static Astro build and browser OAuth inspected. Wix documentation confirms donations are ecommerce orders; broad order search requires a protected account data boundary. Subscription cancellation is documented for Wix Members Area, but custom headless control and payment-update contracts still require verification. No customer records or financial subscriptions have been modified.

Foundation: introduced a Wix-hosted Workers build for account APIs while preserving the ordinary static build for public regression checks. Deployment must pull and validate the existing linked app's server environment before building the account runtime. Worker output is separated from the public asset upload. The session endpoint verifies the caller's member token with Wix; downstream order access is gated by server-derived member/contact IDs, not a submitted email. Six local security checks and the existing hosted navigation/category checks pass. Actual hosted runtime compatibility is the next verification gate.

Account services: purchase/giving queries, order details, issued receipt lookup and profile updates are implemented behind server-derived ownership checks. The managed Wix SDK now reads the current member from its HttpOnly server session; profile updates run with member permissions, and only the narrow business reads elevate. Private responses vary by cookie and disable caching. Verified sign-in email is required before returning contact-linked history. Seventeen local security tests pass, covering cross-member/cursor attacks, receipt ownership, unsupported catalogs, unverified email, profile field/origin validation and safe error responses. The server-session change will be checked in the next hosted preview.

Account interface: Overview, My Orders, My Giving, Recurring Giving, Profile & Settings and Order Details are implemented in the existing V7 design. Native managed login/logout replace browser token storage. Order details support ownership-checked receipt and shipment-tracking lookups. Account pages disable analytics and indexing, clear private content on session expiry/navigation, and render data as text. Ten desktop/mobile screens were visually reviewed using controlled test records. Eighteen service tests pass; 22 distinct browser checks cover account journeys plus existing navigation/shop heroes. The static build and 43 navigation destinations still pass.

Recurring-gift capability: the first release shows recorded recurring payments. Current billing schedules, payment-method updates and cancellation remain on the existing team-assistance path because no supported headless subscription-management contract has been established. The UI labels this limit explicitly and does not invent active status or next-charge dates. Real-member validation and final deployment checks remain outstanding.
