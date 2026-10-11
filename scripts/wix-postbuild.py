#!/usr/bin/env python3
"""
Post-build for Wix drop hosting.
Wix serves files at exact paths only — no dir/index.html auto-serving.
Steps:
  1. Copy dist/dir/index.html → dist/dir.html for every page dir
  2. Delete each index.html from page subdirs (keep dir structure for nested pages)
  3. Rewrite internal hrefs to use .html extensions
  4. Write _wix/pages.json
"""
import os, re, shutil, json

DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist"))
KEEP_DIRS = {"_astro", "assets", "_wix"}

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

# Step 2: rewrite hrefs
for root, dirs, files in os.walk(DIST):
    dirs[:] = [d for d in dirs if d not in KEEP_DIRS]
    for fname in files:
        if not fname.endswith(".html"):
            continue
        fpath = os.path.join(root, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            html = f.read()
        new_html = rewrite_hrefs(html)
        if new_html != html:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_html)

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
