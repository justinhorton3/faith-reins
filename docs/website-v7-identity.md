# Website V7 identity adoption

The header, menu drawer and footer use exact approved V7 horizontal SVGs, retaining the full Pediatric & Equine Therapy subtitle at every breakpoint. The organization schema uses the green horizontal mark; the SVG favicon uses the approved horse master. Copies are committed under public/assets/v7. Existing website fonts and their two license notices match the V7 package byte for byte and remain in public/fonts.

This is the first identity integration. The website retains its current palette, typography, page layouts, hero selections, CMS and booking/giving/shop flows. Supplier-dependent merchandise changes and the archived Wix runtime migration need their own tested changes. The existing PNG touch icon remains available pending a separately reviewed raster export.

Asset hashes and source version are recorded in website-v7-identity-assets.json for human review only. The website never reads that file or the brand directory during build or runtime. Replacing V7 or removing brand must not affect this website snapshot.

Validation: production build with brand temporarily absent; every generated page checked for website-owned green header/drawer and cream footer SVGs with full accessible subtitle; referenced assets and SVG hashes checked. Browser interaction and responsive visual QA remain required before production publication; no Chromium binary is committed and no Wix deployment is performed by this PR.
