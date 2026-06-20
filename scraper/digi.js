import { isNational, isNetwork, isRoaming } from "./utils.js";

export async function scrapeDigi(page) {
  console.log("Digi...");
  await page.goto("https://www.digi.ro/servicii/telefonie-mobila/abonamente", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });

  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(2000);

  await page.waitForSelector(".service-item-list", { timeout: 5000 });
  const itemsLocator = page.locator(".service-item");
  const items = await itemsLocator.all();

  const digiSubscription = await Promise.all(
    items.map(async (item) => {
      const nameRaw = await item
        .locator(".service-item-subtitle > span")
        .textContent()
        .catch(() => "");
      const priceRaw = await item
        .locator(".service-item-price")
        .textContent()
        .catch(() => "");
      const detailsRaw = await item.locator("ul > li").allTextContents();

      const details = detailsRaw
        .map((text) => text.trim())
        .filter((text) => text.length > 0);

      let results = {
        internet: "Nu",
        internet4GLimit: null,
        internet5GLimit: null,

        normal4GUpSpeed: null,
        normal4GDownSpeed: null,
        limit4GUpSpeed: null,
        limit4GDownSpeed: null,

        normal5GUpSpeed: null,
        normal5GDownSpeed: null,

        minutesNetwork: "Nu",
        minutesNational: "Nu",
        minutesSEE: "Nu",
        smsNetwork: "Nu",
        smsNational: "Nu",
        smsSEE: "Nu",
      };

      details.forEach((text) => {
        const textLower = text.toLowerCase();

        const extractValue = (str) => {
          const matchNumar = str.match(/\d+/);
          if (matchNumar) return parseInt(matchNumar[0], 10);
          if (str.includes("nelimitat") || str.includes("nelimitate"))
            return "Nelimitat";
          return "Da";
        };

        const rules = [
          {
            key: "internet",
            matched: textLower.includes("net") && textLower.includes("minut"),
            extract: () => textLower,
          },
          {
            key: "internet4GLimit",
            matched: textLower.includes("limitare") && textLower.includes("4g"),
            extract: () => textLower.match(/acces la \d+ gb/)?.[0],
          },
          {
            key: "internet5GLimit",
            matched: textLower.includes("limitare") && textLower.includes("5g"),
            extract: () => textLower.match(/acces la \d+ gb/)?.[0],
          },
          {
            key: "minutesNetwork",
            matched:
              textLower.includes("minut") && isNetwork(textLower, "digi"),
            extract: () => textLower,
          },
          {
            key: "minutesNational",
            matched: textLower.includes("minut") && isNational(textLower),
            extract: () => textLower,
          },
          {
            key: "minutesSEE",
            matched: textLower.includes("minut") && isRoaming(textLower),
            extract: () => textLower,
          },
          {
            key: "smsNetwork",
            matched: textLower.includes("sms") && isNetwork(textLower, "digi"),
            extract: () => textLower,
          },
          {
            key: "smsNational",
            matched: textLower.includes("sms") && isNational(textLower),
            extract: () => textLower,
          },
          {
            key: "smsSEE",
            matched: textLower.includes("sms") && isRoaming(textLower),
            extract: () => textLower,
          },
        ];

        for (const rule of rules) {
          if (rule.matched) {
            const rawValue = rule.extract();
            const extracted = extractValue(rawValue);
            if (extracted) {
              results[rule.key] = extracted;
            }
          }
        }
      });

      return {
        numePlan: nameRaw ? nameRaw.trim() : "",
        price: priceRaw ? priceRaw.trim() : "",
        ...results,
      };
    }),
  );

  console.log(digiSubscription);
}
