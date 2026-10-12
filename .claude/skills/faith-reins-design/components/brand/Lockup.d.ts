import * as React from 'react';
/**
 * Primary horizontal logo (L1): horse emblem + tracked Libre Caslon Display wordmark + ruled tagline. Tagline rules never extend past the wordmark width.
 * @startingPoint section="Brand" subtitle="Primary horizontal logo, light and dark" viewport="700x360"
 */
export interface LockupProps {
  /** light = for cream/sand grounds; dark = for green grounds */
  tone?: 'light' | 'dark';
  /** xs = mobile header (34px horse), sm = header/footer (44px horse), md = 84px horse, lg = 120px horse */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** open = horse alone (L1/3a, default); disc = horse reversed out of a solid circle (3c, for avatars/favicons only) */
  mark?: 'disc' | 'open';
  /** override the horse color (e.g. "gold" on green) */
  markColor?: 'green' | 'gold' | 'cream';
  tagline?: string;
  showTagline?: boolean;
  assetBase?: string;
  style?: React.CSSProperties;
}
export declare function Lockup(props: LockupProps): JSX.Element;
