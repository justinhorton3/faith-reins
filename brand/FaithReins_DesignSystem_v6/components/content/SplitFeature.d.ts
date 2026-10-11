import * as React from 'react';
/**
 * Half photo / half story section. inset = padded on cream, image left; bleed = sand band, image flush right.
 * @startingPoint section="Content" subtitle="Image + story split" viewport="1280x620"
 */
export interface SplitFeatureProps {
  image?: string;
  imagePosition?: string;
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  /** Buttons / TextLinks */
  actions?: React.ReactNode;
  variant?: 'inset' | 'bleed';
  /** swap image side */
  reverse?: boolean;
}
export declare function SplitFeature(props: SplitFeatureProps): JSX.Element;
