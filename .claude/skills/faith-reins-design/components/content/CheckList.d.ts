/** List with small gold square bullets. Items are plain strings or {title, body}. */
export interface CheckListProps {
  items: Array<string | { title: string; body?: string }>;
  columns?: 1 | 2;
}
export declare function CheckList(props: CheckListProps): JSX.Element;
