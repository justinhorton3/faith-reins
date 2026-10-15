# Package handoff and independent website copies

## Move to another project

Copy the entire `v7-design-system` directory, keeping its structure intact. Open `index.html` and run `python3 scripts/validate.py --check`. Fonts, licenses, imagery, icons, masters, catalogs, templates and examples are local. No V6 or original website folder is needed. The PDF is deferred; HTML and Markdown guidance remains available.

## Deliberate website update

1. Choose exact approved assets and version; preserve original hashes and status.
2. Optionally run `python3 scripts/export-repo-assets.py --output /new/external/staging-directory`. Existing destinations, package-local output and output inside repositories are refused. This manual tool is never a build dependency.
3. Review the staged manifest. Copy selected assets into the website's own committed paths, such as `public/assets/` and `public/fonts/`. Adapt website styles locally; do not import reference-package styles.
4. Update only references intended for that separate website change. Retain accessible labels, full horizontal lockup/subtitle and existing clinical intake constraints.
5. Build and inspect relevant pages, fonts, icons and responsive states. The website must still build with the whole `brand/` directory absent.
6. Record version and hashes as informational provenance. Never make the website read that record or the source package to resolve assets.

Do not recreate root `v7-design-system/`, `product-catalog/` or `images/products/` as competing source packages. Do not use symlinks, automatic synchronization or normal build-time copying from brand files. Future V8 work can coexist with an older website snapshot without changing it.

## Historical records

`legacy/source-documents/` preserves earlier instructions and superseded drafts, including old paths. Those records are not current instructions. Carried-forward website and WIP images are references, not newly approved V7 product images.
