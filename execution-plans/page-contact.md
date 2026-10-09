# Contact Page Execution Plan

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

Contact/location page for general questions, referrals, appointment questions, donations, and partnerships.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Contact |
| Slug | `/contact` |
| Primary nav label | Contact |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-contact-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-contact-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-contact.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | Contact Faith Reins |
| Hero body | Reach out with questions, referrals, appointment requests, or partnership opportunities. |
| Primary CTA | Send a message |
| Secondary CTA | Request an appointment |

## Layout Instructions

1. **Hero**: Contact hero with message CTA.
2. **Contact details**: Faith Reins Equestrian Center; 123 County Road 45; Camden, AR 72711; Phone: (123) 836-8383; Email: info@faithreins.com; Hours: Mon-Fri, 8 AM-5 PM.
3. **Inquiry form**: Name, phone, email, reason for inquiry, message.
4. **Quick paths**: Appointment questions -> Book Online; referrals -> For Referring Providers; donors -> Give/Sponsorships.
5. **Location/map placeholder**: Use a clean map/location block if available; otherwise address block.
6. **Final CTA**: Contact and Book Online.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Contact details and form should be visible and balanced.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Form remains usable.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Phone, email, and address are tappable/readable.

## Links And CTAs

| Label | Destination |
|---|---|
| Send a message | `form-submit` |
| Request an appointment | `/book-online` |
| Book Online | `/book-online` |
| For Referring Providers | `/for-referring-providers` |
| Give | `/give` |
| Sponsorships | `/sponsorships` |

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
