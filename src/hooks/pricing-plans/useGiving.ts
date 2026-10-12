import { useCallback, useEffect, useState } from "react";
import { getMyGivingOrders, cancelMyGivingOrder } from "../../wix/pricing-plans/giving";
import type { GivingOrder } from "../../wix/pricing-plans/types";

export interface UseGiving {
  orders: GivingOrder[];
  loading: boolean;
  error: string | null;
  /** Per-order id while a cancellation request is in flight. */
  cancelingId: string | null;
  cancel: (orderId: string) => Promise<void>;
}

export function useGiving(): UseGiving {
  const [orders, setOrders] = useState<GivingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setOrders(await getMyGivingOrders());
    } catch {
      setError("We couldn't load your giving history right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const cancel = useCallback(
    async (orderId: string) => {
      setCancelingId(orderId);
      try {
        await cancelMyGivingOrder(orderId);
        await load();
      } catch {
        setError("We couldn't cancel that gift right now. Please try again or contact us.");
      } finally {
        setCancelingId(null);
      }
    },
    [load],
  );

  return { orders, loading, error, cancelingId, cancel };
}
