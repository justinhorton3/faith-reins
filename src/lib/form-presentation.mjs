// Existing Contact schema, read on 2026-10-18. Newsletter requests go to its
// inbox; they do not claim that an automated mailing-list enrollment occurred.
export const NEWSLETTER_TARGETS = {
  name: "your_name_jc5yie", email: "email_inxptu", message: "message_vn3gtt",
};
export const NEWSLETTER_REQUEST = "Newsletter update request: I would like to receive Faith Reins emails about programs, events and stories.";

// Presentation overrides preserve Wix field targets and backend requirements.
export function presentFormFields(fields, purpose) {
  if (purpose === "newsletter") {
    const name = fields.find(f => f.target === NEWSLETTER_TARGETS.name);
    const email = fields.find(f => f.target === NEWSLETTER_TARGETS.email);
    const message = fields.find(f => f.target === NEWSLETTER_TARGETS.message);
    const known = new Set(Object.values(NEWSLETTER_TARGETS));
    if (name?.kind !== "text" || email?.kind !== "email" || message?.kind !== "area" ||
        fields.some(f => f.required && !known.has(f.target))) {
      throw new Error("Newsletter request schema changed; review its required fields.");
    }
    return [
      { ...name, autocomplete: "name" },
      { ...email, required: true, autocomplete: "email" },
      { ...message, hidden: true, preset: NEWSLETTER_REQUEST },
    ];
  }
  if (purpose !== "callback") return fields;
  return fields.map(field => field.kind === "area" ? {
    ...field,
    label: "Callback or scheduling preferences",
    ph: "For example, a convenient time for us to call.",
    help: (field.required ? "" : "Optional. ") + "Share contact or scheduling preferences only. Do not include medical or treatment information.",
  } : field);
}
