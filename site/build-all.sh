#!/bin/sh
# Full static build into site/dist: pages -> bundled JS -> minified CSS/HTML.
set -e
cd "$(dirname "$0")"
node build.mjs && node build-js.mjs
python3 - <<'PY'
import re,glob
for f in glob.glob('dist/**/*.html',recursive=True):
    s=open(f).read(); s=re.sub(r'>\s*\n\s*<','><',s); s=re.sub(r'\n\s*','\n',s); open(f,'w').write(s)
PY
du -sb dist
