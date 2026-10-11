// Shop flow tests — product page, size selection, add to cart, cart drawer.
import { test, expect } from "@playwright/test";

test.describe("Product page", () => {
  test.beforeEach(async ({ page }) => {
    // Clear cart state before each test
    await page.goto("/shop/heritage-hoodie");
    await page.evaluate(() => localStorage.removeItem("fr-cart"));
    await page.reload();
  });

  test("shows product name, price, and image", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Heritage Hoodie");
    await expect(page.locator(".product-price")).toContainText("$45");
    await expect(page.locator(".product-img img")).toBeVisible();
  });

  test("Add to bag is disabled until a size is selected", async ({ page }) => {
    const atb = page.locator("#atb");
    await expect(atb).toBeDisabled();
    await page.locator(".size-btn", { hasText: "M" }).click();
    await expect(atb).toBeEnabled();
  });

  test("selecting a size updates the label", async ({ page }) => {
    await page.locator(".size-btn", { hasText: "L" }).click();
    await expect(page.locator("#size-display")).toContainText("L");
  });

  test("adding to bag updates the cart badge", async ({ page }) => {
    await page.locator(".size-btn", { hasText: "M" }).click();
    await page.locator("#atb").click();
    await expect(page.locator("#cart-badge")).toHaveText("1");
    await expect(page.locator("#cart-badge")).toBeVisible();
  });

  test("confirmation message appears after add to bag", async ({ page }) => {
    await page.locator(".size-btn", { hasText: "S" }).click();
    await page.locator("#atb").click();
    await expect(page.locator("#atb-conf")).toContainText("Added to bag");
  });

  test("qty selector increments and decrements", async ({ page }) => {
    await page.locator("#qty-inc").click();
    await expect(page.locator("#qty-val")).toHaveText("2");
    await page.locator("#qty-dec").click();
    await expect(page.locator("#qty-val")).toHaveText("1");
    // Should not go below 1
    await page.locator("#qty-dec").click();
    await expect(page.locator("#qty-val")).toHaveText("1");
  });
});

test.describe("Cart drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop/mens-tee");
    await page.evaluate(() => localStorage.removeItem("fr-cart"));
    await page.reload();
    // Add an item first
    await page.locator(".size-btn", { hasText: "M" }).click();
    await page.locator("#atb").click();
  });

  test("cart button opens the drawer", async ({ page }) => {
    await page.locator("#cart-btn").click();
    await expect(page.locator("#cart-drawer")).toBeVisible();
    await expect(page.locator(".cart-panel__title")).toContainText("Bag");
  });

  test("drawer shows the added item", async ({ page }) => {
    await page.locator("#cart-btn").click();
    await expect(page.locator(".cart-item__name").first()).toContainText("Men's Tee");
  });

  test("drawer closes with Escape key", async ({ page }) => {
    await page.locator("#cart-btn").click();
    await expect(page.locator("#cart-drawer")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#cart-drawer")).toBeHidden();
  });

  test("drawer close button works", async ({ page }) => {
    await page.locator("#cart-btn").click();
    await page.locator(".cart-close").click();
    await expect(page.locator("#cart-drawer")).toBeHidden();
  });

  test("removing an item updates the badge", async ({ page }) => {
    await page.locator("#cart-btn").click();
    await page.locator(".cart-remove").first().click();
    await expect(page.locator("#cart-badge")).toBeHidden();
  });

  test("focus returns to cart button on close", async ({ page }) => {
    await page.locator("#cart-btn").click();
    await page.locator(".cart-close").click();
    await expect(page.locator("#cart-btn")).toBeFocused();
  });
});

test.describe("Shop index", () => {
  test("filter tabs show and hide products", async ({ page }) => {
    await page.goto("/shop");
    const drinkwareBtn = page.locator(".shop-filter", { hasText: "Drinkware" });
    await drinkwareBtn.click();
    // Apparel cards should be hidden
    await expect(page.locator(".merch-card[data-cat='apparel']").first()).toBeHidden();
    // Drinkware cards should be visible
    await expect(page.locator(".merch-card[data-cat='drinkware']").first()).toBeVisible();
  });

  test("All tab restores full grid", async ({ page }) => {
    await page.goto("/shop");
    await page.locator(".shop-filter", { hasText: "Drinkware" }).click();
    await page.locator(".shop-filter", { hasText: "All" }).click();
    await expect(page.locator(".merch-card[data-cat='apparel']").first()).toBeVisible();
  });
});
