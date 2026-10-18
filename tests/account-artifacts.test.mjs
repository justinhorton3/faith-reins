import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const script = new URL('../scripts/verify-account-artifacts.mjs', import.meta.url);
function fixture(t, change = () => {}) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'fr-account-release-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  fs.mkdirSync(path.join(cwd, 'dist'));
  fs.mkdirSync(path.join(cwd, '.wix-server'));
  fs.writeFileSync(path.join(cwd, '.wix-server/index.js'), 'server only');
  fs.writeFileSync(path.join(cwd, 'dist/account.html'), '<html>public shell</html>');
  fs.writeFileSync(path.join(cwd, '.env.local'), 'WIX_CLIENT_SECRET=synthetic-private-release-check\n');
  fs.writeFileSync(path.join(cwd, 'wix.config.json'), JSON.stringify({ site: { outputDirectory: { client: './dist', server: './.wix-server' } } }));
  change(cwd);
  return spawnSync(process.execPath, [script.pathname], { cwd, encoding: 'utf8', env: { ...process.env, WIX_CLIENT_SECRET: 'synthetic-private-release-check' } });
}
test('release gate accepts separate public shells and server runtime', t => {
  assert.equal(fixture(t).status, 0);
});
test('release gate rejects a server credential inside a public bundle', t => {
  const result = fixture(t, cwd => fs.writeFileSync(path.join(cwd, 'dist/bundle.js'), 'synthetic-private-release-check'));
  assert.notEqual(result.status, 0);
  assert.ok(!result.stderr.includes('synthetic-private-release-check'), 'Failure must not print the credential.');
});
test('release gate rejects environment files or Worker files in the client tree', t => {
  for (const name of ['.env.local', '_worker.js', '.wix-server']) {
    assert.notEqual(fixture(t, cwd => fs.writeFileSync(path.join(cwd, 'dist', name), 'private')).status, 0);
  }
});
test('release gate rejects a release without the protected runtime', t => {
  assert.notEqual(fixture(t, cwd => fs.rmSync(path.join(cwd, '.wix-server/index.js'))).status, 0);
});
