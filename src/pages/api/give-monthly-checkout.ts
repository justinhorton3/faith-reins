// Validated endpoint for the Give page's "recurring gift" tab. Creates a redirect session to
// Wix's hosted Pricing Plans checkout for one of the real Monthly Giving plans — Wix handles
// the member login/signup prompt itself on that page, since purchasing a plan requires an
// account (by design: recurring gifts need a login to manage/cancel; one-time gifts don't).
//
// `planId` is checked against the live, public, buyable plan list server-side rather than
// trusted outright from the client, so this can't be used to start checkout for a plan that
// isn't actually a real, public Monthly Giving tier.
import type { APIRoute } from "astro";
import { auth } from "@wix/essentials";
import { plansV3 } from "@wix/pricing-plans";
import { redirects } from "@wix/redirects";

export const POST: APIRoute = async ({ request }) => {
  let body: { planId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request body." }), { status: 400 });
  }

  const planId = body.planId;
  if (!planId) {
    return new Response(JSON.stringify({ ok: false, error: "Missing planId." }), { status: 400 });
  }

  try {
    const elevatedQueryPlans = auth.elevate(plansV3.queryPlans);
    const elevatedCreateRedirectSession = auth.elevate(redirects.createRedirectSession);

    const planCheck = await elevatedQueryPlans({ filter: { _id: planId, visibility: "PUBLIC", buyable: true } });
    if (!planCheck.plans?.length) {
      return new Response(JSON.stringify({ ok: false, error: "That plan isn't available." }), { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const session = await elevatedCreateRedirectSession({
      callbacks: {
        postFlowUrl: `${origin}/give/`,
        thankYouPageUrl: `${origin}/give/thank-you/`,
      },
      paidPlansCheckout: { planId },
    } as Parameters<typeof redirects.createRedirectSession>[0]);

    const url = session.redirectSession?.fullUrl;
    if (!url) throw new Error("No redirect URL returned.");

    return new Response(JSON.stringify({ ok: true, url }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Could not start checkout." }), { status: 502 });
  }
};
