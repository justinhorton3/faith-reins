import * as React from 'react';
/**
 * Square, uppercase-tracked button. One filled button per view; gold "accent" is for the single most important action on a green or photo surface.
 * @startingPoint section="Core" subtitle="Primary, accent and outline buttons" viewport="700x300"
 */
export interface ButtonProps {
  /** primary = green fill (default), accent = gold fill, outline = green outline, outline-inverse = cream outline for green/photo grounds */
  variant?: 'primary' | 'accent' | 'outline' | 'outline-inverse';
  /** md = 17×28 padding (page CTAs), sm = 14×24 (header, footer) */
  size?: 'sm' | 'md';
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
