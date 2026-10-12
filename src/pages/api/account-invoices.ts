// Validated endpoint for a donor's own Give-form/one-time donation invoices (tax receipts).
//
// Query Invoices requires the business INVOICES.INVOICE_READ permission — it is NOT scoped to
// the calling member the way Pricing Plans' memberListOrders is, so it must be elevated. The
// contactId that scopes the query comes ONLY from the authenticated session
// (fetchCurrentMemberAmbient), never from the client — an endpoint that trusted a
// client-supplied contactId would let any caller read any donor's invoices.
import type { APIRoute } from "astro";
import { auth } from "@wix/essentials";
import { invoices } from "@wix/get-paid";
import { fetchCurrentMemberAmbient } from "../../wix/members/members";

export const GET: APIRoute = async () => {
  const member = await fetchCurrentMemberAmbient();
  if (!member || !member.contactId) {
    return new Response(JSON.stringify({ ok: false, error: "Not logged in." }), { status: 401 });
  }

  try {
    const elevatedQueryInvoices = auth.elevate(invoices.queryInvoices);
    const res = await elevatedQueryInvoices({
      filter: { "customerInfo.contactId": { $eq: member.contactId } },
      sort: [{ fieldName: "issueDate", order: "DESC" }],
      cursorPaging: { limit: 50 },
    });

    const items = (res.invoices ?? []).map((inv) => ({
      id: inv.id,
      displayNumber: inv.numbering?.displayNumber ?? "",
      issueDate: inv.issueDate ? new Date(inv.issueDate).toISOString().slice(0, 10) : "",
      status: inv.status ?? "",
      total: inv.totals?.total ?? "",
      balance: inv.totals?.balance ?? "",
      currency: inv.currency ?? "USD",
      url: inv.links?.url ?? "",
    }));

    return new Response(JSON.stringify({ ok: true, invoices: items }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Could not load invoices." }), { status: 502 });
  }
};
