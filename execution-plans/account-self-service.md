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
- [x] Confirm runtime, identity, order, receipt and profile contracts; document unsupported recurring billing controls.
- [x] Implement protected services with ownership enforced on every private read/write.
- [x] Implement account pages with real data and honest states.
- [x] Complete supported profile/receipt/recurring-history features and document external capability limits.
- [x] Pass meaningful security/behavior tests and existing navigation/shop checks.
- [x] Verify hosted preview, including direct account URLs and signed-out API rejection.
- [x] Validate real-member login with the owner; record fixture-only checks separately.
- [x] Merge reviewed changes to main, release and verify live routes and access protection.

## Progress

October 17: Branch created from current main. Existing static Astro build and browser OAuth inspected. Wix documentation confirms donations are ecommerce orders; broad order search requires a protected account data boundary. Subscription cancellation is documented for Wix Members Area, but custom headless control and payment-update contracts still require verification. No customer records or financial subscriptions have been modified.

Foundation: introduced a Wix-hosted Workers build for account APIs while preserving the ordinary static build for public regression checks. Deployment must pull and validate the existing linked app's server environment before building the account runtime. Worker output is separated from the public asset upload. The session endpoint verifies the caller's member token with Wix; downstream order access is gated by server-derived member/contact IDs, not a submitted email. Six local security checks and the existing hosted navigation/category checks pass. Actual hosted runtime compatibility is the next verification gate.

Account services: purchase/giving queries, order details, issued receipt lookup and profile updates are implemented behind server-derived ownership checks. The managed Wix SDK now reads the current member from its HttpOnly server session; profile updates run with member permissions, and only the narrow business reads elevate. Private responses vary by cookie and disable caching. Verified sign-in email is required before returning contact-linked history. Seventeen local security tests pass, covering cross-member/cursor attacks, receipt ownership, unsupported catalogs, unverified email, profile field/origin validation and safe error responses. The server-session change will be checked in the next hosted preview.

Account interface: Overview, My Orders, My Giving, Recurring Giving, Profile & Settings and Order Details are implemented in the existing V7 design. Native managed login/logout replace browser token storage. Order details support ownership-checked receipt and shipment-tracking lookups. Account pages disable analytics and indexing, clear private content on session expiry/navigation, and render data as text. Ten desktop/mobile screens were visually reviewed using controlled test records. Eighteen service tests pass; 22 distinct browser checks cover account journeys plus existing navigation/shop heroes. The static build and 43 navigation destinations still pass.

Recurring-gift capability: the first release shows recorded recurring payments. Current billing schedules, payment-method updates and cancellation remain on the existing team-assistance path because no supported headless subscription-management contract has been established. The UI labels this limit explicitly and does not invent active status or next-charge dates.


Release preparation: all seven final GitHub checks passed at `4d58db9d3e786b1758a755de2a1df968c1bb81c4`, including the hosted Workers preview and account browser/security checks. Preview: https://flpwma-headless-euakgvyvzax-donnaehorton-140c.wix-site-host.com/account.html . The production workflow now uses the same authenticated server build as preview. Both publication paths check that the Worker is separate, no environment files or linked server credential enter public output, all six account pages are noindex, and signed-out account reads reject access without caching. Twenty-two Node security/publication tests and 22 distinct browser checks passed.

Owner verification: on October 17 at 4:19 p.m. America/Chicago, Justin confirmed, "I have verified login." This clears the authentication release gate. The cloud browser did not perform that login. History, profile writes, receipt/tracking links, two-member isolation and expiry have controlled-fixture coverage; the owner's confirmation is not represented as live validation of those additional flows. The release marker now schedules the authorized production build when this branch merges to main. Production route/access verification remains the final delivery step.

## Release result

PR #38 merged to main at `09e2bd976fc7d30308021561f0bd067751c69d08`. The [production release workflow](https://github.com/justinhorton3/faith-reins/actions/runs/39070511819) succeeded on October 17, 2026; Wix reported "Site published on faithreins.com" at 4:21 p.m. America/Chicago.

Production verification passed: six noindex account pages with native sign-in, four signed-out reads rejected with HTTP 401 and private/no-store responses, private build files inaccessible, six menus and 43 navigation destinations/sections intact, and all three approved Shop/Hats hero assets unchanged. Live account: https://www.faithreins.com/account.html . No production customer records or financial subscriptions were modified during release verification.

All planned delivery steps are complete. Recurring billing management remains team-assisted as scoped above; the owner verified preview login, while the additional authenticated behaviors retain controlled-fixture coverage.
