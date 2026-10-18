import { titleBand, section, sh, infoGrid, split, checks, steps, btn, tlink, ctaBand, SITE } from './lib.mjs';
import { NAVIGATION, POLICY_LINKS } from './navigation.mjs';
import { registerAccountPages } from './account/pages.mjs';

export function registerPersonaPages(add) {
  add('/get-involved', 'Get Involved', 'Help expand access to exceptional care and purposeful equine experiences through giving, sponsorship and service.',
    titleBand({ eyebrow: 'Get involved', title: 'Your part. A shared purpose.', body: 'Faith Reins is bringing skilled therapy, family support and purposeful equine experiences together. The need for more care is here now.' }) +
    section(sh({ eyebrow: 'Start with the mission', title: 'Understand the purpose behind your support.', body: 'Get to know Faith Reins, meet the people behind the work and explore our approach to stewardship before choosing how to get involved.' }) + infoGrid([
      { title: 'Our mission', body: 'The purpose and values that guide Faith Reins.', link: ['Read our mission', '/our-mission'] },
      { title: 'Our team', body: 'Meet our leadership and care team.', link: ['Meet the team', '/our-team'] },
      { title: 'Impact & stewardship', body: 'How the mission and the responsibility of support connect.', link: ['Explore stewardship', '/impact-and-stewardship'] },
    ])) +
    section(sh({ eyebrow: 'Ways to help', title: 'Find your place in the mission.' }) + infoGrid([
      { title: 'Give', body: 'Explore available one-time and recurring giving options.', link: ['Explore giving', '/give'] },
      { title: 'Sponsor', body: 'Support equine care, family access, programs or facilities.', link: ['Explore sponsorships', '/sponsorships'] },
      { title: 'Volunteer', body: 'Learn about roles, expectations, training and how to express interest.', link: ['Volunteer with us', '/volunteer'] },
      { title: 'Build a career here', body: 'Explore opportunities to bring your professional skills to Faith Reins.', link: ['Explore careers', '/join-our-team'] },
    ], { cols: 2 }), { tone: 'paper' }) +
    ctaBand({ title: 'Help make this care possible.', body: 'Make a gift or become a sponsor and help build a place families can count on.', primary: ['Make a gift', '/give'], secondary: ['Become a sponsor', '/sponsorships'] }));

  add('/volunteer', 'Volunteer With Us', 'Explore volunteer opportunities, expectations and getting started at Faith Reins in Camden, Arkansas.',
    titleBand({ eyebrow: 'Volunteer with us', title: 'Bring your time. Share your purpose.', body: 'There are many ways to support our children, families and equine partners. Start by finding out where your interests can help.' }) +
    section(sh({ eyebrow: 'Ways to contribute', title: 'A place for different gifts.', body: 'Opportunities depend on current needs and your experience. Our team will discuss a suitable role with you.' }) + infoGrid([
      { title: 'Equine support', body: 'Horse care and supervised support around the herd, subject to training and role requirements.' },
      { title: 'Programs & welcome', body: 'Help with activities, family welcome and community events.' },
      { title: 'Behind the scenes', body: 'Administrative, event and practical support that helps the mission run.' },
    ]), { id: 'opportunities' }) +
    section(split(sh({ eyebrow: 'Before you begin', title: 'Know what to expect.', body: 'You do not need horse experience for every role. Let us know your interests, availability and relevant experience.' }),
      checks([['Role and time commitment', 'Discuss current opportunities and scheduling with the team.'], ['Orientation and training', 'Complete the preparation appropriate to your role before taking part.'], ['Screening and safety', 'Review the volunteer policy and any role-specific requirements.'], ['Working with our team', 'Follow staff guidance and respect the privacy of children and families.']])), { tone: 'paper', id: 'expectations' }) +
    section(sh({ eyebrow: 'Getting started', title: 'Begin with a conversation.' }) + steps([['Express interest', 'Contact us with your interests and availability.'], ['Find a fit', 'We discuss current needs and role expectations.'], ['Prepare', 'Complete the applicable screening, orientation and training.'], ['Get involved', 'Coordinate your first volunteer activities with our team.']]) +
      `<div class="btn-row">${btn('Ask about volunteering', '/contact#volunteer-inquiry')}${tlink('Read the volunteer policy', '/volunteer-policy')}</div>`, { id: 'get-started' }) +
    ctaBand({ title: 'Questions about volunteering?', body: 'Call our team to talk about opportunities and next steps.', primary: ['Contact us', '/contact#volunteer-inquiry'], secondary: ['More ways to help', '/get-involved'] }));

  registerAccountPages(add);

  add('/site-map', 'Site Map', 'Find Faith Reins services, family and provider resources, ways to get involved, account access and shop categories.',
    titleBand({ eyebrow: 'Find your way', title: 'Site map', body: 'Find the right place to learn, connect or return to Faith Reins.' }) +
    NAVIGATION.map(group => section(sh({ eyebrow: group.label, title: group.overview, body: group.description, link: [group.overview, group.href] }) +
      infoGrid(group.links.map(link => ({ title: link.label, body: link.description, link: ['Visit', link.href] })), { cols: 3 }), { pad: 'tight' })).join('') +
    section(sh({ title: 'Account, contact & policies', size: 'sm' }) + infoGrid([
      { title: 'My Account', link: ['Account access & assistance', '/account'] }, { title: 'Contact', link: ['Contact our team', '/contact'] },
      ...POLICY_LINKS.map(([title, href]) => ({ title, link: ['Read', href] })),
    ]), { tone: 'paper' }));
}
