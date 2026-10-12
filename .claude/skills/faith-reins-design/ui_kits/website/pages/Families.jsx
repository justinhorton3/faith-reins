const FAQS = {
  'Getting started': [
    { q: 'How do I know if my child needs therapy?', a: 'Trust what you are noticing. If you have a concern about speech, movement, behavior or daily skills, call us. We will talk it through and tell you honestly whether an evaluation makes sense.' },
    { q: 'Do I need a referral?', a: 'Most insurance plans require a physician’s referral for therapy. We can help you request one from your pediatrician.' },
    { q: 'What ages do you serve?', a: 'We work with children from birth through adolescence.' },
  ],
  'Sessions': [
    { q: 'How long is a session?', a: 'Usually 30 to 60 minutes, depending on your child’s plan.' },
    { q: 'Can I stay with my child?', a: 'Yes. Parents are welcome, and we will often ask you to join so you can practice at home.' },
    { q: 'Is riding safe?', a: 'Every horse is chosen for temperament and trained for therapy. Riders wear helmets and are supported by trained staff at all times.' },
  ],
  'Cost': [
    { q: 'Do you take insurance?', a: 'We work with many insurance plans. Call us and we will check your child’s benefits before the first visit.' },
    { q: 'What if I can’t afford therapy?', a: 'Please still call. Donor gifts help us offer support to families who need it.' },
  ],
};

const IntakeForm = ({ FR, submit = 'Send request', onDone }) => {
  const { TextField, Select, Checkbox, Button } = FR;
  const bp = FR.useBreakpoint();
  const [sent, setSent] = React.useState(false);
  if (sent) return (<div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0' }}><FR.Eyebrow>Request received</FR.Eyebrow><span style={{ font: '400 32px/1.15 var(--font-serif)', color: 'var(--fr-green)' }}>Thank you. We’ll call you within two business days.</span></div>);
  const two = bp !== 'mobile';
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gridTemplateColumns: two ? '1fr 1fr' : '1fr', gap: 18 }}>
      <TextField label="Parent or guardian name" required />
      <TextField label="Child’s first name" />
      <TextField label="Child’s age" type="number" />
      <TextField label="Phone" type="tel" required />
      <TextField label="Email" type="email" required style={{ gridColumn: two ? '1 / -1' : 'auto' }} />
      <Select label="Therapy of interest" placeholder="Choose one" options={['Speech-language', 'Occupational', 'Physical', 'Counseling', 'Equine-assisted learning', 'Not sure yet']} />
      <Select label="How did you hear about us?" placeholder="Choose one" options={['Pediatrician', 'School', 'Friend or family', 'Church', 'Online search', 'Other']} />
      <TextField label="What are you noticing?" multiline rows={4} style={{ gridColumn: two ? '1 / -1' : 'auto' }} />
      <Checkbox label="I’d like occasional updates from Faith Reins" style={{ gridColumn: two ? '1 / -1' : 'auto' }} />
      <div style={{ gridColumn: two ? '1 / -1' : 'auto' }}><Button type="submit" fullWidth={!two}>{submit}</Button></div>
    </form>
  );
};
window.IntakeForm = IntakeForm;

definePage('for-families', { title: 'For Families', nav: 'For Families', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, Steps, CheckList, InfoGrid, CTABand, SplitFeature, TextLink, Testimonial, PhotoBand } = FR;
  return (<>
    <Hero size="page" {...heroImg('for-families')} eyebrow="For Families" title="You know your child best. We’re here to help." lead="What to expect, from your first call to your child’s first session." primaryLabel="Request an appointment" onPrimary={() => go('book-online')} secondaryLabel="Call us" />
    <Section>
      <SectionHeading eyebrow="Path to care" title="What happens after you call" />
      <Steps items={[{ title: 'A real person calls back', body: 'Within two business days, someone from our team will call you.' }, { title: 'Referral and coverage', body: 'We help you request a referral and check your benefits.' }, { title: 'Evaluation', body: 'Your child meets a licensed therapist. You stay in the room.' }, { title: 'A plan you understand', body: 'Clear goals, a weekly schedule and regular updates.' }]} />
    </Section>
    <Section tone="paper">
      <Split ratio="1fr 1fr" left={<SectionHeading eyebrow="First visit" title="What to bring" body="Arrive ten minutes early. Wear closed-toe shoes; we may visit the barn." />} right={<CheckList items={['Insurance card and photo ID', 'Physician referral, if you have one', 'Recent evaluations or school reports', 'A list of current medications', 'A snack and water for your child']} />} />
    </Section>
    <Section tone="sand"><Testimonial placeholder quote="I was nervous to call. They called back the next morning, listened to everything and never once rushed me." name="Parent of a 3-year-old" context="First visit" /></Section>
    <SplitFeature image={A + 'imagery/home-clinical.webp'} eyebrow="Our promise" title="You will never be made to feel like a burden." body="Asking for help is hard. We answer the phone, we call back, and we explain things plainly. If we’re not the right fit, we’ll help you find who is." actions={<TextLink onClick={() => go('faq')}>Read the FAQ</TextLink>} />
    <PhotoBand image={A + 'horses/horse-maple.webp'} imagePosition="50% 35%" caption="Maple, one of the first friends many children meet." />
    <Section>
      <InfoGrid columns={3} onSelect={(it) => go(it.to)} items={[{ eyebrow: 'Cost', title: 'Payment & insurance', body: 'How coverage works and how we can help.', linkLabel: 'Payment & insurance', to: 'payment-and-insurance' }, { eyebrow: 'Answers', title: 'Frequently asked questions', body: 'Referrals, sessions, safety and more.', linkLabel: 'Read the FAQ', to: 'faq' }, { eyebrow: 'Therapies', title: 'Explore our services', body: 'Speech, OT, PT, counseling and equine-assisted learning.', linkLabel: 'Our therapies', to: 'services-programs' }]} />
    </Section>
    <CTABand title="Take the first step today" body="One call is all it takes." primaryLabel="Request an appointment" onPrimary={() => go('book-online')} secondaryLabel={PHONE} />
  </>);
} });

