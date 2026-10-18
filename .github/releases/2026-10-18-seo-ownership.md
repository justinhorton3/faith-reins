# Focused SEO ownership release

Base: main at 3221099187bca7cfea03dfc5bc6598f4e2d54c60.
Branch: fix/seo-prerender-ownership.

Publish only the source-owned static SEO correction extracted from Audit_10.18.26.
Remove competing Wix-marked SEO fields baked into prerendered HTML, preserve
source values, existing noindex, JSON-LD and unrelated embeds, and validate
the real account/release artifact and fresh live pages (`?=v3`).

No content, layout, imagery, donation configuration, referral, redirect or
sitemap policy changes are included. Current main's logo/favicon updates remain.

Premerge: focused ownership regressions, actual Wix middleware reproduction,
public build and credentialed account/release build without publication.
Postmerge: existing Deploy web workflow builds and releases the linked site;
postrelease metadata and existing navigation/account checks must pass.
