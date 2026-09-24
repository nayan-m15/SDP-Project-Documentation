# Current Technology Stack

This inventory reflects manifests and source at the 24 September commit. Railway, Mapbox, OpenWeatherMap and Docusaurus were historical proposals. PowerSync now has source integration, subject to deployment configuration and field verification.

| Layer | Implemented technology | Role |
| --- | --- | --- |
| Frontend | React 19, React DOM, TypeScript 6, Vite 8 | Client-side SPA and build tooling. |
| Routing/state | React Router 7, TanStack Query 5 | Route composition and API server-state caching. |
| UI | Tailwind CSS 4, Base UI, shadcn-generated/local components, Lucide, React Icons, date-fns | Layout, reusable controls, icons and dates. |
| Visualisation | Recharts 3 | Team, player and season charts. |
| Backend | NestJS 11, Express adapter, TypeScript 5 | Modular REST API. |
| Validation | Zod 4 and a local `zodValidate` helper | Runtime request validation. |
| Authentication | Better Auth 1.6/1.7, Google OAuth | Email/password, verification, sessions and social sign-in. |
| Email | Brevo SDK | Verification-email delivery when configured. |
| Database | PostgreSQL on Neon, Drizzle ORM 0.45, Neon serverless driver | Relational persistence and schema/migrations. |
| Offline/replication | Browser-local match store, PowerSync client/configuration and Nest sync routes | Queued observations, upload receipts and replicated match views when configured. |
| API docs | `@nestjs/swagger`, Swagger UI Express | Generated OpenAPI document and explorer. |
| Weather/location | Open-Meteo HTTP APIs | Server-side geocoding and hourly forecast. |
| Testing | Jest 30, Supertest 7, Playwright 1.62 | Unit, API integration and Chromium browser tests. |
| Hosting | Vercel, Render, Neon, GitHub Pages | Frontend, API, database and documentation respectively. |

## Why these layers are separate

| Choice | Practical reason | Direct connection |
| --- | --- | --- |
| React/Vite SPA | Keeps browser interaction and route composition in the client; Vite provides local development and a static production build. | Calls the NestJS REST API with session cookies; it does not receive database credentials. |
| NestJS modules with Zod | Controllers expose routes, Zod checks incoming values, and services apply team/role rules and coordinate database writes. | Drizzle/PostgreSQL, Better Auth, Open-Meteo and optional Brevo delivery. |
| PostgreSQL/Drizzle | Relational keys, transactions, typed queries and reviewed SQL migrations suit team, match and competition history. | Only the backend connects directly to Neon. |
| Better Auth | Provides session and account handling through established library code. | Browser cookie, Nest guard and `user`/`session`/`account`/`verification` tables. Password reset and account deletion are still open requirements. |
| PowerSync plus the browser match store | Preserves match-day observations locally and replicates authorized views when configured. | The browser uploads through authenticated `/sync` routes; server reconciliation updates canonical records and projections. |
| Open-Meteo | Supplies a relevant external geocoding and forecast integration. | The backend calls the provider; the browser calls Gaffer's own API. |

The original stack document presented WebSocket rooms, password-management email, Firefox/WebKit browser tests, WCAG conformance and continuous deployment as active capabilities. Current source or run evidence does not establish those claims. The [architecture overview](architecture-overview.md) shows the request path, and the [team guide](team-tool-stack-guide.md) gives the local workflow.

## Installed but not a delivered capability

Socket.io packages and Nest's `IoAdapter` are installed. No `WebSocketGateway`, subscription handler, room broadcast or frontend socket connection was found. They are scaffolding, not evidence of collaborative live synchronisation.

## Historical proposals and remaining limits

- PowerSync and local persistence are present in source. A complete field run and deployment proof are still needed.
- Mapbox map/geocoding
- OpenWeatherMap forecasts
- Railway backend hosting
- Docusaurus documentation build
- Continuous deployment. A Gitea Actions CI workflow exists and its 24 September source includes the `development` branch, but no passing run or deployment evidence was supplied.

The 14 September frontend used local storage for reminders and in-memory match form state. The current `frontend/src/offline/match-store.ts` adds a persistent browser match store and an export/import recovery path. See [offline collaboration](../offline-collaboration.md).

## Version authority

The root, frontend and backend `package.json` files express requested direct dependency ranges; lockfiles record resolved packages. Runtime service versions and hosting plans are not inferred. See [Third-party Code and Assets](../third-party-code-and-assets.md) for licences and provenance status.
