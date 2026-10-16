import PRODUCTS from './products.json' with { type: 'json' };
import CATEGORIES from './shop-category-pages.json' with { type: 'json' };
import { esc, section, sh, ctaBand } from './lib.mjs';
import { showcaseCard } from './product-showcase.mjs';

export const shopCategories = CATEGORIES;
const SITE = 'https://www.faithreins.com';

export function productsForCategory(category) {
  const order = new Map(category.products.map((slug, index) => [slug, index]));
  return PRODUCTS.filter(product => order.has(product.slug)).sort((a, b) => order.get(a.slug) - order.get(b.slug));
}

export function categoryNavigation(current = 'shop') {
  const links = [{ key: 'shop', label: 'All', route: '/shop' }, ...CATEGORIES];
  return `<nav class="shop-collections" aria-label="Shop collections">${links.map(category => `<a href="${category.route}"${current === category.key ? ' aria-current="page"' : ''}>${esc(category.label)}</a>`).join('')}</nav>`;
}

export function shopCategoryTiles() {
  return `<section class="shop-category-tiles" aria-labelledby="shop-category-tiles-title"><div class="shop-category-tiles__in"><div class="shop-category-tiles__heading"><p class="shop-category-tiles__eyebrow">The Faith Reins Collection</p><h2 id="shop-category-tiles-title">Shop by category</h2></div>
  <nav class="shop-category-tiles__grid" aria-label="Shop by category">${CATEGORIES.map(category => `<a class="shop-category-tile" href="${category.route}"><span class="shop-category-tile__photo"><img src="${category.hero.mobile}" alt="" loading="lazy" decoding="async" width="${category.hero.mobileWidth}" height="${category.hero.mobileHeight}"></span><span class="shop-category-tile__label">${esc(category.label)} <span aria-hidden="true">→</span></span></a>`).join('')}</nav></div></section>`;
}
export function collectionHero(page) {
  const h = page.hero;
  return `<section class="hero hero--collection" aria-labelledby="collection-title" style="--pos:${h.desktopFocus || 'center'};--mpos:${h.mobileFocus || 'center'}">
<picture><source media="(max-width: 767px)" srcset="${h.mobile}" width="${h.mobileWidth}" height="${h.mobileHeight}"><img class="hero__img" src="${h.desktop}" width="${h.width}" height="${h.height}" alt="${esc(h.alt)}" fetchpriority="high"></picture>
<div class="hero__scrim"></div><div class="hero__body"><p class="eyebrow eyebrow--inv eyebrow--rule">The Faith Reins Collection</p><h1 class="hero__title" id="collection-title">${esc(page.heading)}</h1><p class="hero__lead">${esc(page.lead)}</p><div class="hero__actions"><a class="btn btn--accent" href="#shop-products">${esc(page.key === 'shop' ? 'Explore the collection' : 'Shop the collection')} <span aria-hidden="true">↓</span></a></div></div>
</section>`;
}

export function categoryPage(category) {
  const products = productsForCategory(category);
  const breadcrumb = `<nav class="collection-crumbs" aria-label="Breadcrumb"><a href="/shop">Shop</a><span aria-hidden="true">/</span><span aria-current="page">${esc(category.label)}</span></nav>`;
  const body = collectionHero(category) + section(breadcrumb + categoryNavigation(category.key) +
    sh({ eyebrow: `${products.length} ${products.length === 1 ? 'style' : 'styles'}`, title: category.productHeading, body: category.intro, size: 'sm' }) +
    `<div class="merch-grid" id="merch-grid">${products.map(showcaseCard).join('')}</div>`, { id: 'shop-products' }) +
    ctaBand({ tone: 'sand', title: 'A shared purpose.', body: 'Discover the children, families and community at the heart of Faith Reins.', primary: ['Our mission', '/our-mission'], secondary: ['Support Faith Reins', '/give'] });
  return { body, description: category.description, seo: { image: SITE + category.hero.desktop, imageAlt: category.hero.alt, imageWidth: category.hero.width, imageHeight: category.hero.height }, jsonld: {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'CollectionPage', '@id': SITE + category.route + '#collection', url: SITE + category.route, name: category.title, description: category.description, image: SITE + category.hero.desktop, mainEntity: { '@id': SITE + category.route + '#products' }, breadcrumb: { '@id': SITE + category.route + '#breadcrumbs' } },
      { '@type': 'ItemList', '@id': SITE + category.route + '#products', numberOfItems: products.length, itemListElement: products.map((product, index) => ({ '@type': 'ListItem', position: index + 1, name: product.name, url: SITE + '/shop/' + product.slug })) },
      { '@type': 'BreadcrumbList', '@id': SITE + category.route + '#breadcrumbs', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: SITE + '/shop' },
        { '@type': 'ListItem', position: 3, name: category.label, item: SITE + category.route }
      ] }
    ]
  } };
}
