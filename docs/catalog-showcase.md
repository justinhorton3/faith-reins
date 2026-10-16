# V7 merchandise website handoff

The approved men's polo layout is now a shared browsing template for **18 product families, 42 approved color/artwork variants and 84 original PNGs**. Grouped options include the fourth tonal polo design for men, women, boys and girls. The shop collection uses the same originals instead of the old generated placeholder assortment.

Website data is in `src/lib/products.json`; its independently committed photographs are under `public/assets/shop/v7/`. Gallery switching, swipe, keyboard zoom, color/artwork swatches, applicable reference size buttons, bounded quantity controls, size/format dialogs, description, materials/care, styled imagery and related products use one shared implementation. Images are contained at their original 1086 × 1448 dimensions; none is recolored, retouched or recropped. The website copies are WebP re-encodings (quality 88) of the approved PNGs so the full site fits in one Wix upload; the manifest keeps each original PNG hash as `sourceSha256`. `catalog-showcase-assets.json` records exact source paths, review statuses and hashes, including the two previously identified derived companion views. Provenance is documentation only; the website never imports it or reads `brand/`.

All collection items are out of stock. Add to bag is disabled regardless of variant, size or quantity. No prices, Product Offers, stock claims, dispatch dates, checkout handlers or contact-order fallback are published for the collection. Existing saved bags are cleared, including retired and unknown item IDs. Donations retain their separate existing flow.

## Sizing and supplier separation

Size labels are reference options from the approved product records. Only the men's White K500 polo and men's Forest Green Gildan 18500 hoodie show garment charts from the official-source audit snapshot reviewed on 2026-10-15 in PR #20. Their candidate-specific charts, method and caveats are website-owned copies; the audit PR remains separate. The women's unresolved diagram chart, mismatched colors/decoration/cuts and youth candidates are not repurposed as finished-product measurements. Other dialogs state what is still pending; journals and throws identify recorded dimensions as reference formats. Final fabric, capacity, care and production details remain qualified.

## Routes

| Family | Website route | Variants |
|---|---|---:|
| Men's / women's / boys' / girls' horse polos | `/shop/mens-polo`, `/shop/womens-polo`, `/shop/boys-polo`, `/shop/girls-polo` | 16 |
| Quarter zip / quilted vest | `/shop/quarter-zip`, `/shop/quilted-vest` | 6 |
| Men's / women's / boys' / girls' hoodies | `/shop/heritage-hoodie`, `/shop/womens-hoodie`, `/shop/boys-hoodie`, `/shop/girls-hoodie` | 5 |
| Horse cap | `/shop/caps` | 3 |
| Horse / signature mugs | `/shop/coffee-mug`, `/shop/logo-mug` | 4 |
| Horse / signature bottles | `/shop/horse-water-bottle`, `/shop/logo-water-bottle` | 4 |
| Horse / signature journals | `/shop/horse-journal`, `/shop/logo-journal` | 2 |
| Embroidered throw | `/shop/embroidered-throw` | 2 |

The 17 older product URLs without an exact V7 family are preserved as useful unavailable-style pages with current collection links. They do not show the old placeholder renders or substitute a different product's photograph. The earlier youth polo/hoodie URLs offer the corresponding boys' and girls' pages. Their former assortment remains recorded in `legacy-product-routes.json`; no image or source-package deletions are required.

## Validation and deployment

`npm ci`, `npm run build`, `node scripts/verify-catalog-showcase.mjs`, ownership checks and the existing independent-build comparison validate installation, coverage, hashes, ordering and portability. `tests/catalog-showcase.spec.js` exercises every variant and reference size at desktop/mobile widths, dialogs, gallery loading, bounded quantity, keyboard zoom, swipe, scoped measurements, saved-bag blocking, collection filters and retained URLs. Representative full-page screenshots are workflow artifacts.

The preview workflow uses `wix preview`, verifies the hosted polo and images and posts its review link on the PR. Its site root `/shop.html` opens the refreshed full collection. Merging this change does not release faithreins.com. The identity changes in PR #16 and reference work in PR #20 remain separate.
