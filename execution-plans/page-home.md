# Home Page Execution Plan

## Status

Ready V2. This plan has enough page-level detail for a focused Wix build run without reopening the full project history.

## Required Context

Open only these files for the build run:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. `execution-plans/site-map-and-routes.md`
5. This execution plan

Open `Faith-Reins-Website-Design-Review-v4.pdf` only to resolve visual spacing, section order, or crop questions. If this plan and the v4 mock conflict, the v4 mock wins.

## Page Role

Primary entry page that quickly explains the Faith Reins mission, care model, service paths, and next actions for families and donors.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Home |
| Slug | `/` |
| Primary nav label | Home |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-home-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-home-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-home.jpg` | `Site Files / masters` | Recrop only |
| Supporting asset | `images/supporting/home-clinical.webp` | `Site Files / supporting` | If section is built |

## Copy

| Element | Copy |
|---|---|
| Hero headline | People. Horses. Brighter futures. |
| Hero body | Pediatric therapy, counseling and equine-assisted learning in South Arkansas. |
| Primary CTA | Request an appointment |
| Secondary CTA | Explore services |

## Layout Instructions

1. **Hero**: Full-bleed first section with readable overlay copy, primary appointment CTA, and secondary services CTA.
2. **Mission intro**: Constrained cream/white section with headline: Helping children and families heal, grow and thrive. Body: Faith Reins pairs evidence-based care with the calm connection of horses to support children, teens and families.
3. **Services preview**: Three aligned cards for Pediatric Therapy, Counseling, and Equine-Assisted Learning. Each card gets a one-sentence summary and Learn more link.
4. **Family path**: Short step section: ask questions, request appointment, visit Faith Reins, begin care plan.
5. **Giving/support band**: Warm donor/support CTA that routes to Give without competing with the appointment CTA.
6. **Final CTA**: Repeat Request an appointment and Contact us options above footer.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Hero should fill the first viewport below the header and align text to the v4 grid. Services cards should sit in one row at 1280+ and remain balanced at 1024.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Hero text must stay inside safe area. Service cards can become two-plus-one or stacked depending on fit; avoid squeezed cards.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Use mobile hero crop. Put CTA buttons high enough that the first action is visible without awkward overlap.

## Links And CTAs

| Label | Destination |
|---|---|
| Request an appointment | `/book-online` |
| Explore services | `/services-programs` |
| Pediatric Therapy | `/services-programs` |
| Counseling | `/counseling` |
| Equine-Assisted Learning | `/equine-assisted-learning` |
| Give | `/give` |
| Contact us | `/contact` |

## Wix Build Notes

- Use approved colors from `brand/brand-tokens.md`; no public Wix default blue.
- Use Noto Sans for body, navigation, UI, and card copy.
- Use Noto Serif SemiBold only for refined formal headline moments when it matches the v4 mock.
- Preserve the provided asset filenames in Wix Media Manager.
- Do not reuse another page's hero image.
- Save draft only; do not publish unless Justin explicitly asks.

## Validation Checklist

| Mode | Widths | Pass criteria |
|---|---|---|
| Desktop | 1440, 1280, 1024 | Matches v4 visual intent, correct desktop hero, aligned to grid, no default blue, no overlap |
| Tablet | 900, 834, 768 | Sections wrap cleanly, header remains aligned, CTAs remain visible and tappable |
| Mobile | 430, 390, 375, 320 | Uses mobile hero, text is readable, buttons are tappable, no clipped or awkwardly wrapped content |

## Done Means

- Page matches the v4 mock intent at desktop, tablet, and mobile.
- Correct desktop and mobile hero images are used.
- Header, footer, links, and CTAs match `site-map-and-routes.md`.
- Draft is saved in Wix.
- `execution-plans/execution-log.md` is updated with completion notes or blockers.
