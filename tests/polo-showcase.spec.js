import { test, expect } from "@playwright/test";

test.describe("Men’s polo showcase", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/shop/mens-polo"); });

  test("all colors and sizes keep purchasing disabled", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Men’s Horse Polo");
    await expect(page.locator(".polo-stock")).toHaveText("Out of stock");
    for (const [color, name] of [["white", "White"], ["cream", "Cream"], ["forest-green", "Forest Green"]]) {
      await page.getByRole("button", { name, exact: true }).click();
      for (const size of ["S", "M", "L", "XL", "2XL", "3XL"]) {
        await page.locator(`[data-polo-size="${size}"]`).click();
        await expect(page.locator("#polo-add-to-bag")).toBeDisabled();
      }
      await expect(page.locator("#polo-main-image")).toHaveAttribute("src", new RegExp(`mens-${color}-polo-product.png$`));
      await expect(page.locator("#polo-selection")).toContainText(`${name}, 3XL`);
    }
    expect(await page.evaluate(() => localStorage.getItem("fr-cart"))).toBeNull();
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const product = schemas.map((text) => JSON.parse(text)).find((data) => data["@type"] === "Product");
    expect(product.offers).toBeUndefined();
    expect(product.image).toHaveLength(6);
    await expect(page.locator(".polo-page")).not.toContainText(/Ships within|Coming soon|\$32/);
  });

  test("gallery, zoom, keyboard and focus return work", async ({ page }) => {
    await page.getByRole("button", { name: "Styled view", exact: true }).click();
    await expect(page.locator("#polo-main-image")).toHaveAttribute("src", /white-polo-styled.png$/);
    await page.locator("#polo-image-open").click();
    await expect(page.locator("#polo-zoom-dialog")).toBeVisible();
    await page.getByRole("button", { name: "Zoom in", exact: true }).click();
    await expect(page.locator("#polo-zoom-level")).toHaveText("125%");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("#polo-zoom-image")).toHaveAttribute("src", /white-polo-product.png$/);
    await page.keyboard.press("Escape");
    await expect(page.locator("#polo-zoom-dialog")).not.toBeVisible();
    await expect(page.locator("#polo-image-open")).toBeFocused();
  });

  test("size chart converts units and stays specific to white", async ({ page }) => {
    await page.locator("#polo-size-guide").click();
    await expect(page.locator("#polo-guide-dialog")).toBeVisible();
    await page.getByRole("button", { name: "Centimeters", exact: true }).click();
    await expect(page.locator("#polo-white-guide td").first()).toHaveText("73.66");
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Cream", exact: true }).click();
    await page.locator("#polo-size-guide").click();
    await expect(page.locator("#polo-white-guide")).toBeHidden();
    await expect(page.locator("#polo-other-guide")).toBeVisible();
  });

  test("old polo selections cannot survive in the shopping bag", async ({ page }) => {
    await page.evaluate(() => localStorage.setItem("fr-cart", JSON.stringify([
      { id: "mens-polo", name: "Men's Polo", price: 32, size: "M", qty: 1, img: "/assets/shop/mens-polo.webp" },
      { id: "mens-tee", name: "Men's Tee", price: 24, size: "M", qty: 1, img: "/assets/shop/mens-tee.webp" },
    ])));
    await page.reload();
    await page.locator("#cart-btn").click();
    await expect(page.locator(".cart-item__name")).toHaveText("Men's Tee");
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("fr-cart")).map((item) => item.id))).toEqual(["mens-tee"]);
  });

  test("collection card leads to the new unavailable page", async ({ page }) => {
    await page.goto("/shop");
    const card = page.locator('.merch-card[href="/shop/mens-polo"]');
    await expect(card).toContainText("Out of stock");
    await expect(card.locator("img")).toHaveAttribute("src", /v7\/polos\/mens-white-polo-product.png$/);
    await card.click();
    await expect(page.locator("[data-polo-showcase]")).toBeVisible();
    await expect(page.locator("#polo-add-to-bag")).toBeDisabled();
  });

  for (const [label, width, height] of [["desktop", 1440, 1000], ["mobile", 390, 844]]) {
    test(`${label} images load without overflow or browser errors`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("#polo-main-image")).toBeVisible();
      for (const name of ["White", "Cream", "Forest Green"]) {
        await page.getByRole("button", { name, exact: true }).click();
        for (const view of ["Product view", "Styled view"]) {
          await page.getByRole("button", { name: view, exact: true }).click();
          await expect.poll(() => page.locator("#polo-main-image").evaluate((img) => img.complete && img.naturalWidth === 1086)).toBe(true);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect(errors).toEqual([]);
      await page.getByRole("button", { name: "White", exact: true }).click();
      await page.screenshot({ path: testInfo.outputPath(`${label}.png`), fullPage: true });
      await testInfo.attach(`${label} layout`, { path: testInfo.outputPath(`${label}.png`), contentType: "image/png" });
    });
  }
});
