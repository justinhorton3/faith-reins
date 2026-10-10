// The donate form for one campaign as a framework-free store — the logic behind useDonation,
// usable from React (the hook wraps it), from a static page's campaign view, from Vue/Svelte, or as
// the specification for a port. Frequency, preset or custom amount, the fee, the note, validation
// with the widget's codes, the live button label, and donate() which navigates the FULL document
// to the Wix-hosted checkout. All correctness (the line item, the checkout, the redirect session)
// lives in the data layer; every rule (defaults, validation, fee, label) in donations-core.
//
// One store per campaign surface: createDonationStore(campaign), not a singleton. A static site
// passes `paths` so the hosted checkout returns to its files (`thank-you.html`).
import { donationCheckoutUrl } from "./donate.js";
import { defaultSelection, donateLabel, errorMessage, feeFor, formatAmount, selectedAmount, toInput, totalFor, validateDonation, } from "./donations-core.js";
export function createDonationStore(campaign, { origin, paths } = {}) {
    const options = campaign.options;
    let sel = defaultSelection(options);
    let showErrors = false;
    let submitting = false;
    let error = null;
    const listeners = new Set();
    const derive = () => {
        const amount = selectedAmount(sel);
        const fee = options.askCoverFee && sel.coverFee ? feeFor(amount) : null;
        const total = totalFor(amount, sel.coverFee, options.askCoverFee);
        const errors = validateDonation(options, sel);
        const messages = {};
        for (const [field, code] of Object.entries(errors))
            messages[field] = errorMessage(code, options);
        return {
            ...sel,
            amount,
            fee,
            feeLabel: formatAmount(fee, options.currency),
            total,
            totalLabel: formatAmount(total, options.currency),
            buttonLabel: donateLabel(total, sel.frequency, options.currency),
            errors,
            messages,
            showErrors,
            valid: Object.keys(errors).length === 0,
            submitting,
            error,
            available: campaign.acceptsDonations,
        };
    };
    let state = derive();
    const emit = () => {
        state = derive();
        for (const fn of listeners)
            fn();
    };
    const update = (patch) => {
        if (submitting)
            return;
        sel = { ...sel, ...patch };
        emit();
    };
    return {
        getState: () => state,
        subscribe(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
        selectPreset: (amount) => update({ presetAmount: amount, customMode: false, customAmount: "" }),
        selectCustom: () => update({ customMode: true, presetAmount: null }),
        setCustomAmount: (text) => update({ customAmount: text }),
        setFrequency: (frequency) => update({ frequency }),
        setCoverFee: (coverFee) => update({ coverFee }),
        setNote: (note) => update({ note: note.slice(0, options.commentMaxLength) }),
        async donate() {
            if (submitting)
                return; // a second click while the checkout is being created is ignored
            showErrors = true;
            error = null;
            if (!campaign.acceptsDonations) {
                error = "This campaign isn't accepting donations right now.";
                emit();
                throw new Error(error);
            }
            const input = toInput(options, sel);
            if (!input) {
                emit();
                return;
            }
            submitting = true;
            emit();
            try {
                window.location.href = await donationCheckoutUrl(campaign.id, input, { origin, paths });
                // stays "submitting" — the browser is leaving for the hosted checkout
            }
            catch (e) {
                submitting = false;
                error = e instanceof Error ? e.message : String(e);
                emit();
                throw e;
            }
        },
    };
}
