# Faith Reins Design System — v6

Faith Reins is a 501(c)(3) non-profit pediatric and equine therapy practice in South Arkansas. It offers speech & language, occupational and physical therapy, plus counseling and equine-assisted learning. Sessions happen in the clinic and in the arena with a small therapy herd (Biscuit, Maple, Cowboy, Captain Carrot). The main digital product is the public website (faithreins.org, a Wix Headless build). It serves three audiences: **parents/families**, **referring providers** and **donors/sponsors**.

## Sources
- GitHub: `justinhorton3/faith-reins` (branch `main`). Read: `README.md`, `brand/brand-tokens.md`, `brand/Faith_Reins_Official_Logo_Assets_v1/README.txt` and `src/styles/global.css`. Copied: `brand/Minimalist Forest-Green Horse Emblem.png` and the hero/supporting photography.
- This project's concept files: `Faith Reins Home.dc.html` (Home 6a/6b), `Faith Reins Wordmark.dc.html` (approved lockup **L1**) and `Faith Reins Concepts.dc.html`.

### ⚠ Relation to the repo's v1.6 brand tokens
This system codifies the **refreshed direction approved in this project**, not the repo's original `brand-tokens.md`. The differences:
- Green `#173A2E` (repo: `#0B4F3A`), gold `#B08D57` (repo: `#C9A96B`), cream `#F3EEE4` (repo: `#F6F1E7`)
- Libre Caslon Display/Text + Hanken Grotesk (repo: Noto Serif + Noto Sans)
- Square buttons (repo: pill buttons)
- A typeset L1 lockup with the new horse emblem (repo: locked vector Primary Horizontal logo)

Once this direction is final, update `brand/brand-tokens.md` in the repo to match.

---

## Content fundamentals
- **Voice:** calm, warm and specific. It sounds like a clinician who is also a neighbor. It is confident without hype and faithful without preaching.
- **Person:** "we" for Faith Reins, "you/your child" for families. Talk to parents directly.
- **Casing:** sentence case for headings and body (e.g. "Five ways we help", "Every horse is chosen for temperament, then trained for therapy.").
- **Uppercase tracked labels** for eyebrows, nav, buttons and the tagline (e.g. "MEET THE HERD", "SUPPORT FAITH REINS").
- **Headlines** are short declaratives, often three beats: "Patient work, *gentle* horses, lasting change." At most one italic emphasis word per headline.
- **Be honest about stewardship.** Don't invent statistics or impact numbers. Say what gifts do ("fund therapy sessions, feed and shoe our horses, open spots on our waiting list").
- **Be clinically precise** and plain: name the actual skills (articulation, feeding and swallowing, sensory processing, gait).
- **Horses by name.** Use them as characters ("children quickly learn their names, moods and favorite treats").
- **CTAs** are verbs plus objects: "Contact us", "Send a referral", "Read the guide", "Support Faith Reins". The header uses "Support", not "Donate".
- **No emoji.** No exclamation marks in headings. The serial comma is avoided ("speech, occupational and physical therapy").

## Visual foundations
- **Color:** forest green `--fr-green` carries the brand: headings, primary buttons, the footer and green bands. Warm cream `--fr-cream` is the page field and sand `--fr-sand` is the alternate band. Gold is **accent only**:
  - gold-ink `#7A5E2E` for eyebrows on light grounds
  - light gold `#D5BC8A` on green
  - `#B08D57` for rules, underlines and the one accent CTA

  No blues, no gradients as surfaces, no new hues.
- **Type:** Libre Caslon Display (400 only) for heroes and section titles. Libre Caslon Text for feature headings, row/tile titles, serif lead paragraphs and the single italic emphasis word. Hanken Grotesk 400 for body text, and Hanken Grotesk 600 uppercase tracked .14–.34em for every label. Body copy is muted ink `#4B5249` at 16–17px with 1.65–1.7 line-height.
- **Layout:** 1280px reference width with 64px side gutters. Sections use 96–104px vertical padding. Split sections have a 72px gap. The header is a double header: a 38px green utility bar (gold tagline, phone, For Providers, Contact) over a cream main bar with 20px vertical padding. Content is often asymmetric: a 320px heading column next to a wide index list.
- **Structure through rules, not boxes:**
  - 1px hairlines `#D8CDB8` divide rows and tiles
  - a 1px green top rule heads an index or FAQ list
  - links carry a 1px gold underline at a 5px offset
