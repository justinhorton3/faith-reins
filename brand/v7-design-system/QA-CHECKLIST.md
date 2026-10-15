# V7 QA Checklist

## Local checks

The generated `VALIDATION-REPORT.json` contains final results. Validation checks all delivered master/product hashes, counts, SVG parsing and self-contained logo geometry, catalog targets, CSS imports and active HTML links. The restored PDF is verified against the original source; detailed evidence is in guidelines/PDF-VALIDATION.json.

- [x] 10 approved SVG masters copied without modification.
- [x] 72 original product files match recorded SHA-256 checksums.
- [x] 12 cream/white originals match approved persistent IDs; product/view mapping visually inspected; new hashes recorded.
- [x] Two derived companion views retain distinct status.
- [x] All delivered images are unchanged originals; no new image derivatives included.
- [x] Rejected monogram, leather/linen notebook and large-print throw work excluded from current catalog.
- [x] Full website lockup and subtitle retained in the reference.
- [x] Size ranges and supplier details remain qualified.
- [x] Original 18-page PDF restored in six lossless volumes. All 18 full-guide page renders and text match the source; all 43 embedded images retain dimensions and decoded pixels. Split-page renders also match.
- [x] Handoff staging refuses existing output directories and output inside repositories; never writes website assets.
- [ ] Interactive HTML behavior and every responsive width tested in an actual browser.
- [ ] Existing website build, Playwright flows and screenshot regression completed after integration.
- [ ] WCAG contrast/focus/target checks on the actual integrated UI.
- [ ] Print proofs and real embroidery sew-outs.
- [x] Public supplier audit completed for all 42 concepts; candidate measurements and source links documented where available.
- [ ] Exact supplier variant inventory, unresolved measurement methods, final care, retail pricing, fulfillment and decorated samples approved.
- [ ] Owner review of newly authored system materials and templates.
- [ ] Live release.

Automated static validation is not a substitute for browser or physical QA. No website transaction or form submission was performed.
