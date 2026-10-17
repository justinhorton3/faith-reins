import { titleBand, section, sh, infoGrid, split, checks, steps, btn, tlink, ctaBand, SITE } from './lib.mjs';
import { NAVIGATION, POLICY_LINKS } from './navigation.mjs';

export function registerPersonaPages(add) {
  add('/get-involved', 'Get Involved', 'Explore giving, sponsorships, volunteering and careers at Faith Reins in South Arkansas.',
    titleBand({ eyebrow: 'Get involved', title: 'Your part. A shared purpose.', body: 'Give your time, share your gifts or support care and connection for children and families.' }) +
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
    ctaBand({ title: 'Already part of our community?', body: 'Find account access or get help with an existing gift or purchase.', primary: ['My account', '/account'], secondary: ['Contact us', '/contact'] }));

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

  add('/account', 'My Account', 'Sign in to your Faith Reins account and find assistance with orders, gifts and contact information.',
    titleBand({ eyebrow: 'My Account', title: 'Welcome back.', body: 'Sign in to Faith Reins or connect with our team about an existing order or gift.' }) +
    section(`<div class="account-access" data-account data-client-id="d2d17c20-0426-4ff7-9bc8-4dd8b3a51e12"><div>${sh({ eyebrow: 'Secure account access', title: 'Sign in to Faith Reins', size: 'sm', body: 'Use our Wix-managed sign-in page to sign in, create an account or reset your password.' })}</div><div class="stack"><p role="status" data-account-status>Sign-in is loading. You can contact our team below at any time.</p><p data-account-identity hidden></p><div class="btn-row"><button class="btn" type="button" data-account-login disabled>Sign in / Create account</button><button class="btn btn--outline" type="button" data-account-logout hidden>Sign out</button></div><noscript>Please enable JavaScript for sign-in, or contact our team for assistance.</noscript></div></div>`, { tone: 'paper' }) +
    section(sh({ eyebrow: 'Orders & giving', title: 'We can help you from here.', body: 'For order updates, receipts, changes to a recurring gift or updates to your contact information, please connect with our team.' }) + infoGrid([
      { title: 'Order help', body: 'Ask about an existing purchase, shipment or return. Include your order number if you have it.', link: ['Contact our team', '/contact#account-help'] },
      { title: 'Giving support', body: 'Request a receipt or help changing an existing recurring gift. Please do not send payment card details.', link: ['Get giving assistance', '/contact#account-help'] },
      { title: 'Contact information', body: 'Ask for help updating the details associated with a gift or order.', link: ['Get account help', '/contact#account-help'] },
    ])) + ctaBand({ title: 'Prefer to talk?', body: 'Our team is happy to help with your account questions.', primary: ['Call ' + SITE.phone, 'tel:' + SITE.tel], secondary: ['Contact us', '/contact#account-help'] }), null, { noindex: true });

  add('/site-map', 'Site Map', 'Find Faith Reins services, family and provider resources, ways to get involved, account access and shop categories.',
    titleBand({ eyebrow: 'Find your way', title: 'Site map', body: 'Find the right place to learn, connect or return to Faith Reins.' }) +
    NAVIGATION.map(group => section(sh({ eyebrow: group.label, title: group.overview, body: group.description, link: [group.overview, group.href] }) +
      infoGrid(group.links.map(link => ({ title: link.label, body: link.description, link: ['Visit', link.href] })), { cols: 3 }), { pad: 'tight' })).join('') +
    section(sh({ title: 'Account, contact & policies', size: 'sm' }) + infoGrid([
      { title: 'My Account', link: ['Account access & assistance', '/account'] }, { title: 'Contact', link: ['Contact our team', '/contact'] },
      ...POLICY_LINKS.map(([title, href]) => ({ title, link: ['Read', href] })),
    ]), { tone: 'paper' }));
}
