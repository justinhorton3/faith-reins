# Faith Reins — v7 Design System

**Status:** In progress — brand refresh for the existing published website, not a redesign.
**Published site:** https://www.faithreins.com/
**Core promise:** Replace and refine shared brand artwork without changing approved page layouts, hero imagery, navigation hierarchy, copy, donation/book/shop flows, or Wix integrations.

## Starting point

- Approved direction: the newly refined **masculine, smooth-jaw horse icon** created October 2026. This supersedes the v6 raster horse. Its precise approved SVG must be imported here and verified before production use.
- Legacy visual references: ../brand/FaithReins_DesignSystem_v6/ and earlier v4 website concepts.
- Website code: ../src/lib/lib.mjs, ../src/styles/global.css, ../src/layouts/Base.astro, ../public/assets/, ../public/favicon.svg.
- Current site is an Astro / Wix Headless application; Wix remains responsible for connected business services.

## Working agreements

1. **Faith Reins** is the canonical brand spelling unless explicitly changed by the owner. Do not silently use “Faith Reigns.”
2. Preserve the v6 palette, fonts, layout rules and the approved v4/v6 logo compositions. This work is principally a vector-artwork update.
3. **Approved/** contains only the sign-off asset masters and release-ready derivatives. Draft iterations stay outside that directory or in feature branches.
4. Ship SVG assets as genuine path geometry, never a PNG wrapped in SVG. Preserve transparent-background masters.
5. Do not modify ../src or ../public until approval and responsive QA are complete. Documentation changes here are **not** site deployment.
6. Keep the existing hero photography, content, page templates, routes and CTAs unchanged.
7. Require an approval checkpoint for website lockup, document lockup, seal and color variants.

## Read in order

1. [Execution plan](EXECUTION-PLAN.md) — deliverables, phases, approval gates and definition of done.
2. [Asset register](ASSET-REGISTER.md) — expected master files, approved variants and status.
3. [Implementation map](IMPLEMENTATION-MAP.md) — where each asset will be used in the real website.
4. [Responsive and visual QA](QA-CHECKLIST.md) — reproducible preflight tests.
5. [Approved assets](approved/) — final master art only.

## Release rule

A v7 brand asset becomes production-approved only after visual sign-off and geometry QA. Deployment to FaithReins.com is a **separate change** and requires an explicit go-ahead.
