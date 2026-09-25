# Historical Stack and Integration Proposal

> [!WARNING]
> This is a historical design proposal, not the current implementation. It previously described planned tools in present tense. Use [Current Technology Stack](web-app-tool-stack.md) and [System Architecture Overview](architecture-overview.md) for assessment evidence.

## Proposal compared with implementation

| Earlier proposal | Current finding |
| --- | --- |
| React/Vite client and NestJS API | Implemented. |
| PostgreSQL/Neon with Drizzle | Implemented. |
| Better Auth | Implemented for sign-up, email verification, sign-in, Google sign-in, sessions and sign-out. Password reset/account deletion remain absent. |
| PowerSync with SQLite for offline capture | Present in the 24 September source, with deployment and physical-device verification unconfirmed; see [offline collaboration](../offline-collaboration.md). |
| Socket.io rooms and live broadcasting | Packages/adapter only; gateway and client connection absent. |
| OpenWeatherMap and Mapbox | Not implemented; Open-Meteo provides geocoding and weather, and no map renderer was found. |
| Railway backend | Not current; deployment evidence points to Render. |
| GitHub Actions on pull requests/deploy | Application Gitea Actions CI exists and now includes `development` in triggers, but it does not establish deployment and no successful run was supplied. The docs repository has a separate validation-only GitHub Actions workflow. |
| Docusaurus documentation | Not implemented; the portal is custom static HTML/CSS/JavaScript. |

## Still-useful design goals

The proposal correctly favoured a separate frontend/backend, server-owned database access, runtime validation, event-derived statistics, team scoping, explicit offline conflict handling, and layered tests. Only the items linked from the current evidence pages should be treated as delivered.

## Remaining verification and future work

- The current source has a persistent browser queue, retry receipts, reconciliation, review state and PowerSync configuration. Verify two-device behaviour, recovery and production configuration before claiming the complete offline and concurrent workflow is delivered; see [offline collaboration](../offline-collaboration.md).
- Socket rooms were part of this historical proposal. Current shared logging uses authenticated upload and PowerSync replication; Socket.io remains installed scaffolding. Add socket delivery only if a later requirement calls for it.
- Maps, notification channels and **match-report** file export still need separate acceptance criteria and provenance/privacy review. Game-plan and injury PDF exports have different purposes and do not establish match-report export.
