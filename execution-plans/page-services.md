# Services And Programs Page Execution Plan

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

Hub page that routes families and providers to every clinical service and equine-assisted program.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Services And Programs |
| Slug | `/services-programs` |
| Primary nav label | Services & Programs |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-services-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-services-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-services.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | Care for every next step. |
| Hero body | Occupational therapy, physical therapy, speech-language therapy, counseling and EAL. |
| Primary CTA | Request an appointment |
| Secondary CTA | For families |

## Layout Instructions

1. **Hero**: Clear service hub hero with appointment CTA.
2. **Overview**: Short intro explaining that services are individualized and family-centered.
3. **Service cards**: Five cards: Speech-Language Therapy, Occupational Therapy, Physical Therapy, Counseling, Equine-Assisted Learning.
4. **How to start**: Three steps: ask questions, request appointment/referral, meet the team.
5. **Family/provider split**: Two pathways linking to For Families and For Referring Providers.
6. **Final CTA**: Appointment and Contact CTAs.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Service cards should align in a clean grid with consistent title, description, and Learn more link.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Cards may wrap into two columns; do not create uneven card heights that break rhythm.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Cards stack with large tap targets and clear Learn more links.

## Links And CTAs

| Label | Destination |
|---|---|
| Request an appointment | `/book-online` |
| For families | `/for-families` |
| Speech-Language Therapy | `/speech-language-therapy` |
| Occupational Therapy | `/occupational-therapy` |
| Physical Therapy | `/physical-therapy` |
| Counseling | `/counseling` |
| Equine-Assisted Learning | `/equine-assisted-learning` |
| For Families | `/for-families` |
| For Referring Providers | `/for-referring-providers` |

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
