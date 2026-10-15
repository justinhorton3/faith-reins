# V7 QA Checklist

## Local checks

The generated `VALIDATION-REPORT.json` contains final results. Validation checks all delivered master/product hashes, counts, SVG parsing and self-contained logo geometry, catalog targets, CSS imports and active HTML links. The original PDF rendering claims below are historical package records; the PDF itself is deferred and not included.

- [x] 10 approved SVG masters copied without modification.
- [x] 72 original product files match recorded SHA-256 checksums.
- [x] 12 cream/white originals match approved persistent IDs; product/view mapping visually inspected; new hashes recorded.
- [x] Two derived companion views retain distinct status.
- [x] All delivered images are unchanged originals; no new image derivatives included.
- [x] Rejected monogram, leather/linen notebook and large-print throw work excluded from current catalog.
- [x] Full website lockup and subtitle retained in the reference.
- [x] Size ranges and supplier details remain qualified.
- [ ] PDF upload deferred by owner because the original exceeds 100 MB. Historical 18-page rendering claim is not revalidated in cleanup.
- [x] Handoff staging refuses existing output directories and output inside repositories; never writes website assets.
- [ ] Interactive HTML behavior and every responsive width tested in an actual browser.
- [ ] Existing website build, Playwright flows and screenshot regression completed after integration.
- [ ] WCAG contrast/focus/target checks on the actual integrated UI.
- [ ] Print proofs and real embroidery sew-outs.
- [ ] Supplier availability, measurements, care, pricing and fulfillment verified.
- [ ] Owner review of newly authored system materials and templates.
- [ ] Live release.

Automated static validation is not a substitute for browser or physical QA. No website transaction or form submission was performed.
