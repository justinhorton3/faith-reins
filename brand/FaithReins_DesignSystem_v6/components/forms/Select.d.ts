import * as React from 'react';
/** Labeled native select styled to match TextField. */
export interface SelectProps {
  label: string;
  options: Array<string | { value: string; label: string }>;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  help?: string;
  error?: string;
  name?: string;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
