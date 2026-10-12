import * as React from 'react';
/** Two-column layout that stacks on mobile (and tablet by default). */
export interface SplitProps {
  left: React.ReactNode;
  right: React.ReactNode;
  /** CSS grid-template-columns at desktop, e.g. "320px 1fr" */
  ratio?: string;
  gap?: number;
  align?: 'start' | 'center' | 'end';
  /** 'tablet' stacks below 1024; 'mobile' stacks below 768 */
  stackAt?: 'tablet' | 'mobile';
}
export declare function Split(props: SplitProps): JSX.Element;
