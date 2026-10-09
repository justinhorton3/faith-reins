# Media And QA Execution Plan

## Goal

Keep Wix media organized and make every build step verifiable without reopening the full project context.

## Media Rules

- Desktop heroes: upload from `images/heroes/desktop`.
- Mobile heroes: upload from `images/heroes/mobile`.
- Original masters: keep in repo under `images/masters`; upload to Wix only if needed for recropping.
- Supporting assets: upload from `images/supporting`.
- Do not reuse hero images across pages.
- Preserve filenames in Wix Media Manager.

## Recommended Wix Media Folders

| Folder | Source |
|---|---|
| `Site Files / heros / desktop` | `images/heroes/desktop` |
| `Site Files / heros / mobile` | `images/heroes/mobile` |
| `Site Files / masters` | `images/masters` |
| `Site Files / supporting` | `images/supporting` |

## Responsive QA

- Desktop: 1440, 1280, 1024.
- Tablet: 900, 768.
- Mobile: 430, 390, 375, 320.
- Confirm no overlap, no clipped text, no repeated hero image, correct mobile image, readable CTA, and working header/footer links.

## Done Means

- The page matches the v4 mock intent.
- Desktop, tablet, and mobile each pass visual inspection.
- Links and buttons route to the expected page.
- Wix draft is saved.
