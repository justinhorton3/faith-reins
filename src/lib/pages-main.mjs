import PRODUCTS from "./products.json" with { type: "json" };
import { poloShowcase } from "./polo-showcase.mjs";
// Main site pages in Design System v6 layouts. Copy, contact details, forms and shop data are the site's own.
import * as L from "./lib.mjs";
const { hero, section, split, stack, panel, sh, therapyIndex, tiles, splitFeature, steps, checks, infoGrid, testimonial, faqList, ctaBand, photoBand, profile, profileGrid, notice, reach, form, btn, tlink, eyebrow, img, esc, titleBand, SITE, CAMPAIGN } = L;

import { FAQ_GROUPS, fallback } from "./content.mjs";
import { teamBlock, horsesBlock, testimonialsBlock, faqBlock, sponsorsBlock } from "./blocks.mjs";
export const pages = [];
export const add = (route, title, description, body, jsonld) => pages.push({ route, title: `${title} | Faith Reins`, description, body, jsonld });

const APPT = ["Request an appointment", "/book-online"];
const TEL = `<a href="tel:${SITE.tel}">${SITE.phone}</a>`;
const MAIL = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;
const heroImg = (key) => img(`hero-${key}-desktop`);


/* Services */
const SVC = [
  { title: "Speech-Language Therapy", short: "Speech & Language", desc: "Supporting speech, language and communication in everyday life.", href: "/speech-language-therapy", key: "speech-language-therapy" },
  { title: "Occupational Therapy", short: "Occupational", desc: "Individualized support for daily routines, participation and independence.", href: "/occupational-therapy", key: "occupational-therapy" },
  { title: "Physical Therapy", short: "Physical", desc: "Supporting mobility, strength and confidence through individualized care.", href: "/physical-therapy", key: "physical-therapy" },
  { title: "Counseling", short: "Counseling", desc: "A supportive place for emotional well-being and personal growth.", href: "/counseling", key: "counseling" },
  { title: "Equine-Assisted Learning", short: "Equine-Assisted Learning", desc: "Ground-based experiences with horses supporting confidence, connection and life skills.", href: "/equine-assisted-learning", key: "equine-assisted-learning", pos: "30% 50%" },
];
const svcIndex = (items = SVC) => therapyIndex(items.map((s) => ({ title: s.short === "Equine-Assisted Learning" ? "Equine-Assisted" : s.short, desc: s.desc, href: s.href, image: heroImg(s.key), pos: s.pos })));

const startCta = () => ctaBand({ title: "Ready to take the next step?", body: "Send a request and our team will contact you about next steps and scheduling.", primary: APPT, secondary: ["Contact us", "/contact"] });

/* ---------- Home ---------- */
add("/", "Pediatric Therapy & Equine-Assisted Learning in South Arkansas", "Faith Reins offers pediatric therapy, counseling and equine-assisted learning for children and families in Camden and South Arkansas.",
  hero({ key: "home", size: "home", pos: "62% 40%", eyebrow: "Pediatric & Equine Therapy", title: "People. Horses. <i>Brighter</i> futures.", lead: "Expert pediatric therapy and equine-assisted learning to help your child grow, heal and thrive in South Arkansas.", primary: APPT, secondary: ["Our therapies", "/services-programs"] }) +
  section(split(
    sh({ eyebrow: "Therapies", title: "Five ways we help", body: "Every plan starts with your child and your family, with individualized goals built together.", link: ["What to expect", "/for-families"] }),
    svcIndex(), { cols: "320px 1fr", gap: 64 })) +
  tiles([
    { eyebrow: "For parents", title: "What happens after you reach out", label: "Read the guide", href: "/for-families" },
    { eyebrow: "For providers", title: "A clear path from referral to care", label: "Send a referral", href: "/for-referring-providers" },
    { eyebrow: "For donors", title: "Help bring care closer to families", label: "Ways to support", href: "/give" },
  ]) +
  splitFeature({ image: heroImg("equine-assisted-learning"), pos: "30% 50%", alt: "A child with one of our horses", eyebrow: "Meet the herd", title: "Big personalities. Gentle connections.", body: "Horses give children a calm, honest partner. Our herd is selected and cared for with one question in mind: does this horse help a child feel safe enough to grow?", actions: tlink("Our horses", "/our-horses") }) +
  section(sh({ eyebrow: "Getting started", title: "Your path to care" }) +
    steps([["Reach out", "Send a request or call our team."], ["Share needs or a referral", "Tell us about your child and goals."], ["Schedule a visit", "We find a time that works."], ["Begin a plan", "Your care plan starts with your family."]]), { tone: "paper" }) +
  section(sh({ eyebrow: "What families say", title: "In their words", center: true }) + `<div class="quotes" data-cms="testimonials">${testimonialsBlock(fallback.testimonials)}</div>`, { tone: "sand" }) +
  splitFeature({ image: img("home-team"), alt: "The Faith Reins care team", eyebrow: "Our team", title: "Meet the people behind the care.", body: "A dedicated team of professionals, horse handlers and volunteers committed to brighter futures.", actions: tlink("Meet our team", "/our-team"), reverse: true }) +
  section(infoGrid([
    { eyebrow: "Our mission", title: "Rooted in faith. Guided by care.", body: "Faith Reins Equestrian Center exists to provide pediatric therapy and equine-assisted learning services that inspire growth, healing and hope for children and families in South Arkansas.", link: ["Our mission", "/our-mission"], strong: true },
    { eyebrow: "Our partners", title: "Stronger together.", body: "Community partners help expand access and create opportunities for more families in South Arkansas.", link: ["Our partners", "/our-partners"], strong: true },
  ], { cols: 2 }), { pad: "tight" }) +
  splitFeature({ variant: "bleed", bg: "white", image: heroImg("give"), eyebrow: "Stewardship", title: "Help make care possible.", body: "Your support helps bring therapeutic programs to children and families, and brings them closer to brighter futures. A monthly gift of $100 helps provide therapy sessions, program support and essential care.", actions: btn("Give monthly", "/give") + tlink("Sponsorships", "/sponsorships") }) +
  section(split(
    sh({ eyebrow: "Stay connected", title: "Updates from Faith Reins", body: "Get updates on programs, events and stories from Faith Reins delivered to your inbox. We respect your privacy." }),
    form("contact", { submit: "Subscribe", success: "Thank you — we will be in touch." })), { tone: "paper" }));

