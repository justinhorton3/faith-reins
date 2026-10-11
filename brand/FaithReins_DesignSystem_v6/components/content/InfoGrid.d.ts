/**
 * Hairline-topped grid of short items (values, services, tiers). 3–4 columns desktop, 2 tablet, 1 mobile. No boxes, no icons.
 * @startingPoint section="Content" subtitle="Hairline info grid" viewport="1000x360"
 */
export interface InfoGridItem {
  eyebrow?: string;
  /** large Caslon figure above the title — prices, tier amounts, step numbers. Never invented stats. */
  meta?: string;
  title: string;
  body?: string;
  linkLabel?: string;
  /** green top rule instead of hairline */
  strong?: boolean;
}
export interface InfoGridProps {
  items: InfoGridItem[];
  columns?: 2 | 3 | 4;
  onSelect?: (item: InfoGridItem, index: number) => void;
}
export declare function InfoGrid(props: InfoGridProps): JSX.Element;
