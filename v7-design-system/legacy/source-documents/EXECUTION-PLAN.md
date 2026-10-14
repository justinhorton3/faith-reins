# V7 Design System — Execution Plan

**Project:** Faith Reins | website brand-asset refresh
**Date:** 2026-10-12
**Baseline:** published https://www.faithreins.com/; approximate completion reported by owner: 90%.
**Goal:** unified, precise logo family built around the newly approved horse artwork. Clean, crisp, properly proportioned desktop/tablet/mobile assets without redesigning an almost-complete website.

## Non-goals / guardrails

- No redesign of page sections, copy, typography system, color palette, hero photographs, donation/referral/book/shop integrations, site map or navigation structure.
- Do not change existing clinical claims, donor flows or SEO content as part of logo implementation.
- Retain V4 hero-photo decisions; never reuse a hero image on multiple pages.
- A documented site cleanup finding is not authorization to change the site.
- Do not generate/retrace new horse shapes once the final signed-off SVG is received; treat the SVG as immutable geometry except when expressly authorized.

## References to reconcile before production

- V6 design-system source: ../brand/FaithReins_DesignSystem_v6/README.md.
- V6 brand tokens: ../brand/FaithReins_DesignSystem_v6/tokens/colors.css and ../src/styles/global.css.
- V6 lockup reference: ../brand/FaithReins_DesignSystem_v6/components/brand/Lockup.jsx.
- Current site lockup, header and footer: ../src/lib/lib.mjs.
- Site head, metadata and icon: ../src/layouts/Base.astro and ../public/favicon.svg.
- Existing hero exports and image styles: ../images/ and ../public/assets/.
- Existing QA: ../tests/ and ../playwright.config.ts.
- Legacy V4 logo/seal layouts must be compared to actual approved artwork, not recreated from recollection.

## Fixed visual foundation — inherited from V6

- Forest green: #173A2E; deep green: #0E2019.
- Gold: #B08D57; light gold: #D5BC8A; gold text: #7A5E2E.
- Cream: #F3EEE4; sand: #E7E0D2; paper: #FBF8F1; white: #FFFFFF.
- Typography: Libre Caslon Display / Libre Caslon Text / Hanken Grotesk.
- Crisp flat color, square corners, light hairline rules, no ornamental shadows and no new palette.
- Website logo L1 precedent: horse, FAITH REINS wordmark, caption between gold rules.
- V6 existing caption: “PEDIATRIC & EQUINE THERAPY”. Owner also requested “Equestrian and Pediatric Therapy”; exact final wording is an approval item, not a silent edit.

## Deliverable A — Foundation: approved horse master

- Store final approved path-only SVG in approved/horse/horse-master-green.svg (transparent).
- Build fill-only color variants: cream, approved gold and optional white.
- Maintain shared path geometry and viewBox; avoid per-variant manual retracing.
- Validate at tiny favicon size, 24/32/48px and larger print/signage scales.
- Confirm no PNG/image tags, embedded base64, polygonal pixel steps, unintended holes, contours extending beyond viewBox, or stray points.
- Capture a black-on-white, inverse, and transparent visual proof sheet.
- Horse identity is fixed; any anatomy changes trigger renewed sign-off.

## Deliverable B — Website logo (highest priority)

- Rebuild V6 L1 **horizontal** lockup with the new approved horse; retain v6 approved hierarchy, fonts, spacing, and cream/green/gold relationships.
- Light version: green horse and wordmark on cream/light.
- Dark version: cream horse and wordmark on green; light-gold caption/rules.
- Optional gold horse on dark green (approval required); gold remains accent, not page primary.
- Prepare full and compact responsive lockups; the compact subtitle treatment is a conscious review decision, not automatic removal.
- Output transparent SVG masters and PNG fallback where external systems require it.
- Review in desktop header, tablet header, mobile header/drawer and dark footer contexts.

## Deliverable C — Document logo

- Update the approved formal document arrangement with the approved horse.
- Prepare horizontal and stacked lockups for letterheads, clinical correspondence, referral forms, invoices, donor letters, PDFs and print.
- Produce green, reverse cream, pure black and approved one-color versions.
- Test high-contrast grayscale and small print sizes; avoid hairlines disappearing at 300 dpi.
- Do not invent a new brand name, service descriptor or nonprofit legal entity designation.

