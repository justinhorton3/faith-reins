# Faith Reins — Page QA Review Guide

Every page on faithreins.com is a marketing asset, a trust signal, and a conversion tool. This guide sets the standard.

---

## Purpose & Philosophy

We review at the standard of a Fortune 25 consumer brand because the stakes for each family we serve are just as high. The bar is not "does it look okay" — the bar is **"would a skeptical parent trust this site enough to call us today?"**

**How to use this guide**

1. Screenshot each breakpoint before the review session (375px, 768px, 1440px).
2. Work through every checklist item for that page and breakpoint — no skipping.
3. Log every issue with its severity (P0/P1/P2) and the exact page + breakpoint.
4. P0 issues block all other work until resolved. P1 issues block page sign-off. P2 issues are batched per sprint.
5. A page is not done until it passes every item on all three breakpoint checklists with zero P0 or P1 issues open.

---

## Primary Persona — The Mother

Every design and copy decision is filtered through one question: **does this earn her trust?**

**Who she is**
- Mother of a child ages 2–12 with a developmental, physical, or emotional challenge
- Lives in South Arkansas; may have driven past the facility or been referred by a pediatrician
- Not a medical professional — she knows something is hard for her child but is not sure what she needs
- Time-poor, emotionally invested, and skeptical of anything that feels clinical, corporate, or vague

**What she fears**
- That she will call and not hear back, or be made to feel like a burden
- That the cost will be too high or insurance will not cover it
- That the program is not right for her child's specific situation
- That the team will not actually understand her child

**What earns her trust**
- Real photos of real children and real staff (not stock photography)
- A clear, low-friction first step: one phone number, one request form
- Warm, plain-language copy that sounds like a person, not a brochure
- Social proof: credentials, partnerships, parent testimonials
- Answers to the questions she is already asking (FAQ, payment, what to expect)
- A website that works perfectly on her phone

**Review lens to apply on every page:** *If this mother landed here first, would she feel seen, would she understand what to do next, and would she trust us enough to call?*

---

## Brand Standards

Any violation of these rules is automatically a P1 or higher. There are no exceptions.

### Color palette — only these values are permitted

| Token | Hex | Usage |
| --- | --- | --- |
| `--green` | `#0B4F3A` | Primary headings, buttons, nav, footer bg |
| `--gold` | `#C9A96B` | Accents, price highlights, hover underlines |
| `--cream` | `#F6F1E7` | Icon badge fill, warm accent backgrounds |
| `--paper` | `#FBF8F1` | Section alternating background |
| `--sage` | `#E9E6D8` | Secondary badges, note cards |
| `--white` | `#FFFFFF` | Card backgrounds, form fields |
| `--muted` | (CSS var) | Body text secondary — never headings |

No other colors. No inline hex values in templates. No opacity hacks that produce off-brand tones.

### Typography
- Headings (h1–h3): serif, color: `--green`, `text-wrap: balance`
- Body: sans-serif, 16px minimum, color: `--black` or `--muted`, line-height ≥ 1.5
- Labels / overlines: sans-serif, uppercase, letter-spacing 0.06em
- Minimum contrast: 4.5:1 for body text, 3:1 for large text (WCAG AA)
- No font sizes below 14px anywhere on mobile

### Imagery
- Only authentic photography: real children, real staff, real facility
- No stock photography with posed clinical or generic imagery
- Heroes: subject must be clear on mobile crop (check `--focus` alignment)
- All images served as WebP; no JPEG or PNG in page content
- Alt text required on every `<img>` — blank alt only for purely decorative elements
- Images must load sharp: no pixelation, no visible compression artifacts

### Voice & copy
- Sentences under 25 words
- No medical jargon without a plain-language follow-on
- Second-person ("your child," "your family") — never third-person clinical
- CTAs: verb-first, specific; never "Click here" or "Learn more" as standalone labels
- No placeholder copy (`TBD`, `[insert text]`) visible anywhere

### Buttons & CTAs
- Maximum 2 CTAs in any hero; maximum 1 primary button per section
- Primary: dark green fill, white text
- Secondary: outlined, green border and text
- Accent (gold): reserved for giving/donation flows only
- Touch target: 44px minimum height, 44px minimum width on mobile

### Icons
- Only icons defined in `src/lib/lib.mjs` `P` object — no inline SVGs, no third-party icon fonts
- Icon badge: 72px circle (desktop), 52px (`--sm` variant); fill: `--cream`; color: `--green`
- Icons must be legible at 24×24px

---

## Desktop Review Checklist (1440px)

Set browser to 1440×900. Screenshot full page before reviewing.