definePage('book-online', { title: 'Request an Appointment', nav: 'For Families', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, Steps, Eyebrow } = FR;
  return (<>
    <Hero size="page" {...heroImg('book-online')} eyebrow="Request an appointment" title="Start with a conversation" lead="Tell us a little about your child. We’ll call you within two business days." />
    <Section>
      <Split ratio="1.4fr 1fr" left={<div style={{ background: 'var(--fr-paper)', border: '1px solid var(--fr-line)', padding: FR.useBreakpoint() === 'mobile' ? 22 : 40 }}><IntakeForm FR={FR} /></div>}
        right={<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <SectionHeading size="sm" eyebrow="What happens next" title="No commitment, just a call" />
          <Steps items={[{ title: 'We call you', body: 'Within two business days.' }, { title: 'We check coverage', body: 'And help with a referral.' }, { title: 'We schedule an evaluation', body: 'At a time that works for you.' }]} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Eyebrow>Prefer to call?</Eyebrow><span style={{ font: '400 26px/1.3 var(--font-serif)', color: 'var(--fr-green)' }}>{PHONE}</span></div>
        </div>} />
    </Section>
  </>);
} });

definePage('payment-and-insurance', { title: 'Payment & Insurance', nav: 'For Families', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, CheckList, Steps, FAQList, CTABand, InfoGrid } = FR;
  return (<>
    <Hero size="page" {...heroImg('payment-and-insurance')} eyebrow="Payment & Insurance" title="Cost shouldn’t be the reason a child waits" lead="We’ll check your benefits before the first visit, so there are no surprises." primaryLabel="Check my coverage" onPrimary={() => go('contact')} />
    <Section>
      <SectionHeading eyebrow="How it works" title="Three ways families pay" />
      <InfoGrid columns={3} items={[{ title: 'Insurance', body: 'We work with many plans. Speech, occupational and physical therapy are often covered with a physician referral.', strong: true }, { title: 'Private pay', body: 'Clear session rates, shared up front before you schedule.', strong: true }, { title: 'Family support', body: 'Donor gifts help families who need assistance. Ask us — we’ll walk you through it.', strong: true }]} />
    </Section>
    <Section tone="paper">
      <Split ratio="1fr 1fr" left={<SectionHeading eyebrow="Before your first visit" title="What we’ll need" />} right={<CheckList items={['A copy of the front and back of your insurance card', 'A physician referral, if your plan requires one', 'Any prior authorization paperwork', 'Secondary insurance details, if you have it']} />} />
    </Section>
    <Section>
      <Split ratio="320px 1fr" gap={64} left={<SectionHeading size="sm" eyebrow="Questions" title="About cost" />} right={<FAQList items={FAQS['Cost'].concat([{ q: 'Will I get a bill after insurance?', a: 'If you owe a copay or coinsurance, we’ll tell you before sessions begin and send a clear statement each month.' }])} />} />
    </Section>
    <CTABand tone="sand" title="Let us check your coverage" body="Send your insurance details and we’ll call you back." primaryLabel="Contact us" onPrimary={() => go('contact')} secondaryLabel={PHONE} />
  </>);
} });

definePage('faq', { title: 'FAQ', nav: 'For Families', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, FAQList, CTABand } = FR;
  return (<>
    <Hero size="page" {...heroImg('faq')} eyebrow="FAQ" title="Questions parents ask us" lead="Plain answers about evaluations, sessions, safety and cost." />
    {Object.entries(FAQS).map(([group, items], i) => (
      <Section key={group} tone={i % 2 ? 'paper' : 'page'} pad="tight">
        <Split ratio="320px 1fr" gap={64} left={<SectionHeading size="sm" eyebrow={'0' + (i + 1)} title={group} />} right={<FAQList items={items} defaultOpenFirst={i === 0} />} />
      </Section>
    ))}
    <CTABand title="Still have a question?" body="Call us. A real person will answer." primaryLabel="Contact us" onPrimary={() => go('contact')} secondaryLabel={PHONE} />
  </>);
} });

