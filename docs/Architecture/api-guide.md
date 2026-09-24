# REST API Guide

## Controller route inventory

This inventory comes from NestJS controller decorators at application commit `ef2880ad0018536c2b933754148e285b2a325ec7`. It describes source routes, not a verified production deployment. Path parameters require the caller to satisfy the controller guard and service authorization checks. Better Auth routes also include its mounted handler beyond the explicit controller methods below.

| Area | Source routes and methods | Access boundary |
| --- | --- | --- |
| Competition setup | `GET /competitions/search`, `/mine`, `/:id`, `/:id/fixtures`; `POST /competitions`, `/:id/fixtures/generate`, `/:id/fixtures/:fixtureId/schedule/accept`, `/:id/fixtures/:fixtureId/schedule/propose`, `/:id/results`, `/:id/teams`; `PATCH /competitions/:id`, `/:id/results/:resultId`; `DELETE /competitions/:id`, `/:id/results/:resultId`, `/:id/teams/:competitionTeamId` | Session and competition membership or administration; search is not anonymous. |
| Competition invitations | `GET /competition-invites`, `/:token`; `POST /competition-invites`, `/:token/accept`; `DELETE /competition-invites/:id` | Invitation token routes have a different access path from competition administration; see controller and service for exact checks. |
| Injuries | `GET /injuries`, `/protocol`, `/recovery/:athleteId`, `/:id`; `POST /injuries`, `/:id/timeline`; `PATCH /injuries/:id`, `/:id/close`; `DELETE /injuries/:id` | Authenticated, team-scoped clinical information. Do not treat the protocol route as anonymous without checking its guard. |
| Live matches | `GET /matches/:matchId`, `/squad`, `/opponent-squad`, `/events`, `/event-reviews`, `/clock-operations`; `POST /matches/:matchId/events`, `/event-reviews/:reviewId/resolve`, `/finish`, `/finalise`, `/reopen`; `PATCH /matches/:matchId/events/:eventId`, `/clock`; `DELETE /matches/:matchId/events/:eventId` | Authenticated match/team access and operation-specific permissions. |
| Offline sync | `GET /sync/token`, `/jwks`; `POST /sync/upload`, `/telemetry` | Token, upload and telemetry require authorized context; JWKS exposes public verification keys. See [offline collaboration](offline-collaboration.md). |
| Public read API | `GET /v1/formations`, `/v1/tactics`, `/v1/public-dashboard/filters`, `/matches`, `/players`, `/team-statistics` | Anonymous read endpoints; verify deployment separately. |
| Health | `GET /health/database`, `/health/operations` | Operational status; neither proves a full user flow works. |

The remaining first-party routes for auth, teams, athletes, claims, team invitations, events, players, seasons, game plans, statistics, dashboard, profile and location search are listed below. Route shape alone does not specify DTO validation, response shape, errors, or authorization; use controller, guard, contract and service source for those details.

| Existing controller | Declared methods at the 24 September source commit |
| --- | --- |
| `auth` | `POST /auth/sign-up`, `/send-verification-email`, `/sign-in`, `/sign-out`, `/sign-in/social`; `GET /auth/verify-email`, `/session`, `/callback/google` |
| `teams`, `team-invites`, `claims` | `POST /teams`; `PATCH /teams`; `POST /team-invites`, `/:token/accept`; `GET /team-invites`, `/assistants`, `/:token`; `DELETE /team-invites/:id`; `GET /claims/:token`; `POST /claims/:token/accept` |
| `athletes` | `POST /athletes`, `/:athleteId/claim-invite`; `GET /athletes`, `/archived`, `/:id`; `PATCH /athletes/:id`, `/:id/restore`; `DELETE /athletes/:id`, `/:athleteId/claim-invite` |
| `events` | `POST /events`, `/:eventId/start-match`, `/:eventId/rsvp`; `GET /events`, `/:eventId/rsvps`, `/:id`, `/:id/weather`; `PATCH /events/:id`; `DELETE /events/:id` |
| `player` | `GET /player/me`, `/team`, `/events`, `/standings` |
| `game-plans` | `GET /game-plans`, `/:id`; `POST /game-plans`; `PATCH /game-plans/:id`; `DELETE /game-plans/:id` |
| `seasons` | `GET /seasons`; `POST /seasons`; `PATCH /seasons/:id`; `DELETE /seasons/:id` |
| `statistics` | `GET /statistics`, `/athletes/:id`, `/compare`, `/competitions`; `POST /statistics/competitions`, `/competitions/:id/standings`; `PATCH /statistics/competitions/:id`, `/standings/:id`; `DELETE /statistics/competitions/:id`, `/standings/:id` |
| `dashboard`, `profile`, `locations` | `GET /dashboard`, `/profile`, `/locations/search`; `PATCH /profile` |

