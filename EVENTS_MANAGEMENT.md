# Event Management Guide

This guide explains how to easily manage events for the Big Island Tech website.

## 🎯 Quick Start

The new event management system automatically categorizes events as "upcoming" or "past" based on their dates, and **automatically generates dateISO from human-readable dates**!

### Adding a New Event from Meetup.com

1. **Get event template with auto-assigned ID:**
   ```bash
   node scripts/event-manager.js template
   ```

2. **Fill out with natural date format** (e.g., "January 15, 2025")

3. **For auto-generated dateISO, use the interactive command:**
   ```bash
   node scripts/event-manager.js add
   ```

4. **Copy/paste the complete object to the TOP of `allEvents` array**

5. **Done!** The event will automatically appear in the correct section

## 📅 Event Management

### Automatic Features

- **Date Conversion**: Human dates like "January 15, 2025" automatically become dateISO "2025-01-15"
- **ID Assignment**: Next available ID is automatically assigned  
- **Categorization**: Events automatically sort into upcoming/past based on dates
- **Perfect Formatting**: JavaScript object format (no JSON quotes)

### Event Status Options

You can manually override the automatic categorization:

```typescript
{
  // ... other event fields
  status: 'upcoming',  // Force to upcoming (even if date is past)
  status: 'past',      // Force to past (even if date is future)  
  status: 'cancelled', // Mark as cancelled (shows in past with badge)
}
```

## 🛠️ Management Tools

### Command Line Helper

```bash
# Show available commands
node scripts/event-manager.js help

# Get basic template (manual dateISO)
node scripts/event-manager.js template

# Interactive add with auto-generated dateISO (RECOMMENDED)
node scripts/event-manager.js add

# List all events
node scripts/event-manager.js list

# Get instructions to cancel an event
node scripts/event-manager.js cancel 7
```

### Manual Management

All events are stored in `src/data/events.ts` in the `allEvents` array.

## 📝 Adding Events

### Method 1: Interactive (Recommended)

1. Run: `node scripts/event-manager.js add`
2. Answer the prompts with Meetup event details
3. Copy the generated object (with auto-generated dateISO)
4. Paste at TOP of `allEvents` array
5. Save the file

**Benefits:**
- ✅ Auto-generated dateISO 
- ✅ Perfect JavaScript formatting
- ✅ Auto-assigned ID
- ✅ Ready to copy/paste

### Method 2: Template (Manual)

1. Run: `node scripts/event-manager.js template`
2. Fill out template with Meetup details
3. Manually add dateISO in YYYY-MM-DD format
4. Paste at TOP of `allEvents` array

### Date Format Examples

The system accepts many natural date formats:

```javascript
"January 15, 2025"    // → dateISO: "2025-01-15"
"Jan 15, 2025"        // → dateISO: "2025-01-15"  
"October 9, 2025"     // → dateISO: "2025-10-09"
"Oct 9, 2025"         // → dateISO: "2025-10-09"
"December 25, 2024"   // → dateISO: "2024-12-25"
```

### Important Notes

- **Use natural date formats** - no need to calculate dateISO manually
- **Use interactive command** for best experience
- **Add new events at the TOP** of the allEvents array
- **IDs are auto-assigned** - the script tells you what the next ID will be

## ❌ Cancelling Events

To cancel an event, add the status field:

```typescript
{
  // ... existing event fields
  status: 'cancelled', // Add this line
}
```

The event will:
- Move to "Past Events" 
- Show a red "Cancelled" badge
- Still be accessible via the Meetup link

## 🔧 How It Works

### Automatic Date Processing

```javascript
// Input (human-readable)
date: "January 15, 2025"

// Auto-generated
dateISO: "2025-01-15"

// Used for sorting and categorization
```

### Data Structure

```typescript
// All events in one array
export const allEvents: Event[] = [/* events */];

// Dynamic arrays (auto-updated)
export const upcomingEvents = getUpcomingEvents();
export const pastEvents = getPastEvents();
```

## 🚀 Benefits

### Before (Old System)
- ❌ Manual event moving between arrays
- ❌ Manual ID assignment 
- ❌ Manual dateISO calculation
- ❌ JSON vs JavaScript object format confusion

### After (New System)
- ✅ Automatic categorization
- ✅ Auto-assigned IDs  
- ✅ **Auto-generated dateISO from natural dates**
- ✅ Perfect copy/paste format
- ✅ Single source of truth

## 📋 Workflow Examples

### Adding a Regular Event (Recommended)

1. Run: `node scripts/event-manager.js add`
2. Enter: "Big Island Tech Meetup"
3. Enter: "January 15, 2025" (natural format)
4. Fill in other details
5. Copy the generated object with auto-generated dateISO: "2025-01-15"
6. Paste to TOP of `allEvents` array
7. Save and commit

### Adding with Template (Alternative)

1. Run: `node scripts/event-manager.js template`
2. Fill out template 
3. Manually convert date to dateISO format
4. Paste to TOP of `allEvents` array

### Cancelling an Event

1. Find event in `allEvents` array
2. Add `status: 'cancelled'`
3. Save and commit

## 🔍 Troubleshooting

### Date Conversion Issues

If dateISO is not generated:
- Use formats like "January 15, 2025" or "Jan 15, 2025"
- Avoid formats like "1/15/2025" or "15-Jan-2025"
- The script will warn you if conversion fails

### Event in Wrong Category

- Check the `dateISO` format (should be YYYY-MM-DD)
- Check if `status` field is set correctly

### Script Issues

```bash
# Make sure you're in the project root
cd /path/to/big-island-tech-connector

# Run the script
node scripts/event-manager.js help
```

## 💡 Pro Tips

1. **Always use the interactive command** - handles everything automatically
2. **Use natural date formats** - "January 15, 2025" not "1/15/2025"
3. **Let the script generate dateISO** - no manual calculation needed
4. **Add events to the top** of the array
5. **Test locally** before committing

---

*This system makes event management completely effortless with automatic date handling!* 🏝️ 