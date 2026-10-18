# Faith Reins audit — October 18, 2026

Branch: `Audit_10.18.26`

The initial audit contains 94 page records, 22 confirmed findings, three owner-verification items, and one screenshot reproduction candidate. The baseline was observed against `main` at `a5aaae6057b730fe44938fce7ae21d69c7b24c6d`; it is not a certification that hosting matches that commit byte for byte.

- [Audit report](report.html)
- [Findings](findings.csv) / [JSON](findings.json)
- [Page coverage](page-coverage.csv) / [JSON](page-coverage.json)
- [Correction batches](BATCHES.md)

## Coverage still open

Tablet/mobile live rendering, other desktop widths, Safari/iPhone/Android, 16 full-page desktop rechecks, authenticated account states, completed form/transaction flows, and Core Web Vitals remain open. The report records the specific limits. No assumed passes are recorded.

The report and baseline findings are preserved as observed. Batch notes record code changes and validation separately; a code commit does not mean a finding has passed live retesting.

## Correction workflow

Work in groups of five findings, with a focused commit and validation record for each batch. Keep factual claims that require an owner decision open until supported. Do not merge or publish from this branch as part of an audit correction commit.
