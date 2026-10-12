import * as React from 'react';
/** Gold-outlined donation box for green surfaces (footer, green bands). */
export interface GiftCalloutProps {
  title?: string;
  body?: string;
  ctaLabel?: string;
  onCta?: () => void;
  style?: React.CSSProperties;
}
export declare function GiftCallout(props: GiftCalloutProps): JSX.Element;
