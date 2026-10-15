import { test, expect } from '@playwright/test';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
import LEGACY from '../src/lib/legacy-product-routes.json' with { type: 'json' };

for (const [layout, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
  test.describe(layout, () => {
    test.use({ viewport: { width, height } });
    for (const product of PRODUCTS) {
      test(`${product.slug}: every variant browses and stays unavailable`, async ({ page }, testInfo) => {
        test.setTimeout(90000);
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`/shop/${product.slug}`);
        await expect(page.locator('h1')).toHaveText(product.name);
        await expect(page.locator('.pdp-stock')).toHaveText('Out of stock');
        for (const variant of product.variants) {
          await page.locator(`[data-pdp-color="${variant.id}"]`).click();
          await expect(page.locator('#pdp-color-name')).toHaveText(variant.name);
          for (const view of ['product', 'styled']) {
            await page.locator(`[data-pdp-view="${view}"]`).click();
            await expect(page.locator('#pdp-main-image')).toHaveAttribute('src', variant.images[view].src);
            await expect.poll(() => page.locator('#pdp-main-image').evaluate(img => img.complete && img.naturalWidth === 1086)).toBe(true);
          }
          for (const size of variant.sizes) {
            await page.locator(`[data-pdp-size="${size}"]`).click();
            await expect(page.locator('#pdp-add-to-bag')).toBeDisabled();
          }
          await expect(page.locator('#pdp-add-to-bag')).toBeDisabled();
          await page.locator('#pdp-size-guide').click();
          await expect(page.locator(`[data-pdp-guide="${variant.id}"]`)).toBeVisible();
          if (variant.guide) await expect(page.locator(`[data-pdp-guide="${variant.id}"] table tbody tr`)).toHaveCount(variant.guide.rows.length);
          else await expect(page.locator('#pdp-guide-dialog table:visible')).toHaveCount(0);
          await page.keyboard.press('Escape');
        }
        await expect(page.locator('#pdp-increase')).toBeEnabled();
        for (let i = 0; i < 8; i++) await page.locator('#pdp-increase').click();
        await expect(page.locator('#pdp-quantity')).toHaveText('9');
        await expect(page.locator('#pdp-increase')).toBeDisabled();
        await expect(page.locator('#pdp-add-to-bag')).toBeDisabled();
        const schema = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text)).find(data => data['@type'] === 'Product');
        expect(schema.offers).toBeUndefined();
        expect(schema.image).toHaveLength(product.variants.length * 2);
        await expect(page.locator('.pdp-page')).not.toContainText(/Ships within|Coming soon|\$\d/);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(await page.evaluate(() => localStorage.getItem('fr-cart'))).toBeNull();
        expect(errors).toEqual([]);
        // Capture one family in each product format for visual QA.
        if (['mens-polo','quilted-vest','heritage-hoodie','caps','coffee-mug','horse-journal','embroidered-throw'].includes(product.slug)) {
          await page.locator(`[data-pdp-color="${product.variants[0].id}"]`).click();
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: testInfo.outputPath(`${layout}-${product.slug}.png`), fullPage: true });
        }
      });
    }
  });
}

test('gallery zoom, keyboard, focus return and swipe work', async ({ page }) => {
  await page.goto('/shop/coffee-mug');
  await page.locator('[data-pdp-view="styled"]').click();
  await page.locator('#pdp-image-open').click();
  await expect(page.locator('#pdp-zoom-dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await expect(page.locator('#pdp-zoom-level')).toHaveText('125%');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#pdp-zoom-image')).toHaveAttribute('src', /cream-horse-mug-product.png$/);
  await page.keyboard.press('Escape');
  await expect(page.locator('#pdp-image-open')).toBeFocused();
  await page.locator('#pdp-stage').evaluate(element => {
    const touch = (x, y) => new Touch({ identifier: 0, target: element, clientX: x, clientY: y });
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, changedTouches: [touch(280, 100)] }));
    element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [touch(100, 105)] }));
  });
  await expect(page.locator('#pdp-main-image')).toHaveAttribute('src', /cream-horse-mug-styled.png$/);
});

test('sizing resets on variant change and converts only its own chart', async ({ page }) => {
  await page.goto('/shop/mens-polo');
  await page.locator('[data-pdp-size="M"]').click();
  await page.locator('#pdp-size-guide').click();
  await page.getByRole('button', { name: 'Centimeters', exact: true }).click();
  await expect(page.locator('[data-pdp-guide="mens-white-polo"] td').first()).toHaveText('73.66');
  await page.keyboard.press('Escape');
  await page.locator('[data-pdp-color="mens-cream-polo"]').click();
  await expect(page.locator('#pdp-size-name')).toHaveText('Select a size');
  await page.locator('#pdp-size-guide').click();
  await expect(page.locator('[data-pdp-guide="mens-white-polo"]')).toBeHidden();
  await expect(page.locator('[data-pdp-guide="mens-cream-polo"]')).toBeVisible();
});

test('saved current, retired and unknown bag entries cannot open ordering', async ({ page }) => {
  await page.goto('/shop');
  await page.evaluate(() => localStorage.setItem('fr-cart', JSON.stringify(['mens-polo','mens-tee','unknown'].map(id => ({ id, name: id, price: 25, qty: 1 })))));
  await page.reload();
  await page.locator('#cart-btn').click();
  await expect(page.locator('.cart-empty')).toContainText('Your bag is empty.');
  await expect(page.getByRole('button', { name: 'Check out', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('fr-cart'))).toBeNull();
});

test('collection filters and all product cards use approved originals', async ({ page }) => {
  await page.goto('/shop');
  await expect(page.locator('#merch-grid .merch-card')).toHaveCount(18);
  for (const filter of ['mens','womens','youth','layers','accessories','home','all']) {
    await page.locator(`[data-filter="${filter}"]`).click();
    const count = filter === 'all' ? PRODUCTS.length : PRODUCTS.filter(product => product.group === filter).length;
    await expect(page.locator('#merch-grid .merch-card:visible')).toHaveCount(count);
  }
  for (const product of PRODUCTS) {
    const card = page.locator(`#merch-grid .merch-card[href="/shop/${product.slug}"]`);
    await expect(card).toContainText('Out of stock');
    await expect(card.locator('img')).toHaveAttribute('src', product.variants[0].images.product.src);
  }
});

test('previous product URLs remain useful with ordering closed', async ({ page }) => {
  for (const legacy of LEGACY.filter(legacy => !PRODUCTS.some(product => product.slug === legacy.slug))) {
    const response = await page.goto(`/shop/${legacy.slug}`);
    expect(response.status()).toBe(200);
    await expect(page.getByText('This style is not currently available.', { exact: false })).toBeVisible();
    await expect(page.locator('#pdp-add-to-bag, #atb')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Browse the collection', exact: true })).toBeVisible();
  }
});
