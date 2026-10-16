# Kids’ storefront category — implementation contract

Status: photographic composition approved October 16, 2026; exact V7 logo replacement and hero integration pending. Supplier selection is not a blocker for concept merchandise.

## Page

- Intended URL: `/shop/kids` (current Wix-compatible deployment: `/shop/kids.html`).
- Navigation label: Kids.
- H1: Kids’ Clothing.
- SEO title: Kids’ T-Shirts, Polos & Hoodies | Faith Reins.
- Description: Explore Faith Reins kids’ clothing concepts, from horse polos to cozy hoodies, inspired by our mission to help children and families grow.
- Intro: Everyday favorites for little ones with big hearts.
- Product entries currently present in `src/lib/products.json`: `boys-polo`, `girls-polo`, `boys-hoodie`, `girls-hoodie`. No unverified products, pricing, stock claims or ordering promises.
- Include CollectionPage, ItemList and BreadcrumbList, crawlable product links, and canonical URL matching the actual host-supported route.

## Approved hero direction

- Two distinct children, boy and girl, walking together on a sunny farm path with barn, horse, and fencing.
- Desktop and portrait mobile crops; retain both faces and garment graphics in view.
- Cream tee / forest-green hoodie is a **merchandise sourcing concept**, not an inventory or fulfillment assertion.
- Use **exact existing V7 horse master or approved seal** without alteration; do not use generated horse approximations.
- No text or CTA embedded in photography. Overlay heading and Shop the Collection button as live HTML.
- Do not publish the generated mock with distorted horse marks. Its photographic composition is approved; branding is not.

## Acceptance / commit gate

1. Render the approved artwork over both garments using unchanged V7 identity assets.
2. Export desktop and mobile web images into website-owned `public/assets/shop/v7/heroes/`.
3. Archive photographic masters and provenance separately under V7 foundations.
4. Register Kids category in `src/lib/shop-category-pages.json` with both exported assets.
5. Build Astro, verify image URLs, correct products and canonical metadata, and commit this single category to main.
6. Proceed to Outerwear hero for owner approval; do not mix unapproved Outerwear changes into Kids commit.
