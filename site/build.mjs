// Generates the static site into site/dist from the page content below.
// Run: node site/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as L from "./lib.mjs";
const { hero, section, head, grid, card, steps, checks, faq, cta, split, notice, form, btn, link, icon, img, esc, page, CAMPAIGN } = L;

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "dist");
const pages = [];
const add = (route, title, description, body) => pages.push({ route, title: `${title} | Faith Reins`, description, body });

const APPT = ["Request an appointment", "/book-online"];
const startCta = (extra = []) =>
  cta({ h2: "Ready to take the next step?", p: "Send a request and our team will contact you about next steps and scheduling.", buttons: [btn(...APPT.slice(0, 1), APPT[1]), btn("Contact us", "/contact", "secondary"), ...extra] });
const related = (items) => section(head("Related services") + grid(items.length > 3 ? 4 : 3, items.map(([t, p, h]) => card({ title: t, text: p, href: h }))), "section--paper");

/* ---------- Home ---------- */
add("/", "Pediatric Therapy & Equine-Assisted Learning in South Arkansas", "Faith Reins offers pediatric therapy, counseling and equine-assisted learning for children and families in Camden and South Arkansas.",
  hero({ key: "home", h1: "People. Horses. Brighter futures.", body: "Pediatric therapy and equine-assisted learning for children and families in South Arkansas.", ctas: [["Start with our team", "/book-online", "light"], ["Support a family", "/give", "accent"]] }) +
  section(head("Care for every next step.", "Evidence-based pediatric therapy, counseling and equine-assisted learning for children and families in South Arkansas.") +
    grid(5, [
      card({ ic: "hand", title: "Occupational Therapy", text: "Skills for everyday life.", href: "/occupational-therapy", center: true }),
      card({ ic: "users", title: "Physical Therapy", text: "Movement with purpose.", href: "/physical-therapy", center: true }),
      card({ ic: "chat", title: "Speech-Language Therapy", text: "Helping every voice connect.", href: "/speech-language-therapy", center: true }),
      card({ ic: "heart", title: "Counseling", text: "A caring space to grow.", href: "/counseling", center: true }),
      card({ ic: "horse", title: "Equine-Assisted Learning (EAL)", text: "Learning through connection.", href: "/equine-assisted-learning", center: true }),
    ])) +
  section(split(`<div class="stack"><h2>Meet the people behind the care.</h2><p class="lead muted">Faith Reins pairs evidence-based care with the calm connection of horses to support children, teens and families.</p><div>${btn("Meet our team", "/our-team")}</div></div>`, img("home-clinical"), "A therapist working with a child"), "section--paper") +
  section(split(`<div class="stack"><h2>Stronger together.</h2><p class="lead muted">Community and clinical connections supporting South Arkansas.</p><div>${btn("Our partners", "/our-partners", "secondary")}</div></div>`, img("horse-biscuit"), "Biscuit, one of our horses", true)) +
  section(`<div class="center stack" style="justify-items:center"><h2>Rooted in faith. Guided by care.</h2><p class="lead muted">Helping children and families grow through care, connection and community.</p><div>${btn("Our mission", "/our-mission", "secondary")}</div></div>`, "section--paper") +
  section(cta({ h2: "Help make care possible.", p: "Support families, horses and the Faith Reins mission. A gift of $100 a month helps a family keep coming back.", buttons: [btn("Give monthly", "/give", "accent"), btn("Request an appointment", "/book-online", "light")], green: true })));

