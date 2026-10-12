/** Full-width band of hairline-divided audience tiles (parents / providers / donors). */
export interface AudienceTile { eyebrow: string; title: string; linkLabel: string; }
export interface AudienceTilesProps {
  items: AudienceTile[];
  onSelect?: (item: AudienceTile, index: number) => void;
}
export declare function AudienceTiles(props: AudienceTilesProps): JSX.Element;
