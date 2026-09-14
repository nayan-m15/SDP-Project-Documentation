# REST API Guide

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

The deployed OpenAPI currently declares **no security scheme**, so Swagger does not accurately communicate cookie requirements. Authentication, most request/response schemas and common errors are also missing from generated operation metadata. Only two component schemas are published, both for starting a match. Use source Zod schemas as the runtime request authority.

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
