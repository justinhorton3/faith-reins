# V7 Website Asset Integration

This guide is a website-specific implementation handoff. It does **not** authorize new logo variants or imply that imagery has been published to Wix.

## Approved identity assets

| Placement | Approved source | Rule |
| --- | --- | --- |
| Light header | `../approved/website-logo/faith-reins-v7-website-horizontal-green.svg` | Scale uniformly; preserve full subtitle |
| Dark footer | `../approved/website-logo/faith-reins-v7-website-horizontal-cream.svg` | Scale uniformly; preserve full subtitle |
| Small brand icon | `../approved/horse/horse-master-green.svg` | Icon only; do not replace the header wordmark |
| Formal collateral, not normal navigation | `../approved/seal/` | Use the approved seal appropriate to its background |

All website logo instances retain **Pediatric & Equine Therapy**. The same horizontal lockup is scaled across desktop, tablet and mobile; the previously proposed captionless compact lockup is not approved.

## Hero-image release checklist

Hero images are **photography**, not identity SVG masters. Before importing or assigning a hero, maintain an explicit page-to-image mapping with the source filename, approval status, subject, and usage rights.

- Homepage: preserve the previously approved V2 horse-and-girl hero **after locating and verifying its exact original file**.
- Every other page: use a distinct approved hero; no hero image may be reused on another page.
- Do not promote a draft mockup, placeholder, AI-generated alternative, or an unverified old `images/` file as an approved hero.
- Confirm image cropping separately for desktop, tablet and mobile; keep faces, horse heads and essential subject matter in frame.
- Supply descriptive alt text for meaningful images. Decorative backgrounds can use empty alt text when appropriate.
- Optimize derivatives for delivery without overwriting the original approved image. Record each derivative's source and crop.

## Wix handoff

1. Verify exact master files and approved hero-image sources.
2. Upload source-preserving exports to Wix Media Manager.
3. Map assets to page/section identifiers in a separate deployment manifest.
4. Check live header/footer alignment, logo subtitle legibility and page-specific hero crops.
5. Validate mobile navigation and the Donate/Shop distinction.
6. Record the deployed Wix asset IDs/URLs and review status after verification.

**Status:** This is integration guidance only. No hero images have been selected, generated, uploaded, or deployed in this PR.
