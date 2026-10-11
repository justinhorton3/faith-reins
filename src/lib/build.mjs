// Page content registry — exports `pages` array consumed by Astro's [...slug].astro.
import * as L from "./lib.mjs";
const { hero, section, head, grid, card, steps, checks, faq, cta, split, notice, form, btn, link, icon, img, esc, CAMPAIGN } = L;

const pages = [];
const add = (route, title, description, body) => pages.push({ route, title: `${title} | Faith Reins`, description, body });

const APPT = ["Request an appointment", "/book-online"];
const startCta = (extra = []) =>
  cta({ h2: "Ready to take the next step?", p: "Send a request and our team will contact you about next steps and scheduling.", buttons: [btn(...APPT.slice(0, 1), APPT[1]), btn("Contact us", "/contact", "secondary"), ...extra] });
const related = (items) => section(head("Related services") + grid(items.length > 3 ? 4 : 3, items.map(([t, p, h]) => card({ title: t, text: p, href: h }))), "section--paper");

/* ---------- Home ---------- */
add("/", "Pediatric Therapy & Equine-Assisted Learning in South Arkansas", "Faith Reins offers pediatric therapy, counseling and equine-assisted learning for children and families in Camden and South Arkansas.",
  hero({ key: "home", h1: "People. Horses. Brighter futures.", body: "Expert pediatric therapy and equine-assisted learning to help your child grow, heal and thrive in South Arkansas.", ctas: [["Request a consultation", "/book-online", "light"], ["Support a family", "/give", "accent"]] }) +
  section(head("Services & Programs") +
    grid(5, [
      card({ ic: "leaf", title: "Occupational Therapy", text: "Supporting daily activities, participation and independence.", href: "/occupational-therapy", center: true }),
      card({ ic: "walk", title: "Physical Therapy", text: "Building mobility, strength and balance.", href: "/physical-therapy", center: true }),
      card({ ic: "chat", title: "Speech-Language Therapy", text: "Supporting speech, language and communication.", href: "/speech-language-therapy", center: true }),
      card({ ic: "heart", title: "Counseling", text: "Supporting emotional well-being and coping skills.", href: "/counseling", center: true }),
      card({ ic: "horse", title: "Equine-Assisted Learning (EAL)", text: "Experiential learning with horses to build confidence, connection and life skills.", href: "/equine-assisted-learning", center: true }),
    ])) +
  `<section class="section section--paper"><div class="container"><div class="home-quad"><img src="${img("home-team")}" alt="Faith Reins care team" loading="lazy"><div class="stack"><h2>Meet the people behind the care.</h2><p class="lead muted">A dedicated team of professionals, horse handlers and volunteers committed to brighter futures.</p><div>${link("Meet our team →", "/our-team")}</div></div><img src="${img("farm-exterior")}" alt="Faith Reins equestrian facility" loading="lazy"><div class="stack"><h2>Stronger together.</h2><p class="lead muted">Community partners help expand access and create opportunities for more families in South Arkansas.</p><div>${link("Our partners →", "/our-partners")}</div></div></div></div></section>` +
  `<section class="faith-giving"><div class="container"><div class="faith-giving__grid"><div class="faith-giving__left"><h2>Rooted in faith.<br>Guided by care.</h2><p class="lead muted">Faith Reins Equestrian Center exists to provide pediatric therapy and equine-assisted learning services that inspire growth, healing and hope for children and families in South Arkansas.</p><div>${btn("Our mission", "/our-mission", "secondary")}</div></div><div class="faith-giving__center"><img src="${img("pasture-hero")}" alt="Faith Reins farm" loading="lazy"></div><div class="faith-giving__right"><h2>Help make care possible.</h2><p class="lead muted">Your support helps bring therapeutic programs and children and families closer to brighter futures.</p><div class="faith-giving__price"><div class="faith-giving__price-num">$100<span>/month</span></div><div class="faith-giving__price-desc">Helps provide therapy sessions, program support, and essential care.</div></div><div>${btn("Give monthly ♡", "/give")}</div></div></div></div></section>` +
  `<section class="section"><div class="container">
<div class="section-head"><h2>What families say</h2></div>
<div class="grid grid--3">
  <blockquote class="testimonial"><p class="testimonial__quote">"We had tried everything before coming to Faith Reins. Within a few months our son was communicating in ways we had never seen. The team here changed our family."</p><footer class="testimonial__attr">— A Camden family</footer></blockquote>
  <blockquote class="testimonial"><p class="testimonial__quote">"Watching my daughter walk up to Jesse for the first time and not flinch — that moment alone was worth everything. She is a different kid on the days she has EAL."</p><footer class="testimonial__attr">— Parent of a 9-year-old</footer></blockquote>
  <blockquote class="testimonial"><p class="testimonial__quote">"The therapists here actually listen. They adjusted the plan when something wasn't working and explained every step. I finally feel like we have a real team on our side."</p><footer class="testimonial__attr">— Mother of a 5-year-old</footer></blockquote>
</div>
<style>
.testimonial{background:var(--color-paper,#f7f5f0);border-radius:10px;padding:1.75rem;margin:0;display:flex;flex-direction:column;gap:1rem}
.testimonial__quote{font-family:'Noto Serif',serif;font-size:1rem;line-height:1.7;color:#2a2520;margin:0;font-style:italic}
.testimonial__attr{font-size:.85rem;color:#888;margin:0;font-style:normal}
</style>
</div></section>` +
  section(`<div class="newsletter-band"><div class="newsletter-band__copy"><h2>Stay connected.</h2><p class="lead muted">Get updates on programs, events, and stories from Faith Reins delivered to your inbox.</p></div><div class="newsletter-band__form">${form("contact", { submit: "Subscribe", success: "Thank you — we will be in touch.", layout: "inline", btnKind: "accent" })}<p class="form-note">We respect your privacy. Unsubscribe any time.</p></div></div><style>.newsletter-band{display:flex;gap:2.5rem;align-items:flex-start;flex-wrap:wrap}.newsletter-band__copy{flex:1 1 260px}.newsletter-band__form{flex:2 1 320px}</style>`, "section--paper"));

/* ---------- Mission ---------- */
add("/our-mission", "Our Mission", "Faith Reins is rooted in faith and guided by care, helping children and families grow through care, connection and community.",
  hero({ key: "our-mission", h1: "Rooted in faith. Guided by care.", body: "Helping children and families grow through care, connection and community.", ctas: [["Meet our team", "/our-team", "light"], ["Explore services", "/services-programs", "secondary"]] }) +
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
  hero({ key: "services", h1: "Care for every next step.", body: "Occupational therapy, physical therapy, speech-language therapy, counseling and EAL.", ctas: [["Request an appointment", "/book-online", "light"], ["For families", "/for-families", "secondary"]] }) +
  section(head("Individualized, family-centered care", "Every plan starts with your child and your family.") + grid(5, SVC.map(([t, p, h, ic]) => card({ ic, title: t, text: p, href: h })))) +
  section(head("How to start") + steps([["Ask questions", "Call, email or send a message."], ["Request an appointment", "Or send a provider referral."], ["Meet the team", "We will talk through next steps and scheduling."]]), "section--paper") +
  section(grid(2, [
    card({ ic: "home", title: "For families", text: "What to expect after you reach out.", href: "/for-families", linkLabel: "For families" }),
    card({ ic: "file", title: "For referring providers", text: "A clear path from referral to care.", href: "/for-referring-providers", linkLabel: "Referral pathway" }),
  ])) + section(startCta(), "section--paper"));

/* ---------- Service detail pages ---------- */
function service({ route, key, name, h1, body, overview, areasTitle, areas, journeyTitle, journey, relatedList }) {
  add(route, name, body,
    hero({ key, h1, body, ctas: [["Request an appointment", "/book-online", "light"]] }) +
    section(`<div class="prose"><h2>About ${esc(name.toLowerCase())}</h2>${overview.map((p) => `<p>${p}</p>`).join("")}</div>`) +
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
  relatedList: [["Our Horses", "Meet Biscuit, Captain Carrot, Maple and Cowboy.", "/our-horses"], ["Services & Programs", "All of our care in one place.", "/services-programs"], ["Contact", "Ask about EAL.", "/contact"]] });

