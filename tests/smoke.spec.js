// Smoke tests — every key page loads without errors and has expected content.
import { test, expect } from "@playwright/test";

const PAGES = [
  ["/", "People. Horses. Brighter futures."],
  ["/services-programs", "Services & Programs"],
  ["/speech-language-therapy", "Helping every voice connect"],
  ["/occupational-therapy", "Skills for everyday life"],
  ["/physical-therapy", "Movement with purpose"],
  ["/counseling", "A caring space to grow"],
  ["/equine-assisted-learning", "Learning through connection"],
  ["/our-team", "Our Team"],
  ["/our-horses", "Our Horses"],
  ["/our-mission", "Our Mission"],
  ["/for-families", "For Families"],
  ["/for-referring-providers", "For Referring Providers"],
  ["/book-online", "Request an Appointment"],
  ["/payment-and-insurance", "Payment & Insurance"],
  ["/faq", "FAQ"],
  ["/give", "Give"],
  ["/give/thank-you", "Your gift is making a difference"],
  ["/shop", "Wear the mission"],
  ["/shop/heritage-hoodie", "Heritage Hoodie"],
  ["/shop/thank-you", "Order received"],
  ["/news", "News & Updates"],
  ["/news/faith-reins-mission", "Why We Do This"],
  ["/contact", "We're here to help"],
  ["/legal", "Policies & Legal Notices"],
  ["/hipaa-notice", "HIPAA Notice of Privacy Practices"],
  ["/terms-of-service", "Terms of Service"],
  ["/privacy-policy", "Privacy Policy"],
  ["/join-our-team", "Join Our Team"],
  ["/our-partners", "Our Partners"],
];

for (const [path, heading] of PAGES) {
  test(`${path} loads with expected heading`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res.status()).toBe(200);
    await expect(page.locator("h1, h2").first()).toContainText(heading, { ignoreCase: true });
  });
}

test("404 page is served for unknown routes", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist-xyz");
  expect(res.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("can't find that page", { ignoreCase: true });
});

test("nav links are present on every page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("a[href='/book-online']").first()).toBeVisible();
  await expect(page.locator("a[href='/give']").first()).toBeVisible();
  await expect(page.locator("a[href='/contact']").first()).toBeVisible();
});