/* ---------- Mission ---------- */
add("/our-mission", "Our Mission", "Faith Reins is rooted in faith and guided by care, helping children and families grow through care, connection and community.",
  hero({ key: "our-mission", h1: "Rooted in faith. Guided by care.", body: "Helping children and families grow through care, connection and community.", ctas: [["Meet our team", "/our-team", "light"], ["Explore services", "/services-programs", "accent"]] }) +
  section(`<div class="prose"><h2>Why we exist</h2><p>We serve children and families with clinical care, trusted relationships and the steady presence of horses.</p><h2>Our faith foundation</h2><p>Faith Reins is a faith-rooted ministry of care. Compassion guides how we welcome every child and family.</p><h2>Our approach</h2><p>Each child is different. Our team builds individualized plans with families and pairs clinical expertise with the calm, relational setting horses provide.</p></div>`) +
  section(head("What guides our care") + grid(3, [
    card({ ic: "heart", title: "Faith-rooted compassion", text: "Every family is welcomed with dignity and care." }),
    card({ ic: "shield", title: "Clinical excellence", text: "Individualized, evidence-based care from qualified professionals." }),
    card({ ic: "users", title: "Family partnership", text: "Families are part of the team and part of every plan." }),
    card({ ic: "check", title: "Safety", text: "Supervision and thoughtful routines in every setting." }),
    card({ ic: "star", title: "Stewardship", text: "Gifts are used with care for children, families and horses." }),
  ]), "section--paper") +
  section(split(`<div class="stack"><h2>Why horses</h2><p class="lead muted">Horses offer a calm, relational environment where children can build confidence, trust and communication. Equine-assisted learning complements, and does not replace, clinical care.</p>${link("Our horses", "/our-horses")}</div>`, img("horse-captain-carrot"), "Captain Carrot, one of our horses")) +
  section(head("Where to next") + grid(4, [
    card({ title: "Services & Programs", text: "Therapy, counseling and EAL.", href: "/services-programs", linkLabel: "Explore" }),
    card({ title: "Our Team", text: "The people behind the care.", href: "/our-team", linkLabel: "Meet the team" }),
    card({ title: "Our Horses", text: "Meet our equine partners.", href: "/our-horses", linkLabel: "Meet the horses" }),
    card({ title: "Contact", text: "Questions? We are here.", href: "/contact", linkLabel: "Contact us" }),
  ]), "section--paper"));

/* ---------- Services hub ---------- */
const SVC = [
  ["Speech-Language Therapy", "Supporting speech, language and communication in everyday life.", "/speech-language-therapy", "chat"],
  ["Occupational Therapy", "Individualized support for daily routines, participation and independence.", "/occupational-therapy", "hand"],
  ["Physical Therapy", "Supporting mobility, strength and confidence through individualized care.", "/physical-therapy", "users"],
  ["Counseling", "A supportive place for emotional well-being and personal growth.", "/counseling", "heart"],
  ["Equine-Assisted Learning", "Ground-based experiences with horses supporting confidence, connection and life skills.", "/equine-assisted-learning", "horse"],
];
add("/services-programs", "Services & Programs", "Occupational therapy, physical therapy, speech-language therapy, counseling and equine-assisted learning in South Arkansas.",
  hero({ key: "services", h1: "Care for every next step.", body: "Occupational therapy, physical therapy, speech-language therapy, counseling and EAL.", ctas: [["Request an appointment", "/book-online", "light"], ["For families", "/for-families", "accent"]] }) +
  section(head("Individualized, family-centered care", "Every plan starts with your child and your family.") + grid(3, SVC.map(([t, p, h, ic]) => card({ ic, title: t, text: p, href: h })))) +
  section(head("How to start") + steps([["Ask questions", "Call, email or send a message."], ["Request an appointment", "Or send a provider referral."], ["Meet the team", "We will talk through next steps and scheduling."]]), "section--paper") +
  section(grid(2, [
    card({ ic: "home", title: "For families", text: "What to expect after you reach out.", href: "/for-families", linkLabel: "For families" }),
    card({ ic: "file", title: "For referring providers", text: "A clear path from referral to care.", href: "/for-referring-providers", linkLabel: "Referral pathway" }),
  ])) + section(startCta(), "section--paper"));

