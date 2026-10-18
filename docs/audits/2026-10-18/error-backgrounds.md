# Shared responsive error-page background

Updated on `Audit_10.18.26` on October 18, 2026 after the owner selected the horse-under-oak scene for every error. The shared template is wired into the 400, 404, and 500 pages on this branch. It has not been released. FR-21 remains open until Wix hosting serves the branded recovery page for a real unknown URL with the correct HTTP status.

## Art direction

- **One scene for every error:** a chestnut horse resting under an oak. Error codes and messages distinguish bad requests, missing pages, and server failures.
- The forest greens and warm evening light complement the current Faith Reins palette. This is an AI-generated scene, not documentary photography of the actual property or horses.
- Desktop compositions reserve the left side for the message. Tablet and mobile compositions move the scene lower and reserve the upper area for the message. Each format was composed separately; none is a narrow center crop of the desktop artwork.
- No text, numbers, logos, or controls are embedded in the images. Those remain accessible HTML.

## Website assets

All paths below are relative to `public/assets/error-pages/`. The selected exports were renamed without altering their image bytes. The unused gate-scene exports were removed from website assets; the earlier commit preserves their history.

| Format | File | Dimensions | Bytes |
| --- | --- | --- | ---: |
| Desktop | `background-desktop.webp` | 1672 × 941 | 223,738 |
| Tablet | `background-tablet.webp` | 1122 × 1402 | 248,290 |
| Mobile | `background-mobile.webp` | 940 × 1672 | 191,284 |

## Integration

`src/components/ErrorPage.astro` owns the artwork, layout, accessible HTML text, error messages, and recovery links. All three page entry points use it. A decorative `<picture>` selects one source at the site's existing breakpoints:

```html
<picture aria-hidden="true">
  <source media="(max-width: 767px)" srcset="/assets/error-pages/background-mobile.webp" />
  <source media="(max-width: 1023px)" srcset="/assets/error-pages/background-tablet.webp" />
  <img src="/assets/error-pages/background-desktop.webp" alt="" width="1672" height="941" />
</picture>
```

A tablet in landscape may select the desktop composition based on viewport width. Desktop copy sits on the left; portrait copy sits above the horse. The layout includes a forest-green fallback, a dark gradient behind cream text, and visible keyboard focus. Portrait artwork is anchored to the lower right so a taller text layout retains the subject.

All error documents have `noindex` and are excluded from the sitemap and Wix page registry. Recovery links use the existing shared button/link styles and lead to Home and Contact.

The pages are prerendered so a fallback does not depend on Wix service calls during a runtime failure. Astro's installed runtime explicitly supports fetching a prerendered 404/500 document and retaining the original error status. A direct visit to a static error document can return HTTP 200; that does not establish that hosting uses it for the original failure. The 400 document is available for bad-request recovery, without intercepting API responses or authentication flows.

## Verification

- Static build and 38 audit regression tests passed.
- `scripts/verify-error-pages.mjs` checks rendered 400/404/500 documents for the same three responsive sources, distinct headings, decorative image semantics, recovery links, noindex, sitemap exclusion, and an image budget below 250,000 bytes each. Both audit CI build jobs run it after hosting preparation.
- A temporary Node-adapter build with a deliberately throwing route returned the shared page with HTTP 500 and hid the private exception message. An unknown URL returned the shared page with HTTP 404. Direct 400/500 documents rendered the correct view with HTTP 200, as expected for static assets. The temporary test route is outside the repository and is not deployed.
- Browser/device visual checks remain open: the browser could not reach the workspace preview server. Narrow phones, both tablet orientations, desktop widths, 200% text zoom, contrast, and focus still need review on the hosted preview.
- Production routing and recovery behavior must be retested after a release. No hosting setting or production release was changed here.
