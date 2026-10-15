import { test, expect } from '@playwright/test';
for (const width of [1440,1024,768,767,390,320]) {
  test(`shop editorial hero at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height:1000 });
    await page.goto('/shop');
    const hero=page.locator('.shop-editorial');
    await expect(hero.getByRole('heading', { level:1 })).toHaveText('Wear the mission.');
    await expect(hero.getByRole('heading', { level:1 })).toHaveCSS('color', 'rgb(243, 238, 228)');
    await expect(hero.locator('img')).toHaveCount(2);
    for(const image of await hero.locator('img').all()) {
      await expect.poll(()=>image.evaluate(element=>element.complete && element.naturalWidth===1086)).toBe(true);
      expect(await image.evaluate(element=>getComputedStyle(element).objectFit)).toBe('contain');
      const rect=await image.boundingBox();
      expect(Math.abs(rect.height/rect.width-4/3)).toBeLessThan(.01);
    }
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:testInfo.outputPath(`hero-${width}.png`)});
    const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(element => element.offsetParent && element.getBoundingClientRect().right > innerWidth + 1).map(element => ({ tag:element.tagName, class:element.className, width:element.getBoundingClientRect().width, right:element.getBoundingClientRect().right })));
    expect(overflow, JSON.stringify(overflow)).toEqual([]);
    await expect(page.locator('img[src*="hero-shop-"]')).toHaveCount(0);
    await hero.getByRole('link',{name:'Explore the collection'}).click();
    await expect(page).toHaveURL(/#shop-products$/);
    await expect(page.locator('#merch-grid .merch-card')).toHaveCount(18);
  });
}
test('other page heroes retain their existing photographs',async({page})=>{
  await page.goto('/our-mission');
  await expect(page.locator('.shop-editorial')).toHaveCount(0);
  await expect(page.locator('.hero__img')).toHaveAttribute('src',/hero-our-mission-desktop.webp$/);
});
