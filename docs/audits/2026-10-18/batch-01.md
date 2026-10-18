# Batch 01 — Giving, clinical identities and callback prompts

Scope: FR-01 through FR-05. The original audit remains unchanged. These changes are for review on `Audit_10.18.26`; they do not certify a live fix.

| Finding | Branch implementation | Remaining release work |
| --- | --- | --- |
| FR-01: unchecked fee still charged in the displayed total | Fee state starts off; checkbox, total, button, analytics and catalog options share the same choice. Base gift is sent separately from the optional fee flag, avoiding a fee-on-fee amount. | Verify checkout totals and receipts in an approved test flow after release. |
| FR-02: monthly promise has no monthly choice | Monthly CTA carries `frequency=MONTH`; supported frequency is selected on arrival. Unsupported monthly giving is disclosed instead of silently creating a different frequency. Versioned release configuration enables one-time and monthly giving. | Apply the campaign settings below, then verify actual recurring checkout. |
| FR-03: presets differ from the agreed selection | Website suggests $50, $100, $250, $500 and Other when the campaign accepts custom amounts; configured limits are respected. Release configuration aligns the native campaign presets too. | Apply the campaign settings below. |
| FR-04: sample clinician identities/portraits | Sample fallback rows removed. The shared build/CMS renderer suppresses sample names and known avatar placeholders; it does not invent missing identities, credentials or portraits. | Owner-approved real clinician profiles can be added separately; retest CMS hydration. |
| FR-05: callback prompt invites medical detail | Callback-only presentation uses a scheduling-preference prompt and adjacent guidance linked to the textarea. Wire targets and backend required flags are preserved; general contact/sponsorship prompts are unchanged. | Verify the deployed form, confirmation and delivery using approved test data. |

## Verification

- `npm run test:audit`: eight regression tests pass. The tests mount the actual browser script in a DOM fixture and intercept every network call. They cover initial fee state, toggles and catalog payload, monthly selection, unsupported-frequency recovery, amount limits and cent rounding, callback prompt scoping/help, CMS placeholder suppression, and read-only/revision-guarded campaign configuration.
- `npm run build`: public Astro build succeeds (95 output pages, including the error page).
- `python scripts/wix-postbuild.py`: hosting transformations succeed; the monthly link becomes `/give.html?frequency=MONTH#gift`.
- `node scripts/verify-navigation.mjs`: six menus and 43 destinations/sections pass.
- `node scripts/verify-shop-category-routes.mjs`: all six shop category route contracts pass.
- `node --test tests/account-service.test.mjs`: existing account service regression checks pass.
- `git diff --check`: passes.

The new DOM fixture dependency is development-only and pinned in the lockfile. The audit regression workflow runs the focused tests and public build. Node test files are excluded from the Playwright test collector.

No production code, campaign settings, submissions or transactions were changed by this batch. Device/rendering and transaction coverage remains open as recorded in the baseline report.

## Campaign configuration at release

Read on October 18: `Faith Reins Giving`, campaign `6f213c29-26a1-478d-9461-40b5164c26e1`, revision `1`, accepting one-time gifts, custom amounts enabled with a $5 minimum, and presets $25/$50/$100/$250.

`scripts/configure-audit-giving.mjs` prepares a partial update that enables `ONE_TIME` and `MONTH`, keeps custom giving enabled, preserves the existing $50/$100/$250 preset IDs, removes the $25 suggestion, and adds a fixed-ID $500 suggestion. It preserves unrelated campaign settings and donation history. It reads the current revision immediately before a write and does not retry conflicts.

Use a site-scoped admin bearer token for the Faith Reins site (`2d8c6050-5730-4bed-9c7a-266ca7bd00b4`) in `WIX_ADMIN_TOKEN`. Keep the token in the process environment; never commit or expose it in the frontend.

Read-only plan:

```sh
node scripts/configure-audit-giving.mjs --check
```

After the branch is approved and the corrected frontend is deployed, apply the versioned configuration as part of that release:

```sh
node scripts/configure-audit-giving.mjs --apply
```

The mutation response must confirm the exact intended settings. If it fails or conflicts, inspect current state before another attempt. Then retest one-time/monthly choices, default fee-off behavior, fee opt-in and opt-out, $500/custom amounts, actual checkout frequency/amount, and the receipt. A successful code build does not replace these live checks.

API contracts were verified against official Wix documentation:

- [Get Donation Campaign](https://dev.wix.com/docs/api-reference/business-solutions/donations/donation-campaigns/get-donation-campaign)
- [Update Donation Campaign](https://dev.wix.com/docs/api-reference/business-solutions/donations/donation-campaigns/update-donation-campaign)

The schema confirms partial updates, current revision, `ONE_TIME`/`MONTH` values, stable preset IDs and the optional 2.9% fee. The actual monthly capability is controlled by the campaign; the frontend does not invent unsupported checkout options.
