import * as React from 'react';
/** Striped placeholder for photography that hasn't been supplied yet (staff portraits, partner logos). Replace before launch. */
export interface PhotoSlotProps {
  label?: string;
  /** CSS aspect-ratio, e.g. "4 / 5" */
  ratio?: string;
  style?: React.CSSProperties;
}
export declare function PhotoSlot(props: PhotoSlotProps): JSX.Element;
