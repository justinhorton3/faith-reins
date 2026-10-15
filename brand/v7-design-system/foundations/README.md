# Foundations

V6 visual language is carried forward: forest and ivory, restrained gold, Caslon + Hanken, square corners, hairline dividers and warm photography.

## Token architecture

`tokens.json` is the portable source for base palette, fonts, spacing and breakpoints. `styles.css` imports the matching CSS files. Load it before `components/components.css`. Semantic surface/text/border aliases express purpose; use `--surface-page`, `--text-heading`, etc. where practical. Production CSS integration is a later migration task.

## Layout decision

The reference implementation uses a **1312px outer container** with 64px desktop gutters, matching existing `src/styles/global.css`. Historical V6 documents use 1280px terminology. This package resolves the reference implementation to the observed production value; it does not silently restyle the website. Tablet gutters 40px / section 80px; mobile 20px / section 64px. Desktop section spacing 96px. Full navigation from 1280px, tablet/mobile drawer below that; content stacking thresholds are 1024 and 768px.

## Type and color

Hero 86px desktop / 64px tablet / 44px mobile. Section headings 46 / 40 / 32px. Body 16px, line height 1.65; lead 20px. Labels 12px, weight 600, .14em tracking. Body text must remain readable at zoom and narrow widths. Gold ink #7A5E2E is used for small labels on ivory; gold #B08D57 is an accent, not default body text.

## Photography

The [hero image reference](photography/README.md) documents page assignments, original dimensions, desktop/mobile focal points, hashes and the shop exception. [Browse the offline gallery](photography/index.html). Paired V6 desktop/mobile heroes are under `photography/heroes`. They are carried-forward reference files, not a new rights or clinical-content approval. One unique hero per page; reserve home horse-and-girl imagery for home. Keep subjects visible using page-specific focal points. Old shop hero imagery is in legacy; compose a replacement from the current approved collection only after review. No stock-like corporate imagery, heavy filters, rounded photo frames or repeated heroes.

## Fonts and licenses

Four original WOFF files are bundled for offline use. Font names follow V6: Libre Caslon Display, Libre Caslon Text and Hanken Grotesk. No new font is introduced. `fonts/FONT-NOTICE.md` records source and deployment checks; matching license notices are bundled locally; preserve them with redistributed files.
