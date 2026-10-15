#!/usr/bin/env python3
"""Stage an explicit brand handoff outside repositories; never modify a website."""
from pathlib import Path
import argparse, hashlib, json, shutil
PACKAGE = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, required=True, help='New external staging directory')
args = parser.parse_args()
output = args.output.resolve()
if output == PACKAGE or PACKAGE in output.parents or output.exists():
    parser.error('Use a new output directory outside the package')
if any((p / '.git').exists() for p in (output, *output.parents)):
    parser.error('Stage outside repositories; copy selected files separately after review')
manifest = json.loads((PACKAGE / 'merchandise/product-catalog/IMAGE-IMPORT-MANIFEST.json').read_text())
release = json.loads((PACKAGE / 'RELEASE-MANIFEST.json').read_text())
expected = {a['path']: a['sha256'] for a in release['assets']}
expected.update({i['package_path']: i['sha256'] for p in manifest['products'] for i in p['images']})
for path, wanted in expected.items():
    if hashlib.sha256((PACKAGE / path).read_bytes()).hexdigest() != wanted:
        raise SystemExit('Original hash mismatch; nothing staged: ' + path)
# Keep documentation and relative catalog links usable during handoff review.
sources = sorted(p for p in PACKAGE.rglob('*') if p.is_file())
output.mkdir(parents=True)
records = []
for source in sources:
    relative = source.relative_to(PACKAGE)
    destination = output / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, destination)
    records.append({'path': relative.as_posix(), 'sha256': hashlib.sha256(source.read_bytes()).hexdigest()})
(output / 'STAGING-MANIFEST.json').write_text(json.dumps({
    'version': release['version'], 'source': 'brand/v7-design-system',
    'purpose': 'Review, then copy selected assets into website-owned paths in a separate change.',
    'website_modified': False, 'files': records}, indent=2) + '\n')
print(f'Staged {len(records)} unchanged files to {output}. No website modified.')
