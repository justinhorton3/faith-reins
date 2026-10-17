import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1000 } });
const menus = ['about', 'therapies', 'families', 'providers', 'involved', 'shop'];

test('six full-width menus coordinate, preserve the solid header and close accessibly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-nav summary')).toHaveText(['About+', 'Therapies+', 'For Families+', 'For Providers+', 'Get Involved+', 'Shop+']);
  const header = page.locator('.site-header');
  const before = await header.evaluate(node => ({ background: getComputedStyle(node).backgroundColor, height: node.getBoundingClientRect().height }));
  for (const id of menus) {
    await page.locator(`[data-mega-menu="${id}"] > summary`).click();
    await expect(page.locator(`#mega-${id}`)).toBeVisible();
    await expect(page.locator('[data-mega-menu][open]')).toHaveCount(1);
    const bounds = await page.locator(`#mega-${id}`).boundingBox();
    expect(bounds.x).toBe(0); expect(bounds.width).toBe(1440);
    expect(bounds.height).toBeGreaterThan(700);
  }
  expect(await header.evaluate(node => getComputedStyle(node).backgroundColor)).toBe(before.background);
  expect(await header.evaluate(node => node.getBoundingClientRect().height)).toBe(before.height);
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-mega-menu][open]')).toHaveCount(0);
  await expect(page.locator('[data-mega-menu="shop"] > summary')).toBeFocused();
  await page.locator('[data-mega-menu="about"] > summary').click();
  await page.locator('#mega-about [data-mega-close]').click();
  await expect(page.locator('[data-mega-menu="about"] > summary')).toBeFocused();
  await page.locator('[data-mega-menu="families"] > summary').click();
  await page.locator('.utility').click({ position: { x: 20, y: 10 } });
  await expect(page.locator('[data-mega-menu][open]')).toHaveCount(0);
  await expect(page.locator('.utility a', { hasText: 'My Account' })).toHaveAttribute('href', /\/account(?:\.html)?$/);
});

test('mobile drawer exposes all six groups, account and Donate without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.site-header__support a')).toHaveText('Donate');
  await page.getByRole('button', { name: 'Open menu', exact: true }).click();
  await expect(page.locator('#drawer')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toBeFocused();
  for (const label of ['About', 'Therapies', 'For Families', 'For Providers', 'Get Involved', 'Shop']) {
    const summary = page.locator('[data-mobile-group] > summary').filter({ hasText: label });
    await summary.click();
    await expect(page.locator('[data-mobile-group][open]')).toHaveCount(1);
  }
  await expect(page.locator('#drawer').getByRole('link', { name: 'My Account', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  await page.getByRole('button', { name: 'Close menu', exact: true }).focus();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('.drawer__phone')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#drawer')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused();
  expect(await page.locator('main').evaluate(node => node.inert)).toBe(false);
});

test('persona destinations and old volunteer links remain usable', async ({ page }) => {
  for (const route of ['/get-involved', '/volunteer', '/site-map', '/account', '/join-our-team#volunteer', '/for-families#what-to-expect', '/for-referring-providers#clinical-approach', '/faq#for-providers']) {
    const result = await page.goto(route);
    expect(result.status()).toBe(200);
    const hash = route.split('#')[1];
    if (hash) await expect(page.locator(`[id="${hash}"]`)).toHaveCount(1);
  }
});
