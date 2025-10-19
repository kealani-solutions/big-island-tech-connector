# Big Island Tech Connector

## Project Info

A community website for innovators, entrepreneurs, and technology enthusiasts on Hawaii's Big Island.

## 🚀 Getting Started

### Prerequisites

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to set up the project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd big-island-tech-connector

# Install dependencies
npm i

# Start the development server
npm run dev
```

The development server will start on http://localhost:8080

## 📅 Event Management

This project features an automated event sync system that keeps events synchronized with Meetup.com.

### Quick Start - Automatic Sync (Recommended)

The easiest way to manage events is using the automated sync from Meetup.com:

```bash
# Sync all events from Meetup.com
node scripts/event-manager.js sync

# Preview changes before saving (dry run)
node scripts/event-manager.js sync --dry-run

# Force update all events
node scripts/event-manager.js sync --force

# Verbose logging for debugging
node scripts/event-manager.js sync --verbose
```

### How Sync Works

The sync system automatically:
1. **Fetches** the event list from https://www.meetup.com/big-island-tech/events/
2. **Scrapes** each event page for complete details (title, date, time, location, description)
3. **Compares** with existing events using Meetup event IDs
4. **Updates** changed events and adds new ones
5. **Preserves** any manual status overrides (cancelled, etc.)
6. **Generates** ISO dates automatically for proper sorting

### Manual Event Management

For special cases or when sync is unavailable:

```bash
# Interactive event creation with auto-generated fields
node scripts/event-manager.js add

# Get a basic event template
node scripts/event-manager.js template

# List all events
node scripts/event-manager.js list

# Get instructions to cancel an event
node scripts/event-manager.js cancel <id>

# Show all available commands
node scripts/event-manager.js help
```

### Event Data Structure

Events are stored in `src/data/events.ts` with the following structure:

```typescript
{
  id: number,                    // Auto-assigned by CLI tool
  title: string,                 // Event name
  date: string,                  // Human-readable (e.g., "January 15, 2025")
  dateISO?: string,              // ISO format (e.g., "2025-01-15") - auto-generated
  time: string,                  // Event time with timezone
  location: string,              // Physical address or "VIRTUAL"
  description: string,           // Event description
  imageUrl: string,              // Meetup.com event image URL
  link: string,                  // Meetup.com event link
  status?: 'upcoming' | 'past' | 'cancelled',  // Optional manual override
  meetupId?: string,             // Meetup event ID for sync tracking
  lastSyncedAt?: string,         // ISO timestamp of last sync
  syncStatus?: 'synced' | 'manual' | 'modified'  // Track sync state
}
```

### Key Features

- **Automatic Categorization**: Events automatically sort into upcoming/past based on dates
- **Date Conversion**: Human-readable dates automatically convert to ISO format
- **ID Assignment**: Next available ID is automatically assigned
- **Sync Tracking**: Each event tracked by Meetup ID to prevent duplicates
- **Manual Overrides**: Status field allows forcing events to specific categories

### Cancelling Events

To cancel an event, add the status field:

```typescript
{
  // ... existing event fields
  status: 'cancelled', // Add this line
}
```

Cancelled events will:
- Move to "Past Events" section
- Display a red "Cancelled" badge
- Remain accessible via their Meetup link

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run build:dev` - Create a development mode build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## 🏗️ Technologies Used

This project is built with:

- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React](https://react.dev/) - UI framework
- [shadcn-ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Puppeteer](https://pptr.dev/) - Web scraping for Meetup sync
- [Cheerio](https://cheerio.js.org/) - HTML parsing

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # 50+ shadcn-ui components
├── data/          # Event data and utilities
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── pages/         # Page components

scripts/
├── event-manager.js  # CLI tool for event management
└── sync-events.js    # Automated Meetup.com sync
```

## 🔄 Sync System Architecture

The event sync system uses a two-step approach:

1. **Fast HTML fetch** using node-fetch and Cheerio for simple parsing
2. **Puppeteer fallback** for dynamic content when needed

This ensures reliable event extraction while minimizing resource usage.

### Sync Behavior

- **New events**: Automatically added with next available ID
- **Changed events**: Updated while preserving manual status overrides
- **Missing events**: Kept in database (may be past or cancelled)
- **Manual events**: Preserved and never modified by sync

## 🤖 Automated Sync with GitHub Actions

The project includes GitHub Actions workflows for automated event syncing:

### Daily Automatic Sync

Events are automatically synced daily at 8 AM Hawaii time. The workflow:
- Fetches latest events from Meetup.com
- Updates `src/data/events.ts` if changes are found
- Commits changes directly to the main branch
- Creates a sync report in the workflow summary

### Manual Sync Trigger

You can manually trigger a sync from the GitHub Actions tab:

1. Go to the **Actions** tab in your repository
2. Select **"Sync Meetup Events"** workflow
3. Click **"Run workflow"**
4. Choose options:
   - **Dry Run**: Preview changes without committing
   - **Force Update**: Update all events regardless of changes

### Setup Instructions

1. **Enable GitHub Actions** in your repository settings

2. **Ensure proper permissions**:
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select:
     - ✅ Read and write permissions
     - ✅ Allow GitHub Actions to create and approve pull requests

3. **The workflows will automatically**:
   - Run daily at 8 AM HST (6 PM UTC)
   - Create issues if sync fails
   - Generate detailed sync reports

### Workflow Files

- `.github/workflows/sync-events.yml` - Main sync workflow
- `.github/workflows/sync-events-monitor.yml` - Error monitoring and notifications

### Customizing the Schedule

Edit the cron expression in `sync-events.yml`:

```yaml
schedule:
  - cron: '0 18 * * *'  # Daily at 6 PM UTC (8 AM HST)
```

Common schedules:
- `'0 */6 * * *'` - Every 6 hours
- `'0 12 * * 1'` - Weekly on Mondays at noon UTC
- `'0 0 * * *'` - Daily at midnight UTC

### Monitoring Sync Health

The monitor workflow automatically:
- Creates GitHub issues when sync fails
- Provides debugging steps in issue description
- Prevents duplicate issues for the same day
- Logs successful syncs for audit trail

## 💡 Tips & Best Practices

1. **Use sync command** for regular updates from Meetup
2. **Run with --dry-run** first to preview changes
3. **Test locally** with `npm run dev` before committing
4. **Add events to TOP** of the array for proper ordering
5. **Use natural date formats** like "January 15, 2025"
6. **Backup is automatic** - sync creates `.backup` file before changes

## 🔍 Troubleshooting

### Sync Issues
- Ensure you have internet connection
- Check if Meetup.com is accessible
- Use `--verbose` flag for detailed debugging
- Review backup file if sync causes issues

### Date Conversion
- Use formats like "January 15, 2025" or "Jan 15, 2025"
- Avoid formats like "1/15/2025" or "15-Jan-2025"
- Script warns if conversion fails

### Event Categories
- Check `dateISO` format (should be YYYY-MM-DD)
- Verify `status` field if manually set
- Events automatically move to past after their date

## 🚀 Deployment

### Automatic Deployment

The project includes a deployment workflow that automatically deploys after:
- Events are synced from Meetup
- Code is pushed to the main branch
- Manual trigger from GitHub Actions

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions
   - The site will be available at: `https://[username].github.io/[repo-name]/`

2. **The deployment workflow** will automatically:
   - Build the site after each sync
   - Deploy to GitHub Pages
   - Provide deployment URL in workflow summary

### Alternative Deployment Options

The `deploy.yml` workflow supports multiple platforms:

#### Netlify
1. Add secrets: `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID`
2. Set `deploy-netlify` job `if: true` in workflow
3. Set `deploy-github-pages` job `if: false`

#### Vercel
1. Add secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`
2. Set `deploy-vercel` job `if: true` in workflow
3. Set `deploy-github-pages` job `if: false`

## 🤝 Contributing

Feel free to contribute to this project by submitting issues or pull requests. When contributing:

1. Test event sync locally first
2. Preserve existing event data
3. Follow the existing code patterns
4. Update documentation as needed

## 📜 License

This project is open source and available under the MIT License.

## 🌺 About Big Island Tech

Big Island Tech Meetup is a community for innovators, entrepreneurs, and technology enthusiasts on the Big Island (and beyond) to connect, collaborate, and learn. We focus on exploring how technology—ranging from renewable energy to artificial intelligence—can solve real-world problems and make life better for everyone.

Join us at our monthly meetups to share ideas, learn from experts, and build connections in Hawaii's tech ecosystem.

🏝️ [Visit us on Meetup](https://www.meetup.com/big-island-tech/)