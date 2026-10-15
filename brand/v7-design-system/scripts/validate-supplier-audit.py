#!/usr/bin/env python3
"""Check supplier-audit coverage, safety gates, chart parity and original asset hashes."""
from pathlib import Path
from urllib.parse import urlparse
import hashlib,json,re
R=Path(__file__).resolve().parents[1]; C=R/'merchandise/product-catalog'
a=json.loads((C/'SUPPLIER-AUDIT.json').read_text()); m=json.loads((C/'IMAGE-IMPORT-MANIFEST.json').read_text())
products={p['id']:p for p in a['products']}; originals={p['id']:p for p in m['products']}
assert len(products)==len(a['products'])==42 and products.keys()==originals.keys()
counts={'candidate':0,'blocked':0}
required=['## Supplier audit','## Sizes and format','## Care, delivery and returns','## Production handoff requirements','Supplier product / variant IDs','Retail price / stock','## Image references']
for id,p in products.items():
 assert p['match_status'] in counts; counts[p['match_status']]+=1
 assert p['supplier_variant_id'] is None and p['retail_price'] is None
 assert not p['stock_confirmed'] and not p['manufacturing_approved']
 text=(C/(id+'.md')).read_text()
 assert all(x in text for x in required),id
 s=a['supplier_sources'][p['source_key']]
 assert s['url'] in text and p['finding'] in text,id
 assert f'[{p["title"]}]({id}.md)' in (C/'SUPPLIER-AUDIT.md').read_text(),id
 for image in originals[id]['images']:
  actual=hashlib.sha256((R/image['package_path']).read_bytes()).hexdigest()
  assert actual==image['sha256']==p['image_hashes'][image['view']],id
for s in a['supplier_sources'].values():
 assert urlparse(s['url']).hostname in ('www.printful.com','help.printful.com')
 chart=s['chart']
 if chart:
  assert [r[0] for r in chart['rows']]==s['sizes']
  assert all(len(r)==len(chart['columns'])+1 for r in chart['rows'])
  assert all(isinstance(x,(int,float)) and x>0 for r in chart['rows'] for x in r[1:])
  if 'body_chest_in' in chart:assert len(chart['body_chest_in'])==len(chart['rows'])
js=(R/'examples/product-detail/pdp.js').read_text()
embedded=json.loads(re.search(r'^const CHART = (.+);$',js,re.M)[1])
assert embedded==a['supplier_sources']['mens-polo']['chart'],'Mockup chart differs from audited evidence'
assert 'fetch(' not in js and 'localStorage' not in js and 'checkout' not in js.lower()
print(json.dumps({'passed':True,'products':42,'original_images_unchanged':84,'match_counts':counts,'ready_to_order':0,'mockup_chart_matches_source':True},indent=2))
