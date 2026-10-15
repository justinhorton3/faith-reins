import { esc } from "./lib.mjs";

export const POLO_IMAGE_ROOT = "/assets/shop/v7/polos";
export const POLO_COLORS = [
  { id: "white", name: "White", hex: "#ffffff" },
  { id: "cream", name: "Cream", hex: "#eee5d4" },
  { id: "forest-green", name: "Forest Green", hex: "#173a2e" },
];
const image = (color, view = "product") => `${POLO_IMAGE_ROOT}/mens-${color}-polo-${view}.png`;

// Website-owned snapshot of the reviewed White Port Authority K500 candidate.
// This reference is deliberately not used as a chart for Cream or Forest Green.
const whiteMeasurements = [
  ["S", 29, 20.5, 20], ["M", 30, 21.5, 20.75], ["L", 31, 23.5, 21],
  ["XL", 32, 25.5, 22], ["2XL", 33, 27, 22.5], ["3XL", 33.5, 28.5, 23],
];

export function poloShowcase(p) {
  const description = "A quiet signature for the everyday. A clean polo silhouette with the Faith Reins horse at the left chest, in three considered colors.";
  const body = `
<section class="polo-page" data-polo-showcase>
  <nav class="polo-crumbs" aria-label="Breadcrumb"><a href="/shop">Shop</a><span aria-hidden="true">/</span><span>Men’s Horse Polo</span></nav>
  <div class="polo-layout">
    <section class="polo-gallery" aria-label="Product images">
      <div class="polo-stage" id="polo-stage">
        <button class="polo-image-open" id="polo-image-open" type="button" aria-label="Enlarge White polo product image"><img id="polo-main-image" src="${image("white")}" alt="White men’s Faith Reins horse polo, product view" width="1086" height="1448" fetchpriority="high"></button>
        <span class="polo-counter" id="polo-counter">01 / 02</span>
        <button class="polo-zoom-open" id="polo-zoom-open" type="button">＋ View closer</button>
      </div>
      <div class="polo-gallery-bar">
        <div class="polo-thumbs" role="group" aria-label="Choose product image">${["product", "styled"].map((view) => `<button type="button" data-polo-view="${view}" aria-label="${view === "product" ? "Product" : "Styled"} view" aria-pressed="${view === "product"}"><img id="polo-thumb-${view}" src="${image("white", view)}" alt="" width="1086" height="1448"></button>`).join("")}</div>
        <p id="polo-caption" aria-live="polite">The product</p>
        <div class="polo-arrows"><button type="button" data-polo-next aria-label="Previous image">←</button><button type="button" data-polo-next aria-label="Next image">→</button></div>
      </div>
    </section>
    <section class="polo-info" aria-label="Product information">
      <p class="eyebrow">The Faith Reins Collection</p>
      <h1>Men’s Horse Polo</h1>
      <p class="polo-intro">${description}</p>
      <p class="polo-stock">Out of stock</p>
      <fieldset class="polo-colors"><legend>Color <strong id="polo-color-name">White</strong></legend><div class="polo-swatches">${POLO_COLORS.map((color) => `<button type="button" data-polo-color="${color.id}" data-color-name="${color.name}" style="--swatch:${color.hex}" aria-label="${color.name}" aria-pressed="${color.id === "white"}"></button>`).join("")}</div></fieldset>
      <div class="polo-size-heading"><p>Size <strong id="polo-size-name">Select a size</strong></p><button type="button" class="polo-text-button" id="polo-size-guide">Size &amp; fit guide</button></div>
      <div class="polo-sizes" role="group" aria-label="Choose a size">${p.sizes.map((size) => `<button type="button" data-polo-size="${esc(size)}" aria-pressed="false">${esc(size)}</button>`).join("")}</div>
      <p class="polo-small">Sizes shown for reference.</p>
      <div class="polo-order"><div class="polo-quantity" role="group" aria-label="Quantity"><button type="button" id="polo-decrease" aria-label="Decrease quantity">−</button><output id="polo-quantity" aria-label="Selected quantity">1</output><button type="button" id="polo-increase" aria-label="Increase quantity">+</button></div><button class="btn" type="button" id="polo-add-to-bag" disabled>Add to bag</button></div>
      <div class="polo-selection visually-hidden" id="polo-selection" role="status" aria-live="polite">White selected. Out of stock.</div>
      <p class="polo-preview-note">Product imagery illustrates the collection; final details may vary.</p>
      <div class="polo-details">
        <details open><summary>Description &amp; details</summary><div><p>Understated enough for every day. Distinctive enough to feel like Faith Reins. Wear the horse close, from a morning at the barn to the rest of your day.</p><ul><li>Small horse emblem at the left chest</li><li>Short sleeves and a classic polo collar</li><li>White and cream with a forest-green horse; forest green with a cream horse</li></ul></div></details>
        <details><summary>Fit &amp; sizing</summary><div><p>A classic men’s silhouette. Compare a polo you already enjoy with the size reference before choosing. Final fit and measurements will be confirmed when ordering is available.</p><button type="button" class="polo-text-button" id="polo-fit-guide">Open size &amp; fit guide</button></div></details>
        <details><summary>Fabric &amp; care</summary><div><p>The collection is designed with a piqué polo texture and embroidered horse detail. Final fabric composition and care instructions will accompany the finished garment.</p></div></details>
        <details><summary>Availability</summary><div><p>This item is currently out of stock and cannot be purchased.</p></div></details>
      </div>
    </section>
  </div>
  <section class="polo-story" aria-labelledby="polo-story-title"><div><p class="eyebrow">A little purpose in the everyday</p><h2 id="polo-story-title">Wear what<br>matters to you.</h2><p>Understated essentials. A familiar horse. A reminder of the children, families and community at the heart of Faith Reins.</p><a href="/our-mission">Explore our mission →</a></div><img id="polo-story-image" src="${image("white", "styled")}" alt="White Faith Reins polo, styled view" loading="lazy" width="1086" height="1448"></section>
  <section class="polo-collection" aria-labelledby="polo-colors-title"><p class="eyebrow">The same quiet signature</p><h2 id="polo-colors-title">Find your color.</h2><div class="polo-color-cards">${POLO_COLORS.map((color) => `<button type="button" data-polo-card="${color.id}" aria-label="View ${color.name} polo"><img src="${image(color.id)}" alt="${color.name} horse polo" loading="lazy" width="1086" height="1448"><span>${color.name}<small>Men’s Horse Polo · Out of stock</small></span><b aria-hidden="true">↗</b></button>`).join("")}</div></section>
</section>
<dialog class="polo-dialog" id="polo-guide-dialog" aria-labelledby="polo-guide-title"><div class="polo-dialog-heading"><h2 id="polo-guide-title">Size &amp; fit guide</h2><button type="button" data-polo-close aria-label="Close size guide">×</button></div><div id="polo-white-guide"><p>White polo · garment measurement reference. The proposed cut runs large. Final sizing will be confirmed before ordering.</p><div class="polo-units" role="group" aria-label="Measurement units"><button type="button" data-polo-unit="in" aria-pressed="true">Inches</button><button type="button" data-polo-unit="cm" aria-pressed="false">Centimeters</button></div><div class="polo-table-scroll"><table><caption id="polo-chart-caption">White polo garment measurements in inches</caption><thead><tr><th scope="col">Size</th><th scope="col">Length</th><th scope="col">Flat chest width</th><th scope="col">Sleeve</th></tr></thead><tbody>${whiteMeasurements.map(([size, ...values]) => `<tr><th scope="row">${size}</th>${values.map((v) => `<td data-polo-inches="${v}">${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="polo-small">Measure a laid-flat polo. Length: high point shoulder to hem. Chest: flat width, not circumference. Sleeve: center-back collar over shoulder to hem. Garment tolerance: up to 2 in / 5 cm.</p><p class="polo-small">Reference: Printful’s Port Authority K500 size guide, reviewed October 15, 2026. Applies to the proposed white garment only.</p></div><p id="polo-other-guide" hidden>Measurements for this color will be added when the final garment is confirmed.</p></dialog>
<dialog class="polo-dialog polo-zoom-dialog" id="polo-zoom-dialog" aria-labelledby="polo-zoom-title"><div class="polo-dialog-heading"><h2 id="polo-zoom-title">White · Product view</h2><button type="button" data-polo-close aria-label="Close image zoom">×</button></div><div class="polo-zoom-tools"><button type="button" id="polo-zoom-out" aria-label="Zoom out">−</button><output id="polo-zoom-level">100%</output><button type="button" id="polo-zoom-in" aria-label="Zoom in">+</button><button type="button" data-polo-next aria-label="Previous zoom image">←</button><button type="button" data-polo-next aria-label="Next zoom image">→</button></div><div class="polo-zoom-scroll"><img id="polo-zoom-image" src="${image("white")}" alt="White polo, enlarged product view" width="1086" height="1448"></div></dialog>`;
  return {
    description,
    body,
    jsonld: {
      "@context": "https://schema.org", "@type": "Product", name: p.name,
      description, image: POLO_COLORS.flatMap((c) => [image(c.id), image(c.id, "styled")]).map((src) => `https://www.faithreins.com${src}`),
      brand: { "@type": "Brand", name: "Faith Reins" },
      // No Offer until a retail price exists; unavailable UI must never emit InStock.
    },
  };
}