/* ---------- Mission ---------- */
add("/our-mission", "Our Mission", "Faith Reins is rooted in faith and guided by care, helping children and families grow through care, connection and community.",
  hero({ key: "our-mission", eyebrow: "Our Mission", title: "Rooted in faith. Guided by care.", lead: "Helping children and families grow through care, connection and community.", primary: ["Meet our team", "/our-team"], secondary: ["Explore services", "/services-programs"] }) +
  section(sh({ eyebrow: "Why we exist", title: "Care, connection and community", body: "We serve children and families with clinical care, trusted relationships and the steady presence of horses.", center: true })) +
  photoBand({ image: img("pasture-hero"), pos: "50% 70%", alt: "The pasture at Faith Reins" }) +
  section(infoGrid([
    { eyebrow: "Our faith foundation", title: "A faith-rooted ministry of care", body: "Faith Reins is a faith-rooted ministry of care. Compassion guides how we welcome every child and family.", strong: true },
    { eyebrow: "Our approach", title: "Every child is different", body: "Our team builds individualized plans with families and pairs clinical expertise with the calm, relational setting horses provide.", strong: true },
  ], { cols: 2 })) +
  section(sh({ eyebrow: "What guides us", title: "What guides our care" }) + infoGrid([
    { title: "Faith-rooted compassion", body: "Every family is welcomed with dignity and care." },
    { title: "Clinical excellence", body: "Individualized, evidence-based care from qualified professionals." },
    { title: "Family partnership", body: "Families are part of the team and part of every plan." },
    { title: "Safety", body: "Supervision and thoughtful routines in every setting." },
    { title: "Stewardship", body: "Gifts are used with care for children, families and horses." },
  ], { cols: 3 }), { tone: "paper" }) +
  splitFeature({ image: heroImg("our-horses"), alt: "Horses at Faith Reins", eyebrow: "Why horses", title: "Calm partners in learning.", body: "Horses offer a calm, relational environment where children can build confidence, trust and communication. Equine-assisted learning complements, and does not replace, clinical care.", actions: tlink("Our horses", "/our-horses") }) +
  section(sh({ eyebrow: "Where to next", title: "Keep exploring", size: "sm" }) + infoGrid([
    { title: "Services & Programs", body: "Therapy, counseling and EAL.", link: ["Explore", "/services-programs"] },
    { title: "Our Team", body: "The people behind the care.", link: ["Meet the team", "/our-team"] },
    { title: "Our Horses", body: "Meet our equine partners.", link: ["Meet the horses", "/our-horses"] },
    { title: "Contact", body: "Questions? We are here.", link: ["Contact us", "/contact"] },
  ], { cols: 4 })) +
  ctaBand({ title: "Be part of the mission", body: "Give, sponsor or volunteer.", primary: ["Support Faith Reins", "/give"], secondary: ["Join our team", "/join-our-team"] }));

/* ---------- Services hub ---------- */
add("/services-programs", "Services & Programs", "Occupational therapy, physical therapy, speech-language therapy, counseling and equine-assisted learning in South Arkansas.",
  hero({ key: "services", eyebrow: "Services & Programs", title: "Care for every next step.", lead: "Occupational therapy, physical therapy, speech-language therapy, counseling and equine-assisted learning.", primary: APPT }) +
  section(split(
    sh({ eyebrow: "Our services", title: "Individualized, family-centered care", body: "Every plan starts with your child and your family. Not sure where to start? Call us and we will help you decide.", link: [SITE.phone, "tel:" + SITE.tel] }),
    svcIndex(), { cols: "320px 1fr", gap: 64 })) +
  photoBand({ image: heroImg("equine-assisted-learning"), pos: "40% 50%", alt: "A child with one of our horses" }) +
  section(split(
    sh({ eyebrow: "Two paths in", title: "For families and providers" }),
    infoGrid([
      { title: "For families", body: "What to expect after you reach out.", link: ["For families", "/for-families"], strong: true },
      { title: "For referring providers", body: "A clear path from referral to care.", link: ["Referral pathway", "/for-referring-providers"], strong: true },
    ], { cols: 2 })), { tone: "paper" }) +
  section(sh({ eyebrow: "How to start", title: "From first call to first visit" }) + steps([["Ask questions", "Call, email or send a message."], ["Request an appointment", "Or send a provider referral."], ["Meet the team", "We will talk through next steps and scheduling."]])) +
  startCta());

/* ---------- Service detail pages ---------- */
const SPLIT_IMG = {
  "speech-language-therapy": ["home-clinical", "50% 50%"],
  "occupational-therapy": ["pasture-hero", "50% 60%"],
  "physical-therapy": ["hero-our-horses-desktop", "50% 50%"],
  counseling: ["hero-our-mission-desktop", "50% 50%"],
  "equine-assisted-learning": ["pasture-hero", "60% 60%"],
};
function service({ route, key, name, h1, body, overview, areasTitle, areas, journeyTitle, journey }) {
  const [ik, ipos] = SPLIT_IMG[key];
  const others = SVC.filter((s) => s.href !== route);
  add(route, name, body,
    hero({ key, eyebrow: name, title: h1, lead: body, primary: APPT, secondary: ["Payment & insurance", "/payment-and-insurance"] }) +
    section(split(
      sh({ eyebrow: areasTitle, title: "Every plan is individualized", body: "We focus on what matters most to your child and family, and build goals together." }),
      checks(areas, { cols: 2 }), { cols: "1fr 1.2fr" })) +
    splitFeature({ image: img(ik), pos: ipos, eyebrow: "About " + name.toLowerCase(), title: "Built around your child", body: overview.join(" "), actions: key === "equine-assisted-learning" ? tlink("Meet the herd", "/our-horses") : tlink("For families", "/for-families"), bg: "" }) +
    section(sh({ eyebrow: "What to expect", title: journeyTitle }) + steps(journey), { tone: "paper" }) +
    section(sh({ eyebrow: "Other services", title: "Often paired with", size: "sm" }) + `<div class="links-row">${others.map((o) => tlink(o.short, o.href, { arrow: true })).join("")}</div>`, { tone: "sand", pad: "tight" }) +
    ctaBand({ title: "A clear first step.", body: "Send a request or talk with our team about coverage and next steps.", primary: APPT, secondary: ["Payment & insurance", "/payment-and-insurance"] }));
}
const J = (a, b, c, d) => [["Evaluation", a], ["Goal-setting", b], ["Sessions", c], ["Family carryover", d]];
service({ route: "/speech-language-therapy", key: "speech-language-therapy", name: "Speech-Language Therapy", h1: "Helping every voice connect.", body: "Supporting speech, language and communication in everyday life.",
  overview: ["Speech-language therapy helps children understand, express and connect through communication.", "Our therapists work with your child and family to build skills that matter at home, at school and in the community."],
  areasTitle: "What we support", areas: [["Communication", "Expressing needs, wants and ideas."], ["Language", "Understanding and using words and sentences."], ["Feeding", "Support for safe, comfortable mealtimes."], ["Social interaction", "Back-and-forth connection with others."], ["Confidence", "Feeling heard and understood."]],
  journeyTitle: "What sessions may include", journey: J("We learn about your child and your family's goals.", "Together we set clear, meaningful goals.", "Play-based and purposeful activities.", "Practical ideas to use between sessions.") });
