// Source-owned updates. Publish only facts confirmed by the organization.
export const NEWS_POSTS = [
  {
    slug: "/news/faith-reins-mission",
    title: "Why We Do This: Faith, Care, and Connection",
    date: "2026-10-01",
    updated: "2026-10-18",
    tag: "Mission",
    summary: "The purpose behind Faith Reins: bringing therapy, counseling, family support, and purposeful equine experiences together for children and families.",
    body: `<p>Faith Reins brings therapy, counseling, family support, and purposeful equine experiences together to help children and families thrive.</p>
<p>Faith guides the mission and the care we are preparing to offer. Our goal is to welcome children and families with dignity, compassion, and a sense of belonging.</p>
<p>Clinical services and equine-assisted learning have different roles. Equine-assisted learning is a nonclinical program; it is not a substitute for therapy or counseling. Families can explore each service to understand its purpose and the appropriate next step.</p>
<p>As we prepare to open, we are building the foundations for this work. Learn more about <a href="/our-mission">our mission</a>, explore <a href="/services-programs">our services and programs</a>, or <a href="/get-involved">find a way to get involved</a>.</p>`,
  },
  {
    slug: "/news/preparing-to-open",
    title: "Preparing to Welcome Children and Families",
    date: "2026-10-18",
    tag: "Opening updates",
    summary: "Faith Reins is preparing to open. Here is how to stay connected and ask about services, referrals, and ways to support the mission.",
    body: `<p>Faith Reins is preparing to open and is not yet open for care. We will share opening announcements and program updates here as details are confirmed.</p>
<h2>For families</h2><p>Explore our planned services and programs, or <a href="/book-online">request a callback</a> to ask questions. A callback request is a conversation with our team; it does not reserve an appointment or confirm a start date.</p>
<h2>For referring providers</h2><p>Visit <a href="/for-referring-providers">For Providers</a> for information about service fit and referral requirements. Please contact our team before sending patient information, and do not include clinical details in public website forms.</p>
<h2>For supporters</h2><p>Visit <a href="/get-involved">Get Involved</a> to explore ways to support children, families, and our equine partners as we prepare for the work ahead.</p>
<p>For current opening information or to request email updates, <a href="/contact">contact Faith Reins</a>.</p>`,
  },
];

// These legacy stories contain unverified participation, outcome, or hiring claims.
// Retain useful, noindex landing pages, but do not revive them through Wix hydration.
export const WITHHELD_NEWS_SLUGS = ["summer-eal-program-2026", "welcome-second-slp"];
export const newsSlug = value => String(value || "").replace(/^\/news\//, "").replace(/\.html$/, "");
export const isWithheldNews = value => WITHHELD_NEWS_SLUGS.includes(newsSlug(value));
export const newsTime = value => Number.isFinite(Date.parse(value)) ? Date.parse(value) : 0;
export const newsDate = value => newsTime(value) ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : "Date unavailable";
export function sortNewsCards(host) {
  [...host.querySelectorAll("a.post-card")]
    .sort((a, b) => newsTime(b.dataset.postDate) - newsTime(a.dataset.postDate))
    .forEach(card => host.append(card));
}
