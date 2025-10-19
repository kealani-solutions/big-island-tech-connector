#!/usr/bin/env node

/**
 * Meetup Event Sync Script
 *
 * Automatically syncs events from Meetup.com to the local events database.
 * Uses web scraping to extract event data and updates src/data/events.ts
 *
 * Usage:
 *   node scripts/sync-events.js             # Sync all events
 *   node scripts/sync-events.js --dry-run   # Preview changes without saving
 *   node scripts/sync-events.js --verbose   # Show detailed logs
 *   node scripts/sync-events.js --force     # Force update all events
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVENTS_FILE = path.join(__dirname, '../src/data/events.ts');
const MEETUP_BASE_URL = 'https://www.meetup.com';
const MEETUP_GROUP_URL = `${MEETUP_BASE_URL}/big-island-tech/events/`;

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const VERBOSE = args.includes('--verbose');
const FORCE_UPDATE = args.includes('--force');

// Logging utilities
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warning: (msg) => console.log(`⚠️  ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  verbose: (msg) => VERBOSE && console.log(`   ${msg}`),
  change: (msg) => console.log(`🔄 ${msg}`)
};

/**
 * Scrape the main events page to get list of upcoming events
 * First try with simple fetch, fallback to Puppeteer if needed
 */
async function scrapeEventsList() {
  log.info('Fetching Meetup events list...');

  // First try with simple fetch
  try {
    log.verbose(`Fetching ${MEETUP_GROUP_URL}`);
    const response = await fetch(MEETUP_GROUP_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Look for event links
    const eventUrls = new Set();
    $('a[href*="/events/"]').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href) {
        // Convert relative URLs to absolute
        const fullUrl = href.startsWith('http') ? href : `${MEETUP_BASE_URL}${href}`;
        // Filter to only include event detail pages
        if (fullUrl.match(/\/big-island-tech\/events\/\d+/)) {
          eventUrls.add(fullUrl);
        }
      }
    });

    if (eventUrls.size > 0) {
      log.success(`Found ${eventUrls.size} events on Meetup`);
      log.verbose('Event URLs: ' + Array.from(eventUrls).join(', '));
      return Array.from(eventUrls);
    }

    log.warning('No events found with simple fetch, trying Puppeteer...');
  } catch (error) {
    log.warning(`Simple fetch failed: ${error.message}, trying Puppeteer...`);
  }

  // Fallback to Puppeteer for dynamic content
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();

    // Set a user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    log.verbose(`Navigating to ${MEETUP_GROUP_URL} with Puppeteer`);
    await page.goto(MEETUP_GROUP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait a bit for dynamic content
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract event URLs
    const eventUrls = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href*="/events/"]');
      const urls = new Set();

      links.forEach(link => {
        const href = link.href;
        // Filter to only include event detail pages (not other links)
        if (href.match(/\/big-island-tech\/events\/\d+/)) {
          urls.add(href);
        }
      });

      return Array.from(urls);
    });

    log.success(`Found ${eventUrls.length} events on Meetup with Puppeteer`);
    log.verbose('Event URLs: ' + eventUrls.join(', '));

    return eventUrls;

  } finally {
    await browser.close();
  }
}

/**
 * Scrape individual event page for details
 * First try with simple fetch, fallback to Puppeteer if needed
 */
