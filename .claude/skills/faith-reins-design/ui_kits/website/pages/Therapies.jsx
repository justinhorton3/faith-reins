const THERAPIES = {
  'speech-language-therapy': { name: 'Speech-Language Therapy', short: 'Speech & Language', eyebrow: 'Therapies · 01', title: 'Helping children find their words', lead: 'Speech-language pathologists support communication, feeding and swallowing for children from birth through adolescence.',
    help: ['Late talking and limited vocabulary', 'Articulation and speech sounds', 'Understanding and following directions', 'Stuttering and fluency', 'Feeding and swallowing', 'Social communication and play'],
    approach: 'Sessions are play-based and built around your child’s interests. Some children work at a table in the clinic; others practice words while grooming or riding a horse, where motivation runs high and pressure runs low.',
    quote: 'She used to hide behind me at the door. Now she runs in to tell her therapist about her week.', who: 'Parent of a 4-year-old', strip: ['Picture cards at the grooming stall', 'Practicing sounds on horseback', 'Sharing a word with mom at pickup'], split: A + 'imagery/home-clinical.webp' },
  'occupational-therapy': { name: 'Occupational Therapy', short: 'Occupational', eyebrow: 'Therapies · 02', title: 'Everyday skills, built with patience', lead: 'Occupational therapists help children build the fine motor, sensory and self-care skills they need at home and at school.',
    help: ['Handwriting and fine motor control', 'Sensory processing and regulation', 'Dressing, eating and self-care', 'Attention and transitions', 'Motor planning and coordination', 'Play and peer skills'],
    approach: 'We set goals around the moments that are hardest for your family — getting dressed, mealtimes, the school day — and practice them in ways that feel like play. The barn gives children rich sensory input in a calm setting.',
    quote: 'Buttoning his coat was a fight every morning. He did it himself last Tuesday and wanted everyone to see.', who: 'Parent of a 7-year-old', strip: ['Brushing and braiding a mane', 'Fine-motor work at the table', 'Sensory time in the barn'], split: A + 'heroes/desktop/pasture-hero-desktop.webp' },
  'physical-therapy': { name: 'Physical Therapy', short: 'Physical', eyebrow: 'Therapies · 03', title: 'Strength and balance for every stage', lead: 'Physical therapists help children move with more strength, balance and confidence, in the clinic and on horseback.',
    help: ['Gross motor delays', 'Walking and gait', 'Balance and coordination', 'Core strength and posture', 'Recovery after injury or surgery', 'Low or high muscle tone'],
    approach: 'A horse’s walk moves a rider’s pelvis much like a human walk. Our therapists use that movement, alongside clinic-based exercise, to build strength and balance in a way children look forward to.',
    quote: 'We were told he might not walk on his own. He walked the length of the arena beside Cowboy.', who: 'Parent of a 6-year-old', strip: ['Warming up in the clinic', 'Balance work on horseback', 'Walking the arena'], split: A + 'heroes/desktop/hero-our-horses-desktop.webp' },
  'counseling': { name: 'Counseling', short: 'Counseling', eyebrow: 'Therapies · 04', title: 'A calm place for big feelings', lead: 'Licensed counselors support children and parents through anxiety, grief, change and the hard seasons of growing up.',
    help: ['Anxiety and worry', 'Grief and loss', 'Big emotions and behavior', 'Family change and transitions', 'Confidence and self-worth', 'Parent support and coaching'],
    approach: 'Children often talk more easily side by side with a horse than face to face with an adult. Counselors may meet in an office, walk the pasture or work with the herd, always at your child’s pace.',
    quote: 'She talks to Captain Carrot first, and then she talks to us. That has changed our home.', who: 'Parent of a 10-year-old', strip: ['A walk to the pasture', 'Quiet time with the herd', 'Parent check-in'], split: A + 'heroes/desktop/hero-our-mission-desktop.webp' },
  'equine-assisted-learning': { name: 'Equine-Assisted Learning', short: 'Equine-Assisted', eyebrow: 'Therapies · 05', title: 'Learning alongside our herd', lead: 'Ground-based activities with our horses build focus, confidence, responsibility and connection.',
    help: ['Focus and following steps', 'Confidence and courage', 'Responsibility and routine', 'Calm and self-regulation', 'Teamwork and communication', 'Gentle exposure to new experiences'],
    approach: 'Most equine-assisted learning happens on the ground: leading, grooming, feeding and caring for a horse. Every activity is supervised, and every horse is chosen for a calm, patient temperament.',
    quote: 'He learned to wait, to be gentle and to lead. Those lessons came home with him.', who: 'Parent of a 9-year-old', strip: ['Learning to lead', 'Feeding time', 'Grooming as a team'], split: A + 'horses/horse-maple.webp' },
};

