# Site Map And Routes

## Goal

This is the single source of truth for Wix page names, slugs, header links, footer links, dropdown behavior, mobile drawer behavior, and CTA targets.

Open this file before editing the header, footer, buttons, menus, page slugs, or Wix page hierarchy.

## Primary Navigation

| Header label | Wix page name | Slug | Desktop placement | Tablet placement | Mobile placement | Notes |
|---|---|---|---|---|---|---|
| Home | Home | `/` | Main nav | Main nav if space allows | Drawer item | Active state on homepage |
| About | Our Mission | `/our-mission` | Main nav | Main nav if space allows | Drawer item | Label stays short in header |
| Services & Programs | Services And Programs | `/services-programs` | Main nav | Main nav or drawer based on fit | Drawer item | Links to service hub |
| For Families | For Families | `/for-families` | Main nav | Main nav or drawer based on fit | Drawer item | Family intake path |
| Get Involved | Give | `/give` | Main nav | Drawer if crowded | Drawer item | Can become a dropdown after all support pages are built |
| Shop | Shop | `/shop` | Main nav text link | Drawer if crowded | Drawer item | No icon; must match other nav links |
| Donate | Give | `/give` | Button CTA | Button CTA if space allows | Drawer CTA button | Primary action |

## Secondary Pages

| Page name | Slug | Entry points | Notes |
|---|---|---|---|
| Speech Language Therapy | `/speech-language-therapy` | Services hub, footer | Service detail |
| Occupational Therapy | `/occupational-therapy` | Services hub, footer | Service detail |
| Physical Therapy | `/physical-therapy` | Services hub, footer | Service detail |
| Counseling | `/counseling` | Services hub, footer | Service detail |
| Equine-Assisted Learning | `/equine-assisted-learning` | Services hub, footer | Program detail |
| Payment And Insurance | `/payment-and-insurance` | For Families, footer | Practical family page |
| For Referring Providers | `/for-referring-providers` | Footer, service pages | Provider referral path |
| Book Online | `/book-online` | Header/footer CTA, page CTAs | Appointment request path |
| FAQ | `/faq` | Footer, family pages | Support page |
| Sponsorships | `/sponsorships` | Give page, footer | Donor/supporter path |
| Impact And Stewardship | `/impact-and-stewardship` | Give page, footer | Donor trust path |
| Our Partners | `/our-partners` | Footer, About area | Partner recognition/path |
| Our Team | `/our-team` | About area, footer | Staff/leadership page |
| Our Horses | `/our-horses` | About/services area, footer | Equine program page |
| Join Our Team | `/join-our-team` | Footer, Contact page | Hiring/recruiting |
| Contact | `/contact` | Footer, page CTAs | Location/contact page |

## CTA Routing

| CTA copy | Destination | Usage |
|---|---|---|
| Donate | `/give` | Header, footer, giving sections |
| Request an Appointment | `/book-online` | Family/service CTAs |
| Book Online | `/book-online` | Footer and practical pages |
| Explore Services | `/services-programs` | Homepage and family pages |
| Contact Us | `/contact` | Footer and final page sections |
| Sponsor | `/sponsorships` | Giving and supporter sections |
| Partner With Us | `/our-partners` or `/contact` | Use `/our-partners` for informational links and `/contact` for direct inquiry buttons |

## Desktop Header Rules

- Keep primary nav as text links with the Donate item as the only button.
- Shop is a plain text link and must not use an icon.
- Use one row at desktop widths where possible.
- If the desktop nav becomes too crowded, shorten only the visible labels listed above; do not invent new page names.
- Do not add dropdowns until the linked destination pages are built and reviewed.

## Tablet Header Rules

- Preserve logo, the highest-priority text links that fit cleanly, and the Donate CTA.
- Move lower-priority links into the drawer before the nav wraps, overlaps, or compresses.
- Suggested tablet priority: Home, About, Services & Programs, Donate visible; For Families, Get Involved, Shop in drawer if needed.

## Mobile Header Rules

- Show logo, Donate CTA if it fits, and a hamburger/menu button.
- If Donate does not fit beside the hamburger, move Donate into the drawer as the first CTA.
- Drawer order: Donate, Home, About, Services & Programs, For Families, Get Involved, Shop, Contact.
- Drawer links must use the same labels and destinations as this file.

## Change Control

Any route, label, or CTA change must be made here first, then mirrored in affected execution plans.
