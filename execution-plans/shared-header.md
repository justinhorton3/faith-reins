# Header Execution Plan

## Goal

Replace the current Wix header with one global header that matches the v4 mock and the approved Faith Reins brand system. The result must look intentional, aligned, shallow, and responsive across desktop, tablet, and mobile.

## Required Context

- `brand/brand-tokens.md`
- `execution-plans/wix-build-rules.md`
- v4 mockup PDF root file: `Faith-Reins-Website-Design-Review-v4.pdf`
- Current-problem reference: uploaded/editor screenshot showing oversized header whitespace, tiny logo, floating nav, and default blue Donate button

## Brand Requirements

| Item | Required value |
|---|---|
| Primary color | Forest Green `#0B4F3A` |
| Accent color | Warm Gold `#C9A96B`, restrained use only |
| Light field | Cream `#F6F1E7` |
| Text | Black `#111111` or Forest Green |
| Nav/UI font | Noto Sans |
| Formal heading font | Noto Serif SemiBold |
| Logo | Primary Horizontal logo, locked artwork |
| Public UI blue | Not allowed |

## Assets

| Asset | Repo path | Wix folder | Required |
|---|---|---|---|
| Primary horizontal logo | `images/supporting/logo.webp` | `Site Files / supporting` | Yes |
| Reverse logo | `images/supporting/logo-white.webp` | `Site Files / supporting` | Optional for dark/mobile drawer |

## Copy And Links

| Label | Destination | Desktop | Tablet | Mobile drawer |
|---|---|---:|---:|---:|
| Logo | Home | Yes | Yes | Yes |
| Home | Home | Yes | Hide first if needed | Yes |
| About | Our Mission | Yes | Yes | Yes |
| Services & Programs | Services And Programs | Yes | Yes, shorten visually only if needed | Yes |
| For Families | For Families | Yes | Yes | Yes |
| Get Involved | Give | Yes | Move to More if needed | Yes |
| Shop | Shop | Yes, text only | Move to More if needed | Yes, text only |
| Donate | Give | Primary button | Keep visible if it fits | First action |

## Desktop Layout

- Breakpoint target: 1024 px and wider.
- Header is global across all pages.
- Header should be shallow, approximately 84-96 px tall. Do not allow the current oversized white band.
- Use a centered content container aligned to the page grid/max width used by the v4 mock.
- Logo sits left, vertically centered.
- Logo must be legible and no smaller than 180 px wide.
- Nav sits horizontally to the right of the logo and before Donate.
- Donate button sits far right, vertically centered.
- All header items share a single vertical centerline.
- Nav font: Noto Sans, medium weight, approximately 15-16 px.
- Nav color: `#111111` or `#0B4F3A`.
- Active/hover state: Forest Green text and/or restrained Warm Gold underline. Do not use Wix blue.
- Donate button:
  - Background `#0B4F3A`.
  - Text `#FFFFFF`.
  - Border `#0B4F3A`.
  - Radius should match v4/button system, preferably restrained and not pill-shaped unless v4 shows pills.
  - Height approximately 44-48 px.
  - Horizontal padding approximately 28-36 px.

## Tablet Layout

- Breakpoint target: 768-1023 px.
- Header remains one row until items no longer fit.
- Priority order:
  1. Logo
  2. Donate
  3. Services & Programs
  4. For Families
  5. About
  6. More/menu
- Home can hide first because the logo links home.
- Shop and Get Involved move into More/menu before nav wraps.
- If Donate causes crowding, keep Donate in the opened menu as the first item and show the menu icon.
- Never allow two-line nav.

## Mobile Layout

- Breakpoint target: 767 px and below.
- Header row:
  - Logo left.
  - Hamburger/menu icon right.
  - Optional compact Donate button only if it fits cleanly at 390 px and wider.
- Mobile drawer/dropdown order:
  1. Donate
  2. Home
  3. About
  4. Services & Programs
  5. For Families
  6. Get Involved
  7. Shop
- Touch targets must be at least 44 px tall.
- Drawer background should use Cream or White with Forest Green/Black text.
- No hover-only behavior.

## Wix Implementation Notes

- Rebuild the header as structured containers/strips, not free-floating elements.
- Pin/attach the header consistently across pages only after desktop/tablet/mobile passes.
- Use global header behavior so updates apply site-wide.
- Avoid default Wix menu/button styling when it introduces blue or inconsistent fonts.
- If Wix font picker does not offer Noto Sans/Noto Serif, record the closest available substitute in `execution-log.md` before proceeding.

## Validation

Check these widths before marking complete:

| Mode | Widths | Pass criteria |
|---|---|---|
| Desktop | 1440, 1280, 1024 | Header is shallow, logo/nav/button share one centerline, no blue button, no wrapping |
| Tablet | 900, 768 | No overlap, no two-line nav, low-priority links move into More/menu |
| Mobile | 430, 390, 375, 320 | Logo and hamburger align, drawer opens, Donate is first action, links are tappable |

## Done Means

- Header visually matches the v4 mock intent.
- Logo is legible and correctly sized.
- Nav is aligned and does not float in extra whitespace.
- Donate is brand green, not Wix blue.
- Shop is a text nav link, not an icon.
- Header works globally on all pages.
- Draft is saved.
