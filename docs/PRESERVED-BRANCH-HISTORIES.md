# Preserved branch histories — October 15, 2026

This archive commit preserves the four branch tips below as additional Git parents. Their complete original files and ancestry remain reachable from this branch. Its working tree starts from cleaned main; the old runtime changes have NOT been applied to main. Use the exact snapshot links or `git switch --detach <sha>` to inspect or recover a source tree.

| Former branch | Exact snapshot | Commits absent from main at review |
| --- | --- | ---: |
| `fix/wix-headless-deploy-config` | [`b28004e`](https://github.com/justinhorton3/faith-reins/tree/b28004e117e4f77bb01a36a4e1e8c2d94c1d717f) | 15 |
| `claude/session-2026-10-12` | [`b3cbe7a`](https://github.com/justinhorton3/faith-reins/tree/b3cbe7af342bb2d6d871706d315019e277708808) | 3 |
| `feat/v7-merchandise-system` | [`92eea89`](https://github.com/justinhorton3/faith-reins/tree/92eea891560b7b41f7339e14b5af6937efa935d2) | 73 |
| `wip/shop-photo-logo-swap` | [`1094920`](https://github.com/justinhorton3/faith-reins/tree/10949206fb3c24fcc25596cb7f85cc7b75bca96e) | 1 |

Review decisions:

- Wix migration: retain forms, one-time/monthly giving and account work as implementation references. It changes Astro 5 to 7 and the hosting adapter, removes/replaces existing CMS routes and code, sets `security.checkOrigin: false`, and notes unresolved hosted-preview 404 behavior. Reimplement or integrate only in a separate tested runtime PR; do not merge the whole stale branch into the cleaned repository.
- Deployment workflow: retain the preview/release idea for a separate hosting decision. The old branch runs a mutable latest Wix CLI, grants workflow-wide write permissions, and automatically builds live-backend previews for same-repository PRs. It also uses `npm ci || npm install`, masking the existing lockfile issue. No new automatic deployment or PR-comment behavior is enabled by cleanup.
- Merchandise history: retain the complete design iteration trail; current approved masters, catalog and image provenance are already consolidated under brand/v7-design-system. Older candidate status must not override current approval records.
- WIP shop swap: all 36 changed files have exact copies in the canonical package's historical references. Keep their WIP status; do not promote them into the website or approved V7 imagery.

Do not merge this archival branch into main. Recover selected code into a new branch and validate it independently. This archive changes no live Wix configuration and creates no deployment.
