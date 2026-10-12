import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// TODO: register @wix/astro's integration here (import wix from "@wix/astro";
// integrations: [sitemap(), react(), ...wix()]). WIX_CLIENT_ID is already set in
// .env.local (= wix.config.json's appId). Confirmed via `wix preview`: the build itself
// succeeds (all 59 pages), but the deploy step fails with "Permission
// 'VELO.APP_PROJECT_READ' denied for app with id '186d8418-...'" — tied to the app's own
// registration, not any collaborator's dashboard role (tried Admin + a custom Velo role,
// same error after a fresh login). Needs Wix Support to fix the app's permission grant.

export default defineConfig({
  site: "https://faithreins.org",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap(), react()],
  build: { format: "directory", inlineStylesheets: "never" },
  vite: { plugins: [tailwindcss()] },
});
