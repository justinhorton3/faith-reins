# Faith Reins Website Build

Source assets and execution plans for the Faith Reins Wix site build.

## Build System

Use this repository as the low-context source of truth for the Wix implementation. Each execution plan is intentionally small enough to run independently in a future session without reopening the full v4 mockup or reloading the whole project history.

For each Wix build run, open only:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. The one execution plan being executed

Recommended execution order:

1. Build shared components first: Header, Footer, global image/media rules.
2. Build the Home page.
3. Build top-level navigation pages.
4. Build service/detail pages.
5. Build giving/shop/support pages.
6. Run responsive QA after each page and once again across the whole site.

## Execution Plan Index

| Area | Plan | Primary image | Status | Notes |
|---|---|---|---|---|
| Brand | [Brand Tokens](brand/brand-tokens.md) | `brand/Faith_Reins_Brand_Guidelines_v1.6.pdf` | Ready | Fast implementation reference for colors, type, logo, buttons |
| Build Rules | [Wix Build Rules](execution-plans/wix-build-rules.md) | `images/ASSET-MANIFEST.csv` | Ready | Context-loading rules, media rules, validation widths, pass/fail rules |
| Template | [Component Plan Template](execution-plans/template-component-plan.md) | N/A | Ready | Required structure for shared component plans |
| Template | [Page Plan Template](execution-plans/template-page-plan.md) | N/A | Ready | Required structure for page plans |
| Log | [Execution Log](execution-plans/execution-log.md) | N/A | Active | Lightweight handoff/status log |
| Shared | [Header](execution-plans/shared-header.md) | `images/supporting/logo.webp` | Ready V2 | Detailed global nav, Donate CTA, responsive hamburger rules |
| Shared | [Footer](execution-plans/shared-footer.md) | `images/supporting/logo-white.webp` | Ready V2 | Detailed contact details, sitemap links, donation CTA |
| Shared | [Media And QA Rules](execution-plans/shared-media-and-qa.md) | `images/ASSET-MANIFEST.csv` | Ready | Asset naming, Wix upload foldering, breakpoint validation |
| Page | [Home](execution-plans/page-home.md) | `images/heroes/desktop/hero-home-desktop.webp` | Ready | Primary homepage build |
| Page | [Our Mission](execution-plans/page-our-mission.md) | `images/heroes/desktop/hero-our-mission-desktop.webp` | Ready | About/mission page |
| Page | [Services And Programs](execution-plans/page-services.md) | `images/heroes/desktop/hero-services-desktop.webp` | Ready | Services hub |
| Page | [Speech Language Therapy](execution-plans/page-speech-language-therapy.md) | `images/heroes/desktop/hero-speech-language-therapy-desktop.webp` | Ready | Service detail |
| Page | [Occupational Therapy](execution-plans/page-occupational-therapy.md) | `images/heroes/desktop/hero-occupational-therapy-desktop.webp` | Ready | Service detail |
| Page | [Physical Therapy](execution-plans/page-physical-therapy.md) | `images/heroes/desktop/hero-physical-therapy-desktop.webp` | Ready | Service detail |
| Page | [Counseling](execution-plans/page-counseling.md) | `images/heroes/desktop/hero-counseling-desktop.webp` | Ready | Service detail |
| Page | [Equine-Assisted Learning](execution-plans/page-equine-assisted-learning.md) | `images/heroes/desktop/hero-equine-assisted-learning-desktop.webp` | Ready | Program detail |
| Page | [For Families](execution-plans/page-for-families.md) | `images/heroes/desktop/hero-for-families-desktop.webp` | Ready | Family intake hub |
| Page | [Payment And Insurance](execution-plans/page-payment-and-insurance.md) | `images/heroes/desktop/hero-payment-and-insurance-desktop.webp` | Ready | Practical family page |
| Page | [For Referring Providers](execution-plans/page-for-referring-providers.md) | `images/heroes/desktop/hero-for-referring-providers-desktop.webp` | Ready | Provider/referral page |
| Page | [Book Online](execution-plans/page-book-online.md) | `images/heroes/desktop/hero-book-online-desktop.webp` | Ready | Appointment request page |
| Page | [FAQ](execution-plans/page-faq.md) | `images/heroes/desktop/hero-faq-desktop.webp` | Ready | Common questions |
| Page | [Give](execution-plans/page-give.md) | `images/heroes/desktop/hero-give-desktop.webp` | Ready | Primary donation page |
| Page | [Sponsorships](execution-plans/page-sponsorships.md) | `images/heroes/desktop/hero-sponsorships-desktop.webp` | Ready | Sponsor/supporter page |
| Page | [Impact And Stewardship](execution-plans/page-impact-and-stewardship.md) | `images/heroes/desktop/hero-impact-and-stewardship-desktop.webp` | Ready | Donor trust page |
| Page | [Our Partners](execution-plans/page-our-partners.md) | `images/heroes/desktop/hero-our-partners-desktop.webp` | Ready | Partners page |
| Page | [Our Team](execution-plans/page-our-team.md) | `images/heroes/desktop/hero-our-team-desktop.webp` | Ready | Team page |
| Page | [Our Horses](execution-plans/page-our-horses.md) | `images/heroes/desktop/hero-our-horses-desktop.webp` | Ready | Horse/program character page |
| Page | [Join Our Team](execution-plans/page-join-our-team.md) | `images/heroes/desktop/hero-join-our-team-desktop.webp` | Ready | Careers/recruiting page |
| Page | [Shop](execution-plans/page-shop.md) | `images/heroes/desktop/hero-shop-desktop.webp` | Ready | Merchandise page; Shop is a text nav link |
| Page | [Contact](execution-plans/page-contact.md) | `images/heroes/desktop/hero-contact-desktop.webp` | Ready | Contact/location page |
| Asset/Page Candidate | [Pasture Hero](execution-plans/page-pasture-hero.md) | `images/heroes/desktop/pasture-hero-desktop.webp` | Hold | Use only if a future page needs a general campus/ranch hero |

## Working Rules

- Open only the README and the single execution plan needed for the next work chunk.
- Also open `brand/brand-tokens.md` and `execution-plans/wix-build-rules.md` for every Wix build chunk.
- Do not reuse a hero image across pages.
- Use the paired desktop/mobile hero images for each page.
- Validate every page at desktop, tablet, and mobile before marking it complete.
- Do not allow public Wix default blue buttons/links unless the v4 mock explicitly requires them.
- If a plan lacks enough detail to match the v4 mock, upgrade the plan before building.
- Save Wix draft after each completed chunk; publish only when explicitly requested.
