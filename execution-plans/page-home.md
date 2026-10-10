# Home Page Execution Plan

## Status

Ready V3. This plan is the build-ready source of truth for the homepage Wix build after the global header and footer are corrected.

## Required Context

Open only these files for the home build run:

1. `README.md`
2. `brand/brand-tokens.md`
3. `execution-plans/wix-build-rules.md`
4. `execution-plans/site-map-and-routes.md`
5. `execution-plans/shared-header.md`
6. `execution-plans/shared-footer.md`
7. This execution plan

Open `Faith-Reins-Website-Design-Review-v4.pdf` only to resolve exact spacing, image crop, or section order questions. If this plan and the v4 mock conflict, the v4 mock wins.

## Page Role

The homepage is the primary entry page. It must quickly communicate Faith Reins' mission, connect families to care, introduce services and programs, and keep donor/support paths visible without overpowering the appointment path.

## Route And Navigation

| Item | Value |
|---|---|
| Wix page name | Home |
| Slug | `/` |
| Header active state | Home |
| Primary CTA path | `/book-online` |
| Secondary CTA path | `/services-programs` |
| Donation path | `/give` |

## Assets

| Asset | Repo path | Wix folder | Use |
|---|---|---|---|
| Desktop hero | `images/heroes/desktop/hero-home-desktop.webp` | `Site Files / heros / desktop` | Required |
| Mobile hero | `images/heroes/mobile/hero-home-mobile.webp` | `Site Files / heros / mobile` | Required |
| Original master | `images/masters/hero-home.jpg` | `Site Files / masters` | Recrop only |
| Supporting clinical image | `images/supporting/home-clinical.webp` | `Site Files / supporting` | Mission/service intro if v4 shows supporting image |

## Copy

| Element | Copy |
|---|---|
| Hero headline | People. Horses. Brighter futures. |
| Hero body | Pediatric therapy, counseling and equine-assisted learning in South Arkansas. |
| Primary CTA | Request an appointment |
| Secondary CTA | Explore services |
| Intro headline | Helping children and families heal, grow and thrive |
| Intro body | Faith Reins pairs evidence-based care with the calm connection of horses to support children, teens and families. |
| Services headline | Services & Programs |
| Services body | Evidence-based pediatric therapy, counseling and equine-assisted learning for children and families in South Arkansas. |
| Family path headline | A clearer path to care |
| Giving headline | Help make care more accessible |
| Final CTA headline | Ready to take the next step? |

## Section Order

1. **Hero**
2. **Mission intro**
3. **Services preview**
4. **Family path**
5. **Giving/support band**
6. **Final CTA**
7. **Global footer**

Do not add a marketing splash page before the real homepage content. The first screen must be the usable homepage hero and primary action.

## Section Details

## Layout Instructions

Use the section order and responsive rules below as the page layout specification. Do not add extra sections during this build task.

### 1. Hero

- Use full-bleed desktop hero at desktop/tablet and mobile hero at mobile.
- Text sits over the image in a readable safe area.
- Use the implementation-spec overlay `rgba(17,17,17,0.22)` when contrast testing requires it; otherwise use no overlay.
- Primary CTA: Request an appointment -> `/book-online`.
- Secondary CTA: Explore services -> `/services-programs`.
- Header should sit above hero cleanly with no overlap unless v4 intentionally uses overlay navigation.

### 2. Mission Intro

- Use a constrained section on White or Cream.
- Headline: Helping children and families heal, grow and thrive.
- Body copy: Faith Reins pairs evidence-based care with the calm connection of horses to support children, teens and families.
- If using `home-clinical.webp`, place it as a supporting image, not as a second hero.
- CTA: Explore services -> `/services-programs`.

### 3. Services Preview

Use three cards or structured columns:

| Card | Copy intent | Destination |
|---|---|---|
| Pediatric Therapy | Introduce speech, occupational, and physical therapy as family-centered pediatric care. | `/services-programs` |
| Counseling | Introduce compassionate child, teen, and family emotional support. | `/counseling` |
| Equine-Assisted Learning | Introduce guided horse experiences focused on confidence, trust, communication, and resilience. | `/equine-assisted-learning` |

