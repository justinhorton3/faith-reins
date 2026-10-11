import * as React from 'react';
/**
 * Photo-over-text profile for horses and team members. Falls back to a PhotoSlot when no image is supplied.
 * @startingPoint section="Content" subtitle="Horse / team profile cards" viewport="1000x520"
 */
export interface ProfileCardProps {
  image?: string;
  imagePosition?: string;
  /** PhotoSlot label when image is missing */
  placeholder?: string;
  eyebrow?: string;
  name: string;
  body?: string;
  ratio?: string;
}
export declare function ProfileCard(props: ProfileCardProps): JSX.Element;
/** Responsive grid for ProfileCards: columns desktop, 2 tablet, 1 mobile. */
export interface ProfileGridProps { children: React.ReactNode; columns?: 3 | 4; }
export declare function ProfileGrid(props: ProfileGridProps): JSX.Element;
