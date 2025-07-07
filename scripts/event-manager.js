#!/usr/bin/env node

/**
 * Big Island Tech Event Manager
 * 
 * A simple command-line tool to help manage events for the website.
 * 
 * Usage:
 *   node scripts/event-manager.js add             # Add a new event
 *   node scripts/event-manager.js list            # List all events
 *   node scripts/event-manager.js cancel <id>     # Mark event as cancelled
 *   node scripts/event-manager.js template        # Generate event template
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EVENTS_FILE = path.join(__dirname, '../src/data/events.ts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function generateEventTemplate() {
  const template = `
// Copy this template and fill it out based on your Meetup.com event:
{
  id: 0, // Will be auto-generated
  title: "Event Title from Meetup",
  date: "Month DD, YYYY", // Human-readable format
  dateISO: "YYYY-MM-DD", // ISO format for accurate sorting
  time: "H:MM AM/PM - H:MM AM/PM HST",
  location: "VIRTUAL" or "Physical Location",
  description: "Event description from Meetup",
  imageUrl: "https://secure.meetupstatic.com/photos/event/.../image.webp",
  link: "https://www.meetup.com/big-island-tech/events/EVENT_ID/",
  // status: 'upcoming' | 'past' | 'cancelled' // Optional - leave out for auto-detection
},
`;

  console.log('\n📋 Event Template:');
  console.log(template);
  console.log('\n📝 Instructions:');
  console.log('1. Copy the event details from Meetup.com');
  console.log('2. Fill out the template above');
  console.log('3. Add it to the allEvents array in src/data/events.ts');
  console.log('4. The system will automatically categorize it as upcoming/past');
  console.log('\n💡 Tips:');
  console.log('- Set dateISO in YYYY-MM-DD format for accurate sorting');
  console.log('- You can add status: "cancelled" to mark events as cancelled');
  console.log('- Events automatically move to "past" based on the date');
}

async function addEvent() {
  console.log('\n🎉 Add New Event');
  console.log('Please provide the following information:');
  
  const title = await question('Title: ');
  const date = await question('Date (e.g., "January 15, 2025"): ');
  const dateISO = await question('Date ISO (YYYY-MM-DD): ');
  const time = await question('Time (e.g., "4:00 PM - 5:30 PM HST"): ');
  const location = await question('Location: ');
  const description = await question('Description: ');
  const imageUrl = await question('Image URL: ');
  const link = await question('Meetup Link: ');

  const newEvent = {
    title,
    date,
    dateISO,
    time,
    location,
    description,
    imageUrl,
    link
  };

  console.log('\n📝 Generated Event Object:');
  console.log(JSON.stringify(newEvent, null, 2));
  console.log('\n📋 Instructions:');
  console.log('1. Copy the event object above');
  console.log('2. Add it to the allEvents array in src/data/events.ts');
  console.log('3. The system will auto-assign an ID and categorize it');
}

function listEvents() {
  try {
    const eventsContent = fs.readFileSync(EVENTS_FILE, 'utf8');
    
    // Simple parsing to extract event data (this is a basic approach)
    const eventMatches = eventsContent.match(/{\s*id:\s*\d+[\s\S]*?},/g);
    
    if (!eventMatches) {
      console.log('No events found');
      return;
    }

    console.log('\n📅 All Events:');
    console.log('='.repeat(60));
    
    eventMatches.forEach((eventStr, index) => {
      const idMatch = eventStr.match(/id:\s*(\d+)/);
      const titleMatch = eventStr.match(/title:\s*"([^"]+)"/);
      const dateMatch = eventStr.match(/date:\s*"([^"]+)"/);
      const statusMatch = eventStr.match(/status:\s*'([^']+)'/);
      
      if (idMatch && titleMatch && dateMatch) {
        const id = idMatch[1];
        const title = titleMatch[1];
        const date = dateMatch[1];
        const status = statusMatch ? ` [${statusMatch[1].toUpperCase()}]` : '';
        
        console.log(`${id.padStart(2, '0')}. ${title}${status}`);
        console.log(`    📅 ${date}`);
        console.log('');
      }
    });
  } catch (error) {
    console.error('Error reading events file:', error.message);
  }
}

function cancelEvent(eventId) {
  if (!eventId) {
    console.log('❌ Please provide an event ID');
    console.log('Usage: node scripts/event-manager.js cancel <id>');
    return;
  }

  console.log(`\n❌ To cancel event ${eventId}:`);
  console.log('1. Open src/data/events.ts');
  console.log(`2. Find the event with id: ${eventId}`);
  console.log('3. Add this line to the event object:');
  console.log('   status: \'cancelled\',');
  console.log('4. The event will automatically appear in "Past Events" with a cancelled badge');
}

function showHelp() {
  console.log('\n🏝️  Big Island Tech Event Manager');
  console.log('='.repeat(40));
  console.log('Commands:');
  console.log('  add        Add a new event interactively');
  console.log('  list       List all events');
  console.log('  cancel <id> Instructions to cancel an event');
  console.log('  template   Show event template for manual addition');
  console.log('  help       Show this help message');
  console.log('\nExamples:');
  console.log('  node scripts/event-manager.js template');
  console.log('  node scripts/event-manager.js add');
  console.log('  node scripts/event-manager.js list');
  console.log('  node scripts/event-manager.js cancel 7');
}

async function main() {
  const command = process.argv[2];
  const arg = process.argv[3];

  switch (command) {
    case 'add':
      await addEvent();
      break;
    case 'list':
      listEvents();
      break;
    case 'cancel':
      cancelEvent(arg);
      break;
    case 'template':
      generateEventTemplate();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }

  rl.close();
}

// Only run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export {
  generateEventTemplate,
  addEvent,
  listEvents,
  cancelEvent
}; 