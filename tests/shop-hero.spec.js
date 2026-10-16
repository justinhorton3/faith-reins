import { test, expect } from '@playwright/test';
import PRODUCTS from '../src/lib/products.json' with { type: 'json' };
for (const width of [1440,1024,768,767,390,320]) {
  test(`shop editorial hero at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height:1000 });
    await page.goto('/shop');
    const hero=page.locator('.shop-editorial');
    await expect(hero.getByRole('heading', { level:1 })).toHaveText('Wear the mission.');
    await expect(hero.getByRole('heading', { level:1 })).toHaveCSS('color', 'rgb(243, 238, 228)');
    await expect(hero.locator('img')).toHaveCount(1);
    await expect(hero.locator('img')).toHaveAttribute('src', /barn-collection.webp$/);
    await expect(hero.locator('img')).toHaveAttribute('alt', /hoodie, cream tee, cap, mug/);
    for(const image of await hero.locator('img').all()) {
      await expect.poll(()=>image.evaluate(element=>element.complete && element.naturalWidth===2172 && element.naturalHeight===724)).toBe(true);
      expect(await image.evaluate(element=>getComputedStyle(element).objectFit)).toBe('cover');
      const rect=await image.boundingBox();
      if(width<1280) expect(Math.abs(rect.height/rect.width-1/2)).toBeLessThan(.01);
      // Right-aligned cover must retain the entire product cluster in the right 60%.
      const scale=Math.max(rect.width/2172,rect.height/724);
      expect((2172-rect.width/scale)/2172).toBeLessThan(.4);
      expect(rect.height/scale/724).toBeGreaterThan(.99);
    }
    const corner=page.locator('.shop-corner');
    await expect(corner.getByRole('heading',{name:'A little more Faith Reins.'})).toBeVisible();
    await corner.scrollIntoViewIfNeeded();
    await expect.poll(()=>corner.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
    const cornerImage=await corner.locator('img').boundingBox();
    expect(Math.abs(cornerImage.height/cornerImage.width-1594/1458)).toBeLessThan(.01);
    await corner.screenshot({path:testInfo.outputPath(`merch-corner-${width}.png`)});
    await page.evaluate(()=>scrollTo(0,0));
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:testInfo.outputPath(`hero-${width}.png`)});
    const overflow = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(element => element.offsetParent && element.getBoundingClientRect().right > innerWidth + 1).map(element => ({ tag:element.tagName, class:element.className, width:element.getBoundingClientRect().width, right:element.getBoundingClientRect().right })));
    expect(overflow, JSON.stringify(overflow)).toEqual([]);
    await expect(page.locator('img[src*="hero-shop-"]')).toHaveCount(0);
    await hero.getByRole('link',{name:'Explore the collection'}).click();
    await expect(page).toHaveURL(/#shop-products$/);
    await expect(page.locator('#merch-grid .merch-card')).toHaveCount(PRODUCTS.length);
  });
}
test('other page heroes retain their existing photographs',async({page})=>{
  await page.goto('/our-mission');
  await expect(page.locator('.shop-editorial')).toHaveCount(0);
  await expect(page.locator('.hero__img')).toHaveAttribute('src',/hero-our-mission-desktop.webp$/);
});
