/** Long-form reading column (760px) for policies — sections divided by hairlines, 17/1.7 body. */
export interface ProseProps {
  updated?: string;
  sections: Array<{ heading: string; paragraphs?: string[]; list?: string[] }>;
}
export declare function Prose(props: ProseProps): JSX.Element;