definePage('for-referring-providers', { title: 'For Referring Providers', nav: 'For Providers', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, CheckList, Steps, InfoGrid, CTABand, TextField, Select, Button } = FR;
  const bp = FR.useBreakpoint();
  return (<>
    <Hero size="page" {...heroImg('for-referring-providers')} eyebrow="For Referring Providers" title="A partner in your patients’ care" lead="Referrals, orders and progress notes, handled promptly and shared with you." primaryLabel="Send a referral" primaryVariant="primary" onPrimary={() => { const el = document.getElementById('referral'); el && window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); }} />
    <Section>
      <SectionHeading eyebrow="Services" title="What we accept referrals for" />
      <InfoGrid columns={4} items={[{ title: 'Speech-language therapy', body: 'Language, articulation, fluency, feeding and swallowing.' }, { title: 'Occupational therapy', body: 'Fine motor, sensory processing, self-care.' }, { title: 'Physical therapy', body: 'Gross motor, gait, balance, strength, including hippotherapy.' }, { title: 'Counseling', body: 'Anxiety, grief, behavior and family support.' }]} />
    </Section>
    <Section tone="paper">
      <SectionHeading eyebrow="Process" title="How referrals work" />
      <Steps items={[{ title: 'Send the referral', body: 'Fax, email or use the form below. Include diagnosis and orders.' }, { title: 'We contact the family', body: 'Within two business days of receiving the referral.' }, { title: 'Evaluation and plan', body: 'We send you the evaluation and plan of care for signature.' }, { title: 'Progress notes', body: 'Shared on the schedule you request.' }]} />
    </Section>
    <Section id="referral">
      <Split ratio="1fr 1.3fr" left={<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><SectionHeading eyebrow="Referral" title="Send a referral" body="For urgent questions, call our clinical team directly." /><CheckList items={['Patient name and date of birth', 'Diagnosis and ICD-10 code', 'Therapy orders', 'Parent or guardian contact']} /></div>}
        right={<form onSubmit={(e) => e.preventDefault()} style={{ background: 'var(--fr-paper)', border: '1px solid var(--fr-line)', padding: bp === 'mobile' ? 22 : 40, display: 'grid', gridTemplateColumns: bp === 'mobile' ? '1fr' : '1fr 1fr', gap: 18 }}>
          <TextField label="Provider name" required /><TextField label="Practice" />
          <TextField label="Phone" type="tel" required /><TextField label="Email" type="email" />
          <TextField label="Patient name" required /><TextField label="Patient date of birth" type="date" />
          <Select label="Service" placeholder="Choose one" options={['Speech-language', 'Occupational', 'Physical', 'Counseling', 'Equine-assisted learning']} style={{ gridColumn: bp === 'mobile' ? 'auto' : '1 / -1' }} />
          <TextField label="Notes and orders" multiline rows={4} style={{ gridColumn: bp === 'mobile' ? 'auto' : '1 / -1' }} />
          <div style={{ gridColumn: bp === 'mobile' ? 'auto' : '1 / -1' }}><Button type="submit" fullWidth={bp === 'mobile'}>Send referral</Button></div>
        </form>} />
    </Section>
  </>);
} });

definePage('contact', { title: 'Contact', nav: 'For Families', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, Eyebrow, FAQList } = FR;
  const bp = FR.useBreakpoint();
  return (<>
    <Hero size="page" {...heroImg('contact')} eyebrow="Contact" title="We’d love to hear from you" lead="Call, email or send a message. A real person will get back to you." />
    <Section>
      <Split ratio="1fr 1.4fr" left={<div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <SectionHeading size="sm" eyebrow="Reach us" title="Talk to our team" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Eyebrow>Phone</Eyebrow><span style={{ font: '400 26px/1.3 var(--font-serif)', color: 'var(--fr-green)' }}>{PHONE}</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Eyebrow>Email</Eyebrow><span style={{ font: '400 22px/1.3 var(--font-serif)', color: 'var(--fr-green)' }}>{EMAIL}</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Eyebrow>Visit</Eyebrow><span style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fr-muted)' }}>South Arkansas. We share directions when we schedule your visit.</span></div>
          <FAQList items={FAQS['Getting started'].slice(0, 2)} />
        </div>}
        right={<div style={{ background: 'var(--fr-paper)', border: '1px solid var(--fr-line)', padding: bp === 'mobile' ? 22 : 40 }}><IntakeForm FR={FR} submit="Send message" /></div>} />
    </Section>
  </>);
} });