service({ route: "/occupational-therapy", key: "occupational-therapy", name: "Occupational Therapy", h1: "Skills for everyday life.", body: "Individualized support for daily routines, participation and independence.",
  overview: ["Occupational therapy helps children take part in the everyday activities that fill their day.", "We focus on what matters most to your child and family, with warm, individualized care."],
  areasTitle: "Skill areas", areas: [["Daily living", "Dressing, eating and self-care routines."], ["Sensory support", "Strategies for comfort and regulation."], ["Fine motor skills", "Hand skills for play and school."], ["Motor planning", "Planning and sequencing movement."], ["Play and school routines", "Participation at home and in class."]],
  journeyTitle: "Our care approach", journey: J("We observe and listen to understand your child's strengths.", "Individualized goals built with your family.", "Hands-on, engaging activities.", "Simple tools for home and school.") });
service({ route: "/physical-therapy", key: "physical-therapy", name: "Physical Therapy", h1: "Movement with purpose.", body: "Supporting mobility, strength and confidence through individualized care.",
  overview: ["Pediatric physical therapy supports children as they move, grow and gain independence.", "We explain each step in plain language and celebrate progress with your family."],
  areasTitle: "Focus areas", areas: [["Mobility", "Moving safely and with confidence."], ["Strength", "Building strength for daily activity."], ["Coordination", "Smoother, more confident movement."], ["Balance", "Stability for play and daily life."], ["Endurance", "Energy for the day ahead."], ["Family goals", "Plans shaped around your priorities."]],
  journeyTitle: "The care journey", journey: J("A thorough look at how your child moves.", "Goals that reflect real life.", "Active, motivating sessions.", "A home program that fits your routine.") });
service({ route: "/counseling", key: "counseling", name: "Counseling", h1: "A caring space to grow.", body: "A supportive place for emotional well-being and personal growth.",
  overview: ["Counseling offers children, teens and families a calm, supportive place to talk, learn and grow.", "We work in partnership with parents and caregivers."],
  areasTitle: "Areas of support", areas: [["Child counseling", "Age-appropriate, gentle support."], ["Teen support", "A steady place for growing minds."], ["Family support", "Strengthening communication at home."], ["Anxiety and stress", "Tools for big feelings."], ["Behavior", "Understanding and supporting change."], ["Trauma-informed care", "Safe, patient and respectful."]],
  journeyTitle: "What to expect", journey: [["Intake", "We learn about your child and family."], ["Goals", "Together we set clear goals."], ["Session rhythm", "A steady, predictable schedule."], ["Privacy and fit", "We talk openly about privacy and whether we are the right fit."]] });
service({ route: "/equine-assisted-learning", key: "equine-assisted-learning", name: "Equine-Assisted Learning", h1: "Learning through connection.", body: "Ground-based experiences with horses supporting confidence, connection and life skills.",
  overview: ["Equine-assisted learning (EAL) offers ground-based experiences with horses, guided by our team.", "These learning experiences are not a substitute for clinical therapy, and activities are always supervised."],
  areasTitle: "What participants practice", areas: [["Confidence", "Trying new things with support."], ["Trust", "Building relationship with a calm partner."], ["Communication", "Clear, kind, non-verbal connection."], ["Responsibility", "Caring for another living being."], ["Regulation", "Staying calm and present."], ["Resilience", "Keeping going after challenges."]],
  journeyTitle: "What to expect", journey: [["Arrival", "A warm welcome and time to settle."], ["Safety orientation", "Clear expectations around horses."], ["Guided activities", "Supervised, ground-based experiences."], ["Reflection", "Talking about what was learned."]] });

/* ---------- For Families ---------- */
add("/for-families", "For Families", "What happens after you request an appointment at Faith Reins: a clear first step and a caring team.",
  hero({ key: "for-families", eyebrow: "For Families", title: "A clear first step. A caring team.", lead: "Explore services and learn what happens after you request an appointment.", primary: APPT, secondary: ["Contact us", "/contact"] }) +
  section(sh({ eyebrow: "Path to care", title: "Your path to care" }) + steps([["Reach out", "Send a request or call our team."], ["Share needs or a referral", "Tell us about your child and goals."], ["Schedule a visit", "We find a time that works."], ["Begin a plan", "Your care plan starts with your family."]])) +
  section(split(
    sh({ eyebrow: "First visit", title: "What to expect", body: "You are part of every step, from the first conversation to your child's plan." }),
    checks([["The first conversation", "We listen and answer your questions."], ["Preparing for your visit", "We share what to bring and who to expect."], ["Arrival", "A welcoming, calm space."], ["Family involvement", "You are part of every step."]])), { tone: "paper" }) +
  photoBand({ image: img("home-clinical"), pos: "50% 45%", alt: "A therapy session at Faith Reins" }) +
  section(sh({ eyebrow: "Helpful links", title: "Before you call", size: "sm" }) + infoGrid([
    { eyebrow: "Appointments", title: "Book online", body: "Request an appointment.", link: ["Request", "/book-online"] },
    { eyebrow: "Cost", title: "Payment & insurance", body: "Coverage and payment questions.", link: ["Learn more", "/payment-and-insurance"] },
    { eyebrow: "Answers", title: "Frequently asked questions", body: "Answers to common questions.", link: ["Read the FAQ", "/faq"] },
    { eyebrow: "Services", title: "Services & programs", body: "See all of our care.", link: ["Explore", "/services-programs"] },
  ], { cols: 4 })) +
  ctaBand({ title: "Questions? We are glad to help.", body: "Call, email or send a request. Our team will follow up.", primary: APPT, secondary: ["Contact us", "/contact"] }));

