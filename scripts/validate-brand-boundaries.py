#!/usr/bin/env python3
"""Check repository ownership without changing artwork or website assets."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []
for old in ('v7-design-system', 'brand/v7-product-images', 'images', 'product-catalog'):
    if (ROOT / old).exists():
        errors.append('Competing source directory: ' + old)

# Comments may name the reference system; executable imports and asset URLs may not.
reference = re.compile(r'''(?:from\s*|import\s*(?:\(\s*)?|url\(\s*|(?:src|href)\s*=\s*)["']([^"']+)''')
for folder in ('src', 'public'):
    for path in (ROOT / folder).rglob('*'):
        if path.is_symlink():
            errors.append('Website symlink: ' + str(path.relative_to(ROOT)))
        if path.is_file() and path.suffix in ('.mjs', '.js', '.ts', '.astro', '.css', '.html', '.json', '.svg'):
            for target in reference.findall(path.read_text()):
                if re.search(r'(?:^|/)(?:brand|v7-design-system)/', target):
                    errors.append('Website depends on brand package: ' + str(path.relative_to(ROOT)) + ' -> ' + target)
for name, command in json.loads((ROOT / 'package.json').read_text())['scripts'].items():
    if 'brand/' in command or 'v7-design-system' in command:
        errors.append('Website npm script reads brand package: ' + name)

print(json.dumps({'passed': not errors, 'errors': errors}, indent=2))
sys.exit(bool(errors))
