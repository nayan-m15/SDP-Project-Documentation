# Current Technology Stack

This inventory reflects manifests and source at the evidence snapshot; it supersedes older Railway, Mapbox, OpenWeatherMap, PowerSync and Docusaurus claims.

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
| API docs | `@nestjs/swagger`, Swagger UI Express | Generated OpenAPI document and explorer. |
| Weather/location | Open-Meteo HTTP APIs | Server-side geocoding and hourly forecast. |
| Testing | Jest 30, Supertest 7, Playwright 1.62 | Unit, API integration and Chromium browser tests. |
| Hosting | Vercel, Render, Neon, GitHub Pages | Frontend, API, database and documentation respectively. |

## Installed but not a delivered capability

Socket.io packages and Nest's `IoAdapter` are installed. No `WebSocketGateway`, subscription handler, room broadcast or frontend socket connection was found. They are scaffolding, not evidence of collaborative live synchronisation.

## Not implemented from earlier proposals

- PowerSync/SQLite offline store and conflict merge
- Mapbox map/geocoding
- OpenWeatherMap forecasts
- Railway backend hosting
- Docusaurus documentation build
- Continuous deployment. A Gitea Actions CI workflow exists, but no passing run/deployment evidence was supplied and its `develop`/`development` trigger discrepancy remains open.

The current frontend uses local storage only to remember dismissed reminder IDs. Match form state kept in memory is not durable offline logging.

## Version authority

The root, frontend and backend `package.json` files express requested direct dependency ranges; lockfiles record resolved packages. Runtime service versions and hosting plans are not inferred. See [Third-party Code and Assets](../third-party-code-and-assets.md) for licences and provenance status.
