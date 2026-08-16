# Team Tech Guide

## Quick Setup

1. Clone the repo
2. Copy `.env.example` → `.env` and paste credentials (shared privately)
3. Install dependencies:
   ```bash
   npm install
   npm --prefix frontend install
   npm --prefix backend install
   ```
4. Start everything: `npm run dev`

That's it. Frontend at `localhost:5173`, backend at `localhost:3000`.

---

## The Stack (What You'll Actually Use)

### Frontend

- **React 19 + TypeScript** — components in `src/components/`, pages in `src/pages/`
- **Vite** — dev server with hot reload. Runs in background, don't touch config
- **Tailwind CSS v4** — a CSS framework where you style things using utility classes directly in your JSX instead of writing separate CSS files. Example: `<div className="flex items-center gap-4 p-6 bg-white rounded-lg">`. You just stack classes for layout, spacing, colours, etc. No config file needed, it auto-detects everything
- **shadcn/ui (Base UI)** — pre-built, accessible, good-looking UI components (buttons, modals, inputs, cards, etc). Add new ones: `npx shadcn@latest add <component-name>`. Button already installed. Always check if shadcn has what you need before building from scratch
- **TanStack Query** — handles all API calls, loading states, caching, and refetching for you. Use `useQuery` for GET requests (fetching data) and `useMutation` for POST/PUT/DELETE (changing data). Already wired in `main.tsx` — just import and use in your components
- **React Router** — routing set up in `App.tsx`. New page? Create it in `src/pages/`, add a `<Route>`
- **Lucide React** — icon library with hundreds of clean SVG icons. Use them like components: `import { Users, Calendar, Plus } from 'lucide-react'` then `<Users className="w-5 h-5" />`. Browse all icons at [lucide.dev/icons](https://lucide.dev/icons)
- **Path alias `@/`** — shortcut so you write `@/components/ui/button` instead of ugly relative paths like `../../components/ui/button`. The `@` always points to `src/`

### Backend

- **NestJS v11** — modular framework. Each feature = module + controller + service. Generate with:
  ```bash
  nest g module <name>
  nest g controller <name>
  nest g service <name>
  ```
- **Drizzle ORM** — type-safe database queries that look like code, not raw SQL strings. Schema (table definitions) lives in `src/database/schema/index.ts`. Inject `DatabaseService` in your service to get the db client and run queries
- **Neon DB** — serverless Postgres. Connection string in `.env`
- **Zod v4** — runtime validation for incoming request data. Define a schema (what shape the data should be), and it'll reject bad requests automatically. Keeps your API safe from garbage input
- **Better Auth** — auth library (NOT YET CONFIGURED). A stub exists in `src/auth/auth.config.ts` with just a secret. Full setup (sign-up, sign-in, sessions, Drizzle adapter) still needs to be implemented. Don't rely on it until it's wired up
- **Swagger** — auto-generated API documentation page at `localhost:3000/api/docs`. Shows all your endpoints, what they expect, and what they return. Updates itself as you add controllers — useful for testing endpoints without Postman
- **CORS** — already configured for `localhost:5173`

### Background Stuff (Don't Worry About)

- **Concurrently** — runs both servers from one command
- **Socket.io** — wired for later (live match tracking). Adapter already set in `main.ts`
- **Drizzle Kit** — migration generator, just run the commands below

---

## How to Implement a Feature

1. **Backend first** — create module/controller/service with `nest g`. Define endpoints
2. **Schema changes** — add tables to `backend/src/database/schema/index.ts`, then:
   ```bash
   npm --prefix backend run db:generate
   npm --prefix backend run db:migrate
   ```
3. **Frontend** — create page in `src/pages/`, add route in `App.tsx`, use TanStack Query to call your API
4. **Use what's there** — shadcn components, Tailwind for styling, Lucide for icons, Zod for validation

---

## Commands You'll Use Daily

| Command | From | What it does |
|---|---|---|
| `npm run dev` | root | Starts frontend + backend |
| `npm run build` | root | Compiles everything to check for TypeScript errors (catches type mismatches, missing imports, etc.) |
| `npm run lint` | root | Lints frontend + backend (checks your code for errors, bad patterns, and style issues — like a spell-checker for code) |
| `npm test` | root | Runs backend unit tests |
| `npm run db:generate` | backend | Generates migration after schema change |
| `npm run db:migrate` | backend | Applies migrations to database |

---

## Things to Follow

- **Conventional Commits**: `feat(module): description`, `fix(module): description`
- **AI attribution**: Add `Co-authored-by: Antigravity AI <antigravity@google.com>` if AI helped
- **Branch naming**: `feature/short-description`, `fix/short-description`
- **Never commit `.env`** — it's gitignored already
- **Use `@/` path alias** in frontend imports
- **Use NestJS generators** instead of manually creating files

---

## Accounts/Services Needed

- **GitHub** — repo access (you already have this)
- **Neon DB** — already set up, credentials shared privately

That's it. Everything else is local tooling.

---

## Project Structure (Where Things Go)

```
frontend/src/
  pages/         ← full page components (one per route)
  components/    ← reusable UI components
  components/ui/ ← shadcn generated components
  hooks/         ← custom React hooks
  services/      ← API client functions
  types/         ← shared TypeScript types

backend/src/
  database/      ← schema, service, migrations
  auth/          ← authentication (Better Auth — NOT YET CONFIGURED)
  teams/         ← team management module
  athletes/      ← athlete roster module
  events/        ← event management module
```

## Ai Declaration

- The preceeding document was Co-authored-by: Qoder(Auto)