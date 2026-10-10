import { defineConfig } from "astro/config";
import { header, footer } from "./src/lib/lib.mjs";

const SHELL = `export const HEADER=${JSON.stringify(header(""))};export const FOOTER=${JSON.stringify(footer())};`;

export default defineConfig({
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory", inlineStylesheets: "never" },
  vite: {
    plugins: [
      {
        name: "faith-reins-shell",
        resolveId(id) { if (id === "virtual:shell") return "\0virtual:shell"; },
        load(id) { if (id === "\0virtual:shell") return SHELL; },
      },
    ],
  },
});