/* ---------- Book Online ---------- */
add("/book-online", "Request an Appointment", "Send an appointment request to Faith Reins. Our team will contact you about next steps and scheduling.",
  hero({ key: "book-online", eyebrow: "Request an appointment", title: "Let's find your next step.", lead: "Send a request. Our team will contact you about next steps and scheduling." }) +
  section(split(
    panel(form("appointment", { submit: "Submit request", success: "Thank you. Our team will contact you about next steps and scheduling.", layout: "two", wide: "service_interest_wmc0m7,message_nq34a3,preferred_contact_method_hzj8eh" })),
    stack(
      sh({ eyebrow: "What happens next", title: "We read every request", size: "sm", face: "serif", body: "Please do not include urgent or emergency information in this form. If this is an emergency, call 911." }),
      steps([["We review your request", "A team member reads every message."], ["We contact you", "By your preferred method."], ["We plan next steps", "Scheduling and what to bring."]]),
      reach("Prefer to call?", TEL, { big: true })),
    { cols: "1.4fr 1fr" })) +
  section(infoGrid([
    { title: "Contact", body: "Prefer to talk it through?", link: ["Contact us", "/contact"] },
    { title: "FAQ", body: "Common questions answered.", link: ["Read the FAQ", "/faq"] },
    { title: "Payment & Insurance", body: "Coverage and payment.", link: ["Learn more", "/payment-and-insurance"] },
  ], { cols: 3 }), { tone: "paper", pad: "tight" }));

/* ---------- Providers ---------- */
add("/for-referring-providers", "For Referring Providers", "A clear path from referral to care. Connect children and families with the right next step at Faith Reins.",
  hero({ key: "for-referring-providers", eyebrow: "For Referring Providers", title: "A clear path from referral to care.", lead: "Connect children and families with the right next step.", primary: ["Contact intake", "/contact"] }) +
  section(sh({ eyebrow: "Process", title: "Referral pathway" }) + steps([["Identify the need", "Recognize a child who may benefit."], ["Send a referral", "Contact our intake team."], ["Coordinate records", "We confirm what is needed."], ["Family scheduling", "We reach out to the family."]])) +
  section(sh({ eyebrow: "Services", title: "Service fit" }) + infoGrid(SVC.map((s) => ({ title: s.title, body: s.desc, link: ["Learn more", s.href] })), { cols: 3 }), { tone: "paper" }) +
  section(split(
    sh({ eyebrow: "Referral", title: "Helpful information to share", body: "Where available, a brief referral note, relevant evaluations, the child's age and the family's contact details help us move quickly. We will tell you if anything else is needed." }),
    checks(["Reason for referral", "Relevant evaluations or notes", "Family contact details", "Preferred service"]))) +
  ctaBand({ title: "Provider contact", body: "Reach our intake team through the contact page.", primary: ["Contact intake", "/contact"], secondary: ["For families", "/for-families"] }));

/* ---------- Payment ---------- */
add("/payment-and-insurance", "Payment & Insurance", "How to pay for Faith Reins therapy services — insurance, private pay, ARKids First, Medicaid, and financial assistance.",
  hero({ key: "payment-and-insurance", eyebrow: "Payment & Insurance", title: "Clear answers before care begins.", lead: "We want cost to be the last reason a family waits.", primary: ["Contact our team", "/contact"], secondary: ["Request an appointment", "/book-online"] }) +
  section(sh({ eyebrow: "How payment works", title: "Ways families pay", body: "We work with families to find a payment path that makes care accessible. Our team will confirm what applies to your family during the intake conversation — nothing on this page is a guarantee of coverage or cost." }) + infoGrid([
    { title: "Insurance", body: "We are working to accept major commercial insurance plans. Coverage depends on your specific plan, the services your child receives, and any referral or prior-authorization requirements your insurer has. We recommend calling the member services number on your insurance card and asking whether Faith Reins is an in-network provider before your first appointment. We are happy to provide the information you need to check your benefits or submit a claim.", strong: true },
    { title: "ARKids First & Medicaid", body: "We are committed to serving families enrolled in ARKids First and Arkansas Medicaid. If your child is enrolled, please let us know during intake. Our team will verify coverage and walk through any authorization steps with you.", strong: true },
    { title: "Private pay", body: "Families who pay out of pocket are welcome. We will provide you with a clear fee estimate before care begins. Payment is due at the time of service unless other arrangements are made in advance.", strong: true },
    { title: "Financial assistance", body: "No family should go without care because of cost. We offer need-based financial assistance funded by donor gifts and our scholarship program. If cost is a barrier, please tell us — the conversation is confidential and there is no obligation.", strong: true },
  ], { cols: 2 })) +
  section(split(
    sh({ eyebrow: "Before your first conversation", title: "What to have ready", body: "These help a first conversation go smoothly. None are required to reach out." }),
    checks([["Insurance card or plan information", "If you have coverage, the member ID and group number help us verify benefits quickly."], ["Referral or provider notes", "If a physician, school, or other provider referred your child, any notes or documentation they can share are helpful."], ["ARKids First or Medicaid ID", "If your child is enrolled."], ["Questions about cost", "Write them down — there are no wrong questions and we want you to feel informed before care begins."]])), { tone: "paper" }) +
  section(notice("Costs and coverage vary. Nothing on this page is a guarantee of benefits or a quote. Our team will provide specific information during your intake conversation."), { pad: "tight" }) +
  ctaBand({ tone: "sand", title: "Questions about payment?", body: "Our team will walk through every option with you — no pressure, no obligation.", primary: ["Contact our team", "/contact"], secondary: ["Request an appointment", "/book-online"] }));

/* ---------- FAQ ---------- */
const strip = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_GROUPS.flatMap(([, qs]) => qs).map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": strip(a) } })) };
add("/faq", "FAQ", "Common questions from families, referring providers and supporters of Faith Reins.",
  hero({ key: "faq", eyebrow: "FAQ", title: "A clear next step.", lead: "Common questions from families, providers and supporters.", primary: ["Contact our team", "/contact"] }) +
  `<div data-cms="faq">${faqBlock(fallback.faq)}</div>` +
  ctaBand({ title: "Still have questions?", body: "Our team is glad to help — no question is too small.", primary: ["Contact our team", "/contact"], secondary: ["Request an appointment", "/book-online"] }),
  faqJsonLd);

