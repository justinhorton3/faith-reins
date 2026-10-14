#!/usr/bin/env python3
"""Explicit repository export. Original image bytes remain unchanged.
Preflight refuses every differing collision before any writes happen.
"""
from pathlib import Path
import argparse,json,re,os,shutil,hashlib
P=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--repo',type=Path,required=True)
args=parser.parse_args();repo=args.repo.resolve()
if not repo.is_dir():raise SystemExit('Repository directory must already exist')
man=json.loads((P/'merchandise/product-catalog/IMAGE-IMPORT-MANIFEST.json').read_text())
writes={}
for product in man['products']:
    for image in product['images']:
        src=P/image['package_path'];data=src.read_bytes()
        if hashlib.sha256(data).hexdigest()!=image['sha256']:raise SystemExit('Image hash failed: '+str(src))
        for folder in ('product-catalog/images','images/products'):writes[repo/folder/src.name]=data
for src in (P/'approved').glob('*/*.svg'):
    writes[repo/'public/assets/v7'/src.parent.name/src.name]=src.read_bytes()
def rewrite_md(src):
    def link(m):
        url=m.group(1)
        if url.startswith(('http:','https:','#','mailto:','tel:')):return m.group(0)
        target=(src.parent/url).resolve()
        try:relative=target.relative_to(P)
        except ValueError:return m.group(0)
        if relative.parts[:2]==('approved','product-images'):dest=repo/'product-catalog/images'/target.name
        elif relative.parts[:2]==('merchandise','product-catalog'):dest=repo/'product-catalog'/target.name
        else:dest=repo/'v7-design-system'/relative
        return ']('+os.path.relpath(dest,repo/'product-catalog').replace(os.sep,'/')+')'
    return re.sub(r'\]\(([^)]+)\)',link,src.read_text()).encode()
for src in (P/'merchandise/product-catalog').glob('*.md'):writes[repo/'product-catalog'/src.name]=rewrite_md(src)
writes[repo/'product-catalog/IMAGE-IMPORT-MANIFEST.json']=(P/'merchandise/product-catalog/IMAGE-IMPORT-MANIFEST.json').read_bytes()
collisions=[str(dest) for dest,data in writes.items() if dest.exists() and (not dest.is_file() or dest.read_bytes()!=data)]
if collisions:raise SystemExit('No files written. Differing existing files require manual reconciliation:\n'+'\n'.join(collisions))
for dest,data in writes.items():dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
print(f'Exported {len(writes)} files. Original images were not modified. No website code changed.')
