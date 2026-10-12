import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.faithreins.com",
  output: "static",
  trailingSlash: "ignore",
  // /news/post is a template page filled by ?slug=, so it stays out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes("/news/post") })],
  build: { format: "directory", inlineStylesheets: "never" },
});
