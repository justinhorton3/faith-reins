// Written by install/deploy.mjs --stack static from .env.local's WIX_CLIENT_ID (what `wix env pull`
// writes; on a migration preview the site being migrated), else wix.config.json, or --client-id.
// The public OAuth client id — not a secret: it only mints anonymous visitor tokens.
export const WIX_CLIENT_ID = "578fbd9d-fb1f-4285-b7d1-7063b33ac62a";
