// The thank-you page's order read as a framework-free store — the logic behind useDonationReceipt.
// Landing on the thank-you URL is Wix's success redirect (it is reached only after the hosted
// checkout completes); the order itself may or may not be readable with the visitor's token, so
// `receipt` null with `loading` false is a normal outcome, not an error — the page thanks the donor
// without order facts. One store per page: createReceiptStore(orderId).
import { fetchDonationReceipt } from "./donate.js";
import { orderIdFromSearch } from "./donations-core.js";
/** `orderId` omitted → read from the current URL (`?orderId=` or `?orderid=`). */
export function createReceiptStore(orderId) {
    const id = orderId ?? (typeof window !== "undefined" ? orderIdFromSearch(window.location.search) : "");
    let state = { orderId: id, loading: !!id, receipt: null };
    let started = false;
    const listeners = new Set();
    function setState(patch) {
        state = { ...state, ...patch };
        for (const fn of listeners)
            fn();
    }
    return {
        getState: () => state,
        subscribe(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
        start() {
            if (started)
                return;
            started = true;
            if (!id)
                return;
            fetchDonationReceipt(id).then((receipt) => { if (started)
                setState({ receipt, loading: false }); });
        },
        stop() {
            started = false;
        },
    };
}
