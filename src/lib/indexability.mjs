import policy from "./indexability.json" with { type: "json" };

export function normalizedRoute(value) {
  return new URL(value, "https://www.faithreins.com").pathname.replace(/\/+$/, "")
    .replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/\/+$/, "") || "/";
}

export function isIndexableRoute(value) {
  const route = normalizedRoute(value);
  return !policy.excludeRoutes.includes(route) &&
    !policy.excludePrefixes.some(prefix => route === prefix || route.startsWith(prefix + "/"));
}
