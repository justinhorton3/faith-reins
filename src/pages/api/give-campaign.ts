// Validated endpoint serving the Give page's donation campaign details.
//
// Reading the campaign directly with the site's anonymous visitor token fails outright
// (confirmed empirically — same class of problem as Wix Forms), so this is elevated
// server-side instead. Read-only, no user input, nothing to validate.
import type { APIRoute } from "astro";
import { auth } from "@wix/essentials";
import { donationCampaigns } from "@wix/donations";
import { CAMPAIGN } from "../../lib/lib.mjs";

export const GET: APIRoute = async () => {
  try {
    const elevatedGetDonationCampaign = auth.elevate(donationCampaigns.getDonationCampaign);
    const c = await elevatedGetDonationCampaign(CAMPAIGN);

    return new Response(
      JSON.stringify({
        ok: true,
        campaign: {
          status: c.status,
          archived: c.archived,
          customAmountEnabled: c.customAmountEnabled,
          customAmountOptions: c.customAmountOptions,
          predefinedDonationAmounts: c.predefinedDonationAmounts,
          donationFrequencies: c.donationFrequencies,
          askDonorCoverFee: c.askDonorCoverFee,
          commentsEnabled: c.commentsEnabled,
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Could not load giving options." }), { status: 502 });
  }
};