/* ---------- Service detail pages ---------- */
function service({ route, key, name, h1, body, overview, areasTitle, areas, journeyTitle, journey, relatedList }) {
  add(route, name, body,
    hero({ key, h1, body, ctas: [["Request an appointment", "/book-online", "light"]] }) +
    section(`<div class="prose"><h2>About ${esc(name.toLowerCase().replace("equine-assisted", "Equine-Assisted"))}</h2>${overview.map((p) => `<p>${p}</p>`).join("")}</div>`) +
    section(head(areasTitle) + grid(3, areas.map(([t, p]) => card({ title: t, text: p }))), "section--paper") +
    section(`<div class="split split--wide-text"><div class="stack"><h2>${esc(journeyTitle)}</h2></div><div>${steps(journey)}</div></div>`) +
    section(cta({ h2: "A clear first step.", p: "Send a request or talk with our team about coverage and next steps.", buttons: [btn("Request an appointment", "/book-online"), btn("Payment & Insurance", "/payment-and-insurance", "secondary"), btn("For families", "/for-families", "secondary")] }), "section--paper") +
    related(relatedList));
}
const SV = Object.fromEntries(SVC.map(([t, p, h]) => [h, [t, p, h]]));
const rel = (...hs) => hs.map((h) => SV[h]);
const J = (a, b, c, d) => [["Evaluation", a], ["Goal-setting", b], ["Sessions", c], ["Family carryover", d]];
service({ route: "/speech-language-therapy", key: "speech-language-therapy", name: "Speech-Language Therapy", h1: "Helping every voice connect.", body: "Supporting speech, language and communication in everyday life.",
  overview: ["Speech-language therapy helps children understand, express and connect through communication.", "Our therapists work with your child and family to build skills that matter at home, at school and in the community."],
  areasTitle: "What we support", areas: [["Communication", "Expressing needs, wants and ideas."], ["Language", "Understanding and using words and sentences."], ["Feeding", "Support for safe, comfortable mealtimes."], ["Social interaction", "Back-and-forth connection with others."], ["Confidence", "Feeling heard and understood."]],
  journeyTitle: "What sessions may include", journey: J("We learn about your child and your family's goals.", "Together we set clear, meaningful goals.", "Play-based and purposeful activities.", "Practical ideas to use between sessions."),
  relatedList: rel("/occupational-therapy", "/physical-therapy", "/counseling", "/equine-assisted-learning") });
service({ route: "/occupational-therapy", key: "occupational-therapy", name: "Occupational Therapy", h1: "Skills for everyday life.", body: "Individualized support for daily routines, participation and independence.",
  overview: ["Occupational therapy helps children take part in the everyday activities that fill their day.", "We focus on what matters most to your child and family, with warm, individualized care."],
  areasTitle: "Skill areas", areas: [["Daily living", "Dressing, eating and self-care routines."], ["Sensory support", "Strategies for comfort and regulation."], ["Fine motor skills", "Hand skills for play and school."], ["Motor planning", "Planning and sequencing movement."], ["Play and school routines", "Participation at home and in class."]],
  journeyTitle: "Our care approach", journey: J("We observe and listen to understand your child's strengths.", "Individualized goals built with your family.", "Hands-on, engaging activities.", "Simple tools for home and school."),
  relatedList: rel("/speech-language-therapy", "/physical-therapy", "/counseling") });
service({ route: "/physical-therapy", key: "physical-therapy", name: "Physical Therapy", h1: "Movement with purpose.", body: "Supporting mobility, strength and confidence through individualized care.",
  overview: ["Pediatric physical therapy supports children as they move, grow and gain independence.", "We explain each step in plain language and celebrate progress with your family."],
  areasTitle: "Focus areas", areas: [["Mobility", "Moving safely and with confidence."], ["Strength", "Building strength for daily activity."], ["Coordination", "Smoother, more confident movement."], ["Balance", "Stability for play and daily life."], ["Endurance", "Energy for the day ahead."], ["Family goals", "Plans shaped around your priorities."]],
  journeyTitle: "The care journey", journey: J("A thorough look at how your child moves.", "Goals that reflect real life.", "Active, motivating sessions.", "A home program that fits your routine."),
  relatedList: rel("/occupational-therapy", "/speech-language-therapy", "/equine-assisted-learning") });
service({ route: "/counseling", key: "counseling", name: "Counseling", h1: "A caring space to grow.", body: "A supportive place for emotional well-being and personal growth.",
  overview: ["Counseling offers children, teens and families a calm, supportive place to talk, learn and grow.", "We work in partnership with parents and caregivers."],
  areasTitle: "Areas of support", areas: [["Child counseling", "Age-appropriate, gentle support."], ["Teen support", "A steady place for growing minds."], ["Family support", "Strengthening communication at home."], ["Anxiety and stress", "Tools for big feelings."], ["Behavior", "Understanding and supporting change."], ["Trauma-informed care", "Safe, patient and respectful."]],
  journeyTitle: "What to expect", journey: [["Intake", "We learn about your child and family."], ["Goals", "Together we set clear goals."], ["Session rhythm", "A steady, predictable schedule."], ["Privacy and fit", "We talk openly about privacy and whether we are the right fit."]],
  relatedList: rel("/occupational-therapy", "/speech-language-therapy", "/equine-assisted-learning") });
