# Footer Execution Plan

## Status

Ready V3. This plan is the build-ready source of truth for the global Wix footer.

## Goal

Build one global footer that matches the v4 mock intent, uses approved brand colors and typography, presents contact details clearly, and gives visitors obvious next steps without feeling generic or cluttered.

## Required Context

Open only these files for the footer build run:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. `execution-plans/site-map-and-routes.md`
5. This execution plan

Open `Faith-Reins-Website-Design-Review-v4.pdf` only to resolve exact spacing, visual hierarchy, or footer order questions.

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Reverse/footer logo | `images/supporting/logo-white.webp` | `Site Files / supporting` | Preferred on Forest Green footer |
| Primary logo fallback | `images/supporting/logo.webp` | `Site Files / supporting` | Use only on light footer |

## Brand Requirements

| Item | Requirement |
|---|---|
| Main footer field | Forest Green `#0B4F3A` unless v4 clearly uses a lighter footer |
| Footer text | White `#FFFFFF` or Cream `#F6F1E7` |
| Accent | Warm Gold `#C9A96B`, restrained rules/dividers only |
| Font | Noto Sans for links, contact info, utility text |
| Public UI blue | Not allowed |
| Logo | Use approved logo artwork only; do not retype |

## Contact Copy

Use the confirmed business details already maintained in the Wix site settings. Do not publish the sample address, phone number, email, or hours from an earlier draft. If Wix settings are empty, leave the contact block as a clearly labeled draft placeholder and record the blocker in `execution-log.md`.

## Footer Link Groups

| Group | Links |
|---|---|
| Main | Home, Our Mission, Services & Programs, For Families |
| Services | Speech Language Therapy, Occupational Therapy, Physical Therapy, Counseling, Equine-Assisted Learning |
| Support | Give, Sponsorships, Impact & Stewardship, Our Partners |
| Practical | Book Online, Payment & Insurance, FAQ, Contact |
| Other | Shop, Our Team, Our Horses, Join Our Team |

All footer links must use the destinations in `execution-plans/site-map-and-routes.md`.

## Build Structure

Use one global footer made from structured containers:

1. **Top CTA band**: optional if v4 shows it; otherwise keep CTA inside main footer.
2. **Main footer band**: full-width Forest Green field.
3. **Inner content container**: centered to the v4 grid/max width.
4. **Brand/contact column**: logo, contact details, primary Donate CTA.
5. **Link columns**: grouped sitemap links.
6. **Bottom utility row**: copyright and minimal legal/utility text.

Do not create nested card sections inside the footer. Footer should feel like one composed global component.

## Desktop Layout

Target widths: 1440, 1280, 1024.

- Use a full-width Forest Green band.
- Place logo/contact column on the left.
- Place link groups on the right in clean columns.
- Keep Donate CTA visible near the contact block or top of footer.
- Use consistent column gaps and align link group headings.
- Footer should be generous but not oversized; avoid a giant empty footer.
- Bottom row should be smaller, quiet, and aligned to the same grid.

Recommended desktop order:

1. Logo
2. Short mission/support line if v4 includes it
3. Donate CTA
4. Contact details
5. Link groups
6. Copyright row

## Tablet Layout

Target widths: 900, 834, 768.

- Footer becomes two columns.
- Brand/contact column appears first.
- Link groups wrap into two rows or two columns.
- Donate CTA remains visible near the top.
- Avoid cramped five-column layouts.
- Do not let long service names collide or shrink below readable size.

## Mobile Layout

Target widths: 430, 390, 375, 320.

Single-column order:

1. Logo
2. Donate CTA
3. Contact details
4. Main links
5. Services links
6. Support links
7. Practical links
8. Other links
9. Copyright/legal row

Mobile rules:

- Links must have at least 44 px tap spacing or enough vertical rhythm to tap easily.
- Phone and email should be tappable if Wix supports it.
- No text clipping at 320 px.
- Link groups may use accordions only if the v4 mock or Wix constraints make the footer too long; default to visible stacked groups.

## Link Destinations

| Link | Destination |
|---|---|
| Home | `/` |
| Our Mission | `/our-mission` |
| Services & Programs | `/services-programs` |
| For Families | `/for-families` |
| Speech Language Therapy | `/speech-language-therapy` |
| Occupational Therapy | `/occupational-therapy` |
| Physical Therapy | `/physical-therapy` |
| Counseling | `/counseling` |
| Equine-Assisted Learning | `/equine-assisted-learning` |
| Give | `/give` |
| Sponsorships | `/sponsorships` |
| Impact & Stewardship | `/impact-and-stewardship` |
| Our Partners | `/our-partners` |
| Book Online | `/book-online` |
| Payment & Insurance | `/payment-and-insurance` |
| FAQ | `/faq` |
| Contact | `/contact` |
| Shop | `/shop` |
| Our Team | `/our-team` |
| Our Horses | `/our-horses` |
| Join Our Team | `/join-our-team` |

## Wix Implementation Notes

- Build as a global footer only after testing in one page context.
- Use structured containers/strips; avoid floating text boxes.
- Do not use default blue link states.
- Use reverse logo on Forest Green; use primary logo only if footer is light.
- Save draft only. Do not publish unless Justin explicitly asks.

## Validation Checklist

| Mode | Widths | Pass criteria |
|---|---|---|
| Desktop | 1440, 1280, 1024 | Footer matches v4 intent, aligned columns, clear Donate CTA, readable contact details |
| Tablet | 900, 834, 768 | Two-column or wrapped layout is balanced, links do not crowd or overlap |
| Mobile | 430, 390, 375, 320 | Single-column order is correct, links are tappable, contact details are readable |

## Fail Conditions

- Footer uses default Wix blue link or button styling.
- Contact details are missing, unconfirmed, or differ from the approved Wix business details.
- Links route to wrong pages.
- Footer columns overlap, squeeze, or become unreadable.
- Logo is stretched, cropped, or illegible.
- Footer is built separately per page instead of globally.

## Done Means

- Footer appears globally.
- Footer uses approved colors, type, contact details, and route map.
- Desktop, tablet, and mobile validation pass.
- Draft is saved.
- `execution-plans/execution-log.md` is updated with completion notes or blockers.
