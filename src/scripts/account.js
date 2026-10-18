import { RECURRING_GIFT_HELP } from '../lib/giving-support.mjs';
// Account data stays in this page's memory. Wix manages the HttpOnly member session.
const host = document.querySelector('[data-account]');
if (host) {
  const $ = selector => host.querySelector(selector);
  const content = $('[data-account-content]');
  const memberArea = $('[data-account-member]');
  const name = $('[data-account-name]');
  const view = host.dataset.accountView || 'overview';
  let profile = null;
  let generation = 0;
  const h = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'onClick') node.addEventListener('click', value);
      else if (key === 'onSubmit') node.addEventListener('submit', value);
      else if (value !== false && value != null) node.setAttribute(key, value === true ? '' : String(value));
    }
    node.append(...children.flat().filter(child => child != null));
    return node;
  };
  const money = (value, currency) => {
    if (value == null || !currency) return 'Amount unavailable';
    try { return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(value)); }
    catch { return 'Amount unavailable'; }
  };
  const date = value => {
    const parsed = new Date(value);
    return Number.isFinite(parsed.getTime()) ? parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date unavailable';
  };
  const status = value => ({ PAID: 'Paid', NOT_PAID: 'Not paid', PARTIALLY_PAID: 'Partially paid', FULLY_REFUNDED: 'Refunded', PARTIALLY_REFUNDED: 'Partially refunded', FULFILLED: 'Fulfilled', NOT_FULFILLED: 'Not fulfilled', PARTIALLY_FULFILLED: 'Partially fulfilled', CANCELED: 'Canceled', APPROVED: 'Confirmed' }[value] || 'Status unavailable');
  const frequency = value => ({ WEEK: 'Weekly', MONTH: 'Monthly', YEAR: 'Yearly' }[value] || 'Recurring');
  const link = (text, href, className = 'tlink') => h('a', { href, class: className }, text);
  const help = () => link('Contact our team', '/contact#account-help');
  function states(which) {
    for (const key of ['loading', 'signed-out', 'problem', 'member']) $(`[data-account-${key}]`).hidden = key !== which;
  }
  function clearPrivate() {
    profile = null;
    name.textContent = '';
    content.replaceChildren();
    memberArea.hidden = true;
  }
  async function api(path, body) {
    const response = await fetch('/api/account/' + path, { method: body ? 'PATCH' : 'GET', credentials: 'same-origin', cache: 'no-store', headers: { Accept: 'application/json', ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(20000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error?.message || 'We could not load your account. Please try again or contact our team.');
      error.status = response.status;
      throw error;
    }
    return data;
  }
  function failure(error, token, target) {
    if (token !== generation) return;
    if (error.status === 401) {
      generation++;
      clearPrivate(); states('signed-out');
      return;
    }
    if (target) {
      target.replaceChildren(h('p', { class: 'account-inline-error', role: 'alert' }, error.message), help());
    } else {
      clearPrivate(); $('[data-account-error]').textContent = error.message; states('problem');
    }
  }
  function orderUrl(id) {
    const url = new URL(host.dataset.accountOrderRoute, location.origin);
    url.searchParams.set('order', id);
    return url.pathname + url.search;
  }
  function orderCard(order, recurring = false) {
    const first = order.items[0];
    const heading = recurring ? first.subscriptionTitle || first.name : order.items.every(item => item.kind === 'giving') ? 'Your gift to Faith Reins' : 'Your Faith Reins order';
    return h('article', { class: 'account-order' },
      h('div', { class: 'account-order__meta' }, h('span', {}, 'Order ' + (order.number || 'details')), h('time', { datetime: order.date }, date(order.date)), h('span', { class: 'account-tag' }, status(order.paymentStatus))),
      h('div', { class: 'account-order__body' }, h('div', {}, h('h3', {}, heading), h('ul', {}, order.items.map(item => h('li', {}, recurring ? `${frequency(item.frequency)} contribution · Recorded payment` : `${item.name}${item.quantity > 1 ? ' × ' + item.quantity : ''}`))), link('View details & receipts', orderUrl(order.id))), h('strong', {}, money(order.total, order.currency))));
  }
  function empty(title, message, action) {
    return h('div', { class: 'account-empty' }, h('h3', {}, title), h('p', {}, message), action || help());
  }
  async function loadHistory(kind, target, token, recent = false) {
    const list = h('div', { class: 'account-history' });
    const message = h('p', { role: 'status' }, 'Loading your history…');
    target.append(message, list);
    let next = '';
    let emptyNode;
    const more = h('button', { type: 'button', class: 'btn btn--outline account-load-more', hidden: true }, 'Load more');
    const errors = h('div', {});
    target.append(more, errors);
    async function load(append = false) {
      more.disabled = true;
      errors.replaceChildren();
      try {
        const data = await api('orders?kind=' + kind + (append && next ? '&cursor=' + encodeURIComponent(next) : ''));
        if (token !== generation) return;
        message.remove();
        for (const order of recent ? data.orders.slice(0, 5) : data.orders) list.append(orderCard(order, kind === 'recurring'));
        next = data.nextCursor || '';
        more.hidden = recent || !next;
        more.disabled = false;
        if (list.children.length) { emptyNode?.remove(); emptyNode = null; }
        if (!list.children.length) {
          const copy = kind === 'shop' ? ['No linked purchases to show.', 'Purchases linked to this account will appear here. We can help locate an older or guest order.'] : kind === 'recurring' ? ['No recurring-gift payments to show.', 'Recorded recurring contributions linked to this account will appear here. Our team can confirm your current giving arrangements.'] : kind === 'giving' ? ['No linked gifts to show.', 'Your contributions will appear here when they are linked to this account. We can help locate an earlier gift.'] : ['Your next chapter starts here.', 'Your linked purchases and contributions will appear here.'];
          message.textContent = '';
          emptyNode?.remove();
          emptyNode = next ? empty('More history is available.', 'No matching transactions appear on this page. Load more to continue.') : empty(...copy);
          target.insertBefore(emptyNode, list);
        }
      } catch (error) {
        if (token !== generation) return;
        message.remove(); more.disabled = false;
        failure(error, token, errors);
        if (error.status !== 401) errors.append(h('button', { class: 'btn btn--outline', type: 'button', onClick: () => load(append) }, 'Try again'));
      }
    }
    more.addEventListener('click', () => load(true));
    await load();
  }
  function overview(token) {
    content.append(h('h2', {}, 'Good to have you here.'), h('p', { class: 'account-intro' }, 'Find your purchases, your giving and the details that keep us connected.'));
    const shortcuts = h('div', { class: 'account-shortcuts' });
    const descriptions = ['Purchase history and order details.', 'Contribution history and available receipts.', 'Recorded payments and giving assistance.', 'Your name and contact phone.'];
    const links = [...host.querySelectorAll('nav a')].slice(1);
    links.forEach((anchor, i) => shortcuts.append(h('a', { href: anchor.getAttribute('href'), class: 'account-shortcut' }, h('h3', {}, anchor.childNodes[0].textContent), h('p', {}, descriptions[i]), h('span', { 'aria-hidden': 'true' }, '↗'))));
    content.append(shortcuts, h('h2', {}, 'Recent activity'));
    const recent = h('div', {}); content.append(recent); loadHistory('all', recent, token, true);
  }
  function historyView(token) {
    content.append(h('h2', {}, view === 'shop' ? 'Purchase history' : view === 'giving' ? 'Giving history' : 'Recurring-gift payments'));
    if (view === 'recurring') content.append(h('p', { class: 'account-note' }, RECURRING_GIFT_HELP, ' ', help()));
    const area = h('div', {}); content.append(area); loadHistory(view, area, token);
    content.append(h('p', { class: 'account-note' }, 'Looking for an older or guest transaction? Our team can help verify ownership and locate it.'));
  }
  async function details(token) {
    const id = new URLSearchParams(location.search).get('order');
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id || '')) {
      content.append(empty('Choose an order from your history.', 'Open My Orders or My Giving to review a transaction linked to your account.')); return;
    }
    content.append(h('p', { role: 'status' }, 'Loading the details…'));
    try {
      const { order } = await api('orders/' + id);
      if (token !== generation) return;
      content.replaceChildren();
      const summary = h('dl', { class: 'account-summary' });
      for (const [label, value] of [['Date', date(order.date)], ['Payment', status(order.paymentStatus)], ['Order total', money(order.total, order.currency)]]) summary.append(h('div', {}, h('dt', {}, label), h('dd', {}, value)));
      const items = h('ul', { class: 'account-items' }, order.items.map(item => h('li', {}, h('div', {}, h('strong', {}, item.name), h('p', {}, item.kind === 'giving' ? item.frequency ? frequency(item.frequency) + ' contribution' : 'Contribution' : 'Quantity: ' + item.quantity)), h('span', {}, money(item.amount, order.currency)))));
      const receiptArea = h('div', { class: 'account-receipts' });
      const receiptButton = h('button', { class: 'btn btn--outline', type: 'button' }, 'Find available receipts');
      const receiptResult = h('div', {});
      receiptButton.addEventListener('click', async () => {
        receiptButton.disabled = true; receiptResult.replaceChildren(h('p', { role: 'status' }, 'Checking for an issued receipt…'));
        try {
          const data = await api('orders/' + id + '/receipts');
          if (token !== generation) return;
          receiptResult.replaceChildren();
          if (!data.receipts.length) receiptResult.append(h('p', {}, 'No downloadable receipt is available here for this transaction. Contact us if you need a copy.'), help());
          else {
            const list = h('ul', {});
            for (const receipt of data.receipts) {
              const url = new URL(receipt.downloadUrl);
              if (url.protocol === 'https:' && !url.username && !url.password) list.append(h('li', {}, h('a', { href: url.href, target: '_blank', rel: 'noopener noreferrer', class: 'tlink' }, 'Download receipt' + (receipt.number ? ' ' + receipt.number : ''))));
            }
            receiptResult.append(list);
          }
          if (data.moreAvailable) receiptResult.append(h('p', {}, 'Contact our team for additional receipts for this transaction.'));
        } catch (error) { failure(error, token, receiptResult); }
        finally { receiptButton.disabled = false; }
      });
      receiptArea.append(h('h3', {}, 'Your receipts'), h('p', {}, 'Download an issued receipt when one is available, or request a copy from our team.'), receiptButton, receiptResult);
      content.append(h('div', { class: 'account-detail' }, h('h2', {}, 'Order ' + (order.number || 'details')), summary, items, ...(order.items.some(item => item.kind === 'shop') ? [h('p', {}, 'Fulfillment: ' + status(order.fulfillmentStatus))] : []), receiptArea));
      if (order.items.some(item => item.kind === 'shop')) {
        const result = h('div', {});
        const button = h('button', { type: 'button', class: 'btn btn--outline' }, 'Check shipment tracking');
        const area = h('div', { class: 'account-receipts' }, h('h3', {}, 'Shipment tracking'), button, result);
        button.addEventListener('click', async () => {
          button.disabled = true; result.replaceChildren(h('p', { role: 'status' }, 'Checking shipment details…'));
          try {
            const data = await api('orders/' + id + '/tracking');
            if (token !== generation) return;
            result.replaceChildren();
            if (!data.shipments.length) result.append(h('p', {}, 'Tracking information has not been added to this order. Contact us if you need a shipment update.'), help());
            for (const shipment of data.shipments) {
              const label = [shipment.carrier, shipment.number].filter(Boolean).join(' · ');
              let url; try { url = new URL(shipment.trackingUrl); } catch {}
              result.append(h('p', {}, url?.protocol === 'https:' && !url.username && !url.password ? h('a', { href: url.href, target: '_blank', rel: 'noopener noreferrer', class: 'tlink' }, 'Track shipment: ' + label) : label));
            }
          } catch (error) { failure(error, token, result); }
          finally { button.disabled = false; }
        });
        content.querySelector('.account-detail').append(area);
      }
    } catch (error) { if (token === generation) { content.replaceChildren(); failure(error, token, content); } }
  }
  function profileView(token) {
    const form = h('form', { class: 'account-profile' });
    const fields = {};
    function field(key, label, hint, readOnly = false) {
      const id = 'account-' + key;
      const input = h('input', { id, name: key, type: key === 'phone' ? 'tel' : key === 'loginEmail' ? 'email' : 'text', maxlength: key === 'phone' ? 40 : 80, autocomplete: { firstName: 'given-name', lastName: 'family-name', nickname: 'nickname', phone: 'tel', loginEmail: 'email' }[key], readonly: readOnly });
      input.value = profile[key] || ''; fields[key] = input;
      if (hint) input.setAttribute('aria-describedby', id + '-hint');
      return h('div', { class: 'account-field' }, h('label', { for: id }, label), input, hint ? h('small', { id: id + '-hint' }, hint) : null);
    }
    const submit = h('button', { class: 'btn', type: 'submit' }, 'Save details');
    const feedback = h('p', { class: 'account-form-status', role: 'status' });
    form.append(h('h2', {}, 'Your details'), h('div', { class: 'account-form-grid' }, field('firstName', 'First name'), field('lastName', 'Last name')), field('nickname', 'Display name'), field('phone', 'Contact phone', 'Leave blank to keep your current phone number.'), field('loginEmail', 'Sign-in email', 'Contact our team for help with your sign-in email. Password resets are available from the sign-in screen.', true), submit, feedback);
    form.addEventListener('submit', async event => {
      event.preventDefault(); submit.disabled = true; feedback.textContent = 'Saving your details…';
      try {
        const data = await api('profile', Object.fromEntries(['firstName', 'lastName', 'nickname', 'phone'].map(key => [key, fields[key].value])));
        if (token !== generation) return;
        profile = data.profile; name.textContent = profile.nickname || [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Your account';
        for (const key of Object.keys(fields)) fields[key].value = profile[key] || '';
        feedback.textContent = 'Your details have been saved.';
      } catch (error) {
        if (error.status === 401) failure(error, token);
        else if (token === generation) feedback.textContent = error.message;
      } finally { submit.disabled = false; }
    });
    content.append(form);
  }
  async function boot() {
    const token = ++generation;
    clearPrivate(); states('loading');
    try {
      const data = await api('session');
      if (token !== generation) return;
      profile = data.profile;
      name.textContent = profile.nickname || [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Your account';
      states('member');
      if (view === 'overview') overview(token);
      else if (view === 'profile') profileView(token);
      else if (view === 'order') await details(token);
      else historyView(token);
    } catch (error) { failure(error, token); }
  }
  $('[data-account-retry]').addEventListener('click', boot);
  $('[data-account-logout]').addEventListener('click', () => { generation++; clearPrivate(); });
  window.addEventListener('pagehide', () => { generation++; clearPrivate(); });
  window.addEventListener('pageshow', event => { if (event.persisted) boot(); });
  try { sessionStorage.removeItem('fr-member-session'); sessionStorage.removeItem('fr-member-login'); } catch {}
  if (new URLSearchParams(location.hash.slice(1)).has('code')) history.replaceState(null, '', location.pathname + location.search);
  boot();
}