async function scrapeEventDetails(eventUrl) {
  const eventId = extractEventId(eventUrl);
  log.verbose(`Scraping event ${eventId}: ${eventUrl}`);

  // First try with simple fetch
  try {
    const response = await fetch(eventUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract event data using Cheerio
    const title = $('h1').first().text().trim() ||
                  $('[data-testid="event-title"]').text().trim() ||
                  $('meta[property="og:title"]').attr('content') || '';

    // Look for date/time in various formats
    let date = '';
    let time = '4:00 PM - 5:30 PM HST'; // Default

    // Try to find time element
    const timeElement = $('time').first();
    if (timeElement.length) {
      const datetime = timeElement.attr('datetime');
      if (datetime) {
        const dateObj = new Date(datetime);
        date = dateObj.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });

        // Look for time text near the time element
        const timeContainer = timeElement.parent().text();
        // Look for patterns like "4:00 PM to 5:30 PM" or "4:00 PM - 5:30 PM"
        let timeMatch = timeContainer.match(/(\d{1,2}:\d{2}\s*(AM|PM))\s*(to|-|–)\s*(\d{1,2}:\d{2}\s*(AM|PM))/);
        if (timeMatch) {
          time = `${timeMatch[1]} - ${timeMatch[4]} HST`;
        } else {
          // Fallback to simpler pattern
          timeMatch = timeContainer.match(/\d{1,2}:\d{2}\s*(AM|PM)/);
          if (timeMatch) {
            time = timeMatch[0] + ' HST';
          }
        }
      }
    }

    // Get location
    let location = 'VIRTUAL'; // Default
    const addressElement = $('address').first();
    if (addressElement.length) {
      const addressText = addressElement.text().trim();
      if (addressText && !addressText.toLowerCase().includes('online')) {
        location = addressText.split('\n')[0].trim();
      }
    }

    // Get description from meta tag or content
    let description = $('meta[property="og:description"]').attr('content') ||
                      $('meta[name="description"]').attr('content') || '';

    // Try to find more detailed description in the page
    const descSelectors = [
      '[data-testid="event-description"]',
      '[data-event-label="description"]',
      '.event-description',
      '[class*="description"]',
      'div[class*="wysiwyg"]',
      'div[class*="event-content"]',
      'section[aria-labelledby*="details"]',
      '#event-details-section',
      'div[data-testid="rich-text-content"]',
      'main section div[class*="break-words"]',
      'div.w-full.break-words'
    ];

    for (const selector of descSelectors) {
      const elem = $(selector).first();
      if (elem.length) {
        // Try to get paragraphs for better formatting
        const paragraphs = elem.find('p');
        let newDesc = '';
        if (paragraphs.length > 0) {
          newDesc = paragraphs.map((i, p) => $(p).text().trim()).get()
            .filter(text => text.length > 0)
            .join(' ')
            .replace(/\s+/g, ' ')
            .substring(0, 1000);
        } else {
          newDesc = elem.text().trim()
            .replace(/\s+/g, ' ')
            .substring(0, 1000);
        }

        if (newDesc.length > description.length && newDesc.length > 50) {
          description = newDesc;
        }
      }
    }

    // Get image URL
    let imageUrl = $('meta[property="og:image"]').attr('content') || '';
    if (!imageUrl) {
      const imgElement = $('img[src*="meetupstatic.com/photos/event"]').first();
      if (imgElement.length) {
        imageUrl = imgElement.attr('src') || '';
      }
    }
    if (imageUrl && !imageUrl.includes('?w=')) {
      imageUrl += '?w=750';
    }

    // If we got basic data, return it
    if (title && date) {
      const eventData = {
        title,
        date,
        time,
        location,
        description: description || 'Join us for this exciting Big Island Tech event!',
        imageUrl: imageUrl || 'https://secure.meetupstatic.com/photos/event/1/6/a/6/600_528965798.webp?w=750',
        link: eventUrl,
        meetupId: eventId,
        dateISO: convertToISO(date)
      };

      log.verbose(`Scraped with fetch: ${eventData.title} on ${eventData.date}`);
      log.verbose(`Description length: ${eventData.description.length} chars`);
      return eventData;
    }

    log.verbose('Insufficient data from fetch, trying Puppeteer...');
  } catch (error) {
    log.verbose(`Fetch failed for ${eventUrl}: ${error.message}, trying Puppeteer...`);
  }

  // Fallback to Puppeteer for dynamic content
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();

    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto(eventUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 10000 });

    // Wait a bit more for dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract event data
    const eventData = await page.evaluate(() => {
      // Helper to get text content safely
      const getText = (selector) => {
        const element = document.querySelector(selector);
        return element ? element.textContent.trim() : '';
      };

      // Get title
      const title = getText('h1');

      // Get date and time - Meetup uses time elements
      const timeElements = document.querySelectorAll('time');
      let date = '';
      let time = '';

      if (timeElements.length > 0) {
        const datetime = timeElements[0].getAttribute('datetime');
        if (datetime) {
          const dateObj = new Date(datetime);
          // Format date as "Month Day, Year"
          date = dateObj.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });

          // Try to get time range from the page
          const timeText = timeElements[0].parentElement?.textContent || '';
          // Look for patterns like "4:00 PM to 5:30 PM" or "4:00 PM - 5:30 PM"
          let timeMatch = timeText.match(/(\d{1,2}:\d{2}\s*(AM|PM))\s*(to|-|–)\s*(\d{1,2}:\d{2}\s*(AM|PM))/);
          if (timeMatch) {
            time = `${timeMatch[1]} - ${timeMatch[4]} HST`;
          } else {
            // Fallback to simpler pattern
            timeMatch = timeText.match(/\d{1,2}:\d{2}\s*(AM|PM)/);
            if (timeMatch) {
              time = timeMatch[0] + ' HST';
            }
          }
        }
      }

      // Get location
      let location = 'VIRTUAL'; // Default
      const addressElements = document.querySelectorAll('address');
      if (addressElements.length > 0) {
        const addressText = addressElements[0].textContent.trim();
        if (addressText && !addressText.toLowerCase().includes('online')) {
          location = addressText.split('\n')[0].trim(); // Get first line
        }
      }

      // Get description - look for the main content area with more comprehensive selectors
      let description = '';
      const contentSelectors = [
        '[data-testid="event-description"]',
        '[data-event-label="description"]',
        '.event-description',
        '[class*="description"]',
        'div[class*="wysiwyg"]',
        'div[class*="event-content"]',
        'div[class*="eventDetails"]',
        'section[aria-labelledby*="details"]',
        '#event-details-section',
        'div[data-testid="rich-text-content"]',
        // More generic selectors
        'main section div[class*="break-words"]',
        'div[class*="formatted-text"]',
        'div.w-full.break-words'
      ];

      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          // Try to get more complete text, looking for paragraphs
          const paragraphs = element.querySelectorAll('p');
          if (paragraphs.length > 0) {
            description = Array.from(paragraphs)
              .map(p => p.textContent.trim())
              .filter(text => text.length > 0)
              .join(' ')
              .replace(/\s+/g, ' ')
              .substring(0, 1000); // Increase limit
          } else {
            description = element.textContent.trim()
              .replace(/\s+/g, ' ')
              .substring(0, 1000);
          }

          if (description.length > 50) { // Only accept if we got substantial content
            break;
          }
        }
      }

      // If still no description, try to find any substantial text content
      if (!description || description.length < 50) {
        const allTextElements = document.querySelectorAll('div, section, article');
        for (const elem of allTextElements) {
          const text = elem.textContent.trim();
          // Look for text that seems like event description (not navigation, etc.)
          if (text.length > 100 && text.length < 2000 &&
              !text.includes('Sign up') &&
              !text.includes('Log in') &&
              !text.includes('Cookie') &&
              text.toLowerCase().includes('meetup')) {
            description = text.replace(/\s+/g, ' ').substring(0, 1000);
            break;
          }
        }
      }

      // Get image URL
      let imageUrl = '';
      const imgElement = document.querySelector('img[src*="meetupstatic.com/photos/event"]');
      if (imgElement) {
        imageUrl = imgElement.src;
        // Ensure we get the high quality version
        if (!imageUrl.includes('?w=')) {
          imageUrl += '?w=750';
        }
      }

      return {
        title,
        date,
        time: time || '4:00 PM - 5:30 PM HST', // Default time if not found
        location,
        description,
        imageUrl
      };
    });

    // Add additional fields
    eventData.link = eventUrl;
    eventData.meetupId = eventId;
    eventData.dateISO = convertToISO(eventData.date);

    log.verbose(`Scraped: ${eventData.title} on ${eventData.date}`);
    log.verbose(`Description length: ${eventData.description.length} chars`);

    return eventData;

  } catch (error) {
    log.error(`Failed to scrape ${eventUrl}: ${error.message}`);
    return null;
  } finally {
    await browser.close();
  }
}

