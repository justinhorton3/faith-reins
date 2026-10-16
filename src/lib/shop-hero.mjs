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
  <figure class="shop-editorial__scene"><img src="/assets/shop/v7/coffee-porch.webp" alt="Woman relaxing in a wooden chair with coffee, wearing a forest-green horse-embroidered hoodie beside a sunlit pasture." width="1536" height="1024" fetchpriority="high"></figure>
</section>`;
}
