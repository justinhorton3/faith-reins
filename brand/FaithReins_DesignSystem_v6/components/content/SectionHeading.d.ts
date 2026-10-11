import * as React from 'react';
/** Eyebrow + title + short body + optional text link — opens every content section. */
export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  linkLabel?: string;
  onLink?: () => void;
  tone?: 'dark' | 'light';
  /** display = Libre Caslon Display; text = Libre Caslon Text */
  titleFace?: 'display' | 'text';
  align?: 'left' | 'center';
  /** md = 46/40/32, sm = 34/32/28 */
  size?: 'md' | 'sm';
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
