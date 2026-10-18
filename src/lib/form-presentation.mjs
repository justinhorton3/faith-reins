// Presentation overrides never change the Wix field targets or submission schema.
export function presentFormFields(fields, purpose) {
  if (purpose !== "callback") return fields;
  return fields.map(field => field.kind === "area" ? {
    ...field,
    label: "Callback or scheduling preferences",
    ph: "For example, a convenient time for us to call.",
    help: (field.required ? "" : "Optional. ") + "Share contact or scheduling preferences only. Do not include medical or treatment information.",
  } : field);
}