- **Corners:** 0 everywhere (buttons, inputs, images, cards). **Shadows:** none in the product (presentation frames only).
- **Cards:** used sparingly. Prefer hairline-divided bands. Form panels use the paper fill `#FBF8F1` with a 1px line border. The footer gift box uses a 1px gold border at 45%.
- **Imagery:** warm, natural-light, human-centered equestrian photography (children with horses, pasture, hands-on therapy). It is never stocky or corporate. Photos are full-bleed or edge-to-edge in splits, with no frames. Never reuse a hero photo across pages.
- **Protection:** heroes use a left-to-right deep-green scrim (`--overlay-hero`, 85% → 0) so type sits on the left third. There is no blur and no text shadows.
- **Transparency:** limited to the hero scrim and cream text at 75–88% on green.
- **Motion:** minimal. Color/background transitions of .15s ease on hover. Index rows nudge their arrow 4px. No bounces, parallax or entrance animations.
- **Hover:**
  - Primary buttons darken to deep green; gold buttons lighten to light gold; outline buttons fill.
  - Text links shift to gold.
  - Nav items gain a gold underline.
  - Index rows tint sand at 50%.
- **Press/focus:** no shrink. Focus is a 2px gold outline at a 2px offset; inputs get a green border plus a light-gold ring.
- **Backgrounds:** flat color fields only. No patterns, textures or illustrations.

## Iconography
- The brand uses **no icon set**. The repo's site defines none (only a few avatar and sponsor-tier SVG placeholders), and the approved concepts use none.
- The mobile/tablet menu uses a three-line hamburger drawn from 1.5px bars (it becomes an × when open). It's the only UI glyph.
- Direction is shown with the typographic arrow **→**, and disclosure with **+ / −** set in Hanken Grotesk. The select caret is ▾.
- The **horse emblem** (`assets/logo/horse-mark-{green,gold,cream}.png`) is the only pictorial mark. Never redraw or trace it. Minimum size is 24px tall.
- If functional icons become necessary (phone, mail, map pin, menu), use **Lucide** from CDN at 1.5px stroke, colored with `currentColor` in green or cream. ⚠ This is a substitution, not a brand-supplied set.
- No emoji, ever.

## Logo
The primary logo is lockup **L1**: the horse emblem, then FAITH REINS in Libre Caslon Text tracked .28em with a hairline stroke (0.3–0.6px by size) for extra weight, then the tagline "PEDIATRIC & EQUINE THERAPY" (Hanken 600, .34em) between gold rules. The rules never extend past the wordmark width.
- **Tones:** light (green on cream) and dark (cream on green, with a light-gold tagline; a gold horse is allowed).
- **Clear space:** 10% of the logo height on every side.
- **Minimum widths:** 180px for the horizontal lockup, 24px tall for the horse alone.
- Use the `Lockup` component. Don't restyle the wordmark. The lockup never changes across breakpoints; on mobile it only scales down (xs) and keeps the gold tagline.

---

## Index
- `styles.css` — entry point (imports only)
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `assets/logo/` — horse emblem master PNG plus transparent green/gold/cream marks
- `assets/heroes/` — paired desktop/mobile hero photography for every page
- `assets/horses/` — herd portraits
- `assets/imagery/` — supporting clinic photo
- `assets/merch/` + `assets/merch-artwork/` — shop images and print-ready artwork (new logo)
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/`:
  - `core/` — Button, TextLink, Eyebrow
  - `brand/` — HorseMark, Lockup
  - `forms/` — TextField, Select, Checkbox
  - `navigation/` — SiteHeader, SiteFooter
  - `layout/` — Section, Split
  - `content/` — Testimonial, CredentialStrip, PhotoBand/PhotoStrip, Hero, SectionHeading, TherapyIndex, AudienceTiles, SplitFeature, GiftCallout, FAQItem/FAQList, InfoGrid, Steps, CheckList, CTABand, Prose, ProfileCard/ProfileGrid, PhotoSlot
  - `commerce/` — ProductCard, GiveForm
  - `core/responsive.jsx` — useBreakpoint (mobile <768 ≤ tablet <1024 ≤ desktop), gutter(), sectionY()
- `ui_kits/website/` — responsive build of all 25 pages (see its README for routes, breakpoints and launch gaps)
- `Faith Reins Site v6.dc.html` — review board: every page at 1440 / 768 / 375
- `assets/heroes/{desktop,mobile}/` — paired hero crops for every page; `assets/horses/`, `assets/merch/`, `assets/sponsor/`
- `SKILL.md` — Agent Skill entry point

### Intentional additions
No source component library exists, so the components are derived from the approved Home concept and the repo's `global.css` patterns (forms, FAQ, CTA/gift box). Select and Checkbox were added to complete the intake form.
