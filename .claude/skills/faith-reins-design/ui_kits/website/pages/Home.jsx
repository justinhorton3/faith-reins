definePage('home', { title: 'Home', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, TherapyIndex, AudienceTiles, SplitFeature, Button, TextLink, Steps, Testimonial } = FR;
  const T = [
    { title: 'Speech & Language', description: 'Articulation, language, feeding and swallowing, birth through adolescence.', image: A + 'heroes/desktop/hero-speech-language-therapy-desktop.webp', to: 'speech-language-therapy' },
    { title: 'Occupational', description: 'Fine motor skills, sensory processing and the skills of daily life.', image: A + 'heroes/desktop/hero-occupational-therapy-desktop.webp', to: 'occupational-therapy' },
    { title: 'Physical', description: 'Strength, balance and gait, in the clinic and on horseback.', image: A + 'heroes/desktop/hero-physical-therapy-desktop.webp', to: 'physical-therapy' },
    { title: 'Counseling', description: 'Support for children and parents through big feelings and hard seasons.', image: A + 'heroes/desktop/hero-counseling-desktop.webp', to: 'counseling' },
    { title: 'Equine-Assisted', description: 'Hippotherapy and learning with our herd, in the arena and the pasture.', image: A + 'heroes/desktop/hero-equine-assisted-learning-desktop.webp', imagePosition: '30% 50%', to: 'equine-assisted-learning' },
  ];
  return (<>
    <Hero {...heroImg('home')} imagePosition="62% 40%" eyebrow="Pediatric & Equine Therapy"
      title={<>Patient work, <i style={{ fontFamily: 'var(--font-serif)', fontSize: '.9em' }}>gentle</i> horses, lasting change.</>}
      lead="Licensed speech, occupational and physical therapy for children, practiced in the clinic and the arena."
      primaryLabel="Request an appointment" onPrimary={() => go('book-online')} secondaryLabel="Our therapies" onSecondary={() => go('services-programs')} />
    <Section>
      <Split ratio="320px 1fr" gap={64} left={<SectionHeading eyebrow="Therapies" title="Five ways we help" body="Every plan begins with a licensed evaluation and measurable goals, shared with you and your pediatrician." linkLabel="How a first visit works" onLink={() => go('for-families')} />}
        right={<TherapyIndex items={T} onSelect={(t) => go(t.to)} />} />
    </Section>
    <AudienceTiles background="#FFFFFF" items={[
      { eyebrow: 'For parents', title: 'What to expect at your first visit', linkLabel: 'Read the guide', to: 'for-families' },
      { eyebrow: 'For providers', title: 'Referrals, orders and progress notes', linkLabel: 'Send a referral', to: 'for-referring-providers' },
      { eyebrow: 'For donors', title: 'Open a spot for a child on the waiting list', linkLabel: 'Ways to support', to: 'give' },
    ]} onSelect={(t) => go(t.to)} />
    <SplitFeature image={A + 'horses/horse-biscuit.webp'} eyebrow="Meet the herd" title="Every horse is chosen for temperament, then trained for therapy."
      body="Biscuit, Maple, Cowboy and Captain Carrot each have a job, and children quickly learn their names, moods and favorite treats."
      actions={<TextLink onClick={() => go('our-horses')}>Our horses</TextLink>} />
    <Section tone="paper">
      <SectionHeading eyebrow="Getting started" title="Three steps to a first visit" />
      <Steps items={[
        { title: 'Call or send a request', body: 'Tell us what you are noticing. We will call you back within two business days.' },
        { title: 'Evaluation', body: 'A licensed therapist meets your child, listens to you and sets clear goals together.' },
        { title: 'Weekly sessions', body: 'Your child works toward those goals in the clinic, the arena or both, with progress shared along the way.' },
      ]} />
    </Section>
    <Section tone="sand"><Testimonial placeholder quote="Six months ago my son couldn’t ask for what he needed. Last week he told Biscuit good morning, then told me he loved me." name="Parent of a 5-year-old" context="Speech-language therapy" /></Section>
    <SplitFeature variant="bleed" background="#FFFFFF" image={A + 'heroes/desktop/hero-give-desktop.webp'} eyebrow="Stewardship" title="Every session here is made possible by someone who gave."
      body="We can only serve as many children as our supporters make possible. Gifts fund therapy sessions, feed and shoe our horses, and open spots for families on our waiting list."
      actions={<><Button onClick={() => go('give')}>Support Faith Reins</Button><TextLink onClick={() => go('sponsorships')}>Sponsorships</TextLink></>} />
  </>);
} });
