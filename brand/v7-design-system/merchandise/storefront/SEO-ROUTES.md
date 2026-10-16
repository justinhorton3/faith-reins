# Faith Reins V7 storefront SEO route contract

**Locked on 2026-10-16.** The canonical human-readable category hierarchy is under `/shop/`:

| Navigation label | Permanent clean slug | Current Wix static filename | Status |
| --- | --- | --- | --- |
| Shop | `/shop` | `/shop.html` | Existing |
| Men | `/shop/men` | `/shop/men.html` | Renamed from `/shop/mens` |
| Women | `/shop/women` | `/shop/women.html` | Implemented with approved hero |
| Kids | `/shop/kids` | `/shop/kids.html` | Existing |
| Outerwear | `/shop/outerwear` | `/shop/outerwear.html` | Approved and implemented |
| Hats | `/shop/hats` | `/shop/hats.html` | Owner-approved hero and category page implemented |
| Home & Gifts | `/shop/home-gifts` | `/shop/home-gifts.html` | Approved category imagery and page implemented |

## Permanent requirements

1. **Use category slugs `men` and `women`, never `mens` or `womens`**. Human navigation labels can use “Men’s” and “Women’s” in copy, but URLs use the clean nouns.
2. Category H1, title tag, description, on-page intro, and social image must be unique. Titles describe the actual product families without fabricating stock, prices or supplier confirmation.
3. Each collection page has server-rendered internal navigation, product links, CollectionPage + ItemList + BreadcrumbList schema, and one primary H1. Product details continue to use **one** canonical URL per product; grouping does not clone products.
4. Do not embed headings, CTA labels or promotional copy in photography; render these in accessible HTML.
5. Preserve old Men’s links: `/shop/mens.html` is a **temporary noindex HTML redirect** with canonical pointing to Men, not a 301. Replace with a proper **HTTP 301 to `/shop/men`** when extensionless routing becomes available.
6. The existing Wix static deployment serves `.html` filenames rather than extensionless paths. Do not claim `/shop/men` is live until verified. Post-build output must align canonical, og:url, JSON-LD URLs, internal links and sitemap with the **actual served URL** until edge routing/301 support is deployed; switch all together when clean routes are supported. No links to 404 clean paths.
7. Old placeholder routes, thank-you pages and query-driven templates must not appear in submitted XML sitemaps. Never invent offers, stock, ratings, shipping or product availability. Checkout stays disabled.
8. Separate category approval gates: approve the specific desktop/mobile hero before integrating and committing its category. Use only exact V7 approved identity and merchandise source art. Commit small, independently reviewable batches to `main`; release separately.

## Sequence

1. Lock this route contract and correct Men to `/shop/men`, with nonindexable compatibility for `/shop/mens`.
2. Restore the **already-approved Women’s farm-porch hero** as independent website images; build `/shop/women`, verify and commit.
3. Outerwear: present hero for visual approval, then build, verify and commit.
4. Hats and Home & Gifts follow the same approval → category page → commit loop.
5. Verify clean-routing and HTTP 301 support in the serving platform before switching canonicals to extensionless URLs or claiming those URLs resolve.

## Outerwear SEO details

`/shop/outerwear` is the sole category canonical. The new men’s vest uses `/shop/men-quilted-vest` as its single product URL; it is also listed under Men. No duplicate product URLs or invented offers. Current Wix preview/static hosting uses `.html` targets until clean URL routing is verified. Live page headings and CTAs are always HTML.

## Hats collection SEO

`/shop/hats` uses the single `caps` product family with three variants: forest green, cream and white. It links to the **one** `/shop/caps` product page. The original owner-approved Hats hero is archived in the V7 package, and the HTML heading, intro and CTA are separate from the image. Publishing is deferred; the current Wix static output uses `/shop/hats.html` until extensionless paths are configured and verified.

## Home & Gifts SEO

The permanent category slug is `/shop/home-gifts`, while the current Wix static host uses `/shop/home-gifts.html`. Seven existing gift catalog families appear as unique product links. The category renders its own HTML H1, copy, navigation, canonical, hero OG image, CollectionPage, ItemList and BreadcrumbList; no fake offers or supplier claims. The desktop/mobile approved photo pair is archived in V7 and served from independent website image assets. Release and clean URL redirects remain separate.

## Main Shop hero

The main Shop landing remains at \`/shop\` with current Wix static output \`/shop.html\`. Its approved desktop and mobile photographic hero assets have dedicated website copies, unique OG/Twitter preview image metadata, HTML heading and CTA, six category navigation tiles, complete approved product catalog, and unchanged merch-corner section. There is no claim of live publication, inventory or confirmed manufacturing artwork. Clean URL redirects require separate verification.
