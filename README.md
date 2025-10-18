# Big Island Tech Connector

## Project info

A community website for innovators, entrepreneurs, and technology enthusiasts on Hawaii's Big Island.

## Getting Started

### Prerequisites

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd big-island-tech-connector

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The development server will start on http://localhost:8080

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run build:dev` - Create a development mode build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Event Management

To manage events on the website, use the event management CLI tool:

```sh
# Show available commands
node scripts/event-manager.js help

# Interactive add with auto-generated dateISO (RECOMMENDED)
node scripts/event-manager.js add

# Get basic event template
node scripts/event-manager.js template

# List all events
node scripts/event-manager.js list
```

For detailed event management instructions, see [EVENTS_MANAGEMENT.md](./EVENTS_MANAGEMENT.md).

## Technologies Used

This project is built with:

- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [React](https://react.dev/) - UI framework
- [shadcn-ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Event data and utilities
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── pages/         # Page components
```

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is open source and available under the MIT License.