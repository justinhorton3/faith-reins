# Faith Reins Website Build

Source assets and execution plans for the Faith Reins Wix site build.

## Build System

Use this repository as the low-context source of truth for the Wix implementation. Each execution plan is intentionally small enough to run independently in a future session without reopening the full v4 mockup or reloading the whole project history.

For each Wix build run, open only:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. The one execution plan being executed
5. `execution-plans/site-map-and-routes.md` when changing navigation, buttons, slugs, or menus

Every plan also inherits `execution-plans/quality-gate.md`. Use `execution-plans/build-sequence.md` to select the next bounded task.
Every plan also inherits `execution-plans/wix-implementation-spec.md` for exact Wix implementation values.
Every page plan also follows `execution-plans/page-build-spec.md`; the v4 screen inventory is in `execution-plans/v4-mock-inventory.md`.

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
| Build Rules | [Site Map And Routes](execution-plans/site-map-and-routes.md) | N/A | Ready | Canonical nav labels, slugs, CTA targets, dropdown/mobile drawer rules |
| Build Rules | [Wix Editor Checklist](execution-plans/wix-editor-checklist.md) | N/A | Ready | Pre-build, responsive QA, link QA, and handoff checklist |
| Build Rules | [Quality Gate](execution-plans/quality-gate.md) | N/A | Ready | Required pass/fail gate for every component and page |
| Build Rules | [Build Sequence](execution-plans/build-sequence.md) | N/A | Ready | Bounded order for executing every plan |
| Build Rules | [Readiness Matrix](execution-plans/readiness-matrix.md) | N/A | Active | Plan-by-plan prerequisites and execution status |
| Build Rules | [Wix Implementation Spec](execution-plans/wix-implementation-spec.md) | N/A | Ready | Exact Wix geometry, typography, controls, and responsive rules |
| Build Rules | [V4 Mock Inventory](execution-plans/v4-mock-inventory.md) | N/A | Reviewed | Complete screen inventory and V4 primary actions |
| Build Rules | [Page Build Specification](execution-plans/page-build-spec.md) | N/A | Ready | Required page-specific implementation fields |
| Template | [Component Plan Template](execution-plans/template-component-plan.md) | N/A | Ready | Required structure for shared component plans |
| Template | [Page Plan Template](execution-plans/template-page-plan.md) | N/A | Ready | Required structure for page plans |
| Log | [Execution Log](execution-plans/execution-log.md) | N/A | Active | Lightweight handoff/status log |
| Shared | [Header](execution-plans/shared-header.md) | `images/supporting/logo.webp` | Ready V3 | Build-ready global header rules for nav, Donate CTA, Shop text link, drawer behavior, and responsive validation |
| Shared | [Footer](execution-plans/shared-footer.md) | `images/supporting/logo-white.webp` | Ready V3 | Build-ready global footer rules for contact details, sitemap links, donation CTA, mobile stacking, and responsive validation |
| Shared | [Media And QA Rules](execution-plans/shared-media-and-qa.md) | `images/ASSET-MANIFEST.csv` | Ready | Asset naming, Wix upload foldering, breakpoint validation |
| Page | [Home](execution-plans/page-home.md) | `images/heroes/desktop/hero-home-desktop.webp` | Ready V3 | Build-ready homepage plan with section order, copy, assets, responsive rules, links, and validation |
| Page | [Our Mission](execution-plans/page-our-mission.md) | `images/heroes/desktop/hero-our-mission-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Services And Programs](execution-plans/page-services.md) | `images/heroes/desktop/hero-services-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Speech Language Therapy](execution-plans/page-speech-language-therapy.md) | `images/heroes/desktop/hero-speech-language-therapy-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Occupational Therapy](execution-plans/page-occupational-therapy.md) | `images/heroes/desktop/hero-occupational-therapy-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Physical Therapy](execution-plans/page-physical-therapy.md) | `images/heroes/desktop/hero-physical-therapy-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Counseling](execution-plans/page-counseling.md) | `images/heroes/desktop/hero-counseling-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Equine-Assisted Learning](execution-plans/page-equine-assisted-learning.md) | `images/heroes/desktop/hero-equine-assisted-learning-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [For Families](execution-plans/page-for-families.md) | `images/heroes/desktop/hero-for-families-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Payment And Insurance](execution-plans/page-payment-and-insurance.md) | `images/heroes/desktop/hero-payment-and-insurance-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [For Referring Providers](execution-plans/page-for-referring-providers.md) | `images/heroes/desktop/hero-for-referring-providers-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Book Online](execution-plans/page-book-online.md) | `images/heroes/desktop/hero-book-online-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [FAQ](execution-plans/page-faq.md) | `images/heroes/desktop/hero-faq-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Give](execution-plans/page-give.md) | `images/heroes/desktop/hero-give-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Sponsorships](execution-plans/page-sponsorships.md) | `images/heroes/desktop/hero-sponsorships-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Impact And Stewardship](execution-plans/page-impact-and-stewardship.md) | `images/heroes/desktop/hero-impact-and-stewardship-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Our Partners](execution-plans/page-our-partners.md) | `images/heroes/desktop/hero-our-partners-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Our Team](execution-plans/page-our-team.md) | `images/heroes/desktop/hero-our-team-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Our Horses](execution-plans/page-our-horses.md) | `images/heroes/desktop/hero-our-horses-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page | [Join Our Team](execution-plans/page-join-our-team.md) | `images/heroes/desktop/hero-join-our-team-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Page extension | [Shop](execution-plans/page-shop.md) | `images/heroes/desktop/hero-shop-desktop.webp` | Conditional | Not represented in the v4 screen set; requires approved shop design/product content |
| Page | [Contact](execution-plans/page-contact.md) | `images/heroes/desktop/hero-contact-desktop.webp` | Ready V2 | Detailed page-level copy, assets, layout, responsive rules, links, and validation |
| Asset/Page Candidate | [Pasture Hero](execution-plans/page-pasture-hero.md) | `images/heroes/desktop/pasture-hero-desktop.webp` | Hold | Use only if a future page needs a general campus/ranch hero |

## Working Rules

- Open only the README and the single execution plan needed for the next work chunk.
- Also open `brand/brand-tokens.md` and `execution-plans/wix-build-rules.md` for every Wix build chunk.
- Open `execution-plans/site-map-and-routes.md` before changing a navigation item, menu behavior, page slug, or CTA link.
- Use `execution-plans/wix-editor-checklist.md` before marking any Wix draft chunk complete.
- Do not reuse a hero image across pages.
- Use the paired desktop/mobile hero images for each page.
- Validate every page at desktop, tablet, and mobile before marking it complete.
- Do not allow public Wix default blue buttons/links unless the v4 mock explicitly requires them.
- If a plan lacks enough detail to match the v4 mock, upgrade the plan before building.
- Save Wix draft after each completed chunk; publish only when explicitly requested.
