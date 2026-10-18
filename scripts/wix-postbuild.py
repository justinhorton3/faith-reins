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
import argparse, os, re, shutil, json
from html.parser import HTMLParser
from urllib.parse import urlsplit

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--dist", default=os.path.join(REPO, "dist"))
DIST = os.path.abspath(parser.parse_args().dist)
KEEP_DIRS = {"_astro", "assets", "_wix"}
with open(os.path.join(REPO, "src", "lib", "indexability.json"), encoding="utf-8") as f:
    INDEXABILITY = json.load(f)

def normalized_route(value):
    path = urlsplit(value).path.rstrip("/")
    path = re.sub(r"/index\.html$", "/", path)
    return re.sub(r"\.html$", "", path).rstrip("/") or "/"

class HeadSeo(HTMLParser):
    def __init__(self):
        super().__init__()
        self.noindex = False
        self.redirect = False
        self.canonicals = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            if attrs.get("name", "").lower() == "robots":
                self.noindex |= bool(re.search(r"\bnoindex\b", attrs.get("content", ""), re.I))
            self.redirect |= attrs.get("http-equiv", "").lower() == "refresh"
        if tag == "link" and attrs.get("rel", "").lower() == "canonical":
            self.canonicals.append(attrs.get("href", ""))

def register_page(path, filename):
    route = normalized_route(path)
    if route in INDEXABILITY["excludeRoutes"] or any(route == prefix or route.startswith(prefix + "/") for prefix in INDEXABILITY["excludePrefixes"]):
        return False
    with open(filename, encoding="utf-8") as f:
        head = HeadSeo()
        head.feed(re.split(r"</head\s*>", f.read(), maxsplit=1, flags=re.I)[0])
    if head.noindex or head.redirect:
        return False
    return all(urlsplit(canonical).netloc in ("", "www.faithreins.com") and normalized_route(canonical) == route for canonical in head.canonicals)

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

# A repeated build can retain old postbuild .html copies. Retired aliases must
# not survive beside their hosting redirects. Other served files stay intact.
for redirect in INDEXABILITY["redirects"]:
    source = redirect["from"].rstrip("/")
    retired = os.path.join(DIST, source.lstrip("/") + ("" if source.endswith(".html") else ".html"))
    if os.path.isfile(retired):
        os.remove(retired)

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
pages = [{"path": "/", "static": True}] if register_page("/", os.path.join(DIST, "index.html")) else []
for root, dirs, files in os.walk(DIST):
    dirs[:] = [d for d in dirs if d not in KEEP_DIRS]
    for fname in files:
        if not fname.endswith(".html") or fname in ("index.html", "404.html"):
            continue
        rel_dir = os.path.relpath(root, DIST)
        path = ("/" if rel_dir == "." else "/" + rel_dir.replace(os.sep, "/") + "/") + fname
        if register_page(path, os.path.join(root, fname)):
            pages.append({"path": path, "static": True})
pages.sort(key=lambda x: x["path"])
with open(os.path.join(DIST, "_wix", "pages.json"), "w") as f:
    json.dump(pages, f)

print(f"Done — {len(pages)} routes, hrefs updated.")
