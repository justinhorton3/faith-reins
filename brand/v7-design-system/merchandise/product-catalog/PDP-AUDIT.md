# Product detail page audit and updated mockup

Review date: October 15, 2026. Code reviewed from main commit `9a2fb925a01da9634e83c533d30e86c4bc84fc91`. This is a source audit, not a live checkout test. The V7 catalog has 42 design records; the root website still uses a separate 23-record catalog. This change supplies a reference implementation and sourcing evidence; it does not deploy the V7 store.

[Open interactive product detail mockup](../../examples/product-detail/index.html) · [Mockup specification](../../examples/product-detail/README.md) · [Supplier audit](SUPPLIER-AUDIT.md)

## Result

The current root website provides basic size selection, quantity, bag storage and related products. It does **not yet provide the depth or image interaction of the requested department-store product page**. The new V7 polo reference adds those interactions and richer detail, while keeping unverified retail prices, stock and promises out of the preview.

[Dillard’s reference product page](https://www.dillards.com/p/akoo-short-sleeve-polo-collar-standard-fit-connect-shirt/521420774) provides image enlargement, a size chart, swatches that update imagery, quantity, add-to-bag, item details, care and shipping/returns. The comparison is about shopping capabilities; the mockup retains Faith Reins identity and original assets.

## Feature audit

| Capability | Main website source finding | Updated V7 mockup |
|---|---|---|
| Product images | One `shopImg(slug)` image per PDP; no image-array catalog | Two original views per color, thumbnails, previous/next, full-resolution zoom dialog, zoom controls and arrow keys |
| Color selection | No linked PDP swatch controller | Three concept colors switch imagery, copy, identifier and availability; selecting a color clears size |
| Sizing | Generic group chart link; no supplier blank mapping | Named K500 reference, exact supplier garment/body values, inches/cm toggle, measurement instructions and tolerance |
| Size selection | Basic pressed buttons and size-required bag gate | Explicit size state; unavailable color concepts disable sizing and bag action |
| Quantity and bag | Local browser storage; later checkout may use Wix mapping or contact fallback | Bounded quantity, size validation, consolidated preview bag, remove item, empty state; no payment or order |
| Description | Short generic catalog paragraph | Brand narrative, construction, artwork, fabric, care, fit, delivery/returns disclosures |
| Stock claims | Product JSON-LD emits `InStock` for every root catalog record | No fabricated inventory, offers, reviews or star ratings |
| Delivery | PDP hardcodes “Ships within 5–7 business days” | No unsupported ship date; delivery described only as a future configured estimate |
| Reviews | No dedicated PDP review feature found | Omitted until real reviews exist; supplier reviews are not Faith Reins customer reviews |
| Responsive layout | Existing website layout; not exercised in this audit | Responsive CSS for desktop and mobile, stacked gallery/details, horizontal overflow for charts; browser visual QA pending |
| Identity | Existing website catalog assets are separate | Local V7 fonts, exact approved lockup and original PNGs; all references stay within the portable V7 system |

## Priority findings for the later website implementation

1. **High: verify stock and delivery claims before release.** Root PDP structured data advertises every product as in stock; shipping text is fixed. Neither is derived from audited supplier variant availability. Replace these claims with configured variant state and destination-based estimates during the store implementation.
2. **High: replace generic sizing with blank-specific sizing.** Main’s group chart and broad “size up” advice cannot establish fit for the proposed K500, women’s cut or youth blank. Preserve the distinction between body circumference and flat garment width; resolve supplier diagram issues recorded in this audit.
3. **High: map V7 products deliberately.** The 23-record root catalog and 42-record V7 design catalog differ. No automatic match by title/color should migrate prices, SKUs, inventory or checkout IDs.
4. **Medium: gallery and detail depth.** Add independent website copies of approved images, image arrays, alt text and color-size relationships; use the mockup’s interactions after visual review.
5. **Medium: production photography.** Current images are approved concept references, including older polo horse scale. Only two concept views exist per design; the sourcing plan’s production front/back/styled set remains incomplete. Final listing photos must match the decorated sample. Do not alter original approved images to conceal this difference.
6. **Medium: customer policy and support.** Publish the actual Faith Reins returns/size-exchange policy and delivery terms before enabling checkout. Printful supplier terms do not automatically define the retailer’s customer policy.

Evidence: root `src/lib/pages-main.mjs` PDP loop, generic size guide, JSON-LD and fixed ship note; `src/lib/products.json`; root cart/Wix checkout wiring in `src/scripts/cart.js`. No root source or public assets were modified by this audit.

## Verification status

- Package validation checks all 84 original image hashes, active local links and portable package boundaries.
- Supplier audit validation checks all 42 products, source links, chart structure, product-specific record fields and mockup chart parity.
- JavaScript syntax checked with Node.
- Interactive browser/responsive visual review remains pending: the cloud browser disallowed opening the local file protocol. No browser test or screenshot review is claimed.
- Physical fit, stitch-out, exact variant stock, customer policy and live checkout remain separate launch gates.