/**
 * Extract event ID from Meetup URL
 */
function extractEventId(url) {
  const match = url.match(/\/events\/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Convert date string to ISO format
 */
function convertToISO(dateStr) {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

/**
 * Load existing events from the TypeScript file
 */
function loadExistingEvents() {
  try {
    const content = fs.readFileSync(EVENTS_FILE, 'utf8');

    // Extract the allEvents array
    const match = content.match(/export const allEvents:\s*Event\[\]\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error('Could not find allEvents array in file');
    }

    // Parse the JavaScript array (not JSON)
    // This is a simplified parser - in production you'd want something more robust
    const eventsStr = match[1];
    const events = [];

    // Extract each event object
    const eventMatches = eventsStr.matchAll(/\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g);

    for (const eventMatch of eventMatches) {
      const eventStr = eventMatch[0];

      // Extract fields using regex
      const extractField = (field, isString = true) => {
        const pattern = isString
          ? new RegExp(`${field}:\\s*["']([^"']*?)["']`)
          : new RegExp(`${field}:\\s*(\\d+)`);
        const match = eventStr.match(pattern);
        return match ? match[1] : null;
      };

      const event = {
        id: parseInt(extractField('id', false)) || 0,
        title: extractField('title') || '',
        date: extractField('date') || '',
        dateISO: extractField('dateISO'),
        time: extractField('time') || '',
        location: extractField('location') || '',
        description: extractField('description') || '',
        imageUrl: extractField('imageUrl') || '',
        link: extractField('link') || '',
        status: extractField('status'),
        meetupId: extractField('meetupId'),
        lastSyncedAt: extractField('lastSyncedAt'),
        syncStatus: extractField('syncStatus')
      };

      // Only include if it has an ID
      if (event.id) {
        events.push(event);
      }
    }

    log.success(`Loaded ${events.length} existing events`);
    return events;

  } catch (error) {
    log.error(`Failed to load existing events: ${error.message}`);
    return [];
  }
}

/**
 * Compare and merge events
 */
function mergeEvents(existingEvents, scrapedEvents) {
  const changes = {
    added: [],
    updated: [],
    unchanged: []
  };

  const existingByMeetupId = new Map();
  existingEvents.forEach(event => {
    if (event.meetupId) {
      existingByMeetupId.set(event.meetupId, event);
    }
  });

  // Find the highest existing ID
  const maxId = Math.max(...existingEvents.map(e => e.id), 0);
  let nextId = maxId + 1;

  // Process scraped events
  for (const scraped of scrapedEvents) {
    const existing = existingByMeetupId.get(scraped.meetupId);

    if (!existing) {
      // New event
      const newEvent = {
        id: nextId++,
        ...scraped,
        syncStatus: 'synced',
        lastSyncedAt: new Date().toISOString()
      };
      changes.added.push(newEvent);

    } else {
      // Check if event needs updating
      const needsUpdate =
        existing.title !== scraped.title ||
        existing.date !== scraped.date ||
        existing.time !== scraped.time ||
        existing.location !== scraped.location ||
        existing.description !== scraped.description ||
        existing.imageUrl !== scraped.imageUrl ||
        FORCE_UPDATE;

      if (needsUpdate) {
        // Update existing event
        const updated = {
          ...existing,
          ...scraped,
          id: existing.id, // Keep existing ID
          status: existing.status, // Preserve manual status overrides
          syncStatus: 'synced',
          lastSyncedAt: new Date().toISOString()
        };
        changes.updated.push(updated);
      } else {
        changes.unchanged.push(existing);
      }
    }
  }

  // Include events not found in scraping (manually added or old events)
  const scrapedIds = new Set(scrapedEvents.map(e => e.meetupId));
  for (const existing of existingEvents) {
    if (!existing.meetupId || !scrapedIds.has(existing.meetupId)) {
      // Keep events without meetupId or not found in current scrape
      if (!changes.unchanged.find(e => e.id === existing.id) &&
          !changes.updated.find(e => e.id === existing.id)) {
        changes.unchanged.push(existing);
      }
    }
  }

  return changes;
}

/**
 * Generate TypeScript code for events array
 */
function generateEventsCode(events) {
  // Sort events by date (newest first)
  const sorted = [...events].sort((a, b) => {
    const dateA = new Date(a.dateISO || a.date);
    const dateB = new Date(b.dateISO || b.date);
    return dateB.getTime() - dateA.getTime();
  });

  let code = '';

  for (const event of sorted) {
    code += '  {\n';
    code += `    id: ${event.id},\n`;
    code += `    title: "${event.title.replace(/"/g, '\\"')}",\n`;
    code += `    date: "${event.date}",\n`;
    if (event.dateISO) {
      code += `    dateISO: "${event.dateISO}",\n`;
    }
    code += `    time: "${event.time}",\n`;
    code += `    location: "${event.location}",\n`;
    code += `    description: "${event.description.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",\n`;
    code += `    imageUrl: "${event.imageUrl}",\n`;
    code += `    link: "${event.link}",\n`;
    if (event.status) {
      code += `    status: '${event.status}',\n`;
    }
    if (event.meetupId) {
      code += `    meetupId: "${event.meetupId}",\n`;
    }
    if (event.lastSyncedAt) {
      code += `    lastSyncedAt: "${event.lastSyncedAt}",\n`;
    }
    if (event.syncStatus) {
      code += `    syncStatus: "${event.syncStatus}",\n`;
    }
    code += '  },\n';
  }

  return code;
}

/**
 * Save events back to the TypeScript file
 */
function saveEvents(events) {
  try {
    // Read the original file
    const content = fs.readFileSync(EVENTS_FILE, 'utf8');

    // Generate new events array code
    const eventsCode = generateEventsCode(events);

    // Replace the allEvents array in the file
    const newContent = content.replace(
      /export const allEvents:\s*Event\[\]\s*=\s*\[[\s\S]*?\];/,
      `export const allEvents: Event[] = [\n${eventsCode}];`
    );

    if (DRY_RUN) {
      log.info('DRY RUN - Would write the following events:');
      console.log(eventsCode.substring(0, 500) + '...');
    } else {
      // Backup original file
      const backupFile = EVENTS_FILE + '.backup';
      fs.copyFileSync(EVENTS_FILE, backupFile);
      log.verbose(`Created backup at ${backupFile}`);

      // Write new content
      fs.writeFileSync(EVENTS_FILE, newContent, 'utf8');
      log.success(`Saved ${events.length} events to ${EVENTS_FILE}`);
    }

  } catch (error) {
    log.error(`Failed to save events: ${error.message}`);
    throw error;
  }
}

/**
 * Main sync function
 */
async function syncEvents() {
  console.log('\n🔄 Meetup Event Sync');
  console.log('='.repeat(50));

  if (DRY_RUN) {
    log.info('Running in DRY RUN mode - no changes will be saved');
  }
  if (VERBOSE) {
    log.info('Verbose logging enabled');
  }
  if (FORCE_UPDATE) {
    log.info('Force update enabled - all events will be updated');
  }

  try {
    // Step 1: Scrape list of events
    const eventUrls = await scrapeEventsList();

    if (eventUrls.length === 0) {
      log.warning('No events found on Meetup');
      return;
    }

    // Step 2: Scrape details for each event
    log.info(`Scraping details for ${eventUrls.length} events...`);
    const scrapedEvents = [];

    for (const url of eventUrls) {
      const eventData = await scrapeEventDetails(url);
      if (eventData) {
        scrapedEvents.push(eventData);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    log.success(`Successfully scraped ${scrapedEvents.length} events`);

    // Step 3: Load existing events
    const existingEvents = loadExistingEvents();

    // Step 4: Compare and merge
    log.info('Comparing with existing events...');
    const changes = mergeEvents(existingEvents, scrapedEvents);

    // Report changes
    console.log('\n📊 Sync Summary:');
    console.log('-'.repeat(30));
    log.success(`✨ New events: ${changes.added.length}`);
    log.change(`📝 Updated events: ${changes.updated.length}`);
    log.info(`✓ Unchanged events: ${changes.unchanged.length}`);

    if (changes.added.length > 0) {
      console.log('\nNew events to add:');
      changes.added.forEach(e => {
        console.log(`  - ${e.title} (${e.date})`);
      });
    }

    if (changes.updated.length > 0) {
      console.log('\nEvents to update:');
      changes.updated.forEach(e => {
        console.log(`  - ${e.title} (${e.date})`);
      });
    }

    // Step 5: Save merged events
    if (changes.added.length > 0 || changes.updated.length > 0) {
      const allEvents = [...changes.added, ...changes.updated, ...changes.unchanged];
      saveEvents(allEvents);

      if (!DRY_RUN) {
        log.success('\n✅ Sync completed successfully!');
        log.info('Run "npm run dev" to see the updated events');
      }
    } else {
      log.info('\n✅ All events are up to date!');
    }

  } catch (error) {
    log.error(`Sync failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  syncEvents().catch(console.error);
}

export { syncEvents, scrapeEventsList, scrapeEventDetails, mergeEvents };