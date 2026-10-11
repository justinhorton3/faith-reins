# Website UI kit — Design System v6

The live, responsive build of every faithreins.org page. Open `index.html#/<slug>`; review all three breakpoints side by side in `Faith Reins Site v6.dc.html` at the project root.

## Breakpoints
- Header: a double header everywhere (green utility bar over a cream main bar). On mobile the utility bar is cut down to the phone and Contact.
- Desktop: 1024px and up. Full nav from 1280px; drawer below that. Gutter 64px, section padding 96px.
- Tablet: 768–1023px. Header shows Support + Menu. Gutter 40px, section padding 80px. Grids drop to 2 columns; splits stack.
- Mobile: under 768px. xs lockup, Menu only. Gutter 20px, section padding 64px. Everything is one column, CTAs are full-width, and heroes swap to the `assets/heroes/mobile/` crops with a bottom scrim.

Breakpoint logic lives in `components/core/responsive.jsx` (`useBreakpoint`, `gutter`, `sectionY`).

## Pages (25)
| # | Route | File | Hero |
|---|---|---|---|
| 1 | / | pages/Home.jsx | hero-home |
| 2 | /book-online | pages/Families.jsx | hero-book-online |
| 3 | /services-programs | pages/Therapies.jsx | hero-services |
| 4–8 | /speech-language-therapy, /occupational-therapy, /physical-therapy, /counseling, /equine-assisted-learning | pages/Therapies.jsx (shared template + THERAPIES data) | hero-<slug> |
| 9 | /for-families | pages/Families.jsx | hero-for-families |
| 10 | /our-team | pages/About.jsx | hero-our-team |
| 11 | /our-mission | pages/About.jsx | hero-our-mission |
| 12 | /contact | pages/Families.jsx | hero-contact |
| 13 | /faq | pages/Families.jsx | hero-faq |
| 14 | /give | pages/Giving.jsx | hero-give |
| 15 | /payment-and-insurance | pages/Families.jsx | hero-payment-and-insurance |
| 16 | /for-referring-providers | pages/Families.jsx | hero-for-referring-providers |
| 17 | /our-horses | pages/About.jsx | hero-our-horses |
| 18 | /our-partners | pages/About.jsx | hero-our-partners |
| 19 | /impact-and-stewardship | pages/Giving.jsx | hero-impact-and-stewardship |
| 20 | /sponsorships | pages/Giving.jsx | hero-sponsorships |
| 21 | /shop | pages/Giving.jsx | hero-shop |
| 22 | /join-our-team | pages/About.jsx | hero-join-our-team |
| 23–25 | /privacy, /accessibility, /donation-policy | pages/Legal.jsx | none (sand title band) |

## Assets
- `assets/heroes/desktop/*.webp` and `assets/heroes/mobile/*.webp` — one pair per page; serve them with `<picture>` (mobile source at max-width 767px)
- `assets/horses/` — the herd
- `assets/merch/` — interim shop images (artwork on garment color), one per product
- `assets/merch-artwork/` — print-ready transparent artwork for the vendor
- `data/merch-catalog.json` — products, fits, size runs and size charts (Wix Stores import source)
- `assets/logo/` — horse marks
- `assets/imagery/` — supporting clinic photo

## Mobile hero focal points
I reviewed every mobile crop at 375px. Seven heroes needed a new `object-position` so the subject stays in frame: book-online, contact, counseling, for-families, give, for-referring-providers and speech-language-therapy. The values are in `MOBILE_FOCUS` in `pages/_shared.jsx`.

⚠ `hero-shop` still shows a mug with the old "Faith Reins Equestrian Center" logo. Replace it with a real merch photo shot using the new artwork.

## Content still needed before launch
- Parent testimonials. Every quote currently shown is a marked placeholder; replace each with a real quote used with permission.
- Session photos for the "session in pictures" row on each therapy page.
- Confirmation of the credentials listed in the credentials strip.
- Real phone number, email, address and office hours. (870) 555-0142 and hello@faithreins.org are placeholders.
- Staff names, credentials, portraits and bios (Our Team uses PhotoSlot placeholders).
- Partner logos (Our Partners uses PhotoSlot placeholders).
- Shop prices and sizes, which are drafts.
- Sponsorship amounts, which are left to the sponsor packet.
- Clinical, insurance and policy copy is a draft; it needs review by the clinical director and legal.
