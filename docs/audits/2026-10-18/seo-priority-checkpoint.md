# Priority SEO ownership migration — first five pages

Date: 2026-10-18. Branch: Audit_10.18.26. Status: PARTIAL; duplicate tags remain live.

Follow-up: see [seo-build-root-cause.md](seo-build-root-cause.md). A successful offline Astro reproduction establishes build-time injection, and exact `?=v3` testing still returns duplicates with age 0. Do not escalate the earlier resolver/live mismatch as a Wix defect: the static build and URL-conversion order explain it. No report or support case has been sent.

## Confirmed access and changes

The Wix dashboard's SEO Settings > Main pages lists 94 headless routes, although List Item SEO Tags (STATIC_PAGE) returns only five older built-in pages. Do not use those older IDs to update custom routes.

Through the dashboard, saved the existing source title, description, og:title and og:description for these five routes. Existing indexability was left unchanged; no images, canonical overrides, site patterns, payment settings or application settings were changed.

| Route | Saved title |
| --- | --- |
| /occupational-therapy.html | Occupational Therapy · Faith Reins |
| /contact.html | Contact · Faith Reins |
| /for-referring-providers.html | For Referring Providers · Faith Reins |
| /faq.html | FAQ · Faith Reins |
| /sponsorships.html | Sponsorships · Faith Reins |

The actual title separator is a vertical bar, as in source; the table uses a middle dot only for readability.

Read-only Resolve Static Page SEO Tags requests using each exact pageUrl and omitting pageName/seoData returned all five correct titles, descriptions, canonical URLs and social titles. This validates saved Wix configuration, not the published HTML.

## Remaining delivery mismatch

Published occupational-therapy HTML still contains the old injected title "Occupational-therapy | Faith Reins", while the resolver returns "Occupational Therapy | Faith Reins". The injected description remains absent. A query-string diagnostic also returned the old injected values. Response headers on the normal URL showed a Cloudflare HIT, age 200 seconds. Cache is a possible cause, not a proven explanation for the whole discrepancy.

Keep correct source tags intact. Do not remove tags solely because the resolver is correct. No source SEO removal, merge, code release, cache purge or production workflow run occurred.

## Next gate

1. Establish why published injection does not match the exact-URL resolver: cache propagation versus hosting integration behavior.
2. If unresolved, obtain user approval before sending a focused report to Wix; include public route, expected/actual values and the resolver/live discrepancy, not credentials or private account data.
3. Once published Wix tags match, stage route-specific removal of competing fields, retaining unique social-image tags, noindex and custom JSON-LD unless each replacement is verified.
4. Test one published page and then the first five; require exactly one correct tag per managed field before expanding the migration.

Reference: https://dev.wix.com/docs/go-headless/wix-managed-headless/full-integration-astro/feature-guides/seo/manage-seo-for-main-pages
Resolver: https://dev.wix.com/docs/api-reference/site/viewer/seo-tags/resolve-static-page-seo-tags
