# Application Structure and Request Flow

## Frontend route map

| Audience | Routes | Main implementation areas |
| --- | --- | --- |
| Public | `/`, `/login`, `/signup`, `/verify-email`, `/claim/:token`, `/join-team/:token` | Landing/auth pages, Better Auth client, claim/invite resumers, public policy HTML. |
| Team member | `/dashboard`, `/athletes`, `/events`, `/team`, `/tactics`, `/statistics`, `/live-logger`, match setup/live/report routes | `pages/`, `features/events`, `features/team-management`, `features/team-tactics`, `features/matches`, `features/statistics`. |
| Claimed player | `/player/dashboard`, `/player/team`, `/player/events`, `/player/standings` | `layouts/PlayerShell`, `features/player`, RSVP widget. |

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

## Representative request flow: logging a goal

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

## Comparison boundaries

- Athlete comparison accepts two or three own-team athlete IDs, optionally within one season.
- Opponent names/results appear in match and athlete history, but no athlete-versus-opponent-player comparison aggregate exists.
- Season trends compare periods within one team's season; there is no cross-team or cross-season side-by-side comparison endpoint.
- Manual competition standings compare table rows but are not derived from all competitors' platform fixtures.