### Current request contracts and access examples

| Endpoint | Input and response | Access and common failure |
| --- | --- | --- |
| `GET /v1/public-dashboard/filters` | No query; `{success:true,data}` containing public filter choices. | Anonymous read. |
| `GET /v1/public-dashboard/matches` | Optional UUID `teamId`, `competitionId`, `seasonId`; optional `status` (`scheduled`, `cancelled`, `completed`), `limit` 1–100 (default 50), `offset` ≥0 (default 0). Returns `{success,count,limit,offset,data}`. | Anonymous read; invalid query returns validation error. |
| `GET /v1/public-dashboard/players` | Same UUID filters, `limit` 1–500 (default 200), `offset` ≥0 (default 0); same paged envelope. | Anonymous read; public service decides which records/fields are exposed. |
| `GET /v1/public-dashboard/team-statistics` | Optional UUID filters; `{success,count,data}`. | Anonymous read. |
| `GET /competitions/search?q=...` | Trimmed nonempty search text, max 100 characters; list from service. | **Session required** even though results are discoverable; search/detail do not grant membership. |
| `POST /competitions/:id/fixtures/generate` | `{ "regenerate": false }` (optional boolean). | Session and service administration checks; invalid UUID/body or unauthorized change fails. |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/accept` | `{ "expectedRevision": 1 }`, optional `competitionTeamId` UUID. | Session and participant permission; revision guards conflicting updates. |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/propose` | `{ "expectedRevision": 1, "scheduledAt": "2026-09-26T15:00:00+02:00", "note": "Optional" }`; note max 500 characters. | Session and participant permission; invalid time/revision or forbidden team fails. |
| `GET /injuries?status=open&athleteId=<uuid>` | `status` is `open`, `closed` or `all`; optional athlete UUID; team-scoped list. | Session and team membership. `GET /injuries/protocol` also requires membership. |
| `POST /injuries` | Body validated by `createInjurySchema`; created injury record. | Coach **or assistant** team member may report. Updates, close, timeline mutation and deletion require coach role. |
| `PATCH /injuries/:id/close` | `{ "actualReturnOn": "2026-09-24", "notes": "Optional" }`; updated record. | Coach only; team scope, UUID and date validation apply. |
| `GET /sync/token` | `{endpoint,token,expiresAt}`; token expires after five minutes and includes user/team/role claims. | Session; returns 503 when PowerSync configuration is absent. |
| `POST /sync/upload` | `{items:[...]}` with 1–50 observation/operation items; `{receipts:[...]}`. | Session; each item is processed separately, with `accepted`, `dependency_pending` or `rejected` receipt and safe error code. A repeated ID with changed payload/user yields `ID_REUSED`. |
| `POST /sync/telemetry` | Device UUID, pending/rejected counts (0–100000), nullable ISO timestamps and deployment name; `{accepted:true}`. | Session; server derives user/team rather than trusting client identity. |
| `GET /sync/jwks` | Public JSON Web Key Set when signing key is configured. | No session; availability depends on server configuration. |

