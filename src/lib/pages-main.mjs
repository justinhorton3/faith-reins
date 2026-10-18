import PRODUCTS from "./products.json" with { type: "json" };
import { productShowcase, showcaseCard } from "./product-showcase.mjs";
import { shopCategories, categoryPage, shopCategoryTiles } from "./shop-categories.mjs";
import { shopHero, merchCorner } from "./shop-hero.mjs";
import LEGACY_PRODUCTS from "./legacy-product-routes.json" with { type: "json" };
import { registerPersonaPages } from "./persona-pages.mjs";
// Main site pages in Design System v6 layouts. Copy, contact details, forms and shop data are the site's own.
import * as L from "./lib.mjs";
const { hero, section, split, stack, panel, sh, therapyIndex, tiles, splitFeature, steps, checks, infoGrid, testimonial, faqList, ctaBand, photoBand, profile, profileGrid, notice, reach, form, btn, tlink, eyebrow, img, esc, titleBand, SITE, CAMPAIGN } = L;

import { FAQ_GROUPS, fallback } from "./content.mjs";
import { teamBlock, horsesBlock, testimonialsBlock, faqBlock, sponsorsBlock } from "./blocks.mjs";
export const pages = [];
export const add = (route, title, description, body, jsonld, seo = {}) => pages.push({ route, title: `${title} | Faith Reins`, description, body, jsonld, seo });

const APPT = ["Request a callback", "/book-online"];
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
    { eyebrow: "For donors", title: "Help bring care closer to families", label: "Ways to support", href: "/get-involved" },
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
  splitFeature({ variant: "bleed", bg: "white", image: heroImg("give"), eyebrow: "Stewardship", title: "Help make care possible.", body: "Your support helps bring therapeutic programs to children and families, and brings them closer to brighter futures. A monthly gift of $100 helps provide therapy sessions, program support and essential care.", actions: btn("Give monthly", "/give?frequency=MONTH#gift") + tlink("Sponsorships", "/sponsorships") }) +
  section(split(
    sh({ eyebrow: "Stay connected", title: "Updates from Faith Reins", body: 'Request email updates about Faith Reins programs, events and stories. By selecting “Request updates,” you ask to receive these emails. Read our <a href="/privacy-policy">privacy policy</a>.' }),
    form("contact", { submit: "Request updates", success: "Thank you. We received your request for Faith Reins email updates.", purpose: "newsletter" })), { tone: "paper" }));

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
  section(sh({ eyebrow: "How to start", title: "From first call to first visit" }) + steps([["Ask questions", "Call, email or send a message."], ["Request a callback", "Leave your contact information, or send a provider referral."], ["Meet the team", "We will talk through next steps and scheduling."]])) +
  startCta());

