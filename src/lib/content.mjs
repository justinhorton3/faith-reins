// Fallback copy for the CMS-backed blocks. The build renders these into the HTML;
// in the browser, src/scripts/cms.js replaces each block with the live Wix CMS items
// (collections Team, Horses, Testimonials, FAQ, Sponsors) when the collection has any.
// scripts/seed-cms.mjs seeds the collections from `fallback` below.
import { img } from "./lib.mjs";

/* Horses: names and bios as the team wrote them. */
export const HORSES = [
  { name: "Jesse", key: "horse-biscuit", eyebrow: "Steady and patient", body: "Jesse is the kind of horse that makes you slow down. Patient and steady, he has a gift for meeting children exactly where they are — not rushing, not reacting, just present. Many kids meet Jesse first, and something about that first calm encounter sets the tone for everything that follows." },
  { name: "Jack", key: "horse-captain-carrot", eyebrow: "Alert and curious", body: "Jack is alert, curious, and not afraid to let you know it. He pays close attention to the people around him, which makes him a natural partner for children who are working on communication and connection. He keeps things interesting — and the kids who click with him tend to really click with him." },
  { name: "Banita Joe", key: "horse-maple", eyebrow: "Gentle and careful", body: "Banita Joe is gentle in a way that feels intentional. She listens carefully, moves with care, and has a particular patience for children who need a little more time to feel comfortable. She is a trusted partner for younger participants and for anyone taking their first steps with horses." },
  { name: "Cowboy", key: "horse-cowboy", eyebrow: "Reliable and grounded", body: "Cowboy is the steady hand of the herd — reliable, grounded, and always where you need him to be. He carries himself with the kind of quiet confidence that tends to rub off on the children working alongside him. His care is generously supported by the McTigrit Family, whose commitment to our horses makes programs like this possible.", note: "Support provided by the McTigrit Family." },
];

/* Team: [name, role, credentials, bio, avatar key] */
export const TEAM = [
  ["Donna Horton", "Founder, CEO & EAL Coordinator", "PATH Intl. Certified", "Donna founded Faith Reins out of a deep conviction that every child in South Arkansas deserves access to high-quality therapy and the unique healing that horses make possible. She leads our Equine-Assisted Learning program, designing experiences that help children build confidence, trust, and regulation alongside our horses. With a background in ministry and family services, she assembled the clinical team, secured the facility, and built the community partnerships that keep the mission moving forward.", "avatar-a"],
  ["Sample Name", "Clinical Director", "O.T.D., OTR/L", "As a doctorally prepared occupational therapist, our Clinical Director brings deep expertise in pediatric sensory processing, fine motor development, and daily living skills alongside the administrative oversight that keeps our programs running well. They oversee therapy quality, clinical supervision, and individualized care planning across all services — and still carry a caseload, because they believe the best clinical leaders stay close to the work.", "avatar-b"],
  ["Sample Name", "Speech-Language Pathologist", "M.S., CCC-SLP", "Our SLP works with children on articulation, language development, social communication, and feeding. They take time to understand each child's communication style before jumping to a plan — because how a child communicates is personal, and the goal is always real-world connection, not just test scores. They particularly enjoy watching nonverbal or minimally verbal children find new ways to make themselves understood.", "avatar-c"],
  ["Sample Name", "Physical Therapist", "D.P.T.", "Our PT supports children with gross motor development, strength, balance, coordination, and mobility. They work closely with families to translate clinical progress into practical gains — whether that means climbing the playground structure, keeping up with a sibling, or simply feeling steady and confident in their own body. They bring a calm, encouraging energy to every session.", "avatar-a"],
  ["Sample Name", "Licensed Professional Counselor", "M.S., LPC", "Our counselor provides a safe, steady space for children and teens to process big feelings, build coping skills, and work through challenges at home or school. Using age-appropriate, evidence-based approaches — including play therapy for younger children — they meet each child where they are. They also partner closely with parents, because lasting emotional growth happens at home too.", "avatar-b"],
];

/* Home page testimonials. */
export const TESTIMONIALS = [
    { quote: "We had tried everything before coming to Faith Reins. Within a few months our son was communicating in ways we had never seen. The team here changed our family.", name: "A Camden family" },
    { quote: "Watching my daughter walk up to Jesse for the first time and not flinch — that moment alone was worth everything. She is a different kid on the days she has EAL.", name: "Parent of a 9-year-old" },
    { quote: "The therapists here actually listen. They adjusted the plan when something wasn't working and explained every step. I finally feel like we have a real team on our side.", name: "Mother of a 5-year-old" },
];

