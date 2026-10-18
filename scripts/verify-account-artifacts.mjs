import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

process.loadEnvFile('.env.local');
const secret = process.env.WIX_CLIENT_SECRET;
assert.ok(secret?.trim(), 'Server environment must be loaded before checking the release.');
const config = JSON.parse(fs.readFileSync('wix.config.json', 'utf8'));
assert.deepEqual(config.site.outputDirectory, { client: './dist', server: './.wix-server' });
assert.ok(fs.statSync('.wix-server/index.js').isFile(), 'Protected account worker is missing.');
for (const entry of fs.readdirSync('dist', { recursive: true, withFileTypes: true })) {
  const relative = path.relative('dist', path.join(entry.parentPath, entry.name));
  assert.ok(!relative.split(path.sep).some(part => /^(?:\.env(?:\..*)?|_worker\.js|\.wix-server)$/.test(part)), 'Server or environment files reached the public output.');
  if (!entry.isFile()) continue;
  const bytes = fs.readFileSync(path.join(entry.parentPath, entry.name));
  assert.ok(!bytes.includes(Buffer.from(secret)), 'A server credential reached the public output; publication must stop.');
}
console.log('Account worker is separate; no environment files or server credential found in public output.');
