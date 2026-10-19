import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import wix from "@wix/astro";
import wixHostingAdapter from "@wix/astro-wix-hosting-adapter";
import accountRoutes from "./src/integrations/account-routes.mjs";

const accountRuntime = process.env.FR_ACCOUNT_RUNTIME === "1";

export default defineConfig({
  site: "https://www.faithreins.com",
  output: accountRuntime ? "server" : "static",
  adapter: accountRuntime ? wixHostingAdapter() : undefined,
  trailingSlash: "ignore",
  // Wix proxies requests through an internal origin. Our middleware validates public origins.
  security: { checkOrigin: false },
  // /news/post is a template page filled by ?slug=, so it stays out of the sitemap.
  integrations: [...(accountRuntime ? [wix(), accountRoutes()] : []), sitemap({ filter: (page) => !page.includes("/news/post") && !page.includes("/shop/mens") && !page.includes("/account") && !page.includes("/api/") })],
  build: { format: "directory", inlineStylesheets: "never" },
});
