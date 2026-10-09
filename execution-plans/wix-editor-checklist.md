# Wix Editor Checklist

## Purpose

Use this before marking any Wix component or page build complete. The goal is to catch alignment, responsiveness, font, color, image, link, and state issues while the build context is still small.

## Before Editing

| Check | Pass criteria |
|---|---|
| Current plan opened | Only the relevant execution plan, README, brand tokens, build rules, and route map are open |
| Brand reference opened | `brand/brand-tokens.md` is checked for colors, fonts, buttons, logo rules, and spacing notes |
| Mock reference identified | The v4 mock page/component being matched is known before editing |
| Media source confirmed | Every required image exists in `images/` and is uploaded to the matching Wix Media Manager folder |
| Route confirmed | Page slug, header link, footer link, and CTA destinations match `site-map-and-routes.md` |

## Build Checks

| Area | Pass criteria |
|---|---|
| Layout | Matches v4 mock structure, spacing, alignment, and visual hierarchy |
| Typography | Uses approved brand fonts and scale; no Wix default fallback styles |
| Color | Uses approved brand colors; no default blue links/buttons unless explicitly specified |
| Images | Correct desktop/mobile image pair, correct crop/focal point, no reused page hero unless plan allows it |
| Header | Logo, nav, Donate CTA, Shop text link, active/hover states, tablet behavior, and mobile drawer work |
| Footer | Contact details, sitemap links, donation CTA, brand colors, and mobile stacking work |
| Interactions | Buttons, links, forms, menus, accordions, and hover/focus states are connected and usable |
| Accessibility | Text contrast is readable, controls have clear labels, and keyboard/focus behavior is not broken |

## Responsive QA

Validate at these widths before marking complete:

| Device class | Widths | Required result |
|---|---|---|
| Desktop | 1440, 1280, 1024 | Header remains aligned, page content matches mock, no awkward crops |
| Tablet | 834, 768 | Nav moves cleanly into drawer as needed, no overlap or wrapping glitches |
| Mobile | 430, 390, 375 | Drawer works, CTAs fit, sections stack cleanly, text is readable |

## Link QA

| Link type | Required result |
|---|---|
| Header links | Match `site-map-and-routes.md` exactly |
| Footer links | Match `site-map-and-routes.md` exactly |
| Primary CTAs | Route to the correct action page, usually `/give` or `/book-online` |
| Secondary CTAs | Route to the most specific supporting page |
| External links | Open correctly and do not replace critical internal flow unless intentional |

## Handoff

Before ending a build run:

- Save the Wix draft.
- Do not publish unless explicitly requested.
- Update `execution-plans/execution-log.md` with what changed, what was verified, and any blockers.
- If a page/component does not match the v4 mock, leave the status as blocked or needs revision and state the exact issue.