/* ---------- For Families ---------- */
add("/for-families", "For Families", "What happens after you request an appointment at Faith Reins: a clear first step and a caring team.",
  hero({ key: "for-families", h1: "A clear first step. A caring team.", body: "Explore services and learn what happens after you request an appointment.", ctas: [["Request an appointment", "/book-online", "light"], ["Contact us", "/contact", "secondary"]] }) +
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
add("/payment-and-insurance", "Payment & Insurance", "How to pay for Faith Reins therapy services — insurance, private pay, ARKids First, Medicaid, and financial assistance.",
  hero({ key: "payment-and-insurance", h1: "Clear answers before care begins.", body: "We want cost to be the last reason a family waits.", ctas: [["Contact our team", "/contact", "light"], ["Request an appointment", "/book-online", "secondary"]] }) +
  section(`<div class="prose">
<h2>How payment works</h2>
<p>We work with families to find a payment path that makes care accessible. The options below cover most situations. Our team will confirm what applies to your family during the intake conversation — nothing on this page is a guarantee of coverage or cost.</p>
<h2>Insurance</h2>
<p>We are working to accept major commercial insurance plans. Coverage depends on your specific plan, the services your child receives, and any referral or prior-authorization requirements your insurer has. We recommend calling the member services number on your insurance card and asking whether Faith Reins is an in-network provider before your first appointment.</p>
<p>We are happy to provide you with the information you need to check your benefits or submit a claim. Contact our team and we will help.</p>
<h2>ARKids First &amp; Medicaid</h2>
<p>We are committed to serving families enrolled in ARKids First and Arkansas Medicaid. If your child is enrolled, please let us know during intake. Our team will verify coverage and walk through any authorization steps with you.</p>
<h2>Private Pay</h2>
<p>Families who pay out of pocket are welcome. We will provide you with a clear fee estimate before care begins. Payment is due at the time of service unless other arrangements are made in advance.</p>
<h2>Financial Assistance</h2>
<p>No family should go without care because of cost. We offer need-based financial assistance funded by donor gifts and our scholarship program. If cost is a barrier, please tell us — the conversation is confidential and there is no obligation. We will do our best to find a way.</p>
<h2>What to have ready</h2>
<p>These help a first conversation go smoothly. None are required to reach out.</p></div>`) +
  section(checks([["Insurance card or plan information", "If you have coverage, the member ID and group number help us verify benefits quickly."], ["Referral or provider notes", "If a physician, school, or other provider referred your child, any notes or documentation they can share are helpful."], ["ARKids First or Medicaid ID", "If your child is enrolled."], ["Questions about cost", "Write them down — there are no wrong questions and we want you to feel informed before care begins."]])) +
  section(notice("Costs and coverage vary. Nothing on this page is a guarantee of benefits or a quote. Our team will provide specific information during your intake conversation.") + `<div class="mt-28">${cta({ h2: "Questions about payment?", p: "Our team will walk through every option with you — no pressure, no obligation.", buttons: [btn("Contact our team", "/contact"), btn("Request an appointment", "/book-online", "secondary")] })}</div>`, "section--paper"));

/* ---------- FAQ ---------- */
add("/faq", "FAQ", "Common questions from families, referring providers and supporters of Faith Reins.",
  hero({ key: "faq", h1: "A clear next step.", body: "Common questions from families, providers and supporters.", ctas: [["Contact our team", "/contact", "light"]] }) +
  section(grid(2, [
    `<div class="faq-group"><h2 class="h-card">Getting started</h2>${faq([
      ["How do I get started?", "Send an appointment request on <a href='/book-online'>Book Online</a> or <a href='/contact'>call or email us</a>. Our team will follow up to learn about your child and walk through next steps."],
      ["Do I need a referral?", "A referral is not required to contact us, but if a physician, school, or specialist has recommended therapy, please bring any notes or documentation — it helps us move quickly."],
      ["Who can Faith Reins serve?", "We serve children and teens from birth through age 18 in South Arkansas. If you are unsure whether we are the right fit, contact us and we will guide you honestly."],
      ["How long does it take to get an appointment?", "Wait times vary by service and availability. Contact our team for current scheduling. We do our best to move quickly for families with urgent needs."],
    ])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Sessions &amp; care</h2>${faq([
      ["How long are sessions?", "Sessions are typically 30 to 60 minutes depending on the service, your child's age, and their individual plan. Your therapist will discuss the right length for your child at intake."],
      ["Do parents stay during sessions?", "Yes — we encourage it. Family involvement is a core part of how we work. Your therapist will tell you when it helps to observe, participate, or wait nearby."],
      ["What should my child wear?", "Comfortable clothes they can move in. Closed-toe shoes are required for any activity around the horses. We will remind you of anything specific before your first visit."],
      ["How often will my child be seen?", "Frequency depends on your child's goals and plan. Most children are seen once or twice a week. Your therapist will recommend a schedule and adjust it as your child progresses."],
      ["Can my child receive more than one service?", "Often yes. Many children benefit from a combination of services. Our team will help identify the right mix and coordinate care across disciplines."],
    ])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Insurance &amp; payment</h2>${faq([
      ["Do you accept insurance?", "We work with major commercial insurance plans and are committed to serving families enrolled in ARKids First and Arkansas Medicaid. Coverage depends on your specific plan. Contact us and we will help you verify your benefits before your first visit."],
      ["What if I cannot afford care?", "Cost should not be the reason a child goes without care. We offer need-based financial assistance funded by donor gifts and our scholarship program. The conversation is confidential — just ask."],
      ["What does a session cost?", "Costs vary by service and coverage. We will give you a clear estimate before care begins. See <a href='/payment-and-insurance'>Payment &amp; Insurance</a> for a full overview."],
    ])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Equine programs</h2>${faq([
      ["Is equine-assisted learning safe?", "Yes. All equine activities are led by trained staff, conducted in a supervised setting, and begin with a safety orientation. Helmets are required and provided. See our <a href='/equine-safety'>Equine Safety notice</a> for full details."],
      ["Is EAL the same as therapy?", "No. Equine-Assisted Learning is an experiential learning program — not a clinical therapy service. It complements clinical care by building confidence, emotional regulation, and communication skills in a relational, hands-on setting."],
      ["Does my child need to have horse experience?", "Not at all. Most children who come to EAL have never been near a horse. Our staff introduces every child to the horses at their own pace."],
      ["Can a child do both EAL and clinical therapy?", "Yes, and we often recommend it. EAL and clinical services are designed to complement each other. Your care team will help determine whether the combination makes sense for your child."],
    ])}</div>`,
    `<div class="faq-group"><h2 class="h-card">For providers</h2>${faq([
      ["How do I refer a patient?", "Contact our intake team through the <a href='/contact'>contact page</a> or visit <a href='/for-referring-providers'>For Referring Providers</a>. A brief note with the reason for referral and family contact details is all we need to get started."],
      ["What information should I send?", "Reason for referral, relevant evaluations or progress notes if available, the child's age, and the family's preferred contact method. We will follow up with the family and confirm what else is needed."],
      ["Do you collaborate with referring providers?", "Yes. With family consent, we communicate with referring physicians, schools, and other providers to coordinate care. Coordination is part of how we work, not an exception."],
    ])}</div>`,
    `<div class="faq-group"><h2 class="h-card">Giving &amp; volunteering</h2>${faq([
      ["How can I support Faith Reins?", "The most direct way is a gift through our <a href='/give'>Give page</a>. You can also sponsor a horse, explore <a href='/sponsorships'>sponsorship opportunities</a>, or <a href='/join-our-team'>volunteer</a>."],
      ["Is my donation tax-deductible?", "Yes. Faith Reins is a 501(c)(3) nonprofit. All gifts are tax-deductible to the extent permitted by law. See our <a href='/donation-policy'>Donation Policy</a> for details."],
      ["Can I volunteer if I have no horse experience?", "Absolutely. Many of our volunteer roles do not involve horses at all. Those that do include full training. Visit <a href='/join-our-team'>Join Our Team</a> to learn more."],
    ])}</div>`,
  ])) +
  section(cta({ h2: "Still have questions?", p: "Our team is glad to help — no question is too small.", buttons: [btn("Contact our team", "/contact"), btn("Request an appointment", "/book-online", "secondary")] }), "section--paper"));

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
  section(`<div class="stack"><div class="section-head"><h2>Our Sponsors</h2></div>
<h3 class="h-card" style="margin-bottom:1rem">Platinum</h3>
<div class="grid grid--3" style="margin-bottom:2.5rem">${[1,2,3].map(() => `<div class="card card--center"><img src="${img("sponsor-platinum")}" alt="Platinum Sponsor" style="max-width:200px;width:100%"></div>`).join("")}</div>
<h3 class="h-card" style="margin-bottom:1rem">Gold</h3>
<div class="grid grid--4" style="margin-bottom:2.5rem">${[1,2,3,4].map(() => `<div class="card card--center"><img src="${img("sponsor-gold")}" alt="Gold Sponsor" style="max-width:180px;width:100%"></div>`).join("")}</div>
<h3 class="h-card" style="margin-bottom:1rem">Silver</h3>
<div class="grid grid--5" style="margin-bottom:2.5rem">${[1,2,3,4,5].map(() => `<div class="card card--center"><img src="${img("sponsor-silver")}" alt="Silver Sponsor" style="max-width:160px;width:100%"></div>`).join("")}</div>
<h3 class="h-card" style="margin-bottom:1rem">Bronze</h3>
<div class="grid grid--5">${[1,2,3,4,5].map(() => `<div class="card card--center"><img src="${img("sponsor-bronze")}" alt="Bronze Sponsor" style="max-width:140px;width:100%"></div>`).join("")}</div>
</div>`, "section--paper") +
  section(cta({ h2: "Become a partner", p: "Together we can support more children and families.", buttons: [btn("Contact us", "/contact"), btn("Sponsorships", "/sponsorships", "secondary")] })));

/* ---------- Team ---------- */
const teamCard = (name, title, creds, bio, av) =>
  `<div class="card team-card"><img src="${img(av)}" alt="${esc(name)}" class="team-card__photo" loading="lazy"><div class="team-card__body"><h3>${esc(name)}</h3><p class="team-card__title">${esc(title)}</p>${creds ? `<p class="team-card__creds">${esc(creds)}</p>` : ""}<p class="team-card__bio">${esc(bio)}</p></div></div>`;
const hiringCard = (title, creds, blurb) =>
  `<div class="card team-card team-card--hiring"><div class="team-card__hiring-badge">Now Hiring</div><div class="team-card__body" style="padding-top:1.25rem"><h3>${esc(title)}</h3>${creds ? `<p class="team-card__creds">${esc(creds)}</p>` : ""}<p class="team-card__bio">${esc(blurb)}</p><a class="btn btn--accent" href="/join-our-team" style="margin-top:1rem;display:inline-block">Apply now</a></div></div>`;

