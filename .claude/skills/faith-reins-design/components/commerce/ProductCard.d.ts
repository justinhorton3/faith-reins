/**
 * Merch card: square product shot on paper, serif name, gold-ink price, size chips, outline add-to-cart.
 * @startingPoint section="Commerce" subtitle="Shop product card" viewport="700x520"
 */
export interface ProductCardProps {
  image?: string;
  name: string;
  price: string;
  /** Men’s | Women’s | Unisex | Youth | Toddler | Adult — shown above the name; one product per fit */
  fit?: string;
  /** e.g. "Youth sizing" — names which size chart applies */
  sizeGuide?: string;
  sizes?: string[];
  onAdd?: (item: { name: string; price: string; size: string | null }) => void;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
