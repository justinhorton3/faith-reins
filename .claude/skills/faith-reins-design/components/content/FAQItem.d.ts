import * as React from 'react';
/** Hairline-divided disclosure row with serif question and gold +/−. Stack several for an FAQ. */
export interface FAQItemProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
export declare function FAQItem(props: FAQItemProps): JSX.Element;

/** Stack of FAQItems under a green top rule. */
export interface FAQListProps {
  items: Array<{ q: string; a: React.ReactNode }>;
  defaultOpenFirst?: boolean;
}
export declare function FAQList(props: FAQListProps): JSX.Element;
