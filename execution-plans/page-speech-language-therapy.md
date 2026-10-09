# Speech Language Therapy Page Execution Plan

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

Service detail page for speech, language, communication, feeding, and confidence support.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Speech Language Therapy |
| Slug | `/speech-language-therapy` |
| Primary nav label | Speech Language Therapy |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-speech-language-therapy-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-speech-language-therapy-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-speech-language-therapy.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | Speech-Language Therapy |
| Hero body | Support for communication, language, feeding, and confidence in everyday life. |
| Primary CTA | Request an appointment |
| Secondary CTA | View all services |

## Layout Instructions

1. **Hero**: Service detail hero with appointment CTA.
2. **Overview**: Plain-language summary of who speech-language therapy can help.
3. **What we support**: Cards or icon rows for communication, language, feeding, social interaction, and confidence.
4. **What sessions may include**: Bulleted process section with evaluation, goals, therapy activities, caregiver carryover.
5. **Family next steps**: Link to Book Online, For Families, and Payment & Insurance.
6. **Related services**: Links to OT, PT, Counseling, and Equine-Assisted Learning.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Keep clinical content scannable with strong headings and enough whitespace.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Cards or support areas wrap evenly.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- CTA and service bullets must stay readable with no clipped text.

## Links And CTAs

| Label | Destination |
|---|---|
| Request an appointment | `/book-online` |
| View all services | `/services-programs` |
| Book Online | `/book-online` |
| Services & Programs | `/services-programs` |
| For Families | `/for-families` |
| Payment & Insurance | `/payment-and-insurance` |

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
