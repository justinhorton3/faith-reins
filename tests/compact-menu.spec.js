import { test, expect } from '@playwright/test';

const ids = ['about', 'therapies', 'families', 'providers', 'involved', 'shop'];
const trigger = (page, id) => page.locator(`[data-mega-menu="${id}"] > summary`);
const openMenus = page => page.locator('[data-mega-menu][open]');
test.use({ viewport: { width: 1440, height: 900 } });

test('hover intent avoids fly-by opening, stays over image tiles, and dismisses after leaving', async ({ page }) => {
  await page.goto('/');
  await trigger(page, 'about').hover();
  await page.waitForTimeout(100);
  await expect(openMenus(page)).toHaveCount(0);
  await expect(page.locator('#mega-about')).toBeVisible();
  await page.locator('#mega-about .mega-card').first().hover();
  await page.waitForTimeout(350);
  await expect(page.locator('#mega-about')).toBeVisible();
  await page.mouse.move(15, 650);
  await expect(openMenus(page)).toHaveCount(0);
  await trigger(page, 'shop').hover();
  await expect(page.locator('#mega-shop')).toBeVisible();
});

test('diagonal movement across another label reaches the original menu without flicker', async ({ page }) => {
  await page.goto('/');
  await trigger(page, 'about').hover();
  await expect(page.locator('#mega-about')).toBeVisible();
  const other = await trigger(page, 'therapies').boundingBox();
  const tile = await page.locator('#mega-about .mega-card').last().boundingBox();
  await page.mouse.move(other.x + other.width / 2, other.y + other.height * .6, { steps: 5 });
  await page.mouse.move(tile.x + 30, tile.y + 25, { steps: 15 });
  await page.waitForTimeout(400);
  await expect(page.locator('#mega-about')).toBeVisible();
  await expect(openMenus(page)).toHaveCount(1);
});

test('Escape cancels hover without reopening under a stationary pointer; click still works', async ({ page }) => {
  await page.goto('/');
  await trigger(page, 'about').hover();
  await expect(page.locator('#mega-about')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger(page, 'about')).toBeFocused();
  await page.waitForTimeout(700);
  await expect(openMenus(page)).toHaveCount(0);
  await trigger(page, 'about').click();
  await expect(page.locator('#mega-about')).toBeVisible();
  await expect(trigger(page, 'about')).toHaveAttribute('aria-expanded', 'true');
  await trigger(page, 'about').click();
  await expect(openMenus(page)).toHaveCount(0);
});

test('keyboard focus keeps the menu stable during mouse movement and returns on close', async ({ page }) => {
  await page.goto('/');
  await trigger(page, 'therapies').focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.locator('#mega-therapies .mega-panel__overview')).toBeFocused();
  await trigger(page, 'shop').hover();
  await page.waitForTimeout(400);
  await expect(page.locator('#mega-therapies')).toBeVisible();
  await page.mouse.move(15, 650);
  await page.waitForTimeout(400);
  await expect(page.locator('#mega-therapies')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger(page, 'therapies')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.locator('#mega-therapies')).toBeVisible();
  await page.locator('.utility a').first().focus();
  await expect(openMenus(page)).toHaveCount(0);
});

for (const width of [1280, 1440, 1920]) {
  test(`all six panels fit content and preserve approved images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const id of ids) {
      await trigger(page, id).click();
      const panel = page.locator(`#mega-${id}`);
      const box = await panel.boundingBox();
      expect(box.width).toBe(width);
      expect(box.height).toBeLessThanOrEqual(460);
      expect(box.y + box.height).toBeLessThan(900);
      await expect(panel.locator('.mega-panel__intro')).toHaveCount(0);
      for (const img of await panel.locator('.mega-card__image').all()) {
        await expect(img).toBeVisible();
        await expect.poll(() => img.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    }
  });
}