### Global — every page
- [ ] Logo renders sharp, correct lockup, links to /
- [ ] Nav items all present, correct labels, no overflow
- [ ] "Donate" pill in nav: green, white text, destination /give
- [ ] Header 76px tall; does not obscure content on scroll
- [ ] Footer: logo (white), address, phone, email, hours all correct
- [ ] Footer nav links all present and functional
- [ ] Footer contact form renders and is not broken
- [ ] Copyright year is current (2026)
- [ ] No horizontal scroll at full viewport
- [ ] Browser tab title: "Page Name | Faith Reins"

### Hero section
- [ ] Hero image loads and is sharp (no blur, no gray placeholder)
- [ ] Correct desktop hero image for this page
- [ ] H1 in serif, correct color, readable against image
- [ ] Body copy legible, fits column without overflow
- [ ] CTA button(s) present, correct labels, correct destinations
- [ ] No more than 2 CTAs; primary CTA is leftmost / most dominant
- [ ] Hero height feels editorial and proportional

### Service cards / grid sections
- [ ] Correct column count (3-col, 4-col, or 5-col as designed)
- [ ] Cards equal height within each row
- [ ] Icon badges: 72px circle, `--cream` bg, `--green` icon, correct icon per service
- [ ] Card titles: serif, `--green`, correct size hierarchy
- [ ] Card body text: muted, correct line-height, no orphaned words
- [ ] "Learn more" links present where specified
- [ ] No card has placeholder text or missing content

### Quad section (home page)
- [ ] 4-column grid: photo | text | photo | text layout intact
- [ ] Images 320px tall, `object-fit: cover`, `border-radius: 6px`
- [ ] Correct images (team photo, facility photo — not horse-biscuit)
- [ ] Text columns vertically centered with adjacent image

### Faith/Giving section (home page)
- [ ] 3-column layout: left text | center image | right white card
- [ ] Center image fills column top-to-bottom (position absolute, object-fit cover)
- [ ] Right card: white bg, `--green` headings, $100/month in `--gold`
- [ ] Left text: "Rooted in faith. Guided by care." present
- [ ] "Give monthly" CTA: dark green fill, white text, destination /give
- [ ] No dark overlay on the center image

### CTA bands
- [ ] Background color matches design
- [ ] Heading and body readable against background
- [ ] Button(s) correctly styled and functional

### FAQ / Steps / Checks
- [ ] FAQ: accordion opens/closes; "+" changes to "−" when open
- [ ] Steps: numbered circles are `--green`, correct sequence
- [ ] Check lists: check icon renders; bold label + muted description

### Forms
- [ ] Form renders (not just a noscript fallback)
- [ ] All fields labeled; submit button present and styled
- [ ] No Wix form errors in the console

### Typography spot-check (3 pages per sprint)
- [ ] H1 ≥ 40px, H2 ≥ 28px, H3 ≥ 20px, body 16–18px
- [ ] No rogue font sizes or weights outside the type scale
- [ ] No text overflows its container

---

## Tablet Review Checklist (768px)

Set browser to 768×1024 (iPad portrait). Use Chrome DevTools device emulation.

### Navigation
- [ ] Nav collapses or stays full — verify which is correct and that it works
- [ ] Drawer opens and closes without jank; all items accessible
- [ ] Logo correctly sized in the header

### Layout reflow
- [ ] Hero image: desktop image in use at 768px (mobile swap is at 767px)
- [ ] 5-col service grid reflows to a readable multi-row grid
- [ ] 4-col quad (home) reflows to 2×2 grid
- [ ] 3-col faith/giving reflows to 2-col with center image spanning full width
- [ ] Footer grid reflows to 2 columns
- [ ] Card grids: no orphan cards (1 card alone in a row meant for 3)

### Typography
- [ ] H1 does not overflow or wrap awkwardly against the hero
- [ ] Body text remains ≥ 15px; long card titles don't clip

### Touch targets
- [ ] Every link, button, and nav item is at least 44×44px
- [ ] CTA buttons ≥ 140px wide, 44px tall
- [ ] FAQ accordion summaries ≥ 44px tall; footer links ≥ 44px

### Images
- [ ] All images load and are sharp
- [ ] Hero image fills width without gaps; quad images maintain 320px height

### Forms
- [ ] Forms remain usable; no fields cut off; inputs ≥ 44px tall

### Horizontal scroll
- [ ] No element causes horizontal scroll at 768px

---

## Mobile Review Checklist (375px)

Set browser to 375×812 (iPhone 14 / SE). **This is the primary review breakpoint.**

### First impression (above the fold)
- [ ] Logo readable at mobile scale (≥ 120px wide)
- [ ] Hamburger icon visible, 44×44px tap target
- [ ] Hero loads mobile-optimized WebP (`<source media="(max-width: 767px)">`)
- [ ] H1 large, bold, immediately readable without scrolling
- [ ] At least 1 CTA visible above the fold
- [ ] Primary CTA ≥ 280px wide (or 100% minus gutters)
- [ ] No text clipped, overlapped, or buried by the hero image

