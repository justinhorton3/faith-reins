// Release-time campaign settings for audit batch 01. Read-only unless --apply is supplied.
// Contract: https://dev.wix.com/docs/api-reference/business-solutions/donations/donation-campaigns/update-donation-campaign
// Get: https://dev.wix.com/docs/api-reference/business-solutions/donations/donation-campaigns/get-donation-campaign
import { pathToFileURL } from "node:url";
import { CAMPAIGN } from "../src/lib/lib.mjs";
import { GIFT_AMOUNTS } from "../src/lib/giving.mjs";

const NEW_500_ID = "bdde25a2-b80e-499a-8f16-33de7d8d555f";
const FREQUENCIES = ["ONE_TIME", "MONTH"];

export function campaignReleaseUpdate(current) {
  if (current.id !== CAMPAIGN || !current.revision) throw new Error("Expected Faith Reins campaign and current revision.");
  if (current.archived || current.status !== "COLLECTING") throw new Error("The campaign is not accepting gifts; review its status before applying settings.");
  if ((current.donationFrequencies || []).some(f => !FREQUENCIES.includes(f))) throw new Error("Additional gift frequencies are configured; review them before replacing settings.");
  const amounts = GIFT_AMOUNTS.map(amount => {
    const existing = (current.predefinedDonationAmounts || []).find(p => Number(p.price?.amount) === amount);
    if (!existing && amount !== 500) throw new Error("An expected preset is missing; review the current campaign before applying settings.");
    return {
      id: existing?.id || NEW_500_ID,
      price: { amount: String(amount) },
      ...(existing?.description ? { description: existing.description } : {}),
    };
  });
  return { donationCampaign: { id: current.id, revision: current.revision, customAmountEnabled: true, predefinedDonationAmounts: amounts, donationFrequencies: FREQUENCIES } };
}

const selected = campaign => ({
  customAmountEnabled: !!campaign.customAmountEnabled,
  predefinedDonationAmounts: (campaign.predefinedDonationAmounts || []).map(p => ({ id: p.id, price: { amount: String(Number(p.price?.amount)) }, ...(p.description ? { description: p.description } : {}) })),
  donationFrequencies: campaign.donationFrequencies,
});

export async function configureAuditGiving({ request, apply = false }) {
  const endpoint = "https://www.wixapis.com/donation-campaigns/v2/donation-campaigns/" + CAMPAIGN;
  const { donationCampaign: current } = await request(endpoint, "GET");
  const update = campaignReleaseUpdate(current);
  const before = selected(current), after = selected(update.donationCampaign);
  const changed = JSON.stringify(before) !== JSON.stringify(after);
  if (!apply || !changed) return { campaignId: CAMPAIGN, applied: false, changed, before, after };
  // Revision is read immediately before this partial update; a conflict fails without retrying.
  const { donationCampaign: updated } = await request(endpoint, "PATCH", update);
  if (!updated || JSON.stringify(selected(updated)) !== JSON.stringify(after)) throw new Error("The campaign response did not confirm the requested settings. Review the response before retrying.");
  return { campaignId: updated.id, revision: updated.revision, applied: true, settings: selected(updated) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.some(arg => !["--apply", "--check"].includes(arg)) || (args.includes("--apply") && args.includes("--check"))) throw new Error("Usage: node scripts/configure-audit-giving.mjs [--check | --apply]");
    // Use a site-scoped admin bearer token; never write it to a file or the browser bundle.
    const token = process.env.WIX_ADMIN_TOKEN;
    if (!token) throw new Error("Set WIX_ADMIN_TOKEN to a site-scoped admin token. No campaign settings were changed.");
    const request = async (url, method, body) => {
      const response = await fetch(url, { method, headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}) });
      if (!response.ok) throw new Error("Wix campaign request failed: HTTP " + response.status + "; request ID " + (response.headers.get("x-wix-request-id") || "unavailable"));
      return response.json();
    };
    console.log(JSON.stringify(await configureAuditGiving({ request, apply: args.includes("--apply") }), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
