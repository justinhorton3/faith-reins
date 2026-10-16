import { esc } from "./lib.mjs";

const imageTag = (image, alt, attrs = '') => `<img src="${image.src}" alt="${esc(alt)}" width="${image.width}" height="${image.height}" ${attrs}>`;
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export function showcaseCard(p) {
  const first = p.variants[0];
  return `<a class="merch-card" href="/shop/${p.slug}" data-group="${p.group}" data-collection="${esc(p.collection)}"><span class="merch-card__img">${imageTag(first.images.product, p.name, 'loading="lazy"')}</span><span class="merch-card__cat">${esc(p.collection)}</span><span class="merch-card__row"><span class="merch-card__name">${esc(p.name)}</span><span class="merch-card__price">Out of stock</span></span><span class="merch-card__variants">${p.variants.length > 1 ? `${p.variants.length} color${p.variants.some(v => v.tonal) ? ' & artwork' : ''} options` : first.name}</span></a>`;
}

export function productShowcase(p, related = []) {
  const v = p.variants[0];
  const wearable = ['Polos', 'Layers', 'Hoodies', 'Headwear'].includes(p.collection);
  const heading = wearable ? 'Wear what<br>matters to you.' : 'A little purpose<br>in the everyday.';
  const table = (variant) => {
    if (!variant.guide) return `<div data-pdp-guide="${variant.id}"${variant !== v ? ' hidden' : ''}><p>Measurements for this style will be added when the final item is confirmed.</p><p class="pdp-small">${esc(p.fitNote)}</p></div>`;
    const g = variant.guide;
    return `<div data-pdp-guide="${variant.id}"${variant !== v ? ' hidden' : ''}><p>${esc(g.note)}</p><div class="pdp-units" role="group" aria-label="Measurement units"><button type="button" data-pdp-unit="in" aria-pressed="true">Inches</button><button type="button" data-pdp-unit="cm" aria-pressed="false">Centimeters</button></div><div class="pdp-table-scroll"><table><caption data-pdp-chart-caption="${esc(variant.name)} garment measurements">${esc(variant.name)} garment measurements in inches</caption><thead><tr><th scope="col">Size</th>${g.columns.map(c => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.rows.map(([size, ...values]) => `<tr><th scope="row">${esc(size)}</th>${values.map(value => `<td data-pdp-inches="${value}">${value}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="pdp-small">${esc(g.method)} ${esc(g.tolerance)}</p><p class="pdp-small">Reference: <a href="${esc(g.url)}" target="_blank" rel="noopener noreferrer">${esc(g.name)}</a>, reviewed ${esc(g.reviewedAt)}. Applies to this proposed style only.</p></div>`;
  };
  const sizes = v.sizes.length ? `<div class="pdp-size-heading"><p>Size <strong id="pdp-size-name">Select a size</strong></p><button type="button" class="pdp-text-button" id="pdp-size-guide">Size &amp; fit guide</button></div><div class="pdp-sizes" id="pdp-sizes" role="group" aria-label="Choose a size">${v.sizes.map(size => `<button type="button" data-pdp-size="${esc(size)}" aria-pressed="false">${esc(size)}</button>`).join('')}</div><p class="pdp-small">Sizes shown for reference.</p>` : `<div class="pdp-format"><p>${p.collection === 'Headwear' ? 'Adjustable fit' : 'One size'}</p><button type="button" class="pdp-text-button" id="pdp-size-guide">${p.collection === 'Headwear' ? 'Fit information' : 'Dimensions &amp; details'}</button></div>`;
  const options = p.variants.length > 1 ? `<section class="pdp-collection" aria-labelledby="pdp-colors-title"><p class="eyebrow">The same quiet signature</p><h2 id="pdp-colors-title">Find your ${p.variants.some(v => v.tonal) ? 'signature' : 'color'}.</h2><div class="pdp-color-cards" style="--variant-columns:${Math.min(3, p.variants.length)}">${p.variants.map(variant => `<button type="button" data-pdp-card="${variant.id}" aria-label="View ${esc(variant.name)}"><span class="pdp-card-photo">${imageTag(variant.images.product, `${variant.name} ${p.name}`, 'loading="lazy"')}</span><span>${esc(variant.name)}<small>${esc(p.name)} · Out of stock</small></span><b aria-hidden="true">↗</b></button>`).join('')}</div></section>` : '';
  const body = `
<section class="pdp-page" data-product-showcase${p.slug === 'mens-polo' ? ' data-polo-showcase' : ''}>
  <nav class="pdp-crumbs" aria-label="Breadcrumb"><a href="/shop">Shop</a><span aria-hidden="true">/</span><span>${esc(p.name)}</span></nav>
  <div class="pdp-layout">
    <section class="pdp-gallery" aria-label="Product images">
      <div class="pdp-stage" id="pdp-stage">
        <button class="pdp-image-open" id="pdp-image-open" type="button" aria-label="Enlarge ${esc(v.name)} ${esc(p.name)} product image">${imageTag(v.images.product, `${v.name} ${p.name}, product view`, 'id="pdp-main-image" fetchpriority="high"')}</button>
        <span class="pdp-counter" id="pdp-counter">01 / 02</span>
        <button class="pdp-zoom-open" id="pdp-zoom-open" type="button">＋ View closer</button>
      </div>
      <div class="pdp-gallery-bar">
        <div class="pdp-thumbs" role="group" aria-label="Choose product image">${['product', 'styled'].map(view => `<button type="button" data-pdp-view="${view}" aria-label="${view === 'product' ? 'Product' : 'Styled'} view" aria-pressed="${view === 'product'}">${imageTag(v.images[view], '', `id="pdp-thumb-${view}"`)}</button>`).join('')}</div>
        <p id="pdp-caption" aria-live="polite">The product</p>
        <div class="pdp-arrows"><button type="button" data-pdp-next aria-label="Previous image">←</button><button type="button" data-pdp-next aria-label="Next image">→</button></div>
      </div>
    </section>
    <section class="pdp-info" aria-label="Product information">
      <p class="eyebrow">The Faith Reins Collection</p>
      <h1>${esc(p.name)}</h1><p class="pdp-intro">${esc(p.desc)}</p><p class="pdp-stock">Out of stock</p>
      <fieldset class="pdp-colors"><legend>${p.variants.some(v => v.tonal) ? 'Color &amp; artwork' : 'Color'} <strong id="pdp-color-name">${esc(v.name)}</strong></legend><div class="pdp-swatches">${p.variants.map(variant => `<button type="button" data-pdp-color="${variant.id}" style="--swatch:${variant.hex}" aria-label="${esc(variant.name)}" title="${esc(variant.name)}" aria-pressed="${variant === v}">${variant.tonal ? '<span aria-hidden="true" class="pdp-tonal">T</span>' : ''}</button>`).join('')}</div></fieldset>
      ${sizes}
      <div class="pdp-order"><div class="pdp-quantity" role="group" aria-label="Quantity"><button type="button" id="pdp-decrease" aria-label="Decrease quantity" disabled>−</button><output id="pdp-quantity" aria-label="Selected quantity">1</output><button type="button" id="pdp-increase" aria-label="Increase quantity">+</button></div><button class="btn" type="button" id="pdp-add-to-bag" disabled>Add to bag</button></div>
      <div class="pdp-selection visually-hidden" id="pdp-selection" role="status" aria-live="polite">${esc(v.name)} selected. Out of stock.</div>
      <p class="pdp-preview-note">Product imagery illustrates the collection; final details may vary.</p>
      <div class="pdp-details">
        <details open><summary>Description &amp; details</summary><div><p id="pdp-variant-description">${esc(v.description)}</p><ul>${p.details.map(detail => `<li>${esc(detail)}</li>`).join('')}</ul></div></details>
        <details><summary>${v.sizes.length ? 'Fit &amp; sizing' : 'Size &amp; format'}</summary><div><p>${esc(p.fitNote)}</p><button type="button" class="pdp-text-button" id="pdp-fit-guide">${v.sizes.length ? 'Open size &amp; fit guide' : 'Open item details'}</button></div></details>
        <details><summary>${wearable ? 'Fabric' : 'Materials'} &amp; care</summary><div><p>${esc(p.careNote)}</p></div></details>
        <details><summary>Availability</summary><div><p>This item is currently out of stock and cannot be purchased.</p></div></details>
      </div>
    </section>
  </div>
  <section class="pdp-story" aria-labelledby="pdp-story-title"><div><p class="eyebrow">A little purpose in the everyday</p><h2 id="pdp-story-title">${heading}</h2><p>A familiar horse. A reminder of the children, families and community at the heart of Faith Reins.</p><a href="/our-mission">Explore our mission →</a></div>${imageTag(v.images.styled, `${v.name} ${p.name}, styled view`, 'id="pdp-story-image" loading="lazy"')}</section>
  ${options}
  ${related.length ? `<section class="pdp-related"><p class="eyebrow">More from the collection</p><h2>You might also like.</h2><div class="merch-grid">${related.map(showcaseCard).join('')}</div></section>` : ''}
</section>
<dialog class="pdp-dialog" id="pdp-guide-dialog" aria-labelledby="pdp-guide-title"><div class="pdp-dialog-heading"><h2 id="pdp-guide-title">${v.sizes.length ? 'Size &amp; fit guide' : 'Dimensions &amp; details'}</h2><button type="button" data-pdp-close aria-label="Close size guide">×</button></div>${p.variants.map(table).join('')}</dialog>
<dialog class="pdp-dialog pdp-zoom-dialog" id="pdp-zoom-dialog" aria-labelledby="pdp-zoom-title"><div class="pdp-dialog-heading"><h2 id="pdp-zoom-title">${esc(v.name)} · Product view</h2><button type="button" data-pdp-close aria-label="Close image zoom">×</button></div><div class="pdp-zoom-tools"><button type="button" id="pdp-zoom-out" aria-label="Zoom out">−</button><output id="pdp-zoom-level">100%</output><button type="button" id="pdp-zoom-in" aria-label="Zoom in">+</button><button type="button" data-pdp-next aria-label="Previous zoom image">←</button><button type="button" data-pdp-next aria-label="Next zoom image">→</button></div><div class="pdp-zoom-scroll">${imageTag(v.images.product, `${v.name} ${p.name}, enlarged product view`, 'id="pdp-zoom-image"')}</div></dialog>
<script type="application/json" id="pdp-data">${safeJson({ slug: p.slug, name: p.name, variants: p.variants })}</script>`;
  return { description: p.desc, body, jsonld: {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.desc,
    image: p.variants.flatMap(v => Object.values(v.images).map(image => image.src.startsWith('https://') ? image.src : `https://www.faithreins.com${image.src}`)),
    brand: { '@type': 'Brand', name: 'Faith Reins' },
    // No Offer: this collection has no verified retail prices and purchasing is closed.
  } };
}
