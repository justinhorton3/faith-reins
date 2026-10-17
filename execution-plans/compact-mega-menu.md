# Compact image-led mega-menu execution plan

Status: planned; implementation has not started.
Approved direction: Justin Horton, October 17, 2026.
Branch: `feat/drowp-down-cleanup`.
Starting main commit: `3e5e7482ebdc3432efef7b1ef59d6ee2abde8430`.

## Outcome and approved design

Replace the desktop full-height panels with compact, content-sized dropdowns. Retain the existing approved small photographs beside destinations, the six navigation sections, the V7 identity, and current hosting-compatible URLs. Follow the approved second image-led mockup for layout, using actual approved site photography rather than its illustrative placeholders.

Primary navigation remains About | Therapies | For Families | For Providers | Get Involved | Shop, with Donate as a direct action. Keep phone, Contact, My Account and Bag accessible.

- Remove the large introductory headline and paragraph from dropdown rendering, including “Rooted in faith. Connected by purpose.” Keep a small section label and the overview link. Do not add duplicate brand copy elsewhere as part of this change.
- Use a three-column, usually two-row image-tile grid on desktop. Reduce thumbnails from the current 104 × 118 px toward approximately 84–96 × 70–80 px. Use approximately 19–22 px destination titles and short readable descriptions.
- Reduce oversized top, grid and footer gaps. Keep a compact overview/help/action row.
- Target approximately 320–420 px of dropdown content on a typical desktop, subject to real content and image review. Use intrinsic height with a maximum bounded by the actual space below the sticky header; scroll only when needed. Never clip destinations to meet the target.
- Replace plus/minus indicators with small decorative chevrons that rotate when open. Retain an active-section underline and a clearly labelled close control.
- Give image tiles subtle background/underline feedback on hover and keyboard focus. Keep images still and respect reduced-motion preferences.

## Isolation and integration

The account session is working on `feat/account-self-service`, PR #38. Its files were inspected before this plan was written. This branch starts independently from main and will use a separate local checkout/worktree if local implementation is needed. Never switch, reset, clean or edit the other session's checkout.

Menu work is concentrated in:
- `src/styles/navigation.css`: compact panels, tiles, responsive layout and chevrons.
- `src/scripts/navigation.js`: hover intent, pointer/keyboard coordination and dismissal.
- `src/lib/lib.mjs`: header/menu rendering and mobile thumbnail markup, after inspecting its current renderer.
- `src/lib/navigation.mjs`: preserve the existing destination registry and image mappings; make only a narrowly justified menu presentation change if required.
- Focused menu tests, preferably in a new test file to minimize shared edits.

PR #38 also changes `src/layouts/Base.astro`, `tests/navigation.spec.js`, package/configuration files and preview/release workflows. Avoid those unless necessary. Do not change account services, authentication, checkout, prices, availability or production deployment configuration in this menu task.

Before merging, inspect the latest main and account PR. Reconcile any overlapping changes with minimal edits and test the combined result. Preserve account navigation, authentication/analytics protections and the deployment runtime selected by the account work. No force pushes or whole-file replacement of shared changes. Do not release a stale branch snapshot over another session's release.

## Interaction contract

### Mouse and trackpad
- Enable hover opening only for a hover-capable fine pointer; touch must not inherit mouse-hover behavior simply because the viewport is wide.
- Start with approximately 250 ms open/switch intent and 200–300 ms leave grace; tune through testing.
- Clicking the trigger still operates the disclosure. Exactly one desktop section may be open.
- Keep the menu open while the pointer is over its trigger or panel. Maintain a safe path into the panel and toward image tiles; brief diagonal movement must not cause premature closure or unwanted section switching.
- Cancel timers on dismissal, breakpoint changes and navigation. Pointer-leave must not close a menu whose links retain keyboard focus.
- Escape, the close control and outside click dismiss. Escape/close return focus appropriately. After Escape, do not immediately reopen under a stationary pointer.

### Keyboard and accessibility
- Retain semantic links and native disclosure behavior where practical. Keep expanded state accurate; hide decorative chevrons from assistive technology.
- Enter/Space activate the focused trigger. Tab/Shift+Tab traverse visible links in logical order with a visible focus indicator.
- Hover opening must not steal keyboard focus.
- Desktop dropdowns do not trap focus. Modal tablet/mobile drawers retain correct focus containment, background inertness, scroll locking and focus return.
- Image tiles remain a single link per destination. Avoid redundant image announcements when the adjacent title supplies the accessible name.
- Preserve usable navigation when JavaScript is unavailable.

