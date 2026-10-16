// Website-owned lifestyle concept; provenance is recorded in docs/shop-hero-image.json.
export function shopHero() {
  return `<section class="shop-editorial" aria-labelledby="shop-editorial-title">
  <div class="shop-editorial__copy">
    <p class="shop-editorial__eyebrow">The Faith Reins Collection</p>
    <h1 id="shop-editorial-title">Wear the <br><em>mission.</em></h1>
    <p class="shop-editorial__lead">Familiar colors. Thoughtful details.<br>A little purpose in the everyday.</p>
    <a class="shop-editorial__link" href="#shop-products">Explore the collection <span aria-hidden="true">↓</span></a>
    <p class="shop-editorial__signature">Made to feel like Faith Reins.</p>
  </div>
  <figure class="shop-editorial__scene"><picture><source media="(max-width: 767px)" srcset="/assets/shop/v7/heroes/shop-mobile.webp" width="1024" height="1536"><img src="/assets/shop/v7/heroes/shop-desktop.webp" width="1536" height="1024" alt="A man and a woman in forest-green and cream Faith Reins apparel beside a horse at the ranch." fetchpriority="high"></picture></figure>
</section>`;
}

export function merchCorner() {
  return `<section class="shop-corner" aria-labelledby="shop-corner-title">
  <figure><img src="/assets/shop/v7/merch-corner.webp" alt="Merch-corner concept with forest-green cabinetry, timber shelves, warm brass lighting and a coordinated Faith Reins apparel and gift display." width="1458" height="1594" loading="lazy"><figcaption>Merch corner concept</figcaption></figure>
  <div class="shop-corner__copy"><p class="shop-editorial__eyebrow">The merch corner</p><h2 id="shop-corner-title">A little more<br>Faith Reins.</h2><p>Familiar greens. Warm cream. Everyday pieces with a shared purpose.</p><p>A welcoming corner that brings the collection together, from signature layers to the little things you reach for every day.</p></div>
</section>`;
}
