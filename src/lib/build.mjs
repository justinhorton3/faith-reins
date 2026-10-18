// Page registry consumed by src/pages/[...slug].astro. Design System v6.
import { pages, add } from "./pages-main.mjs";
import { section, sh, titleBand, ctaBand } from "./lib.mjs";
import { RECURRING_GIFT_HELP } from "./giving-support.mjs";
import { NEWS_POSTS, WITHHELD_NEWS_SLUGS, newsDate, newsTime } from "./news.mjs";

/* ---------- Policies ---------- */
const legalContact = `<div class="card"><p><strong>Questions?</strong> Email <a href="mailto:info@faithreins.com">info@faithreins.com</a>, <a href="/contact">contact us online</a>, or visit us in Camden, Arkansas.</p></div>`;
const printBtn = `<div class="print-btn-wrap"><button class="print-btn" type="button" onclick="window.print()">Print this page</button></div>`;

add("/terms-of-service", "Terms of Service", "Terms of Service for the Faith Reins website.",
  titleBand({ eyebrow: "Policies", title: "Terms of Service", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Privacy Policy", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
<h2>1. Overview</h2>
<p>Faith Reins Equestrian Center is committed to protecting the privacy of the children, families, and supporters who interact with us. This policy explains what information we collect through this website, how we use it, and your rights. It governs information collected through faithreins.com and related online forms only. Information collected during the delivery of clinical services is handled under a separate HIPAA Notice of Privacy Practices provided at intake.</p>
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
  titleBand({ eyebrow: "Policies", title: "Donation Policy", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
<h2>Our Commitment to Stewardship</h2>
<p>Faith Reins Equestrian Center is a nonprofit organization exempt from federal income tax under Section 501(c)(3) of the Internal Revenue Code. Gifts to Faith Reins are tax-deductible to the extent permitted by law. Every gift is treated as a sacred responsibility and used faithfully to advance our mission.</p>
<h2>How Gifts Are Used</h2>
<p>Donations support direct care (therapy sessions, program materials, and family support), equine program costs (care, feed, veterinary services, and safety equipment), facility maintenance, scholarships for families who cannot afford the full cost of services, and organizational operations. Gifts designated for a specific purpose will be honored to the extent practicable; if a designated purpose becomes impractical or is fully funded, we will contact the donor to discuss an alternative.</p>
<h2 id="recurring-gifts">Recurring Gifts</h2>
<p>Recurring gifts are available when the giving portal offers that option. By authorizing a recurring gift, you consent to automatic charges at the selected interval. ${RECURRING_GIFT_HELP} <a href="/contact#account-help">Get giving assistance</a> or email <a href="mailto:info@faithreins.com">info@faithreins.com</a>.</p>
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
  titleBand({ eyebrow: "Policies", title: "Returns &amp; Shipping Policy", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Volunteer Policy", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Accessibility", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Notice of Privacy Practices", body: "Effective October 10, 2026 &nbsp;·&nbsp; THIS NOTICE DESCRIBES HOW HEALTH INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY." }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Cancellation Policy", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Equine Safety &amp; Liability Notice", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
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
  titleBand({ eyebrow: "Policies", title: "Photo &amp; Media Consent Policy", body: "Effective October 10, 2026 &nbsp;·&nbsp; Camden, Arkansas" }) +
  `<section class="sec"><div class="sec__in"><div class="prose">${printBtn}
<h2>Our Commitment</h2>
<p>Faith Reins Equestrian Center respects the privacy and dignity of every child, family, and participant in our programs. We take photographs and videos to share our mission, celebrate our community, and connect with supporters — and we do so only with explicit consent from the families involved.</p>
<h2>When Photographs and Videos Are Taken</h2>
<p>Faith Reins may photograph or video during therapy sessions, equine-assisted learning activities, events, and program activities. Images may be taken by Faith Reins staff or authorized volunteers. We do not photograph children during sensitive moments, and we always prioritize a child's comfort and dignity.</p>
<h2>How Media May Be Used</h2>
<p>With signed consent, images and video may be used for:</p>
<ul>
  <li>The Faith Reins website (faithreins.com)</li>
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


/* ---------- News ---------- */
const POSTS = [...NEWS_POSTS].sort((a, b) => newsTime(b.date) - newsTime(a.date));

POSTS.forEach(({ slug, title, date, updated, tag, summary, body }) => {
  add(slug, `${title} | News`, summary,
    section(`<p class="post-meta"><a href="/news">News &amp; Updates</a><span>${tag}</span><time datetime="${date}">${newsDate(date)}</time>${updated ? `<span>Updated ${newsDate(updated)}</span>` : ""}</p>` + sh({ title, body: summary, h: 1 }), { tone: "sand", pad: "tight", cls: "sec--title" }) +
    section(`<div class="prose">${body}</div>`) +
    ctaBand({ title: "Stay connected", body: "Contact our team to request email updates or ask about opening plans.", primary: ["Request updates", "/contact"], secondary: ["All news & updates", "/news"] }));
});

WITHHELD_NEWS_SLUGS.forEach(slug => add(`/news/${slug}`, "Update unavailable | News", "Find current news and opening information from Faith Reins.",
  titleBand({ eyebrow: "News & Updates", title: "Find our latest updates", body: "This earlier update is no longer available. Visit News & Updates for current opening and program information." }) +
  ctaBand({ title: "Stay connected", body: "Our team can answer questions about opening plans, programs and ways to get involved.", primary: ["News & Updates", "/news"], secondary: ["Contact us", "/contact"] })));

// Wix Blog posts have no static page; this one page renders any of them by ?slug=.
// site.js links Wix post cards here and fills the body from the Blog API.
add("/news/post", "News", "News and updates from Faith Reins Equestrian Center in Camden, Arkansas.",
  section(`<div class="prose" data-wix-post data-slug-param="slug"><p class="post-meta"><a href="/news">← News &amp; updates</a></p><p>Loading post…</p></div>`) +
  ctaBand({ title: "Stay connected", body: "Contact our team to request email updates.", primary: ["Request updates", "/contact"], secondary: ["All news & updates", "/news"] }));

add("/news", "News & Updates", "Stories, program updates, and news from Faith Reins Equestrian Center in Camden, Arkansas.",
  titleBand({ eyebrow: "Stay connected", title: "News &amp; Updates", body: "Opening announcements, program updates, and stories from Faith Reins. We are preparing to open; details will be shared here as they are confirmed." }) +
  section(`<div class="posts" id="news-grid" data-wix-blog>${POSTS.map(({ slug, title, date, tag, summary }) =>
    `<a class="post-card" href="${slug}" data-post-date="${date}"><span class="post-card__meta"><span class="post-tag">${tag}</span><time class="post-date" datetime="${date}">${newsDate(date)}</time></span><span class="post-card__title">${title}</span><span class="post-card__summary">${summary}</span><span class="post-card__read">Read more →</span></a>`).join("")}</div>`) +
  ctaBand({ tone: "sand", title: "Request email updates", body: "Contact our team if you would like to receive Faith Reins news and opening announcements.", primary: ["Request updates", "/contact"] }));

export { pages };
