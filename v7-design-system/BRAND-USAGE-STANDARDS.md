# Faith Reins V7 — Brand Asset Usage Standards

**Status:** Proposed usage rules for owner review; logo artwork itself is already approved.  
**Scope:** Website, documents, print, signage, merchandise, and embroidery.  
**Authority:** [Asset Register](ASSET-REGISTER.md) and the exact SVG masters in `approved/`.  
**Implementation:** Documentation only. No changes to the published website are authorized.

## 1. Source-of-truth logo families

| Family | Approved master | Preferred uses | Avoid |
| --- | --- | --- | --- |
| Horse icon | `approved/horse/horse-master-green.svg` | favicon, small brand accent, single-icon imprint | Replacing the full website lockup in prominent headers without approval |
| Website horizontal | `approved/website-logo/faith-reins-v7-website-horizontal-green.svg` | website header, email, digital communications | Dropping the approved subtitle or creating a compact alternate |
| Website reverse | `approved/website-logo/faith-reins-v7-website-horizontal-cream.svg` | dark green website footer and dark backgrounds | Using light-on-light |
| Stacked document | `approved/document-logo/faith-reins-v7-document-stacked-green.svg` | formal documents, referral/clinical correspondence, letterhead | Substituting the seal for service identification |
| Document black | `approved/document-logo/faith-reins-v7-document-stacked-black.svg` | black-only office printing | Low-contrast backgrounds |
| Rope seal, two-color transparent | `approved/seal/faith-reins-v7-seal-green.svg` | certificates, premium packaging, apparel graphics, donor collateral | Tiny reproduction where curved letters and rope become illegible |
| Rope seal, two-color ivory | `approved/seal/faith-reins-v7-seal-ivory.svg` | controlled ivory-field print / sticker applications | Placing the ivory square into a dark composition without intended framing |
| Rope seal, solid green transparent | `approved/seal/faith-reins-v7-seal-solid-green.svg` | one-color print on light fabric or paper | Dark green-on-dark fabric |
| Rope seal, solid white transparent | `approved/seal/faith-reins-v7-seal-solid-white.svg` | one-color applications on dark apparel | White-on-cream or light fabric |

**Exact naming:** The horizontal website subtitle is **Pediatric & Equine Therapy**. The seal reads **Faith Reins / Equestrian Center / EST. 2025**. Do not interchange those descriptors or modify lettering.

## 2. Brand colors and master-asset fidelity

| Role | Color | Hex | Notes |
| --- | --- | --- | --- |
| V7 brand forest green | Forest | `#173A2E` | Existing V6/V7 site token; horse and website/document marks |
| V7 deep green | Deep | `#0E2019` | Existing site token |
| V7 brand gold | Gold | `#B08D57` | Existing site token |
| V7 cream | Cream | `#F3EEE4` | Existing site token |
| Approved rope-seal green ink | Seal green | `#003321` | **Locked visual source color**: do not auto-recolor |
| Approved rope-seal gold ink | Seal gold | `#C58C29` | **Locked visual source color**: do not auto-recolor |

These two seal colors are recorded exactly as the approved traced master. They **do not redefine global CSS design tokens**. A future normalization would require owner approval and a visual comparison.

Single-color variants must have one opaque fill color and no background rectangle. The approved artwork must be directly composited into imagery; never regenerate the horse or seal with an image model.

## 3. Typography contract

- Website wordmark: **Libre Caslon** approved outlined wordmark geometry.
- Website subtitle: **Hanken Grotesk 600**, exact approved V6 text outlines.
- Document marks: preserve their existing approved vector outlines.
- Seal lettering: **approved converted vector shapes**. The approved traced seal is the source of truth; do not substitute a live font or assume its appearance is the same as the website lockup.
- All supplied production SVGs should remain self-contained and independent of locally installed fonts.

## 4. Clear-space system — proposed review values

Measure spacing using the overall visible artwork bounds, not the SVG canvas edge.

| Family | Proposed minimum surrounding clearance | Measurement |
| --- | --- | --- |
| Website horizontal | **0.25 × total logo height** on every side | From the furthest visible horse/text/rule extremity |
| Stacked document | **0.20 × total logo height** | From the furthest visible art |
| Round seal | **0.08 × seal outside diameter** | From the outermost green ring |
| Horse alone | **0.15 × horse mark height** | From the silhouette bounds |

These are **proposed layout rules**, not dimensions already signed off. When applied to a product, no seams, stitching, zipper, pocket, copy, or crop may enter the clear space. Clear-space distances may be increased freely, not reduced without a specific exception.

## 5. Minimum sizes — initial targets for testing, NOT validated production limits

| Asset | Digital first-pass target | Print first-pass target | Additional rule |
| --- | --- | --- | --- |
| Horizontal logo with subtitle | **200 CSS px wide** | **70 mm wide** | Subtitle must remain legible at actual viewing scale; use full approved logo across breakpoints |
| Stacked document logo | **160 CSS px wide** | **45 mm wide** | Check thin subtitle/rules on office printers |
| Full rope seal | **160 CSS px diameter** | **40 mm diameter** | At smaller sizes the rope and curved wording need a physical/proof review |
| Horse icon | **24 CSS px** (test 16/32/48 too) | **10 mm wide** | For favicons, derive crisp icon-specific raster sizes from the SVG |

