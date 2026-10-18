# Release account self-service

Release the protected shopper and donor account area from main after merging PR #38.

- Source implementation: `feat/account-self-service`; all seven checks passed at `4d58db9d3e786b1758a755de2a1df968c1bb81c4`.
- Owner confirmed successful preview login on October 17, 2026.
- Includes Overview, My Orders, My Giving, recorded Recurring Giving, Profile & Settings, Order Details, issued receipts and shipment tracking.
- Uses the existing linked Wix site and managed authentication. Public assets and the protected Worker are uploaded separately.
- Post-release checks cover six noindex account pages, signed-out API denial, private build-file protection, all navigation destinations and approved shop photography.
- Recurring billing changes and cancellation remain team-assisted. Product availability and checkout are unchanged.

Execution plan: `execution-plans/account-self-service.md`.
