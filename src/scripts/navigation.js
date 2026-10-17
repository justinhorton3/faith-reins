// Native details remain usable without JavaScript. This adds coordination and focus behavior.
const header = document.querySelector('.site-header');
const menus = [...document.querySelectorAll('[data-mega-menu]')];
const drawer = document.querySelector('#drawer');
const opener = document.querySelector('[data-drawer-open]');
const desktop = window.matchMedia('(min-width: 1280px)');

function closeMenus(returnFocus = false) {
  const active = menus.find(menu => menu.open);
  menus.forEach(menu => { menu.open = false; menu.querySelector('summary').setAttribute('aria-expanded', 'false'); });
  if (returnFocus) active?.querySelector('summary').focus();
}

function measureMenu() {
  if (!header) return;
  header.style.setProperty('--mega-available-height', `${Math.max(180, window.innerHeight - header.getBoundingClientRect().bottom)}px`);
}

menus.forEach(menu => {
  menu.addEventListener('toggle', () => {
    menu.querySelector('summary').setAttribute('aria-expanded', String(menu.open));
    if (menu.open) {
      menus.filter(other => other !== menu).forEach(other => { other.open = false; other.querySelector('summary').setAttribute('aria-expanded', 'false'); });
      measureMenu();
    }
  });
  menu.querySelector('[data-mega-close]').addEventListener('click', () => { menu.open = false; menu.querySelector('summary').setAttribute('aria-expanded', 'false'); menu.querySelector('summary').focus(); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenus()));
});
document.addEventListener('pointerdown', event => { if (header && !header.contains(event.target)) closeMenus(); });
document.addEventListener('focusin', event => { if (header && !header.contains(event.target)) closeMenus(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menus.some(menu => menu.open)) { event.preventDefault(); closeMenus(true); }
});
window.addEventListener('resize', measureMenu);
window.addEventListener('scroll', measureMenu, { passive: true });
desktop.addEventListener('change', () => { closeMenus(); if (desktop.matches) setDrawer(false); });
measureMenu();

const inertTargets = [header, document.querySelector('.utility'), document.querySelector('main'), document.querySelector('.site-footer')].filter(Boolean);
const previousInert = new Map();
function setDrawer(open, returnFocus = true) {
  if (!drawer || !opener) return;
  if (open) {
    closeMenus();
    inertTargets.forEach(node => { previousInert.set(node, node.inert); node.inert = true; });
  } else {
    inertTargets.forEach(node => { if (previousInert.has(node)) node.inert = previousInert.get(node); });
    previousInert.clear();
  }
  drawer.hidden = !open;
  document.body.classList.toggle('drawer-open', open);
  opener.setAttribute('aria-expanded', String(open));
  if (open) drawer.querySelector('[data-drawer-close]')?.focus();
  else if (returnFocus && !desktop.matches) opener.focus();
}
opener?.addEventListener('click', () => setDrawer(true));
drawer?.querySelectorAll('[data-drawer-close]').forEach(button => button.addEventListener('click', () => setDrawer(false)));
drawer?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setDrawer(false, false)));
drawer?.querySelectorAll('[data-mobile-group]').forEach(group => group.addEventListener('toggle', () => {
  if (group.open) drawer.querySelectorAll('[data-mobile-group]').forEach(other => { if (other !== group) other.open = false; });
}));
drawer?.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); setDrawer(false); return; }
  if (event.key !== 'Tab') return;
  const stops = [...drawer.querySelectorAll('a, button, summary')].filter(node => node.getClientRects().length && !node.disabled);
  const first = stops[0], last = stops.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});