**Do not treat these as passed QA.** Validate with pixel previews, real printer proofs, and, for apparel, actual vendor sampling. If the seal's curved words, rope or date become muddy, enlarge the mark or choose the isolated horse **only if that substitution suits the placement**; do not redraw the official seal.

## 6. Background and color rules

- Light ivory, paper, and white grounds: approved forest-green website/document marks, solid-green seal, or the two-color transparent seal.
- Dark green / dark fabric grounds: approved reverse website logo or white one-color seal.
- For apparel with intermediate, patterned, or textured fabric: proof contrast under realistic lighting before production.
- For gold/metallic effects: the standard SVG gold is a flat color, not proof of metallic foil/embroidery thread color. Confirm actual foil/thread swatches against physical samples.
- Avoid gradient overlays, bevels, glow, drop shadows, faux distressing, outlines, and altered hues on approved marks.
- Do not add a white backing rectangle behind transparent art unless the product design expressly requires it.

## 7. Rope-seal integrity

- Maintain the **two thin concentric outer green rings** and the **inner dark-green rope bordered by fine green rings** exactly as approved.
- Keep the approved horse scale, placement, text curves, and mirrored gold side arcs and date rules.
- No dots, banners, extra borders, substitutions, or independent resizing of seal subcomponents.
- The one-color variants change ink color only; all internal negative space must remain transparent.
- The approved seal is a path-traced source from a locked image, not a newly typeset parametric logo. Don't silently redraw curves under the premise of “cleanup.”
- Retain older pre-rope work only under `legacy/seal/`; not for current merchandise.

## 8. Apparel, embroidery and production methods

**Preferred order:** direct vector/transfer printing for fine-detail full seal; screen printing at sufficient size; embroidery only after sew-out approval.

### Initial vendor proof checkpoints
- Provide vector SVG or vendor-approved vector conversion; **do not send a screenshot as the master**.
- Include intended physical mark diameter/width, fabric and base color, stitch/print method and thread/ink color.
- For embroidery, test **60 mm and 80 mm seal diameters** as first-pass samples (not guaranteed minimums).
- Have vendor confirm rope stitch definition, lettering, EST. 2025, and the horse's narrow negative-space cutouts.
- Review whether the embroidered sample has closed counters/negative space, split rope links, or illegible text.
- Keep solid-green and white one-color seals as explicit vendor assets; vendor may propose an embroidery-specific simplified rendition, but **it is not approved until separately reviewed**.
- For the men's vest, first sample a modest left-chest seal or isolated horse (depending on sew-out), never assume a small complex seal will embroider crisply.
- For hats, account for curved crown, front seam, panel type, available embroidery field, and a physical patch/sew-out.
- For bottles, mugs, stationery and hard goods, request a printer's line-weight tolerance and color proof.

**Production checkpoint:** Physical samples/print proofs are mandatory before placing bulk orders. These standards are vendor briefing guidance, not a guarantee of manufacturability.

## 9. Digital responsive rules

- Preserve the **same approved horizontal lockup and its subtitle on desktop, tablet and mobile**. No unapproved compact/no-subtitle variant.
- Use width scaling uniformly; maintain original SVG aspect ratio and reserve enough header space to prevent clipping.
- Use the cream inverse in dark footer placements.
- Test at 1440, 1280, 1024, 768, 390, 375 and 320 CSS px, at 1× and 2× device scale where possible.
- Favicon/browser icon can use the isolated horse master; prepare dedicated 16/32/48 px exports rather than relying on a blurry reduced full seal.
- Keep V4 hero images and page design decisions unchanged.
- No live-site changes are authorized by these rules.

## 10. Prohibited uses

Do not stretch, skew, rotate to fit a curved object, recolor by CSS filter, swap fonts, remove the horizontal subtitle, move the seal rope/rings, rebuild the horse from AI artwork, add unrelated symbols, or use obsolete pre-rope seals as current.

## 11. Acceptance checklist to complete standards

- [ ] Owner approves the proposed clear-space factors.
- [ ] Owner approves target minimum-size guidance after legibility proofboard.
- [ ] Print proofs on white/ivory and dark substrates completed.
- [ ] Green/white one-color artwork rendered on contrasting sample grounds.
- [ ] Supplier/embroiderer confirms minimum viable mark size with sew-out.
- [ ] Final color-usage board reviewed on fabric and packaging.
- [ ] Code integration reviewed and Playwright regression checks run under a separate PR.
- [ ] Production publishing separately authorized.

## 12. Version control / status

**Artwork:** four approved seal SVGs and existing horse, website and document logos are locked.  
**Usage standards:** **PROPOSED — review pending**.  
**Merchandise production, website integration and deployment:** **NOT approved as part of this document**.
