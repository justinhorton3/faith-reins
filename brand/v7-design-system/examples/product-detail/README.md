# Product detail page reference

Open [index.html](index.html) locally with the V7 package beside it. This reference uses only local V7 fonts, approved lockup and original product photos. There are no external scripts, trackers, requests, payments or website dependencies. JavaScript is required for the interactive controls.

The page demonstrates a premium Faith Reins product experience: large gallery, product/styled thumbnails, previous/next controls, original-resolution zoom with 100–200% controls and keyboard arrows, three color concepts, size selection, quantity, a size-required preview bag with removal, detailed content and a fit guide with separate body/garment charts and inch/cm units. Native dialogs support Escape, focus containment and return focus. Responsive CSS adapts the layout for smaller screens; actual visual QA remains pending.

White uses the proposed Port Authority K500 reference only. Cream and Forest Green are approved design concepts with unresolved supplier colors; their sizes and preview bag action are disabled. No real retail price, stock, model size, reviews, shipping promise or returns offer is invented. The preview bag exists in memory and resets on refresh.

The six polo images are unchanged original concept references; older photographs may show the previous horse scale. The production artwork handoff must use the smaller approved emblem. No photograph was regenerated, compressed or edited for this mockup.

## Review checklist

- Desktop: gallery/details balance, type hierarchy, full image readability and sticky gallery behavior.
- Mobile: stacked image/detail flow, size-button reach, chart scrolling, dialog fit and no horizontal page overflow.
- Gallery: both views for each color, previous/next, zoom in/out, ArrowLeft/ArrowRight and Escape.
- Fit: inches/cm, body versus garment, 2-inch tolerance, named candidate and no chart on unmatched colors.
- Bag: error without size, valid selected size, quantity clamped 1–10, merged matching lines, remove, empty state, no checkout.
- Accessibility: keyboard focus order, touch targets, dialog naming, pressed states, live announcement and contrast.
- Content: no unsupported price, availability, delivery, reviews or final production claims.

[Supplier audit](../../merchandise/product-catalog/SUPPLIER-AUDIT.md) · [PDP audit](../../merchandise/product-catalog/PDP-AUDIT.md)

## Later website handoff

After owner visual review and supplier approval, implement this behavior in the root website using its own committed fonts, logo and image copies. Do not import or link to `brand/` at runtime or build time. Keep supplier inventory and checkout mappings distinct from design reference data.
