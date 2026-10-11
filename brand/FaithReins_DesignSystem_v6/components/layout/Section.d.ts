import * as React from 'react';
/** Responsive page band: background tone + breakpoint-aware gutters (64/40/20) and vertical padding (96/80/64). Children stack with 48px (32 mobile) gaps inside a 1312px max-width column. */
export interface SectionProps {
  tone?: 'page' | 'sand' | 'paper' | 'green';
  /** default | tight (60%) | none */
  pad?: 'default' | 'tight' | 'none';
  id?: string;
  maxWidth?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Section(props: SectionProps): JSX.Element;