/* ---------- Give ---------- */
add("/give", "Give", "Support families, horses and the Faith Reins mission with a one-time or monthly gift.",
  hero({ key: "give", eyebrow: "Give", title: "Help make care possible.", lead: "Support families, horses and the Faith Reins mission.", primary: ["Give now", "#gift"], secondary: ["View impact", "/impact-and-stewardship"] }) +
  section(split(
    stack(
      sh({ eyebrow: "Choose your gift", title: "Your gift brings care closer to home", body: "Your gift helps children and families reach care, and helps us care for our horses." }),
      checks([["Children and families", "Care that families can reach."], ["Programs", "Therapy, counseling and EAL."], ["Horses", "Daily care for our equine partners."], ["The place", "A calm, safe setting to grow."]])),
    panel(`<div data-give data-campaign="${CAMPAIGN}"><noscript>Please enable JavaScript to give online, or call ${SITE.phone}.</noscript></div>`)), { id: "gift" }) +
  section(sh({ eyebrow: "More ways to give", title: "Other ways to give" }) + infoGrid([
    { title: "Sponsor a horse", body: "Monthly sponsorship of $500–$750 supports a horse's care.", link: ["Discuss sponsorship", "/sponsorships"] },
    { title: "Give where needed most", body: "Unrestricted gifts go where families and programs need them." },
    { title: "Shop", body: "Every purchase helps fund pediatric therapy and equine-assisted learning.", link: ["Visit the shop", "/shop"] },
    { title: "Questions about giving", body: "We are happy to help.", link: ["Contact us", "/contact"] },
  ], { cols: 4 }), { tone: "paper" }) +
  ctaBand({ tone: "sand", title: "Our promise", body: "We use every gift with care. Learn how support and the mission connect.", primary: ["Impact & stewardship", "/impact-and-stewardship"], secondary: ["Our partners", "/our-partners"] }));

const thanks = (title, lead, note, actions) => section(`<div class="thanks">${eyebrow("Thank you")}<h1>${title}</h1><p class="lead">${lead}</p><p>${note}</p><div class="btn-row">${actions}</div></div>`);
add("/give/thank-you", "Thank You for Your Gift", "Your gift supports pediatric therapy and equine-assisted learning for children and families in South Arkansas.",
  thanks("Your gift is making a difference.", "Thank you for supporting Faith Reins. Your generosity helps children and families in South Arkansas reach the care they need — and helps us care for the horses that make it possible.",
    `A receipt will arrive by email shortly. If you have questions about your gift, email ${MAIL}.`,
    btn("See our impact", "/impact-and-stewardship") + tlink("Our mission", "/our-mission")));
add("/shop/thank-you", "Order Received", "Thank you for your Faith Reins order.",
  thanks("Order received — thank you.", "Your Faith Reins order is confirmed. You'll receive an email confirmation shortly with your order details, and tracking information once your items ship.",
    `Questions? Email ${MAIL} and include your order number.`,
    btn("Back to shop", "/shop") + tlink("Back to home", "/")));

/* ---------- Sponsorships ---------- */
add("/sponsorships", "Sponsorships", "A partnership with purpose. Support people, horses and the places where connection grows.",
  hero({ key: "sponsorships", eyebrow: "Sponsorships", title: "A partnership with purpose.", lead: "Support people, horses and the places where connection grows.", primary: ["Discuss sponsorship", "#inquiry"] }) +
  section(sh({ eyebrow: "Why sponsor", title: "Where sponsors help", body: "Sponsors help us care for children, families and horses, and take part in the life of the community." }) + infoGrid([
    { title: "Sponsor a horse", body: "Monthly support of $500–$750 helps care for a horse.", strong: true },
    { title: "Programs and facilities", body: "Support the arena, facilities and operations.", strong: true },
    { title: "Family access", body: "Help more families reach care.", strong: true },
  ], { cols: 3 })) +
  section(split(
    sh({ eyebrow: "Inquiry", title: "Discuss a sponsorship", body: "Tell us a little about your organization and where you would like to help. We will follow up." }),
    panel(form("sponsor", { submit: "Discuss a sponsorship", success: "Thank you. We will be in touch about sponsorship." }))), { tone: "paper", id: "inquiry" }) +
  ctaBand({ title: "More ways to help", primary: ["Give", "/give"], secondary: ["Impact & stewardship", "/impact-and-stewardship"] }));

/* ---------- Impact ---------- */
add("/impact-and-stewardship", "Impact & Stewardship", "Your generosity, a stronger community. See how support and the mission connect.",
  hero({ key: "impact-and-stewardship", eyebrow: "Impact & Stewardship", title: "Your generosity. A stronger community.", lead: "See how support and the mission connect.", primary: ["Explore giving", "/give"] }) +
  section(split(
    sh({ eyebrow: "How support helps", title: "Where gifts go", body: "Gifts help children and families reach care and help us care for the horses at the heart of our programs." }),
    checks([["Children and families", "Care that families can reach."], ["Programs", "Therapy, counseling and EAL."], ["Horses", "Daily care for our equine partners."], ["The place", "A calm, safe setting to grow."]]))) +
  section(sh({ eyebrow: "Stewardship principles", title: "What you can expect from us" }) + infoGrid([
    { title: "Transparency", body: "We explain how gifts are used.", strong: true },
    { title: "Responsible care", body: "Careful decisions with every dollar.", strong: true },
    { title: "Mission focus", body: "Children, families and horses first.", strong: true },
    { title: "Accountability", body: "We answer to those who give.", strong: true },
  ], { cols: 4 }), { tone: "paper" }) +
  ctaBand({ title: "Join us", body: "Give with confidence.", primary: ["Give", "/give"], secondary: ["Sponsorships", "/sponsorships"] }));

/* ---------- Partners ---------- */
add("/our-partners", "Our Partners", "Community and clinical connections supporting South Arkansas.",
  hero({ key: "our-partners", eyebrow: "Our Partners", title: "Stronger together.", lead: "Community and clinical connections supporting South Arkansas.", primary: ["Become a partner", "/contact"] }) +
  section(sh({ eyebrow: "Who we work with", title: "Partners in care" }) + infoGrid([
    { title: "Families", body: "Our reason for being." },
    { title: "Providers", body: "Referring professionals." },
    { title: "Donors", body: "Supporters who give." },
    { title: "Community organizations", body: "Neighbors in service." },
    { title: "Sponsors", body: "Businesses and groups." },
  ], { cols: 3 })) +
  section(sh({ eyebrow: "Our sponsors", title: "Thank you to our sponsors" }) + `<div data-cms="sponsors">${sponsorsBlock(fallback.sponsors)}</div>`, { tone: "paper" }) +
  ctaBand({ title: "Become a partner", body: "Together we can support more children and families.", primary: ["Contact us", "/contact"], secondary: ["Sponsorships", "/sponsorships"] }));

