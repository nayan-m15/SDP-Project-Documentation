# Gaffer Public API Reference

The public API is an anonymous, read-only coaching catalog and sporting dashboard. It does not expose saved game plans, accounts, contacts, RSVP notes or authentication data. This reference describes source behavior; it does not assert that a particular hosted revision has been deployed.

## Base URLs and Swagger scope

Local backend: `http://localhost:3000`. Configured hosted backend: `https://gaffer-api-ynaf.onrender.com`. The frontend rewrite adds `/api` before backend paths (for example `/api/v1/formations`).

Swagger UI at `/api/docs`, JSON at `/api/docs-json` and YAML at `/api/docs-yaml` are intended to describe **six anonymous GET endpoints** in every environment, including production. They need no session, API key or token. “Try it out” uses the backend serving the docs. Protected application APIs are documented separately in the [API guide](api-guide.md), not included in this public schema.

| GET path | Query | Response |
| --- | --- | --- |
| `/v1/formations` | Optional `id` | `{success,count,data: PublicFormation[]}` |
| `/v1/tactics` | Optional `id` | `{success,count,data: PublicTactic[]}` |
| `/v1/public-dashboard/filters` | None | `{success,data:{teams,seasons,competitions}}` |
| `/v1/public-dashboard/matches` | `teamId,competitionId,seasonId,status,limit,offset` | `{success,count,limit,offset,data,summary:{total,cleanSheets}}` |
| `/v1/public-dashboard/players` | `teamId,competitionId,seasonId,search,position,limit,offset` | `{success,count,limit,offset,data}` |
| `/v1/public-dashboard/team-statistics` | `teamId,competitionId,seasonId` | `{success,count,data}` |

`count` is the number of returned rows, not the complete filtered total. Dashboard IDs are optional UUIDs. Unavailable filter IDs return empty results rather than disclosing private existence.

## Swagger policy and current source discrepancy

The reference policy intends exactly the six GET endpoints listed above. **Current source also declares `GET /v1/public-dashboard/competition-fixtures`.** `PublicApiModule` includes that controller and `configureSwagger` includes the module without filtering this route or an exclusion decorator. Consequently, source does not support an exact-six claim for the generated Swagger paths; it would include this additional endpoint. The effective hosted schema was not fetched for this review.

The additional anonymous GET accepts optional UUID `teamId`, `competitionId` and `seasonId`, returning `{success,count,data}` for generated league/cup fixtures. Records include fixture/competition identity, stage, round, position, schedule/status, home/away participant-slot IDs and names, scores/penalty scores and winner slot. Slot IDs are competition participant IDs, not private athlete IDs. It uses the controller's dashboard rate guard and public wildcard CORS, but directly invokes the service without the 30-second response-cache wrapper or paginated schema. Do not assume the cached/paged contract below applies to this additional path. This is a documented source/policy mismatch, not a newly invented endpoint or a change made by this documentation update.

## Pagination and filtering

| Parameter | Matches | Players |
| --- | --- | --- |
| `limit` | Integer 1–100; default 50 | Integer 1–200; default 100 |
| `offset` | Integer ≥0; default 0 | Integer ≥0; default 0 |
| `status` | `scheduled`, `cancelled`, `completed` | Not supported |
| `search` | Not supported | Trimmed literal case-insensitive full-name substring, maximum 100 characters |
| `position` | Not supported | `ALL`, `FWD`, `MID`, `DEF`, `GK` |

Limits above the ceiling return 400 rather than being clamped. Search uses literal substring matching, so `%`/`_` are not SQL wildcard operators. Team/competition/season, name and position filters apply **before** pagination. Position categories use the source's football position-code groups.

The match `summary` covers the complete filtered set independent of pagination. `total` counts matching matches; `cleanSheets` counts completed matches with no logged opponent goal. Summary caching is shared across pages for the same filters. Player statistics use completed matches only, with grouped SQL aggregation restricted to the selected player IDs; athletes without history retain zeros.

## Response records