## Deliverable D — Seal

- Rebuild the **approved legacy seal composition**, not a new seal concept, using the same master horse.
- Outer-ring and ringless versions if both were approved.
- “Faith & Healing”, banner treatment and “EST. 2025” are conditional on matching the approved reference art and explicit sign-off.
- Audit concentric alignment, text-on-path balance, banner quality, minimum-size readability and foil/embroidery compatibility.
- Deliver SVG one-color masters and print-ready derived versions.

## Deliverable E — Colorway and brand standards

- Create a color variant matrix for the three logo families; variant names should identify ink color and target background.
- Provide font specifications and licensed font-handling guidance (do not commit proprietary font files).
- Define min size, clear space, safe area, light/dark rules, correct/incorrect usage and accessibility contrast.
- Publish approved vector, PNG fallbacks, social/favicon sizes and a preview/approval board.
- Update/extend brand token documentation without mutating site CSS until implementation approval.

## Execution sequence and gates

| Phase | Work | Output | Gate |
| --- | --- | --- | --- |
| 0. Inventory | Compare V4/V6 approved logos, site placements, existing code references | traceable legacy/target asset map | source assets verified |
| 1. Horse | Import exact signed-off master and QA SVG geometry | approved/horse files and proof sheet | horse master validated |
| 2. Website | L1 desktop/tablet/mobile, header/footer variants | approved/website-logo files | owner approves layout + tagline |
| 3. Document | formal horizontal/stacked and black/reverse variants | approved/document-logo files | owner approves print samples |
| 4. Seal | approved ring/banner composition and variants | approved/seal files | owner approves 100% and small-size |
| 5. Standards | token contract, clear-space/min-size guide, export manifest | guidance docs + previews | files verified |
| 6. Integrate | isolated PR changing only shared logo refs and site icons | testable code PR | Playwright + visual sign-off |
| 7. Publish | preview approval then publish under separate instruction | FaithReins.com v7 branding | explicit deployment approval |

## Production requirements

Every SVG master must:
- Parse as SVG 1.1-compatible XML; have a fixed viewBox and a scalable intrinsic aspect ratio.
- Use real geometry, not image href/embed or base64 PNG.
- Preserve smooth Bézier curvature at joins, sharp intentional tips and masculine horse silhouette.
- Use 1 brand fill color per monochrome variant; no accidental antialiased raster artwork embedded.
- Have sensible transparent padding and correct foreground/background variants.
- Be visually inspected at 100%, 400% and practical UI sizes; measured dimensions and file sizes recorded in ASSET-REGISTER.md.

## Release acceptance — no redesign

- Website header/footer branding is consistent across existing routes.
- No clipping/blur at 1440, 1280, 1024, 768, 390, 375 and 320 CSS px; check 1x/2x rendering.
- 44px usable touch targets; mobile menu, overlay and header interactions still function.
- Logo text readable; legal/clinical content unaffected; no horizontal overflow.
- Existing routes, booking/referral, giving, shop and responsive heroes pass regression.
- No unapproved visual changes to V4/V6 sections; screenshot diffs for header, footer, mobile drawer and key pages documented.
- Document and seal masters render correctly on white, cream and green and in print black.
- All final files logged in asset register with approval status, master source, format and intended placement.
- Clear rollback available (asset path swap to V6 refs), with v6 files retained.

## Immediate next actions

1. Import the **exact approved horse SVG** and its white-background reference to approved/horse/; verify the original against the supplied approved image at high zoom.
2. Assemble a contact sheet of approved V4/V6 website/document/seal legacy designs for precise layout transfer.
3. Build website logo L1 first; review text treatment and caption.
4. After approval, derive colors and begin document/seal work.
5. Leave site code unchanged until each brand family is accepted.

## Naming

- horse-master-green.svg / horse-master-cream.svg / horse-master-gold.svg
- website-horizontal-green-on-cream.svg / website-horizontal-cream-on-green.svg
- website-compact-green.svg (only after approval)
- document-horizontal-green.svg / document-stacked-green.svg / document-black.svg
- seal-full-green.svg / seal-ringless-green.svg / seal-black.svg

Anything not yet reviewed must be called **proposed** or **pending**, not final.
