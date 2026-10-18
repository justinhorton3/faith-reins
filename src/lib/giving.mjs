// Faith Reins giving presentation. Campaign capabilities still come from Wix.
export const GIFT_AMOUNTS = [50, 100, 250, 500];
export const GIFT_FREQUENCIES = { ONE_TIME: "One-time", WEEK: "Weekly", MONTH: "Monthly", YEAR: "Yearly" };

export function givingOptions(campaign, requestedFrequency = null) {
  const frequencies = (campaign.donationFrequencies || []).filter(f => Object.hasOwn(GIFT_FREQUENCIES, f));
  if (!frequencies.length) frequencies.push("ONE_TIME");
  const configured = (campaign.predefinedDonationAmounts || []).map(p => Number(p.price?.amount)).filter(n => Number.isFinite(n) && n > 0);
  // Custom amounts permit the approved website suggestions without changing a gift's amount.
  const min = Number(campaign.customAmountOptions?.minimum?.amount) || 0;
  const max = Number(campaign.customAmountOptions?.maximum?.amount) || Infinity;
  const amounts = (campaign.customAmountEnabled ? GIFT_AMOUNTS : configured).filter(n => n >= min && n <= max);
  const frequency = frequencies.includes(requestedFrequency) ? requestedFrequency : frequencies[0];
  return { frequencies, amounts, frequency, requestedUnavailable: !!requestedFrequency && !frequencies.includes(requestedFrequency) };
}

export function giftTotals(amount, includeFee = false) {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) return { amount: 0, fee: 0, total: 0 };
  const cents = Math.round(value * 100);
  // Wix Donations documents a fixed 2.9% optional contribution to processing fees.
  const feeCents = includeFee ? Math.round(cents * .029) : 0;
  return { amount: cents / 100, fee: feeCents / 100, total: (cents + feeCents) / 100 };
}

export function giftCatalogOptions(amount, frequency, includeFee, campaign) {
  if (!(campaign.donationFrequencies || ["ONE_TIME"]).includes(frequency)) throw new Error("Choose an available gift frequency.");
  const quoted = giftTotals(amount, includeFee && campaign.askDonorCoverFee);
  if (!quoted.amount) throw new Error("Choose a valid gift amount.");
  return {
    amount: quoted.amount,
    frequency,
    ...(includeFee && campaign.askDonorCoverFee ? { donorCoveringFees: true } : {}),
  };
}
