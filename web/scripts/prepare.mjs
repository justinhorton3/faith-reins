// Generates src/styles/site.css (CSS + icon masks) and src/scripts/shell.js from the shared site/ sources.
import fs from "node:fs";
import { iconCss, header, footer } from "../../site/lib.mjs";
const css = fs.readFileSync("../site/public/assets/site.css", "utf8");
const ic = iconCss();
const arrow = ic.match(/\.i-arrow\{--m:[^}]*\}/)[0].replace(".i-arrow", ".text-link");
fs.mkdirSync("src/styles", { recursive: true });
fs.mkdirSync("src/scripts", { recursive: true });
fs.writeFileSync("src/styles/site.css", css + "\n" + ic + arrow);
fs.writeFileSync("src/scripts/shell.js", `export const HEADER=${JSON.stringify(header(""))};export const FOOTER=${JSON.stringify(footer())};\n`);
fs.writeFileSync("src/scripts/site.js", fs.readFileSync("../site/public/assets/site.js", "utf8").replace('"../../src/shell.js"', '"./shell.js"'));
