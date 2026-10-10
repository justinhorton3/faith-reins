# Wix Execution Quality Gate

Every execution plan must pass this gate before its status changes to Complete. Individual plans supply only page/component-specific checks.

## Before Build

- Confirm the selected plan, route, and required assets.
- Confirm every destination is a concrete Wix page, anchor, form, or approved external URL.
- Create named Wix anchors `#shop-products` and `#team-profiles` where referenced.
- For Wix Forms, use the named forms `Contact Inquiry` and `Appointment Request`.
- For Give, record the configured donation provider, destination, receipt behavior, and failure behavior before the plan can pass.
- Pull contact details from Wix business settings; never use sample values.
- Resolve any v4 PDF/plan conflict and record the decision in `execution-log.md`.
- Confirm the global header and footer are passing, or mark the task blocked on them.
- Apply every value in `wix-implementation-spec.md`; do not replace exact values with “approximately” or “if needed.”

## During Build

- Use the already-uploaded Wix media; do not re-upload assets.
- Complete one plan only. Do not redesign shared components inside a page task.
- Stop and record a blocker when copy, route, integration, or visual direction is missing.

## Required Verification

- Check 1440, 1280, 1024, 900, 834, 768, 430, 390, 375, and 320px.
- Confirm the correct desktop/mobile asset pair, no overlap or clipping, no default Wix blue, and working header/footer links.
- Test every page-specific CTA. Test forms, donations, menus, and anchors for success and failure behavior when present.
- Confirm keyboard focus and mobile touch targets are usable.
- Compare the rendered Wix result against the v4 mock at the relevant widths and record the screenshot result; a text-only review is insufficient for visual pass.

## Plan-Type Checks

| Plan type | Additional pass condition |
|---|---|
| Header | One global header; exact breakpoint behavior; Donate is branded and routed; drawer opens and closes. |
| Footer | One global footer; confirmed contact details; every listed link resolves. |
| Page | Correct hero pair; section order and copy match the approved source; every CTA resolves. |
| Form page | Required fields, validation, success confirmation, failure state, and privacy note are tested. |
| Giving page | Donation provider, amount flow, receipt/confirmation, and failure path are tested. |
| Shop/team/partner page | Product, profile, logo, or anchor placeholders are either replaced or explicitly labeled as unpublished content. |

## Completion Record

Add one row to `execution-log.md` with the plan, date, widths checked, links/interactions checked, pass or blocker, and Wix draft state. A saved draft alone is not a pass. Do not publish unless explicitly requested.
