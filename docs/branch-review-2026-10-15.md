# Remaining branch review — October 15, 2026

PDF PR #15 merged at c6a791d5b367d13a910628497df3c80902865c3e and its branch was deleted. Four remaining working branches were reviewed and their exact tips preserved as additional Git parents of archive commit 3f4180094c48d021eda8ce24b106438caf5c68e2, reachable from archive/pre-cleanup-2026-10-15. All four ancestry checks passed before deletion. The archive working tree starts from cleaned main and adds a recovery guide; it does not apply the old runtime changes to main. Do not merge that archive branch.

| Former branch | Decision |
| --- | --- |
| fix/wix-headless-deploy-config | Preserve the 15-commit Wix migration for a separate runtime PR. It replaces Astro 5 with 7, changes hosting, forms, giving and accounts, replaces existing CMS code, disables origin checking and records unresolved hosted-preview 404 behavior. No production-readiness claim is made. |
| claude/session-2026-10-12 | Preserve three deployment/workflow commits. The workflow uses a mutable latest CLI, workflow-wide write permissions and automatic previews connected to the live backend; it masks the lockfile issue with a fallback install. Retain the preview/release idea for a separate hosting decision. |
| feat/v7-merchandise-system | Preserve all 73 unmerged design-history commits. Current canonical approval records and asset hashes govern; old drafts do not supersede them. |
| wip/shop-photo-logo-swap | All 36 changed files have exact historical copies in V7. Preserve the original commit as well; do not promote WIP images into approved V7 or website assets. |

The original snapshots and full ancestry can be recovered from the archive commit's parents using git switch --detach with the SHAs recorded in brand/v7-design-system/BRANCH-RETIREMENT.json. The branch deletion was verified through the GitHub UI and branch API. No archived Wix code, automatic deployment, PR comments, forms or financial transactions were executed.
