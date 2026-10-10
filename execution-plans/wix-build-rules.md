# Wix Build Rules

Use this file with `README.md`, `brand/brand-tokens.md`, and exactly one execution plan per work chunk.

Every plan also inherits `execution-plans/quality-gate.md`. Use `execution-plans/build-sequence.md` to select the next bounded task.
Every plan also inherits `execution-plans/wix-implementation-spec.md` for exact Wix geometry, type, spacing, controls, and responsive behavior.
Every page plan also inherits `execution-plans/page-build-spec.md`; use `v4-mock-inventory.md` to reconcile screen copy and primary actions.

## Operating Rules

- Build in small chunks: one shared component or one page per run.
- Do not publish unless Justin explicitly asks to publish.
- Save draft after each completed component/page.
- A saved draft is not a pass; record the quality-gate result in `execution-plans/execution-log.md`.
- Use the execution plan as source of truth for copy, images, links, responsive behavior, and validation.
- If the v4 mock, brand tokens, and Wix editor disagree, pause and record the issue in `execution-plans/execution-log.md`.
- Resolve any PDF/plan conflict before editing and record the decision in the execution log.

## Required Context For Each Run

Open only:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. The one execution plan being executed

5. `execution-plans/quality-gate.md`

6. `execution-plans/wix-implementation-spec.md`

7. `execution-plans/page-build-spec.md` for page work

Open the v4 PDF only when the plan is missing a visual detail or the implementation does not match the mock.

## Wix Media Rules

- Preserve repo filenames when uploading to Wix.
- Desktop heroes go in `Site Files / heros / desktop`.
- Mobile heroes go in `Site Files / heros / mobile`.
- Original masters go in `Site Files / masters` only when recropping is needed.
- Supporting assets go in `Site Files / supporting`.
- Do not pull assets from the Wix root folder unless the plan explicitly says to.

## Responsive Validation Widths

| Mode | Widths |
|---|---|
| Desktop | 1440, 1280, 1024 |
| Tablet | 900, 768 |
| Mobile | 430, 390, 375, 320 |

## Pass/Fail Rules

Pass means:

- The public-facing design matches the v4 mock intent.
- Approved brand colors and typography are used.
- The correct desktop/mobile images are used.
- No content overlaps, clips, or wraps awkwardly.
- Header and footer remain consistent.
- Links and CTAs route correctly.
- Draft is saved.

Fail means:

- Default Wix blue appears in public UI.
- Header/nav wraps or floats out of alignment.
- Logo is illegible, stretched, or below minimum size.
- A hero image is reused on the wrong page.
- Mobile uses the desktop crop when a mobile crop exists.
- Any required link is missing or wrong.
