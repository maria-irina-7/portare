import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';


function isNational(textLower) {
  return textLower.includes('național') || textLower.includes('national');
}

function isNetwork(textLower, operator) {
  return textLower.includes('rețea') || textLower.includes('retea') || textLower.includes(operator);
}

function isRoaming(textLower) {
  return textLower.includes('see') || textLower.includes('roaming') || textLower.includes('internațional') || textLower.includes('international');
}

async function runScraper() {
  console.log(`Scrapping subscriptions...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    locale: 'ro-RO',
    timezoneId: 'Europe/Bucharest'
  });

  const page = await context.newPage();
  
  // Block media resources for fastes timing
  await page.route('**/*.{png,jpg,jpeg,gif,webp,svg,woff,woff2}', route => route.abort());


  // =================================================================
  // DIGI MOBIL
  // =================================================================
  try {
    console.log("Digi...");
    await page.goto('https://www.digi.ro/servicii/telefonie-mobila/abonamente', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });

    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(2000); 

    await page.waitForSelector('.service-item-list', { timeout: 5000 });
    const itemsLocator = page.locator('.service-item');
    const items = await itemsLocator.all();

    const digiSubscription = await Promise.all(
      items.map(async (item) => {
        const nameRaw = await item.locator('.service-item-subtitle > span').textContent().catch(() => '');
        const priceRaw = await item.locator('.service-item-price').textContent().catch(() => '')
        const detailsRaw = await item.locator('ul > li').allTextContents();

        const details = detailsRaw.map(text => text.trim()).filter(text => text.length > 0);

        let results = {
          internet: 'Nu',
          minutesNetwork: 'Nu',
          minutesNational: 'Nu',
          minutesSEE: 'Nu',
          smsNetwork: 'Nu',
          smsNational: 'Nu',
          smsSEE: 'Nu'
        };

       details.forEach(text => {
          const textLower = text.toLowerCase();

          const extractValue = (str) => {
            const matchNumar = str.match(/\d+/);
            if (matchNumar) return parseInt(matchNumar[0], 10);
            if (str.includes('nelimitat') || str.includes('nelimitate')) return 'Nelimitat';
            return 'Da';
          };

          const rules = [
            { key: 'internet',          matched: textLower.includes('net') && textLower.includes('minut') },
            { key: 'minutesNetwork',    matched: textLower.includes('minut') && isNetwork(textLower, 'digi') },
            { key: 'minutesNational',   matched: textLower.includes('minut') && isNational(textLower) },
            { key: 'minutesSEE',        matched: textLower.includes('minut') && isRoaming(textLower) },
            { key: 'smsNetwork',        matched: textLower.includes('sms')   && isNetwork(textLower, 'digi') },
            { key: 'smsNational',       matched: textLower.includes('sms')   && isNational(textLower) },
            { key: 'smsSEE',            matched: textLower.includes('sms')   && isRoaming(textLower) },
          ];

          for (const rule of rules) {
            if (rule.matched) {
              const extracted = extractValue(textLower);
              if (extracted) {
                results[rule.key] = extracted;
              }
            }
          }
        });

        return {
          numePlan: nameRaw ? nameRaw.trim() : '',
          price: priceRaw ? priceRaw.trim() : '',
          ...results
        };
      })
    );

    console.log(digiSubscription);

  } catch (error) {
    console.error("Error when scraping Digi:", error.message);
  }

  await browser.close();
}

runScraper();
