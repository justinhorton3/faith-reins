// Read-only bag while the full merchandise collection is out of stock.

const KEY = "fr-cart";
const $ = (s, r = document) => r.querySelector(s);
const h = (t, a = {}, ...k) => {
  const n = document.createElement(t);
  for (const [x, v] of Object.entries(a)) {
    if (v === false || v == null) continue;
    if (x.startsWith("on")) n.addEventListener(x.slice(2), v);
    else n.setAttribute(x, v === true ? "" : v);
  }
  n.append(...k.flat().filter((c) => c != null));
  return n;
};

// The entire visual collection is unavailable. Clear historical bag entries,
// including retired styles, so a saved basket cannot reopen ordering.
function load() {
  try { localStorage.removeItem(KEY); } catch {}
  return [];
}
function count(items) { return items.reduce((sum, item) => sum + item.qty, 0); }

function updateBadge(items) {
  const b = document.getElementById("cart-badge");
  if (!b) return;
  const n = count(items);
  b.textContent = n;
  b.hidden = n === 0;
}

/* ── Drawer ── */
let drawerEl = null;

function buildDrawer() {
  drawerEl = h("div", { class: "cart-drawer", id: "cart-drawer", role: "dialog", "aria-modal": "true", "aria-labelledby": "cart-drawer-title", hidden: true });
  document.body.append(drawerEl);
  renderDrawer();
}

function renderDrawer() {
  if (!drawerEl) return;
  const items = load();
  drawerEl.innerHTML = "";

  const scrim = h("div", { class: "cart-scrim", onclick: closeCart, "aria-hidden": "true" });
  const panel = h("div", { class: "cart-panel" });
  const top = h("div", { class: "cart-panel__top" });
  top.append(
    h("h2", { class: "cart-panel__title", id: "cart-drawer-title" }, `Bag (${count(items)})`),
    h("button", { class: "cart-close", type: "button", "aria-label": "Close bag", onclick: closeCart }, "×")
  );
  panel.append(top);

  if (!items.length) {
    panel.append(h("div", { class: "cart-empty" }, h("p", {}, "Your bag is empty."), h("a", { class: "btn btn--secondary", href: "/shop" }, "Browse the shop")));
  }

  drawerEl.append(scrim, panel);
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let trapController = null;

function trapFocus(container) {
  if (trapController) trapController.abort();
  trapController = new AbortController();
  const { signal } = trapController;
  container.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const els = [...container.querySelectorAll(FOCUSABLE)].filter(
      (el) => !el.closest("[hidden]") && el.offsetParent !== null
    );
    if (!els.length) return;
    const first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }, { signal });
}

function openCart() {
  renderDrawer();
  if (!drawerEl) return;
  drawerEl.hidden = false;
  document.body.classList.add("cart-open");
  const panel = $(".cart-panel", drawerEl);
  const close = $(".cart-close", drawerEl);
  if (close) close.focus();
  if (panel) trapFocus(panel);
}

function closeCart() {
  if (!drawerEl) return;
  drawerEl.hidden = true;
  document.body.classList.remove("cart-open");
  if (trapController) { trapController.abort(); trapController = null; }
  document.getElementById("cart-btn")?.focus();
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => {
  updateBadge(load());
  buildDrawer();
  document.addEventListener("click", (e) => {
    if (e.target.closest("#cart-btn")) openCart();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !drawerEl?.hidden) closeCart();
  });
});