/* ---------- Service detail pages ---------- */
const SPLIT_IMG = {
  "speech-language-therapy": ["home-clinical", "50% 50%"],
  "occupational-therapy": ["pasture-hero", "50% 60%"],
  "physical-therapy": ["hero-our-horses-desktop", "50% 50%"],
  counseling: ["hero-our-mission-desktop", "50% 50%"],
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
// EAL has its own participation journey; clinical payment/referral copy stays separate.
add("/equine-assisted-learning", "Equine-Assisted Learning", "Supervised, ground-based learning with horses to practice confidence, communication and life skills. A nonclinical program at Faith Reins.",
  hero({ key: "equine-assisted-learning", eyebrow: "Equine-Assisted Learning", title: "Learning through connection.", lead: "Supervised, ground-based experiences with horses to practice confidence, connection and life skills.", primary: APPT, secondary: ["Meet the herd", "/our-horses"] }) +
  section(split(
    sh({ eyebrow: "A nonclinical program", title: "Practice skills through connection", body: "Equine-assisted learning (EAL) is a learning program, not clinical therapy or a substitute for it. Our team guides participants through supervised activities with horses on the ground." }),
    checks([["Confidence", "Trying new things with support."], ["Trust", "Building a relationship with a calm partner."], ["Communication", "Clear, kind, non-verbal connection."], ["Responsibility", "Caring for another living being."], ["Regulation", "Practicing staying calm and present."], ["Resilience", "Keeping going after challenges."]], { cols: 2 }), { cols: "1fr 1.2fr" })) +
  splitFeature({ image: img("pasture-hero"), pos: "60% 60%", eyebrow: "Program fit", title: "Start with a conversation", body: "Request a callback to ask about current availability and whether EAL fits your goals. Our team will discuss participation needs and safety expectations before arranging a visit. Keep medical information out of public website forms.", actions: btn(...APPT) }) +
  section(sh({ eyebrow: "Participation & payment", title: "Before you arrange a visit" }) + infoGrid([
    { title: "Referral", body: "EAL does not require a physician referral. Clinical therapy has separate referral and treatment requirements." },
    { title: "Safety", body: "Activities are supervised and ground-based. Ask our team about participation requirements and the safety orientation." },
    { title: "Program costs", body: "Ask about EAL fees, payment arrangements and any available funding options before arranging a visit." },
  ], { cols: 3 }), { tone: "paper" }) +
  section(sh({ eyebrow: "What to expect", title: "The learning experience" }) + steps([["Arrival", "A warm welcome and time to settle."], ["Safety orientation", "Clear expectations around horses."], ["Guided activities", "Supervised, ground-based experiences."], ["Reflection", "Talking about what was learned."]])) +
  section(sh({ eyebrow: "Looking for clinical care?", title: "Explore our therapy services", body: "Speech-language therapy, occupational therapy, physical therapy and counseling have their own care pathways." }) + tlink("Services & programs", "/services-programs"), { tone: "sand", pad: "tight" }) +
  ctaBand({ title: "Talk with us about EAL.", body: "Ask about program fit, participation, availability and costs. Scheduling follows the conversation.", primary: APPT, secondary: ["Contact our team", "/contact"] }));

/* ---------- For Families ---------- */
add("/for-families", "For Families", "A guide to getting started, your first visit and family participation at Faith Reins.",
  hero({ key: "for-families", eyebrow: "For Families", title: "A clear first step. A caring team.", lead: "Know what to expect and connect with a team ready to walk alongside your family.", primary: APPT }) +
  section(sh({ eyebrow: "Getting started", title: "Your path to care", body: "You can contact us before you have every answer. Our team will discuss service fit, current availability and the requirements for beginning care." }) + steps([["Request a callback", "Leave your contact information and preferred way to reach you."], ["Talk with our team", "Discuss service interest, referrals, payment and next steps."], ["Prepare for your visit", "We explain scheduling and what to bring."], ["Begin together", "Your family takes part in the care-planning conversation."]]), { id: "getting-started" }) +
  section(split(sh({ eyebrow: "Your first visit", title: "What to expect", body: "A first conversation is a chance to ask questions and decide on next steps with our team." }),
    checks([["A welcoming conversation", "Discuss your questions and what your family hopes to find."], ["Clear preparation", "Confirm any referral, coverage or intake requirements with our team."], ["Family participation", "Ask how parents and caregivers take part in sessions and planning."], ["A suitable next step", "Discuss the services and availability that apply to your family."]])), { tone: "paper", id: "what-to-expect" }) +
  section(sh({ eyebrow: "Before care begins", title: "Find the answers you need." }) + infoGrid([
    { title: "Payment & insurance", body: "Questions about coverage, private pay or assistance.", link: ["Payment information", "/payment-and-insurance"] },
    { title: "Frequently asked questions", body: "Answers about getting started, sessions and equine programs.", link: ["Family FAQs", "/faq#getting-started"] },
    { title: "Meet our team", body: "Get to know the people behind the care.", link: ["Our team", "/our-team"] },
  ])) + ctaBand({ title: "Let’s talk about your next step.", body: "Request a callback and our team will follow up. Please keep medical details out of public website forms.", primary: APPT, secondary: ["Explore therapies", "/services-programs"] }));

/* ---------- Callback request: preserve the published route ---------- */
add("/book-online", "Request a Callback", "Request a callback from Faith Reins about services, availability and next steps.",
  hero({ key: "book-online", eyebrow: "Request a callback", title: "Let's find your next step.", lead: "Leave your contact information. Our team will follow up about availability and getting started." }) +
  section(notice("Use this public form for callback details only. Do not include diagnoses, treatment information, medical records or urgent concerns. For urgent help, contact the appropriate emergency service."), { pad: "tight" }) +
  section(split(panel(form("appointment", { submit: "Request a callback", success: "Thank you. Our team will contact you about your next steps.", layout: "two", purpose: "callback" })),
    stack(sh({ eyebrow: "What happens next", title: "A conversation comes first", size: "sm", body: "This is a callback request. Our team will confirm availability and the requirements for care before scheduling." }),
      steps([["We review your request", "A team member reads your callback details."], ["We contact you", "Using your preferred contact method."], ["We discuss next steps", "Including referrals, coverage and scheduling."]]), reach("Prefer to call?", TEL, { big: true })), { cols: "1.4fr 1fr" })));

/* ---------- Providers: assess first, then refer ---------- */
add("/for-referring-providers", "For Referring Providers", "Review service fit, care-team information, referral requirements and coordination at Faith Reins.",
  hero({ key: "for-referring-providers", eyebrow: "For Referring Providers", title: "A clear path from referral to care.", lead: "Review our approach, discuss patient fit and coordinate next steps with our team.", primary: ["Contact intake", "/contact#contact-intake"] }) +
  section(sh({ eyebrow: "Assess the practice", title: "Clinical approach & patient fit", body: "Faith Reins brings pediatric therapy disciplines and a separate equine-assisted learning program together in one setting. Review the service and team information, then contact intake to discuss the current clinicians, availability and fit for your patient." }) + infoGrid([
    { title: "Clinical services", body: "Speech-language therapy, occupational therapy, physical therapy and counseling each have their own service information.", link: ["Explore clinical services", "/services-programs"] },
    { title: "Care-team information", body: "Review published team information and ask intake about the clinician and qualifications relevant to a referral.", link: ["Meet our team", "/our-team#team-profiles"] },
    { title: "Equine learning", body: "EAL is a nonclinical, experiential program. It is not a substitute for clinical therapy.", link: ["Understand EAL", "/equine-assisted-learning"] },
  ]), { id: "clinical-approach" }) +
  section(sh({ eyebrow: "Referral requirements", title: "Coordinate the referral before care begins.", body: "Clinical services require physician approval and a treatment plan. Contact intake to confirm the documentation, service availability and any coverage-specific requirements. EAL does not require a clinical referral." }) +
    steps([["Discuss fit", "Connect with intake about the service and current availability."], ["Confirm requirements", "Agree which referral and clinical documents are needed."], ["Coordinate records", "Ask intake how to share records through the appropriate channel."], ["Connect the family", "Coordinate the first conversation and next steps."]]) +
    notice("Do not submit patient records, diagnoses or clinical details through public website forms. Contact intake to arrange the appropriate way to share referral information."), { tone: "paper", id: "referral-requirements" }) +
  section(split(sh({ eyebrow: "Care coordination", title: "Discuss how we can work together.", body: "With appropriate family consent, coordination can connect the referring provider, the care team and the family. Talk with intake about communication needs, the clinician responsible for care and the next step for your patient." }),
    checks(["Clarify the service and patient fit", "Confirm required approvals and documentation", "Discuss consent and communication preferences", "Agree how to share relevant records"])), { id: "care-coordination" }) +
  ctaBand({ title: "Connect with intake", body: "Ask about service fit, referral requirements and current availability.", primary: ["Contact intake", "/contact#contact-intake"], secondary: ["Provider FAQs", "/faq#for-providers"] }));

/* ---------- Payment ---------- */
add("/payment-and-insurance", "Payment & Insurance", "How to pay for Faith Reins therapy services — insurance, private pay, ARKids First, Medicaid, and financial assistance.",
  hero({ key: "payment-and-insurance", eyebrow: "Payment & Insurance", title: "Clear answers before care begins.", lead: "We want cost to be the last reason a family waits.", primary: ["Contact our team", "/contact"], secondary: APPT }) +
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
  ctaBand({ tone: "sand", title: "Questions about payment?", body: "Our team will walk through every option with you — no pressure, no obligation.", primary: ["Contact our team", "/contact"], secondary: APPT }));

/* ---------- FAQ ---------- */
const strip = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQ_GROUPS.flatMap(([, qs]) => qs).map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": strip(a) } })) };
add("/faq", "FAQ", "Common questions from families, referring providers and supporters of Faith Reins.",
  hero({ key: "faq", eyebrow: "FAQ", title: "A clear next step.", lead: "Common questions from families, providers and supporters.", primary: ["Contact our team", "/contact"] }) +
  `<div data-cms="faq">${faqBlock(fallback.faq)}</div>` +
  ctaBand({ title: "Still have questions?", body: "Our team is glad to help — no question is too small.", primary: ["Contact our team", "/contact"], secondary: APPT }),
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
    btn("Stewardship & reporting", "/impact-and-stewardship") + tlink("Our mission", "/our-mission")));
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
  ], { cols: 3 }), { id: "horse-care" }) +
  section(split(
    sh({ eyebrow: "Inquiry", title: "Discuss a sponsorship", body: "Tell us a little about your organization and where you would like to help. We will follow up." }),
    panel(form("sponsor", { submit: "Discuss a sponsorship", success: "Thank you. We will be in touch about sponsorship." }))), { tone: "paper", id: "inquiry" }) +
  ctaBand({ title: "More ways to help", primary: ["Give", "/give"], secondary: ["Impact & stewardship", "/impact-and-stewardship"] }));

