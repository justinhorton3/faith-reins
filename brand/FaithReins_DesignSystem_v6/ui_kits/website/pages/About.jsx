const HERD = [
  { name: 'Biscuit', eyebrow: 'Hippotherapy', image: A + 'horses/horse-biscuit.webp', body: 'Steady and kind, Biscuit carries riders who are building balance and core strength.' },
  { name: 'Maple', eyebrow: 'Equine-assisted learning', image: A + 'horses/horse-maple.webp', body: 'Patient on the ground, Maple is a favorite for grooming and first introductions.' },
  { name: 'Cowboy', eyebrow: 'Hippotherapy', image: A + 'horses/horse-cowboy.webp', body: 'Cowboy’s even walk makes him a trusted partner for physical therapy sessions.' },
  { name: 'Captain Carrot', eyebrow: 'Counseling & learning', image: A + 'horses/horse-captain-carrot.webp', body: 'Curious and gentle, the Captain helps children practice calm and confidence.' },
];

definePage('our-mission', { title: 'Our Mission', nav: 'About', render: (FR, go) => {
  const { Hero, Section, SectionHeading, InfoGrid, SplitFeature, CTABand, TextLink, Button, PhotoBand, Testimonial } = FR;
  return (<>
    <Hero size="page" {...heroImg('our-mission')} eyebrow="Our Mission" title="Rooted in faith. Guided by care." lead="We help children grow in body, mind and spirit through skilled therapy and the gentle work of horses." />
    <Section>
      <SectionHeading align="center" eyebrow="Why we exist" title="Every child deserves care close to home" body="Families in South Arkansas often drive hours for pediatric therapy. Faith Reins was founded so they don’t have to — and so every child is known by name." />
    </Section>
    <PhotoBand image={A + 'heroes/desktop/pasture-hero-desktop.webp'} imagePosition="50% 70%" />
    <Section tone="paper">
      <SectionHeading eyebrow="What guides us" title="Our values" />
      <InfoGrid columns={4} items={[{ title: 'Faith', body: 'We serve because we believe every child is fearfully and wonderfully made.' }, { title: 'Excellence', body: 'Licensed clinicians, measurable goals and honest progress.' }, { title: 'Warmth', body: 'Families are welcomed, heard and never rushed.' }, { title: 'Stewardship', body: 'We care well for every gift, every horse and every family.' }]} />
    </Section>
    <SplitFeature image={A + 'heroes/desktop/hero-equine-assisted-learning-desktop.webp'} imagePosition="30% 50%" eyebrow="Why horses" title="Horses give children a reason to try." body="A horse’s rhythm builds strength and balance. Its patience builds trust. Its size builds courage. Every equine session is guided by a licensed therapist and a trained team." actions={<TextLink onClick={() => go('our-horses')}>Meet the herd</TextLink>} />
    <Section>
      <InfoGrid columns={3} onSelect={(it) => go(it.to)} items={[{ eyebrow: 'People', title: 'Our team', body: 'The clinicians and staff who care for your child.', linkLabel: 'Meet the team', to: 'our-team' }, { eyebrow: 'Herd', title: 'Our horses', body: 'Chosen for temperament, trained for therapy.', linkLabel: 'Our horses', to: 'our-horses' }, { eyebrow: 'Community', title: 'Our partners', body: 'Churches, businesses and providers who make this possible.', linkLabel: 'Our partners', to: 'our-partners' }]} />
    </Section>
    <CTABand title="Be part of the mission" body="Give, sponsor or volunteer." primaryLabel="Support Faith Reins" onPrimary={() => go('give')} secondaryLabel="Join our team" onSecondary={() => go('join-our-team')} />
  </>);
} });

definePage('our-team', { title: 'Our Team', nav: 'About', render: (FR, go) => {
  const { Hero, Section, SectionHeading, ProfileGrid, ProfileCard, CTABand } = FR;
  const roles = [['Clinical Director', 'Leadership'], ['Speech-Language Pathologist', 'Speech'], ['Occupational Therapist', 'Occupational'], ['Physical Therapist', 'Physical'], ['Licensed Counselor', 'Counseling'], ['Equine Program Manager', 'Herd'], ['Family Care Coordinator', 'Intake'], ['Barn & Volunteer Lead', 'Barn']];
  return (<>
    <Hero size="page" {...heroImg('our-team')} eyebrow="Our Team" title="The people who will know your child by name" lead="Licensed clinicians, horse people and family advocates working together." />
    <Section>
      <SectionHeading eyebrow="Clinical & program team" title="Meet the team" body="Portraits and bios are supplied by each team member." />
      <ProfileGrid columns={4}>{roles.map(([r, e]) => <ProfileCard key={r} eyebrow={e} name={r} placeholder={'Staff portrait — ' + r.toLowerCase()} body="Name, credentials and a two-sentence bio in their own words." />)}</ProfileGrid>
    </Section>
    <CTABand tone="sand" title="Want to work with us?" body="We’re growing and looking for people who love children and horses." primaryLabel="Join our team" onPrimary={() => go('join-our-team')} />
  </>);
} });

