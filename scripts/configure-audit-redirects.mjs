// Release-time redirects for FR-14. Read-only unless --apply is supplied.
// Contract: Wix Manage URL Redirects recipe / public SEO Redirects API.
import { pathToFileURL } from "node:url";
import policy from "../src/lib/indexability.json" with { type: "json" };

export const AUDIT_REDIRECTS = policy.redirects;
const API = "https://www.wixapis.com/seo-redirects-service/v1";
const path = value => String(value || "").replace(/\/+$/, "");

export function redirectPlan(existing) {
  if (!Array.isArray(existing)) throw new Error("List Redirects did not return a redirects array.");
  return AUDIT_REDIRECTS.map(desired => {
    let present = false;
    for (const current of existing) {
      if (typeof current.from !== "string" || typeof current.to !== "string") throw new Error("Unexpected redirect shape; review before writing.");
      const sameFrom = path(current.from) === desired.from;
      const exact = sameFrom && path(current.to) === desired.to && !current.options?.groupRedirect && !current.language;
      if (exact) { present = true; continue; }
      const from = path(current.from);
      const groupOverlap = current.options?.groupRedirect && [desired.from, desired.to].some(value => value === from || value.startsWith(from + "/"));
      if (sameFrom || from === desired.to || groupOverlap) {
        throw new Error(`Redirect conflict: ${current.from} -> ${current.to}. Stop and review; no replacement or deletion is authorized.`);
      }
    }
    return { ...desired, present };
  });
}

export async function configureAuditRedirects({ request, apply = false }) {
  const list = async () => redirectPlan((await request(API + "/redirects", "GET")).redirects);
  let plan = await list(); // Preflight the entire group before any write.
  if (!apply) return { applied: false, plan };
  const results = [];
  for (const desired of AUDIT_REDIRECTS) {
    plan = await list(); // Check again immediately before each possible create.
    const next = plan.find(item => item.from === desired.from);
    if (next.present) { results.push({ ...desired, created: false }); continue; }
    const { redirect } = await request(API + "/create-redirect", "POST", { redirect: desired });
    if (!redirect || path(redirect.from) !== desired.from || path(redirect.to) !== desired.to || redirect.options?.groupRedirect || redirect.language) {
      throw new Error("The create response did not confirm the requested redirect. Stop and inspect; do not retry automatically.");
    }
    results.push({ ...desired, created: !!redirect.id, ...(redirect.id ? { id: redirect.id } : {}) });
  }
  return { applied: true, results };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.some(arg => !["--apply", "--check"].includes(arg)) || (args.includes("--apply") && args.includes("--check"))) throw new Error("Usage: node scripts/configure-audit-redirects.mjs [--check | --apply]");
    const token = process.env.WIX_ADMIN_TOKEN;
    if (!token) throw new Error("Set WIX_ADMIN_TOKEN to a Faith Reins site-scoped admin token. No redirects were changed.");
    const request = async (url, method, body) => {
      const response = await fetch(url, { method, headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}) });
      if (!response.ok) throw new Error("Wix redirect request failed: HTTP " + response.status + "; request ID " + (response.headers.get("x-wix-request-id") || "unavailable"));
      return response.json();
    };
    console.log(JSON.stringify(await configureAuditRedirects({ request, apply: args.includes("--apply") }), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
