import * as React from 'react';
/**
 * Labeled square text input or textarea on paper fill; green focus border with light-gold ring.
 * @startingPoint section="Forms" subtitle="Text fields, select, checkbox" viewport="700x460"
 */
export interface TextFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'date';
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  help?: string;
  /** error message; turns border red */
  error?: string;
  multiline?: boolean;
  rows?: number;
  name?: string;
  style?: React.CSSProperties;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
