# REST API Guide

## Controller route inventory

This inventory comes from NestJS controller decorators at application commit `ed28806facdbbdff8ab2e2c57666f9dc675f5fe9` (28 September 2026, branch `development`). It describes source routes, not a verified production deployment. Path parameters require the caller to satisfy the controller guard and service authorization checks. Better Auth routes also include its mounted handler beyond the explicit controller methods below.

| Area | Source routes and methods | Access boundary |
| --- | --- | --- |
| Competition setup | `GET /competitions/search`, `/mine`, `/:id`, `/:id/fixtures`; `POST /competitions`, `/:id/fixtures/generate`, `/:id/fixtures/:fixtureId/schedule/accept`, `/:id/fixtures/:fixtureId/schedule/propose`, `/:id/results`, `/:id/teams`; `PATCH /competitions/:id`, `/:id/results/:resultId`; `DELETE /competitions/:id`, `/:id/results/:resultId`, `/:id/teams/:competitionTeamId` | Session and competition membership or administration; search is not anonymous. |
| Competition invitations | `GET /competition-invites`, `/:token`; `POST /competition-invites`, `/:token/accept`; `DELETE /competition-invites/:id` | Invitation token routes have a different access path from competition administration; see controller and service for exact checks. |
| Injuries | `GET /injuries`, `/protocol`, `/recovery/:athleteId`, `/:id`; `POST /injuries`, `/:id/timeline`; `PATCH /injuries/:id`, `/:id/close`; `DELETE /injuries/:id` | Authenticated, team-scoped clinical information. Do not treat the protocol route as anonymous without checking its guard. |
| Live matches | `GET /matches/:matchId`, `/squad`, `/opponent-squad`, `/events`, `/event-reviews`, `/event-operations`, `/clock-operations`, `/insight`; `POST /matches/:matchId/events`, `/event-reviews/:reviewId/resolve`, `/finish`, `/finalise`, `/reopen`; `PATCH /matches/:matchId/events/:eventId`, `/clock`; `DELETE /matches/:matchId/events/:eventId` | Authenticated match/team access and operation-specific permissions. |
| Pre-match lineups | `GET /events/:eventId/lineup`, `/:eventId/opponent-lineup`, `/:eventId/friendly-opponent-lineup`; `PUT /events/:eventId/lineup` | Session and team membership; every team member may confirm a lineup, as with starting a match. |
| Friendly fixtures | `GET /friendly-fixtures/incoming`; `POST /friendly-fixtures/:id/accept`, `/:id/decline` | Coach-only on all three routes (`requireCoachTeam` in the service). Requests are created implicitly by `POST /events`, so only the opponent side is exposed here. |
| AI assistant | `POST /ai-assistant/message`, `/confirm`, `/cancel` | Session; tenancy and role are resolved server-side and never read from the request body. Holds server-side conversation state and can execute a create action once explicitly confirmed. |
| Offline sync | `GET /sync/token`, `/jwks`; `POST /sync/upload`, `/telemetry` | Token, upload and telemetry require authorized context; JWKS exposes public verification keys. See [offline collaboration](offline-collaboration.md). |
| Public read API | `GET /v1/formations`, `/v1/tactics`, `/v1/public-dashboard/filters`, `/matches`, `/players`, `/team-statistics` | Anonymous read endpoints; verify deployment separately. |
| Health | `GET /health/database`, `GET /health/operations` | Operational status; neither proves a full user flow works. |

The remaining first-party routes for auth, teams, athletes, claims, team invitations, events, players, seasons, game plans, statistics, dashboard, profile and location search are listed below. Route shape alone does not specify DTO validation, response shape, errors, or authorization; use controller, guard, contract and service source for those details.

