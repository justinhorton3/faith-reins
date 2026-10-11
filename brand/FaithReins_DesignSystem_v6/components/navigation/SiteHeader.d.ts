/**
 * Double header (concept 5a). The utility bar scrolls away and the main bar sticks to the top (`sticky`). Ancestors must not set overflow: hidden — use overflow-x: clip. green utility bar (gold tagline left; phone, For Providers, Contact right) over a cream main bar with the L1 lockup, uppercase nav and a green Support button. Full nav at 1280px and up; below that, Support + a three-line hamburger (44px target, 1.5px bars) that opens a drawer; it animates to an × to close. On mobile the utility bar shows only the phone and Contact. The full L1 lockup (with gold tagline) is used at every breakpoint — only its size changes.
 * @startingPoint section="Navigation" subtitle="Double header with utility bar" viewport="1280x200"
 */
export interface SiteHeaderProps {
  /** dark (site default) = green main bar + cream utility bar; light = cream main bar + green utility bar */
  tone?: 'light' | 'dark';
  links?: string[];
  active?: string;
  /** shown in the utility bar (tap-to-call) and in the drawer */
  phone?: string | null;
  utilityText?: string;
  /** right-side utility links; mobile/tablet keep only the last */
  utilityLinks?: string[];
  showUtility?: boolean;
  ctaLabel?: string;
  onNavigate?: (label: string) => void;
  onCta?: () => void;
  onLogo?: () => void;
  assetBase?: string;
  sticky?: boolean;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
