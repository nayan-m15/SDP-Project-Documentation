# Sprint 2 Delivery Record

> **Snapshot:** 14 September 2026. Trello records **13 active cards in Completed**, zero in Sprint 2 Backlog and zero active in In Progress. This is current board state, not proof of the original Sprint 2 commitment, independent acceptance, deployment, or stakeholder approval. Application source was inspected at `e7285f533b854c4da753c73e22a2a38f580588dc`.

## Completed register

| Card | Exact owner(s) | Checklist | Source evidence |
| --- | --- | ---: | --- |
| [#66 — S2: Assistant Role and Permissions](https://trello.com/c/kCKi09ea/66-s2-assistant-role-and-permissions) | Ayesha Ally | 5/5 | [Team access source](https://github.com/nayan-m15/Gaffer/blob/development/backend/src/common/team-access.ts) |
| [#67 — S2: Live Event Logging](https://trello.com/c/FeahTBSE/67-s2-live-event-logging) | Roko Vidjak | 5/5 | [Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches) |
| [#70 — S2: Event and Team Statistics](https://trello.com/c/KFDDIj0d/70-s2-event-and-team-statistics) | Hemesh Parshotam, Roko Vidjak | 5/5 | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#69 — S2: Athlete Statistics](https://trello.com/c/L6mvVSzk/69-s2-athlete-statistics) | Ayesha Ally | 5/5 | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#71 — S2: Season Statistics and Trends](https://trello.com/c/1vhuPSwf/71-s2-season-statistics-and-trends) | Saurav Lall | 5/5 | [Seasons source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/seasons) |
| [#133 — S2: API for Team Formation and Tactics](https://trello.com/c/YZMvbXlb/133-s2-api-for-team-formation-and-tactics) | Saurav Lall | 5/5 | [Public API source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/public-api) |
| [#72 — S3: Performance Comparisons](https://trello.com/c/gMYOG8Fe/72-s3-performance-comparisons) | Saurav Lall | 4/4 | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#74 — S2: Player RSVPs, Roles and permissions](https://trello.com/c/rHGqemSt/74-s2-player-rsvps-roles-and-permissions) | Jai Parbhoo | 5/5 | [Player and RSVP source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/player) |
| [#75 — S2: Shared Calendar](https://trello.com/c/4rqouzCz/75-s2-shared-calendar) | Hemesh Parshotam, Nayan Makanjee | 5/5 | [Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events) |
| [#68 — S2: Event Log Correction](https://trello.com/c/wy2UgcLj/68-s2-event-log-correction) | Roko Vidjak | 5/5 | [Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches) |
| [#76 — S2: Weather and Location Information](https://trello.com/c/4yss4qLJ/76-s2-weather-and-location-information) | Hemesh Parshotam | 5/5 | [Weather source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/weather) |
| [#128 — S2: Add Privacy Policy and Terms of Service](https://trello.com/c/KrQufWs6/128-s2-add-privacy-policy-and-terms-of-service) | Nayan Makanjee | 5/5 | [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages) |
| [#77 — S2: Event Reminders](https://trello.com/c/IUtmDU9s/77-s2-event-reminders) | Ayesha Ally | 5/5 | [Reminder UI source](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/features/reminders) |

## Interpretation notes

- Card #72 is labelled and titled **S3: Performance Comparisons**. Its present location is Completed, but the export does not establish that it was part of the original Sprint 2 commitment.
- Card #72 has a semantic mismatch: its title says “Performance Comparisons”, while its exported checklist describes competitions and standings. Both are reproduced without rewriting the Trello history.
- Card #133 records the formations/tactics public API as Completed. Source and tests exist, but all four documented deployed route URLs returned HTTP 404 on 14 September 2026; deployment verification remains pending.
- Checked items reproduce exported Trello state only. See [Sprint 2 Evidence](sprint-2-evidence.md) and [Testing and QA](../Quality/testing-and-qa.md) for separately classified evidence.

### [#66 — S2: Assistant Role and Permissions](https://trello.com/c/kCKi09ea/66-s2-assistant-role-and-permissions)

- **Current list:** Completed
- **Owner(s):** Ayesha Ally
- **Archived:** No
- **Historical PB mapping:** PB-06
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Team access source](https://github.com/nayan-m15/Gaffer/blob/development/backend/src/common/team-access.ts)

**Exported description/user story**

As a coach, I want assistants and players to join with appropriate permissions so that access is controlled.

**Exported checklist state**

_Checklist_

- [x] Define supported roles and permissions
- [x]  Implement backend permission checks
- [x]  Add role-management functionality
- [x]  Restrict relevant UI/actions based on permissions
- [x]  Test authorised and unauthorised access


### [#67 — S2: Live Event Logging](https://trello.com/c/FeahTBSE/67-s2-live-event-logging)

- **Current list:** Completed
- **Owner(s):** Roko Vidjak
- **Archived:** No
- **Historical PB mapping:** PB-07
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches)

**Exported description/user story**

**User Story:**
As a coach, I want to record events during a live match so that match activity and player performance can be tracked accurately.

The live event logger should allow coaches to record important match events against the relevant athletes while a match is taking place.

### Acceptance Criteria

- Coaches can start/use the logger for a match.
- Match events can be recorded against the appropriate athlete.
- Supported events include relevant actions such as goals/scores and penalties.
- Logged events are saved and associated with the correct match.
- The interface is suitable for quick use during a live game.

**Exported checklist state**

_Checklist_

- [x] Implement live match event logger
- [x]  Support required event types
- [x]  Link logged events to athletes and matches
- [x]  Save event data through the backend
- [x]  Test the complete live-logging flow


### [#70 — S2: Event and Team Statistics](https://trello.com/c/KFDDIj0d/70-s2-event-and-team-statistics)

- **Current list:** Completed
- **Owner(s):** Hemesh Parshotam, Roko Vidjak
- **Archived:** No
- **Historical PB mapping:** PB-10
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)

**Exported description/user story**

**User Story:**
As a coach, I want to view event and team statistics so that I can analyse the team's overall performance.

The system should calculate and display useful statistics using data recorded from matches and logged events.

### Acceptance Criteria

- Team statistics are derived from recorded match/event data.
- Statistics correspond to the appropriate team.
- Coaches can view useful performance information from completed events.
- Statistics update as relevant match data becomes available.
- Missing data is handled appropriately.

**Exported checklist state**

_Checklist_

- [x] Determine required team/event statistics
- [x]  Calculate statistics from logged data
- [x]  Implement statistics API/data retrieval
- [x]  Display statistics in the frontend
- [x]  Test statistics against known match data


### [#69 — S2: Athlete Statistics](https://trello.com/c/L6mvVSzk/69-s2-athlete-statistics)

- **Current list:** Completed
- **Owner(s):** Ayesha Ally
- **Archived:** No
- **Historical PB mapping:** PB-09
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)

**Exported description/user story**

**User Story:**
As a coach, I want to view statistics for individual athletes so that I can evaluate player performance and make informed coaching decisions.

Athlete statistics should be calculated from recorded match events and presented clearly for each player.

### Acceptance Criteria

- Coaches can view statistics for an individual athlete.
- Statistics are derived from the athlete's recorded match events.
- Statistics correspond to the correct athlete and team.
- Relevant performance measures are displayed clearly.
- Athletes with limited/no data are handled appropriately.

**Exported checklist state**

_Checklist_

- [x] Define required athlete statistics
- [x]  Calculate statistics from event data
- [x]  Connect statistics to individual athletes
- [x]  Display statistics on the athlete/statistics UI
- [x]  Test calculations using known event data


### [#71 — S2: Season Statistics and Trends](https://trello.com/c/1vhuPSwf/71-s2-season-statistics-and-trends)

- **Current list:** Completed
- **Owner(s):** Saurav Lall
- **Archived:** No
- **Historical PB mapping:** PB-11
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Seasons source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/seasons)

**Exported description/user story**

**User Story:**
As a coach, I want to view statistics and performance trends across a season so that I can understand how my team and athletes are performing over time.

The system should aggregate data from multiple matches and present meaningful season-level statistics and trends.

### Acceptance Criteria

- Statistics can be aggregated across multiple matches.
- Season statistics use data from the appropriate team and season.
- Coaches can identify changes or trends in performance over time.
- Team and/or athlete performance can be compared across relevant matches.
- The information is presented in an understandable format.

**Exported checklist state**

_Checklist_

- [x] Define season-level statistics
- [x]  Aggregate statistics across matches
- [x]  Implement trend calculations
- [x]  Display season statistics and trends
- [x]  Test aggregation using multiple matches


### [#133 — S2: API for Team Formation and Tactics](https://trello.com/c/YZMvbXlb/133-s2-api-for-team-formation-and-tactics)

- **Current list:** Completed
- **Owner(s):** Saurav Lall
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Public API source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/public-api)

**Exported description/user story**

Implement and document a **public, read-only API** for Gaffer’s football formations and tactical approaches.

The API must allow external users/applications to retrieve supported formation and tactic reference data without authentication, while ensuring that **no team, player, coach, account, email or session data is exposed**.

The implementation includes the `/v1/formations` and `/v1/tactics` endpoints, optional filtering by ID, consistent JSON response structures, error handling, CORS configuration for the public routes, and interactive Swagger API documentation.

The API should be accessible through both the Gaffer frontend proxy and the deployed backend and must remain `GET`-only.

**Exported checklist state**

_Checklist_

- [x] Implement public GET /v1/formations and GET /v1/tactics endpoints
- [x] Support filtering by ID and return the correct formation/tactic data
- [x] Add proper response structure and error handling for 400, 404, and 500
- [x] Keep the API read-only and ensure no private team, player, coach, or account data is exposed
- [x] Add Swagger/API documentation and test that both endpoints work externally


### [#72 — S3: Performance Comparisons](https://trello.com/c/gMYOG8Fe/72-s3-performance-comparisons)

- **Current list:** Completed
- **Owner(s):** Saurav Lall
- **Archived:** No
- **Historical PB mapping:** PB-12
- **Exported checklist progress:** 4/4
- **Implementation/evidence:** [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)

**Exported description/user story**

As a coach, I want to compare athletes and team performance so that I can make more informed coaching decisions.

**Exported checklist state**

_Checklist_

- [x] Competition CRUD and season link exist.
- [x] Standings rows can be created, changed and deleted with unique position/name rules.
- [x] Player standings view exists.
- [x] Demonstrate validation and ordering.


### [#74 — S2: Player RSVPs, Roles and permissions](https://trello.com/c/rHGqemSt/74-s2-player-rsvps-roles-and-permissions)

- **Current list:** Completed
- **Owner(s):** Jai Parbhoo
- **Archived:** No
- **Historical PB mapping:** PB-14
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Player and RSVP source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/player)

**Exported description/user story**

As a coach, I want players to indicate their availability for upcoming activities so that I can plan attendance and team selection.

**Exported checklist state**

_Checklist_

- [x] Allow players to RSVP to upcoming activities
- [x]  Support available/unavailable response
- [x]  Display RSVP status to coach
- [x]  Restrict actions based on user role
- [x]  Test player and coach permissions


### [#75 — S2: Shared Calendar](https://trello.com/c/4rqouzCz/75-s2-shared-calendar)

- **Current list:** Completed
- **Owner(s):** Hemesh Parshotam, Nayan Makanjee
- **Archived:** No
- **Historical PB mapping:** PB-15
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events)

**Exported description/user story**

As a user, I want upcoming training sessions, fixtures and competitions displayed on a shared calendar so that I can keep track of the team's schedule.

**Exported checklist state**

_Checklist_

- [x] Display upcoming team events in calendar
- [x]  Show training, fixtures and competitions
- [x]  Allow users to view event details
- [x]  Keep calendar updated when events change
- [x]  Test coach/player calendar access


### [#68 — S2: Event Log Correction](https://trello.com/c/wy2UgcLj/68-s2-event-log-correction)

- **Current list:** Completed
- **Owner(s):** Roko Vidjak
- **Archived:** No
- **Historical PB mapping:** PB-08
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches)

**Exported description/user story**

**User Story:**
As a coach, I want to correct incorrectly logged match events so that match records and derived statistics remain accurate.

Mistakes may occur while quickly recording a live match. Coaches therefore need a controlled way to correct erroneous event-log entries.

### Acceptance Criteria

- Coaches can identify previously logged events.
- Incorrect events can be corrected where permitted.
- Corrections are saved correctly.
- Statistics affected by a correction reflect the corrected information.
- Corrections do not corrupt unrelated match data.

**Exported checklist state**

_Checklist_

- [x] Add ability to select logged events for correction
- [x]  Implement event correction functionality
- [x]  Persist corrected event data
- [x]  Ensure derived statistics reflect corrections
- [x]  Test common correction scenarios


### [#76 — S2: Weather and Location Information](https://trello.com/c/4yss4qLJ/76-s2-weather-and-location-information)

- **Current list:** Completed
- **Owner(s):** Hemesh Parshotam
- **Archived:** No
- **Historical PB mapping:** PB-16
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Weather source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/weather)

**Exported description/user story**

As a coach, I want weather and location information for upcoming events so that I can prepare the team appropriately.

**Exported checklist state**

_Checklist_

- [x] Display event location
- [x]  Show weather for upcoming events
- [x]  Link weather/location to correct event
- [x]  Handle unavailable weather/location data
- [x]  Test event information display


### [#128 — S2: Add Privacy Policy and Terms of Service](https://trello.com/c/KrQufWs6/128-s2-add-privacy-policy-and-terms-of-service)

- **Current list:** Completed
- **Owner(s):** Nayan Makanjee
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages)

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_Checklist_

- [x] Create Privacy Policy page
- [x]  Create Terms of Service page
- [x]  Add links to policies in app
- [x]  Make pages accessible before sign-in
- [x]  Test links and mobile layout


### [#77 — S2: Event Reminders](https://trello.com/c/IUtmDU9s/77-s2-event-reminders)

- **Current list:** Completed
- **Owner(s):** Ayesha Ally
- **Archived:** No
- **Historical PB mapping:** PB-17
- **Exported checklist progress:** 5/5
- **Implementation/evidence:** [Reminder UI source](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/features/reminders)

**Exported description/user story**

As a user, I want reminders about upcoming team activities so that I do not miss important events.

**Exported checklist state**

_Checklist_

- [x] Detect events within next 24 hours
- [x]  Display reminder on coach dashboard
- [x]  Display reminder on player dashboard
- [x]  Allow reminders to be dismissed
- [x]  Persist dismissed reminders
