# Batch 05 — Error recovery and current, verifiable content

Changes are on `Audit_10.18.26`. This is a progress record, not a certification that production has changed.

| Finding | Branch work | Remaining work |
| --- | --- | --- |
| FR-21: generic errors | Shared 400/404/500 template uses the owner's selected horse-under-oak image in desktop, tablet and mobile formats. Local runtime tests preserve genuine 404/500 statuses; both CI build jobs passed for commit `dec5601`. | Hosted visual checks and production routing verification. See [error backgrounds](error-backgrounds.md). |
| FR-22: stale news and ordering | Standardized News & Updates in About menus and footer, with a direct homepage link. Added a factual pre-opening update dated October 18. Source and Wix posts sort together newest-first. Retired unverified summer/hiring stories from the feed, preserved their URLs as helpful noindex pages, and protected them against client hydration. | Release and live/device retest. Actual job openings and program schedules still require owner confirmation before publication. |
| FR-23: claims | News no longer publishes the unverified participation counts, child-progress anecdote, attributed founder quotation/letter, clinical-evidence claim or specific second-SLP vacancy. The mission story uses organizational copy with a visible update date. | Home testimonials, team biographies/credentials and other claims still need substantiation, consent/approval where appropriate, and an accountable owner. This finding remains open. |
| FR-24: location | Not changed. | Confirm the facility/mailing address, ZIP and actual entrance before changing the shared record and map/schema. |
| FR-25: policies | Not changed beyond earlier batch work. | Accountable operational/clinical review and reconciliation with actual practices. |

## Finding the news

- Desktop: **About → News & Updates**.
- Tablet/mobile: **Menu → About → News & Updates**.
- Footer: **About → News & Updates**.
- Homepage: **Stay connected → Read News & Updates**.
- Hosted URL after release: `/news.html`.

## Publishing and content ownership

Source-owned updates live in `src/lib/news.mjs`. The new opening update states that Faith Reins is preparing to open and does not promise an opening date, appointment availability or insurance acceptance. Callback and email-update links retain their existing contact/request workflows.

Published Wix Blog posts continue to merge into the feed using the existing integration and shared query-string article page. Source-owned slugs resolve to their canonical static articles instead of being overwritten by older Wix versions. The two retired slugs are withheld from both feed hydration and query-string access. Their original source copy remains recoverable in Git history; no Wix dashboard post was edited or deleted.

The mission article retains its original October 1 date and shows its October 18 revision. It no longer purports to be a first-person letter from Donna. Dates use explicit ISO values and a fixed display timezone to avoid shifting date-only posts to the previous day.

## Verification

- All 44 audit regression tests pass, including six new tests for discovery, dates/order, legacy suppression and actual browser-script hydration/redirect behavior.
- Public build: 97 output pages. Hosting preparation, SEO, shared errors, navigation and all six shop-category checks pass. The indexable registry and XML agree on 66 pages; the two retired news URLs remain available with noindex.
- `scripts/verify-news.mjs` executes the actual hosting-transformed browser bundle in a DOM fixture with mocked Wix responses. It verifies merged date order, `.html` article URLs, deduplication and suppression of held stories. Both audit CI jobs run it after hosting preparation.
- This also fixes a production-only deduplication bug: constructing a news path with a quoted `/news/` prefix allowed hosting conversion to turn it into `/news.html` before appending the slug. Matching normalized slugs avoids that rewrite.
- No production release, live CMS mutation, form submission or transaction was performed. Hosted/device visual review remains open.
