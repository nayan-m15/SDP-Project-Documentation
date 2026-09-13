# Product Backlog

**Status basis:** application source at `aadf745e` and deployed API recheck on 13 September 2026. Status describes implementation evidence, not an agreed Sprint 2 commitment, owner assignment, stakeholder acceptance or test result.

## Status definitions

- **Implemented — acceptance verification pending:** the end-to-end code path exists, but supplied evidence does not demonstrate every acceptance check.
- **Partial:** only a separable subset exists.
- **Planned:** required implementation was not found.

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
- [x] Comparison UI for up to four athletes.
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

**Status:** Partial.

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

## Prioritisation and ownership

This document does not reconstruct a Sprint 2 commitment or infer assignees from branches/commits. Priority, ownership, accepted scope and Definition of Done require the team's planning/tracker evidence. Existing meeting documents remain available in the site navigation.

