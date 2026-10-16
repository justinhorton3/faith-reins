# Storefront categories, farm heroes and SEO

Owner direction: Justin Horton, October 16, 2026. Commit directly to main in small to medium independently reviewable batches. Publishing is a separate action; this work prepares repository changes.

## Accepted direction

- Replace the customer-facing label “Layers” with **Outerwear**. Its explanatory copy is “Quarter-Zips, Hoodies & Vests.”
- Give Shop, Men's, Women's, Kids, Outerwear, Hats, and Home & Gifts a dedicated large photographic hero and a real category page.
- Show people wearing or using the actual approved V7 merchandise. Use the existing farm setting: timber-and-wire fencing, wooded pasture, gravel paths, barn and porch, warm natural sunlight.
- Each page gets a distinct scene. The homepage horse-and-girl photograph stays reserved for home. Existing farm photographs are generation references, not reused store heroes.
- Preserve approved identity masters and product originals byte for byte. Archive new generated hero masters and web derivatives separately; record prompts, references, hashes, dimensions and review status.
- Storefront source and assets are independent committed website copies. Website builds must never read this design-system directory.

## Routes and page contracts

| Label | Intended clean route | Current host-compatible route | Scene | Product selection |
| --- | --- | --- | --- | --- |
| Shop | /shop | /shop.html | Man and woman beside the pasture in approved polos | All 18 styles |
| Men's | /shop/mens | /shop/mens.html | Man in forest-green horse polo at the timber fence | Men's polos and hoodies, shared quarter-zip and vest |
| Women's | /shop/womens | /shop/womens.html | Woman in cream horse polo enjoying coffee on the farm porch | Women's polos and hoodies, shared quarter-zip and vest |
| Kids | /shop/kids | /shop/kids.html | Boy and girl in approved youth polos along the farm path | Boys' and girls' polos and hoodies |
| Outerwear | /shop/outerwear | /shop/outerwear.html | Adults wearing the quarter-zip and quilted vest near the barn | Quarter-zip, vest and adult/youth hoodies |
| Hats | /shop/hats | /shop/hats.html | Adult wearing the forest-green embroidered cap by the fence | Horse cap |
| Home & Gifts | /shop/home-gifts | /shop/home-gifts.html | Adults using horse mugs on the farm porch | Drinkware, journals and embroidered throw |

Category pages include a visible category H1, introductory copy, an anchor to products, crawlable category navigation, breadcrumbs, only relevant product cards and a mission link. Products may appear in multiple appropriate collections and retain one canonical product URL. Keep product detail galleries and closed purchasing behavior intact.

## Commit sequence

1. `docs(v7): plan storefront category heroes and SEO` — this plan, photography brief and package checksums.
2. `feat(shop): add category page and SEO foundation` — reusable renderer, metadata/schema support and route-contract verification; no links to unfinished pages.
3. `feat(shop): add mens farm hero and category` — hero assets, provenance, complete Men's page and category navigation entry.
4. `feat(shop): add womens farm hero and category` — equivalent Women's batch.
5. `feat(shop): add kids farm hero and category` — equivalent Kids batch.
6. `feat(shop): add outerwear farm hero and category` — equivalent Outerwear batch and customer-facing naming.
7. `feat(shop): add hats farm hero and category` — equivalent Hats batch.
8. `feat(shop): add home and gifts farm hero and category` — equivalent Home & Gifts batch.
9. `feat(shop): refresh collection hero and navigation` — new people-led shop hero, category links, retained merch corner and full shop metadata.
10. `fix(seo): align sitemap indexing and storefront breadcrumbs` — utility/legacy indexing policy, breadcrumb markup, page sharing images and final verification.

Push each verified batch to main before starting the next commit. Do not force-push or rewrite existing history. Preserve concurrent changes by fetching/rebasing before pushing if required.

## Image acceptance

- Reference the farm image and product originals in every generation call. Use the built-in image-generation tool.
- People look natural; merchandise silhouettes, colors and embroidery match the supplied originals. No invented monograms, extra logos, baked-in headings or promotional text.
- Subject and product stay visible at desktop, tablet and phone widths; headline and CTA have readable contrast. Provide reviewed responsive compositions and explicit intrinsic dimensions.
- Record generated status honestly. Implementation QA is not a new owner approval or supplier manufacturing approval.

## SEO scope

- Unique title/description/canonical/H1 and category-specific social images, server-rendered product links and category text.
- CollectionPage, ItemList and BreadcrumbList for category routes; product breadcrumbs reference the appropriate category without duplicating product URLs.
- Keep basic Product markup truthful. No invented prices, offers, stock, shipping promises or ratings while purchasing remains closed.
- Exclude thank-you pages, the query-driven news template and superseded product placeholders from submitted sitemaps; mark them noindex. Give real content pages their own social images when available.
- Validate canonical, Open Graph, structured-data and sitemap URLs after Wix postbuild rewrites.

## Hosting decision and clean-URL follow-on

The current static Wix drop flow serves exact filenames and has no clean-route fallback. `scripts/wix-postbuild.py` deliberately emits `.html` pages; `/shop` currently returns 404. Keep all new links and canonicals host-compatible in these batches. Removing `.html` requires a separately verified server/Workers routing deployment and permanent redirects for existing URLs. Do not claim clean URLs or redirect behavior until direct requests prove them. This is a known pending deliverable, not an SEO ranking penalty for `.html`.

## Verification and release

For each batch: build Astro, check generated HTML and asset targets, inspect imagery, run focused route/category/metadata checks and package validation, then commit and push. For the final integration: verify mobile/desktop rendering where browser tooling is available, navigation with JavaScript disabled, all sitemap targets and postbuild output. Never enable checkout or submit forms during QA.

## Progress

- Planning: in progress.
- Shared foundation: pending.
- Men's / Women's / Kids / Outerwear / Hats / Home & Gifts / Shop heroes: pending.
- SEO cleanup: pending.
- Clean URLs and permanent redirects: pending hosting work.
- Live release: not requested in this instruction.
