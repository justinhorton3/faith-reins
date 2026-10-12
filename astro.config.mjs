import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// TODO: register @wix/astro's integration here once WIX_CLIENT_ID can be pulled
// (`npx wix env pull`) — currently blocked by an account permission gap
// ("VELO.APP_PROJECT_READ" denied for this project's app), not a code issue.
// See the astro.config.mjs comment history / commit log for context.

export default defineConfig({
  site: "https://faithreins.org",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap(), react()],
  build: { format: "directory", inlineStylesheets: "never" },
  vite: { plugins: [tailwindcss()] },
});
