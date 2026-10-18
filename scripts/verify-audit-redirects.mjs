// Read-only production preflight: install redirects before releasing a build
// that removes the legacy HTML fallback. No credentials or Wix writes here.
import { pathToFileURL } from "node:url";
import { AUDIT_REDIRECTS } from "./configure-audit-redirects.mjs";

export async function verifyAuditRedirects({ fetcher = fetch } = {}) {
  const origin = "https://www.faithreins.com";
  await Promise.all(AUDIT_REDIRECTS.map(async redirect => {
    const response = await fetcher(origin + redirect.from, { redirect: "manual", signal: AbortSignal.timeout(15000) });
    const location = response.headers.get("location");
    if (response.status !== 301 || !location || new URL(location, origin).href !== origin + redirect.to) {
      throw new Error(`Release blocked: ${redirect.from} must return a direct HTTP 301 to ${redirect.to}. Configure and verify the release redirects first.`);
    }
  }));
  const destination = await fetcher(origin + AUDIT_REDIRECTS[0].to, { redirect: "manual", signal: AbortSignal.timeout(15000) });
  if (destination.status !== 200) throw new Error("Release blocked: the canonical men's collection must return HTTP 200 without another redirect.");
  return { verified: AUDIT_REDIRECTS.length, destination: AUDIT_REDIRECTS[0].to };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { console.log(JSON.stringify(await verifyAuditRedirects())); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
