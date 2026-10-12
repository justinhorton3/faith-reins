import * as React from 'react';
/** Uppercase tracked text link with a 1px gold underline — the secondary action beside a Button, or a section's "read more". */
export interface TextLinkProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** dark = green text on cream/sand; light = cream text on green/photo */
  tone?: 'dark' | 'light';
  /** append a typographic → */
  arrow?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function TextLink(props: TextLinkProps): JSX.Element;
