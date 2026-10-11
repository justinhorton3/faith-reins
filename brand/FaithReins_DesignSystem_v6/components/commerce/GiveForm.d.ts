/**
 * Donation picker: one-time/monthly segment, amount tiles + Other, fee cover checkbox, live total on the button.
 * @startingPoint section="Commerce" subtitle="Donation form" viewport="700x480"
 */
export interface GiveFormProps {
  amounts?: number[];
  defaultFrequency?: 'One-time' | 'Monthly';
  onDonate?: (gift: { amount: number; frequency: string }) => void;
}
export declare function GiveForm(props: GiveFormProps): JSX.Element;
