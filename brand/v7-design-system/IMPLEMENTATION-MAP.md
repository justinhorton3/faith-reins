# V7 Website Implementation Map

| Existing source | Intended integration |
|---|---|
| `src/lib/lib.mjs` lockup/header/footer | Use exact approved horizontal SVG; full subtitle on every breakpoint; accessible home link |
| `src/styles/global.css` | Reconcile V7 semantic tokens and component rules, retaining the existing page language |
| `src/layouts/Base.astro` | Update structured-data logo, favicon and touch assets only after public files exist |
| `src/lib/products.json` | Map catalog designs/variants to exact supplier options; no direct import of hypothetical charts |
| `src/lib/media.json` | Replace product image references with validated package derivatives |
| `public/assets/v6` | Keep rollback references until V7 comparison passes |
| `tests` | Retain smoke, booking/giving and shop tests; reconcile route/selectors with actual current markup and add visual baselines |

The implementation is Astro + Wix Headless. `components` in this package is a framework-independent reference, not a new runtime framework. Convert examples to the existing markup helpers or Astro components. Keep navigation structure, hero choices and request-first clinical flow stable while integrating identity.

The full horizontal lockup and subtitle must scale uniformly; compact/no-subtitle alternatives in older implementation notes are superseded. Primary CTA naming differences between earlier owner requests and V6 `Support` wording remain a content decision; the package's reference shell follows the observed live `Support` label and does not change the site.
