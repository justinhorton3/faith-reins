import * as React from 'react';
/** The Faith Reins horse emblem as a transparent PNG. Never redraw it; min 24px tall. */
export interface HorseMarkProps {
  color?: 'green' | 'gold' | 'cream';
  height?: number;
  /** folder containing horse-mark-*.png (relative to the consuming page) */
  assetBase?: string;
  alt?: string;
  style?: React.CSSProperties;
}
export declare function HorseMark(props: HorseMarkProps): JSX.Element;
