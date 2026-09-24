# Functional Requirements and System Analysis

## Document status

This page replaces a PDF-converted requirements document whose formatting and future-tense language made proposed behaviour look implemented. It preserves the product intent while mapping it to application commit `e7285f53`, inspected on 14 September 2026.

## Actors and system boundary

Gaffer is a football coaching application with coach, assistant and claimed-player experiences. The browser SPA communicates with a NestJS REST API. The API owns authentication checks, team/role authorisation, validation, persistence and external weather/geocoding calls. PostgreSQL is not accessed directly by the browser.

## Requirement traceability (14 September source snapshot)

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
| Offline live logging | Historical 14 September finding | The current source adds browser persistence, upload and reconciliation; see the 24 September table below. |
| Concurrent live synchronisation | Historical 14 September finding | The current source adds shared observations and projections through offline sync/PowerSync. Live delivery and conflict handling need environment verification. |
| External fixture arrangement | Historical 14 September finding | The current source adds competition invitations and fixture scheduling responses. End-to-end platform-user coordination remains unverified. |
| Report export/sharing | Historical 14 September finding | An in-app report and unsent-observation export exist; a user-facing match-report file export is not established. |
| Password recovery/account deletion | Open course requirement gap | Sign-up/sign-in exist; reset and self-service deletion are absent in current source. [Backlog card #130](https://trello.com/c/HG4lWTcB). |

### Current source scope

| Capability | Verified source scope | Evidence limit |
| --- | --- | --- |
| Offline and concurrent event logging | Browser offline store and readiness UI; authenticated upload with stable item IDs; server observations, operations, reviews and projections; PowerSync configuration. | No physical-device result or production revision verified. |
| Opponent fixtures and competitions | Competition teams, invites, fixture generation, scheduling response routes, result entry and standings models. | Cross-user full flow and accepted scheduling are unverified; Trello still places fixture/league work in progress. |
| Public information | Anonymous `/public-dashboard` frontend and `/v1/public-dashboard` read routes. | Confirm production reachability and data exposure policy before describing it as deployed. |
| Injuries | Team-scoped injury CRUD, timeline, recovery/protocol routes and UI. | Medical correctness, privacy review and client acceptance are unverified. |
| Sharing/export | In-app match report, game-plan PDF, injury-report PDF and export of **unsent offline observations** for recovery. | None of these establishes a match-report PDF or share workflow. The sharing/export card remains in progress. |
| Password reset and account deletion | No implemented self-service route established. | These are open **common brief authentication requirements**, not optional enhancements. |

## Key rules

- Team-scoped reads resolve a membership from the authenticated user; coach-only mutations use a stricter coach check.
- A user has at most one `team_members` row under the current unique index, while a user may claim one athlete per team across multiple teams.
- Active roster listings exclude archived athletes; `archived_at` preserves historical records.
- Starting a match requires 11 distinct own-team starters. Optional bench members must be unique and cannot also start.
- Injured, suspended, archived or cross-team athletes are rejected by service-level match preparation checks.
- Opponent shirt numbers are 1–99 and unique within a match. Full mode requires names; numbers mode deliberately does not store names.
- `client_request_id`, when supplied for a match event, is unique within that match. The newer offline engine uses stable upload IDs, receipts and reconciliation; see [offline collaboration](../Architecture/offline-collaboration.md).
- A player may have one RSVP per event; a later response updates that row.
- Season aggregation uses the team's season date range. The schema also contains competition links, including a deprecated free-text `season` field retained for compatibility.

## Historical 14 September tier-plan traceability

| Tier/area | Requirement interpretation | Current evidence/status |
| --- | --- | --- |
| Basic — athlete/event management | Maintain athletes, schedule activities and show a useful dashboard. | Implemented; the REST-derived dashboard shows roster/event counts, upcoming events, recent matches, season record and rate statistics. |
| Basic — live record/results | Record match actions and preserve a correctable source of truth. | Implemented through persisted match events. Corrections change ledger events and derived statistics; there is no direct arbitrary statistics override. |
| Basic — accounts | Register/sign in/sign out and manage profile. | Sign-up/sign-in exist. Password reset and account deletion remain open **common brief requirements**; [card #130](https://trello.com/c/HG4lWTcB) tracks them. |
| Intermediate — roles | Coach, assistant and player permissions. | Implemented — acceptance verification pending. Simultaneous updates are not part of the delivered role feature. |
| Intermediate — planning | Shared calendar, RSVP, reminders and external information. | Implemented for persisted calendar, three-state RSVP, in-app next-24-hour reminders and Open-Meteo. Platform fixture arrangement is absent. |
| Intermediate — comparisons | Compare performance meaningfully. | Two or three own-team athletes and periods within one team's season can be compared. No athlete-versus-opponent-player, cross-team or cross-season side-by-side comparison exists. |
| Intermediate — resilience | Record offline and synchronise later. | Current source includes a durable browser queue and upload/reconciliation; field and production verification remain open. |
| Advanced — concurrent logging | Several authorised users log consistently. | Current source contains observation merging and projections via PowerSync; end-to-end behaviour is unverified. |
| Advanced — league/public/export | Standings, public squad/results and reports. | Competition fixture/standings source and public dashboard reads exist. Match-report file export is unverified. |
| Advanced — automation | Schedule generation, insights and selection suggestions. | Planned. |

The sport brief supplies Basic/Intermediate/Advanced capability bands; Trello cards define recorded delivery slices. Differences in “comparison,” “fixtures,” reminders and live collaboration require client/team clarification rather than expansion by assumption.

## Quality attributes

## Direct course-brief trace

The course brief states the common requirements separately from the team's Basic/Intermediate/Advanced plan. The local `project_briefs.pdf` was checked during this audit; it is not hosted in this repository.

| Brief requirement | Source evidence | Status or gap |
| --- | --- | --- |
| Track events, player statistics and history | Events, matches, match events, athlete statistics and report routes | Implemented in source; current user testing and deployed revision unverified. |
| Compare with other teams | Competition teams, fixtures, results and standings; athlete comparison is within the user's team | Partial. The exact cross-team comparison required by the brief is not established by the current athlete comparison view. |
| Plan events with other platform users | Competition invitations and fixture scheduling responses | Partial source implementation; no verified two-user acceptance flow. |
| Assistants track event history | Team invitation/assistant role plus match logging and report reads | Source paths exist; verify the assistant's complete flow and role restrictions in a current run. |
| Sign up, sign in, reset password, delete account | Better Auth sign-up/sign-in routes | Reset and deletion remain unimplemented common requirements; [backlog #130](https://trello.com/c/HG4lWTcB). |
| Hand-written API and external integration | NestJS controllers/services; Open-Meteo geocoding and forecast integration | Source evidence exists; deployed revision and external-service behaviour require verification. |
| Responsive/accessibility and CI/CD | Responsive components and workflow files | No current measured accessibility/mobile report or successful CI/deployment run supplied. |
| Documentation website | This static site and published GitHub Pages URL | Local source validated; published rendering could not be confirmed in this audit. |

The code contains responsive layouts, semantic labels and component-level accessibility features, but this does not establish automatic WCAG compliance. Security depends on session validation, CORS, server-side role/team scoping, input validation and safe secret handling. Availability and performance are hosting/provider dependent; no zero-latency or production-availability guarantee is documented.

## Historical product direction

Earlier requirements proposed offline-first capture, conflict-free collaboration, public pages, automatic scheduling, exported reports and AI-assisted analysis. The current source implements portions of offline capture, collaboration and public reads; automatic scheduling, report-file export and AI analysis remain gaps or proposals. See the [historical stack proposal](../Architecture/tech-stack/tool-stack-plan.md) and [current backlog](../Project%20Management/product-backlog.md).
