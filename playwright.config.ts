import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4321",
  },
  webServer: {
    // Astro 7's `preview` always forks to a background daemon and exits 0 immediately, which
    // Playwright treats as an early-exit failure regardless of the server actually coming up
    // right after. This is local test tooling only, not the deploy path (Wix's own hosting
    // serves the real site) — see scripts/preview-server.mjs for why it's not a bare
    // `python3 -m http.server` (that lacks trailingSlash:ignore and custom-404 support).
    command: "node scripts/preview-server.mjs 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
  },
});
