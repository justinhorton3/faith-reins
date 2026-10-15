#!/usr/bin/env python3
"""Validate this portable package without third-party dependencies."""
from pathlib import Path
import json, hashlib, re, sys, xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import unquote
R=Path(__file__).resolve().parents[1]
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
    check(f.exists(),'Broken link '+str(p.relative_to(R))+' -> '+url)
class Links(HTMLParser):
    def __init__(self,p):super().__init__();self.p=p
    def handle_starttag(self,tag,attrs):
        for k,v in attrs:
            if k in ('href','src'):target(self.p,v)
            if k=='srcset':
                for part in v.split(','):target(self.p,part.strip().split()[0])
for p in [R/'index.html',R/'components/examples.html',R/'templates/letterhead.html']:
    Links(p).feed(p.read_text())
for p in (R/'foundations').rglob('*.css'):
    for url in re.findall(r'(?:url\(["\']?([^"\')]+)|@import\s+["\']([^"\']+))',p.read_text()):target(p,next(x for x in url if x))
for p in [*R.glob('*.md'),*list((R/'merchandise/product-catalog').glob('*.md'))]:
    for url in re.findall(r'\]\(([^)]+)\)',p.read_text()):target(p,url)
for p in (R/'templates').glob('*.svg'):ET.parse(p)
report={'passed':not errors,'master_count':10,'products':42,'images':count,'approved_images':approved,'companion_images':companions,'repository_source_assets':len(provenance['unchanged_source_assets']),'image_policy':'original bytes unchanged','checks':['master hashes','product hashes','unchanged repository source assets','SVG parsing and outlined masters','active HTML links','CSS imports and font paths','active package and catalog Markdown links'],'not_checked':['actual browser responsive behavior','physical print and embroidery','supplier availability and measurement charts','website integration and deployment'],'errors':errors}
(R/'VALIDATION-REPORT.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2));sys.exit(bool(errors))
