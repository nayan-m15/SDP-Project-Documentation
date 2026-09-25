# Application Structure and Request Flow

## Frontend route map

| Audience | Routes | Main implementation areas |
| --- | --- | --- |
| Public | `/`, `/public-dashboard`, `/login`, `/signup`, `/verify-email`, `/claim/:token`, `/join-team/:token`, `/join-competition/:token` | Landing/auth, anonymous dashboard and invite/claim resumers. |
| Team member | `/dashboard`, `/competitions`, `/competitions/:id`, `/athletes`, `/events`, `/events/:eventId/confirm-squad`, `/events/:eventId/confirm-squad/opponent`, `/matches/:matchId/live`, `/live-logger`, `/matches/:matchId/report`, `/statistics`, `/injuries`, `/team`; `/tactics` redirects to `/team?section=tactics` | Team shell, competition fixtures, recovery, match-day offline panels and reports. |
| Claimed player | `/player/dashboard`, `/player/team`, `/player/events`, `/player/competitions`, `/player/competitions/:id`; `/player/standings` redirects to `/player/competitions` | Player shell, shared schedule/RSVP and competition views. |

`ProtectedRoute` requires a session. `RequireTeam` and `RequirePlayer` select the applicable experience, but frontend route guards are convenience only; backend guards/services enforce access.

## Backend module map

| Module | Responsibility |
| --- | --- |
| `auth`, `profile` | Better Auth endpoints/session guard and user profile. |
| `teams`, `team-invites`, `claims`, `player` | Membership, coach/assistant invites, player claims and player-facing reads. |
| `athletes` | Active/archive roster and athlete validation. |
| `events`, `weather` | Calendar CRUD, match start, RSVPs, location search and event forecast. |
| `game-plans` | Formations, selection, tactics and role assignments. |
| `matches` | Match clock, squads, event ledger, corrections and finish workflow. |
| `seasons`, `statistics`, `dashboard` | Date windows, aggregates/trends/comparisons, competitions/standings and dashboard summary. |
| `database` | Neon/Drizzle client, schema and health check. |
| `competitions`, `competition-invites` | Shared competition membership, invitations, fixture generation, scheduling responses and results. |
| `injuries` | Injury reports, timeline, protocol and recovery reads. |
| `sync` | Authenticated upload/token/telemetry, public JWKS, idempotent receipts and reconciliation entry points. |
| `public-api` | Anonymous formations, tactics and public dashboard read endpoints. |

## Representative request flow: logging a goal while connected (legacy REST path)

```mermaid
sequenceDiagram
  participant P as LiveMatchPage
  participant A as frontend matches/api.ts
  participant C as MatchesController
  participant V as Zod validation
  participant S as MatchesService
  participant D as Drizzle/PostgreSQL
  P->>A: create goal with clientRequestId
  A->>C: POST /matches/:matchId/events + session cookie
  C->>V: createMatchLogEventSchema
  V-->>C: validated DTO or 400
  C->>S: createEvent(userId, matchId, DTO)
  S->>D: resolve membership/match team; insert ledger row
  D-->>S: persisted event (unique match/request ID)
  S-->>P: JSON response
  P->>A: refetch/invalidate match queries
```

The frontend shared `apiFetch` includes credentials and converts non-2xx responses to `ApiError`. The controller validates body/UUID parameters. The service resolves the authenticated user's team, checks match/player state and persists through Drizzle. Statistics read the event ledger; correcting the event changes derived results rather than directly editing a displayed total.

The current match-day offline path persists an observation in the browser before upload. `POST /sync/upload` checks user/team permission and stable IDs, records a receipt, and reconciles immutable observations and operations into canonical events and projection state. PowerSync is configured to replicate relevant data back to clients. See [offline collaboration](offline-collaboration.md) for retry and recovery behaviour. These source paths have not been verified in the deployed environment.

## Comparison boundaries

- Athlete comparison accepts two or three own-team athlete IDs, optionally within one season.
- Opponent names/results appear in match and athlete history, but no athlete-versus-opponent-player comparison aggregate exists.
- Season trends compare periods within one team's season; there is no cross-team or cross-season side-by-side comparison endpoint.
- Shared competition standings are calculated from completed in-app matches and admin-entered results; older manually entered standings rows remain as a legacy baseline. This is not an athlete-versus-opponent-player comparison feature. See `backend/src/competitions/competitions.service.ts` and `backend/src/common/competition-standings.ts` at the application source revision cited in the [database schema](data/database-schema.md).