| Existing controller | Declared methods at the 28 September source commit |
| --- | --- |
| `auth` | `POST /auth/sign-up`, `/send-verification-email`, `/sign-in`, `/sign-out`, `/sign-in/social`; `GET /auth/verify-email`, `/session`, `/callback/google` |
| `teams`, `team-invites`, `claims` | `GET /teams/search`; `POST /teams`; `PATCH /teams`; `POST /team-invites`, `/:token/accept`; `GET /team-invites`, `/assistants`, `/:token`; `DELETE /team-invites/:id`; `GET /claims/:token`; `POST /claims/:token/accept` |
| `athletes` | `POST /athletes`, `/:athleteId/claim-invite`; `GET /athletes`, `/archived`, `/:id`; `PATCH /athletes/:id`, `/:id/restore`; `DELETE /athletes/:id`, `/:athleteId/claim-invite` |
| `events` | `POST /events`, `/:eventId/start-match`, `/:eventId/rsvp`; `GET /events`, `/:eventId/rsvps`, `/:eventId/lineup`, `/:eventId/opponent-lineup`, `/:eventId/friendly-opponent-lineup`, `/:id`, `/:id/weather`; `PUT /events/:eventId/lineup`; `PATCH /events/:id`; `DELETE /events/:id` |
| `friendly-fixtures` | `GET /friendly-fixtures/incoming`; `POST /friendly-fixtures/:id/accept`, `/:id/decline` |
| `ai-assistant` | `POST /ai-assistant/message`, `/confirm`, `/cancel` |
| `player` | `GET /player/me`, `/team`, `/events`, `/standings` |
| `game-plans` | `GET /game-plans`, `/:id`; `POST /game-plans`; `PATCH /game-plans/:id`; `DELETE /game-plans/:id` |
| `seasons` | `GET /seasons`; `POST /seasons`; `PATCH /seasons/:id`; `DELETE /seasons/:id` |
| `statistics` | `GET /statistics`, `/athletes/:id`, `/compare`, `/competitions`, `/season-insight`; `POST /statistics/season-insight`, `/assistant`, `/competitions`, `/competitions/:id/standings`; `PATCH /statistics/competitions/:id`, `/standings/:id`; `DELETE /statistics/competitions/:id`, `/standings/:id` |
| `dashboard`, `profile`, `locations` | `GET /dashboard`, `/profile`, `/locations/search`; `PATCH /profile` |

`GET /events/:eventId/opponent-lineup` and `GET /events/:eventId/friendly-opponent-lineup` are two decorators on a single handler; both paths are live and behave identically. The longer name is retained as an alias for existing clients.

### Current request contracts and access examples

