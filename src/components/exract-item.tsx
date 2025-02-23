// Install with npm install @mendable/firecrawl-js
import FireCrawlApp from '@mendable/firecrawl-js';
import { z } from 'zod';
const app = new FireCrawlApp({apiKey: "fc-65d71811097a491c98800ca693d884b6"});

const schema = z.object({
  item: z.array(z.object({
    price: z.string().optional(),
    description: z.string().optional(),
    photos: z.array(z.string()).optional()
  })),
  is_open_source: z.boolean()
});

const userInputUrl: string = userInputUrl(); // Assume getUserInputUrl is a function that retrieves the URL input by the user in the add-item component

const scrapeResult = await app.scrapeUrl([userInputUrl], {
  prompt: "Extract item price, item description, and item photos. Ensure that each item has a price and description.",
  formats: ["json"],
  jsonOptions: {schema: schema},
});

// Assuming scrapeResult is obtained from a scraping function
if (!scrapeResult.success) {
  throw new Error(`Failed to scrape: ${scrapeResult.error}`);
}

console.log(scrapeResult.data);