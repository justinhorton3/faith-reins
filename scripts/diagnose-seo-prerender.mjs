// Offline reproduction only; does not change production code, settings or hosting.
// The real installed Wix HTML-injection middleware runs against a synthetic
// script service in an isolated Astro fixture. No Wix credentials are needed.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
const { build } = await import('astro');
const { readFile } = await import('node:fs/promises');
const { default: assert } = await import('node:assert/strict');
const { resolve, join } = await import('node:path');
const { pathToFileURL } = await import('node:url');
const { parseHTML } = await import('linkedom');
const { execFileSync } = await import('node:child_process');

const repo = resolve(import.meta.dirname, '..');
const root = join(repo, 'tests/fixtures/seo-prerender');
const outDir = join(root, 'dist');
await build({
  root,
  configFile: false,
  site: 'https://www.faithreins.com',
  output: 'static',
  trailingSlash: 'ignore',
  outDir,
  cacheDir: join(root, '.astro'),
  integrations: [{
    name: 'diagnose-installed-wix-injection',
    hooks: {
      'astro:config:setup'({ addMiddleware }) {
        addMiddleware({
          entrypoint: pathToFileURL(join(repo, 'node_modules/@wix/astro/build/dependencies/astro-html-embeds/backend-runtime/html-embeds.mjs')),
          order: 'post',
        });
      },
    },
  }],
  vite: {
    resolve: {
      alias: {
        '@wix/headless-site-assets': join(root, 'mock-site-assets.mjs'),
      },
    },
  },
});
const html = await readFile(join(outDir, 'occupational-therapy/index.html'), 'utf8');
const { document } = parseHTML(html);
const titles = [...document.querySelectorAll('title')].map(node => node.textContent);
const requestedUrl = document.querySelector('meta[name="diagnostic-requested-page-url"]')?.getAttribute('content');
assert.deepEqual(titles, ['Fixture source title', 'Fixture injected title']);
assert.equal(requestedUrl, 'https://www.faithreins.com/occupational-therapy/');
let fixedTitleCount;
if (process.argv.includes('--verify-fix')) {
  const cleaned = execFileSync('python3', ['-c', 'import sys; from scripts.seo_ownership import source_owned_seo; sys.stdout.write(source_owned_seo(sys.stdin.read())[0])'], {
    cwd: repo, input: html, encoding: 'utf8',
  });
  const fixed = parseHTML(cleaned).document;
  fixedTitleCount = fixed.querySelectorAll('title').length;
  assert.equal(fixedTitleCount, 1);
  assert.equal(fixed.querySelector('title').textContent, 'Fixture source title');
  assert.equal(fixed.querySelector('meta[name="diagnostic-requested-page-url"]').getAttribute('content'), requestedUrl);
}
console.log(JSON.stringify({
  reproduced: true,
  stage: 'on-disk prerendered HTML, before upload or release',
  titles,
  requestedUrl,
  fixedTitleCount,
  conclusion: 'Wix middleware adds tags during prerender; postbuild .html flattening happens afterward.',
}, null, 2));