add("/our-team", "Our Team", "A dedicated team supporting children, families and our equine programs.",
  hero({ key: "our-team", h1: "People who care. A purpose we share.", body: "A dedicated team supporting children, families and our equine programs.", ctas: [["Request an appointment", "/book-online", "light"]] }) +
  section(`<div class="prose"><h2>Our team</h2><p>Our clinicians, staff and volunteers share one purpose: to support children and families with skill, patience and faith. Each person brings specialized training and a genuine commitment to the children and families we serve.</p></div>`) +
  `<section class="section section--paper" id="team-profiles"><div class="container">
${head("Leadership & Clinical Team")}
<style>
.team-card{display:flex;flex-direction:column;gap:0;padding:0;overflow:hidden}
.team-card__photo{width:100%;aspect-ratio:8/9;object-fit:cover}
.team-card__body{padding:1.25rem 1.25rem 1.5rem}
.team-card__title{font-weight:600;font-size:.9rem;color:var(--color-brand,#3a6642);margin:.15rem 0 .1rem}
.team-card__creds{font-size:.8rem;color:#888;margin-bottom:.6rem}
.team-card__bio{font-size:.875rem;line-height:1.55;color:#444}
.team-card--hiring{border:2px dashed #c8a030;background:#fffdf0}
.team-card__hiring-badge{background:#c8a030;color:#fff;font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.35rem .75rem}
</style>
${grid(3, [
  teamCard("Donna Horton", "Founder, CEO & EAL Coordinator", "PATH Intl. Certified", "Donna founded Faith Reins out of a deep conviction that every child in South Arkansas deserves access to high-quality therapy and the unique healing that horses make possible. She leads our Equine-Assisted Learning program, designing experiences that help children build confidence, trust, and regulation alongside our horses. With a background in ministry and family services, she assembled the clinical team, secured the facility, and built the community partnerships that keep the mission moving forward.", "avatar-a"),
  teamCard("Sample Name", "Clinical Director", "O.T.D., OTR/L", "As a doctorally prepared occupational therapist, our Clinical Director brings deep expertise in pediatric sensory processing, fine motor development, and daily living skills alongside the administrative oversight that keeps our programs running well. They oversee therapy quality, clinical supervision, and individualized care planning across all services — and still carry a caseload, because they believe the best clinical leaders stay close to the work.", "avatar-b"),
  teamCard("Sample Name", "Speech-Language Pathologist", "M.S., CCC-SLP", "Our SLP works with children on articulation, language development, social communication, and feeding. They take time to understand each child's communication style before jumping to a plan — because how a child communicates is personal, and the goal is always real-world connection, not just test scores. They particularly enjoy watching nonverbal or minimally verbal children find new ways to make themselves understood.", "avatar-c"),
  hiringCard("Speech-Language Pathologist", "M.S., CCC-SLP required", "We are growing our SLP team to serve more children in South Arkansas. We are looking for a licensed, ASHA-certified clinician who wants to practice in a supportive, faith-rooted setting with a caseload focused on pediatrics. Competitive salary, collaborative team, and a barn out back."),
  teamCard("Sample Name", "Physical Therapist", "D.P.T.", "Our PT supports children with gross motor development, strength, balance, coordination, and mobility. They work closely with families to translate clinical progress into practical gains — whether that means climbing the playground structure, keeping up with a sibling, or simply feeling steady and confident in their own body. They bring a calm, encouraging energy to every session.", "avatar-a"),
  teamCard("Sample Name", "Licensed Professional Counselor", "M.S., LPC", "Our counselor provides a safe, steady space for children and teens to process big feelings, build coping skills, and work through challenges at home or school. Using age-appropriate, evidence-based approaches — including play therapy for younger children — they meet each child where they are. They also partner closely with parents, because lasting emotional growth happens at home too.", "avatar-b"),
])}</div></section>` +
  section(cta({ h2: "We are hiring", p: "Join a clinical team doing meaningful work in South Arkansas. We have open positions and always want to meet great people.", buttons: [btn("See open positions", "/join-our-team"), btn("Contact us", "/contact", "secondary")] })));

/* ---------- Horses ---------- */
const HORSES = [
  ["Jesse", "horse-biscuit", "Jesse is the kind of horse that makes you slow down. Patient and steady, he has a gift for meeting children exactly where they are — not rushing, not reacting, just present. Many kids meet Jesse first, and something about that first calm encounter sets the tone for everything that follows."],
  ["Jack", "horse-captain-carrot", "Jack is alert, curious, and not afraid to let you know it. He pays close attention to the people around him, which makes him a natural partner for children who are working on communication and connection. He keeps things interesting — and the kids who click with him tend to really click with him."],
  ["Banita Joe", "horse-maple", "Banita Joe is gentle in a way that feels intentional. She listens carefully, moves with care, and has a particular patience for children who need a little more time to feel comfortable. She is a trusted partner for younger participants and for anyone taking their first steps with horses."],
  ["Cowboy", "horse-cowboy", "Cowboy is the steady hand of the herd — reliable, grounded, and always where you need him to be. He carries himself with the kind of quiet confidence that tends to rub off on the children working alongside him. His care is generously supported by the McTigrit Family, whose commitment to our horses makes programs like this possible.", "Support provided by the McTigrit Family."],
];
add("/our-horses", "Our Horses", "Meet the equine partners at Faith Reins: big personalities and gentle connections.",
  hero({ key: "our-horses", h1: "Meet our equine partners.", body: "Big personalities. Gentle connections.", ctas: [["Support", "/give", "accent"]] }) +
  section(`<div class="prose"><h2>Calm partners in learning</h2><p>Horses give children a calm, honest partner. Our herd is selected and cared for with one question in mind: does this horse help a child feel safe enough to grow? Each one has a distinct personality, and part of the work is helping children and horses find their rhythm together.</p></div>`) +
  `<section class="section section--paper"><div class="container">${grid(2, HORSES.map(([n, k, bio, note]) => `<div class="horse-card"><div class="horse-card__img"><img src="${img(k)}" alt="${n}" loading="lazy"></div><div class="horse-card__body"><h3>${n}</h3><p>${esc(bio)}</p>${note ? `<p class="horse-card__note">${esc(note)}</p>` : ""}</div></div>`))}<style>.horse-card{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid #e0dbd4;border-radius:10px;overflow:hidden}.horse-card__img img{width:100%;height:100%;object-fit:cover;display:block}.horse-card__body{padding:1.5rem 1.75rem;display:flex;flex-direction:column;justify-content:center;gap:.75rem}.horse-card__body h3{font-family:'Noto Serif',serif;font-size:1.25rem;margin:0}.horse-card__body p{font-size:.9rem;line-height:1.65;margin:0;color:#444}.horse-card__note{font-size:.8rem!important;color:#888!important;font-style:italic}@media(max-width:600px){.horse-card{grid-template-columns:1fr}.horse-card__img img{aspect-ratio:16/9}}</style></div></section>` +
  section(cta({ h2: "Learn through connection", buttons: [btn("Equine-Assisted Learning", "/equine-assisted-learning"), btn("Services & Programs", "/services-programs", "secondary"), btn("Contact", "/contact", "secondary")] })));

/* ---------- Join ---------- */
add("/join-our-team", "Join Our Team", "Career and volunteer opportunities at Faith Reins Equestrian Center in Camden, Arkansas.",
  hero({ key: "join-our-team", h1: "Bring your purpose to Faith Reins.", body: "Build a career around meaningful work in a faith-rooted, team-driven setting in South Arkansas.", ctas: [["See open positions", "#openings", "light"], ["Volunteer with us", "#volunteer", "secondary"]] }) +
  section(head("Why work here") + grid(4, [
    card({ ic: "heart", title: "Mission-driven work", text: "Every session, every shift, every day — the work is real and the impact is visible." }),
    card({ ic: "horse", title: "A setting like no other", text: "A clinic, an arena, and a herd. There is no other place quite like this to practice pediatric care." }),
    card({ ic: "users", title: "A team that shows up", text: "Small enough to know each other, experienced enough to make each other better." }),
    card({ ic: "star", title: "Faith-rooted culture", text: "Compassion guides how we treat each other and the families we serve." }),
  ])) +
  `<section class="section section--paper" id="openings"><div class="container">
${head("Open Positions")}
<div class="job-listing">
  <div class="job-listing__header">
    <div><h3>Speech-Language Pathologist</h3><p class="job-listing__meta">Full-time &nbsp;·&nbsp; Camden, AR &nbsp;·&nbsp; Salary negotiable</p></div>
    <a class="btn btn--accent" href="/contact">Apply</a>
  </div>
  <p>We are looking for a licensed, ASHA-certified SLP to join our clinical team. You will work primarily with pediatric clients on articulation, language development, social communication, and feeding, within a collaborative, faith-rooted environment that includes equine-assisted learning alongside traditional clinic-based care.</p>
  <h4>What we are looking for</h4>
  <ul>
    <li>M.S. in Speech-Language Pathology</li>
    <li>Arkansas state licensure (or eligible)</li>
    <li>ASHA Certificate of Clinical Competence (CCC-SLP)</li>
    <li>Experience with pediatric populations preferred</li>
    <li>Collaborative mindset and comfort working in a mission-driven, faith-rooted setting</li>
  </ul>
  <h4>What we offer</h4>
  <ul>
    <li>Full-time position with competitive salary negotiated based on experience</li>
    <li>A small, supportive clinical team with strong peer collaboration</li>
    <li>Exposure to equine-assisted learning as a complement to traditional therapy</li>
    <li>A calm, relationship-centered work environment in South Arkansas</li>
    <li>The chance to build something — we are a growing practice with real community need</li>
  </ul>
  <p class="muted" style="margin-top:1rem;font-size:.875rem">To apply, send a cover letter and résumé through our contact form or directly to <a href="mailto:info@faithreins.com">info@faithreins.com</a>.</p>
</div>
<style>
.job-listing{background:var(--color-surface,#fff);border:1px solid #ddd;border-radius:8px;padding:1.75rem 2rem;max-width:740px;margin-top:1.5rem}
.job-listing__header{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;margin-bottom:1rem}
.job-listing__meta{font-size:.85rem;color:#888;margin:.2rem 0 0}
.job-listing h4{font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#555;margin:1.25rem 0 .4rem}
.job-listing ul{padding-left:1.2rem;margin-bottom:.5rem}
.job-listing li{font-size:.9rem;margin-bottom:.3rem}
.job-listing p{font-size:.9rem;line-height:1.6}
</style>
<p class="muted mt-28">More openings will be posted here as they become available. We also welcome general expressions of interest from OTs, PTs, and counselors.</p>
</div></section>` +
  `<section class="section" id="volunteer"><div class="container">
${head("Volunteer with Us", "Volunteers are essential to what we do — from horse handling to event support.")}
${grid(3, [
  card({ ic: "horse", title: "Equine support", text: "Help with horse care, handling, and session support. Training provided." }),
  card({ ic: "heart", title: "Program support", text: "Assist with activities, events, and family welcome." }),
  card({ ic: "users", title: "Administrative & events", text: "Behind-the-scenes help that keeps things running." }),
])}
<div class="center mt-28">${btn("Learn about volunteering", "/volunteer-policy")} &nbsp; ${btn("Express interest", "/contact", "secondary")}</div>
</div></section>` +
  section(grid(2, [card({ title: "Our Team", text: "Meet the people behind the care.", href: "/our-team", linkLabel: "Meet the team" }), card({ title: "Our Mission", text: "Rooted in faith. Guided by care.", href: "/our-mission", linkLabel: "Our mission" })]), "section--paper"));

