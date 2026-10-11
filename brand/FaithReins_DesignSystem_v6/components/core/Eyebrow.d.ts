import * as React from 'react';
/** Small uppercase gold label above a heading. Optional 36px leading rule (used in heroes). */
export interface EyebrowProps {
  /** dark = gold ink on light grounds; light = light gold on green/photo */
  tone?: 'dark' | 'light';
  /** leading 36px rule */
  rule?: boolean;
  /** letter-spacing; .26em default, .3em in heroes */
  tracking?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
