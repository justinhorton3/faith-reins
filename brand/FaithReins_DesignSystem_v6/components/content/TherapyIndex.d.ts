/**
 * Numbered index list of services: number · serif title · description · thumbnail + arrow, divided by hairlines under a green top rule.
 * @startingPoint section="Content" subtitle="Numbered services index" viewport="1000x480"
 */
export interface TherapyIndexItem {
  num?: string;
  title: string;
  description: string;
  image?: string;
  imagePosition?: string;
}
export interface TherapyIndexProps {
  items: TherapyIndexItem[];
  onSelect?: (item: TherapyIndexItem, index: number) => void;
}
export declare function TherapyIndex(props: TherapyIndexProps): JSX.Element;