service({ route: "/equine-assisted-learning", key: "equine-assisted-learning", name: "Equine-Assisted Learning", h1: "Learning through connection.", body: "Ground-based experiences with horses supporting confidence, connection and life skills.",
  overview: ["Equine-assisted learning (EAL) offers ground-based experiences with horses, guided by our team.", "These learning experiences are not a substitute for clinical therapy, and activities are always supervised."],
  areasTitle: "What participants practice", areas: [["Confidence", "Trying new things with support."], ["Trust", "Building relationship with a calm partner."], ["Communication", "Clear, kind, non-verbal connection."], ["Responsibility", "Caring for another living being."], ["Regulation", "Staying calm and present."], ["Resilience", "Keeping going after challenges."]],
  journeyTitle: "What to expect", journey: [["Arrival", "A warm welcome and time to settle."], ["Safety orientation", "Clear expectations around horses."], ["Guided activities", "Supervised, ground-based experiences."], ["Reflection", "Talking about what was learned."]],
  relatedList: [["Our Horses", "Meet Biscuit, Captain Carrot, Maple and Cowboy.", "/our-horses"], SV["/services-programs"] ? ["Services & Programs", "All of our care in one place.", "/services-programs"] : null, ["Contact", "Ask about EAL.", "/contact"]].filter(Boolean) });

/* ---------- For Families ---------- */
add("/for-families", "For Families", "What happens after you request an appointment at Faith Reins: a clear first step and a caring team.",
  hero({ key: "for-families", h1: "A clear first step. A caring team.", body: "Explore services and learn what happens after you request an appointment.", ctas: [["Request an appointment", "/book-online", "light"], ["Contact us", "/contact", "accent"]] }) +
  section(head("Your path to care") + grid(4, [["Reach out", "Send a request or call our team."], ["Share needs or a referral", "Tell us about your child and goals."], ["Schedule a visit", "We find a time that works."], ["Begin a plan", "Your care plan starts with your family."]].map(([t, p], i) => `<div class="card"><span class="step__num">${i + 1}</span><h3>${t}</h3><p>${p}</p></div>`))) +
  section(head("What to expect") + checks([["The first conversation", "We listen and answer your questions."], ["Preparing for your visit", "We share what to bring and who to expect."], ["Arrival", "A welcoming, calm space."], ["Family involvement", "You are part of every step."]]), "section--paper") +
  section(head("Helpful links") + grid(4, [card({ title: "Book Online", text: "Request an appointment.", href: "/book-online", linkLabel: "Request" }), card({ title: "Payment & Insurance", text: "Coverage and payment questions.", href: "/payment-and-insurance", linkLabel: "Learn more" }), card({ title: "FAQ", text: "Answers to common questions.", href: "/faq", linkLabel: "Read FAQ" }), card({ title: "Services & Programs", text: "See all of our care.", href: "/services-programs", linkLabel: "Explore" })])) +
  section(cta({ h2: "Questions? We are glad to help.", buttons: [btn("Request an appointment", "/book-online"), btn("Contact", "/contact", "secondary")] }), "section--paper"));

/* ---------- Book Online ---------- */
add("/book-online", "Request an Appointment", "Send an appointment request to Faith Reins. Our team will contact you about next steps and scheduling.",
  hero({ key: "book-online", h1: "Let's find your next step.", body: "Send a request. Our team will contact you about next steps and scheduling.", short: true }) +
  section(`<div class="split split--wide-text" style="align-items:start"><div class="stack"><h2>Request an appointment</h2><p class="muted">Please do not include urgent or emergency information in this form. If this is an emergency, call 911.</p><h3 class="h-small mt-28">What happens next</h3>${steps([["We review your request", "A team member reads every message."], ["We contact you", "By your preferred method."], ["We plan next steps", "Scheduling and what to bring."]], true)}</div><div class="panel">${form("appointment", { submit: "Submit request", success: "Thank you. Our team will contact you about next steps and scheduling.", layout: "two", wide: "service_interest_wmc0m7,message_nq34a3,preferred_contact_method_hzj8eh" })}</div></div>`) +
  section(grid(3, [card({ title: "Contact", text: "Prefer to talk it through?", href: "/contact", linkLabel: "Contact us" }), card({ title: "FAQ", text: "Common questions answered.", href: "/faq", linkLabel: "Read FAQ" }), card({ title: "Payment & Insurance", text: "Coverage and payment.", href: "/payment-and-insurance", linkLabel: "Learn more" })]), "section--paper"));

