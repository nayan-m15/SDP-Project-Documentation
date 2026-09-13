# Product Backlog

**Status basis:** application source commit `aadf745eb7a9d309bf847bb3afb2789dbddbabc6` and Trello export dated 13 September 2026. Trello is authoritative for recorded card assignment/list/checklist state; source is authoritative for implementation. Deployed revision is unverified.

## Status definitions

- **Implemented — acceptance verification pending:** the end-to-end code path exists, but supplied evidence does not demonstrate every acceptance check.
- **Partial:** only a separable subset exists.
- **Planned:** required implementation was not found.

## Trello board snapshot

The [SDP-Interlude board](https://trello.com/b/cM6m3R0G/sdp-interlude) export contains 132 cards including archived cards. Current active/archived counts include: Completed 11/0 (all active cards are S2); Sprint 2 Backlog 0/0; In Progress 0/2; Issues/fixes 46/1; Backlog 11/0; Potential Features/Additions 17/0; Sprint 1 Backlog 10/0; Repo & project setup 14/1; Environment & tooling init 15/0; and archived Setup 2/2. Card position is ordering, not a priority. See [Sprint 2 Delivery](sprint-2-delivery.md) and [Bug Tracking](bug-tracking.md).

## Original backlog and Trello traceability

The detailed stories below were reorganised for clarity. This explicit map preserves the original PB identifiers instead of treating the newer section number as a replacement. “Original priority” comes from the supplied historical backlog; no active S2 card has a named priority/priority label in the export.

| Original ID | Original feature | Detailed section here | Trello trace | Original priority |
| --- | --- | --- | --- | --- |
| PB-01 | User Authentication | PB-01 | [#35 S1-02](https://trello.com/c/3ZIEzf2l/35-s1-02-user-authentication) | High |
| PB-02 | Athlete Roster Management | PB-03 | [#36 S1-03](https://trello.com/c/AU3nh5bK/36-s1-03-athlete-roster-management) | High |
| PB-03 | Event Management | PB-04 | [#37 S1-04](https://trello.com/c/opUO7Scg/37-s1-04-event-management) | High |
| PB-04 | Team and Lineup Management | PB-06/PB-07 | [#99 tactics](https://trello.com/c/3j3w53lz/99-team-tactics), [#94 persistence](https://trello.com/c/ScQOp0T4/94-save-lineup-to-database) | High |
| PB-05 | User Profile Management | Retained features below | [#53 S1-09](https://trello.com/c/PpO7KIjF/53-s1-09-user-profile-management) | Medium |
| PB-06 | Roles and Permissions | PB-02 | [#66 S2](https://trello.com/c/kCKi09ea/66-s2-assistant-role-and-permissions) | High |
| PB-07 | Live Event Logging | PB-08 | [#67 S2](https://trello.com/c/FeahTBSE/67-s2-live-event-logging) | High |
| PB-08 | Event Log Correction | PB-09 | [#68 S2](https://trello.com/c/wy2UgcLj/68-s2-event-log-correction) | High |
| PB-09 | Athlete Statistics | PB-10 | [#69 S2](https://trello.com/c/L6mvVSzk/69-s2-athlete-statistics) | High |
| PB-10 | Event and Team Statistics | PB-10 | [#70 S2](https://trello.com/c/KFDDIj0d/70-s2-event-and-team-statistics) | High |
| PB-11 | Season Statistics and Trends | PB-11 | [#71 S2](https://trello.com/c/1vhuPSwf/71-s2-season-statistics-and-trends) | Medium |
| PB-12 | Performance Comparisons | PB-11 | [#72 S3](https://trello.com/c/gMYOG8Fe/72-s3-performance-comparisons) | Medium |
| PB-13 | Fixtures | PB-18 | [#73 S3](https://trello.com/c/aX7Zsfza/73-s3-fixtures-setup-with-opponents) | Medium |
| PB-14 | Player RSVPs | PB-05 | [#74 S2](https://trello.com/c/rHGqemSt/74-s2-player-rsvps-roles-and-permissions) | Medium |
| PB-15 | Shared Calendar | PB-04 | [#75 S2](https://trello.com/c/4rqouzCz/75-s2-shared-calendar) | Medium |
| PB-16 | Weather and Location | PB-13 | [#76 S2](https://trello.com/c/4yss4qLJ/76-s2-weather-and-location-information) | Medium |
| PB-17 | Event Reminders | PB-14 | [#77 S2](https://trello.com/c/IUtmDU9s/77-s2-event-reminders) | Medium |
| PB-18 | Offline Event Logging | PB-15 | [#78 S3](https://trello.com/c/cCbQvUoL/78-s3-offline-event-logging) | High |
| PB-19 | Concurrent Event Logging | PB-16 | [#79 S3](https://trello.com/c/VENCiu0p/79-s3-concurrent-event-logging) | Medium |
| PB-20 | League and Standings | PB-12 | [#80 S3](https://trello.com/c/DQMVQqjx/80-s3-league-and-standings-management) | Medium |
| PB-21 | Automated Insights | PB-20 | [#81 S3](https://trello.com/c/tyi8IZ7F/81-s3-automated-performance-insights) | Medium |
| PB-22 | Selection Suggestions | PB-20 | [#82 S3](https://trello.com/c/2UP8CQAb/82-s3-player-selection-suggestions) | Medium |
| PB-23 | Public Squad Information | PB-20 | [#83 S3](https://trello.com/c/zO3SXWRm/83-s3-public-squad-and-player-information) | Low |
| PB-24 | Sharing and Report Export | PB-17 | [#84 S3](https://trello.com/c/7dWBTlFi/84-s3-sharing-and-report-export) | Medium |
| PB-25 | Automatic Season Scheduling | PB-20 | [#85 S3](https://trello.com/c/BhSiymWN/85-s3-automatic-season-scheduling) | Medium |
| PB-26 | Alternative Football Formats | PB-20 | [#86 S3](https://trello.com/c/clwOaaP3/86-s3-alternative-football-formats) | Low |

## PB-01 — Authentication and account access

**Status:** Implemented — acceptance verification pending (password reset/account deletion planned).

As a user, I want to register, verify my email, sign in through email/password or Google, maintain a session and sign out.

- [x] Better Auth server, Drizzle adapter and cookie session guard exist.
- [x] Email verification and Google OAuth paths exist.
- [ ] Demonstrate success/failure flows in the assessment environment.
- [ ] Password reset and account deletion are separate planned stories.

Evidence: [auth configuration](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/auth/auth.ts), [auth controller](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/auth/auth.controller.ts).

## PB-02 — Roles, invitations and permissions

**Status:** Implemented — acceptance verification pending.

As a coach, I want assistants and players to join with appropriate permissions so that access is controlled.

- [x] Coach/assistant membership roles and email-bound assistant invites exist.
- [x] One-time player claim tokens link signed-in users to athlete records.
- [x] Member reads and coach-only mutations use server-side checks.
- [ ] Manually verify forbidden mutations and expired/reused/mismatched invitations.

Evidence: [team access policy](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/common/team-access.ts), [team invites](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/team-invites), [claims](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/claims).

## PB-03 — Athlete roster

**Status:** Implemented — acceptance verification pending.

- [x] Create, list, view, update, search, archive and restore team athletes.
- [x] Record position, squad number, status and optional profile fields.
- [x] Exclude archived players from normal active selection.
- [ ] Demonstrate validation, history preservation and mobile roster use.

Evidence: [athletes module](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/athletes), [roster UI](https://github.com/nayan-m15/Gaffer/tree/main/frontend/src/components/roster).

## PB-04 — Calendar and shared scheduling

**Status:** Implemented — acceptance verification pending.

- [x] Coach creates/reads/updates/deletes match, training and meeting events.
- [x] Calendar/agenda views and player event feed share persisted team events.
- [x] Status supports scheduled, cancelled and completed.
- [ ] Demonstrate chronological, timezone and cancellation behaviour.

Evidence: [events backend](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/events), [event features](https://github.com/nayan-m15/Gaffer/tree/main/frontend/src/features/events).

## PB-05 — Player RSVPs

**Status:** Implemented — acceptance verification pending.

- [x] Claimed player can respond going, maybe or not going with an optional note.
- [x] One response per event/player is updated on resubmission.
- [x] Coach event detail groups responses and non-responses.
- [ ] Demonstrate that an unclaimed/cross-team player cannot respond.

Evidence: [RSVP schema](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/events/events.schemas.ts), [player RSVP UI](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/features/player/RsvpWidget.tsx).

## PB-06 — Team tactics and game plans

**Status:** Implemented — acceptance verification pending.

- [x] Create, edit, select and delete named formations/tactical plans.
- [x] Persist XI, bench, sliders and set-piece roles.
- [x] Snapshot the selected plan when a match begins.
- [ ] Demonstrate validation for unavailable/archived players and duplicate placement.

Evidence: [game-plan backend](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/game-plans), [tactics UI](https://github.com/nayan-m15/Gaffer/tree/main/frontend/src/features/team-tactics).

## PB-07 — Match setup and opponent information

**Status:** Implemented — acceptance verification pending.

- [x] Require exactly 11 distinct starters and a non-overlapping optional bench.
- [x] Support opponent modes `none`, `numbers` and `full`.
- [x] Enforce unique opponent shirt numbers and names in full mode.
- [ ] Demonstrate all modes and service rejection of cross-team/ineligible athletes.

Entering an opponent name creates a local match record; it does **not** arrange a fixture with another Gaffer user.

Evidence: [start-match contract](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/events/events.schemas.ts), [opponent setup](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/pages/OpponentSquadSetupPage.tsx).

## PB-08 — Live match logging

**Status:** Implemented — acceptance verification pending.

- [x] Persist clock state and match events through REST.
- [x] Record goals, assists, key passes, cards, substitutions, penalties and injuries.
- [x] Attribute entries to own athletes or configured/free-text opponents.
- [x] Use match-scoped request IDs to avoid duplicate creates.
- [ ] Demonstrate score/timeline/stat changes and recovery from an API error.

Evidence: [match API](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/matches), [live UI](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/pages/LiveMatchPage.tsx).

## PB-09 — Event corrections and deletion

**Status:** Implemented — acceptance verification pending.

- [x] Edit event type, participant, minute and detail after logging.
- [x] Add and delete events from the match report flow.
- [x] Mark adjusted records and recompute affected score/stat data in services.
- [ ] Demonstrate linked assist/substitution corrections and final consistency.

Evidence: [event form planner](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/features/matches/match-report-event-form.ts), [match service](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/matches/matches.service.ts).

## PB-10 — Athlete and team statistics

**Status:** Implemented — acceptance verification pending.

- [x] Team totals/recent form and athlete goals, assists, cards and appearances exist.
- [x] Athlete detail is available from statistics and roster contexts.
- [x] Filters and chart models exist.
- [ ] Reconcile displayed totals against a known event sequence during acceptance.

Evidence: [statistics service](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/statistics/statistics.service.ts), [statistics UI](https://github.com/nayan-m15/Gaffer/tree/main/frontend/src/features/statistics).

## PB-11 — Seasons, trends and comparisons

**Status:** Implemented — acceptance verification pending.

- [x] Coach-managed non-overlapping season ranges and one current season.
- [x] Season trend charts and period comparisons.
- [x] Comparison UI for two or three athletes.
- [ ] Demonstrate boundary dates, empty states and cross-season accuracy.

Evidence: [seasons module](https://github.com/nayan-m15/Gaffer/tree/main/backend/src/seasons), [trend model](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/features/statistics/season-trends-model.ts).

## PB-12 — Competitions and league standings

**Status:** Implemented — acceptance verification pending (manual data entry).

- [x] Competition CRUD and season link exist.
- [x] Standings rows can be created, changed and deleted with unique position/name rules.
- [x] Player standings view exists.
- [ ] Demonstrate validation and ordering.

Standings are not automatically calculated because Gaffer does not track every other team's fixtures.

## PB-13 — Location and weather information

**Status:** Implemented — acceptance verification pending.

- [x] Server-side Open-Meteo place search and hourly forecast.
- [x] Missing-location, out-of-range, cancelled and unavailable states.
- [x] 30-minute default cache and bounded stale-cache fallback.
- [ ] Demonstrate available and failure states without assuming provider uptime.

Evidence: [weather service](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/weather/weather.service.ts), [location endpoint](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/weather/locations.controller.ts).

## PB-14 — Event reminders

**Status:** Implemented — acceptance verification pending for Trello card #77's in-app scope; additional notification channels planned separately.

- [x] Show scheduled events occurring in the next 24 hours on dashboards.
- [x] Dismiss a reminder on the current device using local storage.
- [ ] Email/push/background notifications are not implemented.
- [ ] Cross-device reminder state is not implemented.

Evidence: [reminder model](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/features/reminders/upcomingReminders.ts).

## PB-15 — Offline event logging

**Status:** Planned.

- [ ] Persist event commands in a durable offline client store.
- [ ] Show pending/sent/failed status and retry safely.
- [ ] Resolve ordering/conflicts on reconnect and test airplane-mode recovery.

Local component form state and a server idempotency key do not meet this story.

## PB-16 — Collaborative live synchronisation

**Status:** Planned.

- [ ] Authenticate socket connections and authorise a match room.
- [ ] Broadcast create/update/delete/clock changes to other connected members.
- [ ] Handle reconnect, ordering and duplicates; add multi-client tests.

Socket.io packages and an adapter alone do not meet this story.

## PB-17 — Report export and sharing

**Status:** Planned (in-app report is implemented).

- [x] Display match report, charts and editable event history in the application.
- [ ] Generate a downloadable report file.
- [ ] Define access/privacy for share links and test exported content.

## PB-18 — Platform fixture arrangement

**Status:** Planned.

- [ ] Discover or invite another platform team.
- [ ] Send, accept/decline and update a fixture proposal.
- [ ] Create consistent calendar records for both teams.

## PB-19 — Account recovery and deletion

**Status:** Planned.

- [ ] Password-reset request/token/confirmation flow.
- [ ] Authenticated account deletion with defined ownership/history policy.
- [ ] Security and data-retention tests.

## PB-20 — Advanced product candidates

**Status:** Planned.

Public squad pages, automatic season scheduling/clash detection, alternative football formats, automated insights and player-selection suggestions require separate refinement, privacy review and acceptance criteria. No completion evidence is claimed.

## Retained implemented features outside PB-01–PB-26 detail

- **Profile management:** implemented; traced to [#53](https://trello.com/c/PpO7KIjF/53-s1-09-user-profile-management). Acceptance verification pending.
- **Dashboard:** implemented active-athlete/event counts, five upcoming events, five recent completed matches, current-season record and recent rate statistics; traced to [#38](https://trello.com/c/jzuY2wxk/38-s1-05-dashboard-summary). It refreshes through normal REST/query behaviour, not WebSocket push.
- **Public informational pages:** landing, How It Works, Features, privacy and terms pages are implemented; traced to [#52](https://trello.com/c/B9P9W2ON/52-s1-08-how-it-works-page), [#54](https://trello.com/c/O92Dliwx/54-s1-10-features-page) and [#128](https://trello.com/c/KrQufWs6/128-s2-add-privacy-policy-and-terms-of-service). These are not public squad/player data pages.
- **Account recovery/deletion:** Potential Features card [#130](https://trello.com/c/HG4lWTcB/130-add-account-deletion-email-change-password-reset-and-password-change) is active and unassigned. Implementation was not found.

## Prioritisation and ownership

The Trello export supplies current assignments, list status and checklist progress; these are recorded on the [Sprint 2 Delivery page](sprint-2-delivery.md). It does not fully reconstruct the original commitment or prove independent acceptance. A team-approved Definition of Done remains unresolved on Trello card #34.
