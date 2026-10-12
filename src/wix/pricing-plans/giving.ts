// Donor giving data layer — caller-permitted member-identity calls only (no elevation).
// memberListOrders/requestCancellation are scoped to the calling member by Wix itself
// (permissionId PRICING_PLANS.MANAGE_OWN_ORDERS, applicableIdentity MEMBER) — never pass or
// trust a client-supplied member/contact id here.
import { orders } from "@wix/pricing-plans";
import { wixModule } from "../sdk";
import type { GivingOrder } from "./types";

type Raw = Record<string, any>;

function toGivingOrder(raw: Raw): GivingOrder {
  const cycle = raw.pricing?.subscription ? "/month" : "";
  return {
    id: raw._id ?? "",
    planName: raw.planName ?? "Monthly giving",
    priceLabel: raw.planPrice ? `$${Number(raw.planPrice).toFixed(2)}${cycle}` : "",
    status: raw.status ?? "",
    cancelPending: !!raw.autoRenewCanceled,
    startDate: raw.startDate ? new Date(raw.startDate).toISOString().slice(0, 10) : "",
  };
}

/** The logged-in member's own recurring giving plans (active or paused). */
export async function getMyGivingOrders(): Promise<GivingOrder[]> {
  const ordersModule = wixModule(orders);
  const res = await ordersModule.memberListOrders({ orderStatuses: ["ACTIVE", "PAUSED"] });
  return ((res.orders ?? []) as Raw[]).map(toGivingOrder);
}

/** Cancels a recurring gift effective at the next payment date (never mid-cycle). */
export async function cancelMyGivingOrder(orderId: string): Promise<void> {
  const ordersModule = wixModule(orders);
  await ordersModule.requestCancellation(orderId, "NEXT_PAYMENT_DATE");
}
