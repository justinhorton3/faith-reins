import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import vm from 'node:vm';
import { jobs } from '../src/lib/careers.mjs';

const normalize = value => value.replace(/\s+/g, ' ').trim();
const page = route => {
  const stem = new URL(`../dist${route}`, import.meta.url);
  const path = existsSync(`${stem.pathname}/index.html`) ? `${stem.pathname}/index.html` : `${stem.pathname}.html`;
  return parseHTML(readFileSync(path, 'utf8'));
};
const sectionText = (document, id) => {
  const contents = [];
  for (let node = document.getElementById(id)?.nextElementSibling; node && node.tagName !== 'H2'; node = node.nextElementSibling) contents.push(node.textContent);
  return normalize(contents.join(' '));
};

test('careers overview exposes four real roles and the shared mission without JavaScript', () => {
  const { document } = page('/join-our-team');
  const roles = [...document.querySelectorAll('[data-career-role]')];
  assert.equal(roles.length, 4);
  assert.equal(roles.filter(role => role.dataset.category === 'contract').length, 3);
  assert.equal(roles.filter(role => role.dataset.category === 'leadership').length, 1);
  assert.equal(roles.filter(role => role.hidden).length, 0);
  assert.ok(document.querySelector('[data-career-filters]').hidden);
  assert.ok(normalize(document.querySelector('main').textContent).includes(jobs[0].intro));
  for (const job of jobs) assert.ok(roles.some(role => role.querySelector('h3 a').getAttribute('href').replace(/\.html$/, '') === job.route));
  assert.equal(document.querySelector('main h1').textContent, 'Bring your expertise.Help children thrive.');
  assert.ok(document.getElementById('volunteer'));
});

for (const job of jobs) test(`${job.title}: complete description, accurate terms, and working application destination`, () => {
  const { document, window } = page(job.route);
  assert.equal(document.querySelectorAll('main h1').length, 1);
  assert.equal(document.querySelector('main h1').textContent, job.title);
  const body = normalize(document.querySelector('.job-description').textContent);
  assert.ok(body.includes(job.intro));
  assert.match(body, /birth through age 18/i);
  assert.match(body, /minimum (?:of )?five years of relevant pediatric clinical experience/i);
  assert.ok(!body.includes('status: approved'));
  const ids = [...document.querySelectorAll('main [id]')].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const link of document.querySelectorAll('.job-toc a')) assert.ok(document.getElementById(link.getAttribute('href').slice(1)));
  for (const link of document.querySelectorAll('.job-page a[href^="mailto:"]')) {
    const url = new URL(link.getAttribute('href'));
    assert.equal(url.pathname, 'info@faithreins.com');
    assert.equal(url.searchParams.get('subject'), `Application: ${job.title}`);
  }
  for (const link of document.querySelectorAll('.job-page .btn')) {
    const destination = new URL(link.getAttribute('href'), 'https://www.faithreins.com');
    assert.equal(destination.pathname.replace(/\.html$/, ''), '/join-our-team/apply');
    assert.equal(destination.searchParams.get('role'), job.slug);
  }
  assert.doesNotMatch(document.querySelector('main').textContent, /↗/);
  if (job.category === 'contract') {
    assert.match(document.querySelector('.job-heading').textContent, /1099 Independent Contractor/);
    assert.doesNotMatch(body, /competitive salary|full-time salaried/i);
  } else {
    assert.match(sectionText(document, 'preferred-qualifications'), /two or more years of clinical leadership experience/i);
    assert.doesNotMatch(sectionText(document, 'required-qualifications'), /two years|three years/i);
    assert.match(body, /billing specialist, scheduling assistant, and office manager/);
    assert.match(body, /managing multidisciplinary pediatric caseloads and maintaining strong relationships/);
  }
  let printed = 0;
  vm.runInNewContext(readFileSync(new URL('../src/scripts/careers.js', import.meta.url), 'utf8'), { document, window: { print: () => printed++ } });
  document.querySelector('[data-job-print]').dispatchEvent(new window.Event('click'));
  assert.equal(printed, 1);
});

test('accessible role filters update visible results and return to all roles', () => {
  const { document, window } = page('/join-our-team');
  vm.runInNewContext(readFileSync(new URL('../src/scripts/careers.js', import.meta.url), 'utf8'), { document, window });
  assert.equal(document.querySelector('[data-career-filters]').hidden, false);
  for (const [category, expected] of [['leadership', 1], ['contract', 3], ['all', 4]]) {
    const button = document.querySelector(`[data-career-filter="${category}"]`);
    button.dispatchEvent(new window.Event('click'));
    const visible = [...document.querySelectorAll('[data-career-role]')].filter(role => !role.hidden);
    assert.equal(visible.length, expected);
    assert.equal(button.getAttribute('aria-pressed'), 'true');
    assert.equal(document.querySelectorAll('[data-career-filter][aria-pressed="true"]').length, 1);
    assert.equal(document.querySelector('[data-career-count]').textContent, `${expected} ${expected === 1 ? 'opportunity' : 'opportunities'}`);
  }
});

test('application page has an accessible short upload form and all four role choices', () => {
  const { document } = page('/join-our-team/apply');
  assert.equal(document.querySelectorAll('main h1').length, 1);
  assert.ok(document.querySelector('meta[name="robots"]').getAttribute('content').includes('noindex'));
  const form = document.querySelector('[data-career-application]');
  assert.equal(form.getAttribute('enctype'), 'multipart/form-data');
  const file = form.querySelector('input[type="file"]');
  assert.equal(file.getAttribute('name'), 'resume');
  assert.ok(file.hasAttribute('required'));
  assert.match(file.getAttribute('accept'), /\.pdf/);
  assert.match(file.getAttribute('accept'), /\.docx/);
  const options = [...form.querySelectorAll('select[name="role"] option[data-slug]')];
  assert.deepEqual(options.map(option => option.getAttribute('data-slug')), jobs.map(job => job.slug));
  assert.ok(form.querySelector('[data-application-submit]').hasAttribute('disabled'));
  assert.ok(document.querySelector('[data-application-success]').hidden);
  assert.doesNotMatch(document.querySelector('main').textContent, /↗/);
});

test('all built pages use vector links without emoji arrow characters', () => {
  const root = new URL('../dist/', import.meta.url);
  for (const name of readdirSync(root, { recursive: true }).filter(name => name.endsWith('.html'))) {
    const html = readFileSync(new URL(name, root), 'utf8');
    assert.doesNotMatch(html, /↗|&#(?:x2197|8599);/i, name);
  }
});