| Record | Fields |
| --- | --- |
| Formation | `id,name,shape,playerCount,description` |
| Tactic | `id,name,category,description,formationId` (`formationId` is always null; `category` is defensive/offensive) |
| Match | `id,eventId,title,status,scheduledAt,location,opponentName,isHome,teamScore,opponentScore,team:{id,name},competition:{id,name,type}\|null,season:{id,name}\|null` |
| Player | `id,firstName,lastName,position,squadNumber,team:{id,name},statistics:{appearances,starts,minutesPlayed,goals,assists,saves,yellowCards,redCards}` |
| Team statistic / standing | `id,teamName,position,played,won,drawn,lost,goalsFor,goalsAgainst,goalDifference,points,isOwnTeam,ownerTeam,competition,season` |
| Filters | Teams `{id,name}`; seasons include team/date/current scope; competitions include `id,name,type,teamId,seasonId,teamIds` |

## Formation and tactic catalog

| Player count (includes goalkeeper) | Preset IDs |
| --- | --- |
| 5 | `5v5-1-2-1`, `5v5-2-1-1`, `5v5-1-1-2` |
| 7 | `7v7-2-3-1`, `7v7-3-2-1`, `7v7-2-2-2` |
| 11 | `4-3-3`, `4-4-2`, `4-2-3-1`, `4-1-4-1`, `3-5-2`, `3-4-3`, `5-3-2`, `5-4-1` |

The public static catalog returns these presets with `playerCount`. The application's private formation contract also supports `custom-5`, `custom-7` and `custom-11` slots; those coach-defined coordinate layouts belong to game plans and are not returned by the public catalog. Do not infer a fixed lineup of eleven from a formation response. Tactics are the generic defensive/offensive styles, independent of formation and private team settings.

The service also returns player `starts` and `saves`; the current handwritten OpenAPI player metadata omits those additive fields. Consumers should distinguish the actual service response from that metadata.

## Caching, throttling and CORS

The original four database-backed dashboard responses use a per-instance 30-second cache keyed by validated query parameters, with concurrent requests sharing the same in-flight query. Default capacity is 500 entries with oldest-first eviction. Restarting an instance clears it. `PUBLIC_DASHBOARD_CACHE_TTL_SECONDS` and `PUBLIC_DASHBOARD_CACHE_MAX_ENTRIES` configure it. Polling faster than its TTL may return unchanged data.

The dashboard rate limiter defaults to 120 requests per minute per client plus an edge-IP backstop with a default twenty-times budget. `PUBLIC_DASHBOARD_RATE_LIMIT` and `PUBLIC_DASHBOARD_BACKSTOP_RATE_LIMIT` configure budgets. Either exhausted budget returns 429 before database work with `{"message":"Too many requests. Please try again later."}`. Static formations/tactics are not subject to this dashboard cache/limiter.

The public route prefixes, including the additional fixture endpoint, use wildcard CORS (`Access-Control-Allow-Origin: *`) without credentials. Protected endpoints keep credentialed CORS with the configured origin allowlist.

## Errors and consumer refresh

Empty catalog `?id=` returns 400; an unknown catalog ID returns 404. Invalid UUIDs, enum values, lengths or paging bounds return 400. Standard Nest errors use `{statusCode,message,error}`; unhandled failures use its safe 500 response rather than raw database errors. A 429 should prompt a delayed/manual retry, not a tight retry loop.

The public UI starts with 40 players and 100 matches, debounces search by 300 ms, and loads additional pages on “Load more.” Failed additional pages retain earlier data and offer retry. Player/match lists disable shared five-second polling, use a 30-second stale period and refresh on focus; standings refresh every 30 seconds. See [automatic refresh](automatic-data-refresh.md) and [performance mechanisms](../Quality/performance-review.md).

Sources: [backend/src/public-api/public-api.schemas.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-api.schemas.ts), [backend/src/public-api/public-api.openapi.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-api.openapi.ts), [backend/src/public-api/formations.data.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/formations.data.ts), [backend/src/public-api/public-dashboard.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard.service.ts), [backend/src/public-api/public-dashboard-cache.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard-cache.service.ts), [backend/src/public-api/public-dashboard-rate-limit.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/public-api/public-dashboard-rate-limit.service.ts), [backend/src/swagger-config.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/swagger-config.ts), [backend/src/cors-config.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/cors-config.ts).
