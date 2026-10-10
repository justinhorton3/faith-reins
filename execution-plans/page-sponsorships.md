# Sponsorships Page Execution Plan

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

Supporter page for sponsorship paths, recognition, impact, and sponsor inquiries.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Sponsorships |
| Slug | `/sponsorships` |
| Primary nav label | Sponsorships |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-sponsorships-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-sponsorships-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-sponsorships.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | A partnership with purpose. |
| Hero body | Support people, horses and the places where connection grows. |
| Primary CTA | Discuss sponsorship |
| Secondary CTA | Give now |

## Layout Instructions

1. **Hero**: Sponsor-focused hero with inquiry CTA.
2. **Why sponsor**: Explain mission support and community partnership.
3. **Sponsorship options**: Use approved tier cards only. If prices or tiers are not approved, replace this section with an inquiry CTA and do not invent values.
4. **Recognition**: Use approved recognition policy only. If it is not final, omit the section and keep the inquiry CTA.
5. **Impact**: Link sponsorship to care access and program support.
6. **Next steps**: Contact, Give, Impact & Stewardship.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Tier cards align cleanly and feel credible.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Tiers wrap without crowding.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Each tier reads as a standalone card.

## Links And CTAs

| Label | Destination |
|---|---|
| Become a sponsor | `/contact` |
| Give now | `/give` |
| Contact | `/contact` |
| Give | `/give` |
| Impact & Stewardship | `/impact-and-stewardship` |
| Our Partners | `/our-partners` |

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
