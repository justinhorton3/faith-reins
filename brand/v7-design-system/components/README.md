# Component reference

Open [examples.html](examples.html). Load `../foundations/styles.css` then `components.css`. Reference classes are prefixed `fr-` to avoid accidental overlap with existing website styles. Components target semantic HTML/Astro; no React framework dependency is introduced.

| Component | Contract | Required states |
|---|---|---|
| Brand lockup | Exact horizontal SVG; descriptive home link; reserved dimensions | light/dark; full subtitle at every width |
| Header | Utility strip, brand, primary nav, Support, mobile menu | collapsed/expanded; Escape close; focus returned |
| Button / link | `<button>` for action, `<a>` for navigation | primary, accent, outline; hover/focus/disabled/busy |
| Field | Explicit label, help/error IDs, `aria-describedby` | idle/focus/error/disabled; programmatic error association |
| Status | `role=status` for updates, `role=alert` for errors | loading/success/error/empty; visible recovery path |
| Hero | Unique paired photography; protected text; one primary CTA | desktop/mobile crop; narrow title wrapping |
| Service index | Five semantic links; number/title/description | responsive list; focus and hover |
| FAQ | Native `<details><summary>` | open/closed; keyboard |
| Product card | Product title/image; link to detail; approved/companion status | filter-visible/hidden; original/derived image distinction |
| Product options | Explicit group labels and selected state | unavailable/selected/size-required; supplier-defined options |
| Footer | Inverse full lockup; audience routes; giving path | readable columns; stacked narrow view |

Demo forms are local examples and never submit information. Demo size buttons illustrate selection only; their labels are not a verified supplier range. Adapt functionality to existing Wix integrations during migration. `reference.js` has menu Escape handling and selected-state examples; actual integration still needs browser, focus/contrast and assistive-technology QA.
