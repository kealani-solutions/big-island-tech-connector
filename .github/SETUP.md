# GitHub Actions Setup Guide

## 🚀 Quick Start

This guide helps you set up automated event syncing and deployment for your Big Island Tech Connector website.

## Prerequisites

- GitHub repository with the code
- Admin access to repository settings

## Step 1: Enable GitHub Actions

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Under **Actions permissions**, select: **Allow all actions and reusable workflows**
4. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

## Step 2: Enable GitHub Pages (for deployment)

1. Go to **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Click **Save**

## Step 3: Test the Workflows

### Test Event Sync

1. Go to the **Actions** tab
2. Click on **"Sync Meetup Events"**
3. Click **"Run workflow"**
4. Select options:
   - Dry run: `true` (for testing)
   - Force: `false`
5. Click **"Run workflow"**
6. Monitor the progress

### Test Deployment

1. After sync completes, deployment should trigger automatically
2. Check the **Actions** tab for "Deploy Website" workflow
3. Once complete, visit: `https://[your-username].github.io/[repo-name]/`

## Workflows Overview

### 🔄 `sync-events.yml`
- **Purpose**: Sync events from Meetup.com
- **Schedule**: Daily at 8 AM Hawaii time
- **Manual trigger**: Yes, with options
- **Auto-commits**: Updates to `src/data/events.ts`

### 📊 `sync-events-monitor.yml`
- **Purpose**: Monitor sync health
- **Triggers**: After each sync
- **Actions**: Creates issues on failure

### 🚀 `deploy.yml`
- **Purpose**: Build and deploy website
- **Triggers**: After sync, on push, or manual
- **Deployment**: GitHub Pages (configurable for Netlify/Vercel)

## Customization

### Change Sync Schedule

Edit `.github/workflows/sync-events.yml`:

```yaml
schedule:
  - cron: '0 18 * * *'  # Current: Daily at 6 PM UTC
```

**Examples:**
- Every 12 hours: `'0 */12 * * *'`
- Weekly: `'0 18 * * 1'` (Mondays)
- Twice daily: `'0 6,18 * * *'` (6 AM and 6 PM UTC)

### Use Pull Requests Instead of Direct Commits

In `sync-events.yml`, change:

```yaml
sync-events-pr:
  if: false  # Change to true
```

And set the main job to false:

```yaml
sync-events:
  if: false  # Change from true
```

### Deploy to Netlify or Vercel

Edit `.github/workflows/deploy.yml` and follow instructions in the file.

## Troubleshooting

### Sync Fails

1. Check **Actions** tab for error logs
2. Look for GitHub issues created by monitor workflow
3. Run locally: `node scripts/event-manager.js sync --verbose`

### Deployment Fails

1. Verify GitHub Pages is enabled
2. Check build logs in Actions tab
3. Ensure `npm run build` works locally

### Permission Errors

1. Check repository Settings → Actions → General
2. Ensure "Read and write permissions" is selected
3. For organization repos, check organization settings

## Security Notes

- Workflows use `GITHUB_TOKEN` (automatically provided)
- No additional secrets needed for basic setup
- For Netlify/Vercel, add deployment tokens as secrets

## Monitoring

### View Sync Reports
1. Go to any completed workflow run
2. Check the **Summary** section for detailed report

### Email Notifications
GitHub sends notifications for:
- Failed workflows (if enabled in user settings)
- Created issues (if watching the repository)

## Support

- Check existing issues in the repository
- Review workflow logs in Actions tab
- Test locally with: `node scripts/event-manager.js sync --dry-run`

---

*Last updated: October 2024*