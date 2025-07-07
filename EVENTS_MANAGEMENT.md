# Event Management Guide

This guide explains how to easily manage events for the Big Island Tech website.

## 🎯 Quick Start

The new event management system automatically categorizes events as "upcoming" or "past" based on their dates, so you no longer need to manually move events between arrays!

### Adding a New Event from Meetup.com

1. **Get event template:**
   ```bash
   node scripts/event-manager.js template
   ```

2. **Copy event details from Meetup.com and fill out the template**

3. **Add the event to `src/data/events.ts`** in the `allEvents` array

4. **Done!** The event will automatically appear in the correct section

## 📅 Event Management

### Automatic Categorization

Events are automatically sorted into:
- **Upcoming Events**: Events with dates in the future
- **Past Events**: Events with dates in the past or marked as cancelled

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

# Get event template
node scripts/event-manager.js template

# Add event interactively  
node scripts/event-manager.js add

# List all events
node scripts/event-manager.js list

# Get instructions to cancel an event
node scripts/event-manager.js cancel 7
```

### Manual Management

All events are stored in `src/data/events.ts` in the `allEvents` array.

## 📝 Adding Events

### From Meetup.com

1. Go to your Meetup event page
2. Copy these details:
   - Title
   - Date (human readable)
   - Time 
   - Location
   - Description
   - Image URL (right-click on event image → "Copy image address")
   - Event URL

3. Use the template:

```typescript
{
  id: 10, // Next available ID
  title: "Event Title from Meetup",
  date: "October 15, 2025", // Human-readable
  dateISO: "2025-10-15", // YYYY-MM-DD for sorting
  time: "4:00 PM - 5:30 PM HST",
  location: "VIRTUAL", // or physical location
  description: "Event description...",
  imageUrl: "https://secure.meetupstatic.com/photos/event/.../image.webp",
  link: "https://www.meetup.com/big-island-tech/events/EVENT_ID/",
},
```

4. Add it to the `allEvents` array in `src/data/events.ts`

### Important Notes

- **Always set `dateISO`** in YYYY-MM-DD format for accurate sorting
- **ID should be unique** - use the next available number
- **Add new events at the TOP** of the allEvents array (most recent first)

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

### Data Structure

```typescript
// All events in one array
export const allEvents: Event[] = [/* events */];

// Dynamic arrays (auto-updated)
export const upcomingEvents = getUpcomingEvents();
export const pastEvents = getPastEvents();
```

### Automatic Sorting

- **Upcoming events**: Sorted by date (earliest first)
- **Past events**: Sorted by date (most recent first)
- **Date parsing**: Uses `dateISO` if available, falls back to `date`

### Status Priority

1. Manual `status` field (if set)
2. Automatic date comparison (if no status)

## 🚀 Benefits

### Before (Old System)
- ❌ Manual event moving between arrays
- ❌ Easy to forget to move past events  
- ❌ Duplicate effort maintaining two lists
- ❌ Events could appear in wrong sections

### After (New System)
- ✅ Automatic categorization
- ✅ Single source of truth
- ✅ Easy to add events
- ✅ Built-in helper tools
- ✅ Never forget to move events
- ✅ Cancelled events handled gracefully

## 📋 Workflow Examples

### Adding a Regular Event

1. Create event on Meetup.com
2. Run: `node scripts/event-manager.js template`
3. Fill out template with Meetup details
4. Add to top of `allEvents` array
5. Commit and deploy

### Cancelling an Event

1. Find event in `allEvents` array
2. Add `status: 'cancelled'`
3. Commit and deploy
4. Event automatically moves to past with cancelled badge

### Monthly Maintenance

No maintenance needed! Events automatically move to "past" when their date passes.

## 🔍 Troubleshooting

### Event in Wrong Category

- Check the `dateISO` format (should be YYYY-MM-DD)
- Check if `status` field is set correctly
- Ensure date is accurate

### Event Not Showing

- Verify it's in the `allEvents` array
- Check for syntax errors in the event object
- Ensure commas are properly placed

### Helper Script Not Working

```bash
# Make sure you're in the project root
cd /path/to/big-island-tech-connector

# Run the script
node scripts/event-manager.js help
```

## 💡 Pro Tips

1. **Use dateISO religiously** - it ensures perfect sorting
2. **Add events to the top** of the array for easier management
3. **Use the helper script** for templates and listing
4. **Test locally** before committing changes
5. **Keep event IDs unique** and sequential

---

*This system makes managing events much easier while ensuring they're always in the right place!* 🏝️ 