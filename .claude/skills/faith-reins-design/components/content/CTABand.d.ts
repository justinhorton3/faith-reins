/**
 * Closing call-to-action band. Green (gold button) or sand (green button). One per page, usually last before the footer.
 * @startingPoint section="Content" subtitle="Closing CTA band" viewport="1280x280"
 */
export interface CTABandProps {
  tone?: 'green' | 'sand';
  eyebrow?: string;
  title: string;
  body?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}
export declare function CTABand(props: CTABandProps): JSX.Element;