### Navigation drawer
- [ ] Hamburger opens the drawer; "×" close button present, 44×44px
- [ ] All nav items and "Donate" button present and tappable
- [ ] Drawer does not prevent page scroll when closed

### Typography & readability
- [ ] Body text ≥ 16px (prevents iOS auto-zoom on input focus)
- [ ] Line length comfortable (~60 chars max: content width − 32px gutters)
- [ ] H2 ≥ 24px; minimum 16px gutter on both sides of all text
- [ ] Muted text passes 4.5:1 contrast on `--paper` background

### Layout & content stacking
- [ ] All grids stacked to single column
- [ ] Images stack above their associated text block
- [ ] Hero mobile crop shows the key subject (not cropped to background)
- [ ] Cards full width, padding maintained
- [ ] Quad section: each image + text pair stacks vertically, image first
- [ ] Faith/giving section: stacks left panel | center image | right card top-to-bottom

### CTAs on mobile
- [ ] Primary CTA buttons ≥ 85% screen width
- [ ] Secondary CTAs also full-width (`.btn-row` on mobile)
- [ ] CTAs in the thumb zone (bottom two-thirds of screen)

### Forms
- [ ] Fields ≥ 44px tall; labels visible above each field
- [ ] Two-column layouts fully collapse to single column
- [ ] Submit button full width, ≥ 48px tall

### Images & media
- [ ] All images load; no broken image icons
- [ ] No pixelation, stretching, or squashed aspect ratios
- [ ] Background images fill containers with no white-space gaps

### Performance / scroll
- [ ] No horizontal scroll at any point
- [ ] No jank or stutter during scroll
- [ ] Sticky header stays in place (no jumping or duplication)
- [ ] Footer fully visible without cutting off

---

## Page Inventory & Priority Order

Sprint order: P0 conversion pages first, then trust pages, support pages, operational pages.  
Status: leave blank → mark **Pass**, **Issues**, or **Blocked** (blocked = unresolved P0).

| # | Route | Page Name | Sprint | Desktop | Tablet | Mobile | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | / | Home | S1 | | | | |
| 2 | /book-online | Request an Appointment | S1 | | | | |
| 3 | /services-programs | Services & Programs | S1 | | | | |
| 4 | /occupational-therapy | Occupational Therapy | S1 | | | | |
| 5 | /physical-therapy | Physical Therapy | S1 | | | | |
| 6 | /speech-language-therapy | Speech-Language Therapy | S1 | | | | |
| 7 | /counseling | Counseling | S1 | | | | |
| 8 | /equine-assisted-learning | Equine-Assisted Learning | S1 | | | | |
| 9 | /for-families | For Families | S2 | | | | |
| 10 | /our-team | Our Team | S2 | | | | |
| 11 | /our-mission | Our Mission | S2 | | | | |
| 12 | /contact | Contact | S2 | | | | |
| 13 | /faq | FAQ | S2 | | | | |
| 14 | /give | Give | S2 | | | | |
| 15 | /payment-and-insurance | Payment & Insurance | S3 | | | | |
| 16 | /for-referring-providers | For Referring Providers | S3 | | | | |
| 17 | /our-horses | Our Horses | S3 | | | | |
| 18 | /our-partners | Our Partners | S3 | | | | |
| 19 | /impact-and-stewardship | Impact & Stewardship | S3 | | | | |
| 20 | /sponsorships | Sponsorships | S3 | | | | |
| 21 | /shop | Shop | S3 | | | | |
| 22 | /join-our-team | Join Our Team | S4 | | | | |
| 23 | /privacy | Privacy Policy | S4 | | | | |
| 24 | /accessibility | Accessibility | S4 | | | | |
| 25 | /donation-policy | Donation Policy | S4 | | | | |

---

## Severity Classification

| Severity | Name | Criteria | SLA | Examples |
| --- | --- | --- | --- | --- |
| **P0** | Conversion blocker | Prevents completing the primary action, makes the page unreadable, or immediately destroys trust | Fix before any other work proceeds | Broken CTA link, missing hero image, text invisible against background, form non-functional, horizontal scroll on mobile |
| **P1** | Trust / brand violation | Degrades credibility or brand integrity; page functions but experience is wrong | Fix before page is marked done | Wrong service icon, off-brand color, placeholder copy, CTA label mismatched to destination, desktop hero on mobile |
| **P2** | Polish issue | Cosmetic or minor content issue; does not break the experience | Batch and fix per sprint | Spacing inconsistency, card heights slightly off, minor copy tweak, font size 1–2px off spec |

