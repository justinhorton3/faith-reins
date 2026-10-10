// Bundles + minifies public/assets/site.js into dist/assets/site.js (run after build.mjs).
import fs from "node:fs";
import { createRequire } from "node:module";
import { iconCss } from "./lib.mjs";
const esbuild = createRequire("/opt/npm-tools/node_modules/")("esbuild");
await esbuild.build({ entryPoints: ["public/assets/site.js"], bundle: true, minify: true, format: "esm", target: "es2020", outfile: "dist/assets/site.js", legalComments: "none" });
const css = fs.readFileSync("dist/assets/site.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, " ").replace(/\s*([{};:,])\s*/g, "$1");
const ic = iconCss();
const arrow = ic.match(/\.i-arrow\{--m:[^}]*\}/)[0].replace(".i-arrow", ".text-link");
fs.writeFileSync("dist/assets/site.css", css + ic + arrow);
