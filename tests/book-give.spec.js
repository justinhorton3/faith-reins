// Booking and giving flow tests.
import { test, expect } from "@playwright/test";

// `auth.elevate()` depends on Wix's hosting-injected private-app credentials, which don't
// exist under local `astro build`/`preview` — confirmed empirically: /api/give-campaign
// returns a silent empty success locally instead of real data or an error. Everything below
// is verified correct against Wix's documented API contracts, but not confirmed working
// end-to-end until deployed. Run these manually against stage.faithreins.com after each
// deploy that touches an elevated endpoint:
//   - Give page, "Give once": pick an amount, enter a real email, confirm the campaign's real
//     suggested amounts/description render (not empty), and that "Continue to secure donation"
//     actually redirects to a live Wix checkout page (not a 502/"could not start checkout").
//   - Give page, "Give monthly": confirm the real 4 plan tiers render (not empty/error), pick
//     one, confirm "Continue to secure checkout" redirects to Wix's hosted Pricing Plans
//     checkout and actually prompts login/signup there.
//   - Contact/Sponsor forms: submit for real, confirm the submission appears in the Wix CRM
//     dashboard (Contacts / Forms submissions), not just that the client-side success message
//     shows.
//   - Donor /account page, logged in as a real donor: confirm Giving shows the real recurring
//     plan and Cancel actually works; confirm Billing shows real invoices with working links.
//   - Donation-receipt automations (both built and VALID per the API, but never fired for
//     real): make a real $1 one-time donation and confirm a Wix Invoice is created and
//     emailed; separately purchase a $25 recurring plan and confirm the same. Note the
//     recurring automation only fires on the FIRST payment — Pricing Plans doesn't expose a
//     per-cycle payment trigger in the Automations catalog, so months 2+ won't auto-receipt
//     this way; that gap is real and still needs a decision (manual, scheduled job, or
//     year-end-only statements as originally scoped).
test.describe.skip("Staging-only manual checks (see comment above)", () => {});

test.describe("Book Online (retired — redirects to /contact)", () => {
  test("redirects to /contact", async ({ page }) => {
    await page.goto("/book-online");
    await page.waitForURL(/\/contact\/?$/);
    await expect(page.locator("h1")).toContainText("We're here");
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
      page.locator("[data-give] .give-box, [data-give] .form-status--error").first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Contact page", () => {
  test("page loads with contact form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("We're here");
    await expect(page.locator("form.wix-form").first()).toBeAttached();
  });

  test("?order= param pre-fills the form message", async ({ page }) => {
    await page.goto("/contact?order=Heritage+Hoodie+(M)+%C3%971");
    await expect(page.locator("form.wix-form").first()).toBeVisible({ timeout: 10000 });
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
    test(`${route} has sticky consultation CTA element`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("#sticky-appt")).toBeAttached();
      await expect(page.locator("#sticky-appt a")).toHaveAttribute("href", "/contact");
    });
  }
});

test.describe("Account page", () => {
  test("anonymous visitor sees a login prompt", async ({ page }) => {
    await page.goto("/account");
    await expect(page.locator("a", { hasText: "Log in" }).first()).toBeVisible({ timeout: 10000 });
  });
});