definePage('services-programs', { title: 'Services & Programs', nav: 'Therapies', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, TherapyIndex, Steps, CTABand, CheckList, PhotoBand } = FR;
  const items = Object.entries(THERAPIES).map(([slug, t]) => ({ title: t.short, description: t.lead, image: A + 'heroes/desktop/hero-' + slug + '-desktop.webp', to: slug }));
  return (<>
    <Hero size="page" {...heroImg('services')} eyebrow="Services & Programs" title="Therapy that meets your child where they are" lead="Five licensed services under one roof, in the clinic and in the arena." primaryLabel="Request an appointment" onPrimary={() => go('book-online')} />
    <Section>
      <Split ratio="320px 1fr" gap={64} left={<SectionHeading eyebrow="Our services" title="Choose a therapy" body="Not sure where to start? That’s normal. Call us and we’ll help you decide." linkLabel={PHONE} />} right={<TherapyIndex items={items} onSelect={(t) => go(t.to)} />} />
    </Section>
    <PhotoBand image={A + 'heroes/desktop/hero-equine-assisted-learning-desktop.webp'} imagePosition="40% 50%" />
    <Section tone="paper">
      <Split ratio="1fr 1fr" left={<SectionHeading eyebrow="Why horses" title="The barn changes the work" body="Horses give children a reason to try, a rhythm to move with and a friend who never rushes them. Equine work is always one tool among many, guided by a licensed therapist." />}
        right={<CheckList items={[{ title: 'Licensed therapists lead every session', body: 'Speech, occupational and physical therapy are delivered by licensed clinicians.' }, { title: 'Clinic and arena, one plan', body: 'Your child’s goals stay the same wherever the session happens.' }, { title: 'Progress you can see', body: 'We share notes with you and, with permission, your pediatrician.' }]} />} />
    </Section>
    <Section>
      <SectionHeading eyebrow="How to start" title="From first call to first session" />
      <Steps items={[{ title: 'Reach out', body: 'Call or send a request online.' }, { title: 'Referral and coverage', body: 'We help you request a referral and check your benefits.' }, { title: 'Evaluation', body: 'A licensed therapist meets your child and sets goals.' }, { title: 'Weekly sessions', body: 'Regular sessions with progress updates.' }]} />
    </Section>
    <CTABand title="Ready to talk about your child?" body="Our intake team will call you back within two business days." primaryLabel="Request an appointment" onPrimary={() => go('book-online')} secondaryLabel="Contact us" onSecondary={() => go('contact')} />
  </>);
} });

Object.entries(THERAPIES).forEach(([slug, t]) => definePage(slug, { title: t.name, nav: 'Therapies', render: (FR, go) => {
  const { Hero, Section, Split, SectionHeading, CheckList, SplitFeature, Steps, FAQList, CTABand, TextLink, Testimonial, PhotoStrip } = FR;
  const others = Object.entries(THERAPIES).filter(([s]) => s !== slug);
  return (<>
    <Hero size="page" {...heroImg(slug)} eyebrow={t.name} title={t.title} lead={t.lead} primaryLabel="Request an appointment" onPrimary={() => go('book-online')} secondaryLabel="Payment & insurance" onSecondary={() => go('payment-and-insurance')} />
    <Section>
      <Split ratio="1fr 1.2fr" left={<SectionHeading eyebrow="What we help with" title="Common reasons families call" body="If something on this list sounds familiar, an evaluation is a good next step." />} right={<CheckList columns={2} items={t.help} />} />
    </Section>
    <SplitFeature image={t.split} eyebrow="Our approach" title="Built around your child" body={t.approach} actions={slug === 'equine-assisted-learning' ? <TextLink onClick={() => go('our-horses')}>Meet the herd</TextLink> : null} />
    <Section>
      <SectionHeading size="sm" eyebrow="A session in pictures" title={'Inside ' + t.short.toLowerCase() + ' at Faith Reins'} />
      <PhotoStrip placeholders={t.strip.map((x) => 'Session photo — ' + x.toLowerCase())} />
    </Section>
    <Section tone="sand"><Testimonial placeholder quote={t.quote} name={t.who} context={t.name} /></Section>
    <Section tone="paper">
      <SectionHeading eyebrow="What to expect" title="Your child’s path" />
      <Steps items={[{ title: 'Evaluation', body: 'About an hour with a licensed therapist. You stay with your child.' }, { title: 'Plan and goals', body: 'We agree on clear, measurable goals together.' }, { title: 'Weekly sessions', body: 'Usually 30–60 minutes, in the clinic, the arena or both.' }]} />
    </Section>
    <Section>
      <Split ratio="320px 1fr" gap={64} left={<SectionHeading size="sm" eyebrow="Questions" title={'About ' + t.short.toLowerCase()} linkLabel="All FAQs" onLink={() => go('faq')} />}
        right={<FAQList items={[{ q: 'Do I need a referral?', a: 'Most insurance plans require a physician’s referral for therapy. We can help you request one from your pediatrician.' }, { q: 'Will my child ride a horse?', a: 'Only when it serves their goals and their therapist agrees it is safe. Many sessions happen in the clinic or on the ground.' }, { q: 'How long until we see progress?', a: 'Every child is different. We review goals with you regularly so you always know where things stand.' }]} />} />
    </Section>
    <Section tone="sand" pad="tight">
      <SectionHeading size="sm" eyebrow="Other therapies" title="Often paired with" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 32px' }}>{others.map(([s, o]) => <TextLink key={s} arrow onClick={() => go(s)}>{o.short}</TextLink>)}</div>
    </Section>
    <CTABand title={'Start ' + t.short.toLowerCase() + ' therapy'} body="Our intake team will call you back within two business days." primaryLabel="Request an appointment" onPrimary={() => go('book-online')} secondaryLabel="Contact us" onSecondary={() => go('contact')} />
  </>);
} }));
