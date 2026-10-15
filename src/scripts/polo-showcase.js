const root = document.querySelector("[data-polo-showcase]");
if (root) {
  const $ = (id) => document.getElementById(`polo-${id}`);
  const colors = [...root.querySelectorAll("[data-polo-color]")];
  let color = "white", view = "product", size = "", quantity = 1, zoom = 100;
  const colorName = () => colors.find((button) => button.dataset.poloColor === color).dataset.colorName;
  const path = (imageView = view) => `/assets/shop/v7/polos/mens-${color}-polo-${imageView}.png`;
  function announce() { $("selection").textContent = `${colorName()}${size ? `, ${size}` : ""}, quantity ${quantity}. Out of stock.`; }
  function renderImage() {
    const name = colorName(), label = view === "product" ? "Product" : "Styled";
    $("main-image").src = path();
    $("main-image").alt = `${name} men’s Faith Reins horse polo, ${view} view`;
    $("image-open").setAttribute("aria-label", `Enlarge ${name} polo ${view} image`);
    for (const imageView of ["product", "styled"]) $("thumb-" + imageView).src = path(imageView);
    root.querySelectorAll("[data-polo-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.poloView === view)));
    $("counter").textContent = view === "product" ? "01 / 02" : "02 / 02";
    $("caption").textContent = view === "product" ? "The product" : "In the everyday";
    $("zoom-title").textContent = `${name} · ${label} view`;
    $("zoom-image").src = path();
    $("zoom-image").alt = `${name} polo, enlarged ${view} view`;
  }
  function chooseColor(id) {
    if (!colors.some((b) => b.dataset.poloColor === id)) return;
    color = id; view = "product"; size = "";
    $("color-name").textContent = colorName();
    colors.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.poloColor === color)));
    root.querySelectorAll("[data-polo-size]").forEach((b) => b.setAttribute("aria-pressed", "false"));
    $("size-name").textContent = "Select a size";
    $("story-image").src = path("styled");
    $("story-image").alt = `${colorName()} Faith Reins polo, styled view`;
    $("white-guide").hidden = color !== "white";
    $("other-guide").hidden = color === "white";
    $("add-to-bag").disabled = true;
    renderImage(); announce();
  }
  colors.forEach((b) => b.addEventListener("click", () => chooseColor(b.dataset.poloColor)));
  root.querySelectorAll("[data-polo-card]").forEach((b) => b.addEventListener("click", () => { chooseColor(b.dataset.poloCard); $("image-open").focus({ preventScroll: true }); root.scrollIntoView({ behavior: "instant", block: "start" }); }));
  root.querySelectorAll("[data-polo-view]").forEach((b) => b.addEventListener("click", () => { view = b.dataset.poloView; renderImage(); }));
  function nextImage() { view = view === "product" ? "styled" : "product"; renderImage(); }
  document.querySelectorAll("[data-polo-next]").forEach((b) => b.addEventListener("click", nextImage));
  root.querySelectorAll("[data-polo-size]").forEach((b) => b.addEventListener("click", () => {
    size = b.dataset.poloSize;
    $("size-name").textContent = size;
    root.querySelectorAll("[data-polo-size]").forEach((other) => other.setAttribute("aria-pressed", String(other === b)));
    announce();
  }));
  function changeQuantity(delta) { quantity = Math.max(1, Math.min(9, quantity + delta)); $("quantity").textContent = quantity; $("decrease").disabled = quantity === 1; $("increase").disabled = quantity === 9; announce(); }
  $("decrease").addEventListener("click", () => changeQuantity(-1));
  $("increase").addEventListener("click", () => changeQuantity(1));
  $("decrease").disabled = true;
  for (const id of ["size-guide", "fit-guide"]) $(id).addEventListener("click", () => $("guide-dialog").showModal());
  document.querySelectorAll("[data-polo-unit]").forEach((b) => b.addEventListener("click", () => {
    const cm = b.dataset.poloUnit === "cm";
    document.querySelectorAll("[data-polo-unit]").forEach((other) => other.setAttribute("aria-pressed", String(other === b)));
    document.querySelectorAll("[data-polo-inches]").forEach((cell) => { cell.textContent = cm ? (Number(cell.dataset.poloInches) * 2.54).toFixed(2) : cell.dataset.poloInches; });
    $("chart-caption").textContent = `White polo garment measurements in ${cm ? "centimeters (converted)" : "inches"}`;
  }));
  function renderZoom() { $("zoom-image").style.width = `${zoom}%`; $("zoom-level").textContent = `${zoom}%`; $("zoom-out").disabled = zoom === 100; $("zoom-in").disabled = zoom === 200; }
  for (const id of ["image-open", "zoom-open"]) $(id).addEventListener("click", () => { zoom = 100; renderZoom(); $("zoom-dialog").showModal(); });
  $("zoom-in").addEventListener("click", () => { zoom = Math.min(200, zoom + 25); renderZoom(); });
  $("zoom-out").addEventListener("click", () => { zoom = Math.max(100, zoom - 25); renderZoom(); });
  $("zoom-dialog").addEventListener("keydown", (event) => { if (["ArrowLeft", "ArrowRight"].includes(event.key)) { event.preventDefault(); nextImage(); } });
  document.querySelectorAll("[data-polo-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));
  for (const id of ["guide-dialog", "zoom-dialog"]) $(id).addEventListener("click", (event) => {
    if (event.target !== $(id)) return;
    const r = $(id).getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $(id).close();
  });
  let touchStart;
  $("stage").addEventListener("touchstart", (event) => { const t = event.changedTouches[0]; touchStart = { x: t.clientX, y: t.clientY }; }, { passive: true });
  $("stage").addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const t = event.changedTouches[0], dx = t.clientX - touchStart.x, dy = t.clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) { nextImage(); suppressClickUntil = Date.now() + 400; }
    touchStart = null;
  }, { passive: true });
  let suppressClickUntil = 0;
  $("image-open").addEventListener("click", (event) => { if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); } }, true);
}
