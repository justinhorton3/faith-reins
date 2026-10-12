// Validated endpoint for the site's static Wix Forms (src/lib/lib.mjs's `form()`).
//
// Wix Forms v4's GetForm/CreateSubmission require the business VIEW-FORM scope and reject the
// site's own anonymous visitor identity outright (confirmed empirically: FORM_NOT_FOUND for
// both reads and writes under the visitor token). So the browser never talks to Wix Forms
// directly — it posts here, and this endpoint elevates the one call that needs it.
//
// `kind` is looked up against a fixed allow-list (FORMS/FORM_FIELDS below), never a
// client-supplied formId — an endpoint that accepted an arbitrary formId would let any caller
// write into any form on the site.
import type { APIRoute } from "astro";
import { auth } from "@wix/essentials";
import { submissions } from "@wix/forms";
import { FORMS, FORM_FIELDS } from "../../lib/lib.mjs";

export const POST: APIRoute = async ({ request }) => {
  let body: { kind?: string; submissions?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request body." }), { status: 400 });
  }

  const kind = body.kind;
  const formId = kind ? (FORMS as Record<string, string>)[kind] : undefined;
  const fields = kind ? (FORM_FIELDS as Record<string, { target: string; required: boolean }[]>)[kind] : undefined;
  if (!formId || !fields) {
    return new Response(JSON.stringify({ ok: false, error: "Unknown form." }), { status: 400 });
  }

  const input = body.submissions ?? {};
  const clean: Record<string, string> = {};
  for (const f of fields) {
    const value = input[f.target];
    if (typeof value === "string" && value.trim()) clean[f.target] = value.trim();
    else if (f.required) {
      return new Response(JSON.stringify({ ok: false, error: `Missing required field: ${f.target}` }), { status: 400 });
    }
  }

  try {
    const elevatedCreateSubmission = auth.elevate(submissions.createSubmission);
    await elevatedCreateSubmission({ formId, submissions: clean });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: "Could not submit the form." }), { status: 502 });
  }
};
