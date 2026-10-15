#!/usr/bin/env python3
"""Validate this portable package without third-party dependencies."""
from pathlib import Path
import argparse, json, hashlib, re, sys, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import unquote
R=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--check',action='store_true',help='Validate without writing the report')
args=parser.parse_args()
errors=[]
def check(ok,message):
    if not ok:errors.append(message)
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
release=json.loads((R/'RELEASE-MANIFEST.json').read_text())
man=json.loads((R/'merchandise/product-catalog/IMAGE-IMPORT-MANIFEST.json').read_text())
check(len(release['assets'])==10,'Expected 10 exact approved master SVGs')
for a in release['assets']:
    p=R/a['path'];check(p.is_file(),'Missing '+a['path'])
    if not p.is_file():continue
    check(sha(p)==a['sha256'],'Master hash changed: '+a['path'])
    tree=ET.parse(p);ns='{http://www.w3.org/2000/svg}'
    check(not list(tree.iter(ns+'image')),'Raster image in master SVG: '+a['path'])
    check(not list(tree.iter(ns+'text')),'Live lettering in master SVG: '+a['path'])
check(len(man['products'])==42,'Expected 42 product records')
count=0;approved=0;companions=0
for p in man['products']:
    check((R/p['detail_path']).is_file(),'Missing detail '+p['detail_path'])
    for i in p['images']:
        f=R/i['package_path'];count+=1;check(f.is_file(),'Missing '+i['package_path'])
        if f.is_file():check(sha(f)==i['sha256'],'Product hash changed: '+i['package_path'])
        approved+=i['review_status']=='approved_visual_reference';companions+=i['review_status']=='derived_companion_view'
check((count,approved,companions)==(84,82,2),'Expected image counts 84 / 82 / 2')
provenance=json.loads((R/'SOURCE-PROVENANCE.json').read_text())
for asset in provenance['unchanged_source_assets']:
    p=R/asset['package_path'];check(p.is_file(),'Missing repository source asset '+asset['package_path'])
    if p.is_file():check(sha(p)==asset['sha256'],'Repository source asset changed: '+asset['package_path'])
def target(p,url):
    if not url or url.startswith(('#','http:','https:','mailto:','tel:','data:','javascript:')):return
    path=unquote(url.split('#')[0].split('?')[0])
    f=(p.parent/path).resolve()
    check(f==R or R in f.parents,'Link escapes standalone package '+str(p.relative_to(R))+' -> '+url)
    check(f.exists(),'Broken link '+str(p.relative_to(R))+' -> '+url)
class Links(HTMLParser):
    def __init__(self,p):super().__init__();self.p=p
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if k in ('href','src'):target(self.p,v)
            if k=='srcset':
                for part in v.split(','):target(self.p,part.strip().split()[0])
active_files=[p for p in R.rglob('*') if p.is_file() and p.relative_to(R).parts[0] not in ('legacy','candidates')]
for p in [p for p in active_files if p.suffix=='.html']:
    Links(p).feed(p.read_text())
for p in [p for p in active_files if p.suffix=='.css']:
    for url in re.findall(r'(?:url\(["\']?([^"\')]+)|@import\s+["\']([^"\']+))',p.read_text()):target(p,next(x for x in url if x))
for p in [p for p in active_files if p.suffix=='.md']:
    for url in re.findall(r'\]\(([^)]+)\)',p.read_text()):target(p,url)
for p in (R/'templates').glob('*.svg'):ET.parse(p)
preserved=json.loads((R/'REPOSITORY-CONSOLIDATION.json').read_text())['records']
for record in preserved:
    p=R/record['package_path']
    check(p.is_file(),'Missing preserved source '+record['source'])
    if p.is_file():check(sha(p)==record['sha256'],'Preserved source hash changed '+record['source'])
checksums=json.loads((R/'FILE-CHECKSUMS.json').read_text())
excluded={'FILE-CHECKSUMS.json','VALIDATION-REPORT.json','STAGING-MANIFEST.json'}
actual={p.relative_to(R).as_posix() for p in R.rglob('*') if p.is_file() and p.name not in excluded}
check(actual==set(checksums),'Checksum inventory differs from package files')
for path,expected in checksums.items():
    p=R/path
    check(p.is_file(),'Missing checksum target '+path)
    if p.is_file():check(sha(p)==expected,'Package checksum mismatch '+path)
for p in R.rglob('*'):check(not p.is_symlink(),'Symlink in portable package: '+str(p))
report={'passed':not errors,'master_count':10,'products':42,'images':count,'approved_images':approved,'companion_images':companions,'repository_source_assets':len(provenance['unchanged_source_assets']),'preserved_source_records':len(preserved),'checksummed_files':len(checksums),'image_policy':'original bytes unchanged','pdf_status':'deferred by owner; original exceeds 100 MB upload limit','checks':['master hashes','product hashes','unchanged repository source assets','preserved source hashes','complete package checksum inventory','SVG parsing and outlined masters','active HTML links','CSS imports and font paths','active Markdown links','package-contained link targets','no symlinks'],'not_checked':['actual browser responsive behavior','physical print and embroidery','supplier availability and measurement charts','website integration and deployment'],'errors':errors}
if not args.check:(R/'VALIDATION-REPORT.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2));sys.exit(bool(errors))