/* ---------- Providers ---------- */
add("/for-referring-providers", "For Referring Providers", "A clear path from referral to care. Connect children and families with the right next step at Faith Reins.",
  hero({ key: "for-referring-providers", h1: "A clear path from referral to care.", body: "Connect children and families with the right next step.", ctas: [["Contact intake", "/contact", "light"]] }) +
  section(head("Referral pathway") + grid(4, [["Identify the need", "Recognize a child who may benefit."], ["Send a referral", "Contact our intake team."], ["Coordinate records", "We confirm what is needed."], ["Family scheduling", "We reach out to the family."]].map(([t, p], i) => `<div class="card"><span class="step__num">${i + 1}</span><h3>${t}</h3><p>${p}</p></div>`))) +
  section(head("Service fit") + grid(3, SVC.map(([t, p, h]) => card({ title: t, text: p, href: h }))), "section--paper") +
  section(`<div class="split"><div class="stack"><h2>Helpful information to share</h2><p class="muted">Where available, a brief referral note, relevant evaluations, the child's age and the family's contact details help us move quickly. We will tell you if anything else is needed.</p></div>${checks([["Reason for referral", ""], ["Relevant evaluations or notes", ""], ["Family contact details", ""], ["Preferred service", ""]])}</div>`) +
  section(cta({ h2: "Provider contact", p: "Reach our intake team through the contact page.", buttons: [btn("Contact intake", "/contact"), btn("For families", "/for-families", "secondary")] }), "section--paper"));

/* ---------- Payment ---------- */
add("/payment-and-insurance", "Payment & Insurance", "Clear answers before care begins. Start a conversation with Faith Reins about coverage, payment and next steps.",
  hero({ key: "payment-and-insurance", h1: "Clear answers before care begins.", body: "Start a conversation about coverage, payment and next steps.", ctas: [["Contact our team", "/contact", "light"]] }) +
  section(`<div class="prose"><h2>Payment overview</h2><p>Payment and coverage details vary by service and family. Please contact our team for specifics, and we will walk through your options with you.</p></div>`) +
  section(head("Common paths") + grid(4, [card({ ic: "shield", title: "Coverage questions", text: "Ask whether your plan may apply." }), card({ ic: "heart", title: "Private pay", text: "Talk with us about options." }), card({ ic: "file", title: "Referrals and documentation", text: "What providers can share." }), card({ ic: "clock", title: "Scheduling questions", text: "How payment fits with scheduling." })]), "section--paper") +
  section(`<div class="split"><div class="stack"><h2>What to have ready</h2><p class="muted">These make a first conversation smoother. None are required to reach out.</p></div>${checks([["Insurance card", "If you have coverage."], ["Referral or provider notes", "If applicable."], ["Child and family contact details", ""]])}</div>`) +
  section(notice("We do not guarantee coverage or specific costs on this page. Our team will confirm details with you.") + `<div class="mt-28">${cta({ h2: "Questions about payment?", buttons: [btn("Contact our team", "/contact"), btn("Request an appointment", "/book-online", "secondary")] })}</div>`, "section--paper"));

/* ---------- FAQ ---------- */
add("/faq", "FAQ", "Answers for families, referring providers and supporters of Faith Reins.",
  hero({ key: "faq", h1: "A clear next step.", body: "Answers for families, referring providers and supporters.", ctas: [["Contact our team", "/contact", "light"]] }) +
  section(grid(2, [
    `<div class="faq-group"><h2 class="h-card">Getting started</h2>${faq([["How do I get started?", "Send an appointment request on <a href='/book-online'>Book Online</a> or <a href='/contact'>contact us</a>."], ["Do I need a referral?", "Please contact our team about your situation. We will guide you."], ["Who can Faith Reins help?", "We serve children, teens and families in South Arkansas."]])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Services</h2>${faq([["What services do you offer?", "Occupational, physical and speech-language therapy, counseling and equine-assisted learning. See <a href='/services-programs'>Services &amp; Programs</a>."], ["Can my child receive more than one service?", "Often yes. Our team will help you find the right combination."]])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Insurance &amp; payment</h2>${faq([["Do you accept insurance?", "Coverage varies. Please see <a href='/payment-and-insurance'>Payment &amp; Insurance</a> or contact our team."]])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Equine programs</h2>${faq([["Is equine-assisted learning safe?", "Activities are ground-based and supervised, with a safety orientation."], ["Is EAL the same as therapy?", "No. EAL is a learning experience that complements clinical care."]])}</div>`,
  ])) +
  section(cta({ h2: "Still have questions?", buttons: [btn("Contact our team", "/contact"), btn("Request an appointment", "/book-online", "secondary")] }), "section--paper"));

