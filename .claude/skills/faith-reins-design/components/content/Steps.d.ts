/**
 * Numbered process — big gold Caslon numerals. Columns on desktop, stacked rows on tablet/mobile.
 * @startingPoint section="Content" subtitle="Numbered steps" viewport="1000x300"
 */
export interface StepsProps { items: Array<{ title: string; body: string }>; }
export declare function Steps(props: StepsProps): JSX.Element;
