# Team Development Guide

## Quick local setup

From the application repository root, copy `.env.example` to an untracked `.env` and fill in the required development values supplied privately. The frontend also has `frontend/.env.example` if its API URL needs a local override. Never commit credentials.

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
npm run dev
```

The default development URLs are `http://localhost:5173` (Vite), `http://localhost:3000` (NestJS) and `http://localhost:3000/api/docs` (Swagger). A configured, migrated development database is needed for data-backed flows. See [Getting Started](../../Overview/01-getting-started.md) for environment variables and safe test-database setup.

## Repository layout

```text
SportCoachingTool/
├── frontend/          React/Vite SPA
├── backend/           NestJS API, Drizzle schema and migrations
├── e2e/               Playwright full-stack browser tests
├── docs/              Application-repository engineering notes
├── package.json       Cross-project commands
├── playwright.config.ts
└── .env.example
```

## Everyday workflow

1. Start from the branch agreed for the current piece of work. Both `main` and `development` exist; see [Git Methodology](../git-methodology.md) for the unresolved policy discrepancy.
2. Install each package scope, create uncommitted environment files, and run `npm run dev` from the application root.
3. Put UI/API calls in frontend service or feature API modules; validate backend bodies with the feature Zod schema; keep controllers thin and scope service queries by the authenticated team.
4. Add focused unit tests and the smallest relevant API/browser coverage.
5. Run `npm run lint`, `npm run build`, and safe relevant tests before review. Do not point stateful tests at shared data.
6. Update documentation when behaviour, contracts, environment variables or operational limits change.

## Where a feature goes

| Concern | Typical location and tool |
| --- | --- |
| Page and route | `frontend/src/pages/` or `frontend/src/features/`, then `frontend/src/App.tsx` for the route. React Router guards choose the UI experience; server checks remain authoritative. |
| Shared UI | `frontend/src/components/` and `components/ui/` for existing Base UI/shadcn-derived controls; Tailwind utility classes and Lucide icons for presentation. |
| API call and server state | Feature API/service module plus TanStack Query `useQuery` for reads and `useMutation` for writes; invalidate the relevant query after a successful mutation. `@/` resolves to `frontend/src/`. |
| Backend request | Feature controller for the route, Zod schema for runtime input validation, and service for role/team checks and business logic. `AuthGuard` and `@CurrentUser()` carry session context. |
| Database change | `backend/src/database/schema/index.ts`, followed by a reviewed generated SQL migration; inject `DatabaseService` in services. |
| Regression evidence | Focused unit/domain test, then integration or browser coverage when the behaviour crosses boundaries. Record the command and result. |

For a schema change, run `npm --prefix backend run db:generate`, review the SQL, then run `npm --prefix backend run db:migrate` against an isolated development database. Existing applied migrations should not be edited casually. Swagger describes routes from controller metadata, but its current output omits some cookie security and DTO details, so check Zod contracts and the [API guide](../api-guide.md) before treating it as the full contract.

## Boundaries to preserve

- The frontend never receives database credentials or connects directly to PostgreSQL.
- Team-scoped endpoints derive the team from the session, not an arbitrary client-supplied team ID.
- Members may read managed team data; coach-only mutations use `requireCoachTeamId`; live match logging is available to team members.
- Authentication uses cookies, so frontend requests include credentials and CORS must allow the exact frontend origin.
- Archive athletes where history should be retained. Do not silently remove historical evidence.
- Never edit an existing applied migration casually. Change the schema, generate/review a new migration, and test it against a disposable database.

## Commands

| Command (application root) | Purpose |
| --- | --- |
| `npm run dev` | Run Nest and Vite concurrently. |
| `npm run build` | Type-check/build frontend, then build backend. |
| `npm run lint` | Frontend Oxlint, then backend ESLint. |
| `npm test` | Match-domain package tests, then backend Jest unit tests. |
| `npm run test:e2e` | Backend Supertest integration suite against `TEST_DATABASE_URL`. |
| `npm run test:e2e:ui` | Playwright against real local frontend/backend, Chromium only. |
| `npm run test:e2e:pwa` | Playwright PWA configuration; requires its configured services and test data. |
| `npm --prefix frontend test` | Frontend Node test scripts defined in the frontend package. |
| `npm --prefix backend run db:generate` | Generate a migration after an intentional schema change. |
| `npm --prefix backend run db:migrate` | Apply migrations to the configured development database. |

The frontend package defines a `test` script for `frontend/src/**/*.node-test.mjs`; use that script rather than running files individually.

## Configuration and services

Environment-variable names and startup instructions are maintained in [Getting Started](../../Overview/01-getting-started.md). Provider accounts are required for hosted Neon, Vercel, Render, Google OAuth and production Brevo delivery. Open-Meteo defaults do not require the previously proposed Mapbox/OpenWeather keys.

## AI declarations

Preserve evidence-based declarations already supplied by the team and commit trailers. Do not infer a model/tool from code style or replace historical records with placeholder names. Historical AI-tool statements have not all been independently authenticated.
