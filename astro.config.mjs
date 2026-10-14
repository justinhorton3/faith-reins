import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import wix from "@wix/astro";
import wixPages from "@wix/astro-pages";
import wixHostingAdapter from "@wix/astro-wix-hosting-adapter";

// Wix's hosted preview/release pipeline requires its own adapter — `@wix/astro-wix-hosting-adapter`,
// set on the top-level `adapter` key — and `output: "server"`. This is what Wix's own
// `npm create @wix/new -- headless link` sets up for every headless Astro project. Confirmed by
// direct comparison that swapping to `@astrojs/node` doesn't change the `wix preview` Site URL's
// 404 behavior either way, so this is the correct choice independent of that open issue.
export default defineConfig({
  site: "https://faithreins.com",
  output: "server",
  adapter: wixHostingAdapter(),
  security: { checkOrigin: false },
  trailingSlash: "ignore",
  integrations: [sitemap(), react(), wixPages(), ...wix()],
  build: { format: "directory", inlineStylesheets: "never" },
  vite: { plugins: [tailwindcss()] },
});