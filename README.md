# ProfNode

A web business card service for engineers. Share your profile, social links, and portfolio with a simple URL.

## Features

- Digital business card with customizable profile
- Social media link integration (GitHub, Twitter, LinkedIn, etc.)
- Mobile-first responsive design
- Built with React Router v7 + Hono + Cloudflare Workers

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
npx wrangler dev
```

Visit `http://localhost:8787` to view the application.

**Note**: Use `wrangler dev` instead of `npm run dev` due to compatibility issues between React Router v7 and hono-react-router-adapter in Vite development mode.

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

## Local CI Testing

Test GitHub Actions workflows locally using [act](https://github.com/nektos/act):

### Prerequisites

- Docker installed and running
- act installed (via Homebrew: `brew install act`)

### Usage

List available workflows and jobs:
```bash
act --list
```

Run specific CI jobs:
```bash
# Run linting checks
act --job lint

# Run type checking
act --job typecheck

# Run unit tests
act --job test

# Run formatting checks
act --job format-check
```

Dry run (preview without execution):
```bash
act --dryrun
```

### Configuration

The project includes `.actrc` configuration file with optimized settings for Apple M-series chips and performance improvements.

**Note**: E2E tests (`e2e-tests` job) have heavy dependencies and long execution times, so individual job execution is recommended for local testing.

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## Database Migration

This project uses Drizzle ORM for database schema management and Supabase CLI for migration application.

### Prerequisites

- Supabase CLI installed (`npm install -g supabase`)
- Local Supabase instance running (`supabase start`)

### Migration Workflow

1. **Modify database schema** in `server/db/schema/` files
2. **Generate migration file** using Drizzle:
   ```bash
   npx drizzle-kit generate
   ```
3. **Apply migration** using Supabase CLI:
   ```bash
   supabase db reset
   ```

### Migration Files

- **Schema location**: `server/db/schema/*.ts`
- **Migration output**: `supabase/migrations/`
- **Configuration**: `drizzle.config.ts`

### Example: Adding a New Table

1. Create schema file in `server/db/schema/new-table.ts`
2. Export the table in `server/db/schema/index.ts`
3. Generate migration: `npx drizzle-kit generate`
4. Apply migration: `supabase db reset`

## Tech Stack

- **Frontend**: React 19, React Router v7
- **Backend**: Hono (Web Framework)
- **Database**: Drizzle ORM + Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Integration**: hono-react-router-adapter
- **Styling**: TailwindCSS
- **Runtime**: Cloudflare Workers
- **Build Tool**: Vite
- **Language**: TypeScript

## Development Environment

This project uses Dev Containers for consistent development environment. Open in VS Code and select "Reopen in Container" for the best experience.