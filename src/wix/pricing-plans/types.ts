// Giving DTOs — plain, serializable shapes for the donor account surfaces.

export interface GivingOrder {
  id: string;
  planName: string;
  /** Formatted "$25.00/month" style string — already includes the period. */
  priceLabel: string;
  status: string;
  /** True when the order is already set to end at the next payment date. */
  cancelPending: boolean;
  /** "YYYY-MM-DD", or "" when the order has no fixed start. */
  startDate: string;
}
