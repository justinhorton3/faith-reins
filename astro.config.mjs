import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://faithreins.org",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap(), react()],
  build: { format: "directory", inlineStylesheets: "never" },
  vite: { plugins: [tailwindcss()] },
});
