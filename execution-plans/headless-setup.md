# Headless Wix Setup

The site is built as a **Wix Headless** site: pages are code in this repo, and Wix runs the business side (forms, donations, store). This replaces the Wix-editor approach in older plans; keep following the page plans for content, layout, and routes, but build them as code instead of in the Wix editor.

## Site

| Item | Value |
|---|---|
| Wix site name | Faith Reins Headless |
| Site ID (metaSiteId) | `2008223c-2538-4263-9893-6a9b391ded03` |
| OAuth client ID (public, used by the frontend) | `578fbd9d-fb1f-4285-b7d1-7063b33ac62a` |
| Currency | USD |
| Domain | Not connected yet. Connect `faithreins.com` at launch. |

The older editor site "Faith Reins" (`ca922363-e319-4b9f-874a-ba6bfc6e3fb0`) is **not** used. Wix does not allow converting an editor site to headless through the API.

## Installed apps

eCom (checkout), Wix Stores, Wix Donations, Wix Forms.

## Forms

| Form | ID | Used on |
|---|---|---|
| Contact Inquiry | `23cf24ab-86ff-4595-8a3b-7535900f4a23` | `/contact` |
| Appointment Request | `31632052-e00f-473d-9edd-e64c699b83ef` | `/book-online` |

## Donations

| Campaign | ID | Settings |
|---|---|---|
| Faith Reins General Fund | `fea961a8-acc5-428b-801c-b64f4c6603f4` | One-time and monthly; $25 / $50 / $100 / $250 presets; custom amount from $5; donor note on; cover-fee prompt on; no goal |

Accepting real donations requires a Wix premium plan and a connected payment method (dashboard > Accept Payments).

## Build approach

- Wix's headless guide for this setup: https://www.wix.com/skills/wix-headless-kit/guides/api-run.md (the run through the Wix MCP, since this workspace's shell cannot reach Wix).
- Frontend ships as static files (HTML/CSS/JS) uploaded to the site with the Wix MCP upload tool. Every upload replaces the whole file set.
- Forms and donations talk to Wix from the browser through the Wix JavaScript SDK loaded from `https://esm.sh/@wix/sdk`, using the OAuth client ID above.

## Open items (owner)

- Real contact details and hours (footer, Contact page).
- Donation impact wording for each amount, if wanted.
- Shop products.
- Delete the extra test branch `claude/connection-test` on GitHub (optional).

## Static build (2026-10-10)
- Sponsorship Inquiry form: `17fc908b-9d0d-4554-8b4f-f45d009b1721` (`/sponsorships`).
- Donation campaign `fea961a8-acc5-428b-801c-b64f4c6603f4`: presets $50 / $100 / $250, one-time + monthly, custom min $5.
- Source in `site/`; run `site/build-all.sh`, output in `site/dist/` (gitignored). Deploy = upload `dist` as a file bundle via Wix UploadHeadlessWebsiteFiles (replaces whole file set).
- Live URL: https://headless-thikydrdrrl-justinhorton3-140d.wix-site-host.com
- Dashboard: https://manage.wix.com/dashboard/2008223c-2538-4263-9893-6a9b391ded03
- Astro migration deferred; a GitHub Action / Wix CLI deploy would avoid pasting bundles.
