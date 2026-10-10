# Our Partners Page Execution Plan

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

Partner page recognizing relationships and routing future partners to inquiry paths.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Our Partners |
| Slug | `/our-partners` |
| Primary nav label | Our Partners |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-our-partners-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-our-partners-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-our-partners.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | Stronger together. |
| Hero body | Community and clinical connections supporting South Arkansas. |
| Primary CTA | Become a partner |
| Secondary CTA | View sponsorships |

## Layout Instructions

1. **Hero**: Partnership hero with inquiry CTA.
2. **Partner categories**: Families, providers, donors, community organizations, sponsors.
3. **Logo/recognition grid**: Use approved partner logos only. If final logos are unavailable, omit the grid and retain the partner-category copy.
4. **How partnership helps**: Short impact-focused content.
5. **Become a partner**: CTA to Contact and Sponsorships.
6. **Related trust link**: Impact & Stewardship.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- If logos are unavailable, the grid is omitted rather than filled with placeholders.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Placeholders scale consistently.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Categories stack clearly.

## Links And CTAs

| Label | Destination |
|---|---|
| Partner with us | `/contact` |
| View sponsorships | `/sponsorships` |
| Contact | `/contact` |
| Sponsorships | `/sponsorships` |
| Impact & Stewardship | `/impact-and-stewardship` |
| Give | `/give` |

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
