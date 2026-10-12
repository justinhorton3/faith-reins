import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.faithreins.com",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  build: { format: "directory", inlineStylesheets: "never" },
});
