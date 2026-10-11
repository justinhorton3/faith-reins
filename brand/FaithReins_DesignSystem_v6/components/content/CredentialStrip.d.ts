/** Full-width strip of credentials / affiliations in small tracked caps with gold square markers. Sits directly under a hero. List only verified credentials. */
export interface CredentialStripProps {
  items?: string[];
  tone?: 'paper' | 'green';
}
export declare function CredentialStrip(props: CredentialStripProps): JSX.Element;
