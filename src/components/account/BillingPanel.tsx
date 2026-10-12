// Explicit React import: @astrojs/react's SSR bundle for this page compiles JSX to
// React.createElement without it in scope otherwise.
import React from "react";
import { useInvoices } from "../../hooks/account/useInvoices";

const STATUS_LABEL: Record<string, string> = {
  PUBLISHED: "Open",
  PARTIALLY_PAID: "Partially paid",
  PAID: "Paid",
  VOIDED: "Voided",
};

function formatAmount(value: string, currency: string): string {
  if (!value) return "";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(value));
  } catch {
    return `${value} ${currency}`;
  }
}

export default function BillingPanel() {
  const { invoices, loading, error } = useInvoices();

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h2 className="text-lg font-semibold text-foreground">Giving receipts</h2>
      {loading && (
        <div className="mt-4 h-20 animate-pulse rounded-lg bg-secondary" aria-busy="true" />
      )}
      {!loading && error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && invoices.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No receipts yet. One-time gifts and your recurring giving's receipts will appear here.
        </p>
      )}
      <ul className="mt-4 space-y-3">
        {invoices.map((inv) => (
          <li key={inv.id} className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
            <div>
              <p className="font-medium text-foreground">{inv.displayNumber || inv.issueDate}</p>
              <p className="text-sm text-muted-foreground">
                {inv.issueDate} — {STATUS_LABEL[inv.status] ?? inv.status} — {formatAmount(inv.total, inv.currency)}
              </p>
            </div>
            {inv.url && (
              <a
                href={inv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-primary underline"
              >
                View
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
