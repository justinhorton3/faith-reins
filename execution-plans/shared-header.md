# Header Execution Plan

## Status

Ready V3. This plan is the build-ready source of truth for rebuilding the global Wix header so it matches the v4 mock intent and behaves correctly on desktop, tablet, and mobile.

## Goal

Replace the current Wix header with one global header that is shallow, aligned, brand-correct, and responsive. The header must not have the current oversized white band, tiny logo, floating nav, default blue Donate button, or Shop icon.

## Required Context

Open only these files for the header build run:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. `execution-plans/site-map-and-routes.md`
5. This execution plan

Open `Faith-Reins-Website-Design-Review-v4.pdf` only to resolve exact visual spacing or mock-specific alignment questions.

## Brand Requirements

| Item | Required value |
|---|---|
| Header field | White or Cream `#F6F1E7`, matching v4 mock |
| Primary color | Forest Green `#0B4F3A` |
| Accent color | Warm Gold `#C9A96B`, restrained use only |
| Text | Black `#111111` or Forest Green |
| Nav/UI font | Noto Sans |
| Logo | Primary Horizontal logo, locked artwork |
| Public UI blue | Not allowed |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Primary horizontal logo | `images/supporting/logo.webp` | `Site Files / supporting` | Required |
| Reverse logo | `images/supporting/logo-white.webp` | `Site Files / supporting` | Optional only for a dark drawer/footer |

## Navigation Source Of Truth

| Label | Destination slug | Desktop | Tablet | Mobile drawer | Notes |
|---|---|---:|---:|---:|---|
| Logo | `/` | Yes | Yes | Yes | Logo always links home |
| Home | `/` | Yes | Hide first if needed | Yes | Can hide on tablet because logo links home |
| About | `/our-mission` | Yes | Yes | Yes | Header label stays `About` |
| Services & Programs | `/services-programs` | Yes | Yes if it fits | Yes | Do not shorten unless forced by tablet fit |
| For Families | `/for-families` | Yes | Yes if it fits | Yes | Family intake path |
| Get Involved | `/give` | Yes | Move to menu if needed | Yes | May become dropdown later, not now |
| Shop | `/shop` | Yes | Move to menu if needed | Yes | Plain text link only, no icon |
| Donate | `/give` | Button | Button if it fits | First drawer CTA | Only button in desktop nav |

## Build Structure

Use one global Wix header made from structured strips/containers:

1. **Outer header strip**: full width, white/cream background, no decorative border unless v4 shows one.
2. **Inner content container**: centered to the same max width/grid as the v4 page content.
3. **Logo zone**: left aligned, vertically centered.
4. **Nav zone**: horizontal text links, centered vertically, allowed to shrink only until breakpoint rules take over.
5. **CTA zone**: Donate button at far right on desktop.
6. **Mobile menu control**: hamburger/menu button appears at mobile and when tablet nav can no longer fit.

Do not build the header from loose floating elements. Alignment issues should be solved with container layout, not manual nudging.

## Desktop Layout

| Rule | Requirement |
|---|---|
| Target widths | 1440, 1280, 1024 |
| Height | 92 px desktop/tablet; 72 px mobile |
| Inner container | 1200 px max width; 32 px side padding desktop/tablet, 20 px mobile |
| Logo size | 210 px wide desktop/tablet; 164 px mobile; never stretched, cropped, or retyped |
| Alignment | Logo, nav, and Donate button share one vertical centerline |
| Nav typography | Noto Sans, 16 px desktop and 15 px tablet, 500 weight |
| Nav color | `#111111` or `#0B4F3A` |
| Nav spacing | 24 px gap desktop; 16 px gap tablet; no crowding or wrapping |
| Active/hover | Forest Green text and/or restrained Warm Gold underline |
| Donate button | Forest Green background, white text, Forest Green border |
| Donate size | 48 px high, 32 px horizontal padding, 8 px radius |

Desktop must keep all primary nav links visible in one row if they fit cleanly. Do not use a desktop dropdown for this pass.

## Tablet Layout

Target widths: 900, 834, 768.

Tablet is fit-based, not opinion-based. If nav becomes crowded, move lower-priority links into the menu before text wraps or overlaps.

Priority order:

1. Logo
2. Donate
3. Services & Programs
4. For Families
5. About
6. Menu

Tablet behavior:

- Hide `Home` first because the logo links home.
- Move `Shop` and `Get Involved` into the menu before nav wraps.
- If the Donate button causes crowding, move Donate into the menu as the first drawer action.
- Never allow a two-line nav.
- Never allow the nav to collide with the logo or Donate button.
- At 900 px, show logo, Services & Programs, For Families, Donate, and menu; move all other links into the drawer.
- At 834 px and 768 px, show logo, Donate, and menu only.

## Mobile Layout

Target widths: 430, 390, 375, 320.

Mobile header row:

1. Logo left.
2. Hamburger/menu icon right.
3. Optional compact Donate button only if it fits cleanly at 390 px and wider.

Use the 72 px row height, 44 px menu hit area, and 164 px maximum logo width. At 375 px and 320 px, place Donate in the drawer.

Mobile drawer order:

1. Donate
2. Home
3. About
4. Services & Programs
5. For Families
6. Get Involved
7. Shop
8. Contact

Mobile drawer rules:

- Touch targets must be at least 44 px tall.
- Drawer background should be White or Cream with Forest Green/Black text.
- Donate must be styled as a CTA, not a plain blue link.
- No hover-only behavior.
- Menu open/close must be obvious and tappable.

## States

| State | Requirement |
|---|---|
| Default | Clean, shallow, aligned, brand colors only |
| Hover/focus | Forest Green or Warm Gold accent; no blue |
| Active page | Subtle underline or text treatment; no layout shift |
| Drawer open | Body/content must not overlap drawer controls |
| Small mobile | Logo remains legible and menu remains tappable |

## Wix Implementation Notes

- Rebuild as a global header only after testing in one page context.
- Use Wix containers/strips with pinned alignment, not manual free-floating elements.
- Avoid default Wix menu/button styles if they introduce blue, wrong fonts, or odd spacing.
- If Wix does not offer Noto Sans/Noto Serif, record the closest substitute in `execution-plans/execution-log.md` before proceeding.
- Save draft only. Do not publish unless Justin explicitly asks.

## Validation Checklist

| Mode | Widths | Pass criteria |
|---|---|---|
| Desktop | 1440, 1280, 1024 | Header is 84-96 px, logo/nav/button share one centerline, all visible links fit, Donate is green, Shop is text only |
| Tablet | 900, 834, 768 | No wrapping or overlap, low-priority links move into menu, Donate visible only when it fits |
| Mobile | 430, 390, 375, 320 | Logo and hamburger align, drawer opens/closes, Donate is first action, all links are tappable |

## Fail Conditions

- Header has oversized vertical whitespace.
- Logo is too small, distorted, cropped, or retyped.
- Donate button is Wix/default blue.
- Shop appears as an icon.
- Nav wraps to two lines.
- Any header element floats out of alignment on tablet or mobile.
- Drawer links do not match `site-map-and-routes.md`.

## Done Means

- Header visually matches the v4 mock intent.
- Header works globally on all pages.
- Desktop, tablet, and mobile validation all pass.
- Draft is saved.
- `execution-plans/execution-log.md` is updated with completion notes or blockers.
