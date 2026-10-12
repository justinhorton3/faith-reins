// Explicit React import: @astrojs/react's SSR bundle for this page compiles JSX to
// React.createElement without it in scope otherwise.
import React from "react";
import { useGiving } from "../../hooks/pricing-plans/useGiving";

export default function GivingPanel() {
  const { orders, loading, error, cancelingId, cancel } = useGiving();

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h2 className="text-lg font-semibold text-foreground">Recurring giving</h2>
      {loading && (
        <div className="mt-4 h-20 animate-pulse rounded-lg bg-secondary" aria-busy="true" />
      )}
      {!loading && error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          You don't have a recurring gift yet. <a href="/give" className="underline">Start one</a>.
        </p>
      )}
      <ul className="mt-4 space-y-3">
        {orders.map((order) => (
          <li key={order.id} className="rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-foreground">{order.planName}</p>
                <p className="text-sm text-muted-foreground">
                  {order.priceLabel}
                  {order.cancelPending && " — ending after this cycle"}
                </p>
              </div>
              {!order.cancelPending && (
                <button
                  type="button"
                  onClick={() => void cancel(order.id)}
                  disabled={cancelingId === order.id}
                  className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
                >
                  {cancelingId === order.id ? "Canceling…" : "Cancel"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {!loading && !error && orders.length > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          You'll get a receipt by email for your first gift. After that, every charge shows here —
          check back anytime to see your giving history, or cancel above.
        </p>
      )}
    </div>
  );
}
