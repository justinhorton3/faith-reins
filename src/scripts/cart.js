// Cart drawer — localStorage state, Wix ecom checkout when connected.
// To wire up real checkout: replace the TODO block in `checkout()` with
// api("/ecom/v2/carts", ...) + api("/headless/v1/redirect-session", ...)
// using the same helpers from site.js.

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

function load() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } }
function save(items) { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {} }
function count(items) { return items.reduce((s, i) => s + i.qty, 0); }
function subtotal(items) { return items.reduce((s, i) => s + i.price * i.qty, 0); }
function fmt(n) { return "$" + n.toFixed(2).replace(".00", ""); }

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
  drawerEl = h("div", { class: "cart-drawer", id: "cart-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Shopping bag", hidden: true });
  document.body.append(drawerEl);
  renderDrawer();
}

function renderDrawer() {
  if (!drawerEl) return;
  const items = load();
  drawerEl.innerHTML = "";

  const scrim = h("div", { class: "cart-scrim", onclick: closeCart });
  const panel = h("div", { class: "cart-panel" });
  const top = h("div", { class: "cart-panel__top" });
  top.append(
    h("h2", { class: "cart-panel__title" }, `Bag (${count(items)})`),
    h("button", { class: "cart-close", type: "button", "aria-label": "Close bag", onclick: closeCart }, "×")
  );
  panel.append(top);

  if (!items.length) {
    panel.append(h("div", { class: "cart-empty" }, h("p", {}, "Your bag is empty."), h("a", { class: "btn btn--secondary", href: "/shop" }, "Browse the shop")));
  } else {
    const list = h("div", { class: "cart-items" });
    items.forEach((item) => {
      const row = h("div", { class: "cart-item" });
      row.append(
        h("img", { src: item.img, alt: item.name, class: "cart-item__img" }),
        (() => {
          const info = h("div", { class: "cart-item__info" });
          info.append(
            h("p", { class: "cart-item__name" }, item.name),
            item.size ? h("p", { class: "cart-item__size" }, item.size) : null,
            h("p", { class: "cart-item__price" }, fmt(item.price))
          );
          return info;
        })(),
        (() => {
          const right = h("div", { class: "cart-item__right" });
          const qd = h("button", { class: "qty-btn", type: "button", "aria-label": "Decrease", onclick: () => { adjustQty(item, -1); } }, "−");
          const qv = h("span", { class: "qty-val" }, String(item.qty));
          const qi = h("button", { class: "qty-btn", type: "button", "aria-label": "Increase", onclick: () => { adjustQty(item, 1); } }, "+");
          const rm = h("button", { class: "cart-remove", type: "button", "aria-label": "Remove", onclick: () => { removeItem(item); } }, "Remove");
          right.append(h("div", { class: "qty-row" }, qd, qv, qi), rm);
          return right;
        })()
      );
      list.append(row);
    });
    panel.append(list);

    const foot = h("div", { class: "cart-foot" });
    foot.append(
      h("div", { class: "cart-subtotal" },
        h("span", {}, "Subtotal"),
        h("span", { class: "cart-subtotal__val" }, fmt(subtotal(items)))
      ),
      h("p", { class: "cart-note" }, "Shipping and taxes calculated at checkout."),
      h("button", { class: "btn btn--block atb-btn", type: "button", onclick: checkout }, "Check out"),
      h("a", { class: "cart-continue", href: "/shop" }, "Continue shopping")
    );
    panel.append(foot);
  }

  drawerEl.append(scrim, panel);
}

function adjustQty(item, delta) {
  const items = load();
  const found = items.find((i) => i.id === item.id && i.size === item.size);
  if (!found) return;
  found.qty += delta;
  if (found.qty <= 0) {
    const next = items.filter((i) => !(i.id === item.id && i.size === item.size));
    save(next);
    updateBadge(next);
  } else {
    save(items);
    updateBadge(items);
  }
  renderDrawer();
}

function removeItem(item) {
  const next = load().filter((i) => !(i.id === item.id && i.size === item.size));
  save(next);
  updateBadge(next);
  renderDrawer();
}

function openCart() {
  renderDrawer();
  if (!drawerEl) return;
  drawerEl.hidden = false;
  document.body.classList.add("cart-open");
  const close = $(".cart-close", drawerEl);
  if (close) close.focus();
}

function closeCart() {
  if (!drawerEl) return;
  drawerEl.hidden = true;
  document.body.classList.remove("cart-open");
  document.getElementById("cart-btn")?.focus();
}

// Wix ecom checkout — imported lazily so site.js token/api helpers are available.
// Catalog item IDs come from the Wix Stores dashboard product settings.
// Set window.WIX_CATALOG_IDS = { "heritage-hoodie": "<wix-product-id>", ... }
// from a <script> tag in build.mjs once products are in the Wix catalog.
async function wixCheckout(items) {
  const catalogIds = window.WIX_CATALOG_IDS || {};
  const catalogItems = items
    .map((item) => {
      const catalogItemId = catalogIds[item.id];
      if (!catalogItemId) return null;
      return {
        quantity: item.qty,
        catalogReference: {
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e", // Wix Stores app ID
          catalogItemId,
          options: item.size ? { variantId: item.size } : {},
        },
      };
    })
    .filter(Boolean);

  if (!catalogItems.length) throw new Error("no_catalog");

  // Use the same api() helper from site.js (loaded first, sets window.__frApi)
  const apiFn = window.__frApi;
  if (!apiFn) throw new Error("no_api");

  const cartRes = await apiFn("/ecom/v2/carts", "POST", {
    cart: { source: { channelType: "WEB" } },
    catalogItems,
  });
  const cartId = (cartRes.cart || cartRes)._id || (cartRes.cart || cartRes).id;
  const sessionRes = await apiFn("/headless/v1/redirect-session", "POST", {
    ecomCheckout: { checkoutId: cartId },
    callbacks: {
      postFlowUrl: location.origin + "/shop/",
      thankYouPageUrl: location.origin + "/shop/thank-you/",
    },
  });
  location.href = sessionRes.redirectSession.fullUrl;
}

async function checkout() {
  const items = load();
  if (!items.length) return;
  const checkoutBtn = $(".atb-btn", drawerEl);
  if (checkoutBtn) { checkoutBtn.disabled = true; checkoutBtn.textContent = "Opening checkout…"; }

  try {
    await wixCheckout(items);
  } catch (e) {
    // Wix catalog not yet connected — fall back to contact form order
    if (checkoutBtn) { checkoutBtn.disabled = false; checkoutBtn.textContent = "Check out"; }
    const summary = items.map((i) => `${i.name}${i.size ? " (" + i.size + ")" : ""} ×${i.qty}`).join(", ");
    window.location.href = "/contact?order=" + encodeURIComponent(summary);
  }
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