| Endpoint | Input and response | Access and common failure |
| --- | --- | --- |
| `GET /v1/public-dashboard/filters` | No query; `{success:true,data}` containing public filter choices. | Anonymous read. |
| `GET /v1/public-dashboard/matches` | Optional UUID `teamId`, `competitionId`, `seasonId`; optional `status` (`scheduled`, `cancelled`, `completed`), `limit` 1–100 (default 50), `offset` ≥0 (default 0). Returns `{success,count,limit,offset,data}`. | Anonymous read; invalid query returns validation error. |
| `GET /v1/public-dashboard/players` | Same UUID filters, `limit` 1–500 (default 200), `offset` ≥0 (default 0); same paged envelope. | Anonymous read; public service decides which records/fields are exposed. |
| `GET /v1/public-dashboard/team-statistics` | Optional UUID filters; `{success,count,data}`. | Anonymous read. |
| `GET /v1/formations` | No query; the formation catalogue. Now covers 5-a-side, 7-a-side and 11-a-side shapes plus a `custom-5`/`custom-7`/`custom-11` slot each, and every entry carries `playerCount` (5, 7 or 11). | Anonymous read. |
| `GET /competitions/search?q=...` | Trimmed nonempty search text, max 100 characters; list from service. | **Session required** even though results are discoverable; search/detail do not grant membership. |
| `GET /teams/search?q=...` | Trimmed nonempty search text, max 100 characters; matching Gaffer teams for the friendly-fixture opponent picker. The caller's own team is excluded server-side. | Session required. |
| `POST /competitions` | Includes optional `playersPerSide` (`5`, `7` or `11`), `format`, `configuredTeamCount` 2–128, `maxSubstitutes` 0–99, `redCardSuspensionMatches` 0–99, `accumulatedYellowThreshold` 1–99. | Session and coach role. |
| `POST /competitions/:id/fixtures/generate` | `{ "regenerate": false }` (optional boolean). | Session and service administration checks; invalid UUID/body or unauthorized change fails. |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/accept` | `{ "expectedRevision": 1 }`, optional `competitionTeamId` UUID. | Session and participant permission; revision guards conflicting updates. |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/propose` | `{ "expectedRevision": 1, "scheduledAt": "2026-09-26T15:00:00+02:00", "note": "Optional" }`; note max 500 characters. | Session and participant permission; invalid time/revision or forbidden team fails. |
| `PUT /events/:eventId/lineup` | `startingAthleteIds` must be **exactly 11** unique UUIDs; optional `formationId` (1–100 chars), `pitchAssignments` (position ID to athlete UUID or null), `customPositions` (`id`, `label`, `role` of `GK`/`DEF`/`MID`/`FWD`, `x`/`y` 0–100), `benchAthleteIds` (max 20, unique, no overlap with starters). When `pitchAssignments` is sent a `formationId` is required, and the assignments must place every starter exactly once. Returns the saved lineup. | Session and team membership; any team member may confirm. Note this route still requires exactly 11 while `start-match` accepts 1–11. |
| `GET /events/:eventId/lineup` | The team's confirmed lineup for one of its own events, or `null` when none is confirmed. | Session and team membership. |
| `GET /events/:eventId/opponent-lineup` | The opposing team's confirmed lineup for an accepted Gaffer friendly **or** a competition fixture. When unavailable, returns the neutral shape `{available:false,teamId:null,teamName:null,players:[]}`. Non-Gaffer opponents always get the neutral shape. | Session and team membership; the other team is derived from the signed-in team's own fixture. |
| `GET /friendly-fixtures/incoming` | No body; pending inbound requests with `id`, `requesterTeamId`, `requesterTeamName`, `eventId`, `scheduledAt`, `location`, `notes`, `createdAt`. | **Coach only.** |
| `POST /friendly-fixtures/:id/accept` | No body; UUID path param. Accepting writes the opponent's own event linked to the same fixture. | Coach only; 404 when the request is not for the caller's team, 409 on an already-resolved or conflicting fixture. |
| `POST /friendly-fixtures/:id/decline` | No body; UUID path param. | Coach only; same failure modes. |
| `POST /ai-assistant/message` | `{ "conversationId": "<uuid>", "context": "roster" or "injuries" or "competitions" or "lineup", "message": "<1–1000 chars>" }`, plus optional `selectedPlayerId` and `competitionId` UUIDs. `competitionId` switches the competitions assistant into "add a participating team" mode. | Session; role and team resolved server-side. A proposed create action is not executed until confirmed. |
| `POST /ai-assistant/confirm` | `{ "conversationId": "<uuid>", "context": "roster" }` — executes the pending proposal through the app's normal services, so the underlying feature's own role checks still apply. | Session, plus whatever role the proposed action itself requires. |
| `POST /ai-assistant/cancel` | Same body as confirm; discards the pending proposal. | Session. |
| `POST /statistics/assistant` | `{ "question": "<3–300 chars>", "seasonId": "<optional uuid>" }`. Read-only and stateless; nothing is persisted. | Session and team membership — open to every team member, matching the rest of the controller's read philosophy. |
| `GET /statistics/season-insight?seasonId=<uuid>` | Optional UUID; the stored season insight, or `{teamId,seasonId,status:"unavailable"}` when none exists. | Session and team membership; 403 when the account has no team. |
| `POST /statistics/season-insight` | `{ "seasonId": "<optional uuid>" }`; generates synchronously and returns the resulting row. Coach-triggered because no automatic "season ended" event exists to hook it to. | **Coach only** (`requireCoachTeam`). |
| `GET /matches/:matchId/insight` | The stored match insight, or `{matchId,status:"unavailable"}` when generation has not produced one. | Session and team access to the match. |
| `GET /matches/:matchId/event-operations` | The match's event-operation log (corrections, voids, review resolutions). | Session and team access to the match. |
| `GET /injuries?status=open&athleteId=<uuid>` | `status` is `open`, `closed` or `all`; optional athlete UUID; team-scoped list. | Session and team membership. `GET /injuries/protocol` also requires membership. |
| `POST /injuries` | Body validated by `createInjurySchema`; created injury record. | Coach **or assistant** team member may report. Updates, close, timeline mutation and deletion require coach role. |
| `PATCH /injuries/:id/close` | `{ "actualReturnOn": "2026-09-24", "notes": "Optional" }`; updated record. | Coach only; team scope, UUID and date validation apply. |
| `GET /sync/token` | `{endpoint,token,expiresAt}`; token expires after five minutes and includes user/team/role claims. | Session; returns 503 when PowerSync configuration is absent. |
| `POST /sync/upload` | `{items:[...]}` with 1–50 observation/operation items; `{receipts:[...]}`. | Session. See the note below on batching and failure handling. |
| `POST /sync/telemetry` | Device UUID, pending/rejected counts (0–100000), nullable ISO timestamps and deployment name; `{accepted:true}`. | Session; server derives user/team rather than trusting client identity. |
| `GET /sync/jwks` | Public JSON Web Key Set when signing key is configured. | No session; availability depends on server configuration. |

