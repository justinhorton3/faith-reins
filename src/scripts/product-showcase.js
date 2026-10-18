import { productGuide } from '../lib/product-guide.mjs';
const root = document.querySelector('[data-product-showcase]');
if (root) {
  const data = JSON.parse(document.getElementById('pdp-data').textContent);
  const $ = (id) => document.getElementById(`pdp-${id}`);
  const variants = data.variants;
  let variant = variants[0], view = 'product', size = '', quantity = 1, zoom = 100;
  let suppressClickUntil = 0;
  const announce = () => { $('selection').textContent = `${variant.name}${size ? `, ${size}` : ''}, quantity ${quantity}. Out of stock.`; };
  function setImage(element, image, alt) {
    element.src = image.src;
    element.width = image.width;
    element.height = image.height;
    element.alt = alt;
  }
  function renderImage() {
    const label = view === 'product' ? 'Product' : 'Styled';
    setImage($('main-image'), variant.images[view], `${variant.name} ${data.name}, ${view} view`);
    $('image-open').setAttribute('aria-label', `Enlarge ${variant.name} ${data.name} ${view} image`);
    for (const imageView of ['product', 'styled']) setImage($('thumb-' + imageView), variant.images[imageView], '');
    root.querySelectorAll('[data-pdp-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pdpView === view)));
    $('counter').textContent = view === 'product' ? '01 / 02' : '02 / 02';
    $('caption').textContent = view === 'product' ? 'The product' : 'In the everyday';
    $('zoom-title').textContent = `${variant.name} · ${label} view`;
    setImage($('zoom-image'), variant.images[view], `${variant.name} ${data.name}, enlarged ${view} view`);
  }
  function renderSizes() {
    const container = $('sizes');
    if (!container) return;
    container.replaceChildren(...variant.sizes.map(label => {
      const button = document.createElement('button');
      button.type = 'button'; button.dataset.pdpSize = label; button.textContent = label;
      button.setAttribute('aria-pressed', 'false');
      return button;
    }));
    $('size-name').textContent = 'Select a size';
  }
  function chooseVariant(id, scroll = false) {
    const next = variants.find(variant => variant.id === id);
    if (!next) return;
    variant = next; view = 'product'; size = '';
    $('color-name').textContent = variant.name;
    root.querySelectorAll('[data-pdp-color]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.pdpColor === id)));
    renderSizes();
    setImage($('story-image'), variant.images.styled, `${variant.name} ${data.name}, styled view`);
    document.querySelectorAll('[data-pdp-guide]').forEach(guide => { guide.hidden = guide.dataset.pdpGuide !== id; });
    const guide = productGuide(data, variant);
    $('size-guide').textContent = guide.label;
    $('fit-guide').textContent = guide.open;
    $('guide-title').textContent = guide.label;
    $('guide-close').setAttribute('aria-label', guide.close);
    $('variant-description').textContent = variant.description;
    $('add-to-bag').disabled = true;
    renderImage(); announce();
    if (scroll) { $('image-open').focus({ preventScroll: true }); root.scrollIntoView({ behavior: 'instant', block: 'start' }); }
  }
  root.querySelectorAll('[data-pdp-color]').forEach(button => button.addEventListener('click', () => chooseVariant(button.dataset.pdpColor)));
  root.querySelectorAll('[data-pdp-card]').forEach(button => button.addEventListener('click', () => chooseVariant(button.dataset.pdpCard, true)));
  root.querySelectorAll('[data-pdp-view]').forEach(button => button.addEventListener('click', () => { view = button.dataset.pdpView; renderImage(); }));
  function nextImage() { view = view === 'product' ? 'styled' : 'product'; renderImage(); }
  document.querySelectorAll('[data-pdp-next]').forEach(button => button.addEventListener('click', nextImage));
  $('sizes')?.addEventListener('click', event => {
    const button = event.target.closest('[data-pdp-size]');
    if (!button || !variant.sizes.includes(button.dataset.pdpSize)) return;
    size = button.dataset.pdpSize;
    $('size-name').textContent = size;
    root.querySelectorAll('[data-pdp-size]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    announce();
  });
  function changeQuantity(delta) {
    quantity = Math.max(1, Math.min(9, quantity + delta));
    $('quantity').textContent = quantity; $('decrease').disabled = quantity === 1; $('increase').disabled = quantity === 9;
    announce();
  }
  $('decrease').addEventListener('click', () => changeQuantity(-1));
  $('increase').addEventListener('click', () => changeQuantity(1));
  for (const id of ['size-guide', 'fit-guide']) $(id).addEventListener('click', () => $('guide-dialog').showModal());
  document.querySelectorAll('[data-pdp-unit]').forEach(button => button.addEventListener('click', () => {
    const guide = button.closest('[data-pdp-guide]');
    const cm = button.dataset.pdpUnit === 'cm';
    guide.querySelectorAll('[data-pdp-unit]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    guide.querySelectorAll('[data-pdp-inches]').forEach(cell => { cell.textContent = cm ? (Number(cell.dataset.pdpInches) * 2.54).toFixed(2) : cell.dataset.pdpInches; });
    const caption = guide.querySelector('[data-pdp-chart-caption]');
    caption.textContent = `${caption.dataset.pdpChartCaption} in ${cm ? 'centimeters (converted)' : 'inches'}`;
  }));
  function renderZoom() {
    $('zoom-image').style.width = `${zoom}%`; $('zoom-level').textContent = `${zoom}%`;
    $('zoom-out').disabled = zoom === 100; $('zoom-in').disabled = zoom === 200;
  }
  for (const id of ['image-open', 'zoom-open']) $(id).addEventListener('click', () => { zoom = 100; renderZoom(); $('zoom-dialog').showModal(); });
  $('zoom-in').addEventListener('click', () => { zoom = Math.min(200, zoom + 25); renderZoom(); });
  $('zoom-out').addEventListener('click', () => { zoom = Math.max(100, zoom - 25); renderZoom(); });
  $('zoom-dialog').addEventListener('keydown', event => { if (['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); nextImage(); } });
  document.querySelectorAll('[data-pdp-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  for (const id of ['guide-dialog', 'zoom-dialog']) $(id).addEventListener('click', event => {
    if (event.target !== $(id)) return;
    const rect = $(id).getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) $(id).close();
  });
  let touchStart;
  $('stage').addEventListener('touchstart', event => { const t = event.changedTouches[0]; touchStart = { x: t.clientX, y: t.clientY }; }, { passive: true });
  $('stage').addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0], dx = touch.clientX - touchStart.x, dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) { nextImage(); suppressClickUntil = Date.now() + 400; }
    touchStart = null;
  }, { passive: true });
  $('image-open').addEventListener('click', event => { if (Date.now() < suppressClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); } }, true);
}
