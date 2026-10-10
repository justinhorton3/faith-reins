# Wix Implementation Specification

This file converts the design plans into repeatable Wix settings. It applies to every production component and page plan. Use Wix containers, stacks, and grids; do not use free-positioned elements for layout.

## Global canvas

| Setting | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Breakpoints | 1024–2400 | 768–1023 | 320–767 |
| Content max width | 1200 px | calc(100% - 64 px) | calc(100% - 40 px) |
| Outer side padding | 32 px | 32 px | 20 px |
| Section vertical padding | 96 px | 72 px | 56 px |
| Grid gap | 32 px | 24 px | 20 px |
| Card radius | 0 px unless the v4 mock shows one | 0 px | 0 px |

Use a 12-column grid on desktop, 8 columns on tablet, and one column on mobile. Keep all page content inside the 1200 px container.

## Typography

Use Noto Serif for formal headings and Noto Sans for body/UI. If Wix does not provide either family, stop and record the selected substitute before continuing.

| Role | Family | Desktop | Tablet | Mobile | Weight | Line height |
|---|---|---:|---:|---:|---:|---:|
| Hero H1 | Noto Serif | 64 px | 52 px | 38 px | 600 | 1.05 |
| Page H1 | Noto Serif | 56 px | 46 px | 36 px | 600 | 1.08 |
| Section H2 | Noto Serif | 42 px | 36 px | 30 px | 600 | 1.12 |
| Card H3 | Noto Serif | 28 px | 26 px | 24 px | 600 | 1.15 |
| Body large | Noto Sans | 20 px | 19 px | 18 px | 400 | 1.5 |
| Body | Noto Sans | 16 px | 16 px | 16 px | 400 | 1.55 |
| Navigation | Noto Sans | 16 px | 15 px | 16 px | 500 | 1.2 |
| Button | Noto Sans | 16 px | 16 px | 16 px | 700 | 1 |
| Caption | Noto Sans | 14 px | 14 px | 14 px | 400 | 1.4 |

Do not use Wix automatic text resizing. Set max text widths: hero body 520 px, section body 680 px, card body 360 px.

## Color and controls

- Forest Green `#0B4F3A`: primary headings, primary buttons, dark fields.
- Warm Gold `#C9A96B`: rules, small accents, focus/active details only.
- Cream `#F6F1E7`: light sections and header field.
- Black `#111111`: body text.
- White `#FFFFFF`: reverse text and dark-field logo.
- Primary button: Forest Green fill, white text, 48 px high, 32 px horizontal padding, 8 px radius.
- Secondary button: transparent or Cream fill, Forest Green text/border, 48 px high, 32 px horizontal padding, 8 px radius.
- Focus state: 2 px Warm Gold outline with 2 px offset.
- Hover state: Forest Green fill darkens to `#083B2C`; no blue.
- Minimum interactive target: 44 × 44 px.

## Header

- Global header height: 92 px desktop/tablet, 72 px mobile.
- Header field: Cream `#F6F1E7`.
- Inner container: 1200 px; horizontal alignment centered.
- Logo: `images/supporting/logo.webp`, 210 px wide desktop/tablet, 164 px mobile.
- Desktop nav gap: 24 px; Donate is the only button.
- Tablet at 900 px: logo, Services & Programs, For Families, Donate, menu.
- Tablet at 834/768 px: logo, Donate, menu.
- Mobile: logo and menu; Donate remains visible only when it fits at 390/430 px.
- Drawer: full-height Cream panel, 20 px padding, links in the route-map order, 52 px row height.

## Footer

- Full-width Forest Green field; inner container 1200 px.
- Desktop: brand/contact column 4 columns, link groups 8 columns.
- Tablet: two-column layout with 24 px gap.
- Mobile: one column, 24 px gap, 52 px link rows.
- Use `images/supporting/logo-white.webp` at 210 px desktop and 164 px mobile.
- Contact content must come from confirmed Wix business settings.

## Hero pattern

- Desktop/tablet hero minimum height: 560 px; mobile minimum height: 440 px.
- Use the plan's paired desktop/mobile asset.
- Image: cover; focal point set manually to preserve the subject.
- Content max width: 560 px; left aligned to the 1200 px grid.
- Overlay: `rgba(17,17,17,0.22)` only when required for contrast; never obscure the subject.
- H1 and body spacing: 20 px; CTA row spacing: 16 px; hero content vertical center.

## Page sections

- Section heading to body: 16 px.
- Body to CTA: 28 px.
- Section-to-section gap is controlled by the global section padding.
- Three-card desktop grids become two columns at tablet and one column at mobile.
- Equal-height cards use a Wix stack with `align-items: stretch`; never manually pad individual cards to force alignment.
- Forms use one column on mobile and two balanced columns only when labels remain readable.

## Required Wix IDs and integrations

- Form: `Contact Inquiry`.
- Form: `Appointment Request`.
- Shop anchor: `#shop-products`.
- Team anchor: `#team-profiles`.
- Give page must name its donation provider and document receipt, success, cancel, and failure states before build completion.

## Build rule

Implement one plan at a time. Match this specification first, then apply page-specific copy, assets, and section order. A visual deviation requires a screenshot comparison and an entry in `execution-log.md`; do not solve it by improvising new values.
