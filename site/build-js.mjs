// Bundles + minifies public/assets/site.js into dist/assets/site.js (run after build.mjs).
// Address templates are stubbed out: none of our forms use an address field.
import { createRequire } from "node:module";
import fs from "node:fs";
const req = createRequire("/opt/npm-tools/node_modules/");
const esbuild = req("esbuild");
await esbuild.build({ entryPoints: ["public/assets/site.js"], bundle: true, minify: true, format: "esm", target: "es2020", outfile: "dist/assets/site.js", legalComments: "none",
  plugins: [{ name: "stub-addr", setup(b) { b.onResolve({ filter: /address-templates\.generated\.js$/ }, () => ({ path: "addr", namespace: "stub" })); b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({ contents: 'export const ADDRESS_TEMPLATES={defaultTemplate:"COMMON",byCountry:{},templates:{COMMON:[]}};', loader: "js" })); } }] });
fs.rmSync("dist/assets/wix", { recursive: true, force: true });
const css = fs.readFileSync("dist/assets/site.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, " ").replace(/\s*([{};:,])\s*/g, "$1");
fs.writeFileSync("dist/assets/site.css", css);
