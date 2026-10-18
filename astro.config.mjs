import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import wix from "@wix/astro";
import wixHostingAdapter from "@wix/astro-wix-hosting-adapter";
import accountRoutes from "./src/integrations/account-routes.mjs";
import { isIndexableRoute } from "./src/lib/indexability.mjs";

const accountRuntime = process.env.FR_ACCOUNT_RUNTIME === "1";

export default defineConfig({
  site: "https://www.faithreins.com",
  output: accountRuntime ? "server" : "static",
  adapter: accountRuntime ? wixHostingAdapter() : undefined,
  trailingSlash: "ignore",
  // Exact exclusions also preserve real product URLs such as /shop/mens-polo.
  integrations: [...(accountRuntime ? [wix(), accountRoutes()] : []), sitemap({ filter: isIndexableRoute })],
  build: { format: "directory", inlineStylesheets: "never" },
});
