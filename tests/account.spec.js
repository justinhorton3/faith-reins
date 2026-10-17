import { test, expect } from '@playwright/test';

const profile = { firstName: 'Taylor', lastName: 'Stone', nickname: 'Taylor', phone: '870-555-0101', loginEmail: 'taylor@example.test', memberSince: '2026-01-01' };
const id = '55555555-5555-4555-8555-555555555555';
const purchase = { id, number: '1001', date: '2026-10-01T12:00:00.000Z', currency: 'USD', total: '45.00', paymentStatus: 'PAID', fulfillmentStatus: 'FULFILLED', status: 'APPROVED', items: [{ name: 'Faith Reins polo', quantity: 1, amount: '45.00', kind: 'shop', frequency: '', subscriptionTitle: '' }] };
const gift = { ...purchase, number: '1002', total: '25.00', items: [{ name: 'Support the mission', quantity: 1, amount: '25.00', kind: 'giving', frequency: 'MONTH', subscriptionTitle: 'Monthly support' }] };
async function fixture(page, custom) {
  await page.route('**/api/account/**', async route => {
    const path = new URL(route.request().url());
    if (custom && await custom(route, path)) return;
    if (path.pathname.endsWith('/session')) return route.fulfill({ json: { profile } });
    if (path.pathname.endsWith('/receipts')) return route.fulfill({ json: { receipts: [{ number: 'R-1001', downloadUrl: 'https://files.wixstatic.com/issued-receipt.pdf' }] } });
    if (path.pathname.endsWith('/orders/' + id)) return route.fulfill({ json: { order: purchase } });
    if (path.pathname.endsWith('/orders')) return route.fulfill({ json: { orders: [path.searchParams.get('kind') === 'shop' || path.searchParams.get('kind') === 'all' ? purchase : gift], nextCursor: '' } });
    return route.fulfill({ status: 404, json: { error: { message: 'Not available.' } } });
  });
}

test('signed-out account uses managed login and discards legacy browser tokens', async ({ page }) => {
  let directOAuth = false;
  await page.addInitScript(() => { sessionStorage.setItem('fr-member-session', 'old-session'); sessionStorage.setItem('fr-member-login', 'old-request'); });
  await page.route('https://www.wixapis.com/**', route => { directOAuth = true; return route.abort(); });
  await page.route('**/api/account/session', route => route.fulfill({ status: 401, json: { error: { code: 'SIGN_IN_REQUIRED', message: 'Sign in.' } } }));
  await page.goto('/account#code=old-code');
  await expect(page.locator('[data-account-login]')).toBeVisible();
  await expect(page.locator('[data-account-login]')).toHaveAttribute('href', /^\/api\/auth\/login\?returnToUrl=/);
  await expect(page.locator('[data-account-member]')).toBeHidden();
  expect(await page.evaluate(() => sessionStorage.getItem('fr-member-session'))).toBeNull();
  expect(await page.evaluate(() => sessionStorage.getItem('fr-member-login'))).toBeNull();
  expect(new URL(page.url()).hash).toBe(''); expect(directOAuth).toBe(false);
});

for (const width of [1440, 390, 320]) {
  test(`account views fit ${width}px and keep private content behind the session`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    await fixture(page);
    for (const route of ['/account', '/account/orders', '/account/giving', '/account/recurring', '/account/profile', '/account/order?order=' + id]) {
      await page.goto(route);
      await expect(page.locator('[data-account-member]')).toBeVisible();
      await expect(page.locator('[data-account-name]')).toHaveText('Taylor');
      await expect(page.locator('[data-account-loading]')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    }
  });
}

