// Minimal static file server for local Playwright runs against the built `dist/` output.
//
// Astro 7's `astro preview` always forks to a background daemon and exits 0 immediately,
// which Playwright's webServer treats as an early-exit failure even though the real server
// comes up right after — so local test runs serve dist/ directly instead. This isn't the
// deploy path (Wix's own hosting serves the real site), just test tooling.
//
// Respects two Astro build conventions a bare `python3 -m http.server` doesn't:
//   - trailingSlash: "ignore" — serve a directory's index.html without a 301 redirect.
//   - the custom 404.html file — served with a real 404 status for unknown paths.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "dist");
const port = Number(process.argv[2] || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

async function resolveFile(urlPath) {
  const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const direct = join(root, safePath);
  for (const candidate of [direct, join(direct, "index.html"), `${direct}.html`]) {
    try {
      const s = await stat(candidate);
      if (s.isFile()) return candidate;
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const file = await resolveFile(urlPath);
  if (file) {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
    return;
  }
  try {
    const body = await readFile(join(root, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, () => {
  console.log(`Preview server listening on http://localhost:${port}`);
});
