#!/usr/bin/env python3
"""Build with and without brand/, requiring byte-identical output."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile


class IndependenceError(RuntimeError):
    pass


def build_site(root):
    subprocess.run(['npm', 'run', 'build'], cwd=root, check=True)


def output_hashes(root):
    output = root / 'dist'
    files = sorted(p for p in output.rglob('*') if p.is_file())
    if not files:
        raise IndependenceError('Build produced no files in dist/')
    return {p.relative_to(output).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in files}


def compare_builds(root, build=build_site):
    root = Path(root).resolve()
    brand = root / 'brand'
    if not brand.is_dir() or brand.is_symlink():
        raise IndependenceError('Expected a real brand/ directory before verification')

    # Both builds start without generated output, so stale dist files cannot mask a dependency.
    if (root / 'dist').exists():
        shutil.rmtree(root / 'dist')
    build(root)
    baseline = output_hashes(root)

    # A sibling temp directory permits an atomic rename on the same filesystem.
    holding = Path(tempfile.mkdtemp(prefix='faith-reins-independence-', suffix='-recovery', dir=root.parent))
    saved = holding / 'brand'
    try:
        brand.rename(saved)
        try:
            if (root / 'dist').exists():
                shutil.rmtree(root / 'dist')
            build(root)
            independent = output_hashes(root)
        finally:
            # Never overwrite a directory unexpectedly created by a build.
            if brand.exists() or brand.is_symlink():
                raise IndependenceError(f'Build recreated brand/; original preserved at {saved}')
            saved.rename(brand)
    finally:
        # Never recursively clean this directory: failed restoration must retain the originals.
        if not saved.exists():
            holding.rmdir()

    if baseline != independent:
        paths = sorted(set(baseline) | set(independent))
        changed = [p for p in paths if baseline.get(p) != independent.get(p)]
        raise IndependenceError('Build depends on brand/; differing output: ' + ', '.join(changed[:20]))
    return {'passed': True, 'compared_files': len(baseline), 'comparison': 'SHA-256 of every output file'}


def main():
    try:
        result = compare_builds(Path(__file__).resolve().parents[1])
    except (IndependenceError, subprocess.CalledProcessError) as error:
        print(json.dumps({'passed': False, 'error': str(error)}, indent=2), file=sys.stderr)
        return 1
    print(json.dumps(result, indent=2))
    return 0


if __name__ == '__main__':
    sys.exit(main())