/* ---------- Impact ---------- */
add("/impact-and-stewardship", "Impact & Stewardship", "Our stewardship commitments, intended uses of support and current reporting status. Contact Faith Reins with donor questions.",
  hero({ key: "impact-and-stewardship", eyebrow: "Impact & Stewardship", title: "Your generosity. A stronger community.", lead: "Our stewardship commitments and the purpose behind your support.", primary: ["Ask about stewardship", "#reporting"] }) +
  section(split(
    sh({ eyebrow: "Intended uses of support", title: "What your support can help build", body: "Our priorities are access to care, program development, horse care and the spaces where families and horses connect. Talk with us about how you would like your gift to support these priorities." }),
    checks([["Children and families", "Care that families can reach."], ["Programs", "Therapy, counseling and EAL."], ["Horses", "Daily care for our equine partners."], ["The place", "A calm, safe setting to grow."]]))) +
  section(sh({ eyebrow: "Stewardship principles", title: "What you can expect from us" }) + infoGrid([
    { title: "Transparency", body: "We explain how gifts are used.", strong: true },
    { title: "Responsible care", body: "Careful decisions with every dollar.", strong: true },
    { title: "Mission focus", body: "Children, families and horses first.", strong: true },
    { title: "Accountability", body: "We answer to those who give.", strong: true },
  ], { cols: 4 }), { tone: "paper" }) +
  section(sh({ eyebrow: "Reporting status · October 18, 2026", title: "Stewardship commitments and reporting", body: "This page describes our stewardship commitments. Verified program outcomes and a financial summary have not yet been published here." }) +
    `<p>For questions about the use of a gift, available financial information or reporting, ${MAIL} or <a href="/contact">contact our team</a>.</p>`, { id: "reporting" }) +
  ctaBand({ title: "Support the mission", body: "Talk with us about how you would like to help.", primary: ["Give", "/give"], secondary: ["Sponsorships", "/sponsorships"] }));

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
  section(sh({ eyebrow: "Community sponsorship", title: "Partners in the mission" }) + `<div data-cms="sponsors">${sponsorsBlock(fallback.sponsors)}</div>`, { tone: "paper" }) +
  ctaBand({ title: "Become a partner", body: "Together we can support more children and families.", primary: ["Contact us", "/contact"], secondary: ["Sponsorships", "/sponsorships"] }));

