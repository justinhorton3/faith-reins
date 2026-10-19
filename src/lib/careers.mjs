import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { esc, SITE } from './lib.mjs';

const definitions = [
  { slug: 'pediatric-speech-language-pathologist', title: 'Pediatric Speech-Language Pathologist', discipline: 'Speech-language pathology', category: 'contract', relationship: '1099 Independent Contractor', focus: 'Early intervention · Communication · Infant feeding · Oral motor skills', summary: 'Help infants, children, and adolescents build communication and feeding skills that matter in everyday life.' },
  { slug: 'pediatric-occupational-therapist', title: 'Pediatric Occupational Therapist', discipline: 'Occupational therapy', category: 'contract', relationship: '1099 Independent Contractor', focus: 'Handwriting · Sensory processing · Feeding · Developmental function', summary: 'Support participation in play, learning, self-care, and family routines through individualized pediatric care.' },
  { slug: 'pediatric-physical-therapist', title: 'Pediatric Physical Therapist', discipline: 'Physical therapy', category: 'contract', relationship: '1099 Independent Contractor', focus: 'Gross motor development · Functional mobility · Pediatric rehabilitation', summary: 'Build movement, mobility, and confidence through developmental assessment and pediatric rehabilitation.' },
  { slug: 'clinical-director', title: 'Clinical Director', discipline: 'Clinical leadership', category: 'leadership', relationship: 'Full-time salaried W-2', focus: 'Multidisciplinary caseloads · Provider relationships · Direct clinical care', summary: 'Coordinate pediatric caseloads and strengthen provider relationships with dedicated billing, scheduling, and office support.' },
];

