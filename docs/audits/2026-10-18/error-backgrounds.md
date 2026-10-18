# Responsive error-page backgrounds

Prepared on `Audit_10.18.26` on October 18, 2026. These are new artwork assets for review; they are not yet wired into page templates or published. FR-21 remains open until hosting serves the branded error page with the correct HTTP status.

## Art direction

- **400/404 family:** an inviting pasture gate and grassy lane suggest a way home.
- **500 family:** a chestnut horse resting under an oak suggests a quiet pause.
- Both sets use forest greens, warm evening light, and natural farm scenery to complement the current Faith Reins palette. These are AI-generated scenes, not documentary photographs of the actual property or horses.
- Desktop compositions reserve the left side for the message. Tablet and mobile compositions move the scene lower and reserve the upper area for the message. Each format was composed separately; none is a narrow center crop of the desktop artwork.
- No text, numbers, logos, or controls are embedded in the images. Those remain accessible HTML.

## Website assets

All paths below are relative to `public/assets/error-pages/`. The WebP exports preserve each generated composition and its original dimensions.

| Family | Format | File | Dimensions | Bytes |
| --- | --- | --- | --- | ---: |
| 400/404 | Desktop | `4xx-desktop.webp` | 1672 × 941 | 311,888 |
| 400/404 | Tablet | `4xx-tablet.webp` | 1122 × 1402 | 365,130 |
| 400/404 | Mobile | `4xx-mobile.webp` | 941 × 1672 | 288,088 |
| 500 | Desktop | `5xx-desktop.webp` | 1672 × 941 | 223,738 |
| 500 | Tablet | `5xx-tablet.webp` | 1122 × 1402 | 248,290 |
| 500 | Mobile | `5xx-mobile.webp` | 940 × 1672 | 191,284 |

## Integration handoff

Use a decorative `<picture>` behind real page content. Let the browser select one source, rather than downloading three images and hiding two. Suggested media ranges match the site's existing 767px and 1023px breakpoints:

```html
<picture aria-hidden="true">
  <source media="(max-width: 767px)" srcset="/assets/error-pages/4xx-mobile.webp" />
  <source media="(max-width: 1023px)" srcset="/assets/error-pages/4xx-tablet.webp" />
  <img src="/assets/error-pages/4xx-desktop.webp" alt="" width="1672" height="941" />
</picture>
```

Use the corresponding `5xx-` sources for a server error. A tablet in landscape may appropriately select the desktop composition based on viewport width.

Use a forest-green fallback background and a dark gradient behind cream text. Keep desktop content on the left and portrait content in the upper half, above the horse and gate. Check the finished layout at narrow phone widths, tablet orientations, desktop widths, and 200% text zoom; verify text contrast and keyboard focus after integration. These page-level checks have not been completed by creating the artwork.

Keep the error code and recovery action accurate: 400 is a bad request, 404 is a missing page, and 500 is a server error. Reusing the 4xx artwork does not make those statuses interchangeable. Creating these assets also does not configure Wix's platform-level error handling.

## Verification

The six generated compositions were visually reviewed for subject placement and continuity. All six WebP exports were decoded and checked for their expected dimensions, opaque backgrounds, and file sizes below 370,000 bytes. No existing assets or page templates were replaced.