/* ---------- Team ---------- */
add("/our-team", "Our Team", "A dedicated team supporting children, families and our equine programs.",
  hero({ key: "our-team", eyebrow: "Our Team", title: "People who care. A purpose we share.", lead: "A dedicated team supporting children, families and our equine programs.", primary: APPT }) +
  section(sh({ eyebrow: "Clinical & program team", title: "Leadership & clinical team", body: "Our clinicians, staff and volunteers share one purpose: to support children and families with skill, patience and faith. Each person brings specialized training and a genuine commitment to the children and families we serve." }) +
    `<div data-cms="team">${teamBlock(fallback.team)}</div>`, { id: "team-profiles" }) +
  ctaBand({ tone: "sand", title: "We are hiring", body: "Join a clinical team doing meaningful work in South Arkansas. We have open positions and always want to meet great people.", primary: ["See open positions", "/join-our-team"], secondary: ["Contact us", "/contact"] }));

/* ---------- Horses ---------- */
add("/our-horses", "Our Horses", "Meet the equine partners at Faith Reins: big personalities and gentle connections.",
  hero({ key: "our-horses", eyebrow: "Our Horses", title: "Meet our equine partners.", lead: "Big personalities. Gentle connections.", primary: ["Support the herd", "/give"] }) +
  section(sh({ eyebrow: "The herd", title: "Calm partners in learning", body: "Horses give children a calm, honest partner. Our herd is selected and cared for with one question in mind: does this horse help a child feel safe enough to grow? Each one has a distinct personality, and part of the work is helping children and horses find their rhythm together." }) +
    `<div data-cms="horses">${horsesBlock(fallback.horses)}</div>`) +
  ctaBand({ title: "Learn through connection", body: "Equine-assisted learning offers supervised, ground-based experiences with our herd.", primary: ["Equine-assisted learning", "/equine-assisted-learning"], secondary: ["Services & programs", "/services-programs"] }));

/* ---------- Join ---------- */
add("/join-our-team", "Join Our Team", "Career and volunteer opportunities at Faith Reins Equestrian Center in Camden, Arkansas.",
  hero({ key: "join-our-team", eyebrow: "Join Our Team", title: "Bring your purpose to Faith Reins.", lead: "Build a career around meaningful work in a faith-rooted, team-driven setting in South Arkansas.", primary: ["See open positions", "#openings"], secondary: ["Volunteer with us", "#volunteer"] }) +
  section(sh({ eyebrow: "Why Faith Reins", title: "Why work here" }) + infoGrid([
    { title: "Mission-driven work", body: "Every session, every shift, every day — the work is real and the impact is visible." },
    { title: "A setting like no other", body: "A clinic, an arena, and a herd. There is no other place quite like this to practice pediatric care." },
    { title: "A team that shows up", body: "Small enough to know each other, experienced enough to make each other better." },
    { title: "Faith-rooted culture", body: "Compassion guides how we treat each other and the families we serve." },
  ], { cols: 4 })) +
  section(sh({ eyebrow: "Open positions", title: "Current openings" }) + split(
    `<div class="stack" style="gap:18px">${eyebrow("Full-time · Camden, AR · Salary negotiable")}<h3 class="sh__title" style="font-family:var(--font-serif);font-size:34px;line-height:1.12">Speech-Language Pathologist</h3>${btn("Apply", "/contact", "accent")}</div>`,
    `<div class="prose"><p>We are looking for a licensed, ASHA-certified SLP to join our clinical team. You will work primarily with pediatric clients on articulation, language development, social communication, and feeding, within a collaborative, faith-rooted environment that includes equine-assisted learning alongside traditional clinic-based care.</p>
<h4>What we are looking for</h4><ul><li>M.S. in Speech-Language Pathology</li><li>Arkansas state licensure (or eligible)</li><li>ASHA Certificate of Clinical Competence (CCC-SLP)</li><li>Experience with pediatric populations preferred</li><li>Collaborative mindset and comfort working in a mission-driven, faith-rooted setting</li></ul>
<h4>What we offer</h4><ul><li>Full-time position with competitive salary negotiated based on experience</li><li>A small, supportive clinical team with strong peer collaboration</li><li>Exposure to equine-assisted learning as a complement to traditional therapy</li><li>A calm, relationship-centered work environment in South Arkansas</li><li>The chance to build something — we are a growing practice with real community need</li></ul>
<p class="muted">To apply, send a cover letter and résumé through our contact form or directly to ${MAIL}.</p></div>`, { cols: "320px 1fr", gap: 64 }) +
    `<p class="muted">More openings will be posted here as they become available. We also welcome general expressions of interest from OTs, PTs, and counselors.</p>`, { tone: "paper", id: "openings" }) +
  section(sh({ eyebrow: "Volunteer", title: "Volunteer with us", body: "Volunteers are essential to what we do — from horse handling to event support." }) + infoGrid([
    { title: "Equine support", body: "Help with horse care, handling, and session support. Training provided.", strong: true },
    { title: "Program support", body: "Assist with activities, events, and family welcome.", strong: true },
    { title: "Administrative & events", body: "Behind-the-scenes help that keeps things running.", strong: true },
  ], { cols: 3 }) + `<div class="btn-row">${btn("Learn about volunteering", "/volunteer-policy")}${tlink("Express interest", "/contact")}</div>`, { id: "volunteer" }) +
  ctaBand({ tone: "sand", title: "Get to know us", body: "Meet the people behind the care and the mission that guides us.", primary: ["Meet the team", "/our-team"], secondary: ["Our mission", "/our-mission"] }));

