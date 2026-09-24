# Functional Requirements and System Analysis

## Current-state update — 24 September 2026

The earlier audit below is a historical 14 September snapshot, not the current feature inventory. At application commit `ef2880ad0018536c2b933754148e285b2a325ec7`, the repository includes injury and recovery records, competition teams/fixtures/invitations, public dashboard routes, and offline sync/reconciliation code. The Trello export through 2026-09-24T19:20:21.943Z places some of these in Completed and others In Progress; production revision, a passing current test run and stakeholder acceptance remain unverified. See [Sprint 3 evidence](../Project%20Management/sprint-3-delivery.md) and [offline architecture](../Architecture/offline-collaboration.md).

## Document status

This page replaces a PDF-converted requirements document whose formatting and future-tense language made proposed behaviour look implemented. It preserves the product intent while mapping it to application commit `e7285f53`, inspected on 14 September 2026.

## Actors and system boundary

Gaffer is a football coaching application with coach, assistant and claimed-player experiences. The browser SPA communicates with a NestJS REST API. The API owns authentication checks, team/role authorisation, validation, persistence and external weather/geocoding calls. PostgreSQL is not accessed directly by the browser.

## Requirement traceability

| Requirement | Current state | Verifiable evidence |
| --- | --- | --- |
| Manage athletes and availability state | Implemented — acceptance verification pending | Athlete controller/service/schema and roster UI/tests. |
| Manage match, training and meeting events | Implemented — acceptance verification pending | Event controller/service/Zod schemas and calendar UI/tests. |
| Confirm an eligible starting XI and bench | Implemented — acceptance verification pending | `startMatchSchema` requires exactly 11 unique starters and validates bench overlap. |
| Capture no, numbers-only, or full opponent information | Implemented — acceptance verification pending | `opponent_squad_visibility` enum and match-start validation. |
| Log and correct match activity | Implemented — acceptance verification pending | Match event POST/PATCH/DELETE endpoints and editable report UI. |
| Derive team and athlete statistics | Implemented — acceptance verification pending | Statistics service, endpoints, charts and unit/integration tests. |
| Seasons, competitions and standings | Implemented — acceptance verification pending | Season CRUD and manually maintained competition standings. |
| Roles, invitations and team isolation | Implemented — acceptance verification pending | Better Auth guard, team-access helpers, invite/claim services and isolation tests. |
| Shared schedule and RSVP | Implemented — acceptance verification pending | Player event feed and one RSVP per event/athlete. |
| Venue search and weather | Implemented — acceptance verification pending | Open-Meteo geocoding/forecast services with explicit failure states. |
| Reminder notifications | Partial | Next-24-hours in-app banner exists; email/push notifications do not. |
| Offline live logging | Planned | No service worker, IndexedDB/SQLite queue, background sync or retry store found. Local form state is not durable offline capture. |
| Concurrent live synchronisation | Planned | Socket.io dependencies and Nest adapter exist, but no gateway, subscriptions, rooms or client connection exists. |
| External fixture arrangement | Planned | The coach enters an opponent name; another platform user does not accept a fixture. |
| Report export/sharing | Planned | Match report page exists; no download/export workflow was found. |
| Password recovery/account deletion | Planned | Better Auth is installed/configured, but these flows/routes are absent. |

## Key rules

- Team-scoped reads resolve a membership from the authenticated user; coach-only mutations use a stricter coach check.
- A user has at most one `team_members` row under the current unique index, while a user may claim one athlete per team across multiple teams.
- Active roster listings exclude archived athletes; `archived_at` preserves historical records.
- Starting a match requires 11 distinct own-team starters. Optional bench members must be unique and cannot also start.
- Injured, suspended, archived or cross-team athletes are rejected by service-level match preparation checks.
- Opponent shirt numbers are 1–99 and unique within a match. Full mode requires names; numbers mode deliberately does not store names.
- `client_request_id`, when supplied for a match event, is unique within that match to make repeated REST submissions idempotent. This is not an offline sync engine.
- A player may have one RSVP per event; a later response updates that row.
- Season aggregation uses the team's season date range. The schema also contains competition links, including a deprecated free-text `season` field retained for compatibility.

## Course requirement traceability

| Tier/area | Requirement interpretation | Current evidence/status |
| --- | --- | --- |
| Basic — athlete/event management | Maintain athletes, schedule activities and show a useful dashboard. | Implemented; the REST-derived dashboard shows roster/event counts, upcoming events, recent matches, season record and rate statistics. |
| Basic — live record/results | Record match actions and preserve a correctable source of truth. | Implemented through persisted match events. Corrections change ledger events and derived statistics; there is no direct arbitrary statistics override. |
| Basic — accounts | Register/sign in/sign out and manage profile. | Implemented with verification and Google sign-in. Password reset/change, email change and account deletion remain Trello Potential Features card #130. |
| Intermediate — roles | Coach, assistant and player permissions. | Implemented — acceptance verification pending. Simultaneous updates are not part of the delivered role feature. |
| Intermediate — planning | Shared calendar, RSVP, reminders and external information. | Implemented for persisted calendar, three-state RSVP, in-app next-24-hour reminders and Open-Meteo. Platform fixture arrangement is absent. |
| Intermediate — comparisons | Compare performance meaningfully. | Two or three own-team athletes and periods within one team's season can be compared. No athlete-versus-opponent-player, cross-team or cross-season side-by-side comparison exists. |
| Intermediate — resilience | Record offline and synchronise later. | Planned: no durable offline store, queue or background sync. |
| Advanced — concurrent logging | Several authorised users log consistently. | Planned: no gateway, rooms, broadcast or reconciliation despite Socket.io packages. |
| Advanced — league/public/export | Standings, public squad/results and reports. | Manual standings exist. Public squad/player data and downloadable/shareable export are planned. |
| Advanced — automation | Schedule generation, insights and selection suggestions. | Planned. |

The sport brief supplies Basic/Intermediate/Advanced capability bands; Trello cards define recorded delivery slices. Differences in “comparison,” “fixtures,” reminders and live collaboration require client/team clarification rather than expansion by assumption.

## Quality attributes

The code contains responsive layouts, semantic labels and component-level accessibility features, but this does not establish automatic WCAG compliance. Security depends on session validation, CORS, server-side role/team scoping, input validation and safe secret handling. Availability and performance are hosting/provider dependent; no zero-latency or production-availability guarantee is documented.

## Historical product direction

Earlier requirements proposed offline-first capture, conflict-free collaboration, public pages, automatic scheduling, exported reports and AI-assisted analysis. They remain backlog candidates. See the [historical stack proposal](../Architecture/tech-stack/tool-stack-plan.md) and the [current backlog](../Project%20Management/product-backlog.md) for the implementation distinction.
