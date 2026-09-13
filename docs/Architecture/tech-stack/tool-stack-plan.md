# Historical Stack and Integration Proposal

> [!WARNING]
> This is a historical design proposal, not the current implementation. It previously described planned tools in present tense. Use [Current Technology Stack](web-app-tool-stack.md) and [System Architecture Overview](architecture-overview.md) for assessment evidence.

## Proposal compared with implementation

| Earlier proposal | Current finding |
| --- | --- |
| React/Vite client and NestJS API | Implemented. |
| PostgreSQL/Neon with Drizzle | Implemented. |
| Better Auth | Implemented for sign-up, email verification, sign-in, Google sign-in, sessions and sign-out. Password reset/account deletion remain absent. |
| PowerSync with SQLite for offline capture | Not implemented. |
| Socket.io rooms and live broadcasting | Packages/adapter only; gateway and client connection absent. |
| OpenWeatherMap and Mapbox | Not implemented; Open-Meteo provides geocoding and weather, and no map renderer was found. |
| Railway backend | Not current; deployment evidence points to Render. |
| GitHub Actions on pull requests/deploy | No workflow files found in either inspected repository. |
| Docusaurus documentation | Not implemented; the portal is custom static HTML/CSS/JavaScript. |

## Still-useful design goals

The proposal correctly favoured a separate frontend/backend, server-owned database access, runtime validation, event-derived statistics, team scoping, explicit offline conflict handling, and layered tests. Only the items linked from the current evidence pages should be treated as delivered.

## Future implementation cautions

- Offline support needs a persistent client queue, retry policy, ordering/idempotency rules, conflict resolution, UI status, and dedicated tests. `clientRequestId` is useful groundwork but is not the full feature.
- Collaborative logging needs authenticated socket connections, match rooms, authorisation, reconnect behaviour and multi-client tests.
- Maps, notification channels and report export require separate acceptance criteria and provenance/privacy review.

