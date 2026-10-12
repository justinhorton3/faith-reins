import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import wix from "@wix/astro";
import node from "@astrojs/node";

// The adapter is for local dev/test only (`npm run build` + Playwright) — Wix's own
// `wix preview`/`release` pipeline builds and deploys independently of it, confirmed by
// testing: `wix preview` succeeded with no local adapter configured at all.
export default defineConfig({
  site: "https://faithreins.org",
  output: "static",
  adapter: node({ mode: "standalone" }),
  trailingSlash: "ignore",
  integrations: [sitemap(), react(), ...wix()],
  build: { format: "directory", inlineStylesheets: "never" },
  vite: { plugins: [tailwindcss()] },
});
