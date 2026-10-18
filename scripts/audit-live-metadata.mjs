// Read-only FR-16 verification for source-owned static SEO, after the release
// postbuild removes competing Wix tags baked in by prerender middleware.
import { parseHTML } from 'linkedom';
import { pathToFileURL } from 'node:url';
import { pages } from '../src/lib/build.mjs';
import { isIndexableRoute } from '../src/lib/indexability.mjs';

const ORIGIN = 'https://www.faithreins.com';
export function inspectPublishedMetadata(html, page) {
  const { document } = parseHTML(html);
  const nodes = {
    title: [...document.querySelectorAll('head title')],
    canonical: [...document.querySelectorAll('head link[rel="canonical"]')],
    socialTitle: [...document.querySelectorAll('head meta[property="og:title"]')],
    description: [...document.querySelectorAll('head meta[name="description"]')],
  };
  const values = {
    title: nodes.title.map(node => node.textContent.trim()),
    canonical: nodes.canonical.map(node => node.getAttribute('href')),
    socialTitle: nodes.socialTitle.map(node => node.getAttribute('content')),
    description: nodes.description.map(node => node.getAttribute('content')),
  };
  const canonicalRoute = page.seo?.canonicalRoute || page.route;
  const canonical = ORIGIN + (canonicalRoute === '/' ? '/' : canonicalRoute + '.html');
  const expected = { title: page.title, canonical, socialTitle: page.title.replace(/ \| Faith Reins$/, ''), description: page.description };
  const issues = [];
  for (const key of Object.keys(nodes)) {
    if (nodes[key].length !== 1) issues.push(`${key}: expected one tag, found ${nodes[key].length}`);
    const matches = values[key].every(value => key === 'canonical' ? new URL(value, ORIGIN).href === canonical : value === expected[key]);
    if (!matches) issues.push(`${key}: published value differs from the page-specific source`);
  }
  const metaCounts = new Map();
  for (const node of document.querySelectorAll('head meta')) {
    const key = (node.getAttribute('property') || node.getAttribute('name') || '').toLowerCase();
    if (!['description', 'robots'].includes(key) && !key.startsWith('og:') && !key.startsWith('twitter:')) continue;
    metaCounts.set(key, (metaCounts.get(key) || 0) + 1);
  }
  for (const [key, count] of metaCounts) if (count > 1) issues.push(`${key}: expected at most one tag, found ${count}`);
  return { route: page.route, passed: !issues.length, counts: Object.fromEntries(Object.entries(nodes).map(([key, nodes]) => [key, nodes.length])), issues, values };
}

export async function auditLiveMetadata({ routes, fetcher = fetch } = {}) {
  const selected = routes?.length ? routes.map(route => {
    const page = pages.find(page => page.route === route);
    if (!page) throw new Error('Unknown registered route: ' + route);
    return page;
  }) : pages.filter(page => isIndexableRoute(page.route) && !page.seo?.noindex);
  const results = [];
  // Keep the read-only crawl bounded; no automatic retries or redirects.
  for (let index = 0; index < selected.length; index += 4) {
    results.push(...await Promise.all(selected.slice(index, index + 4).map(async page => {
      const url = ORIGIN + (page.route === '/' ? '/' : page.route + '.html');
      const response = await fetcher(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
      if (response.status !== 200) return { route: page.route, passed: false, issues: ['HTTP ' + response.status] };
      return inspectPublishedMetadata(await response.text(), page);
    })));
  }
  return results;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const results = await auditLiveMetadata({ routes: process.argv.slice(2) });
    console.log(JSON.stringify(results, null, 2));
    if (results.some(result => !result.passed)) process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
