#!/usr/bin/env bash
# Upload the prepared dist/ folder to a Wix Headless site.
# Required env: WIX_API_KEY, WIX_SITE_ID. Optional: WIX_ACCOUNT_ID, DEPLOY_LABEL.
set -euo pipefail

: "${WIX_API_KEY:?WIX_API_KEY is not set}"
: "${WIX_SITE_ID:?WIX_SITE_ID is not set}"
LABEL="${DEPLOY_LABEL:-$WIX_SITE_ID}"

cd "$(dirname "$0")/../dist"

files=$(find . -type f | sed 's#^\./##' | sort)
count=$(echo "$files" | wc -l)
echo "::notice title=upload ($LABEL)::$count files, $(du -sh . | cut -f1) total"

big=$(find . -type f -size +3M)
if [ -n "$big" ]; then
  echo "::error title=upload ($LABEL)::files over 3 MB: $big"
  exit 1
fi

args=()
while IFS= read -r f; do args+=(-F "files=@$f;filename=$f"); done <<< "$files"

headers=(-H "Authorization: $WIX_API_KEY")
[ -n "${WIX_ACCOUNT_ID:-}" ] && headers+=(-H "wix-account-id: $WIX_ACCOUNT_ID")

out=$(mktemp)
code=$(curl -sS -o "$out" -w '%{http_code}' -X POST \
  "https://www.wixapis.com/headless-business-setup/v1/headless-business/$WIX_SITE_ID/drop?campaign=mcp&agent=claude-code" \
  "${headers[@]}" "${args[@]}")
body=$(tr -d '\n' < "$out" | head -c 600)

if [ "$code" = "200" ]; then
  echo "::notice title=deployed ($LABEL)::$body"
else
  echo "::error title=upload to $LABEL failed (HTTP $code)::$body"
  exit 1
fi
