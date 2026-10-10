#!/usr/bin/env python3
"""Validate the Faith Reins Wix execution-plan source of truth."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
PLANS = ROOT / "execution-plans"

EXPECTED = {
    "home", "our-mission", "services", "occupational-therapy",
    "physical-therapy", "speech-language-therapy", "counseling",
    "equine-assisted-learning", "for-families", "book-online",
    "for-referring-providers", "payment-and-insurance", "give",
    "sponsorships", "impact-and-stewardship", "our-team", "our-partners",
    "our-horses", "join-our-team", "contact", "faq",
}

required_sections = (
    "## Status", "## Required Context", "## Assets", "## Copy",
    "## Validation", "## Done Means",
)

errors: list[str] = []
page_plans = {
    p.stem.removeprefix("page-"): p
    for p in PLANS.glob("page-*.md")
    if p.name not in {"page-pasture-hero.md", "page-build-spec.md"}
}

missing = EXPECTED - page_plans.keys()
extra = page_plans.keys() - EXPECTED - {"shop"}
if missing:
    errors.append(f"missing v4 page plans: {', '.join(sorted(missing))}")
if extra:
    errors.append(f"unexpected production page plans: {', '.join(sorted(extra))}")

for name, path in sorted(page_plans.items()):
    text = path.read_text(encoding="utf-8")
    for section in required_sections:
        if section not in text:
            errors.append(f"{path.relative_to(ROOT)} missing {section}")
    for asset in re.findall(r"`((?:images|brand)/[^`]+)`", text):
        if "*" not in asset and not (ROOT / asset).exists():
            errors.append(f"{path.relative_to(ROOT)} references missing asset {asset}")

for path in page_plans.values():
    text = path.read_text(encoding="utf-8")
    for forbidden in ("donation-action", "form-submit", "shop-section", "team-section", "123 County", "(123)", "info@faithreins"):
        if forbidden in text:
            errors.append(f"{path.relative_to(ROOT)} contains unresolved value {forbidden}")

for required in ("quality-gate.md", "wix-implementation-spec.md", "page-build-spec.md", "v4-mock-inventory.md"):
    if not (PLANS / required).exists():
        errors.append(f"missing shared build contract {PLANS / required}")

if errors:
    print("Execution-plan validation failed:")
    print("\n".join(f"- {error}" for error in errors))
    sys.exit(1)

print(f"Execution-plan validation passed: {len(EXPECTED)} v4 page plans plus {len(page_plans) - len(EXPECTED)} site extension, asset references, contracts, and placeholder checks.")
