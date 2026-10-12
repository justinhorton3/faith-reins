import { useEffect, useState } from "react";

export interface InvoiceSummary {
  id: string;
  displayNumber: string;
  issueDate: string;
  status: string;
  total: string;
  balance: string;
  currency: string;
  url: string;
}

export interface UseInvoices {
  invoices: InvoiceSummary[];
  loading: boolean;
  error: string | null;
}

export function useInvoices(): UseInvoices {
  const [invoices, setInvoices] = useState<InvoiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/account-invoices");
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
        setInvoices(json.invoices);
      } catch {
        if (!cancelled) setError("We couldn't load your giving receipts right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { invoices, loading, error };
}
