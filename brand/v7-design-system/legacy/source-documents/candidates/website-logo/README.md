# Website Logo Candidate 01 — V7

**Review status:** Pending visual approval — **NOT** production-approved. Do not use as the published-site logo yet.

## Files here

- [Forest green horizontal](faith-reins-v7-website-horizontal-green.svg) — review master for cream/white backgrounds.
- [Cream horizontal](faith-reins-v7-website-horizontal-cream.svg) — inverse review master for the forest-green footer.

Source horse: ../../approved/horse/horse-master-green.svg (approved vector). These website SVGs embed path geometry; they do not rely on external image URLs or font loading.

## Design basis

The existing V6 horizontal L1 layout is preserved: horse at left, uppercase FAITH REINS in the specified Libre Caslon Text letterforms, subtitle in gold between horizontal rules.

**Current first-review subtitle:** “PEDIATRIC & EQUINE THERAPY” (matches V6 site). Prior user instruction proposed “Equestrian and Pediatric Therapy”; require explicit wording approval before release.

### Important typography qualification

The wordmark is drawn from Libre Caslon Text Regular outlines. The subtitle is *provisionally* outlined from Lato Semibold (the exact Hanken Grotesk font asset could not be loaded by the vector-export environment). It is visibly similar but **not an exact Hanken outline match**, and must be replaced or re-approved before calling this a fully compliant production master.

### Formats and device sizes

Each SVG is true vector geometry and has a transparent background. The rendering proofs and transparent PNG previews were generated for visual review in the design conversation. Add PNG/compact variants here as approved production exports when the review is complete.

## QA completed (local asset generation)

- XML parsed successfully.
- No `<image>` elements, embedded bitmaps or base64 pixel data.
- Green and cream variants share vector geometry and viewBox (2252 x 384).
- Both render visibly against approved V6 cream and forest-green backgrounds.
- Mobile compact treatment was produced as a **candidate** in the review session; omitted here pending approval and matching font QA.

## Still to do

- Owner approval of visual scale, letterspacing and subtitle wording.
- Exact Hanken Grotesk export or intentional authorization of substitute.
- Visual regression at 1440, 1024, 768, 390, 375 and 320 CSS px.
- Explicit approval before moving production assets to ../../approved/website-logo/.
- No site code updates or deployment without explicit request.
