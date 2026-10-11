/**
 * Centered pull quote from a parent: gold Caslon quote mark, italic serif quote, gold-ruled attribution. Use only real, permissioned quotes; `placeholder` marks a slot awaiting one.
 * @startingPoint section="Content" subtitle="Parent testimonial" viewport="1000x360"
 */
export interface TestimonialProps {
  quote: string;
  /** e.g. "Parent of a 6-year-old" — first names only, with permission */
  name: string;
  context?: string;
  placeholder?: boolean;
  align?: 'center' | 'left';
}
export declare function Testimonial(props: TestimonialProps): JSX.Element;
