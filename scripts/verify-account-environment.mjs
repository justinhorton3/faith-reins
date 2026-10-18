import fs from 'node:fs';
import assert from 'node:assert/strict';

process.loadEnvFile('.env.local');
const config = JSON.parse(fs.readFileSync('wix.config.json', 'utf8'));
for (const name of ['WIX_CLIENT_ID', 'WIX_CLIENT_INSTANCE_ID', 'WIX_CLIENT_SECRET']) {
  assert.ok(process.env[name]?.trim(), `The linked Wix server environment is missing ${name}; account publication must stop.`);
}
assert.equal(process.env.WIX_CLIENT_ID, config.appId, 'The account runtime must use the existing linked Wix app.');
assert.equal(config.siteId, '2d8c6050-5730-4bed-9c7a-266ca7bd00b4', 'Incorrect site target.');
console.log('Linked Wix server environment is available; values are not logged.');
