# Reproducible, independent website build

The lockfile now records the missing TypeScript 5.9.3 peer dependency. No existing dependency versions, integrity values or platform metadata change, and package.json remains unchanged. Use npm ci; do not conceal installation failures with a fallback npm install in CI.

The repository ownership workflow uses Node 22, installs the locked dependencies and runs scripts/check-website-independence.py. That check deletes generated dist output, builds normally, records every output path and SHA-256, then temporarily moves the entire brand directory outside the checkout and builds again from an empty dist. The two file inventories and hashes must match exactly. No brand assets are copied into the website by this check.

The original brand directory is restored even when the second build fails. If a build unexpectedly recreates brand or restoration fails, the original directory remains in the named sibling recovery directory and the check fails. The check never recursively deletes that recovery directory. Unit tests cover matching output, brand-dependent output, build failure and preservation of both directories when a build recreates brand.

Local commands:

```sh
npm ci --no-audit --no-fund
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p test_website_independence.py
ASTRO_TELEMETRY_DISABLED=1 python3 scripts/check-website-independence.py
```

This verifies installation and build independence. It does not replace responsive visual review, browser interaction tests or Wix runtime validation. No Chromium binary, credentials or deployment are part of this change. Website identity PR #16 remains a separate visual review.
