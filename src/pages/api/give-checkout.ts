// Validated endpoint for the Give page's one-time donation checkout.
//
// The donation campaign and its catalog item are only resolvable under an elevated identity —
// confirmed empirically: the site's anonymous visitor token gets rejected reading the campaign
// AND adding it to a cart, the same class of problem as Wix Forms. So the whole
// cart -> checkout -> redirect-session chain runs here, server-side, instead of in the browser.
//
// One-time gifts intentionally stay anonymous (email only, no login) — recurring giving lives
// entirely on Pricing Plans (member-gated) instead, so this endpoint only ever creates
// ONE_TIME donations.
import type { APIRoute } from "astro";
import { auth } from "@wix/essentials";
import { cartV2, cart } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import { CAMPAIGN } from "../../lib/lib.mjs";

const DONATIONS_APP_ID = "333b456e-dd48-4d6b-b32b-9fd48d74e163";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let body: { amount?: number; email?: string; coverFee?: boolean; note?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request body." }), { status: 400 });
  }

  const amount = Number(body.amount);
  const email = (body.email ?? "").trim();
  if (!Number.isFinite(amount) || amount <= 0) {
    return new Response(JSON.stringify({ ok: false, error: "Enter a valid amount." }), { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: "Enter a valid email address." }), { status: 400 });
  }

  try {
    const elevatedCreateCart = auth.elevate(cartV2.createCart);
    const elevatedCreateCheckout = auth.elevate(cart.createCheckout);
    const elevatedCreateRedirectSession = auth.elevate(redirects.createRedirectSession);

    const options: Record<string, unknown> = { amount, frequency: "ONE_TIME" };
    if (body.coverFee) options.donorCoveringFees = true;

    const createdCart = await elevatedCreateCart({
      cart: { note: body.note?.trim() || undefined },
      catalogItems: [
        {
          quantity: 1,
          catalogReference: { appId: DONATIONS_APP_ID, catalogItemId: CAMPAIGN, options },
        },
      ],
    });
    const cartId = createdCart.cart?._id;
    if (!cartId) throw new Error("No cart id returned.");

    const checkout = await elevatedCreateCheckout(cartId, { channelType: "WEB", email });
    const checkoutId = (checkout as { checkoutId?: string }).checkoutId;
    if (!checkoutId) throw new Error("No checkout id returned.");

    const origin = new URL(request.url).origin;
    const session = await elevatedCreateRedirectSession({
      callbacks: {
        postFlowUrl: `${origin}/give/`,
        thankYouPageUrl: `${origin}/give/thank-you/`,
      },
      ecomCheckout: { checkoutId },
    } as Parameters<typeof redirects.createRedirectSession>[0]);

    const url = session.redirectSession?.fullUrl;
    if (!url) throw new Error("No redirect URL returned.");

    return new Response(JSON.stringify({ ok: true, url }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Could not start checkout." }), { status: 502 });
  }
};
