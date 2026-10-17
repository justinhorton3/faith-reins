// Approved persona sitemap. One registry supplies desktop, mobile and footer navigation.
import CATEGORIES from './shop-category-pages.json' with { type: 'json' };

const photo = name => `/assets/hero-${name}-desktop.webp`;
const item = (label, href, description, image, group = '') => ({ label, href, description, image, group });

export const NAVIGATION = [
  {
    id: 'about', label: 'About', href: '/our-mission',
    routes: ['/our-mission', '/our-team', '/our-horses', '/our-partners', '/news'],
    eyebrow: 'Get to know Faith Reins', title: 'Rooted in faith. Connected by purpose.',
    description: 'Meet the people, partners and equine companions behind our work with children and families.',
    overview: 'Explore our mission', action: ['Get involved', '/get-involved'],
    prompt: 'There is a place for you here.', help: 'Give your time, share your gifts or support the mission.',
    links: [
      item('Our Mission', '/our-mission', 'The purpose and values that guide our care.', photo('our-mission')),
      item('Our Team', '/our-team', 'Get to know our leadership and care team.', photo('our-team')),
      item('Our Horses', '/our-horses', 'Meet our equine partners and their personalities.', photo('our-horses')),
      item('Our Partners', '/our-partners', 'Community connections that help the mission grow.', photo('our-partners')),
      item('News & Stories', '/news', 'Updates and stories from Faith Reins.', photo('home')),
    ],
  },
  {
    id: 'therapies', label: 'Therapies', href: '/services-programs',
    routes: ['/services-programs', '/speech-language-therapy', '/occupational-therapy', '/physical-therapy', '/counseling', '/equine-assisted-learning'],
    eyebrow: 'Therapies & programs', title: 'Small steps. Extraordinary possibilities.',
    description: 'Explore clinical services and equine learning experiences, each with its own approach and purpose.',
    overview: 'Explore all services', action: ['Request a callback', '/book-online'],
    prompt: 'Not sure where to begin?', help: 'Our team will help you find the right next step.',
    links: [
      item('Speech & Language', '/speech-language-therapy', 'Communication skills for everyday connection.', photo('speech-language-therapy'), 'Clinical therapy'),
      item('Occupational Therapy', '/occupational-therapy', 'Skills for play, learning and daily life.', photo('occupational-therapy'), 'Clinical therapy'),
      item('Physical Therapy', '/physical-therapy', 'Strength, balance, coordination and movement.', photo('physical-therapy'), 'Clinical therapy'),
      item('Counseling', '/counseling', 'Support for emotional well-being and family connection.', photo('counseling'), 'Clinical care'),
      item('Equine-Assisted Learning', '/equine-assisted-learning', 'Ground-based learning with horses; a nonclinical program.', photo('equine-assisted-learning'), 'Experiential learning'),
    ],
  },
  {
    id: 'families', label: 'For Families', href: '/for-families',
    routes: ['/for-families', '/book-online', '/payment-and-insurance', '/faq'],
    eyebrow: 'For children & families', title: 'Your next step. A little more support.',
    description: 'Know what to expect, find answers and connect with a team ready to walk alongside you.',
    overview: 'Visit the family guide', action: ['Request a callback', '/book-online'],
    prompt: 'A conversation is a good place to start.', help: 'Leave your contact details and our team will follow up.',
    links: [
      item('Getting Started', '/for-families#getting-started', 'Understand the path from your first call to care.', photo('for-families')),
      item('What to Expect', '/for-families#what-to-expect', 'Prepare for the first conversation and visit.', photo('book-online')),
      item('Payment & Insurance', '/payment-and-insurance', 'Discuss coverage, payment and questions about cost.', photo('payment-and-insurance')),
      item('Family FAQs', '/faq#getting-started', 'Helpful answers in one place.', photo('faq')),
    ],
  },
  {
    id: 'providers', label: 'For Providers', href: '/for-referring-providers',
    routes: ['/for-referring-providers'],
    eyebrow: 'For referring providers', title: 'Connected care. Shared possibilities.',
    description: 'Assess our approach, discuss patient fit and coordinate a clear path from referral to care.',
    overview: 'Visit the provider guide', action: ['Contact intake', '/contact#contact-intake'],
    prompt: 'A care relationship starts with a conversation.', help: 'Connect with our team about service fit and referral requirements.',
    links: [
      item('Clinical Approach & Fit', '/for-referring-providers#clinical-approach', 'Review care disciplines, team information and patient fit.', photo('services')),
      item('Referral Requirements', '/for-referring-providers#referral-requirements', 'Understand the process and information to coordinate.', photo('for-referring-providers')),
      item('Care Coordination', '/for-referring-providers#care-coordination', 'Discuss communication and next steps with our team.', photo('our-team')),
    ],
  },
  {
    id: 'involved', label: 'Get Involved', href: '/get-involved',
    routes: ['/get-involved', '/give', '/sponsorships', '/impact-and-stewardship', '/volunteer', '/join-our-team'],
    eyebrow: 'Support the mission', title: 'Your part. A shared purpose.',
    description: 'Explore the mission, understand our stewardship and find a meaningful way to give or get involved.',
    overview: 'Ways to get involved', action: ['Donate', '/give'],
    prompt: 'Ready to support the mission?', help: 'Choose a way to give or connect with our team about getting involved.',
    links: [
      item('Give', '/give', 'Explore one-time and recurring giving options.', photo('give')),
      item('Sponsorships', '/sponsorships', 'Support families, equine care and the places we serve.', photo('sponsorships')),
      item('Impact & Stewardship', '/impact-and-stewardship', 'Learn how we approach the responsibility of support.', photo('impact-and-stewardship')),
      item('Volunteer With Us', '/volunteer', 'Explore roles, expectations and getting started.', photo('join-our-team')),
      item('Careers', '/join-our-team', 'Bring your skills to meaningful work.', photo('our-team')),
    ],
  },
  {
    id: 'shop', label: 'Shop', href: '/shop', routes: ['/shop'],
    eyebrow: 'The Faith Reins collection', title: 'Wear the mission. Carry it with you.',
    description: 'Find everyday favorites to wear, share or make part of your home.',
    overview: 'Shop all', action: ['My account & order help', '/account'],
    prompt: 'Something meaningful for your everyday.', help: 'Apparel, accessories and gifts inspired by Faith Reins.',
    links: CATEGORIES.map(category => item(category.label, category.route, category.lead, category.hero.mobile)),
  },
];

export const matchesNavigation = (route, group) => group.routes.some(path => route === path || route.startsWith(path + '/'));
export const POLICY_LINKS = [
  ['Privacy policy', '/privacy-policy'], ['Terms', '/terms-of-service'],
  ['HIPAA notice', '/hipaa-notice'], ['Accessibility', '/accessibility'], ['All policies', '/legal'],
];
