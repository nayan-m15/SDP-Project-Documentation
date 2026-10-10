# Getting Started with Gaffer

Gaffer is a football team-management application. This page separates using the hosted product, developing the application, and contributing to this documentation portal.

## Use the hosted application

- Frontend: [https://gaffer-virid.vercel.app/](https://gaffer-virid.vercel.app/)
- API: [https://gaffer-api-ynaf.onrender.com/](https://gaffer-api-ynaf.onrender.com/)
- API explorer: [Swagger UI](https://gaffer-api-ynaf.onrender.com/api/docs)

Create an account with email/password (email verification is required) or Google sign-in. A coach can create a team; a player uses a claim link tied to an athlete record; an assistant uses an email-bound team invitation. See [Product Overview](02-product-overview.md) for implemented capabilities and limitations.

## Develop the application

Application repository: [SDP-Interlude/SportCoachingTool](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool)

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
| `BETTER_AUTH_URL` | Public authentication origin; in production use the frontend origin serving the `/auth` proxy so callbacks/cookies stay first-party. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials. |
| `FRONTEND_URL` | Allowed frontend origin. |
| `BREVO_API_KEY` | Transactional auth email; development can log verification links, but production email-required requests fail closed if unconfigured. |
| `EMAIL_FROM_ADDRESS`, `EMAIL_FROM_NAME` | Verification-email sender identity. |
| `WEATHER_API_URL`, `GEOCODING_API_URL` | Optional Open-Meteo endpoint overrides. |
| `WEATHER_CACHE_MINUTES`, `WEATHER_HISTORY_DAYS`, `WEATHER_FORECAST_DAYS` | Weather cache and supported date range. |
| `VITE_API_URL` | Local frontend API override; production uses same-origin `/api` and `/auth` rewrites. |

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
- The application has Gitea Actions CI configuration; this portal has documentation validation in GitHub Actions. Configuration alone does not prove successful runs, branch protection or deployment.
- The current source includes a durable browser queue for match observations and operations, plus server reconciliation and PowerSync replication. Prepare the match while online, check the offline readiness panel, and export unsent observations before clearing browser data. Device field tests, production configuration and stakeholder acceptance are unverified; see [offline collaboration](../Architecture/offline-collaboration.md).

## Current configuration and migration prerequisites

Use the repository-root `.env.example` as the configuration name authority; Vite currently loads the root environment file. Never put database or private signing secrets into `VITE_*` variables.

| Names | Purpose |
| --- | --- |
| `POWERSYNC_URL`, `POWERSYNC_PRIVATE_KEY`, `POWERSYNC_KID` | Service endpoint and asymmetric production token signer/public JWKS trust. |
| `POWERSYNC_SHARED_SECRET` | Supported HS256 development signer; isolate from production trust. |
| `VITE_POWERSYNC_URL`, `VITE_DEPLOYMENT_ENV` | Browser replication endpoint/deployment queue scope. |
| `TWO_SIDED_LIVE_LOGGING_ENABLED` | Backend opt-in for shared sessions and token claim; trimmed case-insensitive `true` enables it. |
| `OFFLINE_SYNC_ENABLED`, `OFFLINE_SYNC_MATCH_IDS` | Upload pause/allowlist without deleting pending work. |
| `OPERATIONS_HEALTH_TOKEN` | Dedicated protected operational-health bearer token. |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Optional AI provider/key and selected model/fallback chain; missing provider means insights can be unavailable. |
| `AUTH_SIGN_IN_RATE_LIMIT`, `AUTH_EMAIL_RATE_LIMIT`, corresponding `_BACKSTOP_RATE_LIMIT` | Shared database-backed auth request budgets. |
| `PUBLIC_DASHBOARD_RATE_LIMIT`, `PUBLIC_DASHBOARD_BACKSTOP_RATE_LIMIT`, `PUBLIC_DASHBOARD_CACHE_TTL_SECONDS`, `PUBLIC_DASHBOARD_CACHE_MAX_ENTRIES` | Anonymous database-read protection and cache configuration. |
| `REVERSE_GEOCODING_API_URL`, `GEOCODING_USER_AGENT` | Reverse-location provider configuration and request identity. |

The backend requires the complete ordered migration journal through the current shared-report, duplicate-review, end/resume, scheduling timezone, friendly format, archive/hide and single-coach publication migrations. The normal `db:migrate` tool is journal/hash aware; do not replay old migrations to repair timestamp drift. Hosted installed state is separate from source requirements. Public Swagger documents the anonymous GET endpoints (seven on the hosted API as of 10 October 2026); the [API guide](../Architecture/api-guide.md) covers both those and the protected routes.

See [operations prerequisites](../Architecture/operations/offline-operations-runbook.md), [PowerSync security](../Architecture/security/powersync-security.md), [refresh](../Architecture/automatic-data-refresh.md) and [current architecture/source basis](../Architecture/tech-stack/architecture-overview.md).

Configuration authority: [.env.example](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/.env.example), [frontend/vite.config.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/vite.config.ts).