/* ---------- Contact ---------- */
add("/contact", "Contact", "Connect with Faith Reins about services, giving or getting involved.",
  hero({ key: "contact", eyebrow: "Contact", title: "We're here to help.", lead: "Connect with our team about services, giving or getting involved." }) +
  section(split(
    stack(
      sh({ eyebrow: "Reach us", title: "Get in touch", size: "sm" }),
      reach("Phone", TEL, { big: true }),
      reach("Email", MAIL, { big: true }),
      reach("Visit", `${SITE.street}<br>${SITE.city}<br>${SITE.hours}<br>${SITE.appt}`),
      `<p class="form-note">Please do not include medical information in messages.</p>`),
    panel(form("contact", { submit: "Send message", success: "Thank you. We received your message." })), { cols: "1fr 1.4fr" })) +
  section(sh({ eyebrow: "Find us", title: "226 Ouachita County Rd 45, Camden", size: "sm", face: "serif" }) +
    `<iframe class="map" title="Faith Reins location map" src="https://maps.google.com/maps?q=226+Ouachita+County+Rd+45,+Camden,+AR+72711&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>` +
    `<div>${`<a class="tlink" href="https://maps.google.com/maps/dir/?api=1&destination=226+Ouachita+County+Rd+45,+Camden,+AR+72711" target="_blank" rel="noopener">Get directions <span aria-hidden="true">→</span></a>`}</div>`, { tone: "paper" }) +
  section(infoGrid([
    { eyebrow: "Appointments", title: "Book online", body: "Request an appointment.", link: ["Request", "/book-online"] },
    { eyebrow: "Referrals", title: "For providers", body: "A clear path from referral to care.", link: ["Learn more", "/for-referring-providers"] },
    { eyebrow: "Giving", title: "Support the mission", body: "One-time or monthly gifts.", link: ["Give", "/give"] },
    { eyebrow: "Sponsorships", title: "Partner with us", body: "Businesses and groups.", link: ["Learn more", "/sponsorships"] },
  ], { cols: 4 }), { pad: "tight" }));

/* ---------- Shop ---------- */
/* Shop catalog: src/lib/products.json (images rendered by scripts/merch/render_merch.py). */
const shopImg = (slug) => slug === "mens-polo" ? "/assets/shop/v7/polos/mens-white-polo-product.png" : `/assets/shop/${slug}.webp`;
const FILTERS = [["all", "All"], ["mens", "Men's"], ["womens", "Women's"], ["youth", "Youth & toddler"], ["accessories", "Hats"], ["home", "Drinkware & gifts"]];
const CAT_LABEL = { apparel: "Apparel", headwear: "Headwear", drinkware: "Drinkware", accessories: "Accessories" };
const SIZE_CHARTS = {
  mens: { label: "Men's / unisex", measure: "Chest (body), inches", rows: [["XS", "31–34"], ["S", "34–37"], ["M", "38–41"], ["L", "42–45"], ["XL", "46–49"], ["2XL", "50–53"], ["3XL", "54–57"]] },
  womens: { label: "Women's", measure: "Bust (body), inches · US size", rows: [["XS", "31–32 · 0–2"], ["S", "33–34 · 4–6"], ["M", "35–36 · 8–10"], ["L", "37–39 · 12–14"], ["XL", "40–42 · 16"], ["2XL", "43–45 · 18"]] },
  youth: { label: "Youth", measure: "Chest, inches · age", rows: [["YXS", "23–24 · 4–5"], ["YS", "25–26 · 6–8"], ["YM", "27–28 · 10–12"], ["YL", "29–30 · 14–16"], ["YXL", "31–32 · 18–20"]] },
  toddler: { label: "Toddler", measure: "Height in · weight lb", rows: [["2T", "33–35 · 26–29"], ["3T", "36–38 · 30–33"], ["4T", "39–41 · 34–38"], ["5T", "42–44 · 39–42"]] },
};
const sizeChart = (k) => { const c = SIZE_CHARTS[k]; return `<div class="size-chart"><span class="size-chart__title">${esc(c.label)}</span><span class="size-chart__measure">${esc(c.measure)}</span><div class="size-chart__rows">${c.rows.map(([a, b]) => `<div class="size-chart__row"><b>${a}</b><span>${b}</span></div>`).join("")}</div></div>`; };
const label = (p) => p.fit || CAT_LABEL[p.cat];
const merchCard = (p) =>
  `<a class="merch-card" href="/shop/${p.slug}" data-group="${p.group}"><span class="merch-card__img"><img src="${shopImg(p.slug)}" alt="${esc(p.name)}" loading="lazy" width="600" height="600"${p.slug === "mens-polo" ? ' style="object-fit:contain"' : ""}></span><span class="merch-card__cat">${esc(label(p))}</span><span class="merch-card__row"><span class="merch-card__name">${esc(p.name)}</span><span class="merch-card__price">${p.availability === "out-of-stock" ? "Out of stock" : "$" + p.price}</span></span></a>`;

add("/shop", "Shop", "Faith Reins merchandise — tees, hoodies, crewnecks and polos in men's, women's and youth sizes, plus hats, mugs and gifts.",
  hero({ key: "shop", eyebrow: "Shop", title: "Wear the mission.", lead: "Every purchase supports pediatric therapy and equine-assisted learning in South Arkansas." }) +
  section(`<div class="shop-bar">${sh({ eyebrow: PRODUCTS.length + " items", title: "Faith Reins merch", size: "sm" })}<div class="shop-filters" role="group" aria-label="Filter products">${FILTERS.map(([v, l]) => `<button class="shop-filter" type="button" data-filter="${v}" aria-pressed="${v === "all"}">${esc(l)}</button>`).join("")}</div></div>
<div class="merch-grid" id="merch-grid">${PRODUCTS.map(merchCard).join("")}</div>
<script>(function(){var btns=[].slice.call(document.querySelectorAll('.shop-filter'));var cards=[].slice.call(document.querySelectorAll('#merch-grid .merch-card'));btns.forEach(function(b){b.addEventListener('click',function(){btns.forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');var f=b.dataset.filter;cards.forEach(function(c){c.style.display=(f==='all'||c.dataset.group===f)?'':'none'})})})})();</script>`, { id: "shop-products" }) +
  section(sh({ eyebrow: "Size guide", title: "Find the right fit", size: "sm", body: "Men's, women's, youth and toddler items are cut differently, so each has its own sizes. Measure the body, not the garment. Between sizes? Size up." }) + `<div class="size-charts">${Object.keys(SIZE_CHARTS).map(sizeChart).join("")}</div>`, { tone: "paper", id: "size-guide" }) +
  ctaBand({ tone: "sand", title: "Proceeds support the mission.", body: "Every purchase helps fund pediatric therapy and equine-assisted learning.", primary: ["Give instead", "/give"] }));

