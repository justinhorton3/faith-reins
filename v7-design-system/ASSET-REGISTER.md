# V7 Asset Register and Approval Ledger

Only **approved** production masters/exports belong under approved/. Drafts should be kept in a PR/working branch or separate, clearly identified temporary workspace. Do not overwrite source masters with derived formats.

## Brand foundation

| Asset | Status | Source | Target |
| --- | --- | --- | --- |
| Refined masculine horse master | **Imported — owner approved design** | exact refined vector created in October 2026 conversation; committed to repository | [approved/horse/horse-master-green.svg](approved/horse/horse-master-green.svg) |
| Green horse on white visual reference | Existing reference | approved image from design review | approved/horse/ reference PNG after import |
| Green, cream, gold and optional white derived horses | Pending color export | path geometry of master | approved/horse/ |
| V4/V6 logo direction and formal seal refs | Inventory needed | V4 approvals + ../brand/FaithReins_DesignSystem_v6/ | reference only until verified |

## Brand lockups and seal

| Family | Canonical target | Status | Usage |
| --- | --- | --- | --- |
| Website full horizontal | [approved/website-logo/faith-reins-v7-website-horizontal-green.svg](approved/website-logo/faith-reins-v7-website-horizontal-green.svg) | **Approved layout + exact V6 Hanken vector outlines completed** | same logo scaled desktop/tablet/mobile; no deployment |
| Website inverse | [approved/website-logo/faith-reins-v7-website-horizontal-cream.svg](approved/website-logo/faith-reins-v7-website-horizontal-cream.svg) | **Approved layout + exact V6 Hanken vector outlines completed** | inverse footer; no deployment |
| Website compact | approved/website-logo/website-compact-green.svg | Pending mobile sign-off | small mobile/header/drawer |
| Document horizontal | approved/document-logo/document-horizontal-green.svg | Pending — not part of stacked approval | letterhead/clinical/donor |
| Document stacked | [approved/document-logo/faith-reins-v7-document-stacked-green.svg](approved/document-logo/faith-reins-v7-document-stacked-green.svg) | **Approved and promoted 2026-10-12** | narrow formal applications |
| Document print black | [approved/document-logo/faith-reins-v7-document-stacked-black.svg](approved/document-logo/faith-reins-v7-document-stacked-black.svg) | **Approved and promoted 2026-10-12** | B&W office printing |
| Official seal — green/gold | [approved/seal/faith-reins-v7-seal-green.svg](approved/seal/faith-reins-v7-seal-green.svg) | **Owner approved and promoted 2026-10-12** | primary seal; donor/certificates/merch |
| Official seal — cream/green | [approved/seal/faith-reins-v7-seal-cream.svg](approved/seal/faith-reins-v7-seal-cream.svg) | **Owner approved and promoted 2026-10-12** | inverse seal on dark grounds |
| Official seal — monochrome | [approved/seal/faith-reins-v7-seal-black.svg](approved/seal/faith-reins-v7-seal-black.svg) | **Owner approved and promoted 2026-10-12** | single-color print applications |

## Naming and metadata requirement

Each approved SVG should have recorded:
- origin and approval date;
- exact artwork/wording and revision;
- fill/tone and intended ground;
- original viewBox and geometry source;
- minimum size and clear space;
- SVG geometry QA and preview comparison;
- owner approval and deployment/usage status.

**Do not relabel user-approved visual direction as production-validated SVG** until path curvature and print/mobile rendering QA are complete.

## Text / naming items awaiting final confirmation

- Official public wordmark: FAITH REINS (current site and V6).
- The requested wording “Faith Reigns” conflicts with the current brand; do not change spelling without explicit authorization.
- Current V6 website subtitle “Pediatric & Equine Therapy”; prior request mentions “Equestrian and Pediatric Therapy.” Confirm exact line before freezing logo exports.
- Seal wording and spacing: owner approved the original V7 seal with `FAITH REINS`, `EQUESTRIAN CENTER`, and `EST. 2025`; the date line and flanking rules were tightened on 2026-10-12. The experimental rope-border tangent was not adopted.


## Candidate 01 — 2026-10-12

