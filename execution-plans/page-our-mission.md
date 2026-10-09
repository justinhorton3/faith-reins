# Our Mission Page Execution Plan

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

About page for mission, story, values, and why Faith Reins combines clinical care with the horse environment.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Our Mission |
| Slug | `/our-mission` |
| Primary nav label | About |
| Header behavior | Follow `execution-plans/shared-header.md` and `execution-plans/site-map-and-routes.md` |
| Footer behavior | Follow `execution-plans/shared-footer.md` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-our-mission-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-our-mission-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-our-mission.jpg` | `Site Files / masters` | Recrop only |

## Copy

| Element | Copy |
|---|---|
| Hero headline | Rooted in faith. Guided by care. |
| Hero body | Faith Reins brings pediatric therapy, counseling and equine-assisted learning together in a peaceful South Arkansas setting. |
| Primary CTA | Explore services |
| Secondary CTA | Meet our team |

## Layout Instructions

1. **Hero**: Image-led mission hero with calm overlay copy and one primary CTA.
2. **Our Story**: Headline: Our Story. Body: We serve children and families with clinical care, trusted relationships and the steady presence of horses.
3. **Mission statement**: Short, prominent mission block in Forest Green or Cream field.
4. **Care values**: Three to five values: faith-rooted compassion, clinical excellence, family partnership, safety, and stewardship.
5. **Why horses**: Explain the calm, relational environment without overstating clinical claims.
6. **Next steps**: Route visitors to Services & Programs, Our Team, Our Horses, and Contact.

## Desktop Layout

- Target widths: 1440, 1280, 1024.
- Use the global header and footer; do not rebuild or locally override them.
- Hero should be the first visible page section below the header and must use the desktop hero image.
- Keep content aligned to the v4 grid/max-width and avoid floating free-positioned elements.
- Use generous white/cream space and refined typography. Story/value sections should feel editorial, not card-heavy.

## Tablet Layout

- Target widths: 900, 834, 768.
- Keep the page rhythm from desktop, but let multi-column sections wrap before they compress.
- Header behavior follows the shared header tablet rules; do not allow nav wrapping.
- Stack story/value columns before text becomes cramped.

## Mobile Layout

- Target widths: 430, 390, 375, 320.
- Use the mobile hero image and check the focal point manually.
- Stack sections in the same logical order as desktop.
- Use full-width or clearly tappable buttons with at least 44 px touch targets.
- Headlines should wrap naturally; keep mission statement readable and avoid dense paragraphs.

## Links And CTAs

| Label | Destination |
|---|---|
| Explore services | `/services-programs` |
| Meet our team | `/our-team` |
| Services & Programs | `/services-programs` |
| Our Team | `/our-team` |
| Our Horses | `/our-horses` |
| Contact | `/contact` |

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