/* ---------- Team ---------- */
add("/our-team", "Our Team", "A dedicated team supporting children, families and our equine programs.",
  hero({ key: "our-team", eyebrow: "Our Team", title: "People who care. A purpose we share.", lead: "A dedicated team supporting children, families and our equine programs.", primary: APPT }) +
  section(sh({ eyebrow: "Clinical & program team", title: "Leadership & clinical team", body: "Our clinicians, staff and volunteers share one purpose: to support children and families with skill, patience and faith. Each person brings specialized training and a genuine commitment to the children and families we serve." }) +
    `<div data-cms="team">${teamBlock(fallback.team)}</div>`, { id: "team-profiles" }) +
  ctaBand({ tone: "sand", title: "We are hiring", body: "Join a clinical team doing meaningful work in South Arkansas. We have open positions and always want to meet great people.", primary: ["See open positions", "/join-our-team"], secondary: ["Contact us", "/contact"] }));

/* ---------- Horses ---------- */
add("/our-horses", "Our Horses", "Meet the equine partners at Faith Reins: big personalities and gentle connections.",
  hero({ key: "our-horses", eyebrow: "Our Horses", title: "Meet our equine partners.", lead: "Big personalities. Gentle connections.", primary: ["Sponsor a horse", "/sponsorships#horse-care"] }) +
  section(sh({ eyebrow: "The herd", title: "Calm partners in learning", body: "Horses give children a calm, honest partner. Our herd is selected and cared for with one question in mind: does this horse help a child feel safe enough to grow? Each one has a distinct personality, and part of the work is helping children and horses find their rhythm together." }) +
    `<div data-cms="horses">${horsesBlock(fallback.horses)}</div>`) +
  ctaBand({ title: "Learn through connection", body: "Equine-assisted learning offers supervised, ground-based experiences with our herd.", primary: ["Equine-assisted learning", "/equine-assisted-learning"], secondary: ["Services & programs", "/services-programs"] }));