Two horizontal SVG logo candidates have been committed under `candidates/website-logo/` and their renders were presented in the design conversation. The new horse master is in `approved/horse/`.

* SVG master candidates have transparent backgrounds and outlined vectors.
* Wordmark uses Libre Caslon Text; tagline currently uses an outlined substitute (Lato Semibold), so exact Hanken text is a **release blocker pending approval/rebuild**.
* Green and cream versions are staged; no source-code or published-site changes occurred.
* Transparent PNG previews and compact mobile candidate are available as chat artifacts pending review, not yet committed as approved assets.
* To mark as approved: verify final tagline wording, inspect render at breakpoints, then move accepted SVG and PNG exports into `approved/website-logo/`.


## Approved website lockup production export — 2026-10-12

- User approved the horizontal logo's proportions and locked **“Pediatric & Equine Therapy”** on every responsive instance.
- **One unchanged horizontal lockup per colorway, scaled only** on desktop, tablet and mobile. The earlier compact/no-caption concepts are retired.
- Production SVGs and PNGs under `approved/website-logo/` were generated by `scripts/generate-v7-website-logo.py` using the **actual V6 Hanken Grotesk WOFF** at weight 600; the text is converted to self-contained path outlines. Wordmark preserves the approved Libre Caslon shapes from the prior review candidate.
- Artwork is independent of font installation at runtime; no embedded font files, raster images or text elements.
- Responsive proof images for 580/430/290px widths are included in the folder. These are asset proofs only, not complete Playwright website screenshots.
- Deployment remains blocked until separately requested. Keep current site untouched.


## Document logo approval — October 12, 2026

Owner approved the stacked document logo artwork in green/gold, cream/gold and monochrome black. Candidate SVGs exist in `candidates/document-logo/`. Promote unchanged to `approved/document-logo/` and retain matching geometry. Horizontal document format was **not** approved separately.


## Seal — first V7 candidate, not yet approved

Using the most recently approved circular seal specification: thick forest-green perimeter ring, 6-point gold inner ring and mirrored divider arcs, mathematically circular curved FAITH REINS / EQUESTRIAN CENTER text, centered new approved v7 horse, EST. 2025 and warm cream field. This supersedes the older ribbon-banner study. Three color treatments (green/cream, inverse and black) were generated for review on 2026-10-12. Do not promote to approved/seal until owner signs off. The review SVGs and proofboard are attached to the design conversation; repository candidate import remains pending.


## Seal visual approval — 2026-10-12 (latest locked rope seal)

**Owner decision: APPROVED.** The owner approved the vector reconstruction shown in the ChatGPT conversation after explicitly rejecting further changes to the artwork. This supersedes the earlier original V7 seal as the intended production seal design.

Approved visual specification:
- Preserve the exact approved seal composition from the locked proof (not newly generated approximations).
- Forest-green approved horse silhouette and curved “FAITH REINS” / “EQUESTRIAN CENTER” lettering.
- Thin double outer green border; outer band's thickness as in the locked proof.
- Dark-green rope circle inside the lettering band, bordered by thin concentric green lines.
- Cream/ivory field, symmetrical gold side arcs, and “EST. 2025” with short gold flanking rules.
- No gold dots, no banner, no changed horse proportions or alternative ring layout.

The owner-approved files were produced as conversation artifacts:
- `faith-reins-v7-seal-locked-vector.svg` (transparent SVG, 1254×1254 viewBox)
- `faith-reins-v7-seal-locked-ivory.svg` (ivory-ground SVG, 1254×1254 viewBox)
- `faith-reins-v7-seal-locked-proof.png` (visual approval proof)
- `faith-reins-v7-seal-locked-preview-3000.png` (large preview)

**Production-import gate:** The approved SVGs are currently conversation artifacts, **not yet committed to this GitHub branch**. Do not substitute the previously committed `approved/seal/faith-reins-v7-seal-green.svg` (older, solid-gold-ring seal). Import the actual approved artifact bytes as a new revision, compare against the proof and check vector fidelity before updating canonical paths; preserve the older seal for rollback. Do not label any new AI-generated seal as the approved master.

No website code or production deployment was authorized by this seal approval.
