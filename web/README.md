# web/ — Astro port (phase 1)

- `npm install && npm run dev` / `npm run build` → `web/dist/`.
- Phase 1: one catch-all route renders every page body from `site/build.mjs` inside `src/layouts/Base.astro`; CSS/JS are bundled by Vite. `scripts/prepare.mjs` copies shared CSS/JS/shell into `src/`.
- Phase 2: port pages to native `.astro` files (a real file in `src/pages/` overrides the catch-all), then retire `site/`.
- Not yet built or tested: the build sandbox could not reach the npm registry. Run it locally or in CI first.
- Deploy: `.github/workflows/deploy-web.yml` (manual, unverified draft).