Sources: [public query schemas](https://github.com/nayan-m15/Gaffer/blob/ef2880ad0018536c2b933754148e285b2a325ec7/backend/src/public-api/public-api.schemas.ts), [competition controller](https://github.com/nayan-m15/Gaffer/blob/ef2880ad0018536c2b933754148e285b2a325ec7/backend/src/competitions/competitions.controller.ts), [injury controller](https://github.com/nayan-m15/Gaffer/blob/ef2880ad0018536c2b933754148e285b2a325ec7/backend/src/injuries/injuries.controller.ts), and [sync schemas/controller](https://github.com/nayan-m15/Gaffer/tree/ef2880ad0018536c2b933754148e285b2a325ec7/backend/src/sync). These examples describe source behaviour and do not certify current deployment.

> **API boundary:** this is the broad first-party application API used by the Gaffer frontend. Most routes are cookie-authenticated and team-scoped. The separate [Gaffer Public API Reference](Gaffer-Public-API-Reference.md) documents only the unauthenticated read-only `GET /v1/formations` and `GET /v1/tactics` endpoints. Those routes are implemented/tested in source but were absent from the verified deployment on 14 September 2026. Open-Meteo is a third-party integration consumed by Gaffer and is neither of these APIs.

## URLs and availability

| Purpose | Deployed | Local |
| --- | --- | --- |
| API base | [https://gaffer-api-ynaf.onrender.com](https://gaffer-api-ynaf.onrender.com) | `http://localhost:3000` |
| Swagger UI | [deployed Swagger](https://gaffer-api-ynaf.onrender.com/api/docs) | `http://localhost:3000/api/docs` |
| OpenAPI JSON | [deployed JSON](https://gaffer-api-ynaf.onrender.com/api/docs-json) | `http://localhost:3000/api/docs-json` |
| Database health | [deployed health](https://gaffer-api-ynaf.onrender.com/health/database) | `http://localhost:3000/health/database` |

The application root, Swagger, OpenAPI JSON and database-health links were previously observed reachable. That does not establish that every source route is deployed. On 14 September 2026, all four formations/tactics public-route URLs returned 404 and the deployed OpenAPI JSON did not list them or the `Public API` tag.

## Local setup

Install root/frontend/backend dependencies, configure the variables in `.env.example`, migrate a development database, then run `npm run dev`. The backend listens on port 3000 and the frontend on 5173. See [Getting Started](../Overview/01-getting-started.md) and [Database Schema](data/database-schema.md).

## Authentication, roles and team scope

Authentication is a Better Auth HTTP-only session cookie. Browser requests send `credentials: "include"`; command-line clients must retain the cookie from sign-in and send it on later calls. Do not put the session token in query strings or documentation.

Most feature controllers use `AuthGuard`. The server derives the user's team through membership/claim data:

- coach and assistant reads use the resolved team;
- roster/event/game-plan/season/competition mutations are coach-only;
- team members can operate the live match logger;
- player routes operate on the signed-in user's claimed athlete context;
- service queries include the resolved team ID to prevent cross-team access.

The **14 September deployed OpenAPI snapshot** declared no security scheme, so it did not communicate cookie requirements. That snapshot also lacked most request/response schemas and common errors; only two component schemas were published, both for starting a match. The currently deployed OpenAPI was unavailable for comparison in this audit. Use source Zod schemas as the request authority until a new deployed document is checked.

## Endpoint groups

| Group | Representative routes |
| --- | --- |
| Health/application | `GET /`, `GET /health/database` |
| Auth | `POST /auth/sign-up`, `POST /auth/sign-in`, `POST /auth/sign-out`, `GET /auth/session`, verification and Google OAuth routes |
| Team/roster | `POST/PATCH /teams`; athlete CRUD/archive/restore; claim invitations; assistant team invitations |
| Player | `GET /player/me`, `/player/team`, `/player/events`, `/player/standings` |
| Events | `GET/POST /events`, `GET/PATCH/DELETE /events/:id`, RSVP, RSVP breakdown, weather, start match |
| Tactics | CRUD under `/game-plans` |
| Matches | match/squad/opponent/event reads; event create/update/delete; clock update; finish |
| Statistics | summary, athlete detail, compare, competition CRUD and standings CRUD |
| Seasons | CRUD under `/seasons` |
| Other | `GET /dashboard`, `GET/PATCH /profile`, `GET /locations/search` |

## Representative calls

### Create an event

```http
POST /events
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{
  "title": "Training",
  "type": "training",
  "scheduledAt": "2026-09-15T16:00:00+02:00",
  "location": "Wits Football Field",
  "notes": "Bring bibs"
}
```

The Zod contract trims text, requires title/type/offset date-time/location, limits title to 150, location to 200 and notes to 2,000 characters, and requires latitude/longitude together if weather coordinates are supplied. A successful response is the persisted event representation, including server IDs/timestamps and its team scope.

### Start a match

```http
POST /events/<event-uuid>/start-match
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{
  "opponentName": "Riverside FC",
  "isHome": true,
  "startingAthleteIds": ["<11 distinct team athlete UUIDs>"],
  "benchAthleteIds": ["<optional distinct athlete UUIDs>"],
  "opponentSquadVisibility": "numbers",
  "opponentSquad": [{ "shirtNumber": 9 }]
}
```

The starting XI must contain exactly 11 unique eligible team athletes. Bench players cannot overlap. Opponent mode `none` accepts no squad, `numbers` requires at least one unique 1–99 shirt number and omits names, and `full` requires a name for each supplied player.

### Log and correct an event

```http
POST /matches/<match-uuid>/events
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{
  "clientRequestId": "<new UUID>",
  "team": "own",
  "eventType": "goal",
  "athleteId": "<selected athlete UUID>",
  "minute": 34,
  "detail": "Open play"
}
```

Use a new stable request UUID per logical create so a retry cannot create the same match event twice. Corrections use `PATCH /matches/:matchId/events/:eventId`; deletion uses `DELETE` on the same resource. Minutes must be whole numbers from 0 to 150. Own events cannot refer to opponent fields and opponent events cannot refer to an own athlete.

### Player RSVP

```http
POST /events/<event-uuid>/rsvp
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{ "status": "going", "note": "Arriving 15 minutes early" }
```

Status is `going`, `not_going` or `maybe`; notes are at most 280 characters. A subsequent submission updates the player's existing response.

## Validation and errors

Request bodies are parsed with feature Zod schemas. Typical Nest responses use HTTP status plus a JSON `message`; clients should branch on status rather than exact prose.

| Status | Meaning in this API |
| --- | --- |
| `400` | Invalid body/query or rule such as wrong XI size/invalid opponent mode. |
| `401` | Missing/invalid session. |
| `403` | Signed-in user lacks the required role/action permission. |
| `404` | Team/resource not found in the caller's allowed scope. This also avoids leaking cross-team existence. |
| `409` | State conflict or uniqueness rule where the service reports one. |
| `503` | Database authentication dependency, geocoder or other service temporarily unavailable. |

Nest defaults apply where controllers do not override them: successful `GET`, `PATCH` and `DELETE` handlers normally return 200; successful `POST` handlers normally return 201; Better Auth verification/OAuth handlers may redirect. Better Auth errors are mapped from the library, while application Zod failures use the first validation issue.

### Representative JSON

These fictional examples reflect source response shapes; IDs and timestamps are illustrative.

```json
{ "status": "ok" }
```

`GET /health/database` returns this response with 200 after its database check succeeds.

```json
{
  "statusCode": 400,
  "message": "A starting XI must contain exactly 11 athletes.",
  "error": "Bad Request"
}
```

Match-start validation uses Nest's 400 exception response. A protected call without a valid cookie returns 401 with `Sign in required.`; a non-coach mutation returns 403. Cross-team resources are generally reported as 404 to avoid exposing their existence.

## Operation permissions

| Operations | Public | Claimed player | Assistant | Coach |
| --- | --- | --- | --- | --- |
| Root/health, sign-up/sign-in/verification/OAuth, invite/claim preview | Yes | Yes | Yes | Yes |
| Session/sign-out/profile | No | Own account | Own account | Own account |
| `/player/*` and RSVP | No | Own claimed context | Only if separately claimed | Only if separately claimed |
| Team roster/events/game plans/statistics reads | No | Player endpoints instead | Team-scoped | Team-scoped |
| Roster/event/game-plan/season/competition/standing mutations | No | No | No | Team-scoped |
| Match start, clock, logging and correction | No | No | Team-scoped | Team-scoped |
| Assistant/player-claim invite management | No | No | No | Team-scoped |

See [Application Structure](application-structure.md#representative-request-flow-logging-a-goal) for the page → client → controller → validation → service → database path.

## External integrations and fallbacks

- **Open-Meteo geocoding:** `GET /locations/search?q=...`, authenticated, requires 3–200 characters, returns up to five mapped places. A provider/network/parse failure returns 503; it does not silently invent coordinates.
- **Open-Meteo weather:** `GET /events/:id/weather` returns explicit statuses: `available`, `missing_location`, `outside_forecast_range`, `unavailable`, or `not_applicable`. Default range is the previous five days through the next 16 days. Cache default is 30 minutes; after a provider failure an expired cached result may be returned with `stale: true` for at most another six hours.
- **Brevo:** sends verification mail when `BREVO_API_KEY` is set. Local development without it logs the verification URL; this is not production delivery.
- **Google OAuth:** configured through Better Auth client credentials and callback routes. Failure handling is delegated through the auth flow.

No Mapbox, OpenWeatherMap, external fixture service, push notification provider or report-export service is implemented.
