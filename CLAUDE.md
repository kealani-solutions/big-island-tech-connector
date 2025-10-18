# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page application for the Big Island Tech Connector community website, built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui. It showcases tech community events and information.

## Development Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:8080
npm run build        # Production build
npm run build:dev    # Development mode build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint

# Event Management (IMPORTANT - use this for all event operations)
node scripts/event-manager.js help      # Show all available commands
node scripts/event-manager.js add       # Interactive add with auto-generated dateISO (RECOMMENDED)
node scripts/event-manager.js template  # Get basic event template
node scripts/event-manager.js list      # List all events
node scripts/event-manager.js cancel <id> # Get instructions to cancel an event
```

## Architecture Overview

### Project Structure
- **Single Page Application** with hash-based navigation (#about, #events, #join)
- **Component-based architecture** with clear separation of concerns
- **No backend** - all data is hardcoded in `src/data/events.ts`
- **Event automation** - events automatically categorize as upcoming/past based on current date

### Key Directories
- `src/components/` - Section components (Hero, EventsSection, etc.) and UI components
- `src/components/ui/` - 50+ shadcn-ui components (pre-built, customizable)
- `src/data/` - Contains `events.ts` with all event data and utility functions
- `src/pages/` - Page-level components (Index, NotFound)
- `scripts/` - CLI tools for event management

### Data Flow Pattern
```
App.tsx → Routes → Index.tsx → Section Components → data/events.ts
                                     ↓
                            EventsSection.tsx
                                     ↓
                    getUpcomingEvents() / getPastEvents()
```

## Event Management System

### Critical Concepts
1. **Single source of truth**: All events live in the `allEvents` array in `src/data/events.ts`
2. **Automatic categorization**: Events automatically move from upcoming to past based on current date
3. **Add new events at the TOP** of the `allEvents` array
4. **Use the interactive CLI tool** for adding events - it auto-generates dateISO and assigns IDs

### Event Structure
```typescript
{
  id: number,              // Auto-assigned by CLI tool
  title: string,           // Event name
  date: string,            // Human-readable (e.g., "January 15, 2025")
  dateISO?: string,        // ISO format (e.g., "2025-01-15") - auto-generated
  time: string,            // Event time with timezone
  location: string,        // Physical address or "VIRTUAL"
  description: string,     // Event description
  imageUrl: string,        // Meetup.com event image URL
  link: string,            // Meetup.com event link
  status?: 'upcoming' | 'past' | 'cancelled'  // Optional manual override
}
```

### Key Functions in `src/data/events.ts`
- `isEventPast(event)` - Determines if event should be in past category
- `getUpcomingEvents()` - Returns non-past events sorted chronologically
- `getPastEvents()` - Returns past events sorted reverse chronologically

## Important Patterns

### Component Conventions
- Pascal case naming: `EventCard`, `EventsSection`
- File names match component names
- Default exports for all components
- Section components handle business logic, UI components are presentational

### Styling Approach
- **Tailwind-first** - use utility classes, avoid custom CSS
- **Custom Hawaii theme colors**: `hawaii-blue`, `hawaii-green`, `hawaii-orange`, etc.
- **Responsive prefixes**: `md:` for tablet+, `lg:` for desktop+
- **Consistent hover states**: `hover:shadow-lg`, `hover:scale-105`

### State Management
- No global state management (Redux/Zustand not needed)
- React Query installed but minimally used (ready for API integration)
- Local component state via `useState`
- Derived data computed from `allEvents` array

## Common Tasks

### Adding a New Event
1. Run `node scripts/event-manager.js add` for interactive mode
2. Enter event details (use natural date format like "January 15, 2025")
3. Copy the generated JavaScript object (with auto-generated dateISO)
4. Open `src/data/events.ts`
5. Paste at the TOP of the `allEvents` array
6. Save and test locally with `npm run dev`

### Modifying UI Components
- All reusable UI components are in `src/components/ui/`
- These are shadcn-ui components - locally installed and customizable
- Use the `cn()` utility from `lib/utils` to merge Tailwind classes

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx` ABOVE the catch-all route
3. Update Navigation component if needed

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/data/events.ts` | All event data + utility functions |
| `src/components/EventsSection.tsx` | Events display with tabs |
| `src/pages/Index.tsx` | Main landing page layout |
| `scripts/event-manager.js` | CLI tool for event management |
| `EVENTS_MANAGEMENT.md` | Detailed event management guide |

## Development Tips

1. **Always use the event CLI tool** instead of manually editing events
2. **Test locally** before committing changes
3. **Use existing shadcn-ui components** before creating new ones
4. **Follow the existing patterns** for consistency
5. **Events added to TOP of array** maintain chronological order

## Deployment

The site can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.) by running `npm run build` and deploying the contents of the `dist` folder.

## External Integration

- All events link to Meetup.com
- Images are hosted on Meetup's CDN
- No API integration currently (all data is static)