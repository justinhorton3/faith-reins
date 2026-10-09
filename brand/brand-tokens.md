# Faith Reins Brand Tokens

Source: `brand/Faith_Reins_Brand_Guidelines_v1.6.pdf`

Note: the repo PDF is a size-optimized copy of the latest v1.6 brand guidelines so it can live in GitHub with the rest of the Wix build system.

Use this file as the fast implementation reference for Wix work. If this file conflicts with the PDF, the PDF wins.

## Brand Character

- Strength: confident and capable without becoming aggressive.
- Trust: disciplined geometry and restrained typography.
- Warmth: cream, warm gold, and authentic equestrian imagery.
- Modern heritage: traditional equestrian cues simplified into a clean contemporary system.

## Colors

| Token | Hex | RGB | Use |
|---|---:|---|---|
| Forest Green | `#0B4F3A` | `11, 79, 58` | Primary brand color, logo, headings, key UI |
| Warm Gold | `#C9A96B` | `201, 169, 107` | Accent only, not primary replacement |
| Cream | `#F6F1E7` | `246, 241, 231` | Light field/background |
| Black | `#111111` | `17, 17, 17` | Monochrome text |
| White | `#FFFFFF` | `255, 255, 255` | Reverse text/logo |

## Typography

| Role | Typeface | Weight | Notes |
|---|---|---:|---|
| Logo wordmark | Locked vector artwork | N/A | Do not re-typeset FAITH REINS |
| Formal headings | Noto Serif | 600/SemiBold | Use for refined headline moments |
| Body, navigation, UI, captions | Noto Sans | 400-700 | Default digital type family |
| Seal typography | Noto Serif SemiBold | 600 | Production seal type is outlined |

## Logo Rules

- Website/navigation uses the Primary Horizontal logo.
- Use approved SVG or exported master artwork; do not redraw, trace, regenerate, stretch, skew, rotate, outline, shadow, or add effects.
- Maintain at least 10% of total logo height as clear space on every side.
- Minimum digital sizes:
  - Horizontal logo: 180 px wide.
  - Stacked logo: 140 px wide.
  - Horse symbol: 24 px high.
  - Seal: 120 px wide.
- Horizontal logo internal geometry is locked:
  - Horse-to-title gap: 50 pt in the master artwork.
  - Tagline rules must not extend beyond the FAITH REINS title width.

## Digital Header Rules

- Use the Primary Horizontal logo.
- Keep the header shallow.
- Logo must remain clearly legible.
- Use Forest Green, Cream, and restrained Warm Gold accents.
- Avoid default Wix blue unless it is only an editor selection state, never public UI.

## Photography Rules

- Use warm, authentic equestrian photography with natural light.
- Imagery should feel human-centered, not corporate or stock-heavy.
- Do not reuse hero imagery across pages unless the page plan explicitly allows it.

## Button Rules

| Button | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary CTA | `#0B4F3A` | `#FFFFFF` | `#0B4F3A` | Donate, appointment, primary page action |
| Secondary CTA | Transparent or `#F6F1E7` | `#0B4F3A` | `#0B4F3A` | Secondary navigation/action |
| Accent CTA | `#C9A96B` | `#111111` or `#0B4F3A` | `#C9A96B` | Use sparingly |

## Implementation Guardrails

- Do not invent new brand colors.
- Do not use blue buttons.
- Do not use decorative gradients as primary brand surfaces.
- Do not crop logos so the tagline or horse becomes unreadable.
- Do not make Shop an icon in the header; Shop is a normal text nav link.