definePage('our-horses', { title: 'Our Horses', nav: 'Our Horses', render: (FR, go) => {
  const { Hero, Section, SectionHeading, ProfileGrid, ProfileCard, Split, CheckList, CTABand, PhotoBand } = FR;
  return (<>
    <Hero size="page" {...heroImg('our-horses')} eyebrow="Our Horses" title="Meet the herd" lead="Every horse is chosen for temperament, then trained for therapy." />
    <Section>
      <SectionHeading eyebrow="The herd" title="Four horses, four jobs" />
      <ProfileGrid columns={4}>{HERD.map((h) => <ProfileCard key={h.name} {...h} ratio="1 / 1" />)}</ProfileGrid>
    </Section>
    <PhotoBand image={A + 'horses/horse-cowboy.webp'} imagePosition="50% 40%" caption="Cowboy between sessions." />
    <Section tone="paper">
      <Split ratio="1fr 1fr" left={<SectionHeading eyebrow="Care" title="How we care for them" body="A therapy horse works best when it is rested, healthy and happy." />} right={<CheckList items={[{ title: 'Chosen for temperament', body: 'Calm, patient and curious around children.' }, { title: 'Trained for therapy', body: 'Desensitized to noise, equipment and sudden movement.' }, { title: 'Rested and rotated', body: 'Work schedules protect each horse’s wellbeing.' }, { title: 'Cared for daily', body: 'Feed, farrier and veterinary care, funded by donors.' }]} />} />
    </Section>
    <CTABand title="Sponsor a horse" body="Help cover feed, shoes and care for a member of the herd." primaryLabel="Sponsorships" onPrimary={() => go('sponsorships')} secondaryLabel="Give" onSecondary={() => go('give')} />
  </>);
} });

definePage('our-partners', { title: 'Our Partners', nav: 'About', render: (FR, go) => {
  const { Hero, Section, SectionHeading, InfoGrid, PhotoSlot, CTABand } = FR;
  const bp = FR.useBreakpoint();
  return (<>
    <Hero size="page" {...heroImg('our-partners')} eyebrow="Our Partners" title="Stronger together" lead="Churches, businesses, schools and providers who help children here get care." />
    <Section>
      <SectionHeading eyebrow="Partners" title="Thank you to our partners" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + (bp === 'mobile' ? 2 : bp === 'tablet' ? 3 : 4) + ', minmax(0,1fr))', gap: 16 }}>
        {Array.from({ length: 8 }).map((_, i) => <PhotoSlot key={i} ratio="3 / 2" label="Partner logo" />)}
      </div>
    </Section>
    <Section tone="paper">
      <SectionHeading eyebrow="Ways to partner" title="How organizations help" />
      <InfoGrid columns={3} items={[{ title: 'Sponsor', body: 'Underwrite sessions, a horse or an event.', linkLabel: 'Sponsorships', to: 'sponsorships' }, { title: 'Refer', body: 'Pediatricians, schools and agencies who refer families.', linkLabel: 'For providers', to: 'for-referring-providers' }, { title: 'Serve', body: 'Volunteer days for churches and teams.', linkLabel: 'Contact us', to: 'contact' }]} onSelect={(it) => go(it.to)} />
    </Section>
    <CTABand title="Become a partner" primaryLabel="Contact us" onPrimary={() => go('contact')} />
  </>);
} });

definePage('join-our-team', { title: 'Join Our Team', nav: 'About', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, CheckList, InfoGrid, CTABand } = FR;
  return (<>
    <Hero size="page" {...heroImg('join-our-team')} eyebrow="Join Our Team" title="Meaningful work, every single day" lead="Clinicians, horse people and volunteers who want to serve children well." primaryLabel="Apply or ask" primaryVariant="primary" onPrimary={() => go('contact')} />
    <Section>
      <Split ratio="1fr 1fr" left={<SectionHeading eyebrow="Why Faith Reins" title="A team that works like a family" />} right={<CheckList items={[{ title: 'Mission first', body: 'Work rooted in faith and focused on children.' }, { title: 'Room to grow', body: 'Mentorship and continuing education.' }, { title: 'Clinic and barn', body: 'A varied day, indoors and out.' }]} />} />
    </Section>
    <Section tone="paper">
      <SectionHeading eyebrow="Open roles" title="Current openings" body="Openings change throughout the year. Contact us even if you don’t see your role." />
      <InfoGrid columns={3} onSelect={() => go('contact')} items={[{ eyebrow: 'Clinical', title: 'Licensed therapists', body: 'Speech-language, occupational and physical therapy.', linkLabel: 'Ask about this role', strong: true }, { eyebrow: 'Barn', title: 'Equine team', body: 'Horse care, side-walking and leading.', linkLabel: 'Ask about this role', strong: true }, { eyebrow: 'Volunteer', title: 'Volunteers', body: 'Barn help, events and office support. Age 14+.', linkLabel: 'Volunteer', strong: true }]} />
    </Section>
    <CTABand title="Tell us about yourself" primaryLabel="Contact us" onPrimary={() => go('contact')} />
  </>);
} });
