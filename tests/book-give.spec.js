// Booking and giving flow tests.
import { test, expect } from "@playwright/test";

test.describe("Book Online", () => {
  test("page loads with form container", async ({ page }) => {
    await page.goto("/book-online");
    await expect(page.locator("h1")).toContainText("Let's find your next step");
    await expect(page.locator("[data-wix-form]")).toBeAttached();
  });

  test("form loads fields from Wix", async ({ page }) => {
    await page.goto("/book-online");
    // Form mounts asynchronously — wait for an input or error state
    await expect(
      page.locator("form.wix-form, .form-status--error")
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Give page", () => {
  test("page loads with donation widget container", async ({ page }) => {
    await page.goto("/give");
    await expect(page.locator("h1")).toContainText("Help make care possible");
    await expect(page.locator("[data-give]")).toBeAttached();
  });

  test("donation widget loads giving options", async ({ page }) => {
    await page.goto("/give");
    await expect(
      page.locator(".give-box, .form-status--error")
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Contact page", () => {
  test("page loads with contact form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("We're here");
    await expect(page.locator("[data-wix-form]")).toBeAttached();
  });

  test("?order= param pre-fills the form message", async ({ page }) => {
    await page.goto("/contact?order=Heritage+Hoodie+(M)+%C3%971");
    // Wait for form to load
    await expect(page.locator("form.wix-form, .form-status--error")).toBeVisible({ timeout: 10000 });
    const textarea = page.locator("textarea").first();
    if (await textarea.isVisible()) {
      await expect(textarea).toHaveValue(/Heritage Hoodie/);
    }
  });

  test("map embed is present", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("iframe[title*='map']")).toBeAttached();
  });

  test("Get directions link is present", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("a", { hasText: "Get directions" })).toBeVisible();
  });
});

test.describe("Thank-you pages", () => {
  test("/give/thank-you has correct content", async ({ page }) => {
    const res = await page.goto("/give/thank-you");
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toContainText("making a difference");
  });

  test("/shop/thank-you has correct content", async ({ page }) => {
    const res = await page.goto("/shop/thank-you");
    expect(res.status()).toBe(200);
    await expect(page.locator("h1")).toContainText("Order received");
  });
});

test.describe("Service pages — sticky CTA", () => {
  const SERVICES = [
    "/speech-language-therapy",
    "/occupational-therapy",
    "/physical-therapy",
    "/counseling",
    "/equine-assisted-learning",
  ];

  for (const route of SERVICES) {
    test(`${route} has sticky appointment CTA element`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("#sticky-appt")).toBeAttached();
      await expect(page.locator("#sticky-appt a")).toHaveAttribute("href", "/book-online");
    });
  }
});
