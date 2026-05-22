import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

import { scrapeDigi } from './digi.js';



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

  try {
    await scrapeDigi(page);
  } catch (error) {
    console.error("Error when scraping Digi:", error.message);
  }

  await browser.close();
}

runScraper();