/* ---------- Contact ---------- */
add("/contact", "Contact", "Connect with Faith Reins about services, giving or getting involved.",
  hero({ key: "contact", h1: "We're here to help.", body: "Connect with our team about services, giving or getting involved.", short: true }) +
  section(`<div class="split" style="align-items:start"><div class="stack"><h2>Get in touch</h2><address style="font-style:normal;display:grid;gap:8px"><span><a href="tel:+18708184087">870-818-4087</a></span><span><a href="mailto:info@faithreins.com">info@faithreins.com</a></span><span>226 Ouachita County Rd 45</span><span>Camden, AR 72711</span><span>Clinic: M–F 8:00 AM – 5:00 PM</span><span>Private sessions by appointment</span></address><p class="form-note">Please do not include medical information in messages.</p></div><div class="panel">${form("contact", { submit: "Send message", success: "Thank you. We received your message." })}</div></div>`) +
  `<section class="section section--paper"><div class="container"><h2 style="margin-bottom:1.25rem">Find us</h2><div class="map-wrap"><iframe title="Faith Reins location map" src="https://maps.google.com/maps?q=226+Ouachita+County+Rd+45,+Camden,+AR+72711&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="360" style="border:0;border-radius:8px;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div style="margin-top:1rem"><a class="btn btn--secondary" href="https://maps.google.com/maps/dir/?api=1&destination=226+Ouachita+County+Rd+45,+Camden,+AR+72711" target="_blank" rel="noopener">Get directions</a></div><style>.map-wrap{overflow:hidden;border-radius:8px;border:1px solid #e0dbd4}</style></div></section>` +
  section(head("Quick paths") + grid(4, [card({ title: "Appointments", text: "Book online.", href: "/book-online", linkLabel: "Request" }), card({ title: "Referrals", text: "For providers.", href: "/for-referring-providers", linkLabel: "Learn more" }), card({ title: "Giving", text: "Support the mission.", href: "/give", linkLabel: "Give" }), card({ title: "Sponsorships", text: "Partner with us.", href: "/sponsorships", linkLabel: "Learn more" })]), "section--paper"));