**Escalation rule:** P0s are never deferred. Two or more P1s on the same component elevate to P0.

---

## Action Plan

Four sprints, sequential. Do not advance until all P0 and P1 issues from the current sprint are resolved.

### Sprint 1 — Conversion pages (pages 1–8)
Goal: A first-time visitor can land on any of these pages, understand Faith Reins, and reach the booking or contact flow on all three breakpoints.

| Session | Pages | Focus |
| --- | --- | --- |
| 1A | / | Full review: hero, services grid, quad, faith/giving, footer |
| 1B | /book-online | Form render and submit flow |
| 1C | /services-programs | Hub page: card grid, how-to-start steps, links to service pages |
| 1D | /occupational-therapy, /physical-therapy | Service detail template: icons, imagery, journey steps |
| 1E | /speech-language-therapy, /counseling | Same template; verify copy doesn't bleed between pages |
| 1F | /equine-assisted-learning | Horse imagery, ground-based language, links to /our-horses |

### Sprint 2 — Trust pages (pages 9–14)
Goal: A skeptical mother can verify credentials, understand who she would work with, and contact the team without friction.

| Session | Pages | Focus |
| --- | --- | --- |
| 2A | /for-families | Path-to-care steps; most persona-specific page on the site |
| 2B | /our-team | Staff photography, credentials, warm copy — no stock imagery |
| 2C | /our-mission | Faith framing, values cards, why-horses section |
| 2D | /contact | Form render; address, phone all correct |
| 2E | /faq | Accordion function; 4.5:1 contrast in expanded state |
| 2F | /give | Donation flow; amounts, monthly toggle, Wix integration |

### Sprint 3 — Support & discovery pages (pages 15–21)
Goal: Returning visitors and referring providers can find what they need; the site feels complete.

| Session | Pages | Focus |
| --- | --- | --- |
| 3A | /payment-and-insurance, /for-referring-providers | Utility pages; clarity over design, no broken links |
| 3B | /our-horses | Horse photography, names, card layout |
| 3C | /our-partners, /impact-and-stewardship | Logo grids, partner cards, impact numbers |
| 3D | /sponsorships, /shop | Giving flow (sponsorships); merch grid (shop) |

### Sprint 4 — Operational pages (pages 22–25)
Goal: Legal and accessibility pages are present, correct, and readable.

| Session | Pages | Focus |
| --- | --- | --- |
| 4A | /join-our-team | Careers copy and CTA |
| 4B | /privacy, /accessibility, /donation-policy | Prose pages; typography, legibility, correct legal copy |

### How to log issues during review
1. Screenshot the issue at the failing breakpoint.
2. Note the page route, breakpoint, component, and severity (P0/P1/P2).
3. Describe the current state and expected state in one sentence each.
4. Update the Page Inventory table to "Issues" with a brief note.
5. P0: stop the session, fix immediately, re-screenshot, then continue.
6. P1/P2: continue the session; fix in the same session if trivial, batch otherwise.

---

## Acceptance Criteria

A page is done when every item below is true. No exceptions.

### Zero blockers
- [ ] Zero P0 issues open at any breakpoint
- [ ] Zero P1 issues open at any breakpoint
- [ ] All issues found during review are resolved and re-verified

### Functional
- [ ] Every link goes to the correct destination and returns 200
- [ ] Every CTA performs the correct action
- [ ] Forms render, accept input, and submit without console errors
- [ ] No JavaScript errors in the browser console on page load
- [ ] All images return 200 (no broken icons, no 404 assets)

### Brand
- [ ] Only approved palette tokens used — no off-brand colors
- [ ] Only approved icons from `lib.mjs` `P` object used
- [ ] Photography is authentic; zero stock imagery
- [ ] All copy reviewed against voice standard
- [ ] No placeholder copy anywhere on the page

### Breakpoints
- [ ] Desktop (1440px): all checklist items passed
- [ ] Tablet (768px): all checklist items passed
- [ ] Mobile (375px): all checklist items passed
- [ ] No horizontal scroll at any breakpoint

### Accessibility
- [ ] Body text ≥ 4.5:1 contrast against its background
- [ ] Large text ≥ 3:1 contrast
- [ ] All images have descriptive alt text (or empty alt for decorative)
- [ ] All form inputs have visible labels
- [ ] All interactive elements keyboard-operable
- [ ] Mobile body text ≥ 16px (prevents iOS auto-zoom)

### Performance
- [ ] All images are WebP in page content
- [ ] Hero uses `<picture>` with separate desktop and mobile sources
- [ ] Hero image has `fetchpriority="high"`; others have `loading="lazy"`

When every checkbox above is ticked, update the Page Inventory table to **Pass**.
