/**
 * Full-bleed photograph band (520/380/280px) with optional caption — breaks up text-heavy pages.
 * @startingPoint section="Content" subtitle="Full-bleed photo band" viewport="1280x520"
 */
export interface PhotoBandProps {
  image: string;
  imagePosition?: string;
  caption?: string;
  height?: number;
}
export declare function PhotoBand(props: PhotoBandProps): JSX.Element;
/** Three-up photo row ("a session in pictures"); stacks on mobile. Pass images, or placeholders labels for PhotoSlots. */
export interface PhotoStripProps {
  images?: string[];
  placeholders?: string[];
  ratio?: string;
}
export declare function PhotoStrip(props: PhotoStripProps): JSX.Element;