test('purchase and giving history stay distinct and pagination appends safely', async ({ page }) => {
  await fixture(page, async (route, path) => {
    if (!path.pathname.endsWith('/orders') || path.searchParams.get('kind') !== 'shop') return false;
    await route.fulfill({ json: { orders: [{ ...purchase, number: path.searchParams.has('cursor') ? '1003' : '1001' }], nextCursor: path.searchParams.has('cursor') ? '' : 'next-page' } }); return true;
  });
  await page.goto('/account/orders');
  await expect(page.locator('.account-order')).toHaveCount(1);
  await page.getByRole('button', { name: 'Load more', exact: true }).click();
  await expect(page.locator('.account-order')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Load more', exact: true })).toBeHidden();
  await page.locator('nav[aria-label="Account navigation"]').getByRole('link', { name: 'My Giving' }).click();
  await expect(page.locator('.account-order')).toContainText('Support the mission');
  await expect(page.locator('.account-order')).not.toContainText('Faith Reins polo');
});

test('order details retrieve issued receipts only on request', async ({ page }) => {
  let receiptRequests = 0;
  await fixture(page, async (route, path) => {
    if (!path.pathname.endsWith('/receipts')) return false;
    receiptRequests++; await route.fulfill({ json: { receipts: [{ number: 'R-1001', downloadUrl: 'https://files.wixstatic.com/issued-receipt.pdf' }] } }); return true;
  });
  await page.goto('/account/order?order=' + id);
  await expect(page.locator('[data-account-content]')).toContainText('Faith Reins polo');
  expect(receiptRequests).toBe(0);
  await page.getByRole('button', { name: 'Find available receipts' }).click();
  await expect(page.getByRole('link', { name: 'Download receipt R-1001' })).toHaveAttribute('href', 'https://files.wixstatic.com/issued-receipt.pdf');
  expect(receiptRequests).toBe(1);
});

test('profile form saves only allowed fields and reports the verified result', async ({ page }) => {
  let saved;
  await fixture(page, async route => {
    if (route.request().method() !== 'PATCH') return false;
    saved = route.request().postDataJSON();
    await route.fulfill({ json: { profile: { ...profile, ...saved } } }); return true;
  });
  await page.goto('/account/profile');
  await page.getByLabel('First name', { exact: true }).fill('Tay');
  await expect(page.getByLabel('Sign-in email', { exact: true })).toHaveAttribute('readonly', '');
  await page.getByRole('button', { name: 'Save details' }).click();
  await expect(page.getByRole('status')).toContainText('Your details have been saved.');
  expect(Object.keys(saved).sort()).toEqual(['firstName', 'lastName', 'nickname', 'phone']);
  expect(saved.firstName).toBe('Tay');
});

test('expired session removes private records and returns to sign-in', async ({ page }) => {
  await fixture(page, async (route, path) => {
    if (!path.pathname.endsWith('/orders')) return false;
    if (path.searchParams.has('cursor')) await route.fulfill({ status: 401, json: { error: { message: 'Sign in again.' } } });
    else await route.fulfill({ json: { orders: [purchase], nextCursor: 'next-page' } });
    return true;
  });
  await page.goto('/account/orders');
  await expect(page.locator('.account-order')).toContainText('Faith Reins polo');
  await page.getByRole('button', { name: 'Load more', exact: true }).click();
  await expect(page.locator('[data-account-login]')).toBeVisible();
  await expect(page.locator('[data-account-content]')).toBeEmpty();
  await expect(page.locator('[data-account-name]')).toBeEmpty();
});

test('unverified email and service failures show honest error states', async ({ page }) => {
  await page.route('**/api/account/session', route => route.fulfill({ status: 403, json: { error: { message: 'Please verify your sign-in email before viewing private account records.' } } }));
  await page.goto('/account');
  await expect(page.locator('[data-account-error]')).toContainText('verify your sign-in email');
  await expect(page.locator('[data-account-member]')).toBeHidden();
  await page.unroute('**/api/account/session');
  await fixture(page, async (route, path) => {
    if (!path.pathname.endsWith('/orders')) return false;
    await route.fulfill({ status: 503, json: { error: { message: 'The service is unavailable. Please try again.' } } }); return true;
  });
  await page.goto('/account/orders');
  await expect(page.locator('[data-account-content] [role="alert"]')).toContainText('service is unavailable');
  await expect(page.locator('[data-account-content]')).not.toContainText('No linked purchases');
});

test('record names are rendered as text and recurring history does not invent billing status', async ({ page }) => {
  await fixture(page, async (route, path) => {
    if (!path.pathname.endsWith('/orders')) return false;
    await route.fulfill({ json: { orders: [{ ...gift, items: [{ ...gift.items[0], subscriptionTitle: '<img src=x onerror=alert(1)>' }] }], nextCursor: '' } }); return true;
  });
  await page.goto('/account/recurring');
  await expect(page.locator('.account-order h3')).toHaveText('<img src=x onerror=alert(1)>');
  await expect(page.locator('[data-account-content] img')).toHaveCount(0);
  await expect(page.locator('[data-account-content]')).toContainText('rather than a live billing schedule');
  await expect(page.locator('[data-account-content]')).not.toContainText('Next charge:');
});

test('shipment tracking is fetched for the chosen order without inventing carrier links', async ({ page }) => {
  await fixture(page, async (route, path) => {
    if (!path.pathname.endsWith('/tracking')) return false;
    await route.fulfill({ json: { shipments: [{ number: 'TEST-001', carrier: 'Carrier', trackingUrl: 'https://carrier.example/TEST-001' }] } }); return true;
  });
  await page.goto('/account/order?order=' + id);
  await page.getByRole('button', { name: 'Check shipment tracking' }).click();
  await expect(page.getByRole('link', { name: 'Track shipment: Carrier · TEST-001' })).toHaveAttribute('href', 'https://carrier.example/TEST-001');
});
