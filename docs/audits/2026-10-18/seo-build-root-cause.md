# SEO due diligence: prerender injection and route conversion

Date: 2026-10-18. Branch: Audit_10.18.26. This is a diagnosis and offline reproduction, not a production fix or release.

## Findings

The static build can bake duplicate Wix SEO tags into the HTML before hosting. It also resolves against a pre-conversion URL that does not match the dashboard's `.html` route. The earlier cache/hosting-defect hypothesis was premature.

1. `astro.config.mjs` includes `wix()` only when `FR_ACCOUNT_RUNTIME=1`. The production workflow uses `npm run build:account`, which sets that flag. The ordinary public build and audit CI use `npm run build`, which omits Wix integration. Consequently the earlier local metadata pass did not exercise the production injection path.
2. `src/pages/[...slug].astro` explicitly exports `prerender = true`, even in the account/server build.
3. Installed `@wix/astro@2.75.0` registers its `astro-html-embeds` middleware. Its onRequest calls `scripts.listSiteScripts({ pageUrl })` after rendering, then inserts HEAD entries before `</head>`. It does not deduplicate existing source tags or skip prerendered pages.
4. Astro runs that middleware while prerendering. The offline fixture, using the real installed Wix middleware but a synthetic service response, successfully builds an on-disk HTML file containing both the source title and a `wix-seo-tag="true"` title. No Wix network calls, credentials, hosting or deployment are involved in this reproduction. Telemetry is disabled.
5. The fixture records the middleware's requested URL as `https://www.faithreins.com/occupational-therapy/`. Only afterward does `scripts/wix-postbuild.py` flatten the actual site's directory pages to `.html` and rewrite internal/canonical URLs. This cannot re-resolve the already-rendered title or fetch its missing description.

## Live and API evidence

Read-only GET on `https://www.faithreins.com/occupational-therapy.html?=v3` returned HTTP 200, cache status DYNAMIC and age 0. It still had:

- Source title: `Occupational Therapy | Faith Reins`.
- Wix-marked title: `Occupational-therapy | Faith Reins`.
- Only the source description; no Wix-marked description.

The exact-URL Resolve Static Page SEO Tags API returned:

| Requested path | Resolved title | Saved description |
| --- | --- | --- |
| `/occupational-therapy` | occupational-therapy &#124; Faith Reins | Absent |
| `/occupational-therapy/` | occupational-therapy &#124; Faith Reins | Absent |
| `/occupational-therapy.html` | Occupational Therapy &#124; Faith Reins | Present and correct |

The resolver uses a different default-title capitalization from the script-injection service; do not claim those services have identical output. The important confirmed distinction is that only the final `.html` URL resolves the saved override.

GitHub's latest successful Deploy web run inspected here was run `39152711320`, commit `3221099187bca7cfea03dfc5bc6598f4e2d54c60`. Logs show `npm run build:account`, prerendering public pages, and a successful Wix publication at 2026-10-18T18:09:04Z. That deployed commit pins the same Wix Astro version. It predates this session's dashboard metadata changes.

## Reproduction and limitations

Run `ASTRO_TELEMETRY_DISABLED=1 node scripts/diagnose-seo-prerender.mjs` after dependency installation. It builds only `tests/fixtures/seo-prerender` with a mocked script service, asserts the two generated titles and pre-flattened URL, and exits successfully when the mechanism is reproduced. Fixture output is ignored by git.

The regular public build succeeds and is separately checked by the existing metadata verifier. A full local account build was attempted but cannot complete with this workspace's current environment: first WIX_CLIENT_ID was missing, and providing the existing public client ID advanced it to the missing WIX_CLIENT_INSTANCE_ID check. No fake instance ID/secret was supplied, no credentials were extracted, and no environment or production settings were changed. The isolated reproduction avoids that credential requirement without calling real services.

The actual uploaded release archive was not retrieved. The diagnosis is supported by the deployed source/version, production job logs, live fresh-response evidence, API route comparison and a successful reproduction with installed middleware. It is not a claim that a new full production build/release was performed.

## Targeted fix to implement next

For this prerendered/static architecture, retain the existing page-specific source metadata as the owner. Add a narrowly scoped build-output pass that removes Wix-marked competing SEO tags only when an explicit source-owned counterpart is present and validated. Preserve unrelated Wix embeds, analytics, verification tags, required robots directives and custom JSON-LD. Fail closed on ambiguous ownership rather than deleting source tags or disabling all Wix features.

Validate the actual account/release artifact after postbuild, not just the non-Wix public build. Cover the reproduced duplicate fixture, preservation of non-SEO embeds and noindex, final `.html` canonical URLs, and every served page. Then a controlled build/release and fresh published checks are required to close FR-16.

An alternative is request-time dashboard ownership, but that requires aligning runtime routes with final URLs and deliberately changing the static architecture. Simply deleting source tags or issuing another unchanged release does not fix the two identified problems.

No source SEO removal, hosting settings change, cache purge, production release, engineering report or support ticket occurred during this investigation.