/* FAQ: [group, [[question, answerHtml], ...]] */
export const FAQ_GROUPS = [
  ["Getting started", [
    ["How do I get started?", "<a href='/book-online'>Request a callback</a> or <a href='/contact'>call or email us</a>. Our team will follow up to learn about your child and walk through next steps."],
    ["Do I need a referral?", "You can contact us before arranging a referral. Clinical services require physician approval and a treatment plan; intake will confirm the requirements for your service and coverage. Equine-assisted learning does not require a clinical referral."],
    ["Who can Faith Reins serve?", "We serve children and teens from birth through age 18 in South Arkansas. If you are unsure whether we are the right fit, contact us and we will guide you honestly."],
    ["How long does it take to get an appointment?", "Wait times vary by service and availability. Contact our team for current scheduling. We do our best to move quickly for families with urgent needs."],
  ]],
  ["Sessions & care", [
    ["How long are sessions?", "Sessions are typically 30 to 60 minutes depending on the service, your child's age, and their individual plan. Your therapist will discuss the right length for your child at intake."],
    ["Do parents stay during sessions?", "Yes — we encourage it. Family involvement is a core part of how we work. Your therapist will tell you when it helps to observe, participate, or wait nearby."],
    ["What should my child wear?", "Comfortable clothes they can move in. Closed-toe shoes are required for any activity around the horses. We will remind you of anything specific before your first visit."],
    ["How often will my child be seen?", "Frequency depends on your child's goals and plan. Most children are seen once or twice a week. Your therapist will recommend a schedule and adjust it as your child progresses."],
    ["Can my child receive more than one service?", "Often yes. Many children benefit from a combination of services. Our team will help identify the right mix and coordinate care across disciplines."],
  ]],
  ["Insurance & payment", [
    ["Do you accept insurance?", "We work with major commercial insurance plans and are committed to serving families enrolled in ARKids First and Arkansas Medicaid. Coverage depends on your specific plan. Contact us and we will help you verify your benefits before your first visit."],
    ["What if I cannot afford care?", "Cost should not be the reason a child goes without care. We offer need-based financial assistance funded by donor gifts and our scholarship program. The conversation is confidential — just ask."],
    ["What does a session cost?", "Costs vary by service and coverage. We will give you a clear estimate before care begins. See <a href='/payment-and-insurance'>Payment &amp; Insurance</a> for a full overview."],
  ]],
  ["Equine programs", [
    ["Is equine-assisted learning safe?", "Yes. All equine activities are led by trained staff, conducted in a supervised setting, and begin with a safety orientation. Helmets are required and provided. See our <a href='/equine-safety'>Equine Safety notice</a> for full details."],
    ["Is EAL the same as therapy?", "No. Equine-Assisted Learning is an experiential learning program — not a clinical therapy service. It complements clinical care by building confidence, emotional regulation, and communication skills in a relational, hands-on setting."],
    ["Does my child need to have horse experience?", "Not at all. Most children who come to EAL have never been near a horse. Our staff introduces every child to the horses at their own pace."],
    ["Can a child do both EAL and clinical therapy?", "Yes, and we often recommend it. EAL and clinical services are designed to complement each other. Your care team will help determine whether the combination makes sense for your child."],
  ]],
  ["For providers", [
    ["How do I refer a patient?", "Contact our intake team through the <a href='/contact'>contact page</a> or visit <a href='/for-referring-providers'>For Referring Providers</a>. Our team will confirm requirements and the appropriate way to share referral information. Do not submit patient details through public website forms."],
    ["What information should I send?", "Reason for referral, relevant evaluations or progress notes if available, the child's age, and the family's preferred contact method. We will follow up with the family and confirm what else is needed."],
    ["Do you collaborate with referring providers?", "Yes. With family consent, we communicate with referring physicians, schools, and other providers to coordinate care. Coordination is part of how we work, not an exception."],
  ]],
  ["Giving & volunteering", [
    ["How can I support Faith Reins?", "The most direct way is a gift through our <a href='/give'>Give page</a>. You can also sponsor a horse, explore <a href='/sponsorships'>sponsorship opportunities</a>, or <a href='/volunteer'>volunteer</a>."],
    ["Is my donation tax-deductible?", "Yes. Faith Reins is a 501(c)(3) nonprofit. All gifts are tax-deductible to the extent permitted by law. See our <a href='/donation-policy'>Donation Policy</a> for details."],
    ["Can I volunteer if I have no horse experience?", "Absolutely. Many of our volunteer roles do not involve horses at all. Those that do include full training. Visit <a href='/volunteer'>Volunteer With Us</a> to learn more."],
  ]],
];

/* Fallback copy in the item shape the block renderers take (src/lib/blocks.mjs). */
export const fallback = {
  team: TEAM.map(([name, role, credentials, bio, av]) => ({ name, role, credentials, bio, photo: img(av) })),
  horses: HORSES.map((h) => ({ name: h.name, trait: h.eyebrow, bio: h.body, note: h.note || "", photo: img(h.key) })),
  testimonials: TESTIMONIALS.map((t) => ({ quote: t.quote, name: t.name, context: t.context || "" })),
  faq: FAQ_GROUPS.flatMap(([category, qs]) => qs.map(([question, answer]) => ({ category, question, answer }))),
  sponsors: [],
};

