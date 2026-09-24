# Getting Started with Gaffer

## Current-state update — 24 September 2026

The application now has competition/fixture, injury/recovery, public dashboard and offline logging source that postdates the older operational notes below. The root scripts also include `npm run test:e2e:pwa`, and `npm test` includes `packages/match-domain`. Check [Sprint 3 evidence](../Project%20Management/sprint-3-delivery.md) and [offline architecture](../Architecture/offline-collaboration.md) for current scope and verification limits.

Gaffer is a football team-management application. This page separates using the hosted product, developing the application, and contributing to this documentation portal.

## Use the hosted application

- Frontend: [https://gaffer-virid.vercel.app/](https://gaffer-virid.vercel.app/)
- API: [https://gaffer-api-ynaf.onrender.com/](https://gaffer-api-ynaf.onrender.com/)
- API explorer: [Swagger UI](https://gaffer-api-ynaf.onrender.com/api/docs)

Create an account with email/password (email verification is required) or Google sign-in. A coach can create a team; a player uses a claim link tied to an athlete record; an assistant uses an email-bound team invitation. See [Product Overview](02-product-overview.md) for implemented capabilities and limitations.

## Develop the application

Application repository: [nayan-m15/Gaffer](https://github.com/nayan-m15/Gaffer)

Prerequisites: a current Node.js/npm installation, PostgreSQL (Neon is used for the hosted database), and valid local environment values. Copy the application's `.env.example` to `.env` and its `frontend/.env.example` to `frontend/.env` if a frontend override is needed. Never commit secrets.

```bash
npm install
npm --prefix frontend install
npm --prefix backend install
npm run dev
```

Local endpoints:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api/docs`
- OpenAPI JSON: `http://localhost:3000/api/docs-json`
- Database health: `http://localhost:3000/health/database`

Common commands:

```bash
npm run build
npm run lint
npm test
npm run test:e2e
npm run test:e2e:ui
```

Integration tests require a migrated `TEST_DATABASE_URL` that is different from `DATABASE_URL`. Browser tests use the database configured for the launched backend and therefore must not be aimed at shared or production data. Read [Testing and QA](../Quality/testing-and-qa.md) before running stateful tests.

Database migration commands are run from `backend`:

```bash
npm run db:generate
npm run db:migrate
```

Generate a migration only after intentionally changing the Drizzle schema, review its SQL, and apply it first to a disposable or development database. This documentation task did not change or execute migrations.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Backend PostgreSQL/Neon connection string. |
| `TEST_DATABASE_URL` | Separate integration-test database. Must differ from `DATABASE_URL`. |
| `BETTER_AUTH_SECRET` | Better Auth signing secret. |
| `BETTER_AUTH_URL` | Backend base URL used for authentication callbacks/cookies. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials. |
| `FRONTEND_URL` | Allowed frontend origin. |
| `BREVO_API_KEY` | Optional transactional email delivery; without it, development logs the verification link. |
| `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` | Verification-email sender identity. |
| `WEATHER_API_URL`, `GEOCODING_API_URL` | Optional Open-Meteo endpoint overrides. |
| `WEATHER_CACHE_MINUTES`, `WEATHER_HISTORY_DAYS`, `WEATHER_FORECAST_DAYS` | Weather cache and supported date range. |
| `VITE_API_URL` | Frontend API base URL; defaults locally to `http://localhost:3000`. |

## Contribute to this documentation portal

This repository is a separate static site, not the Gaffer React application. Markdown files live under `docs/`; images live under `assets/`; root `manifest.json` controls navigation. The viewer uses pinned Marked, DOMPurify, Mermaid, Highlight.js and Lucide CDN versions.

```bash
npm install
npm run dev
```

After editing, regenerate manifest sizes, run `npm run validate` and `npm run check:js`, then preview representative pages. A lightweight GitHub Actions workflow runs these documentation checks on pushes and pull requests; configuration existence is not evidence of a successful run or deployment.

## Operational notes

- Vercel hosts the frontend; Render hosts the NestJS API; Neon hosts PostgreSQL; GitHub Pages hosts this documentation.
- The frontend Vercel rewrites `/auth/*` and `/api/*` to the Render API.
- The application has a Gitea Actions CI workflow and this documentation repository has validation-only GitHub Actions. Configuration is not a successful run or deployment; no branch-protection evidence is supplied, and the application `develop`/`development` trigger defect remains open.
- The application is online-first. Live logging has server persistence and idempotency support, but no durable offline queue or collaborative Socket.io broadcasting is implemented.