test('short desktop and 200% equivalent layout keep all destinations reachable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 400 });
  await page.goto('/');
  await trigger(page, 'shop').click();
  const panel = page.locator('#mega-shop');
  const box = await panel.boundingBox();
  expect(box.y + box.height).toBeLessThanOrEqual(400);
  await panel.locator('.mega-card').last().scrollIntoViewIfNeeded();
  await expect(panel.locator('.mega-card').last()).toBeInViewport();
  await panel.locator('.mega-panel__foot a').scrollIntoViewIfNeeded();
  await expect(panel.locator('.mega-panel__foot a')).toBeInViewport();
  await page.setViewportSize({ width: 720, height: 450 });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.locator('#drawer')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(720);
});

for (const [width, height] of [[768,1024],[820,1180],[1024,768],[360,800],[390,844],[430,932]]) {
  test(`touch drawer images and access controls at ${width}×${height}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height }, hasTouch: true });
    const page = await context.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
    for (const group of await page.locator('[data-mobile-group]').all()) {
      await group.locator('summary').tap();
      await expect(page.locator('[data-mobile-group][open]')).toHaveCount(1);
      const cards = group.locator('.drawer-card');
      const first = await cards.first().boundingBox();
      const second = await cards.nth(1).boundingBox();
      expect(first.height).toBeGreaterThanOrEqual(44);
      expect(width >= 768 ? Math.abs(first.y - second.y) : Math.abs(first.x - second.x)).toBeLessThan(1);
      await cards.last().scrollIntoViewIfNeeded();
      await expect(cards.last()).toBeInViewport();
      await expect.poll(() => cards.last().locator('img').evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator('#drawer').getByRole('link', { name: 'My Account', exact: true })).toHaveAttribute('href', /\/account(?:\.html)?$/);
    await expect(page.locator('[data-drawer-bag]')).toHaveText('Shopping bag ↗');
    await expect(page.locator('.drawer__foot a').first()).toHaveText('Donate');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await page.keyboard.press('Escape');
    await expect(page.locator('#drawer')).toBeHidden();
    expect(await page.locator('main').evaluate(el => el.inert)).toBe(false);
    await context.close();
  });
}

test('wide touch viewport opens by tap and does not require hover', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true });
  const page = await context.newPage();
  await page.goto('/');
  await trigger(page, 'shop').tap();
  await expect(page.locator('#mega-shop')).toBeVisible();
  await page.waitForTimeout(700);
  await expect(page.locator('#mega-shop')).toBeVisible();
  await trigger(page, 'shop').tap();
  await expect(openMenus(page)).toHaveCount(0);
  await context.close();
});

test('shopping bag hands off from the drawer and restores page access', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.locator('[data-drawer-bag]').click();
  await expect(page.locator('#drawer')).toBeHidden();
  await expect(page.locator('#cart-drawer')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close bag', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Close bag', exact: true }).click();
  await expect(page.locator('#cart-drawer')).toBeHidden();
  expect(await page.locator('main').evaluate(el => el.inert)).toBe(false);
});

test('breakpoint changes cancel pending hover and restore drawer background', async ({ page }) => {
  await page.goto('/');
  await trigger(page, 'about').hover();
  await page.setViewportSize({ width: 1279, height: 900 });
  await page.waitForTimeout(400);
  await expect(openMenus(page)).toHaveCount(0);
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator('#drawer')).toBeHidden();
  expect(await page.locator('main').evaluate(el => el.inert)).toBe(false);
  await expect(page.getByRole('navigation', { name: 'Primary', exact: true })).toBeVisible();
});

test('native desktop disclosure and small-screen site map work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('/');
  await trigger(page, 'about').click();
  await expect(page.locator('#mega-about .mega-card').first()).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.site-header__compact noscript a')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await context.close();
});

test('reduced motion and representative responsive screenshots', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await trigger(page, 'about').locator('.mega-toggle').evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
  await trigger(page, 'about').click();
  await page.screenshot({ path: testInfo.outputPath('menu-desktop.png') });
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.locator('[data-mobile-group] > summary').first().click();
  expect(await page.locator('[data-mobile-group] .mega-toggle').first().evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
  await page.screenshot({ path: testInfo.outputPath('menu-tablet.png') });
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await page.screenshot({ path: testInfo.outputPath('menu-mobile.png') });
});
