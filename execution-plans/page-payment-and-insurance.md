# Payment And Insurance Page Execution Plan

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

Practical family page for payment, coverage questions, documentation, and contact next steps.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Payment And Insurance |
| Slug | `/payment-and-insurance` |
| Primary nav label | Payment And Insurance |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-payment-and-insurance-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-payment-and-insurance-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-payment-and-insurance.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | Payment & Insurance |
| Hero body | Practical information to help families understand coverage, private pay, and next steps. |
| Primary CTA | Contact us |
| Secondary CTA | Request an appointment |

## Layout Instructions

1. **Hero**: Clear practical hero with Contact CTA.
2. **Payment overview**: Explain that details vary and families should contact the team for specifics.
3. **Common paths**: Coverage questions, private pay, referrals/documentation, scheduling questions.
4. **What to have ready**: Insurance card, referral/provider notes if applicable, child/family contact information.
5. **Questions section**: Short FAQ-style content; avoid guarantees.
6. **Next steps**: Contact and Book Online.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Table/list content must be readable and not feel like fine print.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Avoid squeezed columns; stack if needed.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Use stacked lists instead of wide tables.

## Links And CTAs

| Label | Destination |
|---|---|
| Contact us | `/contact` |
| Request an appointment | `/book-online` |
| Contact | `/contact` |
| Book Online | `/book-online` |
| For Families | `/for-families` |
| FAQ | `/faq` |

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
