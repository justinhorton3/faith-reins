/**
 * Green site footer: lockup + contact, three sitemap columns, gift callout, legal row.
 * @startingPoint section="Navigation" subtitle="Green footer with gift callout" viewport="1280x460"
 */
export interface SiteFooterProps {
  columns?: Array<{ title: string; links: string[] }>;
  blurb?: string;
  phone?: string;
  email?: string;
  legal?: string[];
  onNavigate?: (label: string) => void;
  onGive?: () => void;
  assetBase?: string;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
