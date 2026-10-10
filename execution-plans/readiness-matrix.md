# Execution Plan Readiness Matrix

This matrix is the review result for every plan in this repository. “Executable” means the plan can be run as a bounded Wix task after the shared prerequisites in `build-sequence.md` pass. It does not mean the resulting Wix page has already been verified.

## Shared prerequisites

These must pass before any production page is built:

- Header desktop and tablet/mobile tasks pass `quality-gate.md`.
- Footer uses confirmed Wix business details.
- The v4 copy decision is recorded in `execution-log.md`.
- `Contact Inquiry` and `Appointment Request` Wix Forms exist.
- The Give page's donation provider and success/failure behavior are configured.

## Production plans

| Plan | Readiness after shared prerequisites | Remaining plan-specific input |
|---|---|---|
| Home | Executable | Confirm final v4 copy decision |
| Services And Programs | Executable | Confirm final v4 copy decision |
| For Families | Executable | None beyond shared prerequisites |
| Book Online | Executable | Create/test `Appointment Request` form |
| Contact | Executable | Create/test `Contact Inquiry` form and confirm business details |
| Give | Conditional | Configure donation provider, receipt, and failure state |
| Speech Language Therapy | Executable | Confirm v4 copy decision |
| Occupational Therapy | Executable | Confirm v4 copy decision |
| Physical Therapy | Executable | Confirm v4 copy decision |
| Counseling | Executable | Confirm v4 copy decision |
| Equine-Assisted Learning | Executable | Confirm v4 copy decision |
| Payment And Insurance | Executable | Confirm factual insurance/payment copy |
| For Referring Providers | Executable | Confirm referral requirements |
| FAQ | Conditional | Supply approved questions and answers |
| Our Mission | Executable | Confirm v4 copy decision |
| Our Team | Conditional | Supply approved bios/headshots; create `#team-profiles` |
| Our Horses | Executable | Confirm profile copy and supporting assets |
| Join Our Team | Executable | Confirm whether open roles are listed |
| Sponsorships | Conditional | Approve tier/recognition copy or use clearly labeled inquiry-only content |
| Impact And Stewardship | Conditional | Approve stories/metrics or use qualitative copy only |
| Our Partners | Conditional | Supply approved partner logos or omit the grid |
| Shop (site extension, not a v4 screen) | Conditional | Confirm Wix Stores products, approve shop design, and create `#shop-products` |

## Excluded

| Plan | Status |
|---|---|
| Pasture Hero | Hold; no approved route or page brief |

Every row still requires the shared quality gate and a completion entry in `execution-log.md`.
