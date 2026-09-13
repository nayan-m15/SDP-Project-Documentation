# Team Development Guide

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
| `npm test` | Backend Jest unit tests only. |
| `npm run test:e2e` | Backend Supertest integration suite against `TEST_DATABASE_URL`. |
| `npm run test:e2e:ui` | Playwright against real local frontend/backend, Chromium only. |

The eight `frontend/src/**/*.node-test.mjs` scripts are not included in a package script. Run each explicitly with Node (or add a reviewed aggregate script in a future application change).

## Configuration and services

Environment-variable names and startup instructions are maintained in [Getting Started](../../Overview/01-getting-started.md). Provider accounts are required for hosted Neon, Vercel, Render, Google OAuth and production Brevo delivery. Open-Meteo defaults do not require the previously proposed Mapbox/OpenWeather keys.

## AI declarations

Preserve evidence-based declarations already supplied by the team and commit trailers. Do not infer a model/tool from code style or replace historical records with placeholder names. The documentation audit did not attempt to independently authenticate every historical AI-tool statement.
