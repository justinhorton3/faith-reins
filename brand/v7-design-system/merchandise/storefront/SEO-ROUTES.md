# Faith Reins V7 storefront SEO route contract

**Locked on 2026-10-16.** The canonical human-readable category hierarchy is under `/shop/`:

| Navigation label | Permanent clean slug | Current Wix static filename | Status |
| --- | --- | --- | --- |
| Shop | `/shop` | `/shop.html` | Existing |
| Men | `/shop/men` | `/shop/men.html` | Renamed from `/shop/mens` |
| Women | `/shop/women` | `/shop/women.html` | Approved hero; implementation next |
| Kids | `/shop/kids` | `/shop/kids.html` | Existing |
| Outerwear | `/shop/outerwear` | `/shop/outerwear.html` | Awaiting hero approval |
| Hats | `/shop/hats` | `/shop/hats.html` | Awaiting hero approval |
| Home & Gifts | `/shop/home-gifts` | `/shop/home-gifts.html` | Awaiting hero approval |

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
