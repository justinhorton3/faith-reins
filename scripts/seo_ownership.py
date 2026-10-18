"""Remove only Wix-marked SEO fields with a validated source-owned counterpart.

Edits original character ranges, never reserializes HTML or touches embeds/scripts.
Unknown or unmatched non-core fields remain intact. Ambiguous ownership stops the
build, including any removal that would weaken an injected robots restriction.
"""
import re
from collections import defaultdict
from html import unescape
from html.parser import HTMLParser


class SeoOwnershipError(ValueError):
    pass


class OwnedHead(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=False)
        self.html = html
        self.lines = [0] + [match.end() for match in re.finditer("\n", html)]
        self.in_head = False
        self.closed = False
        self.pending_title = None
        self.entries = defaultdict(list)

    def character_position(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, attributes):
        if tag == "head" and not self.closed:
            self.in_head = True
            return
        if not self.in_head:
            return
        if self.pending_title:
            raise SeoOwnershipError("Malformed source/injected title")
        attrs = dict(attributes)
        key = None
        if tag == "title":
            key = "title"
        elif tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            key = "canonical"
        elif tag == "meta":
            name = (attrs.get("property") or attrs.get("name") or "").lower()
            if name in ("description", "robots") or name.startswith(("og:", "twitter:")):
                key = name
        if not key:
            return
        if len(attributes) != len(attrs):
            raise SeoOwnershipError("Duplicate attributes on SEO field: " + key)
        marker = attrs.get("wix-seo-tag")
        if "wix-seo-tag" in attrs and marker != "true":
            raise SeoOwnershipError("Unknown Wix ownership marker: " + key)
        entry = {
            "start": self.character_position(),
            "end": self.character_position() + len(self.get_starttag_text()),
            "wix": marker == "true",
            "value": attrs.get("href" if tag == "link" else "content", "") or "",
        }
        if tag == "title":
            self.pending_title = entry
        else:
            self.entries[key].append(entry)

    def handle_startendtag(self, tag, attrs):
        if tag == "title" and self.in_head:
            raise SeoOwnershipError("Self-closing title")
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag == "title" and self.in_head:
            if not self.pending_title:
                raise SeoOwnershipError("Unmatched title end tag")
            entry = self.pending_title
            entry["value"] = unescape(self.html[entry["end"]:self.character_position()])
            entry["end"] = self.html.index(">", self.character_position()) + 1
            self.entries["title"].append(entry)
            self.pending_title = None
        if tag == "head":
            if self.pending_title:
                raise SeoOwnershipError("Unclosed title")
            self.in_head = False
            self.closed = True


def robot_restrictions(value):
    tokens = {token.strip().lower() for token in value.split(",") if token.strip()}
    if "none" in tokens:
        tokens = (tokens - {"none"}) | {"noindex", "nofollow"}
    return tokens - {"index", "follow", "all"}


def source_owned_seo(html):
    """Return (HTML, removed count), or fail before changing ambiguous HTML."""
    head = OwnedHead(html)
    head.feed(html)
    head.close()
    if head.pending_title or not head.closed:
        raise SeoOwnershipError("Missing/unclosed head or title")
    removals = []
    for key, entries in head.entries.items():
        source = [entry for entry in entries if not entry["wix"]]
        injected = [entry for entry in entries if entry["wix"]]
        if len(source) > 1:
            raise SeoOwnershipError("Multiple source-owned SEO fields: " + key)
        if source and not source[0]["value"].strip():
            raise SeoOwnershipError("Empty source-owned SEO field: " + key)
        if not injected:
            continue
        if not source:
            if key in ("title", "canonical", "description"):
                raise SeoOwnershipError("No source-owned counterpart: " + key)
            continue
        if key == "robots" and any(
            not robot_restrictions(entry["value"]).issubset(robot_restrictions(source[0]["value"]))
            for entry in injected
        ):
            raise SeoOwnershipError("Would weaken injected robots restrictions")
        removals.extend(injected)
    for entry in sorted(removals, key=lambda item: item["start"], reverse=True):
        html = html[:entry["start"]] + html[entry["end"]:]
    return html, len(removals)
