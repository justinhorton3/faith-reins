# Faith Reins Wix Build Sequence

This is the execution plan for executing the execution plans. Each task is one bounded Wix session and must pass `quality-gate.md` before the next task.

## Resolve First

1. Confirm real contact details and hours.
2. Verify the named Wix Forms `Contact Inquiry` and `Appointment Request`, the `#shop-products` and `#team-profiles` anchors, and the configured donation provider.
3. Resolve v4/PDF copy conflicts and record decisions in `execution-log.md`.

## Shared Components

1. Header desktop: exact geometry, logo, nav, Donate styling, and routes.
2. Header tablet/mobile: breakpoints, drawer order, and touch targets.
3. Footer desktop/tablet/mobile: contact details, links, and stacking.
4. Shared media: verify existing files and folders; do not upload again.

Do not start page work while header or footer is blocked.

## Conversion Path

Build and gate: Home, Services And Programs, For Families, Book Online, Contact, Give.

## Supporting Pages

Build and gate service detail pages, provider/payment/FAQ pages, mission/team/horse pages, then partner/giving/shop/careers pages.

## Final QA

Run the shared quality gate across every route, save drafts, and publish only after explicit approval.

## Session Boundary

One session equals one plan, one route/component, and one pass/fail decision. Do not spend another session polishing a passing component without a documented defect.
