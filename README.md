# Faith Reins Website

Public website for Faith Reins, a 501(c)(3) pediatric and equine therapy practice in South
Arkansas. Serves three audiences: parents/families, referring providers, and donors/sponsors.

Live at **faithreins.com**.

## Stack

- **Astro** — Wix's recommended "full integration" framework for Wix-managed headless: automatic
  visitor/member auth, extensions, and SEO are handled by the integration, not hand-rolled.
- **Wix Headless** — the business backend (Stores, Bookings, Forms, Blog, Invoices) is a Wix site;
  this repo is the frontend, deployed into it via the Wix CLI (`npx wix release`).
- **Playwright** — end-to-end test suite (`npm run test`).

## Design system

Brand tokens, voice/content rules, and the V6 component inventory live in the Claude Code skill at
[`.claude/skills/faith-reins-design/`](.claude/skills/faith-reins-design/). Read its `README.md`
first — it's the source of truth for colors, type, spacing, logo usage, and component list. Source
imagery for the current (V6) brand refresh lives in [`images/`](images/); the prior (V5) asset pack
is kept at [`images_v5/`](images_v5/) for reference.

`src/styles/global.css` carries the V6 tokens (colors, type, spacing, `--radius: 0` for V6's square
corners) plus the site's shared component CSS. Update it, and the components under `src/`, to match
the skill's component inventory as pages get rebuilt.

## Sites and environments

| Environment | Branch/trigger | Wix site | Domain |
|---|---|---|---|
| Production | GitHub Release published | Faith Reins (`2d8c6050-...`) | faithreins.com |
| Staging | push to `main` | staging headless site | stage.faithreins.com |

Deploys are build-once/promote: a push to `main` builds the Astro project, tags the artifact with
the git version, deploys it to staging, and attaches it to a draft GitHub Release. Publishing that
release deploys the exact same artifact to production — never a rebuild.

**Status: designed, not yet built.** `.github/workflows/deploy-web.yml` still does a single manual
(`workflow_dispatch`) build-and-release with no staging/production split. It needs replacing with
`deploy-staging.yml` and `deploy-production.yml` per the flow above.

`wix.config.json`'s `siteId` is swapped per environment at deploy time, since the Wix CLI's
`release` command has no site-targeting flag for headless projects — the site is whatever
`wix.config.json` says.

## Local development

```bash
npm install
npm run dev       # astro dev
npm run build     # astro build -> dist/
npm run preview   # astro preview
npm run test      # playwright
```

## Repo layout

- `src/` — Astro pages, layouts, components, styles
- `public/` — static assets served as-is by Astro (optimized/production images)
- `images/` — V6 source asset pack (masters/heroes/merch/logo), not served directly
- `images_v5/` — prior asset pack, kept for reference
- `docs/` — operating plan and non-technical documents
- `scripts/wix-postbuild.py` — post-build hook for the Wix CLI release step
- `.claude/skills/faith-reins-design/` — the V6 brand/design system skill
