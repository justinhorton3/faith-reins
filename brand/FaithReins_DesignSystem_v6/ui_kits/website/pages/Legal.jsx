const LEGAL = {
  privacy: { title: 'Privacy Policy', lead: 'How we collect, use and protect your information.', sections: [
    { heading: 'Information we collect', paragraphs: ['When you contact us, request an appointment or give, we collect the information you provide, such as your name, phone number, email and details about your child’s needs.'], list: ['Contact and appointment request forms', 'Donation and purchase records', 'Basic website analytics'] },
    { heading: 'How we use it', paragraphs: ['We use your information to respond to you, schedule care, process gifts and purchases, and send updates you’ve asked for. We never sell your information.'] },
    { heading: 'Health information', paragraphs: ['Clinical records are kept separately from this website and protected according to applicable health privacy laws. Please don’t send detailed medical information through website forms.'] },
    { heading: 'Your choices', paragraphs: ['You can ask us to update or delete your contact information, or unsubscribe from emails at any time.'] },
    { heading: 'Contact', paragraphs: ['Questions about privacy? Email ' + EMAIL + ' or call ' + PHONE + '.'] },
  ] },
  accessibility: { title: 'Accessibility', lead: 'We want every family to be able to use this site.', sections: [
    { heading: 'Our commitment', paragraphs: ['We aim to meet WCAG 2.1 AA guidelines across faithreins.org, including color contrast, keyboard access, text alternatives and readable type.'] },
    { heading: 'What we’ve done', list: ['Body text of 16px or larger with strong contrast', 'Every button and link reachable by keyboard', 'Descriptive labels on every form field', 'Large tap targets on phones'] },
    { heading: 'Need help?', paragraphs: ['If anything on this site is hard to use, please call ' + PHONE + ' or email ' + EMAIL + '. We’ll help you directly and fix the issue.'] },
  ] },
  'donation-policy': { title: 'Donation Policy', lead: 'How we receive, use and acknowledge your gifts.', sections: [
    { heading: 'Tax status', paragraphs: ['Faith Reins is a 501(c)(3) non-profit. Gifts are tax-deductible as allowed by law. You’ll receive a receipt for every gift.'] },
    { heading: 'Designated gifts', paragraphs: ['When you give for a specific purpose, we use your gift for that purpose. If a need is fully met, we’ll apply the gift where it’s needed most and let you know.'] },
    { heading: 'Recurring gifts', paragraphs: ['Monthly gifts can be changed or cancelled at any time by contacting us.'] },
    { heading: 'Refunds', paragraphs: ['If you made a gift in error, contact us within 30 days and we’ll work with you on a refund.'] },
    { heading: 'Privacy', paragraphs: ['We never sell or share donor information.'] },
  ] },
};
Object.entries(LEGAL).forEach(([slug, p]) => definePage(slug, { title: p.title, nav: null, render: (FR, go) => {
  const { Section, SectionHeading, Prose } = FR;
  return (<>
    <Section tone="sand" pad="tight"><SectionHeading eyebrow="Policies" title={p.title} body={p.lead} /></Section>
    <Section><Prose updated="October 2026" sections={p.sections} /></Section>
  </>);
} }));