/* ---------- Join ---------- */
add("/join-our-team", "Join Our Team", "Career and volunteer opportunities at Faith Reins Equestrian Center in Camden, Arkansas.",
  hero({ key: "join-our-team", eyebrow: "Join Our Team", title: "Bring your purpose to Faith Reins.", lead: "Build a career around meaningful work in a faith-rooted, team-driven setting in South Arkansas.", primary: ["See open positions", "#openings"], secondary: ["Volunteer with us", "/volunteer"] }) +
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
  section(sh({ eyebrow: "Volunteer", title: "Looking to volunteer?", body: "Explore roles, expectations and getting started in our dedicated volunteer guide." }) + btn("Volunteer with us", "/volunteer"), { id: "volunteer" }) +
  ctaBand({ tone: "sand", title: "Get to know us", body: "Meet the people behind the care and the mission that guides us.", primary: ["Meet the team", "/our-team"], secondary: ["Our mission", "/our-mission"] }));

/* ---------- Contact ---------- */
add("/contact", "Contact", "Connect with Faith Reins about services, giving or getting involved.",
  hero({ key: "contact", eyebrow: "Contact", title: "We're here to help.", lead: "Connect with our team about services, giving or getting involved." }) +
  section(infoGrid([
    { title: "Provider intake", body: "Ask about service fit and referral requirements. Please do not include patient records or medical details in this public form.", link: ["Call intake", "tel:" + SITE.tel], html: false },
    { title: "Volunteer inquiry", body: "Tell us your interests and availability. Our team will discuss current opportunities and next steps.", link: ["Volunteer guide", "/volunteer"] },
  ], { cols: 2 }) + '<span id="contact-intake"></span><span id="volunteer-inquiry"></span><span id="account-help"></span>', { pad: "tight" }) +
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
    { eyebrow: "Getting started", title: "Request a callback", body: "Our team will discuss availability and scheduling with you.", link: APPT },
    { eyebrow: "Referrals", title: "For providers", body: "A clear path from referral to care.", link: ["Learn more", "/for-referring-providers"] },
    { eyebrow: "Giving", title: "Support the mission", body: "One-time or monthly gifts.", link: ["Give", "/give"] },
    { eyebrow: "Sponsorships", title: "Partner with us", body: "Businesses and groups.", link: ["Learn more", "/sponsorships"] },
  ], { cols: 4 }), { pad: "tight" }));

