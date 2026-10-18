# Batch 02 — Update requests, CTA roles and terminology

Scope: FR-06 through FR-10. Four findings have branch changes; FR-07 is explicitly deferred. The baseline audit is unchanged. This record does not certify live fixes.

| Finding | Branch implementation | Remaining verification |
| --- | --- | --- |
| FR-06: newsletter uses a general contact form | A scoped update-request presentation asks for name and email, removes phone/message inputs, and submits an explicit newsletter request to the existing Contact inbox. Button, explanation and confirmation consistently describe an email-update request. Privacy policy is linked. Backend-required name/email and original wire targets are preserved. A changed required schema stops rendering rather than silently dropping requirements. | Verify delivery and handling of requests after release. Automated mailing-list enrollment is unverified; the UI does not claim it. A dedicated subscriber backend with optional name remains a follow-up. |
| FR-07: insurance wording conflict | Deferred by owner on October 18; no payer-acceptance wording changed. | Operations must confirm participation before the conflict can be resolved. See owner context below. |
| FR-08: secondary CTA role changes by device | Heroes and CTA bands use the existing outlined button component for secondary navigation on both light and dark surfaces. Device-only text-link-to-button rules removed. Actions can wrap at intermediate widths. Focus outlines use green on light surfaces and cream on dark surfaces. | Browser, keyboard, contrast and full desktop/tablet/mobile rendering checks remain open. |
| FR-09: callback terminology | Payment, FAQ, Contact and Services now say Request a callback for the callback funnel. Contact explains that availability and scheduling follow the conversation. The established `/book-online` route is retained. | Verify deployed destinations, form confirmation and delivery. |
| FR-10: Layers taxonomy | Three catalog collection labels and the wearable collection lookup use Outerwear, aligning cards and recommendations with category navigation. Internal group IDs remain compatible with existing filters. | Recheck deployed shop cards, filters and recommendations. |

## Owner context: insurance is deferred

On October 18 the owner confirmed that Faith Reins has its provider number but is not technically open. The existing payment and invoice information is still being developed. The immediate private-insurance targets are **Blue Cross Blue Shield, UnitedHealthcare and QualChoice**. These are credentialing targets, not confirmed active payer participation.

The owner requested that this item be skipped for now. No insurer names, provider number or new acceptance claims have been published or added to runtime content. Existing payer language remains an open audit finding, not an approved statement of coverage.

## CTA role and state matrix

These roles apply at desktop (1024px and above), tablet (768–1023px) and mobile (767px and below). On mobile, hero and band actions stack to full width; their visual role does not change.

| Role | Light surface | Dark/photo surface | Hover | Keyboard focus | Disabled / busy |
| --- | --- | --- | --- | --- | --- |
| Primary navigation | Filled green `.btn` | Filled gold `.btn--accent` | Green deepens; gold lightens | Visible 2px outline, 3px offset; green on light, cream in heroes/green CTA bands | Navigation anchors have no disabled/busy state; omit unavailable destinations instead. |
| Secondary navigation in hero/band | Transparent, green border/text `.btn--outline` | Transparent, cream border/text `.btn--outline-inv` | Fills with border color; text switches to the opposite surface color | Same surface-aware outline as primary | Same navigation rule. |
| Editorial navigation | Underlined `.tlink`; shop editorial link retains its sentence-case treatment and in-page down arrow | Inverse text-link treatment where used | Existing text color change | Visible outline | Navigation links remain links. |
| Form action | Existing native `.btn` button | Existing accent variant where configured | Existing button treatment | Visible outline | Native disabled button during request; Sending… label; restored on failure. |

Ordinary editorial links, disclosure controls, quantity controls and menu controls keep their existing semantics. This batch changes hero/band secondary actions, not every link into a button.

## Newsletter integration boundary

The live Contact schema was read without modification using the official [Get Form](https://dev.wix.com/docs/api-reference/crm/forms/form-schemas/get-form) contract. It requires name, email and message. In the newsletter presentation the message is a fixed, explicit request for email updates; it is not a fabricated visitor message or a claim of completed mailing-list enrollment. General contact retains its required message, and callback presentation remains scoped separately. No form, automation, contact or submission was changed in Wix during this work.

## Verification

- `npm run test:audit`: 12 passing tests, including four new DOM regressions exercising the actual browser script with mocked network requests: reduced fields, validation and exact request payload, truthful confirmation, failure/retry behavior, changed-schema recovery, and unaffected general contact requirements.
- `npm run build`: 95 output pages build successfully.
- `python scripts/wix-postbuild.py`: hosting link transformations pass.
- `node scripts/verify-navigation.mjs`: six persona menus and 43 destinations/sections pass.
- `node scripts/verify-shop-category-routes.mjs`: all six shop category contracts pass.
- Generated-markup checks across all 94 registered pages: 10 hero pairs and 30 CTA-band pairs use outlined secondary buttons; all 21 links to `/book-online` say Request a callback; all 15 Outerwear recommendation/catalog cards use the consistent label.
- `git diff --check`: passes. FAQ insurance source is unchanged; payment changes are limited to callback CTA labels.
- Responsive rendering and live submission testing remain open. Automated checks do not substitute for those reviews.

No merge, deployment or publication is included in this batch.
