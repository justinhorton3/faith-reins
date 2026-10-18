#!/usr/bin/env python3
"""
Post-build for Wix drop hosting.
Wix serves files at exact paths only — no dir/index.html auto-serving.
Steps:
  0. Preflight source SEO ownership and remove competing Wix-marked tags
  1. Copy dist/dir/index.html → dist/dir.html for every page dir
  2. Delete each index.html from page subdirs (keep dir structure for nested pages)
  3. Rewrite internal hrefs to use .html extensions
  4. Write _wix/pages.json
"""
import argparse, os, re, shutil, json
from seo_ownership import source_owned_seo, SeoOwnershipError

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--dist", default=os.path.join(os.path.dirname(__file__), "..", "dist"))
DIST = os.path.abspath(parser.parse_args().dist)
KEEP_DIRS = {"_astro", "assets", "_wix"}

# Wix's HTML-embeds middleware also runs during prerendering. Keep the
# explicit source SEO owner without disabling other Wix embeds or features.
# Preflight every page before writing any SEO ownership changes.
seo_changes = []
removed_seo = 0
for root, dirs, files in os.walk(DIST):
    dirs[:] = [d for d in dirs if d not in KEEP_DIRS and d != "_worker.js"]
    for name in sorted(files):
        if not name.endswith(".html"):
            continue
        filename = os.path.join(root, name)
        with open(filename, encoding="utf-8", newline="") as f:
            original = f.read()
        try:
            cleaned, count = source_owned_seo(original)
        except SeoOwnershipError as error:
            raise SystemExit(f"SEO ownership blocked publication: {filename}: {error}")
        if count:
            seo_changes.append((filename, cleaned))
            removed_seo += count
for filename, cleaned in seo_changes:
    with open(filename, "w", encoding="utf-8", newline="") as f:
        f.write(cleaned)
print(f"Source SEO ownership: removed {removed_seo} competing Wix tags in {len(seo_changes)} files; other embeds retained.")

def needs_html_ext(path):
    if not path.startswith("/"):
        return False
    if path == "/":
        return False
    last = path.rstrip("/").rsplit("/", 1)[-1]
    return "." not in last

def rewrite_hrefs(html):
    def replace_href(m):
        val = m.group(1)
        return f'href="{val}.html"' if needs_html_ext(val) else m.group(0)
    return re.sub(r'href="([^"#?]*)"', replace_href, html)

# Step 1: copy dir/index.html → dir.html; delete the index.html
for root, dirs, files in os.walk(DIST):
    dirs[:] = [d for d in dirs if d not in KEEP_DIRS]
    if "index.html" not in files:
        continue
    rel = os.path.relpath(root, DIST)
    if rel == ".":
        continue  # root index.html stays as-is
    parts = rel.split(os.sep)
    # Destination: one level up from the page dir, named dir.html
    dst = os.path.join(DIST, *parts[:-1], parts[-1] + ".html")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(os.path.join(root, "index.html"), dst)
    os.remove(os.path.join(root, "index.html"))   # remove original

# Remove any now-empty page subdirs
for root, dirs, files in os.walk(DIST, topdown=False):
    rel = os.path.relpath(root, DIST)
    if rel == "." or rel.split(os.sep)[0] in KEEP_DIRS:
        continue
    if not os.listdir(root):
        os.rmdir(root)

# Step 2: rewrite links to pages that now live at /<route>.html
ROUTES = set()
for root, dirs, files in os.walk(DIST):
    dirs[:] = [d for d in dirs if d not in KEEP_DIRS]
    for fname in files:
        if fname.endswith(".html") and fname not in ("index.html", "404.html"):
            rel = os.path.relpath(os.path.join(root, fname), DIST).replace(os.sep, "/")
            ROUTES.add("/" + rel[:-5])

# A quoted root-relative path (optionally with a trailing slash, query or hash),
# quotes may be JSON-escaped inside JS bundles: "/x", '/x', \"/x\"
LINK = re.compile(r'(\\?["\'>]|<loc>)((?:https://www\.faithreins\.com)?)(/[A-Za-z0-9_\-/]*[A-Za-z0-9_\-])/?([?#][^"\'\\<]*)?(\\?["\']|</loc>)')

def rewrite_links(text):
    def sub(m):
        q1, origin, path, tail, q2 = m.group(1), m.group(2), m.group(3), m.group(4) or "", m.group(5)
        if path not in ROUTES:
            return m.group(0)
        return f"{q1}{origin}{path}.html{tail}{q2}"
    return LINK.sub(sub, text)

changed = 0
for root, dirs, files in os.walk(DIST):
    rel_top = os.path.relpath(root, DIST).split(os.sep)[0]
    if rel_top in ("assets", "_wix"):
        continue
    for fname in files:
        if not fname.endswith((".html", ".js", ".mjs", ".xml")):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            text = f.read()
        new_text = rewrite_links(text)
        if new_text != text:
            changed += 1
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_text)
print(f"Rewrote page links in {changed} files ({len(ROUTES)} page routes).")

# Step 3: write _wix/pages.json
os.makedirs(os.path.join(DIST, "_wix"), exist_ok=True)
pages = [{"path": "/", "static": True}]
for root, dirs, files in os.walk(DIST):
    dirs[:] = [d for d in dirs if d not in KEEP_DIRS]
    for fname in files:
        if not fname.endswith(".html") or fname in ("index.html", "404.html"):
            continue
        rel_dir = os.path.relpath(root, DIST)
        path = ("/" if rel_dir == "." else "/" + rel_dir.replace(os.sep, "/") + "/") + fname
        pages.append({"path": path, "static": True})
pages.sort(key=lambda x: x["path"])
with open(os.path.join(DIST, "_wix", "pages.json"), "w") as f:
    json.dump(pages, f)

print(f"Done — {len(pages)} routes, hrefs updated.")