/* ---------- Give ---------- */
add("/give", "Give", "Support families, horses and the Faith Reins mission with a one-time or monthly gift.",
  hero({ key: "give", h1: "Help make care possible.", body: "Support families, horses and the Faith Reins mission.", ctas: [["Give now", "#gift", "accent"], ["View impact", "/impact-and-stewardship", "light"]] }) +
  `<section class="section" id="gift"><div class="container"><div class="split split--wide-text" style="align-items:start"><div class="stack"><h2>Choose your gift</h2><p class="lead muted">Your gift helps children and families reach care, and helps us care for our horses.</p></div><div class="panel"><div data-give data-campaign="${CAMPAIGN}"><noscript>Please enable JavaScript to give online, or contact us.</noscript></div></div></div></div></section>` +
  section(head("Other ways to give") + grid(3, [card({ ic: "horse", title: "Sponsor a horse", text: "Monthly sponsorship of $500–$750 supports a horse's care.", href: "/sponsorships", linkLabel: "Discuss sponsorship" }), card({ ic: "heart", title: "Give where needed most", text: "Unrestricted gifts go where families and programs need them." }), card({ ic: "chat", title: "Questions about giving", text: "We are happy to help.", href: "/contact", linkLabel: "Contact us" })]), "section--paper") +
  section(cta({ h2: "Our promise", p: "We use every gift with care. Learn how support and the mission connect.", buttons: [btn("Impact & Stewardship", "/impact-and-stewardship", "secondary"), btn("Our partners", "/our-partners", "secondary")] })));
add("/give/thank-you", "Thank You", "Thank you for supporting Faith Reins.", `<section class="section"><div class="container center stack" style="justify-items:center"><h1>Thank you.</h1><p class="lead muted">Your gift helps children and families reach care. We are grateful.</p><div class="btn-row">${btn("Back to home", "/")}${btn("Our impact", "/impact-and-stewardship", "secondary")}</div></div></section>`);

/* ---------- Sponsorships ---------- */
add("/sponsorships", "Sponsorships", "A partnership with purpose. Support people, horses and the places where connection grows.",
  hero({ key: "sponsorships", h1: "A partnership with purpose.", body: "Support people, horses and the places where connection grows.", ctas: [["Discuss sponsorship", "#inquiry", "light"]] }) +
  section(head("Why sponsor", "Sponsors help us care for children, families and horses, and take part in the life of the community.") + grid(3, [card({ ic: "horse", title: "Sponsor a horse", text: "Monthly support of $500–$750 helps care for a horse." }), card({ ic: "home", title: "Programs and facilities", text: "Support the arena, facilities and operations." }), card({ ic: "users", title: "Family access", text: "Help more families reach care." })])) +
  `<section class="section section--paper" id="inquiry"><div class="container"><div class="split" style="align-items:start"><div class="stack"><h2>Discuss a sponsorship</h2><p class="muted">Tell us a little about your organization and where you would like to help. We will follow up.</p></div><div class="panel">${form("sponsor", { submit: "Discuss a sponsorship", success: "Thank you. We will be in touch about sponsorship." })}</div></div></div></section>` +
  section(cta({ h2: "More ways to help", buttons: [btn("Give", "/give"), btn("Impact & Stewardship", "/impact-and-stewardship", "secondary")] })));

/* ---------- Impact ---------- */
add("/impact-and-stewardship", "Impact & Stewardship", "Your generosity, a stronger community. See how support and the mission connect.",
  hero({ key: "impact-and-stewardship", h1: "Your generosity. A stronger community.", body: "See how support and the mission connect.", ctas: [["Explore giving", "/give", "accent"]] }) +
  section(head("How support helps", "Gifts help children and families reach care and help us care for the horses at the heart of our programs.") + grid(4, [card({ ic: "users", title: "Children and families", text: "Care that families can reach." }), card({ ic: "star", title: "Programs", text: "Therapy, counseling and EAL." }), card({ ic: "horse", title: "Horses", text: "Daily care for our equine partners." }), card({ ic: "home", title: "The place", text: "A calm, safe setting to grow." })])) +
  section(head("Stewardship principles") + grid(4, [card({ title: "Transparency", text: "We explain how gifts are used." }), card({ title: "Responsible care", text: "Careful decisions with every dollar." }), card({ title: "Mission focus", text: "Children, families and horses first." }), card({ title: "Accountability", text: "We answer to those who give." })]), "section--paper") +
  section(cta({ h2: "Join us", buttons: [btn("Give", "/give"), btn("Sponsorships", "/sponsorships", "secondary")] })));