Cards must share consistent heights, spacing, heading style, and link treatment. Do not use nested cards.

### 4. Family Path

Use a simple step sequence:

1. Ask questions.
2. Request an appointment.
3. Visit Faith Reins.
4. Begin a care plan.

CTA options:

- Request an appointment -> `/book-online`
- For families -> `/for-families`

### 5. Giving/Support Band

- Keep this visually warm and secondary to the homepage appointment path.
- Headline: Help make care more accessible.
- Route Donate/Give action to `/give`.
- If including a support explanation, keep it short and mission-focused.
- Avoid making donation the only obvious action on the homepage.

### 6. Final CTA

- Repeat the appointment path and contact path.
- Recommended CTAs:
  - Request an appointment -> `/book-online`
  - Contact us -> `/contact`

## Desktop Layout

Target widths: 1440, 1280, 1024.

- Global header and footer must already be in place.
- Hero should fill the first viewport below the header or closely match the v4 mock height.
- Hero copy aligns to the v4 page grid and remains readable.
- Services preview should appear as three aligned cards/columns at 1280+.
- At 1024, services may remain three columns only if card text does not squeeze; otherwise use a responsive wrap.
- Section spacing should feel polished and intentional, not like stacked default Wix strips.

## Tablet Layout

Target widths: 900, 834, 768.

- Hero copy must remain inside safe area.
- Services preview can become two-plus-one or stacked depending on fit.
- Family path steps can become two columns.
- No section should rely on hover-only interaction.
- Header tablet behavior follows `shared-header.md`.

## Mobile Layout

Target widths: 430, 390, 375, 320.

- Use `images/heroes/mobile/hero-home-mobile.webp`.
- Hero headline must remain readable and not cover the main subject awkwardly.
- CTA buttons should appear early and stack cleanly.
- Services cards stack in this order: Pediatric Therapy, Counseling, Equine-Assisted Learning.
- Family path steps stack in order.
- Donation/support band should appear after the care path, not before the service explanation.
- No clipped text or tiny card body copy at 320 px.

## Links And CTAs

| Label | Destination |
|---|---|
| Logo/Home | `/` |
| Request an appointment | `/book-online` |
| Explore services | `/services-programs` |
| Pediatric Therapy | `/services-programs` |
| Counseling | `/counseling` |
| Equine-Assisted Learning | `/equine-assisted-learning` |
| For families | `/for-families` |
| Donate/Give | `/give` |
| Contact us | `/contact` |

## Wix Build Notes

- Build with structured strips/containers; avoid free-floating elements.
- Use approved colors from `brand/brand-tokens.md`; no default Wix blue.
- Use Noto Sans for body, UI, buttons, and card copy.
- Use Noto Serif SemiBold only where v4 shows a formal headline style.
- Preserve asset filenames in Wix Media Manager.
- Use the paired desktop/mobile hero crops.
- Do not reuse another page's hero image.
- Save draft only. Do not publish unless Justin explicitly asks.

## Validation Checklist

| Mode | Widths | Pass criteria |
|---|---|---|
| Desktop | 1440, 1280, 1024 | Header/footer present, hero matches v4 intent, desktop hero used, services align, no public blue, no overlap |
| Tablet | 900, 834, 768 | Hero safe area works, sections wrap cleanly, header does not wrap, CTAs remain tappable |
| Mobile | 430, 390, 375, 320 | Mobile hero used, CTA visible early, cards and steps stack cleanly, no clipped text |

## Fail Conditions

- Header or footer is missing.
- Desktop hero is used on mobile when the mobile crop exists.
- Hero text is unreadable or covers the subject awkwardly.
- Primary CTA does not route to `/book-online`.
- Default Wix blue appears in public UI.
- Services cards are uneven, nested, clipped, or cramped.
- Donation path overwhelms the family appointment path.

## Done Means

- Homepage matches the v4 mock intent at desktop, tablet, and mobile.
- Correct hero images and supporting assets are used.
- Header, footer, links, and CTAs match `site-map-and-routes.md`.
- Draft is saved in Wix.
- `execution-plans/execution-log.md` is updated with completion notes or blockers.