**`POST /sync/upload` batching and failure handling.** Items are no longer processed strictly one at a time. The controller groups them into batches of up to four and runs each batch with `Promise.allSettled`, flushing early when an item repeats a `matchId` or receipt ID already in the batch, and processing any item carrying `causalParentIds` on its own to preserve ordering. Each item still gets its own `accepted`, `dependency_pending` or `rejected` receipt with a safe error code, and a repeated ID with a changed payload or user still yields `ID_REUSED`. However, a failure that is not an `HttpException`, or an `HttpException` with status 500 or above, is now **rethrown** rather than recorded as a rejected receipt: the whole request fails and the item stays retriable, which is safe because observation IDs are immutable. Client-error rejections (status below 500) still produce a per-item rejected receipt as before.

Sources: [public query schemas](https://github.com/nayan-m15/Gaffer/blob/ed28806facdbbdff8ab2e2c57666f9dc675f5fe9/backend/src/public-api/public-api.schemas.ts), [competition controller](https://github.com/nayan-m15/Gaffer/blob/ed28806facdbbdff8ab2e2c57666f9dc675f5fe9/backend/src/competitions/competitions.controller.ts), [injury controller](https://github.com/nayan-m15/Gaffer/blob/ed28806facdbbdff8ab2e2c57666f9dc675f5fe9/backend/src/injuries/injuries.controller.ts), and [sync schemas/controller](https://github.com/nayan-m15/Gaffer/tree/ed28806facdbbdff8ab2e2c57666f9dc675f5fe9/backend/src/sync). These examples describe source behaviour and do not certify current deployment.

> **API boundary:** this is the broad first-party application API used by the Gaffer frontend. Most routes are cookie-authenticated and team-scoped. The separate [Gaffer Public API Reference](Gaffer-Public-API-Reference.md) covers the anonymous formations, tactics and public-dashboard GET routes listed above. The 14 September 2026 deployment check returned 404 for formations/tactics; it does not establish availability of any route on a newer deployment. Open-Meteo is a third-party integration consumed by Gaffer, not a Gaffer endpoint.

## URLs and availability

| Purpose | Deployed | Local |
| --- | --- | --- |
| API base | [https://gaffer-api-ynaf.onrender.com](https://gaffer-api-ynaf.onrender.com) | `http://localhost:3000` |
| Swagger UI | [deployed Swagger](https://gaffer-api-ynaf.onrender.com/api/docs) | `http://localhost:3000/api/docs` |
| OpenAPI JSON | [deployed JSON](https://gaffer-api-ynaf.onrender.com/api/docs-json) | `http://localhost:3000/api/docs-json` |
| Database health | [deployed health](https://gaffer-api-ynaf.onrender.com/health/database) | `http://localhost:3000/health/database` |

The application root, Swagger, OpenAPI JSON and database-health links were previously observed reachable. That does not establish that every source route is deployed. On 14 September 2026, all four formations/tactics public-route URLs returned 404 and the deployed OpenAPI JSON did not list them or the `Public API` tag. **That observation is now two weeks old and has not been rechecked; treat it as historical.** None of the routes added since — AI assistant, friendly fixtures, lineups, season insight, team search, match insight and event operations — have been checked against any deployment.

## Local setup

Install root/frontend/backend dependencies, configure the variables in `.env.example`, migrate a development database, then run `npm run dev`. The backend listens on port 3000 and the frontend on 5173. See [Getting Started](../Overview/01-getting-started.md) and [Database Schema](data/database-schema.md).

## Authentication, roles and team scope

Authentication is a Better Auth HTTP-only session cookie. Browser requests send `credentials: "include"`; command-line clients must retain the cookie from sign-in and send it on later calls. Do not put the session token in query strings or documentation.

Most feature controllers use `AuthGuard`. The server derives the user's team through membership/claim data:

- coach and assistant reads use the resolved team;
- roster/event/game-plan/season/competition mutations are coach-only;
- friendly-fixture listing, accepting and declining are coach-only;
- season-insight generation is coach-only, while the season-insight read and the stats assistant are open to every team member;
- team members can operate the live match logger and confirm a pre-match lineup;
- AI assistant routes require a session and resolve tenancy and role server-side; a confirmed action runs through the normal feature services, so that feature's own role check still applies;
- player routes operate on the signed-in user's claimed athlete context;
- service queries include the resolved team ID to prevent cross-team access.

The **14 September deployed OpenAPI snapshot** declared no security scheme, so it did not communicate cookie requirements. That snapshot also lacked most request/response schemas and common errors; only two component schemas were published, both for starting a match. The currently deployed OpenAPI was unavailable for comparison in this audit. Use source Zod schemas as the request authority until a new deployed document is checked.

## Endpoint groups

| Group | Representative routes |
| --- | --- |
| Health/application | `GET /`, `GET /health/database`, `GET /health/operations` |
| Auth | `POST /auth/sign-up`, `POST /auth/sign-in`, `POST /auth/sign-out`, `GET /auth/session`, verification and Google OAuth routes |
| Team/roster | `GET /teams/search`; `POST/PATCH /teams`; athlete CRUD/archive/restore; claim invitations; assistant team invitations |
| Player | `GET /player/me`, `/player/team`, `/player/events`, `/player/standings` |
| Events | `GET/POST /events`, `GET/PATCH/DELETE /events/:id`, RSVP, RSVP breakdown, weather, start match |
| Lineups | `GET/PUT /events/:eventId/lineup`, `GET /events/:eventId/opponent-lineup` and its `friendly-opponent-lineup` alias |
| Friendly fixtures | `GET /friendly-fixtures/incoming`, `POST /friendly-fixtures/:id/accept`, `/:id/decline` |
| Tactics | CRUD under `/game-plans` |
| Matches | match/squad/opponent/event reads; event-operation and clock-operation logs; insight; event create/update/delete; clock update; finish, finalise, reopen |
| Statistics | summary, athlete detail, compare, season-insight read and generate, natural-language assistant, competition CRUD and standings CRUD |
| AI assistant | `POST /ai-assistant/message`, `/confirm`, `/cancel` |
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

The Zod contract trims text and requires title, type and an offset date-time. **`location` is now optional and defaults to an empty string** — it is no longer a required field, though it is still capped at 200 characters. Title is limited to 150 and notes to 2,000 characters, and latitude/longitude must be supplied together if weather coordinates are given. A successful response is the persisted event representation, including server IDs/timestamps and its team scope.

Two optional UUID fields shape what the event becomes: `competitionId` links it to a competition, and `friendlyOpponentTeamId` schedules it against another Gaffer team, which implicitly creates a pending friendly-fixture request for that opponent's coach to accept or decline.

### Confirm a pre-match lineup

```http
PUT /events/<event-uuid>/lineup
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{
  "formationId": "4-3-3",
  "startingAthleteIds": ["<exactly 11 distinct athlete UUIDs>"],
  "pitchAssignments": { "GK": "<uuid>", "LB": "<uuid>" },
  "benchAthleteIds": ["<optional distinct athlete UUIDs>"]
}
```

Exactly 11 unique starters are required. When `pitchAssignments` is supplied, `formationId` is required and the assignments must place every confirmed starter exactly once. The bench holds at most 20 unique athletes and cannot overlap the starters. `customPositions` accepts `id`, `label`, a `role` of `GK`/`DEF`/`MID`/`FWD`, and `x`/`y` coordinates from 0 to 100. Every team member may confirm a lineup; it is shared with the opposing team only through an accepted Gaffer friendly or a competition fixture.

### Start a match

```http
POST /events/<event-uuid>/start-match
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{
  "opponentName": "Riverside FC",
  "isHome": true,
  "startingAthleteIds": ["<1 to 11 distinct team athlete UUIDs>"],
  "benchAthleteIds": ["<optional distinct athlete UUIDs>"],
  "formationId": "7v7-2-3-1",
  "opponentSquadVisibility": "numbers",
  "opponentSquad": [{ "shirtNumber": 9 }]
}
```

The starting lineup now accepts **between 1 and 11** unique eligible team athletes rather than exactly 11, supporting 5-a-side and 7-a-side formats alongside the full game. Bench players cannot overlap starters and the bench is capped at 20. Optional `formationId`, `pitchAssignments` and `customPositions` mirror the lineup contract above. `opponentCompetitionTeamId` is required for shared league/cup matches, where it identifies the selected competition participant.

Opponent mode `none` accepts no squad and now rejects one explicitly if sent; `numbers` requires at least one shirt number and rejects names; `full` requires a name for each supplied player. Shirt numbers must be unique across the squad in every mode, and each is 1–99.

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

Use a new stable request UUID per logical create so a retry cannot create the same match event twice. Corrections use `PATCH /matches/:matchId/events/:eventId`; deletion uses `DELETE` on the same resource. Minutes must be whole numbers from 0 to 150. Own events cannot refer to opponent fields and opponent events cannot refer to an own athlete. `GET /matches/:matchId/event-operations` returns the resulting operation log.

### Player RSVP

```http
POST /events/<event-uuid>/rsvp
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{ "status": "going", "note": "Arriving 15 minutes early" }
```

Status is `going`, `not_going` or `maybe`; notes are at most 280 characters. A subsequent submission updates the player's existing response.

### Ask the AI assistant

```http
POST /ai-assistant/message
Content-Type: application/json
Cookie: better-auth.session_token=<redacted>

{
  "conversationId": "<client-generated UUID, stable per conversation>",
  "context": "roster",
  "message": "Add a left-footed centre back born in 2009"
}
```

`context` is one of `roster`, `injuries`, `competitions` or `lineup`, and the message is 1–1,000 characters. Conversation state lives server-side. When the assistant proposes a create action it is not executed until the client calls `POST /ai-assistant/confirm` with the same `conversationId` and `context`; `POST /ai-assistant/cancel` discards it. Confirmation runs through the normal feature service, so a proposal whose action is coach-only still fails for a non-coach.

## Validation and errors

Request bodies are parsed with feature Zod schemas. Typical Nest responses use HTTP status plus a JSON `message`; clients should branch on status rather than exact prose.

| Status | Meaning in this API |
| --- | --- |
| `400` | Invalid body/query or rule such as a starting lineup outside 1–11 or an invalid opponent mode. |
| `401` | Missing/invalid session. |
| `403` | Signed-in user lacks the required role/action permission. |
| `404` | Team/resource not found in the caller's allowed scope. This also avoids leaking cross-team existence. |
| `409` | State conflict or uniqueness rule where the service reports one, including an already-resolved friendly-fixture request. |
| `503` | Database authentication dependency, geocoder or other service temporarily unavailable. |

Nest defaults apply where controllers do not override them: successful `GET`, `PATCH`, `PUT` and `DELETE` handlers normally return 200; successful `POST` handlers normally return 201; Better Auth verification/OAuth handlers may redirect. Better Auth errors are mapped from the library, while application Zod failures use the first validation issue.

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

This exact message now comes from `PUT /events/:eventId/lineup`, which still requires exactly 11. `POST /events/:eventId/start-match` instead reports `A starting lineup cannot contain more than 11 athletes.` or `A starting lineup must contain at least one athlete.` A protected call without a valid cookie returns 401 with `Sign in required.`; a non-coach mutation returns 403. Cross-team resources are generally reported as 404 to avoid exposing their existence.

```json
{ "available": false, "teamId": null, "teamName": null, "players": [] }
```

`GET /events/:eventId/opponent-lineup` returns this neutral shape rather than an error when the opponent is not a Gaffer team, the fixture is not accepted, or no opposing lineup has been confirmed.

## Operation permissions

| Operations | Public | Claimed player | Assistant | Coach |
| --- | --- | --- | --- | --- |
| Root/health, sign-up/sign-in/verification/OAuth, invite/claim preview | Yes | Yes | Yes | Yes |
| Public read API (`/v1/formations`, `/v1/tactics`, `/v1/public-dashboard/*`) | Yes | Yes | Yes | Yes |
| Session/sign-out/profile | No | Own account | Own account | Own account |
| `/player/*` and RSVP | No | Own claimed context | Only if separately claimed | Only if separately claimed |
| Team roster/events/game plans/statistics reads | No | Player endpoints instead | Team-scoped | Team-scoped |
| Team search, season-insight read, stats assistant, match insight | No | No | Team-scoped | Team-scoped |
| Roster/event/game-plan/season/competition/standing mutations | No | No | No | Team-scoped |
| Match start, clock, logging and correction | No | No | Team-scoped | Team-scoped |
| Pre-match lineup read and confirm | No | No | Team-scoped | Team-scoped |
| Friendly-fixture incoming list, accept and decline | No | No | No | Team-scoped |
| Season-insight generation | No | No | No | Team-scoped |
| AI assistant conversation | No | No | Session-scoped; a confirmed action still needs that action's own role | Session-scoped |
| Assistant/player-claim invite management | No | No | No | Team-scoped |

See [Application Structure](application-structure.md#representative-request-flow-logging-a-goal) for the page to client to controller to validation to service to database path.

## External integrations and fallbacks

- **Open-Meteo geocoding:** `GET /locations/search?q=...`, authenticated, requires 3–200 characters, returns up to five mapped places. A non-string or out-of-range `q` returns 400. A provider/network/parse failure returns 503; it does not silently invent coordinates.
- **Open-Meteo weather:** `GET /events/:id/weather` returns explicit statuses: `available`, `missing_location`, `outside_forecast_range`, `unavailable`, or `not_applicable`. Default range is the previous five days through the next 16 days. Cache default is 30 minutes; after a provider failure an expired cached result may be returned with `stale: true` for at most another six hours.
- **Google Gemini:** backs the generated-insight and natural-language features — `POST /statistics/assistant`, `GET`/`POST /statistics/season-insight`, `GET /matches/:matchId/insight`, and the whole `/ai-assistant` module. The client is created lazily and gated on `GEMINI_API_KEY`; when that variable is unset, insight generation is disabled and the read routes return their `status: "unavailable"` shape rather than failing. `GEMINI_MODEL` overrides the default model, and the client falls through a chain of models when one is unavailable.
- **Brevo:** sends verification mail when `BREVO_API_KEY` is set. Local development without it logs the verification URL; this is not production delivery.
- **Google OAuth:** configured through Better Auth client credentials and callback routes. Failure handling is delegated through the auth flow.
- **PowerSync:** offline sync depends on `POWERSYNC_URL`, `POWERSYNC_PRIVATE_KEY`, `POWERSYNC_KID` and `POWERSYNC_SHARED_SECRET`. `GET /sync/token` returns 503 when this configuration is absent, and `GET /sync/jwks` serves keys only when a signing key is configured.

Friendly fixtures are an internal team-to-team flow, not an external fixture service. No Mapbox, OpenWeatherMap, external fixture service, push notification provider or report-export service is implemented.