/* ---------- Shop ---------- */
const toSlug = (n) => n.toLowerCase().replace(/['']/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const MERCH = [
  { name: "Heritage Hoodie",   key: "merch-men-hoodie",      price: 45, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL","3XL"],          desc: "A heavyweight pullover hoodie in Faith Reins forest green. Soft brushed interior, kangaroo pocket, and the FR logo embroidered on the chest." },
  { name: "Women's Hoodie",    key: "merch-women-hoodie",    price: 42, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL"],                  desc: "A fitted pullover hoodie with a relaxed silhouette. Soft fleece interior and embroidered FR logo on the left chest." },
  { name: "Children's Hoodie", key: "merch-children-hoodie", price: 32, cat: "apparel",     sizes: ["2T","3T","4","5","6","7","8","10","12","14/16"], desc: "A cozy zip-up hoodie built for the barn. Soft, durable, and easy to layer on cool mornings." },
  { name: "Crewneck",          key: "merch-crewneck",        price: 38, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL","3XL"],          desc: "A classic midweight crewneck with the Faith Reins name across the chest. Perfect for fall afternoons." },
  { name: "Long Sleeve Tee",   key: "merch-long-sleeve",     price: 30, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL","3XL"],          desc: "A soft cotton-blend long sleeve with the FR logo. Layerable and comfortable across all seasons." },
  { name: "Men's Tee",         key: "merch-men-tee",         price: 24, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL","3XL"],          desc: "A classic unisex tee in soft cotton. FR logo on the left chest, Faith Reins name on the back." },
  { name: "Women's Tee",       key: "merch-women-tee",       price: 22, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL"],                  desc: "A relaxed-fit women's tee with the FR logo. Soft, lightweight, and made to move." },
  { name: "Children's Tee",    key: "merch-children-tee",    price: 18, cat: "apparel",     sizes: ["2T","3T","4","5","6","7","8","10","12","14/16"], desc: "A soft children's tee with the Faith Reins horse and name. Built for play." },
  { name: "Men's Polo",        key: "merch-men-polo",        price: 32, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL","3XL"],          desc: "A piqué polo with the FR emblem embroidered on the left chest. Classic fit, great for events." },
  { name: "Women's Polo",      key: "merch-women-polo",      price: 30, cat: "apparel",     sizes: ["XS","S","M","L","XL","2XL"],                  desc: "A women's piqué polo with FR emblem. Fitted cut, professional and polished." },
  { name: "Youth Polo",        key: "merch-youth-polo",      price: 24, cat: "apparel",     sizes: ["YS","YM","YL","YXL"],                         desc: "A youth polo for the little supporters. Same embroidered FR emblem as the adult styles." },
  { name: "Caps",              key: "merch-caps",            price: 22, cat: "headwear",    sizes: ["Adjustable"],                                 desc: "A structured six-panel cap with FR embroidered on the front. Adjustable strap fits most." },
  { name: "Beanie",            key: "merch-beanie",          price: 18, cat: "headwear",    sizes: ["One size"],                                   desc: "A ribbed knit beanie with the Faith Reins name on a woven label. Warm enough for Arkansas winters." },
  { name: "Coffee Mug",        key: "merch-mug",             price: 16, cat: "drinkware",   sizes: null,                                           desc: "An 11 oz ceramic mug with the FR logo. Microwave and dishwasher safe." },
  { name: "Travel Mug",        key: "merch-travel-mug",      price: 22, cat: "drinkware",   sizes: null,                                           desc: "A 20 oz stainless steel travel mug with a secure lid. Keeps drinks hot for 6 hours, cold for 12." },
  { name: "Keychains",         key: "merch-keychains",       price: 8,  cat: "accessories", sizes: null,                                           desc: "A laser-engraved hardwood keychain with the Faith Reins logo. A small gift that carries the mission." },
  { name: "Stickers",          key: "merch-stickers",        price: 4,  cat: "accessories", sizes: null,                                           desc: "A 3-pack of vinyl stickers featuring the FR logo and horse illustration. Weatherproof and UV-resistant." },
];

const CATS = [["all","All"],["apparel","Apparel"],["headwear","Headwear"],["drinkware","Drinkware"],["accessories","Accessories"]];

const SHOP_STYLE = `<style>
.shop-filters{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}
.shop-filter{background:none;border:1px solid #ccc;border-radius:20px;padding:.4em 1em;font-size:.875rem;cursor:pointer;transition:background .12s,color .12s,border-color .12s}
.shop-filter[aria-pressed="true"]{background:#3a6642;color:#fff;border-color:#3a6642}
.merch-card{display:flex;flex-direction:column;border:1px solid #e0dbd4;border-radius:10px;overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .18s,transform .18s;background:#fff}
.merch-card:hover{box-shadow:0 6px 24px rgba(0,0,0,.10);transform:translateY(-3px)}
.merch-card__img img{width:100%;aspect-ratio:1;object-fit:cover;display:block}
.merch-card__body{padding:1rem 1.1rem 1.25rem;display:flex;flex-direction:column;gap:.25rem;flex:1}
.merch-card__name{font-weight:700;font-size:.95rem;margin:0;color:#1a1a1a}
.merch-card__cat{font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;color:#888;margin:0}
.merch-card__price{font-family:'Noto Serif',serif;font-size:1.1rem;color:#3a6642;font-weight:600;margin:.25rem 0 0}
.merch-card__cta{font-size:.8rem;font-weight:600;color:#3a6642;margin-top:auto;padding-top:.5rem}
</style>`;

const PROD_STYLE = `<style>
.product-layout{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.product-img img{width:100%;border-radius:10px;aspect-ratio:1;object-fit:cover;display:block}
.product-info{display:flex;flex-direction:column;gap:1rem}
.product-cat{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:#888}
.product-name{font-family:'Noto Serif',serif;font-size:2rem;line-height:1.2;margin:0}
.product-price{font-size:1.5rem;font-weight:700;color:#3a6642}
.product-desc{color:#444;line-height:1.7;margin:0}
.size-label{font-size:.875rem;font-weight:600;margin:0}
.size-btns{display:flex;gap:.4rem;flex-wrap:wrap}
.size-btn{background:#fff;border:1px solid #ccc;border-radius:6px;padding:.4em .8em;font-size:.875rem;cursor:pointer;transition:background .1s,border-color .1s}
.size-btn[aria-pressed="true"]{background:#3a6642;color:#fff;border-color:#3a6642}
.size-btn:disabled{opacity:.4;cursor:default}
.qty-row{display:flex;align-items:center;gap:.75rem}
.qty-btn{background:#f0ede8;border:none;width:32px;height:32px;border-radius:6px;font-size:1.1rem;cursor:pointer;display:flex;align-items:center;justify-content:center}
.qty-val{font-size:1rem;font-weight:600;min-width:2ch;text-align:center}
.atb-btn{width:100%;padding:.85em;font-size:1rem;border-radius:8px;border:none;background:#3a6642;color:#fff;font-weight:700;cursor:pointer;transition:background .15s}
.atb-btn:hover:not(:disabled){background:#2e5235}
.atb-btn:disabled{opacity:.6;cursor:default}
.atb-confirm{color:#3a6642;font-weight:600;font-size:.9rem;min-height:1.5em}
@media(max-width:680px){.product-layout{grid-template-columns:1fr;gap:1.5rem}}
</style>`;

const merchCard = ({ name, key: k, price, cat }) =>
  `<a class="merch-card" href="/shop/${toSlug(name)}" data-cat="${cat}">
    <div class="merch-card__img"><img src="${img(k)}" alt="${esc(name)}" loading="lazy"></div>
    <div class="merch-card__body">
      <p class="merch-card__cat">${esc(cat)}</p>
      <h3 class="merch-card__name">${esc(name)}</h3>
      <p class="merch-card__price">$${price}</p>
      <span class="merch-card__cta">View product →</span>
    </div>
  </a>`;

add("/shop", "Shop | Faith Reins", "Faith Reins merchandise — hoodies, tees, polos, accessories, and more.",
  hero({ key: "shop", h1: "Wear the mission.", body: "Every purchase supports pediatric therapy and equine-assisted learning in South Arkansas.", short: true }) +
  `<section class="section" id="shop-products"><div class="container">
    <div class="shop-filters" role="group" aria-label="Filter by category">
      ${CATS.map(([v,l]) => `<button class="shop-filter" type="button" data-filter="${v}" aria-pressed="${v==="all"}">${esc(l)}</button>`).join("")}
    </div>
    <div class="grid grid--4" id="merch-grid">${MERCH.map(merchCard).join("")}</div>
    ${SHOP_STYLE}
  </div></section>
  <script>
  (function(){
    var btns=[].slice.call(document.querySelectorAll('.shop-filter'));
    var cards=[].slice.call(document.querySelectorAll('#merch-grid .merch-card'));
    btns.forEach(function(b){b.addEventListener('click',function(){
      btns.forEach(function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      var f=b.dataset.filter;
      cards.forEach(function(c){c.style.display=(f==='all'||c.dataset.cat===f)?'':'none'});
    })});
  })();
  </script>` +
  section(cta({ h2: "Proceeds support the mission.", p: "Every purchase helps fund pediatric therapy and equine-assisted learning.", buttons: [btn("Donate instead", "/give", "secondary")] }), "section--paper"));

// Per-product pages
MERCH.forEach(({ name, key: k, price, cat, sizes, desc }) => {
  const slug = toSlug(name);
  const sizeBlock = sizes
    ? `<p class="size-label">Size <span id="size-display" style="font-weight:400;color:#888"></span></p>
       <div class="size-btns" id="size-btns" role="group" aria-label="Select a size">
         ${sizes.map(s => `<button class="size-btn" type="button" data-size="${esc(s)}" aria-pressed="false">${esc(s)}</button>`).join("")}
       </div>`
    : "";
  const addScript = `<script>
(function(){
  var size=null, qty=1;
  var sizeBtns=[].slice.call(document.querySelectorAll('.size-btn'));
  var qtyVal=document.getElementById('qty-val');
  var atb=document.getElementById('atb');
  var conf=document.getElementById('atb-conf');
  var sizeDisplay=document.getElementById('size-display');
  sizeBtns.forEach(function(b){b.addEventListener('click',function(){
    sizeBtns.forEach(function(x){x.setAttribute('aria-pressed','false')});
    b.setAttribute('aria-pressed','true');
    size=b.dataset.size;
    if(sizeDisplay)sizeDisplay.textContent='— '+size;
    check();
  })});
  document.getElementById('qty-dec').addEventListener('click',function(){if(qty>1){qty--;qtyVal.textContent=qty;}});
  document.getElementById('qty-inc').addEventListener('click',function(){if(qty<9){qty++;qtyVal.textContent=qty;}});
  function check(){atb.disabled=${sizes ? "!size" : "false"};}
  check();
  atb.addEventListener('click',function(){
    ${sizes ? "if(!size)return;" : ""}
    var cart=[];
    try{cart=JSON.parse(localStorage.getItem('fr-cart')||'[]');}catch(e){}
    var existing=cart.find(function(i){return i.id===${JSON.stringify(slug)}&&i.size===size;});
    if(existing){existing.qty+=qty;}else{cart.push({id:${JSON.stringify(slug)},name:${JSON.stringify(name)},price:${price},size:size,qty:qty,img:${JSON.stringify(img(k))}});}
    try{localStorage.setItem('fr-cart',JSON.stringify(cart));}catch(e){}
    var count=cart.reduce(function(s,i){return s+i.qty;},0);
    var badge=document.getElementById('cart-badge');
    if(badge){badge.textContent=count;badge.hidden=count===0;}
    conf.textContent='Added to bag!';
    setTimeout(function(){conf.textContent='';},2500);
  });
})();
</script>`;
  add(`/shop/${slug}`, `${name} | Shop | Faith Reins`, desc,
    `<section class="section"><div class="container">
<p style="font-size:.875rem;color:#888;margin-bottom:2rem"><a href="/shop">← Shop</a> &nbsp;/&nbsp; ${esc(cat)}</p>
<div class="product-layout">
  <div class="product-img"><img src="${img(k)}" alt="${esc(name)}"></div>
  <div class="product-info">
    <p class="product-cat">${esc(cat)}</p>
    <h1 class="product-name">${esc(name)}</h1>
    <p class="product-price">$${price}</p>
    <p class="product-desc">${esc(desc)}</p>
    ${sizeBlock}
    <div class="qty-row">
      <span style="font-size:.875rem;font-weight:600">Qty</span>
      <button class="qty-btn" id="qty-dec" type="button" aria-label="Decrease quantity">−</button>
      <span class="qty-val" id="qty-val">1</span>
      <button class="qty-btn" id="qty-inc" type="button" aria-label="Increase quantity">+</button>
    </div>
    <button class="atb-btn" id="atb" type="button"${sizes ? " disabled" : ""}>Add to bag</button>
    <p class="atb-confirm" id="atb-conf" aria-live="polite"></p>
    <p style="font-size:.8rem;color:#888">Ships within 5–7 business days. See <a href="/returns-policy">Returns &amp; Shipping Policy</a>.</p>
  </div>
</div>
${PROD_STYLE}
</div></section>` +
    section(`<div class="section-head section-head--left"><h2>You might also like</h2></div><div class="grid grid--4">${MERCH.filter(m=>toSlug(m.name)!==slug).slice(0,4).map(merchCard).join("")}</div>` + SHOP_STYLE) +
    addScript);
});

/* ---------- Legal ---------- */
add("/legal", "Legal & Policies", "All policies, notices, and terms for Faith Reins Equestrian Center.",
  `<section class="section"><div class="container">
<div class="prose" style="margin-bottom:2.5rem"><h1>Policies &amp; Legal Notices</h1><p class="lead muted">Everything in one place. For questions about any policy, email <a href="mailto:info@faithreins.com">info@faithreins.com</a> or <a href="/contact">contact us online</a>.</p></div>
${grid(3, [
  card({ ic: "file", title: "Terms of Service", text: "Website use, disclaimer, intellectual property, and governing law.", href: "/terms-of-service", linkLabel: "Read" }),
  card({ ic: "shield", title: "Privacy Policy", text: "What we collect, how we use it, and your rights.", href: "/privacy-policy", linkLabel: "Read" }),
  card({ ic: "shield", title: "HIPAA Notice of Privacy Practices", text: "How we use and protect your child's health information.", href: "/hipaa-notice", linkLabel: "Read" }),
  card({ ic: "heart", title: "Donation Policy", text: "Stewardship, recurring gifts, refunds, and acknowledgment.", href: "/donation-policy", linkLabel: "Read" }),
  card({ ic: "check", title: "Returns & Shipping", text: "Returns, exchanges, and shipping for the Faith Reins store.", href: "/returns-policy", linkLabel: "Read" }),
  card({ ic: "users", title: "Volunteer Policy", text: "Background checks, conduct standards, and safety requirements.", href: "/volunteer-policy", linkLabel: "Read" }),
  card({ ic: "book", title: "Accessibility", text: "WCAG commitment, physical access, and communication accommodations.", href: "/accessibility", linkLabel: "Read" }),
  card({ ic: "clock", title: "Cancellation Policy", text: "Notice requirements, no-show handling, and illness exceptions.", href: "/cancellation-policy", linkLabel: "Read" }),
  card({ ic: "horse", title: "Equine Safety & Liability", text: "Arkansas Equine Liability Act notice and safety practices.", href: "/equine-safety", linkLabel: "Read" }),
  card({ ic: "star", title: "Photo & Media Consent", text: "How we use photographs and videos of clients, families, and participants.", href: "/photo-consent", linkLabel: "Read" }),
])}</div></section>`);

const legalContact = `<div class="card" style="margin-top:2rem"><p><strong>Questions?</strong> Email <a href="mailto:info@faithreins.com">info@faithreins.com</a>, <a href="/contact">contact us online</a>, or visit us in Camden, Arkansas.</p></div>`;

add("/terms-of-service", "Terms of Service", "Terms of Service for the Faith Reins website.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Terms of Service</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>1. Acceptance of Terms</h2>
<p>By accessing or using the Faith Reins website ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site. Faith Reins Equestrian Center ("Faith Reins," "we," "us," or "our") may update these terms at any time; continued use of the Site after changes are posted constitutes acceptance.</p>
<h2>2. Nature of Information</h2>
<p>Content on this Site is provided for general informational purposes only. Nothing here constitutes professional medical, therapeutic, legal, or financial advice. No provider–patient or provider–client relationship is formed by visiting the Site or submitting an inquiry through it. If you have concerns about a child's health or development, consult a qualified healthcare professional directly.</p>
<h2>3. Appointment Requests</h2>
<p>Submitting an appointment or consultation request does not guarantee an appointment or create a care relationship. Our team will contact you to confirm availability and complete required intake procedures before any care relationship begins. Scheduled appointments are subject to the cancellation and rescheduling terms communicated to you at intake.</p>
<h2>4. Intellectual Property</h2>
<p>All text, photographs, graphics, logos, and other content on this Site are the property of Faith Reins Equestrian Center or its content providers and are protected by applicable copyright and trademark law. You may not reproduce, distribute, or create derivative works from Site content without our prior written permission. You may share links to our pages for personal, non-commercial purposes.</p>
<h2>5. Online Store</h2>
<p>Purchases made through the Faith Reins online store are subject to our <a href="/returns-policy">Returns &amp; Shipping Policy</a>. We reserve the right to cancel or refuse any order at our discretion.</p>
<h2>6. Third-Party Links</h2>
<p>The Site may link to third-party websites for your convenience. Faith Reins is not responsible for the content, privacy practices, or terms of any third-party site, and a link does not constitute an endorsement.</p>
<h2>7. Disclaimer of Warranties</h2>
<p>The Site and its content are provided on an "as is" and "as available" basis without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted or error-free.</p>
<h2>8. Limitation of Liability</h2>
<p>To the fullest extent permitted by applicable law, Faith Reins Equestrian Center, its staff, volunteers, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Site or its content.</p>
<h2>9. Children's Use</h2>
<p>This Site is intended for parents, guardians, and referring professionals. We do not knowingly collect personal information directly from children under 13. If you are a minor, please have a parent or guardian review and submit any forms on your behalf.</p>
<h2>10. Governing Law</h2>
<p>These Terms are governed by the laws of the State of Arkansas. Any disputes shall be resolved in the courts of Ouachita County, Arkansas.</p>
${legalContact}</div></div></section>`);

add("/privacy-policy", "Privacy Policy", "Privacy Policy for the Faith Reins website.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Privacy Policy</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>1. Overview</h2>
<p>Faith Reins Equestrian Center is committed to protecting the privacy of the children, families, and supporters who interact with us. This policy explains what information we collect through this website, how we use it, and your rights. It governs information collected through faithreins.org and related online forms only. Information collected during the delivery of clinical services is handled under a separate HIPAA Notice of Privacy Practices provided at intake.</p>
<h2>2. Information We Collect</h2>
<p><strong>Information you provide:</strong> contact and inquiry forms collect your name, email, and phone number; appointment requests collect contact details and service interest; online giving collects name, billing address, and email (payment card details are processed by our payment processor and not stored by Faith Reins); volunteer and employment inquiries collect the details you provide in your application.</p>
<p><strong>Information collected automatically:</strong> our web host may log standard server data including IP address, browser type, and pages visited. We may use aggregate analytics to understand site traffic. We do not use this data to identify individuals.</p>
<h2>3. How We Use Your Information</h2>
<p>We use the information we collect to respond to inquiries and appointment requests; process donations and issue receipts; send program updates to those who have opted in; operate and improve the Site; and comply with legal obligations. We will not sell or rent your personal information.</p>
<h2>4. HIPAA and Health Information</h2>
<p>Faith Reins is a healthcare provider subject to HIPAA. Protected Health Information collected during intake and care is governed by our HIPAA Notice of Privacy Practices, provided to families at the start of a care relationship. Information submitted through website forms before intake is not yet PHI, but we treat it with the same discretion.</p>
<h2>5. Children's Privacy</h2>
<p>Our website is directed to parents, legal guardians, and referring professionals—not to children themselves. We do not knowingly collect personal information directly from children under 13. Any information about a child submitted through this Site should be provided by a parent or legal guardian. If you believe we have inadvertently collected information from a child under 13 without parental consent, contact us immediately and we will delete it.</p>
<h2>6. Information Sharing</h2>
<p>We do not sell, trade, or rent personal information. We share it only with service providers (payment processing, email delivery, web hosting) who are contractually obligated to protect it; when required by law or court order; or with your explicit consent.</p>
<h2>7. Cookies</h2>
<p>The Site may use cookies for essential functions and aggregate analytics. You may disable cookies in your browser settings. We do not use cookies for cross-site advertising or behavioral tracking.</p>
<h2>8. Data Retention and Your Rights</h2>
<p>We retain contact information as long as necessary to fulfill its purpose or comply with legal requirements. Donation records are retained per IRS guidelines. You may request access to, correction of, or deletion of your personal information at any time by contacting us. We will respond within a reasonable time.</p>
<h2>9. Security</h2>
<p>We use reasonable administrative, technical, and physical safeguards to protect your information. No internet transmission is completely secure; we cannot guarantee the absolute security of information transmitted to or from the Site.</p>
<h2>10. Changes to This Policy</h2>
<p>We may update this policy from time to time. The effective date above reflects the most recent revision.</p>
${legalContact}</div></div></section>`);

add("/donation-policy", "Donation Policy", "Donation policy and stewardship commitments for Faith Reins.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Donation Policy</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>Our Commitment to Stewardship</h2>
<p>Faith Reins Equestrian Center is a nonprofit organization exempt from federal income tax under Section 501(c)(3) of the Internal Revenue Code. Gifts to Faith Reins are tax-deductible to the extent permitted by law. Every gift is treated as a sacred responsibility and used faithfully to advance our mission.</p>
<h2>How Gifts Are Used</h2>
<p>Donations support direct care (therapy sessions, program materials, and family support), equine program costs (care, feed, veterinary services, and safety equipment), facility maintenance, scholarships for families who cannot afford the full cost of services, and organizational operations. Gifts designated for a specific purpose will be honored to the extent practicable; if a designated purpose becomes impractical or is fully funded, we will contact the donor to discuss an alternative.</p>
<h2>Recurring Gifts</h2>
<p>Monthly and recurring gifts may be established through our online giving portal. By authorizing a recurring gift, you consent to automatic charges at the selected interval. You may modify or cancel a recurring gift at any time by logging in to your donor account or by contacting us at least 5 business days before the next scheduled charge.</p>
<h2>Refund Policy</h2>
<p>Because donations directly fund ongoing program costs, we are generally unable to return completed gifts. We will issue a full refund within <strong>30 days</strong> for duplicate or erroneous transactions, unauthorized use of a payment method, or gifts made in an amount different from what was intended due to a technical error. To request a refund, contact us within 30 days of the transaction with your name, gift date, and amount. Refunds are processed to the original payment method within 5–10 business days.</p>
<h2>In-Kind Donations</h2>
<p>We gratefully accept in-kind gifts of goods and services that support our programs. Please contact us before delivering any in-kind gift so we can confirm our current needs. Faith Reins will provide written acknowledgment as required by the IRS but will not assign a fair market value; donors are responsible for determining and reporting the value of their contribution.</p>
<h2>Matching Gifts &amp; Planned Giving</h2>
<p>Many employers match charitable gifts—contact your HR department to inquire. We are happy to provide documentation for matching gift requests. If you are interested in including Faith Reins in your estate plan, please contact us; we are grateful for legacy gifts of any size.</p>
<h2>Gift Acknowledgment</h2>
<p>Gifts of $250 or more will receive a written acknowledgment letter as required by the IRS. All online donors receive an emailed receipt. Cumulative annual giving receipts are available upon request each January. Donors who prefer to give anonymously may indicate that preference in their gift notes; anonymous gifts will be honored without public recognition.</p>
<h2>Payment Processing</h2>
<p>Online gifts are processed through a secure third-party payment processor. Payment card information is encrypted and is not stored by Faith Reins. We accept major credit cards and ACH/bank transfer for online giving.</p>
${legalContact}</div></div></section>`);

add("/returns-policy", "Returns & Shipping Policy", "Returns, exchanges, and shipping policy for the Faith Reins online store.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Returns &amp; Shipping Policy</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>Returns &amp; Exchanges</h2>
<p>We want you to be happy with your Faith Reins merchandise. If something isn't right, we'll make it right.</p>
<p><strong>Eligible returns:</strong> Items may be returned or exchanged within <strong>30 days</strong> of the delivery date if they are unworn, unwashed, and in original condition with tags attached. We accept returns for:</p>
<ul>
  <li>Items received damaged or with a print defect.</li>
  <li>Items shipped in the wrong size or style from what was ordered.</li>
  <li>Size exchanges (subject to availability).</li>
</ul>
<p><strong>Non-returnable items:</strong> Final-sale items, customized or personalized items, and items that have been worn, washed, or altered are not eligible for return.</p>
<h2>How to Start a Return</h2>
<p>Contact us within 30 days of delivery with your order number, the item(s) you'd like to return or exchange, and a brief description of the issue. We will provide a return authorization and instructions. Items sent back without prior authorization may not be processed.</p>
<p>For damaged or incorrect items, a photo of the issue helps us resolve it quickly.</p>
<h2>Refunds</h2>
<p>Once we receive and inspect your return, we will process a refund to your original payment method within <strong>5–10 business days</strong>. You will receive an email confirmation when the refund is issued. Original shipping charges are non-refundable unless the return is due to our error.</p>
<h2>Shipping</h2>
<p><strong>Processing time:</strong> Orders are processed within 3–5 business days. You will receive a shipping confirmation email with a tracking number once your order ships.</p>
<p><strong>Domestic shipping:</strong> We ship to all 50 U.S. states via standard carriers (USPS, UPS, or FedEx). Estimated delivery is 5–10 business days after processing. Expedited options may be available at checkout.</p>
<p><strong>International shipping:</strong> We do not currently ship outside the United States.</p>
<p><strong>Lost or delayed packages:</strong> If your package has not arrived within the estimated window, contact us with your order number and we will investigate with the carrier.</p>
<h2>Proceeds</h2>
<p>Proceeds from Faith Reins merchandise support our mission of providing pediatric therapy and equine-assisted learning to children and families in South Arkansas. Thank you for wearing the mission.</p>
${legalContact}</div></div></section>`);

add("/volunteer-policy", "Volunteer Policy", "Volunteer guidelines, conduct standards, and background check requirements for Faith Reins.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Volunteer Policy</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>Our Volunteers</h2>
<p>Volunteers are an essential part of the Faith Reins community. From horse handling to event support, our volunteers help make it possible to serve more children and families. We are grateful for every hour given in service to our mission.</p>
<h2>Who Can Volunteer</h2>
<p>Volunteers must be at least 16 years of age. Volunteers under 18 require written parental or guardian consent. All volunteers who work directly with clients or horses must complete our onboarding process before their first shift, which includes an orientation, safety training, and a background check.</p>
<h2>Background Checks</h2>
<p>Because we serve children, <strong>all volunteers in direct contact with clients are required to pass a background check</strong> before beginning service. This includes criminal history and sex offender registry screening. Background checks are conducted through a vetted third-party provider at no cost to the volunteer. Results are kept confidential and reviewed only by authorized Faith Reins staff.</p>
<p>Faith Reins reserves the right to decline or end a volunteer relationship based on background check results or other conduct concerns, at our sole discretion.</p>
<h2>Orientation &amp; Training</h2>
<p>New volunteers complete a Faith Reins orientation covering our mission, program overview, client confidentiality expectations, and facility safety rules. Volunteers assigned to equine activities receive additional horse-handling training from a qualified staff member before working with animals independently. No volunteer may work with a horse unsupervised until cleared by program staff.</p>
<h2>Confidentiality</h2>
<p>Volunteers may observe or interact with clients during sessions and activities. All client information—including names, diagnoses, and family details—is strictly confidential. Volunteers must not discuss, photograph, or share information about specific clients, families, or sessions with anyone outside of Faith Reins staff, including on social media. Volunteers sign a confidentiality agreement as part of onboarding.</p>
<h2>Photography &amp; Social Media</h2>
<p>Volunteers may not photograph, video, or record clients or their families without explicit written consent from the family and approval from a Faith Reins staff member. Approved photos shared publicly must not identify a client by name. When in doubt, ask a staff member before posting anything related to your volunteer experience.</p>
<h2>Code of Conduct</h2>
<p>Volunteers are expected to treat every child, family, staff member, and animal with dignity and respect. We ask that volunteers:</p>
<ul>
  <li>Arrive on time and notify us as early as possible when unable to make a scheduled shift.</li>
  <li>Follow the direction of Faith Reins staff at all times.</li>
  <li>Refrain from one-on-one, unsupervised contact with clients.</li>
  <li>Dress appropriately for the activity (closed-toe shoes are required around horses).</li>
  <li>Refrain from alcohol, tobacco, or drug use on Faith Reins property.</li>
  <li>Report any safety concern, injury, or inappropriate behavior to a staff member immediately.</li>
</ul>
<p>Faith Reins may suspend or end a volunteer relationship for violations of this code of conduct.</p>
<h2>Safety</h2>
<p>The safety of our clients, horses, and volunteers is our highest priority. Helmets are required for all riders during equine activities and are provided by Faith Reins. Volunteers must follow all posted safety guidelines and staff instructions around horses. Any injury on site—however minor—must be reported to a staff member and documented before leaving the property.</p>
<h2>How to Volunteer</h2>
<p>Interested volunteers should begin by visiting our <a href="/join-our-team">Join Our Team</a> page to learn about current opportunities and submit an inquiry. Our team will follow up with next steps, including scheduling an orientation.</p>
${legalContact}</div></div></section>`);

add("/accessibility", "Accessibility", "Accessibility commitment and accommodations for Faith Reins.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Accessibility</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>Our Commitment</h2>
<p>Faith Reins Equestrian Center is committed to making our website and physical programs accessible to everyone, including people with disabilities. We believe every child, family, and community member deserves full access to our services and information.</p>
<h2>Website Accessibility</h2>
<p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA for our website. Our ongoing efforts include:</p>
<ul>
  <li>Sufficient color contrast between text and background throughout the site.</li>
  <li>Descriptive alt text on images so screen readers can convey their meaning.</li>
  <li>Keyboard-navigable page structure with logical heading hierarchy.</li>
  <li>Readable font sizes and text that scales with browser zoom settings.</li>
  <li>Forms with clearly labeled fields and error messages.</li>
</ul>
<p>We recognize that accessibility is an ongoing process. If you encounter a barrier on our website, please tell us—your feedback directly shapes our improvements.</p>
<h2>Physical Accessibility</h2>
<p>Our equestrian facility in Camden, Arkansas is designed to accommodate children and families with a wide range of physical needs. Many of the children we serve have mobility, sensory, or communication differences, and our programs and spaces are built with that in mind. If you have specific accessibility needs for an in-person visit or therapy session, please contact us in advance so we can prepare appropriately.</p>
<h2>Communication Accommodations</h2>
<p>We are happy to provide information in an alternative format upon request, including larger print. If you need a communication accommodation to access our services—such as assistance related to a hearing, vision, or language need—please let us know when you contact us or schedule an appointment.</p>
<h2>Feedback &amp; Contact</h2>
<p>If you experience difficulty accessing any part of our website or have a suggestion for improvement, please contact us. We will respond within 5 business days and work to address the issue promptly.</p>
${legalContact}</div></div></section>`);

add("/hipaa-notice", "HIPAA Notice of Privacy Practices", "How Faith Reins uses and protects your health information under HIPAA.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Notice of Privacy Practices</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; THIS NOTICE DESCRIBES HOW HEALTH INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</p>
<h2>Who We Are</h2>
<p>Faith Reins Equestrian Center ("Faith Reins") is a covered healthcare entity under the Health Insurance Portability and Accountability Act of 1996 (HIPAA). This Notice of Privacy Practices describes how we may use and disclose your child's Protected Health Information (PHI) and explains your rights regarding that information.</p>
<h2>How We May Use and Disclose Health Information</h2>
<p><strong>Treatment:</strong> We use health information to provide, coordinate, and manage care. For example, therapists share relevant information with each other to coordinate your child's therapy plan.</p>
<p><strong>Payment:</strong> We may use or disclose health information to bill and collect payment for services, including submitting claims to insurance carriers or communicating with payers about coverage.</p>
<p><strong>Healthcare operations:</strong> We may use health information for internal quality improvement, staff training, compliance activities, and program evaluation.</p>
<p><strong>Required by law:</strong> We will disclose health information when required by federal, state, or local law, including mandatory abuse reporting obligations under Arkansas law.</p>
<p><strong>Public health and safety:</strong> We may disclose information to prevent a serious threat to the health or safety of a person or the public.</p>
<p><strong>Research:</strong> We may use de-identified information for program research and outcome evaluation. Identifiable information will not be used for research without your written authorization.</p>
<p><strong>All other uses and disclosures</strong> require your written authorization. You may revoke an authorization at any time in writing; revocation does not affect uses or disclosures already made in reliance on it.</p>
<h2>Your Rights</h2>
<p><strong>Right to access:</strong> You have the right to inspect and receive a copy of your child's health information held by Faith Reins. Requests should be made in writing. We will respond within 30 days.</p>
<p><strong>Right to amend:</strong> You may request that we correct or add to your child's health record if you believe it is inaccurate or incomplete. We may deny the request in certain circumstances and will explain any denial in writing.</p>
<p><strong>Right to an accounting:</strong> You may request a list of disclosures we have made of your child's health information, other than those for treatment, payment, or operations, for the prior six years.</p>
<p><strong>Right to request restrictions:</strong> You may ask us to limit how we use or disclose your child's health information. We are not required to agree, except in limited circumstances required by law.</p>
<p><strong>Right to confidential communications:</strong> You may request that we communicate with you in a specific way or at a specific location (e.g., by email only). We will accommodate reasonable requests.</p>
<p><strong>Right to a paper copy:</strong> You may request a paper copy of this Notice at any time, even if you agreed to receive it electronically.</p>
<p><strong>Right to be notified of a breach:</strong> You have the right to be notified if Faith Reins discovers a breach of your unsecured protected health information.</p>
<h2>Our Responsibilities</h2>
<p>Faith Reins is required by law to maintain the privacy of your child's health information, provide this Notice, and follow the terms of the Notice currently in effect. We reserve the right to change this Notice and to make the new provisions effective for all information we hold. An updated Notice will be posted on our website and available at our facility.</p>
<h2>Complaints</h2>
<p>If you believe your privacy rights have been violated, you may file a complaint with Faith Reins or with the U.S. Department of Health and Human Services Office for Civil Rights. You will not be retaliated against for filing a complaint.</p>
<p>To file a complaint with Faith Reins or to exercise any right described in this Notice, contact our Privacy Officer, <strong>Donna Horton</strong>, at <strong>info@faithreins.com</strong> or using the contact information below.</p>
${legalContact}</div></div></section>`);

add("/cancellation-policy", "Cancellation Policy", "Appointment cancellation, rescheduling, and no-show policy for Faith Reins therapy services.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Cancellation Policy</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>Why Consistent Attendance Matters</h2>
<p>Research shows that consistent attendance is one of the strongest predictors of progress in pediatric therapy. Regular sessions allow our therapists to build on each visit and maintain momentum toward your child's goals. When a session is cancelled, that time cannot easily be filled on short notice, which affects both your child's progress and our ability to serve other families on our waitlist.</p>
<p>We understand that life with children is unpredictable. This policy is not about penalties—it is about protecting your child's care and our capacity to serve our community.</p>
<h2>Cancellation Notice</h2>
<p>We ask for at least <strong>24 hours' notice</strong> for any cancellation or rescheduling. This gives us time to offer the slot to another family. To cancel or reschedule, contact us by phone or through your client portal.</p>
<p><strong>Same-day cancellations</strong> (less than 24 hours before the appointment) will be documented. Repeated same-day cancellations may affect scheduling priority or continued enrollment in the program.</p>
<h2>No-Shows</h2>
<p>A no-show occurs when a scheduled appointment is missed without any prior notice. No-shows place a significant strain on our schedule and prevent other children from receiving timely care. <strong>Two consecutive no-shows</strong> without contact may result in removal from the schedule. We will attempt to reach you before taking that step.</p>
<h2>Illness &amp; Emergencies</h2>
<p>We ask that you keep your child home if they are acutely ill (fever, vomiting, or a contagious condition). Please call us as soon as possible so we can plan accordingly. Illness-related cancellations are noted separately and will not count against you when they are communicated promptly. Genuine emergencies are treated with the same understanding.</p>
<h2>Therapist Cancellations</h2>
<p>On rare occasions, Faith Reins may need to cancel or reschedule a session due to therapist illness, facility conditions, or other circumstances. We will notify you as early as possible and prioritize rescheduling at a time that works for your family.</p>
<h2>Repeated Cancellations</h2>
<p>If a pattern of cancellations develops that is affecting your child's progress or our scheduling, your care coordinator will reach out to discuss options. We want to find a schedule that works for your family and keep your child's treatment on track.</p>
<h2>Questions</h2>
<p>If you have questions about this policy or need help finding a schedule that works for your family, please talk with your care coordinator or contact us directly.</p>
${legalContact}</div></div></section>`);

add("/equine-safety", "Equine Safety & Liability Notice", "Safety guidelines and liability notice for equine-assisted activities at Faith Reins.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Equine Safety &amp; Liability Notice</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<div class="notice"><strong>Arkansas Equine Liability Act Notice:</strong> Under Arkansas law (Ark. Code § 16-120-201 et seq.), an equine activity sponsor or equine professional is not liable for an injury to or the death of a participant in equine activities resulting from the inherent risks of equine activities.</div>
<h2>Inherent Risks of Equine Activities</h2>
<p>Equine-assisted activities involve interaction with horses, which are large, unpredictable animals. Inherent risks include, but are not limited to:</p>
<ul>
  <li>Unpredictable behavior by a horse in response to sudden movement, sound, or other stimuli.</li>
  <li>Hazards of the ground surface, including uneven terrain, mud, and natural obstacles.</li>
  <li>Falls from a horse or from horse-related equipment.</li>
  <li>Injury from contact with a horse, including biting, kicking, or crushing.</li>
  <li>Failure of tack or equipment.</li>
</ul>
<p>Participation in any equine activity at Faith Reins requires a signed assumption-of-risk and informed consent form, which families complete as part of the intake process.</p>
<h2>Safety Practices</h2>
<p>Faith Reins takes the safety of every participant, volunteer, and staff member seriously. Our practices include:</p>
<ul>
  <li><strong>Helmets required:</strong> ASTM/SEI-certified helmets are required for all mounted activities and are provided by Faith Reins at no charge. Participants may bring their own properly fitted, certified helmet.</li>
  <li><strong>Qualified staff:</strong> All equine activities are led or directly supervised by trained staff members who hold relevant equine-assisted services credentials.</li>
  <li><strong>Horse evaluation:</strong> Our horses are selected and regularly evaluated for temperament, health, and suitability for therapeutic work.</li>
  <li><strong>Ground rules:</strong> Participants and observers are briefed on safe behavior around horses before every session—no running, no sudden loud noises, and no approaching a horse from behind.</li>
  <li><strong>Participant-to-staff ratios:</strong> Staffing ratios are maintained to ensure each participant receives appropriate supervision during equine activities.</li>
  <li><strong>Medical information:</strong> We collect relevant medical and behavioral information during intake to ensure each child's safety plan is individualized.</li>
</ul>
<h2>Observer Safety</h2>
<p>Family members and observers are welcome to watch sessions from designated viewing areas. Observers must remain in those areas during equine activities and follow staff directions at all times. Children who are not participants must be supervised by a parent or guardian and may not enter the horse areas without staff permission.</p>
<h2>Incident Reporting</h2>
<p>Any injury, near-miss, or unsafe condition must be reported to a Faith Reins staff member immediately. All incidents are documented and reviewed. We take every report seriously as part of our commitment to continuous safety improvement.</p>
<h2>Questions</h2>
<p>If you have questions about our safety practices, our horses, or what to expect during an equine session, please ask your care coordinator or <a href="/contact">contact us</a> before your first visit.</p>
${legalContact}</div></div></section>`);

add("/photo-consent", "Photo & Media Consent Policy", "How Faith Reins uses photographs and videos of clients, families, and participants.",
  `<section class="section"><div class="container"><div class="prose">
<h1>Photo &amp; Media Consent Policy</h1>
<p class="lead muted">Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas</p>
<h2>Our Commitment</h2>
<p>Faith Reins Equestrian Center respects the privacy and dignity of every child, family, and participant in our programs. We take photographs and videos to share our mission, celebrate our community, and connect with supporters — and we do so only with explicit consent from the families involved.</p>
<h2>When Photographs and Videos Are Taken</h2>
<p>Faith Reins may photograph or video during therapy sessions, equine-assisted learning activities, events, and program activities. Images may be taken by Faith Reins staff or authorized volunteers. We do not photograph children during sensitive moments, and we always prioritize a child's comfort and dignity.</p>
<h2>How Media May Be Used</h2>
<p>With signed consent, images and video may be used for:</p>
<ul>
  <li>The Faith Reins website (faithreins.org)</li>
  <li>Official Faith Reins social media accounts (Facebook, Instagram, and similar)</li>
  <li>Print and digital materials including newsletters, brochures, and fundraising appeals</li>
  <li>Grant applications and donor communications</li>
  <li>Media coverage and press releases</li>
</ul>
<p>Images will never be sold, shared with unaffiliated third parties, or used in a way that could embarrass, identify, or harm a participant.</p>
<h2>Consent Requirement</h2>
<p>A signed Photo &amp; Media Consent form is required before any image of a child or family member may be used publicly. Consent forms are provided as part of the intake process. Consent is entirely voluntary — declining will have no effect on the services your child receives.</p>
<p>Consent may be granted for some uses and withheld for others (for example, consenting to website use but not social media). We will honor any restrictions noted on the consent form.</p>
<h2>Withdrawing Consent</h2>
<p>You may withdraw consent at any time by contacting us in writing at <a href="mailto:info@faithreins.com">info@faithreins.com</a>. We will remove images from active use as promptly as reasonably possible. Please note that materials already in print or distributed prior to withdrawal cannot be recalled, but we will not use the images going forward.</p>
<h2>Identification</h2>
<p>By default, we do not use a child's full name alongside their photograph in public materials. If you consent to identification — for example, a first name in a caption — that preference should be noted on your consent form.</p>
<h2>Volunteers and Staff</h2>
<p>Team members and volunteers are also subject to this policy. Staff and volunteers grant implied consent to being photographed or filmed in the course of their work at Faith Reins events and activities, but may request that specific images not be used by contacting us.</p>
<h2>Third Parties</h2>
<p>Families, visitors, and community members may not photograph or record other participants, children, or clients without Faith Reins' permission and the consent of the individuals involved. This applies at all events and on all Faith Reins property.</p>
<h2>Questions</h2>
<p>Questions about this policy or requests related to specific images should be directed to us at <strong>info@faithreins.com</strong>.</p>
${legalContact}</div></div></section>`);

// ── Blog / News ───────────────────────────────────────────────────────────────

const POSTS = [
  {
    slug: "/news/summer-eal-program-2026",
    title: "A Season of Growth: Summer EAL Recap",
    date: "August 20, 2026",
    tag: "Programs",
    summary: "This summer's equine-assisted learning program wrapped up with some of our biggest participant milestones yet. Here's a look at what our herd — and our kids — accomplished together.",
    body: `<p>Every summer, our barn becomes a classroom. This year, twelve children and teens participated in Faith Reins' equine-assisted learning sessions over eight weeks. Each session was different — and each one was exactly what someone needed.</p>
<p>One participant, a nine-year-old who had struggled to make eye contact in almost every setting, began holding eye contact with Banita Joe during grooming by the fourth week. By week seven, he was narrating what he was doing out loud — unprompted — while his therapist watched from a few steps back.</p>
<p>"The horse does something we can't," said Donna Horton, our EAL Coordinator. "She waits without judgment. She doesn't rush. Kids feel that."</p>
<p>Jesse and Jack both logged their highest number of session hours this summer. Cowboy, our steadiest team member, was the go-to partner for first-time participants who needed a little more time before approaching the fence.</p>
<p>We're grateful to every family who trusted us with your child this summer, and to our incredible clinical team who made each session thoughtful, safe, and meaningful. Registration for fall EAL opens in September. Contact us if you'd like to be notified when spots open.</p>`,
  },
  {
    slug: "/news/welcome-second-slp",
    title: "Growing Our Clinical Team",
    date: "September 5, 2026",
    tag: "Team",
    summary: "Faith Reins is actively recruiting a second Speech-Language Pathologist to meet growing demand for speech and language services in South Arkansas.",
    body: `<p>We have more children who need speech and language services than we currently have capacity to serve. That's not a complaint — it's a call to action, and we're answering it.</p>
<p>Faith Reins is currently hiring a second licensed Speech-Language Pathologist to join our clinical team in Camden, Arkansas. This is a full-time position serving children from infancy through age 18 across a wide range of communication and feeding needs.</p>
<p>What makes this role different from a traditional clinical setting? Our SLPs work in collaboration with OT, PT, and our EAL program. Some sessions happen in the barn. Goals that can be addressed through equine-assisted methods often are — and the results speak for themselves.</p>
<p>If you are a licensed SLP looking for meaningful work in a faith-centered, family-focused environment, we'd love to hear from you. More information is available on our <a href="/join-our-team">Join Our Team</a> page, or you can email your résumé directly to <a href="mailto:info@faithreins.com">info@faithreins.com</a>.</p>
<p>Please share this with any SLP you know who might be interested. Referrals from our own community mean a great deal.</p>`,
  },
  {
    slug: "/news/faith-reins-mission",
    title: "Why We Do This: Faith, Horses, and Healing",
    date: "October 1, 2026",
    tag: "Mission",
    summary: "A letter from our founder and EAL Coordinator, Donna Horton, on what drives Faith Reins and why South Arkansas families deserve this kind of care close to home.",
    body: `<p>When I started Faith Reins, the question I heard most often was: why here? Why Camden? Why horses?</p>
<p>The answer has never changed. The children who need this kind of care are already here. They are in our schools, our churches, and our neighborhoods. They deserve access to excellent, compassionate therapy without driving two hours each way.</p>
<p>Horses have a way of cutting through the noise. They are present in a way that is hard to describe until you've seen a child who barely speaks find their voice while brushing a horse's flank. The clinical literature supports it, but the real evidence is in the barn on a Tuesday afternoon.</p>
<p>Faith is the other part of this. It shapes how we treat every family — with dignity, with hope, and with the belief that every child has something to grow into. We do not require any particular faith from the families we serve. We simply bring ours to the work.</p>
<p>We are still a young organization, and there is much ahead of us. More staff to hire, more horses to care for, more children to serve. Your support — in prayer, in giving, in sending a family our way — makes every part of this possible.</p>
<p>Thank you for being part of this.</p>
<p><em>— Donna Horton, Founder &amp; EAL Coordinator</em></p>`,
  },
];

POSTS.forEach(({ slug, title, date, tag, summary, body }) =>
  add(slug, `${title} | Faith Reins News`, summary,
    `<section class="section"><div class="container"><div class="prose">
<p class="post-meta"><a href="/news">← News &amp; Updates</a> &nbsp;·&nbsp; <span class="post-tag">${tag}</span> &nbsp;·&nbsp; ${date}</p>
<h1>${title}</h1>
<p class="lead muted">${summary}</p>
<hr style="border:none;border-top:1px solid #e0dbd4;margin:1.5rem 0">
${body}
<style>.post-meta{font-size:.85rem;color:#888;margin-bottom:1.5rem}.post-tag{background:#e8f0e9;color:#3a6642;border-radius:4px;padding:.2em .55em;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em}</style>
</div></div></section>` +
    section(cta({ h2: "Want to stay connected?", p: "Sign up for updates from Faith Reins.", buttons: [btn("Contact us", "/contact"), btn("Our programs", "/services-programs", "secondary")] }), "section--paper")));

add("/news", "News & Updates | Faith Reins", "Stories, program updates, and news from Faith Reins Equestrian Center in Camden, Arkansas.",
  hero({ key: "our-mission", h1: "News &amp; Updates", body: "Stories, program updates, and announcements from Faith Reins.", short: true }) +
  section(grid(1, POSTS.map(({ slug, title, date, tag, summary }) =>
    `<a class="post-card" href="${slug}"><div class="post-card__meta"><span class="post-tag">${tag}</span><span class="post-date">${date}</span></div><h2 class="post-card__title">${title}</h2><p class="post-card__summary">${summary}</p><span class="post-card__read">Read more →</span></a>`
  )) + `<style>
.post-card{display:block;background:var(--color-paper,#f7f5f0);border-radius:10px;padding:1.75rem 2rem;text-decoration:none;color:inherit;transition:box-shadow .15s}
.post-card:hover{box-shadow:0 4px 18px rgba(0,0,0,.08)}
.post-card__meta{display:flex;gap:.75rem;align-items:center;margin-bottom:.75rem}
.post-date{font-size:.85rem;color:#888}
.post-tag{background:#e8f0e9;color:#3a6642;border-radius:4px;padding:.2em .55em;font-size:.8rem;font-weight:600;text-transform:uppercase;letter-spacing:.04em}
.post-card__title{font-family:'Noto Serif',serif;font-size:1.35rem;margin:0 0 .6rem}
.post-card__summary{color:#555;margin:0 0 1rem;line-height:1.6}
.post-card__read{font-size:.875rem;color:#3a6642;font-weight:600}
</style>`) +
  section(cta({ h2: "Subscribe for updates", p: "We share news a few times a year. No spam.", buttons: [btn("Contact us", "/contact")] }), "section--paper"));

export { pages };
