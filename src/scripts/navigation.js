// Native disclosures remain usable without JavaScript. Enhance pointer intent and focus behavior.
const header = document.querySelector('.site-header');
const menus = [...document.querySelectorAll('[data-mega-menu]')];
const drawer = document.querySelector('#drawer');
const opener = document.querySelector('[data-drawer-open]');
const desktop = window.matchMedia('(min-width: 1280px)');
const hoverPointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
const blockedHover = new WeakSet();
let openTimer, closeTimer;
let points = [];

function clearTimers() {
  window.clearTimeout(openTimer);
  window.clearTimeout(closeTimer);
}
function setExpanded(menu) {
  menu.querySelector('summary').setAttribute('aria-expanded', String(menu.open));
}
function closeMenus(returnFocus = false) {
  clearTimers();
  const active = menus.find(menu => menu.open);
  menus.forEach(menu => {
    if (menu.querySelector('summary').matches(':hover')) blockedHover.add(menu);
    else blockedHover.delete(menu);
    menu.open = false;
    setExpanded(menu);
  });
  if (returnFocus) active?.querySelector('summary').focus();
}
function measureMenu() {
  if (!header) return;
  header.style.setProperty('--mega-available-height', `${Math.max(0, window.innerHeight - header.getBoundingClientRect().bottom)}px`);
}
function canHover(event) {
  return desktop.matches && hoverPointer.matches && event.pointerType === 'mouse';
}
function focusInPanel() {
  return menus.some(menu => menu.open && menu.querySelector('.mega-panel').contains(document.activeElement));
}
function deferClose() {
  window.clearTimeout(closeTimer);
  closeTimer = window.setTimeout(() => {
    if (!focusInPanel() && !menus.some(menu => menu.matches(':hover'))) closeMenus();
  }, 250);
}
// When the pointer is travelling diagonally toward the current panel, allow time
// to reach its image tiles instead of switching to an adjacent navigation label.
function headingIntoPanel() {
  const active = menus.find(menu => menu.open);
  const last = points.at(-1);
  const first = points[0];
  if (!active || !last || !first || performance.now() - last.time > 120) return false;
  const rect = active.querySelector('.mega-panel').getBoundingClientRect();
  const dy = last.y - first.y;
  if (dy <= 3 || last.y >= rect.top) return false;
  const projectedX = last.x + (last.x - first.x) * (rect.top - last.y) / dy;
  return projectedX >= rect.left && projectedX <= rect.right;
}
header?.addEventListener('pointermove', event => {
  if (!canHover(event)) return;
  const now = performance.now();
  points = points.filter(point => now - point.time < 180);
  points.push({ x: event.clientX, y: event.clientY, time: now });
});
menus.forEach(menu => {
  const summary = menu.querySelector('summary');
  const panel = menu.querySelector('.mega-panel');
  setExpanded(menu);
  menu.addEventListener('toggle', () => {
    setExpanded(menu);
    if (menu.open) {
      menus.filter(other => other !== menu).forEach(other => { other.open = false; setExpanded(other); });
      measureMenu();
    }
  });
  summary.addEventListener('pointerenter', event => {
    if (!canHover(event)) return;
    clearTimers();
    if (menu.open || blockedHover.has(menu) || focusInPanel()) return;
    const started = performance.now();
    const open = () => {
      if (!summary.matches(':hover') || blockedHover.has(menu) || focusInPanel()) return;
      if (headingIntoPanel() && performance.now() - started < 650) {
        openTimer = window.setTimeout(open, 100);
        return;
      }
      menu.open = true;
    };
    openTimer = window.setTimeout(open, 250);
  });
  summary.addEventListener('pointerleave', event => {
    if (!canHover(event)) return;
    blockedHover.delete(menu);
    window.clearTimeout(openTimer);
  });
  summary.addEventListener('click', () => {
    clearTimers();
    blockedHover.add(menu);
  });
  menu.addEventListener('pointerenter', event => {
    if (canHover(event)) window.clearTimeout(closeTimer);
  });
  menu.addEventListener('pointerleave', event => {
    if (canHover(event)) deferClose();
  });
  panel.addEventListener('pointerenter', event => {
    if (canHover(event)) clearTimers();
  });
  panel.addEventListener('focusout', () => {
    // Evaluate after the browser has moved focus to the next link or trigger.
    window.setTimeout(() => {
      if (menu.open && !header.contains(document.activeElement)) closeMenus();
    }, 0);
  });
  menu.querySelector('[data-mega-close]').addEventListener('click', () => closeMenus(true));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenus()));
});
document.addEventListener('pointerdown', event => {
  if (header && !header.contains(event.target)) closeMenus();
});
document.addEventListener('focusin', event => {
  if (header && !header.contains(event.target)) closeMenus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menus.some(menu => menu.open)) { event.preventDefault(); closeMenus(true); }
});
window.addEventListener('resize', measureMenu);
window.addEventListener('scroll', measureMenu, { passive: true });
desktop.addEventListener('change', () => {
  closeMenus();
  menus.forEach(menu => blockedHover.delete(menu));
  if (desktop.matches) setDrawer(false);
});
hoverPointer.addEventListener('change', clearTimers);
window.addEventListener('pagehide', clearTimers);
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
drawer?.querySelector('[data-drawer-bag]')?.addEventListener('click', () => {
  setDrawer(false);
  document.querySelector('#cart-btn')?.click();
});
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
