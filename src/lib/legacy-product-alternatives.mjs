// Retained bookmarks get a relevant current category, without implying an exact
// replacement, a matching size range or current purchasing availability.
const PATHS = {
  'mens-tee': ['men', ['heritage-hoodie', 'quarter-zip']],
  'long-sleeve-tee': ['men', ['heritage-hoodie', 'quarter-zip']],
  'crewneck': ['men', ['heritage-hoodie', 'quarter-zip']],
  'womens-tee': ['women', ['womens-hoodie', 'quarter-zip']],
  'womens-long-sleeve-tee': ['women', ['womens-hoodie', 'quarter-zip']],
  'womens-crewneck': ['women', ['womens-hoodie', 'quarter-zip']],
  'childrens-tee': ['kids', ['kids-seal-tee', 'kids-seal-hoodie']],
  'toddler-tee': ['kids', ['kids-seal-tee', 'kids-seal-hoodie']],
  'youth-long-sleeve-tee': ['kids', ['kids-seal-tee', 'kids-seal-hoodie']],
  'youth-crewneck': ['kids', ['kids-seal-hoodie', 'boys-hoodie', 'girls-hoodie']],
  'childrens-hoodie': ['kids', ['kids-seal-hoodie', 'boys-hoodie', 'girls-hoodie']],
  'youth-polo': ['kids', ['boys-polo', 'girls-polo']],
  'youth-cap': ['hats', ['caps']],
  'beanie': ['hats', ['caps']],
  'travel-mug': ['home-gifts', ['coffee-mug', 'logo-mug', 'horse-water-bottle', 'logo-water-bottle']],
  'keychains': ['home-gifts', ['horse-journal', 'logo-journal', 'coffee-mug', 'embroidered-throw']],
  'stickers': ['home-gifts', ['horse-journal', 'logo-journal', 'coffee-mug', 'embroidered-throw']],
};

export const retainedLegacyRoutes = Object.keys(PATHS).map(slug => '/shop/' + slug);

export function legacyProductAlternatives(slug, products, categories) {
  const entry = PATHS[slug];
  if (!entry) throw new Error('Choose a relevant category before retaining legacy product: ' + slug);
  const [key, preferred] = entry;
  const category = categories.find(category => category.key === key);
  if (!category) throw new Error('Missing legacy destination category: ' + key);
  const suggestions = preferred.map(slug => products.find(product => product.slug === slug));
  if (suggestions.some(product => !product || !category.products.includes(product.slug))) throw new Error('Legacy alternatives must belong to the selected category.');
  return { category, suggestions };
}
