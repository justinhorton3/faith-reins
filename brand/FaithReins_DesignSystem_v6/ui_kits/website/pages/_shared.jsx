const A = '../../assets/';
// Mobile focal points, set from a crop review at 375px so the child or person stays in frame.
const MOBILE_FOCUS = { 'book-online': '12% 50%', contact: '22% 50%', counseling: '88% 50%', 'for-families': '72% 50%', give: '82% 50%', 'for-referring-providers': '58% 50%', 'speech-language-therapy': '35% 50%' };
const heroImg = (slug) => ({ image: A + 'heroes/desktop/hero-' + slug + '-desktop.webp', mobileImage: A + 'heroes/mobile/hero-' + slug + '-mobile.webp', mobileImagePosition: MOBILE_FOCUS[slug] || '50% 50%' });
const PHONE = '(870) 555-0142';
const EMAIL = 'hello@faithreins.org';
window.PAGES = window.PAGES || {};
function definePage(slug, meta) { window.PAGES[slug] = meta; }
Object.assign(window, { A, heroImg, PHONE, EMAIL, definePage });
