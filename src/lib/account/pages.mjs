import { titleBand, section, sh, infoGrid } from '../lib.mjs';

export const ACCOUNT_PAGES = [
  { route: '/account', view: 'overview', label: 'Overview', heading: 'Your place in the mission.', lead: 'Your purchases, giving and account details, together in one place.' },
  { route: '/account/orders', view: 'shop', label: 'My Orders', heading: 'Your orders.', lead: 'Review your Faith Reins purchases and find the details you need.' },
  { route: '/account/giving', view: 'giving', label: 'My Giving', heading: 'Your generosity. Your history.', lead: 'Review your contributions and find available receipts for your gifts.' },
  { route: '/account/recurring', view: 'recurring', label: 'Recurring Giving', heading: 'Your ongoing support.', lead: 'Review recorded payments for your recurring gifts and connect with us about changes.' },
  { route: '/account/profile', view: 'profile', label: 'Profile & Settings', heading: 'Your account details.', lead: 'Keep your name and contact phone up to date.' },
  { route: '/account/order', view: 'order', label: 'Order Details', heading: 'The details, all here.', lead: 'Review a purchase or gift and find its available receipts.' },
];
export function registerAccountPages(add) {
  for (const page of ACCOUNT_PAGES) {
    const returnTo = page.route === '/account/order' ? '/account.html' : page.route + '.html';
    const login = '/api/auth/login?returnToUrl=' + encodeURIComponent(returnTo);
    const nav = ACCOUNT_PAGES.filter(p => p.view !== 'order').map(p => `<a href="${p.route}"${page.route === p.route ? ' aria-current="page"' : ''}>${p.label}<span aria-hidden="true">↗</span></a>`).join('');
    const body = titleBand({ eyebrow: 'My Account', title: page.heading, body: page.lead }) + section(`
      <div class="account-app" data-account data-account-view="${page.view}" data-account-order-route="/account/order">
        <div class="account-state" data-account-loading role="status"><span class="eyebrow">A moment, just for you</span><p>Loading your account…</p><div class="account-skeleton" aria-hidden="true"></div></div>
        <div class="account-sign-in" data-account-signed-out hidden><div><span class="eyebrow">Welcome back</span><h2>Stay connected to Faith Reins.</h2><p>Sign in or create an account to view your purchases, giving history and profile.</p><a class="btn" data-account-login href="${login}">Sign in / Create account</a></div><div class="account-sign-in__aside"><span class="eyebrow">One account. More connection.</span><p>Your orders.<br>Your generosity.<br>Your details.</p><span>Private, and always yours.</span></div></div>
        <div class="account-state" data-account-problem hidden><h2>Let’s try that again.</h2><p data-account-error role="alert"></p><div class="btn-row"><button class="btn btn--outline" type="button" data-account-retry>Try again</button><a class="tlink" href="${login}">Sign in again</a><a class="tlink" href="/contact#account-help">Get account help</a></div></div>
        <div class="account-layout" data-account-member hidden><aside class="account-sidebar"><p class="eyebrow">Your account</p><p class="account-member-name" data-account-name></p><nav aria-label="Account navigation">${nav}</nav><form method="post" action="/api/auth/logout?returnToUrl=%2Faccount.html"><button class="tlink account-sign-out" type="submit" data-account-logout>Sign out</button></form></aside><div class="account-content" data-account-content aria-live="polite"></div></div>
        <noscript>Please enable JavaScript to view your account. <a href="${login}">Sign in</a> or <a href="/contact#account-help">contact our team</a> for assistance.</noscript>
      </div>`, { pad: 'tight' }) + section(sh({ eyebrow: 'A little extra help', title: 'We’re here for you.', size: 'sm' }) + infoGrid([
      { title: 'Order help', body: 'Missing an older or guest purchase? We can help verify and locate it.', link: ['Ask about an order', '/contact#account-help'] },
      { title: 'Giving support', body: 'For changes to an existing recurring gift or a receipt question, connect with our team.', link: ['Get giving assistance', '/contact#account-help'] },
      { title: 'Your care', body: 'For therapy information or questions about your child’s care, speak with our team.', link: ['Contact Faith Reins', '/contact#contact-intake'] },
    ]), { tone: 'paper' });
    add(page.route, page.view === 'overview' ? 'My Account' : page.label, page.lead, body, null, { noindex: true });
  }
}