const inline = text => esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const anchor = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// The committed descriptions are the full public copy; the page adds navigation and application links.
function renderDescription(source) {
  const lines = source.slice(source.indexOf('## About Faith Reins')).split('\n');
  const html = [], sections = [];
  let paragraph = [], list = false;
  const flushParagraph = () => { if (paragraph.length) { html.push(`<p>${inline(paragraph.join(' '))}</p>`); paragraph = []; } };
  const closeList = () => { if (list) { html.push('</ul>'); list = false; } };
  for (const raw of lines) {
    const line = raw.trim();
    const heading = /^(#{2,3})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph(); closeList();
      const level = heading[1].length, title = heading[2], id = anchor(title);
      html.push(`<h${level} id="${id}">${inline(title)}</h${level}>`);
      if (level === 2) sections.push({ title, id });
    } else if (line.startsWith('- ')) {
      flushParagraph();
      if (!list) { html.push('<ul>'); list = true; }
      html.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (!line) {
      flushParagraph(); closeList();
    } else {
      closeList(); paragraph.push(line);
    }
  }
  flushParagraph(); closeList();
  return { html: html.join('\n'), sections };
}

export const jobs = definitions.map(job => {
  // Wix bundles this module into dist before prerendering; resolve from the build root.
  const source = readFileSync(resolve(process.cwd(), 'docs/job-descriptions', `${job.slug}.md`), 'utf8');
  const intro = /## About Faith Reins\s+([^\n]+)/.exec(source)?.[1];
  if (!intro) throw new Error(`Missing company introduction: ${job.slug}`);
  return { ...job, route: `/join-our-team/${job.slug}`, intro, ...renderDescription(source) };
});
if (new Set(jobs.map(job => job.intro)).size !== 1) throw new Error('The job descriptions must share the approved company introduction.');

export const applicationLink = job => `mailto:${SITE.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}&body=${encodeURIComponent(`Hello Faith Reins team,\n\nI am interested in the ${job.title} opportunity.\n\nPlease find my resume and the requested application materials attached.\n\nName:\nArkansas license number:\nRelevant pediatric experience:\nAvailability:\n\nThank you,\n`)}`;
const arrow = '<span aria-hidden="true">↗</span>';
const roleRow = (job, i) => `<article class="career-role" data-career-role data-category="${job.category}">
  <span class="career-role__number" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
  <div class="career-role__copy"><div class="career-role__meta"><span class="career-tag${job.category === 'leadership' ? ' career-tag--leadership' : ''}">${esc(job.relationship)}</span><span>Camden, Arkansas · On-site</span></div>
  <h3><a href="${job.route}">${esc(job.title)}</a></h3><p>${esc(job.summary)}</p><p class="career-role__focus">${esc(job.focus)}</p></div>
  <a class="career-role__link" href="${job.route}" aria-label="View ${esc(job.title)} role">View role ${arrow}</a>
</article>`;

function careersHome() {
  return `<div class="careers-page">
  <section class="careers-hero"><div class="careers-hero__copy"><span class="eyebrow">Join Our Team</span><h1>Bring your expertise.<br><em>Help children thrive.</em></h1><p>Pediatric care. A shared purpose. A place to bring your experience to the work that matters to you.</p><div class="btn-row"><a class="btn" href="#openings">Explore opportunities ${arrow}</a><a class="tlink" href="/volunteer">Volunteer with us ${arrow}</a></div><p class="careers-hero__note">Camden, Arkansas <span aria-hidden="true">/</span> Birth through age 18</p></div>
  <picture class="careers-hero__picture"><source media="(max-width: 767px)" srcset="/assets/hero-join-our-team-mobile.webp"><img src="/assets/hero-join-our-team-desktop.webp" alt="Two pediatric care professionals connecting in a bright clinic setting" width="1536" height="1024" fetchpriority="high"></picture></section>
  <section class="careers-intro"><div class="careers-shell careers-intro__grid"><div><span class="eyebrow">About Faith Reins</span><h2>A shared mission.<br>Individual expertise.</h2></div><p>${esc(jobs[0].intro)}</p></div></section>
  <section class="careers-openings careers-shell" id="openings" aria-labelledby="openings-title"><div class="careers-section-head"><div><span class="eyebrow">Clinical opportunities</span><h2 id="openings-title">Find your place on the team.</h2></div><p>Five years of pediatric experience.<br>Active Arkansas licensure.</p></div>
  <div class="careers-toolbar"><div class="careers-filters" role="group" aria-label="Filter opportunities" data-career-filters hidden><button type="button" data-career-filter="all" aria-pressed="true">All roles <span>4</span></button><button type="button" data-career-filter="contract" aria-pressed="false">Therapist contracts <span>3</span></button><button type="button" data-career-filter="leadership" aria-pressed="false">Leadership <span>1</span></button></div><p class="careers-count" role="status" aria-live="polite" data-career-count>4 opportunities</p></div>
  <div class="careers-roles">${jobs.map(roleRow).join('')}</div></section>
  <section class="careers-practice"><div class="careers-shell"><div class="careers-section-head"><div><span class="eyebrow">The way we work</span><h2>Individual expertise.<br>Coordinated care.</h2></div><p>Bring depth in your discipline and a collaborative approach to each child's care.</p></div><div class="careers-practice__grid"><div><span>01</span><h3>Pediatric focus</h3><p>Work with infants, children, adolescents, and the caregivers who support their progress.</p></div><div><span>02</span><h3>Clinical collaboration</h3><p>Connect across disciplines while practicing within your training, competence, and professional judgment.</p></div><div><span>03</span><h3>Dedicated support</h3><p>Coordinate with billing, scheduling, and office staff so clinical priorities translate into care.</p></div></div></div></section>
  <section class="careers-next careers-shell"><div><span class="eyebrow">Your next step</span><h2>Start with a conversation.</h2></div><ol class="careers-steps"><li><span>01</span><div><h3>Explore a role</h3><p>Review the clinical focus, qualifications, and relationship that fit your experience.</p></div></li><li><span>02</span><div><h3>Share your background</h3><p>Email your résumé and the application materials listed in the role description.</p></div></li><li><span>03</span><div><h3>Connect with our team</h3><p>Discuss your experience, availability, and next steps with Faith Reins.</p></div></li></ol></section>
  <section class="careers-volunteer" id="volunteer"><div class="careers-shell"><div><span class="eyebrow">Another way to give your time</span><h2>There is a place for volunteers, too.</h2><p>Explore ways to support our programs, horses, and families.</p></div><a class="btn btn--outline" href="/volunteer">Explore volunteering ${arrow}</a></div></section></div>`;
}

function jobPage(job) {
  const application = esc(applicationLink(job));
  const related = jobs.filter(other => other.slug !== job.slug);
  return `<div class="job-page"><section class="job-heading"><div class="careers-shell"><a class="job-back" href="/join-our-team#openings">← All opportunities</a><span class="eyebrow">${esc(job.discipline)}</span><h1>${esc(job.title)}</h1><p>${esc(job.focus)}</p><div class="job-heading__meta"><span class="career-tag">${esc(job.relationship)}</span><span>Camden, Arkansas</span><span>On-site · Birth through age 18</span></div></div></section>
  <div class="job-layout careers-shell"><aside class="job-sidebar" aria-label="Role summary and application"><div class="job-sidebar__inner"><span class="eyebrow">At a glance</span><dl><div><dt>Clinical experience</dt><dd>5+ years in pediatrics</dd></div><div><dt>Arkansas license</dt><dd>${job.category === 'leadership' ? 'OT, PT, or SLP' : job.discipline === 'Speech-language pathology' ? 'Speech-Language Pathologist' : job.title.replace('Pediatric ', '')}</dd></div>${job.category === 'leadership' ? '<div><dt>Leadership</dt><dd>Demonstrated experience required<br>2+ years preferred</dd></div><div><dt>Schedule</dt><dd>40 hours per week</dd></div>' : '<div><dt>Service availability</dt><dd>Established by mutual agreement</dd></div>'}</dl><a class="btn btn--block" href="${application}">Apply by email ${arrow}</a><a class="job-email" href="${application}">${esc(SITE.email)}</a><p class="job-sidebar__note">Include your résumé and the materials requested in this description.</p><button type="button" class="job-print" data-job-print hidden>Print this description</button><nav class="job-toc" aria-label="On this page"><h2>In this description</h2>${job.sections.map(section => `<a href="#${section.id}">${esc(section.title)}</a>`).join('')}</nav></div></aside>
  <article class="job-description">${job.html}<section class="job-apply" aria-labelledby="job-apply-title"><span class="eyebrow">Take the next step</span><h2 id="job-apply-title">Bring your experience to Faith Reins.</h2><p>Email your résumé and the requested application materials. Your email subject will identify this role.</p><a class="btn" href="${application}">Apply by email ${arrow}</a><a class="job-question" href="/contact">Have a question? Contact our team.</a></section></article></div>
  <section class="job-related careers-shell"><span class="eyebrow">Keep exploring</span><h2>Other opportunities</h2><div>${related.map(other => `<a href="${other.route}"><span>${esc(other.title)}<small>${esc(other.relationship)}</small></span>${arrow}</a>`).join('')}</div></section></div>`;
}

export function registerCareerPages(add) {
  add('/join-our-team', 'Join Our Team', 'Explore pediatric SLP, OT, PT, and Clinical Director opportunities at Faith Reins in Camden, Arkansas.', careersHome(), undefined, { image: 'https://www.faithreins.com/assets/hero-join-our-team-desktop.webp', imageAlt: 'Pediatric care professionals at Faith Reins' });
  for (const job of jobs) add(job.route, `${job.title} Careers`, `${job.relationship} opportunity in Camden, Arkansas. ${job.summary}`, jobPage(job), undefined, { image: 'https://www.faithreins.com/assets/hero-join-our-team-desktop.webp', imageAlt: 'Pediatric care professionals at Faith Reins' });
}
