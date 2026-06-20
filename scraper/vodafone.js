import { isNational, isNetwork, isRoaming } from "./utils.js";

export async function scrapeVodafone(page) {
  await page.addInitScript(() => {
    // Pre-set OneTrust consent cookies so the banner never initialises
    const exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1);
    const expires = `expires=${exp.toUTCString()}; path=/`;
    document.cookie = `OptanonAlertBoxClosed=${new Date().toISOString()}; ${expires}`;
    document.cookie = `OptanonConsent=isGpcEnabled=0&groups=C0001:1,C0002:1,C0003:1,C0004:1; ${expires}`;
  });

  console.log("Vodafone...");
  await page.goto("https://www.vodafone.ro/abonamente", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  await page.waitForTimeout(2000);

  await page.locator('div[aria-roledescription="carousel]"'); //

  const itemsLocator = page.locator(
    '.ServiceCardRoot[data-testid="CONFIG_PLAN_CARD"]',
  );
  const items = await itemsLocator.all();

  const vodafoneSubscription = await Promise.all(
    items.map(async (item) => {
      const nameRaw = await item
        .locator("div > div > h3")
        .textContent()
        .catch(() => "");
      const priceRaw = await item
        .locator(
          'div[data-testid="CARD_PRICE_SECTION"] > div > span:has-text("€")',
        )
        .textContent()
        .catch(() => "");

      // await page
      //   .locator("button", { hasText: "Vezi toate beneficiile" })
      //   .click();

      // const detailsRaw = await page
      //   .locator("div[role=dialog] ul > li")
      //   .allTextContents();

      // const details = detailsRaw
      //   .map((text) => text.trim())
      //   .filter((text) => text.length > 0);

      return {
        numePlan: nameRaw ? nameRaw.trim() : "",
        price: priceRaw ? priceRaw.trim() : "",
        ...details,
      };
    }),
  );

  console.log(vodafoneSubscription);
}
