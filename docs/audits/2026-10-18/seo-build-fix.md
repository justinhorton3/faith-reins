# Priority FR-16 fix: source-owned static metadata

Date: 2026-10-18. Branch: Audit_10.18.26. Implemented, not released. This supersedes the earlier dashboard-migration approach for prerendered static pages; the five saved dashboard records are unchanged.

## Five correction groups

1. **Build-output ownership:** `scripts/seo_ownership.py` parses head metadata and removes original character ranges only for Wix-marked fields with one nonempty source-owned counterpart. `wix-postbuild.py` preflights every HTML page before writing any ownership changes, then runs the existing URL conversion/registry process. Valid source tags are retained.
2. **Preservation and safe failures:** scripts, custom JSON-LD, images, non-SEO embeds, verification tags and unpaired non-core fields remain untouched. Source noindex remains. Stronger injected robots restrictions, empty/multiple source fields, missing core counterparts and malformed titles stop publication instead of being silently discarded. The transformation is idempotent.
3. **Broader artifact/live gates:** `audit-live-metadata.mjs` now detects duplicate Open Graph, X/Twitter and robots fields as well as the original title/description/canonical checks. The release workflow already validates postbuilt account output; it now also checks live metadata after an eventual authorized release.
4. **Offline release-path regression:** `diagnose-seo-prerender.mjs --verify-fix` runs installed Wix middleware in an isolated Astro build with a synthetic script service, reproduces duplicate titles before upload and asserts that the ownership pass preserves exactly the source title and the unrelated injected diagnostic field. CI runs this reproduction.
5. **Real account/release artifact verification:** the audit workflow has a separate nonpublishing account-artifact job. It uses the existing configured Wix CLI identity and linked server environment, builds with `FR_ACCOUNT_RUNTIME=1`, stages the worker, executes the production postbuild, and runs account, SEO, navigation and category artifact checks. It has no release/upload/settings mutation command and never uploads the environment file.

## Local verification

- `npm run test:audit`: 38 passed, including six new SEO tests.
- Account service/artifact suites: 22 passed (60 total local tests).
- Offline installed-middleware reproduction with `--verify-fix`: passed; two titles before cleaning, one correct title afterward.
- Public site build: 94 pages; postbuild and source metadata validation passed for all registered pages, with 67 indexable routes.
- Persona navigation: six menus, 43 destinations/sections; all six shop categories passed.
- `git diff --check`: passed.

The local workspace lacks the complete linked server environment, so the full account/release build is verified in CI with the existing repository secret rather than fabricated credentials. Record its outcome below after the branch commit triggers it. No local public-build pass is presented as a credentialed release-build pass.

## Release boundary

This branch also contains earlier audit changes and deferred release prerequisites. Do not deploy the entire branch merely to publish this correction without reviewing that scope. The permanent legacy redirects and giving configuration remain separately guarded. Main has newer logo/favicon changes that are not overwritten by this branch work.

A merge/release has not been performed. FR-16 closes only after an authorized release produces one correct source-owned tag per field on the published routes, verified with fresh requests such as `?=v3`.
