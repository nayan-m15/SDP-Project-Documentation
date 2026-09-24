# System Architecture Overview

## Application architecture

The project under assessment is the Gaffer coaching application. It is a separately deployed client/server system; the documentation portal described later is not the application runtime.

```mermaid
flowchart LR
  U[Coach, assistant or player browser] -->|HTTPS REST; credentials included| V[Vercel: React/Vite SPA]
  V -->|/auth and /api rewrites| R[Render: NestJS API]
  R -->|Better Auth + Drizzle| N[(Neon PostgreSQL)]
  R -->|HTTPS geocoding and forecast| O[Open-Meteo]
  R -->|Verification email when configured| B[Brevo]
  G[Google OAuth] --> R
```

### Frontend

React 19 and TypeScript run as a Vite single-page application. React Router defines public, coach/assistant and claimed-player routes. TanStack Query manages server state; feature services call a shared `fetch` wrapper with `credentials: "include"`. Tailwind CSS and local CSS provide presentation; Base UI/shadcn-derived components supply reusable controls. Recharts renders statistics.

Primary areas are `pages/`, `features/`, `components/`, `services/`, `context/`, `hooks/` and `lib/`. The frontend does not connect to PostgreSQL or Open-Meteo directly.

### Backend

NestJS 11 runs on Express. Feature modules contain controllers, services and Zod request schemas for authentication, teams, athletes, invitations/claims, player views, events, game plans, matches, seasons, statistics, dashboard, profile, locations and weather. Swagger is built from controller metadata.

Authentication uses Better Auth with the Drizzle adapter. `AuthGuard` resolves the session cookie. Controllers use `requireTeamId` for member access and `requireCoachTeamId` for coach-only mutations; services scope resource queries to the resolved team.

### Persistence

At the 24 September source commit, Drizzle maps 33 PostgreSQL tables and 25 enums. The hosted database is documented as Neon through `@neondatabase/serverless`; migration state in the deployed database has not been confirmed. SQL migrations live under `backend/drizzle`; schema source is `backend/src/database/schema/index.ts`.

### Communication and external services

- Normal application communication is REST over HTTPS with a Better Auth session cookie.
- The backend calls Open-Meteo geocoding and forecast endpoints. Forecasts are cached in process; a recently expired cached result may be returned as stale for up to six hours when the provider fails.
- Brevo sends verification email when configured; in local development without `BREVO_API_KEY`, the implementation logs the verification URL.
- Google OAuth is configured through Better Auth.
- Socket.io packages and the Nest `IoAdapter` are present, but no WebSocket gateway or frontend socket connection was found. Current shared match logging instead uses local queued observations, authenticated upload, server reconciliation and PowerSync replication when configured. See [offline collaboration](../offline-collaboration.md).

## Deployment

| Component | Current evidence | Notes |
| --- | --- | --- |
| Frontend | Vercel at [gaffer-virid.vercel.app](https://gaffer-virid.vercel.app/) | `vercel.json` rewrites authentication and API requests to Render. |
| Backend | Render at [gaffer-api-ynaf.onrender.com](https://gaffer-api-ynaf.onrender.com/) | API, Swagger and health endpoint. No Railway configuration was found. |
| Database | PostgreSQL on Neon | Connection comes from `DATABASE_URL`; secrets are not documented. |
| Documentation | GitHub Pages | Static HTML/CSS/JS viewer reading root `manifest.json`. |

The application root and supporting deployed documentation endpoints were previously observed reachable, but availability varies by route and revision. On 14 September 2026, the four new formations/tactics public API URLs returned 404 and deployed OpenAPI omitted those routes.

## Documentation portal architecture

```mermaid
flowchart LR
  P[GitHub Pages] --> I[index.html]
  I --> J[js/viewer.js]
  J --> M[manifest.json]
  M --> D[Reviewed Markdown]
  J --> C[Pinned DOMPurify, Marked, Mermaid, Highlight.js and Lucide CDNs]
```

The portal has no Docusaurus build and no application API dependency. Adding or renaming a document requires a matching manifest entry and exact byte size. The browser upload helper was removed; updates use reviewed Git changes. Markdown output is sanitized before insertion.

## Known architecture gaps

- Browser queue, upload and PowerSync paths exist in source; production configuration, two-device behaviour and physical-device recovery remain unverified.
- No collaborative WebSocket event distribution was found despite installed Socket.io scaffolding; shared logging uses a different path.
- Gitea Actions CI is configured for the application, and the 24 September workflow source includes `development` in push and pull-request triggers. No successful run was supplied. The documentation repository separately configures manifest, link, PDF and JavaScript validation in GitHub Actions; neither workflow proves deployment.
- OpenAPI describes route shapes incompletely and does not declare cookie authentication.
- In-process weather caching is per backend instance and is lost on restart.