PRODUCTS.forEach((p) => {
  if (p.slug === "mens-polo") {
    const showcase = poloShowcase(p);
    add(`/shop/${p.slug}`, `${p.name} | Shop`, showcase.description, showcase.body, showcase.jsonld);
    return;
  }
  const { slug, name, price, sizes, desc, chart } = p;
  const image = shopImg(slug);
  const sizeBlock = sizes
    ? `<div class="stack" style="gap:10px"><p class="size-label">Size <span id="size-display"></span></p><div class="size-btns" id="size-btns" role="group" aria-label="Select a size">${sizes.map((s) => `<button class="size-btn" type="button" data-size="${esc(s)}" aria-pressed="false">${esc(s)}</button>`).join("")}</div>${chart ? `<a class="ship-note" href="/shop#size-guide">${esc(SIZE_CHARTS[chart].label)} size guide</a>` : ""}</div>`
    : "";
  const addScript = `<script>
(function(){
  var size=${sizes && sizes.length === 1 ? JSON.stringify(sizes[0]) : "null"}, qty=1;
  var sizeBtns=[].slice.call(document.querySelectorAll('.size-btn'));
  var qtyVal=document.getElementById('qty-val');
  var atb=document.getElementById('atb');
  var conf=document.getElementById('atb-conf');
  var sizeDisplay=document.getElementById('size-display');
  sizeBtns.forEach(function(b){if(size&&b.dataset.size===size)b.setAttribute('aria-pressed','true');b.addEventListener('click',function(){
    sizeBtns.forEach(function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed','true');
    size=b.dataset.size;
    if(sizeDisplay)sizeDisplay.textContent='— '+size;
    check();
  })});
  document.getElementById('qty-dec').addEventListener('click',function(){if(qty>1){qty--;qtyVal.textContent=qty;}});
  document.getElementById('qty-inc').addEventListener('click',function(){if(qty<9){qty++;qtyVal.textContent=qty;}});
  function check(){var need=${sizes ? "!size" : "false"};atb.disabled=need;atb.textContent=need?'Choose a size':'Add to bag';}
  check();
  atb.addEventListener('click',function(){
    ${sizes ? "if(!size)return;" : ""}
    var cart=[];
    try{cart=JSON.parse(localStorage.getItem('fr-cart')||'[]');}catch(e){}
    var existing=cart.find(function(i){return i.id===${JSON.stringify(slug)}&&i.size===size;});
    if(existing){existing.qty+=qty;}else{cart.push({id:${JSON.stringify(slug)},name:${JSON.stringify(name)},price:${price},size:size,qty:qty,img:${JSON.stringify(image)}});}
    try{localStorage.setItem('fr-cart',JSON.stringify(cart));}catch(e){}
    var count=cart.reduce(function(s,i){return s+i.qty;},0);
    var badge=document.getElementById('cart-badge');
    if(badge){badge.textContent=count;badge.hidden=count===0;}
    if(typeof gtag==='function')gtag('event','add_to_cart',{currency:'USD',value:${price}*qty,items:[{item_id:${JSON.stringify(slug)},item_name:${JSON.stringify(name)},price:${price},quantity:qty}]});
    conf.textContent='Added to your bag.';
    setTimeout(function(){conf.textContent='';},2500);
  });
})();
</script>`;
  const productJsonLd = {
    "@context": "https://schema.org", "@type": "Product", "name": name, "description": desc,
    "image": `https://www.faithreins.com${image}`, "brand": { "@type": "Brand", "name": "Faith Reins" },
    "offers": { "@type": "Offer", "price": price, "priceCurrency": "USD", "availability": "https://schema.org/InStock", "seller": { "@type": "Organization", "name": "Faith Reins Equestrian Center" } },
  };
  const related = PRODUCTS.filter((m) => m.slug !== slug && m.group === p.group).concat(PRODUCTS.filter((m) => m.slug !== slug && m.group !== p.group)).slice(0, 4);
  add(`/shop/${slug}`, `${name} | Shop`, desc,
    section(`<p class="crumbs"><a href="/shop">Shop</a><span aria-hidden="true">/</span><span>${esc(label(p))}</span></p>
<div class="product"><div class="product__img"><img src="${image}" alt="${esc(name)}" width="1200" height="1200"></div>
<div class="product__info">${eyebrow(label(p))}<h1 class="product__name">${esc(name)}</h1><p class="product__price">$${price}</p><p class="product__desc">${esc(desc)}</p>${sizeBlock}
<div class="qty-row"><span>Qty</span><button class="qty-btn" id="qty-dec" type="button" aria-label="Decrease quantity">−</button><span class="qty-val" id="qty-val">1</span><button class="qty-btn" id="qty-inc" type="button" aria-label="Increase quantity">+</button></div>
<button class="btn btn--block" id="atb" type="button"${sizes && sizes.length > 1 ? " disabled" : ""}>Add to bag</button>
<p class="atb-confirm" id="atb-conf" aria-live="polite"></p>
<p class="ship-note">Ships within 5–7 business days. See the <a href="/returns-policy">Returns &amp; Shipping Policy</a>.</p></div></div>`) +
    section(sh({ eyebrow: "More from the shop", title: "You might also like", size: "sm" }) + `<div class="merch-grid">${related.map(merchCard).join("")}</div>`, { tone: "paper" }) +
    addScript,
    productJsonLd);
});

/* ---------- Legal hub ---------- */
add("/legal", "Legal & Policies", "All policies, notices, and terms for Faith Reins Equestrian Center.",
  titleBand({ eyebrow: "Policies", title: "Policies &amp; legal notices", body: `Everything in one place. For questions about any policy, email ${MAIL} or <a href="/contact">contact us online</a>.` }) +
  section(infoGrid([
    { title: "Terms of Service", body: "Website use, disclaimer, intellectual property, and governing law.", link: ["Read", "/terms-of-service"] },
    { title: "Privacy Policy", body: "What we collect, how we use it, and your rights.", link: ["Read", "/privacy-policy"] },
    { title: "HIPAA Notice of Privacy Practices", body: "How we use and protect your child's health information.", link: ["Read", "/hipaa-notice"] },
    { title: "Donation Policy", body: "Stewardship, recurring gifts, refunds, and acknowledgment.", link: ["Read", "/donation-policy"] },
    { title: "Returns & Shipping", body: "Returns, exchanges, and shipping for the Faith Reins store.", link: ["Read", "/returns-policy"] },
    { title: "Volunteer Policy", body: "Background checks, conduct standards, and safety requirements.", link: ["Read", "/volunteer-policy"] },
    { title: "Accessibility", body: "WCAG commitment, physical access, and communication accommodations.", link: ["Read", "/accessibility"] },
    { title: "Cancellation Policy", body: "Notice requirements, no-show handling, and illness exceptions.", link: ["Read", "/cancellation-policy"] },
    { title: "Equine Safety & Liability", body: "Arkansas Equine Liability Act notice and safety practices.", link: ["Read", "/equine-safety"] },
    { title: "Photo & Media Consent", body: "How we use photographs and videos of clients, families, and participants.", link: ["Read", "/photo-consent"] },
  ], { cols: 3 })));