### Tablet
- Use a tap-operated Menu control when the complete desktop header no longer fits; confirm the breakpoint from actual geometry rather than device names.
- Use a two-column image layout within the available panel/drawer width. Permit internal scrolling on short landscape screens.
- Keep all six sections, overview links, My Account, Bag, Donate and close controls reachable. No hover dependency.

### Mobile
- Use the full-height drawer with expandable sections, chevrons and small thumbnails inside the expanded section. Keep one section expanded at a time.
- Provide comfortable touch targets (approximately 44 px minimum), readable text and no sideways scrolling.
- Keep Account, Contact, Bag and Donate easy to reach; preserve safe-area space and scrolling on short screens.

## Small-to-medium commit sequence

1. `docs: plan compact image-led mega menu`
   Record approved scope, isolation, interaction behavior and acceptance criteria. This is the initial plan-only commit.
2. `feat: compact desktop mega-menu image tiles`
   Remove the rendered intro block, preserve approved image mappings and destinations, size content intrinsically, tighten spacing and add chevrons.
3. `feat: add desktop hover intent and coordinated dismissal`
   Implement pointer-aware delayed opening/switching, leave grace, click support, timer cleanup and keyboard-safe dismissal.
4. `feat: refine tablet and mobile image navigation`
   Implement responsive image layouts and thumbnail accordions, confirm header breakpoints and retain account/donate/bag access.
5. `test: verify responsive menu and input behavior`
   Add meaningful browser behavior/geometry checks and run existing navigation, route and shop regressions. Record screenshot evidence and remaining device limitations.
6. `docs: record menu preview and integration readiness`
   Publish an isolated branch preview, document exact tested SHA and results, and prepare a focused PR. Review the integrated main result before any coordinated release.

## Validation matrix

| Surface | Representative viewports | Required checks |
| --- | --- | --- |
| Desktop | 1280×800, 1440×900, 1920×1080 | All six panels; compact geometry; image loading; label wrapping; hover intent; diagonal movement; click; Escape; outside click |
| Short desktop | 1280×600 | Available-height cap; every link reachable; no hidden close/action row |
| Tablet | 768×1024, 820×1180, 1024×768 | Portrait/landscape touch; two-column images where they fit; scrolling; section switching; account/bag/donate |
| Mobile | 360×800, 390×844, 430×932 | Drawer and thumbnails; one open section; touch targets; safe area; focus/scroll restoration |
| Breakpoints and accessibility | Immediately below/at/above chosen breakpoints; 200% zoom; reduced motion | No overlap or sideways scroll; logical focus; correct expanded state; touch on a wide viewport; no stuck drawer or inert background |

For each of the six sections, check the overview, all destination links/anchors, approved image source/loading and active state on representative pages. Verify homepage, a therapy page, family/provider guides, Shop/category/product pages and the Account entry. Test Account pages from the combined account/menu build once those changes are available, rather than claiming this branch contains them.

Run `npm run build`, focused Playwright checks, applicable existing navigation/shop suites, hosting route/fragment checks and repository ownership/independence checks required by CI. Repeat testing only for changes or unresolved concerns. Distinguish automated viewport/touch emulation from physical-device testing; record any untested browser/device explicitly.

## Acceptance and release checklist

- [x] Confirm current implementation and inspect concurrent account work.
- [x] Create isolated menu branch from main.
- [x] Record execution plan before menu implementation.
- [ ] Compact all six desktop panels with approved small photos.
- [ ] Replace plus/minus with accessible chevrons.
- [ ] Implement and verify hover, click, touch and keyboard behaviors.
- [ ] Verify tablet/mobile layouts, including thumbnail accordions.
- [ ] Pass focused checks, existing regressions and required CI.
- [ ] Capture desktop/tablet/mobile preview evidence for visual review.
- [ ] Reconcile latest main/account work and validate the integrated result.
- [ ] Obtain review of the concrete preview before merge/release.
- [ ] Coordinate deployment with the account session; verify live navigation and account entry after the approved release.

## Evidence and progress

October 17: Main's CSS sets `.mega-panel` to the entire available viewport height, and `.mega-panel__in` to a minimum height of 100%; its large intro and spacing compound the full-page effect. Current navigation JavaScript supports native disclosures, close/outside/Escape handling and a modal mobile drawer, but does not implement desktop hover intent. Existing desktop breakpoint is 1280 px. These are the implementation starting points, not completed changes.

Plan carried forward from the plan-only commit `2bbdfab289f27fa44c60318396b104ea2c0291eb` to `feat/drowp-down-cleanup` at Justin's request. This is the active branch for this session. The prior `feat/compact-mega-menu` branch is left untouched. No menu code, account code, main branch or production release has been changed by this plan.
