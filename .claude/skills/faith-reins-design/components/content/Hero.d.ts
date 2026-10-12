import * as React from 'react';
/**
 * Full-bleed photo hero. Desktop/tablet: left green scrim, copy left-center. Mobile: bottom scrim, copy bottom-aligned, full-width stacked CTAs, mobile photo crop.
 * @startingPoint section="Content" subtitle="Responsive photo hero" viewport="1280x620"
 */
export interface HeroProps {
  image?: string;
  /** separate crop served below 768px */
  mobileImage?: string;
  imagePosition?: string;
  mobileImagePosition?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  /** accent (gold, default) or primary */
  primaryVariant?: 'accent' | 'primary';
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** home = tall 86px title; page = interior 64px title */
  size?: 'home' | 'page';
  height?: string | number;
}
export declare function Hero(props: HeroProps): JSX.Element;
