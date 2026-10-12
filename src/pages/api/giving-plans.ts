// Validated endpoint listing the real Monthly Giving plans for the Give page's "recurring gift"
// tab. Elevated for consistency with every other business-data read this session — direct
// anonymous reads have repeatedly failed on this site (Forms, Donations) even where docs
// suggested a "public" variant might work for visitors.
import type { APIRoute } from "astro";
import { auth } from "@wix/essentials";
import { plansV3 } from "@wix/pricing-plans";

export const GET: APIRoute = async () => {
  try {
    const elevatedQueryPlans = auth.elevate(plansV3.queryPlans);
    const res = await elevatedQueryPlans({
      filter: { visibility: "PUBLIC", buyable: true },
      sort: [{ fieldName: "pricingVariants.pricingStrategies.flatRate.amount", order: "ASC" }],
    });

    const plans = (res.plans ?? [])
      .map((plan) => {
        const variant = plan.pricingVariants?.[0];
        const amount = variant?.pricingStrategies?.[0]?.flatRate?.amount;
        return {
          id: plan._id,
          name: plan.name,
          amount: amount ? Number(amount) : 0,
          currency: plan.currency ?? "USD",
        };
      })
      .filter((p) => p.amount > 0)
      .sort((a, b) => a.amount - b.amount);

    return new Response(JSON.stringify({ ok: true, plans }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Could not load giving plans." }), { status: 502 });
  }
};