/* ---------- Shop ---------- */
/* Product data and images are independent, committed website copies. */
const FILTERS = [["all", "All"], ["mens", "Men's"], ["womens", "Women's"], ["youth", "Youth"], ["layers", "Outerwear"], ["accessories", "Hats"], ["home", "Home & gifts"]];
add("/shop", "Shop", "Explore the Faith Reins collection: polos, layers, hoodies, caps, drinkware, journals and throws.",
  shopHero() +
  shopCategoryTiles() +
  section(`<div class="shop-bar">${sh({ eyebrow: PRODUCTS.length + " styles · " + PRODUCTS.reduce((count, product) => count + product.variants.length, 0) + " color & artwork options", title: "The collection", size: "sm" })}<div class="shop-filters" role="group" aria-label="Filter products">${FILTERS.map(([value, text]) => `<button class="shop-filter" type="button" data-filter="${value}" aria-pressed="${value === "all"}">${esc(text)}</button>`).join("")}</div></div>
<div class="merch-grid" id="merch-grid">${PRODUCTS.map(showcaseCard).join("")}</div>
<script>(function(){var buttons=[].slice.call(document.querySelectorAll('.shop-filter'));var cards=[].slice.call(document.querySelectorAll('#merch-grid .merch-card'));buttons.forEach(function(button){button.addEventListener('click',function(){buttons.forEach(function(other){other.setAttribute('aria-pressed',String(other===button))});cards.forEach(function(card){card.hidden=button.dataset.filter!=='all'&&card.dataset.group!==button.dataset.filter})})})})();</script>`, { id: "shop-products" }) +
  merchCorner() +
  section(sh({ eyebrow: "Size & fit", title: "A fit for your everyday.", size: "sm", body: "Explore size and format information on each product page. Final measurements and product details will be confirmed before ordering is available." }), { tone: "paper", id: "size-guide" }) +
  ctaBand({ tone: "sand", title: "A shared purpose.", body: "Help children and families grow through pediatric therapy and equine-assisted learning.", primary: ["Support Faith Reins", "/give"] }),
  undefined,
  { image: "https://www.faithreins.com/assets/shop/v7/barn-collection.webp", imageAlt: "Green hoodie, cream tee, cap and mug on a natural barn table", imageWidth: 2172, imageHeight: 724 });

// Legacy /shop/mens URLs are handled by permanent hosting redirects at release.
shopCategories.forEach(category => {
  const page = categoryPage(category);
  add(category.route, category.title, page.description, page.body, page.jsonld, page.seo);
});

PRODUCTS.forEach((product) => {
  const related = PRODUCTS.filter(other => other.slug !== product.slug && other.group === product.group)
    .concat(PRODUCTS.filter(other => other.slug !== product.slug && other.group !== product.group)).slice(0, 4);
  const showcase = productShowcase(product, related);
  add(`/shop/${product.slug}`, `${product.name} | Shop`, showcase.description, showcase.body, showcase.jsonld);
});

// Keep previously published product URLs useful without presenting unapproved
// legacy placeholder renders as members of the approved V7 collection.
LEGACY_PRODUCTS.filter(legacy => !PRODUCTS.some(product => product.slug === legacy.slug)).forEach(legacy => {
  const suggested = legacy.slug === 'youth-polo' ? PRODUCTS.filter(p => ['boys-polo','girls-polo'].includes(p.slug))
    : legacy.slug === 'childrens-hoodie' ? PRODUCTS.filter(p => ['boys-hoodie','girls-hoodie'].includes(p.slug))
    : PRODUCTS.slice(0, 4);
  add(`/shop/${legacy.slug}`, `${legacy.name} | Shop`, 'Explore the current Faith Reins collection.',
    titleBand({ eyebrow: 'Out of stock', title: esc(legacy.name), body: 'This style is not currently available. Explore the current collection below.' }) +
    section(`<div class="merch-grid">${suggested.map(showcaseCard).join('')}</div><p style="margin-top:32px"><a class="btn btn--secondary" href="/shop">Browse the collection</a></p>`));
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

// Audience and shared sitemap destinations; existing URLs remain in place.
registerPersonaPages(add);
