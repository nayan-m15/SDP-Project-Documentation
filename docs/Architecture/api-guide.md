# API Guide

This guide covers both Gaffer APIs: the anonymous [public read API](#public-read-api), and the protected application API with its canonical request contracts. Public Swagger UI/JSON/YAML describe only the public read API and exclude the protected route inventory below. The intended six-route public policy has a current source discrepancy described in [Swagger policy and current source discrepancy](#swagger-policy-and-current-source-discrepancy).

## Public read API

The public API is an anonymous, read-only coaching catalog and sporting dashboard. It does not expose saved game plans, accounts, contacts, RSVP notes or authentication data. This section describes source behavior. The hosted API and its Swagger were also checked on 10 October 2026; where the deployment differs from source or from Swagger, that is noted below.

### Base URLs and Swagger scope

Local backend: `http://localhost:3000`. Configured hosted backend: [Gaffer API](https://gaffer-api-ynaf.onrender.com). The frontend rewrite adds `/api` before backend paths (for example `/api/v1/formations`). Hosted documentation links: [Swagger UI](https://gaffer-api-ynaf.onrender.com/api/docs), [OpenAPI JSON](https://gaffer-api-ynaf.onrender.com/api/docs-json) and [OpenAPI YAML](https://gaffer-api-ynaf.onrender.com/api/docs-yaml). On 10 October 2026 all three documentation links were reachable, and every endpoint below returned 200 from the hosted backend.

Swagger UI at `/api/docs`, JSON at `/api/docs-json` and YAML at `/api/docs-yaml` are intended to describe **six anonymous GET endpoints** in every environment, including production. They need no session, API key or token. “Try it out” uses the backend serving the docs. The protected application routes documented later in this guide are not included in this public schema.

| GET path | Query | Response |
| --- | --- | --- |
| [`/v1/formations`](https://gaffer-api-ynaf.onrender.com/v1/formations) | Optional `id` | `{success,count,data: PublicFormation[]}` |
| [`/v1/tactics`](https://gaffer-api-ynaf.onrender.com/v1/tactics) | Optional `id` | `{success,count,data: PublicTactic[]}` |
| [`/v1/public-dashboard/filters`](https://gaffer-api-ynaf.onrender.com/v1/public-dashboard/filters) | None | `{success,data:{teams,seasons,competitions}}` |
| [`/v1/public-dashboard/matches`](https://gaffer-api-ynaf.onrender.com/v1/public-dashboard/matches) | `teamId,competitionId,seasonId,status,limit,offset` | `{success,count,limit,offset,data,summary:{total,cleanSheets}}` |
| [`/v1/public-dashboard/players`](https://gaffer-api-ynaf.onrender.com/v1/public-dashboard/players) | `teamId,competitionId,seasonId,search,position,limit,offset` | `{success,count,limit,offset,data}` |
| [`/v1/public-dashboard/team-statistics`](https://gaffer-api-ynaf.onrender.com/v1/public-dashboard/team-statistics) | `teamId,competitionId,seasonId` | `{success,count,data}` |

`count` is the number of returned rows, not the complete filtered total. Dashboard IDs are optional UUIDs. Unavailable filter IDs return empty results rather than disclosing private existence.

### Swagger policy and current source discrepancy

The reference policy intends exactly the six GET endpoints listed above. **Current source also declares `GET /v1/public-dashboard/competition-fixtures`.** `PublicApiModule` includes that controller and `configureSwagger` includes the module without filtering this route or an exclusion decorator. Consequently, source does not support an exact-six claim for the generated Swagger paths; it would include this additional endpoint. The hosted schema confirms this: on 10 October 2026 the deployed Swagger, titled **Gaffer Public API** (version 0.1.0), listed seven operations, the six above plus `competition-fixtures` under the *Public Dashboard* tag. It documents no query parameters or response schema for that path, only 200 and 429.

The additional anonymous GET accepts optional UUID `teamId`, `competitionId` and `seasonId`, returning `{success,count,data}` for generated league/cup fixtures. Records include fixture/competition identity, stage, round, position, schedule/status, home/away participant-slot IDs and names, scores/penalty scores and winner slot. Slot IDs are competition participant IDs, not private athlete IDs. It uses the controller's dashboard rate guard and public wildcard CORS, but directly invokes the service without the 30-second response-cache wrapper or paginated schema. Do not assume the cached/paged contract below applies to this additional path. This is a documented source/policy mismatch, not a newly invented endpoint or a change made by this documentation update.

The hosted endpoint ([open competition fixtures](https://gaffer-api-ynaf.onrender.com/v1/public-dashboard/competition-fixtures)) returned these record fields on 10 October 2026: `id,competitionId,competitionName,competitionType,stage,round,position,scheduledAt,status,homeTeamId,awayTeamId,homeTeamName,awayTeamName,homeScore,awayScore,homePenaltyScore,awayPenaltyScore,winnerTeamId,winnerTeamName`. `competitionType` was `league` or `cup`, `stage` was `league` or `knockout`, and `position` orders fixtures within a round. Scores and the winner are null until a result exists. A knockout slot whose opponent is not decided yet has a null `awayTeamId` and an `awayTeamName` of `"TBD"`. A slot ID is the UUID after `participant:` in a standings `id`, not a Gaffer team ID from `/filters`. `teamId` returns every fixture of each competition whose `teamIds` include that team. Invalid UUIDs return 400, but `limit` and `status` are ignored rather than rejected, and every matching fixture is returned.

### Pagination and filtering

| Parameter | Matches | Players |
| --- | --- | --- |
| `limit` | Integer 1–100; default 50 | Integer 1–200; default 100 |
| `offset` | Integer ≥0; default 0 | Integer ≥0; default 0 |
| `status` | `scheduled`, `cancelled`, `completed` | Not supported |
| `search` | Not supported | Trimmed literal case-insensitive full-name substring, maximum 100 characters |
| `position` | Not supported | `ALL`, `FWD`, `MID`, `DEF`, `GK` |

Limits above the ceiling return 400 rather than being clamped. Search uses literal substring matching, so `%`/`_` are not SQL wildcard operators. Team/competition/season, name and position filters apply **before** pagination. Position categories use the source's football position-code groups.

The match `summary` covers the complete filtered set independent of pagination. `total` counts matching matches; `cleanSheets` counts completed matches with no logged opponent goal. Summary caching is shared across pages for the same filters. Player statistics use completed matches only, with grouped SQL aggregation restricted to the selected player IDs; athletes without history retain zeros.

### Response records

| Record | Fields |
| --- | --- |
| Formation | `id,name,shape,playerCount,description` |
| Tactic | `id,name,category,description,formationId` (`formationId` is always null; `category` is defensive/offensive) |
| Match | `id,eventId,title,status,scheduledAt,location,opponentName,isHome,teamScore,opponentScore,team:{id,name},competition:{id,name,type}\|null,season:{id,name}\|null` |
| Player | `id,firstName,lastName,position,squadNumber,team:{id,name},statistics:{appearances,starts,minutesPlayed,goals,assists,saves,yellowCards,redCards}` |
| Team statistic / standing | `id,competitionId,teamName,position,played,won,drawn,lost,goalsFor,goalsAgainst,goalDifference,points,isOwnTeam,ownerTeam,competition,season` (`id` is returned as `participant:<uuid>`; `ownerTeam` is the team that runs the competition) |
| Filters | Teams `{id,name}`; seasons include team/date/current scope; competitions include `id,name,type,teamId,seasonId,teamIds` |

### Formation and tactic catalog

| Player count (includes goalkeeper) | Preset IDs |
| --- | --- |
| 5 | `5v5-1-2-1`, `5v5-2-1-1`, `5v5-1-1-2` |
| 7 | `7v7-2-3-1`, `7v7-3-2-1`, `7v7-2-2-2` |
| 11 | `4-3-3`, `4-4-2`, `4-2-3-1`, `4-1-4-1`, `3-5-2`, `3-4-3`, `5-3-2`, `5-4-1` |

The public static catalog returns these presets with `playerCount`. The application's private formation contract also supports `custom-5`, `custom-7` and `custom-11` slots; those coach-defined coordinate layouts belong to game plans and are not returned by the public catalog. Do not infer a fixed lineup of eleven from a formation response. Tactics are the generic defensive/offensive styles, independent of formation and private team settings.

The service also returns player `starts` and `saves`; the current handwritten OpenAPI player metadata omits those additive fields. The deployed Swagger checked on 10 October 2026 omits them too. It also omits the standings `competitionId`, and declares the standings `id` as a UUID although the hosted API returns `participant:<uuid>`. Consumers should distinguish the actual service response from that metadata.

### Caching, throttling and CORS

The original four database-backed dashboard responses use a per-instance 30-second cache keyed by validated query parameters, with concurrent requests sharing the same in-flight query. Default capacity is 500 entries with oldest-first eviction. Restarting an instance clears it. `PUBLIC_DASHBOARD_CACHE_TTL_SECONDS` and `PUBLIC_DASHBOARD_CACHE_MAX_ENTRIES` configure it. Polling faster than its TTL may return unchanged data.

The dashboard rate limiter defaults to 120 requests per minute per client plus an edge-IP backstop with a default twenty-times budget. `PUBLIC_DASHBOARD_RATE_LIMIT` and `PUBLIC_DASHBOARD_BACKSTOP_RATE_LIMIT` configure budgets. Either exhausted budget returns 429 before database work with `{"message":"Too many requests. Please try again later."}`. Static formations/tactics are not subject to this dashboard cache/limiter. Hosted responses on 10 October 2026 carried no rate-limit headers, so clients cannot read their remaining budget.

The public route prefixes, including the additional fixture endpoint, use wildcard CORS (`Access-Control-Allow-Origin: *`) without credentials; the hosted API returned this header on 10 October 2026. Protected endpoints keep credentialed CORS with the configured origin allowlist.

### Errors and consumer refresh

Empty catalog `?id=` returns 400; an unknown catalog ID returns 404. Invalid UUIDs, enum values, lengths or paging bounds return 400. Standard Nest errors use `{statusCode,message,error}`; unhandled failures use its safe 500 response rather than raw database errors. For example, the hosted API answered `players?limit=201` with `{"message":"Too big: expected number to be <=200","error":"Bad Request","statusCode":400}` and `formations?id=nope` with 404 `No formation found with id "nope".` A 429 should prompt a delayed/manual retry, not a tight retry loop.

The public UI starts with 40 players and 100 matches, debounces search by 300 ms, and loads additional pages on “Load more.” Failed additional pages retain earlier data and offer retry. Player/match lists disable shared five-second polling, use a 30-second stale period and refresh on focus; standings refresh every 30 seconds. See [automatic refresh](automatic-data-refresh.md) and [performance mechanisms](../Quality/performance-review.md).

Sources: [backend/src/public-api/public-api.schemas.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-api.schemas.ts), [backend/src/public-api/public-api.openapi.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-api.openapi.ts), [backend/src/public-api/formations.data.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/formations.data.ts), [backend/src/public-api/public-dashboard.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard.service.ts), [backend/src/public-api/public-dashboard-cache.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard-cache.service.ts), [backend/src/public-api/public-dashboard-rate-limit.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard-rate-limit.service.ts), [backend/src/swagger-config.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/swagger-config.ts), [backend/src/cors-config.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/cors-config.ts).

## Authentication, scope and errors

The rest of this guide covers the protected application API. Backend paths below are relative to the backend origin. The deployed frontend uses same-origin `/api/*` rewrites for normal application calls and `/auth/*` for authentication. `apiFetch` sends the Better Auth cookie with `credentials: "include"`. Resolve user/team/role on the server; a client-selected resource ID is not an access grant. See [contracts and authorization](contracts-and-authorization.md).

Zod validates body/query contracts; UUID parameters are checked by pipes. Invalid inputs use 400, missing sessions 401, and scoped/forbidden resources 404/403 as implemented. State conflicts use the service's 400/409 response. Most responses are service DTOs rather than a universal `{success,data}` envelope. Deletes explicitly returning `{success:true}` and sync receipt envelopes are indicated by source. Controller links below resolve at the inspected application revision and provide exact parameter/schema/return delegation.

## Competition and event contracts

| Operation | Request / permission | Response or failure |
| --- | --- | --- |
| `PATCH /competitions/:id/hidden` | `{hidden:boolean}`; participant's resolved team, scoped to caller's user | `{hidden}`; bad boolean 400, absent competition 404, nonparticipant 403 |
| `PATCH /competitions/:id/archive` | `{archived:boolean}`; competition administrator | `{archived}`; bad boolean 400, nonadmin/absent 404, live fixture 409 |
| `POST /competitions/:id/fixtures/generate` | `{regenerate?:boolean,timezone?:string}`; admin; regenerate defaults false; timezone must be an accepted IANA zone | Service returns fixtures; unsafe regeneration/settings or participant changes reject rather than overwrite recorded play |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/accept` | `{expectedRevision:positiveInteger,competitionTeamId?:UUID}`; linked own coach, or admin for external slot | Revision-aware fixture schedule response |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/propose` | Above revision/slot plus `scheduledAt` offset ISO datetime, optional note ≤500 | New schedule proposal resets applicable acceptance states |
| `POST /events` | Coach; title 1–150, event type, offset ISO `scheduledAt`; optional competition/friendly opponent, venue and notes fields | Creation requires a future scheduled instant for every event type; invalid/past time returns 400 |

Fixture generation uses the requested timezone or saved `competitions.schedule_timezone` (legacy default UTC). It interprets local start date, weekday and kickoff in that zone and persists UTC instants plus the timezone atomically. Calendar views use local calendar dates for display/filtering. Generation supports competition formats and safe regeneration; it does not implement every proposed automatic season-scheduling feature.

`friendlyPlayersPerSide` permits **5, 7 or 11**. Lineup/start services resolve the required starter count from competition format, friendly format, formation and default in the implemented order. Confirmed starters must be distinct, belong to the team and satisfy availability rules; bench cannot overlap. Formation `playerCount`/custom slot geometry must agree with the match format. The start schema's upper bound of eleven is not a fixed-eleven requirement.

## Shared logging, review and play state

`POST /matches/:matchId/events` uses `createMatchLogEventSchema`: required `clientRequestId` UUID, `team` own/opponent, `eventType`, integer `minute` 0–150; optional device/timestamp, period, elapsed time (0–10,800,000 ms), athlete or opponent identity, detail ≤500 and tactical-change delta. Own events cannot use opponent identity; opponent events cannot use private own-team athlete IDs. A substitution needs an incoming squad player where the roster-backed path applies. Scored penalties use a goal with `detail:"Penalty"`; misses use penalty with `detail:"Penalty missed"`. Tactical settings are own-team only, with public geometry sanitized before peer reads.

`POST /sync/upload` accepts `{items:[...]}` with 1–50 observations/operations. Observations contain `{kind:"observation",matchId,payload}`. Operations contain `{kind:"operation",id,matchId,operationType,causalParentIds}` and action-specific fields: correct (`canonicalEventId,replacement`), void (`canonicalEventId,reason?`) or resolve_review (`reviewId,resolution,explanation?`). Causal parents default to `[]`, maximum 50. Response is `{receipts:[...]}` with per-item accepted, dependency_pending or rejected outcomes. Lost responses retry the original ID/payload; ID reuse with changed content/user is rejected. Missing dependencies and missing receipts remain pending. See [offline collaboration](offline-collaboration.md).

| Route | Contract / result |
| --- | --- |
| `GET /matches/sessions/:sessionId/report`, `GET /matches/:matchId/session-report` | Authorized shared report including sporting timeline, score, clock, reviews/confirmation and revision state; private data sanitized |
| `POST /matches/:matchId/event-reviews/:reviewId/resolve` | Coach; `{resolution:"same_event"\|"separate_events",explanation?:string,operationId?:UUID,causalParentIds?:UUID[]}`; returns review state; cross-team matching decisions required |
| `POST /matches/:matchId/event-reviews/:reviewId/dispute` | Coach; records dispute through service; no body contract |
| `PATCH /matches/:matchId/events/:eventId` | Coach; nonempty partial update of identity, minute, event type/detail; returns changed event; report locks enforced |
| `DELETE /matches/:matchId/events/:eventId` | Coach; void/removal history and review cleanup; shared public event may originate on either sheet |
| `PATCH /matches/:matchId/clock` | Member; `{period,running,elapsedMs,operationId?,baseRevision?,clientCreatedAt?}`; base revision defaults 0 in request schema; returns refreshed match DTO |
| `POST /matches/:matchId/finish` | Member; no body; uses current authoritative revision, ends shared play, returns match DTO; UI confirms before calling |
| `POST /matches/:matchId/resume` | Coach; `{expectedClockRevision:integer≥0}`; restores latest playing half/elapsed time and clears pending confirmations; returns match DTO |
| `POST /matches/:matchId/finalise` | Coach; `{expectedRevision:integer≥1,expectedSessionRevision?:integer≥1}`; shared reports require the session revision; completed play, matching revisions and no unresolved public review required. Shared response `{confirmed:true,finalised:boolean}`; legacy response is the finalised projection. |
| `POST /matches/:matchId/reopen` | Coach; `{reason:string}` trimmed 3–500; shared pre-final report withdraws confirmation and returns `{withdrawn:true}`; published shared report rejects reopening |
| `POST /matches/:matchId/amendments` | Coach; stable `id`, `expectedSessionRevision≥1`, reason 3–500; action add + create replacement, correct + canonical ID/update replacement, or void + canonical ID; returns `{id,status:"pending"}` |
| `POST /matches/:matchId/amendments/:amendmentId/respond` | Coach; `{response:"approve"\|"reject"\|"request_changes"\|"withdraw",reason?}`; reason required for reject/request_changes; returns `{id,status}` |

Finalisation is bilateral for two connected teams. The unconnected competition opponent exception allows initial publication by the participating coach, subject to current revision, completion and review checks; it is not a timeout. Amendment acceptance **still requires valid home and away coach approvals**; the current code does not extend the single-coach exception to amendments. A pending/rejected/stale amendment preserves the published result. Queued obsolete review decisions cannot reopen reviews closed by deletion. Confirmed report locks and stale full-time checks protect a later resume.

## Controller route inventory

This inventory is extracted from current controller declarations. A named schema is the canonical input contract; “controller/service” means parameters or explicit validation should be read at the linked declaration. Better Auth's native catch-all paths are handled separately from controller-defined application routes. Guard presence is only the session layer; service role/state checks remain authoritative. The anonymous public-api controllers are covered in [Public read API](#public-read-api).

### ai-assistant

Source: [backend/src/ai-assistant/ai-assistant.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/ai-assistant/ai-assistant.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/ai-assistant/message` | `assistantMessageSchema`; session required |
| POST | `/ai-assistant/confirm` | `assistantConversationRefSchema`; session required |
| POST | `/ai-assistant/cancel` | `assistantConversationRefSchema`; session required |

### Application root

Source: [backend/src/app.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/app.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/` | Controller/service; see controller guard/token handling |

### athletes

Source: [backend/src/athletes/athletes.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/athletes/athletes.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/athletes` | `createAthleteSchema`; session required |
| GET | `/athletes` | Controller/service; session required |
| GET | `/athletes/archived` | Controller/service; session required |
| GET | `/athletes/:id` | Controller/service; session required |
| PATCH | `/athletes/:id` | `updateAthleteSchema`; session required |
| DELETE | `/athletes/:id` | Controller/service; session required |
| PATCH | `/athletes/:id/restore` | Controller/service; session required |
| POST | `/athletes/:athleteId/claim-invite` | `createClaimInviteSchema`; session required |
| DELETE | `/athletes/:athleteId/claim-invite` | Controller/service; session required |

### auth

Source: [backend/src/auth/auth.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/auth/auth.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/auth/sign-up` | `signUpSchema`; see controller guard/token handling |
| POST | `/auth/send-verification-email` | `resendVerificationEmailSchema`; see controller guard/token handling |
| GET | `/auth/verify-email` | Controller/service; see controller guard/token handling |
| POST | `/auth/forgot-password` | `requestPasswordResetSchema`; see controller guard/token handling |
| GET | `/auth/reset-password/:token` | Controller/service; see controller guard/token handling |
| POST | `/auth/reset-password` | `resetPasswordSchema`; see controller guard/token handling |
| POST | `/auth/sign-in` | `signInSchema`; see controller guard/token handling |
| POST | `/auth/change-email` | `changeEmailSchema`; session required |
| GET | `/auth/password-status` | Controller/service; session required |
| POST | `/auth/set-password` | `setPasswordSchema`; session required |
| POST | `/auth/change-password` | `changePasswordSchema`; session required |
| POST | `/auth/sign-out` | Controller/service; session required |
| GET | `/auth/session` | Controller/service; session required |
| POST | `/auth/sign-in/social` | Controller/service; see controller guard/token handling |
| GET | `/auth/callback/google` | Controller/service; see controller guard/token handling |

### claims

Source: [backend/src/claims/claims.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/claims/claims.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/claims/:token` | Controller/service; see controller guard/token handling |
| POST | `/claims/:token/accept` | Controller/service; session required |

### competition-invites

Source: [backend/src/competition-invites/competition-invites.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/competition-invites/competition-invites.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/competition-invites` | `createCompetitionInviteSchema`; session required |
| GET | `/competition-invites` | Controller/service; session required |
| DELETE | `/competition-invites/:id` | Controller/service; session required |
| POST | `/competition-invites/verification/:id/resolve` | `acceptVerificationSchema`; session required |
| GET | `/competition-invites/:token` | Controller/service; see controller guard/token handling |
| GET | `/competition-invites/:token/eligible-teams` | Controller/service; session required |
| POST | `/competition-invites/:token/request-representative` | Controller/service; session required |
| POST | `/competition-invites/:token/decline` | Controller/service; session required |
| POST | `/competition-invites/:token/accept` | `acceptCompetitionInviteSchema`; session required |

### competitions

Source: [backend/src/competitions/competitions.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/competitions/competitions.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/competitions/search` | `competitionSearchSchema`; session required |
| GET | `/competitions/mine` | Controller/service; session required |
| PATCH | `/competitions/:id/hidden` | Controller/service; session required |
| PATCH | `/competitions/:id/archive` | Controller/service; session required |
| GET | `/competitions/schedule-alerts` | Controller/service; session required |
| POST | `/competitions` | `createCompetitionSchema`; session required |
| GET | `/competitions/:id` | Controller/service; session required |
| PATCH | `/competitions/:id` | `updateCompetitionSchema`; session required |
| DELETE | `/competitions/:id` | Controller/service; session required |
| GET | `/competitions/:id/player-stats` | Controller/service; session required |
| GET | `/competitions/:id/fixtures` | Controller/service; session required |
| GET | `/competitions/:id/fixtures/:fixtureId/match-centre` | Controller/service; session required |
| POST | `/competitions/:id/fixtures/generate` | `generateFixturesSchema`; session required |
| POST | `/competitions/:id/fixtures/:fixtureId/schedule/accept` | `fixtureScheduleAcceptSchema`; session required |
| POST | `/competitions/:id/fixtures/:fixtureId/schedule/propose` | `fixtureScheduleProposalSchema`; session required |
| POST | `/competitions/:id/results` | `createCompetitionResultSchema`; session required |
| PATCH | `/competitions/:id/results/:resultId` | `updateCompetitionResultSchema`; session required |
| DELETE | `/competitions/:id/results/:resultId` | Controller/service; session required |
| POST | `/competitions/:id/teams` | `createCompetitionTeamSchema`; session required |
| PATCH | `/competitions/:id/teams/:competitionTeamId` | `renameCompetitionTeamSchema`; session required |
| DELETE | `/competitions/:id/teams/:competitionTeamId` | Controller/service; session required |

### dashboard

Source: [backend/src/dashboard/dashboard.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/dashboard/dashboard.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/dashboard` | Controller/service; session required |

### Database health

Source: [backend/src/database/database-health.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/database/database-health.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/health/database` | Controller/service; see controller guard/token handling |

### Operations health

Source: [backend/src/database/operations-health.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/database/operations-health.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/health/operations` | Controller/service; see controller guard/token handling |

### events

Source: [backend/src/events/events.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/events/events.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/events` | `createEventSchema`; session required |
| GET | `/events` | Controller/service; session required |
| GET | `/events/:eventId/link-diagnostic` | Controller/service; session required |
| POST | `/events/:eventId/start-match` | `startMatchSchema`; session required |
| POST | `/events/:eventId/rsvp` | `createRsvpSchema`; session required |
| GET | `/events/:eventId/rsvps` | Controller/service; session required |
| GET | `/events` | Controller/service; session required |
| GET | `/events/:eventId/competition-suspensions` | Controller/service; session required |
| PUT | `/events/:eventId/lineup` | `confirmLineupSchema`; session required |
| GET | `/events/:eventId/lineup` | Controller/service; session required |
| GET | `/events/:id` | Controller/service; session required |
| GET | `/events/:id/weather` | Controller/service; session required |
| PATCH | `/events/:id` | `updateEventSchema`; session required |
| DELETE | `/events/:id` | Controller/service; session required |

### friendly-fixtures

Source: [backend/src/friendly-fixtures/friendly-fixtures.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/friendly-fixtures/friendly-fixtures.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/friendly-fixtures/incoming` | Controller/service; session required |
| POST | `/friendly-fixtures/:id/accept` | Controller/service; session required |
| POST | `/friendly-fixtures/:id/decline` | Controller/service; session required |

### game-plans

Source: [backend/src/game-plans/game-plans.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/game-plans/game-plans.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/game-plans` | Controller/service; session required |
| GET | `/game-plans/:id` | Controller/service; session required |
| POST | `/game-plans` | `createGamePlanSchema`; session required |
| PATCH | `/game-plans/:id` | `updateGamePlanSchema`; session required |
| DELETE | `/game-plans/:id` | Controller/service; session required |

### injuries

Source: [backend/src/injuries/injuries.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/injuries/injuries.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/injuries` | `createInjurySchema`; session required |
| GET | `/injuries` | `listInjuriesQuerySchema`; session required |
| GET | `/injuries/protocol` | `injuryProtocolQuerySchema`; session required |
| GET | `/injuries/recovery/:athleteId` | Controller/service; session required |
| GET | `/injuries/:id` | Controller/service; session required |
| PATCH | `/injuries/:id` | `updateInjurySchema`; session required |
| PATCH | `/injuries/:id/close` | `closeInjurySchema`; session required |
| POST | `/injuries/:id/timeline` | `createInjuryTimelineEntrySchema`; session required |
| DELETE | `/injuries/:id` | Controller/service; session required |

### matches

Source: [backend/src/matches/matches.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/matches/matches.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/matches/sessions/:sessionId/report` | Controller/service; session required |
| GET | `/matches/:matchId/session-report` | Controller/service; session required |
| GET | `/matches/:matchId/squad` | Controller/service; session required |
| GET | `/matches/:matchId/opponent-squad` | Controller/service; session required |
| GET | `/matches/:matchId/insight` | Controller/service; session required |
| GET | `/matches/:matchId/events` | Controller/service; session required |
| POST | `/matches/:matchId/events` | `createMatchLogEventSchema`; session required |
| GET | `/matches/:matchId/event-reviews` | Controller/service; session required |
| GET | `/matches/:matchId/event-operations` | Controller/service; session required |
| POST | `/matches/:matchId/event-reviews/:reviewId/resolve` | `resolveMatchEventReviewRequestSchema`; session required |
| POST | `/matches/:matchId/event-reviews/:reviewId/dispute` | Controller/service; session required |
| PATCH | `/matches/:matchId/events/:eventId` | `updateMatchLogEventSchema`; session required |
| DELETE | `/matches/:matchId/events/:eventId` | Controller/service; session required |
| POST | `/matches/:matchId/finish` | Controller/service; session required |
| POST | `/matches/:matchId/resume` | `resumeMatchSchema`; session required |
| POST | `/matches/:matchId/finalise` | `finaliseMatchProjectionSchema`; session required |
| GET | `/matches/:matchId/amendments` | Controller/service; session required |
| POST | `/matches/:matchId/amendments` | `requestMatchAmendmentSchema`; session required |
| POST | `/matches/:matchId/amendments/:amendmentId/respond` | `respondMatchAmendmentSchema`; session required |
| POST | `/matches/:matchId/reopen` | `reopenMatchProjectionSchema`; session required |
| PATCH | `/matches/:matchId/clock` | `updateMatchClockSchema`; session required |
| GET | `/matches/:matchId/clock-operations` | Controller/service; session required |
| GET | `/matches/:matchId` | Controller/service; session required |

### player

Source: [backend/src/player/player.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/player/player.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/player/me` | Controller/service; session required |
| GET | `/player/team` | Controller/service; session required |
| GET | `/player/events` | Controller/service; session required |
| GET | `/player/standings` | Controller/service; session required |

### profile

Source: [backend/src/profile/profile.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/profile/profile.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/profile` | Controller/service; session required |
| PATCH | `/profile` | `updateProfileSchema`; session required |
| DELETE | `/profile` | Controller/service; session required |

### seasons

Source: [backend/src/seasons/seasons.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/seasons/seasons.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/seasons` | Controller/service; session required |
| POST | `/seasons` | `createSeasonSchema`; session required |
| PATCH | `/seasons/:id` | `updateSeasonSchema`; session required |
| DELETE | `/seasons/:id` | Controller/service; session required |

### statistics

Source: [backend/src/statistics/statistics.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/statistics/statistics.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/statistics/season-insight` | Controller/service; session required |
| POST | `/statistics/season-insight` | `generateSeasonInsightSchema`; session required |
| POST | `/statistics/assistant` | `askAssistantSchema`; session required |
| GET | `/statistics` | Controller/service; session required |
| GET | `/statistics/athletes/:id` | Controller/service; session required |
| GET | `/statistics/compare` | `compareAthletesSchema`; session required |
| GET | `/statistics/competitions` | Controller/service; session required |
| POST | `/statistics/competitions` | `createCompetitionSchema`; session required |
| PATCH | `/statistics/competitions/:id` | `updateCompetitionSchema`; session required |
| DELETE | `/statistics/competitions/:id` | Controller/service; session required |
| POST | `/statistics/competitions/:id/standings` | `createStandingSchema`; session required |
| PATCH | `/statistics/standings/:id` | `updateStandingSchema`; session required |
| DELETE | `/statistics/standings/:id` | Controller/service; session required |

### sync

Source: [backend/src/sync/sync-jwks.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync-jwks.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/sync/jwks` | Controller/service; see controller guard/token handling |

### sync

Source: [backend/src/sync/sync.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/sync/token` | Controller/service; session required |
| POST | `/sync/upload` | `syncUploadSchema`; session required |
| POST | `/sync/telemetry` | `syncTelemetrySchema`; session required |

### team-invites

Source: [backend/src/team-invites/team-invites.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/team-invites/team-invites.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/team-invites` | `createTeamInviteSchema`; session required |
| GET | `/team-invites` | Controller/service; session required |
| GET | `/team-invites/assistants` | Controller/service; session required |
| DELETE | `/team-invites/:id` | Controller/service; session required |
| DELETE | `/team-invites/assistants/:id` | Controller/service; session required |
| GET | `/team-invites/:token` | Controller/service; see controller guard/token handling |
| POST | `/team-invites/:token/accept` | Controller/service; session required |

### teams

Source: [backend/src/teams/teams.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/teams/teams.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/teams/search` | `teamSearchSchema`; session required |
| POST | `/teams` | `createTeamSchema`; session required |
| PATCH | `/teams` | `updateTeamSchema`; session required |

### weather

Source: [backend/src/weather/locations.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/weather/locations.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/locations/search` | Controller/service; session required |
| GET | `/locations/reverse` | Controller/service; session required |

## Operational boundaries

`GET /sync/token` is session-protected and returns `{endpoint,token,expiresAt}` with five-minute expiry. `GET /sync/jwks` is a verification-key endpoint, not a protected application write. `/health/operations` uses its dedicated bearer token. See [operations](operations/offline-operations-runbook.md), [PowerSync security](security/powersync-security.md) and [refresh](automatic-data-refresh.md).

## AI Declaration

OpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.
