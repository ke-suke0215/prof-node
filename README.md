# ProfNode

A web business card service for engineers. Share your profile, social links, and portfolio with a simple URL.

## Features

- Digital business card with customizable profile
- Social media link integration (GitHub, Twitter, LinkedIn, etc.)
- Mobile-first responsive design
- Built with React Router v7 + Cloudflare Workers

## Development

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

## Code Quality

### Linting

Check for linting errors:
```bash
npm run lint
```

Fix linting errors automatically:
```bash
npm run lint:fix
```

### Formatting

Check code formatting:
```bash
npm run format:check
```

Fix code formatting:
```bash
npm run format
```

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Tech Stack

- **Frontend**: React 19, React Router v7
- **Styling**: TailwindCSS
- **Runtime**: Cloudflare Workers
- **Build Tool**: Vite
- **Language**: TypeScript

## Development Environment

This project uses Dev Containers for consistent development environment. Open in VS Code and select "Reopen in Container" for the best experience.