/* ---------- Partners ---------- */
add("/our-partners", "Our Partners", "Community and clinical connections supporting South Arkansas.",
  hero({ key: "our-partners", h1: "Stronger together.", body: "Community and clinical connections supporting South Arkansas.", ctas: [["Become a partner", "/contact", "light"]] }) +
  section(head("Who we work with") + grid(5, [card({ ic: "home", title: "Families", text: "Our reason for being." }), card({ ic: "file", title: "Providers", text: "Referring professionals." }), card({ ic: "heart", title: "Donors", text: "Supporters who give." }), card({ ic: "users", title: "Community organizations", text: "Neighbors in service." }), card({ ic: "star", title: "Sponsors", text: "Businesses and groups." })])) +
  section(`<div class="center stack" style="justify-items:center"><div class="pending">Partner logos will appear here once approved.</div>${cta({ h2: "Become a partner", p: "Together we can support more children and families.", buttons: [btn("Contact us", "/contact"), btn("Sponsorships", "/sponsorships", "secondary")] })}</div>`, "section--paper"));

/* ---------- Team ---------- */
add("/our-team", "Our Team", "A dedicated team supporting children, families and our equine programs.",
  hero({ key: "our-team", h1: "People who care. A purpose we share.", body: "A dedicated team supporting children, families and our equine programs.", ctas: [["Request an appointment", "/book-online", "light"]] }) +
  section(`<div class="prose"><h2>Our team</h2><p>Our clinicians, staff and volunteers share one purpose: to support children and families with skill, patience and faith.</p></div>`) +
  `<section class="section section--paper" id="team-profiles"><div class="container">${head("Leadership") + grid(3, [`<div class="card"><h3>Donna Horton</h3><p>Founder</p></div>`])}<p class="muted mt-28">More team profiles are coming soon.</p></div></section>` +
  section(cta({ h2: "Join our team", p: "Explore career and volunteer opportunities.", buttons: [btn("Explore opportunities", "/join-our-team"), btn("Contact", "/contact", "secondary")] })));

/* ---------- Horses ---------- */
const HORSES = [["Biscuit", "horse-biscuit"], ["Captain Carrot", "horse-captain-carrot"], ["Maple", "horse-maple"], ["Cowboy", "horse-cowboy"]];
add("/our-horses", "Our Horses", "Meet the equine partners at Faith Reins: big personalities and gentle connections.",
  hero({ key: "our-horses", h1: "Meet our equine partners.", body: "Big personalities. Gentle connections.", ctas: [["Support", "/give", "accent"]] }) +
  section(`<div class="prose"><h2>Calm partners in learning</h2><p>Horses give children a calm, honest partner. Our herd helps create the safe, relational setting where confidence and connection can grow.</p></div>`) +
  section(grid(4, HORSES.map(([n, k]) => `<div class="media-card"><img src="${img(k)}" alt="${n}" loading="lazy"><h3 class="h-small">${n}</h3>${n === "Cowboy" ? "<p>Support provided by the McTigrit Family.</p>" : ""}</div>`)), "section--paper") +
  section(cta({ h2: "Learn through connection", buttons: [btn("Equine-Assisted Learning", "/equine-assisted-learning"), btn("Services & Programs", "/services-programs", "secondary"), btn("Contact", "/contact", "secondary")] })));

