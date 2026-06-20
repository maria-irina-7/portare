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

  // Wait for carousel layout if it exists
  await page
    .locator('div[aria-roledescription="carousel"]')
    .waitFor({ state: "attached" })
    .catch(() => {});

  const itemsLocator = page.locator(
    '.ServiceCardRoot[data-testid="CONFIG_PLAN_CARD"]',
  );
  const items = await itemsLocator.all();

  const vodafoneSubscription = [];

  // Looping sequentially
  for (const item of items) {
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

    try {
      // Find the button specifically inside this current plan card
      const detailsButton = item.locator("button", {
        hasText: "Vezi toate beneficiile",
      });

      if ((await detailsButton.count()) > 0) {
        await detailsButton.click();

        // Target the plan modal while ignoring the hidden OneTrust cookie dialog
        const dialog = page.locator(
          'div[role="dialog"]:not([aria-label*="Cookie"])',
        );
        await dialog.waitFor({ state: "visible", timeout: 5000 });

        const detailsRaw = await dialog.locator("ul > li").allTextContents();

        const details = detailsRaw
          .map((text) => text.trim())
          .filter((text) => text.length > 0);

        // Close the modal using Escape so the next loop cycle can click its button
        await page.keyboard.press("Escape");
        await page.waitForTimeout(500); // Give the closing animation a moment

        vodafoneSubscription.push({
          numePlan: nameRaw ? nameRaw.trim() : "",
          price: priceRaw ? priceRaw.trim() : "",
          beneficii: details,
        });
      } else {
        vodafoneSubscription.push({
          numePlan: nameRaw ? nameRaw.trim() : "",
          price: priceRaw ? priceRaw.trim() : "",
          beneficii: [],
        });
      }
    } catch (err) {
      console.error(
        `Could not read modal details for ${nameRaw}:`,
        err.message,
      );

      // Fallback so we don't drop the plan's basic data if the modal errors out
      vodafoneSubscription.push({
        numePlan: nameRaw ? nameRaw.trim() : "",
        price: priceRaw ? priceRaw.trim() : "",
        beneficii: [],
      });

      // Clear any stuck modals
      await page.keyboard.press("Escape").catch(() => {});
    }
  }

  console.log(vodafoneSubscription);
  return vodafoneSubscription;
}