/* ---------- Join ---------- */
add("/join-our-team", "Join Our Team", "Explore career and volunteer opportunities supporting the Faith Reins mission.",
  hero({ key: "join-our-team", h1: "Bring your purpose to Faith Reins.", body: "Explore career and volunteer opportunities supporting the mission.", ctas: [["Explore opportunities", "/contact", "light"]] }) +
  section(head("Why work here") + grid(4, [card({ ic: "heart", title: "Mission", text: "Work that matters." }), card({ ic: "users", title: "Collaboration", text: "A team that supports each other." }), card({ ic: "home", title: "Family-centered care", text: "Families at the center." }), card({ ic: "horse", title: "A peaceful setting", text: "Care alongside horses." })])) +
  section(head("Roles") + `<p class="center muted">We welcome interest in clinical, support and volunteer roles. Specific openings will be listed here when available.</p>` + `<div class="center mt-28">${btn("Express interest", "/contact")}</div>`, "section--paper") +
  section(grid(2, [card({ title: "Our Team", text: "Meet the people behind the care.", href: "/our-team", linkLabel: "Our team" }), card({ title: "Our Mission", text: "Rooted in faith. Guided by care.", href: "/our-mission", linkLabel: "Our mission" })])));

/* ---------- Contact ---------- */
add("/contact", "Contact", "Connect with Faith Reins about services, giving or getting involved.",
  hero({ key: "contact", h1: "We're here to help.", body: "Connect with our team about services, giving or getting involved.", short: true }) +
  section(`<div class="split" style="align-items:start"><div class="stack"><h2>Get in touch</h2><address style="font-style:normal;display:grid;gap:8px"><span>[Phone number]</span><span>[Email address]</span><span>[Street address]</span><span>Camden, AR</span><span>[Office hours]</span></address><p class="form-note">Please do not include medical information in messages.</p></div><div class="panel">${form("contact", { submit: "Send message", success: "Thank you. We received your message." })}</div></div>`) +
  section(head("Quick paths") + grid(4, [card({ title: "Appointments", text: "Book online.", href: "/book-online", linkLabel: "Request" }), card({ title: "Referrals", text: "For providers.", href: "/for-referring-providers", linkLabel: "Learn more" }), card({ title: "Giving", text: "Support the mission.", href: "/give", linkLabel: "Give" }), card({ title: "Sponsorships", text: "Partner with us.", href: "/sponsorships", linkLabel: "Learn more" })]), "section--paper"));

/* ---------- Shop ---------- */
const MERCH = [["Heritage Hoodie", "merch-men-hoodie"], ["Women's Hoodie", "merch-women-hoodie"], ["Children's Hoodie", "merch-children-hoodie"], ["Crewneck", "merch-crewneck"], ["Long Sleeve", "merch-long-sleeve"], ["Men's Tee", "merch-men-tee"], ["Women's Tee", "merch-women-tee"], ["Children's Tee", "merch-children-tee"], ["Men's Polo", "merch-men-polo"], ["Women's Polo", "merch-women-polo"], ["Youth Polo", "merch-youth-polo"], ["Caps", "merch-caps"], ["Beanie", "merch-beanie"], ["Coffee Mug", "merch-mug"], ["Travel Mug", "merch-travel-mug"], ["Keychains", "merch-keychains"], ["Stickers", "merch-stickers"]];
add("/shop", "Shop", "Faith Reins merchandise supports awareness and mission connection.",
  hero({ key: "shop", h1: "Wear the mission.", body: "Merchandise that connects you to Faith Reins.", short: true }) +
  `<section class="section" id="shop-products"><div class="container">${head("Merchandise", "Online ordering is coming soon. For now, please give or contact us with merchandise questions.")}${grid(4, MERCH.map(([n, k]) => `<div class="media-card media-card--square"><img src="${img(k)}" alt="${n}" loading="lazy"><h3 class="h-small">${n}</h3></div>`))}</div></section>` +
  section(cta({ h2: "Giving is the strongest way to help.", buttons: [btn("Donate", "/give"), btn("Contact us", "/contact", "secondary")] }), "section--paper"));

/* ---------- Legal ---------- */
for (const [route, t] of [["/privacy-policy", "Privacy Policy"], ["/accessibility", "Accessibility"], ["/donation-policy", "Donation Policy"]])
  add(route, t, `${t} for Faith Reins.`, `<section class="section"><div class="container"><div class="prose"><h1>${t}</h1><p class="pending">This page is awaiting final approved policy text from Faith Reins.</p><p>Questions? <a href="/contact">Contact us</a>.</p></div></div></section>`);

/* ---------- Write ---------- */
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(here, "public"), dist, { recursive: true });
for (const p of pages) {
  const out = p.route === "/" ? path.join(dist, "index.html") : path.join(dist, p.route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(p));
}
console.log(`built ${pages.length} pages`);
