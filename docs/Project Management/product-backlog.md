# Product Backlog

> **Trello export snapshot:** latest recorded action 2026-09-24T19:20:21.943Z; audited 24 September 2026. Application source: `ef2880ad0018536c2b933754148e285b2a325ec7`. List placement and checklist completion are tracker evidence only. The live board was not independently compared in this update.

## Active card counts

| Trello list | Active cards |
| --- | ---: |
| Sprint 1 Backlog | 10 |
| Sprint 2 Backlog | 13 |
| Sprint 3 Backlog | 4 |
| In Progress | 4 |
| Completed | 3 |
| Backlog | 0 |
| Potential Features/Additions | 17 |
| Repo & project setup | 14 |
| Environment & tooling init | 15 |
| Setup | 2 |
| Issues/fixes | 56 |

Issues/fixes cards have their own [bug register](bug-tracking.md). Historical Sprint 1 and Sprint 2 cards remain in their named lists in this export.

## Sprint 1 Backlog

| Card | Owners | Exported description |
| --- | --- | --- |
| [#40 — S1-01: Documentation Site](https://trello.com/c/O2f6vDPm) | Hemesh Parshotam, Nayan Makanjee | **Description** > Create and maintain a central documentation site so that the development team can easily access the project's technical and development documentation. **Acceptance Criteria** - Documentation site is available to the development team. - Existi |
| [#35 — S1-02: User Authentication](https://trello.com/c/3ZIEzf2l) | Nayan Makanjee, Saurav Lall, Roko Vidjak, Jai Parbhoo | **Description** > As a coach, I want to securely register, log in and log out of the Sporting Coach system so that I can access and manage my team's information. **Acceptance Criteria** - Coach can register using an email address and password. - Coach can prov |
| [#36 — S1-03: Athlete Roster Management](https://trello.com/c/AU3nh5bK) | Ayesha Ally | **Description** > As a coach, I want to add, view, edit, search and archive athletes so that I can maintain an accurate and organised team roster. **Acceptance Criteria** - Coach can add a new athlete. - Coach can view all athletes belonging to their team. - C |
| [#37 — S1-04: Event Management](https://trello.com/c/opUO7Scg) | Roko Vidjak | **Description** > As a coach, I want to create, view, edit and cancel team events so that I can organise training sessions, matches and meetings for my team. **Acceptance Criteria** - Coach can create an event. - Coach can view their team's events. - Coach can |
| [#38 — S1-05: Dashboard Summary](https://trello.com/c/jzuY2wxk) | Nayan Makanjee, Jai Parbhoo | **Description** > As a coach, I want to see a summary of my athletes and upcoming events so that I can quickly understand the current state of my team and upcoming activities. **Acceptance Criteria** - Dashboard displays the number of active athletes. - Dashbo |
| [#44 — S1-06: Statistical Overview](https://trello.com/c/1JfVLaM8) | Jai Parbhoo | As a coach, I want to view an overview of my team's and athletes' statistics so that I can quickly understand performance and identify trends across events. **Acceptance Criteria** - Coach can view an overview of team statistics. - Coach can view statistics fo |
| [#39 — S1-07: Automated Testing](https://trello.com/c/IPDaf8KK) | Saurav Lall | **Description** > Implement automated testing for the core Sprint 1 functionality to ensure authentication, athlete management, event management and team isolation work correctly and reliably. **Acceptance Criteria** - Authentication flow has automated integra |
| [#52 — S1-08 How It Works Page](https://trello.com/c/B9P9W2ON) | Nayan Makanjee | As a user, I want to view a How It Works page so that I can understand how to use the Sport Coaching Tool and its main functionality. |
| [#53 — S1-09 User Profile Management](https://trello.com/c/PpO7KIjF) | Ayesha Ally | **User Story:** **As a logged-in user, I want to view and edit my profile so that I can keep my personal/account information up to date.** Implement a profile page where the authenticated user can view their existing profile information and update the fields t |
| [#54 — S1-10 Features Page](https://trello.com/c/O92Dliwx) | Hemesh Parshotam | **User Story:** **As a user, I want to view the features offered by the Sport Coaching Tool so that I can understand what the application can help me do.** Create a user-facing Features page that presents and explains the main capabilities available within the |

## Sprint 2 Backlog

| Card | Owners | Exported description |
| --- | --- | --- |
| [#67 — S2: Live Event Logging](https://trello.com/c/FeahTBSE) | Roko Vidjak | **User Story:** As a coach, I want to record events during a live match so that match activity and player performance can be tracked accurately. The live event logger should allow coaches to record important match events against the relevant athletes while a m |
| [#66 — S2: Assistant Role and Permissions](https://trello.com/c/kCKi09ea) | Ayesha Ally | As a coach, I want assistants and players to join with appropriate permissions so that access is controlled. |
| [#70 — S2: Event and Team Statistics](https://trello.com/c/KFDDIj0d) | Hemesh Parshotam, Roko Vidjak | **User Story:** As a coach, I want to view event and team statistics so that I can analyse the team's overall performance. The system should calculate and display useful statistics using data recorded from matches and logged events. ### Acceptance Criteria - T |
| [#69 — S2: Athlete Statistics](https://trello.com/c/L6mvVSzk) | Ayesha Ally | **User Story:** As a coach, I want to view statistics for individual athletes so that I can evaluate player performance and make informed coaching decisions. Athlete statistics should be calculated from recorded match events and presented clearly for each play |
| [#71 — S2: Season Statistics and Trends](https://trello.com/c/1vhuPSwf) | Saurav Lall | **User Story:** As a coach, I want to view statistics and performance trends across a season so that I can understand how my team and athletes are performing over time. The system should aggregate data from multiple matches and present meaningful season-level  |
| [#133 — S2: API for Team Formation and Tactics](https://trello.com/c/YZMvbXlb) | Saurav Lall | Implement and document a **public, read-only API** for Gaffer’s football formations and tactical approaches. The API must allow external users/applications to retrieve supported formation and tactic reference data without authentication, while ensuring that ** |
| [#72 — S3: Performance Comparisons](https://trello.com/c/gMYOG8Fe) | Saurav Lall | As a coach, I want to compare athletes and team performance so that I can make more informed coaching decisions. |
| [#74 — S2: Player RSVPs, Roles and permissions](https://trello.com/c/rHGqemSt) | Jai Parbhoo | As a coach, I want players to indicate their availability for upcoming activities so that I can plan attendance and team selection. |
| [#75 — S2: Shared Calendar](https://trello.com/c/4rqouzCz) | Hemesh Parshotam, Nayan Makanjee | As a user, I want upcoming training sessions, fixtures and competitions displayed on a shared calendar so that I can keep track of the team's schedule. |
| [#68 — S2: Event Log Correction](https://trello.com/c/wy2UgcLj) | Roko Vidjak | **User Story:** As a coach, I want to correct incorrectly logged match events so that match records and derived statistics remain accurate. Mistakes may occur while quickly recording a live match. Coaches therefore need a controlled way to correct erroneous ev |
| [#76 — S2: Weather and Location Information](https://trello.com/c/4yss4qLJ) | Hemesh Parshotam | As a coach, I want weather and location information for upcoming events so that I can prepare the team appropriately. |
| [#128 — S2: Add Privacy Policy and Terms of Service](https://trello.com/c/KrQufWs6) | Nayan Makanjee | No description in export |
| [#77 — S2: Event Reminders](https://trello.com/c/IUtmDU9s) | Ayesha Ally | As a user, I want reminders about upcoming team activities so that I do not miss important events. |

## Sprint 3 Backlog

| Card | Owners | Exported description |
| --- | --- | --- |
| [#86 — S3: Alternative Football Formats](https://trello.com/c/clwOaaP3) | Jai Parbhoo | No description in export |
| [#81 — S3: Automated Performance Insights](https://trello.com/c/tyi8IZ7F) | Saurav Lall | No description in export |
| [#82 — S3: Player Selection Suggestions](https://trello.com/c/2UP8CQAb) | Ayesha Ally | No description in export |
| [#85 — S3: Automatic Season Scheduling](https://trello.com/c/BhSiymWN) | Saurav Lall | No description in export |

## In Progress

| Card | Owners | Exported description |
| --- | --- | --- |
| [#73 — S3: Fixtures Setup with Opponents](https://trello.com/c/aX7Zsfza) | Ayesha Ally, Jai Parbhoo | ‌ As a coach, I want to organise fixtures with other teams so that upcoming competitions can be coordinated through the platform. |
| [#80 — S3: League and Standings Management](https://trello.com/c/DQMVQqjx) | Jai Parbhoo | No description in export |
| [#79 — S3: Concurrent Event Logging](https://trello.com/c/VENCiu0p) | Hemesh Parshotam | No description in export |
| [#84 — S3: Sharing and Report Export](https://trello.com/c/7dWBTlFi) | Nayan Makanjee | As a coach, I want to share results and export reports so that team and performance information can be distributed outside the platform. |

## Completed

| Card | Owners | Exported description |
| --- | --- | --- |
| [#104 — S3: Injured player - detailed injury reports and 3D model](https://trello.com/c/FWH0WhOe) | Saurav Lall | No description in export |
| [#83 — S3: Public Squad and Player Information](https://trello.com/c/zO3SXWRm) | Nayan Makanjee | No description in export |
| [#78 — S3: Offline Event Logging](https://trello.com/c/cCbQvUoL) | Hemesh Parshotam | No description in export |

## Potential Features/Additions

| Card | Owners | Exported description |
| --- | --- | --- |
| [#143 — Ai voice assistant](https://trello.com/c/2kSCeUxn) | Unassigned | No description in export |
| [#138 — Suspend player after accumulating 5 yellow cards in a specific competition](https://trello.com/c/G1Bm1JrR) | Unassigned | No description in export |
| [#134 — Mini Map for directions](https://trello.com/c/TybTtvzU) | Unassigned | No description in export |
| [#130 — Add account deletion, email change, password reset and password change](https://trello.com/c/HG4lWTcB) | Unassigned | No description in export |
| [#123 — Update Match Report Page UI](https://trello.com/c/GJORvXYd) | Unassigned | No description in export |
| [#119 — make match log appear as a separate tab on mobile live logger](https://trello.com/c/qUQeDbF8) | Unassigned | No description in export |
| [#117 — When making a match event, the tournament should be an option for the coach to pick](https://trello.com/c/6yM7Zd88) | Unassigned | No description in export |
| [#110 — Add League or friendly match option](https://trello.com/c/z4VIY2DZ) | Jai Parbhoo | No description in export |
| [#58 — Make it usebale for Indoor Footy, 5,7 a side games](https://trello.com/c/TUsmzRrc) | Unassigned | No description in export |
| [#95 — Add more formations](https://trello.com/c/3KNV8uEW) | Unassigned | No description in export |
| [#96 — import calander to local mobile calendar](https://trello.com/c/9u5HPrgR) | Unassigned | No description in export |
| [#124 — Update Live Logger page Ui](https://trello.com/c/Cm3qltKa) | Hemesh Parshotam | No description in export |
| [#59 — Allow players to view their squad and coaching info when not signed  in](https://trello.com/c/pBUAuzSB) | Nayan Makanjee | No description in export |
| [#97 — Player dashboard - through coach invitation](https://trello.com/c/Pi4GGcyM) | Jai Parbhoo | Stats, team/individual Events- attending Team lineups/tactics |
| [#98 — Update Events page to include calander](https://trello.com/c/uNwVxtaW) | Nayan Makanjee, Hemesh Parshotam | No description in export |
| [#108 — Add footer to landing page](https://trello.com/c/41uWFgnu) | Nayan Makanjee | No description in export |
| [#113 — Add Loading Screen](https://trello.com/c/8sEDirRi) | Nayan Makanjee | No description in export |

## Repo & project setup

| Card | Owners | Exported description |
| --- | --- | --- |
| [#16 — Add PR template (matches your PR description format)](https://trello.com/c/GdITLLqz) | Unassigned | No description in export |
| [#20 — Add GitHub Actions CI skeleton (lint + test placeholder, even if empty)](https://trello.com/c/bzmQcX3c) | Unassigned | No description in export |
| [#17 — Add branch protection on main — require CI pass + 1 approval](https://trello.com/c/Y1lzGPX7) | Unassigned | No description in export |
| [#15 — Set up Issue templates (bug / feature)](https://trello.com/c/t2mOWAQQ) | Unassigned | No description in export |
| [#18 — Add README skeleton with AI usage declaration section](https://trello.com/c/orE9Pf8r) | Unassigned | No description in export |
| [#3 — Project Nest.js setup](https://trello.com/c/VimbdgsG) | Nayan Makanjee | No description in export |
| [#12 — Decide monorepo vs separate frontend/backend repos](https://trello.com/c/NohAwdzb) | Unassigned | No description in export |
| [#13 — Create repo(s), initial folder structure](https://trello.com/c/tcJCUZBJ) | Nayan Makanjee | No description in export |
| [#30 — Share the git methodology doc](https://trello.com/c/5HjiapZu) | Hemesh Parshotam | No description in export |
| [#34 — Agree on a "definition of done" for a task/PR](https://trello.com/c/Zj7jztqS) | Unassigned | No description in export |
| [#33 — Schedule recurring check-ins with your tutor/client](https://trello.com/c/vL0Kvm3C) | Unassigned | No description in export |
| [#32 — Set up team comms channel (Discord)](https://trello.com/c/rWBnQQjv) | Jai Parbhoo | No description in export |
| [#31 — Assign module ownership pairs: auth, roster, events, stats](https://trello.com/c/gkdNqgJr) | Unassigned | No description in export |
| [#19 — Add OXLint + Prettier config](https://trello.com/c/yGClbaPs) | Nayan Makanjee | No description in export |

## Environment & tooling init

| Card | Owners | Exported description |
| --- | --- | --- |
| [#11 — PowerSync (offline sync service)](https://trello.com/c/n1gs99Vw) | Hemesh Parshotam | No description in export |
| [#10 — OpenWeatherMap (weather API key)](https://trello.com/c/PaHsnvf3) | Hemesh Parshotam | No description in export |
| [#9 — Mapbox (maps + geocoding API key)](https://trello.com/c/Vb45cjxj) | Hemesh Parshotam | No description in export |
| [#29 — Connect Vercel to frontend repo](https://trello.com/c/Rq2J9JEU) | Nayan Makanjee | No description in export |
| [#21 — Scaffold frontend: Vite + React + TS](https://trello.com/c/XiHqMsLd) | Nayan Makanjee | No description in export |
| [#22 — Add Tailwind + shadcn/ui](https://trello.com/c/e1VTiOHL) | Nayan Makanjee | No description in export |
| [#23 — Scaffold backend: NestJS + TS](https://trello.com/c/N2UHYREV) | Nayan Makanjee | No description in export |
| [#24 — Install nestjs-zod, Drizzle, better-auth](https://trello.com/c/Bp1j2Ell) | Nayan Makanjee | No description in export |
| [#25 — Create Neon project, get connection string](https://trello.com/c/mw1laYwl) | Hemesh Parshotam | No description in export |
| [#26 — Set up Drizzle config + first migration (base schema: users, teams, athletes, events)](https://trello.com/c/MNObudO4) | Hemesh Parshotam, Nayan Makanjee | No description in export |
| [#27 — Add .env.example for both frontend and backend](https://trello.com/c/YWJdjNpK) | Hemesh Parshotam, Nayan Makanjee | No description in export |
| [#6 — Neon (Postgres hosting)](https://trello.com/c/cBk24ukJ) | Nayan Makanjee, Hemesh Parshotam | No description in export |
| [#7 — Render (backend hosting)](https://trello.com/c/MiCV84mk) | Hemesh Parshotam | No description in export |
| [#8 — Vercel (frontend hosting)](https://trello.com/c/GDwwHaSu) | Nayan Makanjee | No description in export |
| [#28 — Connect Railway to backend repo, add Neon connection string as secret](https://trello.com/c/k0NcOL9O) | Hemesh Parshotam | No description in export |

## Setup

| Card | Owners | Exported description |
| --- | --- | --- |
| [#1 — Project name](https://trello.com/c/oYRKKkMj) | Unassigned | No description in export |
| [#2 — Project Logo](https://trello.com/c/MY8eTUdS) | Unassigned | No description in export |

## Historical detailed snapshot (14 September 2026)

The following register preserves earlier card descriptions and checklist detail. Its list placements are superseded by the current export above.

# Product Backlog

> **Snapshot:** 14 September 2026. Source: Trello board export with activity through 2026-09-14T11:49:45.592Z. Trello is authoritative for list, assignment, archive and checklist state; application source at `e7285f533b854c4da753c73e22a2a38f580588dc` is authoritative for implementation. A checked Trello item is recorded board state, not independent acceptance or stakeholder approval.

## Snapshot counts

| List | Active cards |
| --- | ---: |
| Sprint 1 Backlog | 10 |
| Completed | 13 |
| Backlog | 10 |

Cards below preserve Trello list and card order. Trello card numbers are canonical; historical PB identifiers are secondary traceability only.

## Register

| Card | Current list | Owner(s) | Archived | Checklist | Historical PB | Implementation/evidence |
| --- | --- | --- | --- | ---: | --- | --- |
| [#40 — S1-01: Documentation Site](https://trello.com/c/O2f6vDPm/40-s1-01-documentation-site) | Sprint 1 Backlog | Hemesh Parshotam, Nayan Makanjee | No | 8/8 | — | [Documentation repository](https://github.com/nayan-m15/SDP-Project-Documentation) |
| [#35 — S1-02: User Authentication](https://trello.com/c/3ZIEzf2l/35-s1-02-user-authentication) | Sprint 1 Backlog | Nayan Makanjee, Saurav Lall, Roko Vidjak, Jai Parbhoo | No | 23/23 | PB-01 | [Authentication source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/auth) |
| [#36 — S1-03: Athlete Roster Management](https://trello.com/c/AU3nh5bK/36-s1-03-athlete-roster-management) | Sprint 1 Backlog | Ayesha Ally | No | 26/26 | PB-02 | [Athletes source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/athletes) |
| [#37 — S1-04: Event Management](https://trello.com/c/opUO7Scg/37-s1-04-event-management) | Sprint 1 Backlog | Roko Vidjak | No | 28/28 | PB-03 | [Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events) |
| [#38 — S1-05: Dashboard Summary](https://trello.com/c/jzuY2wxk/38-s1-05-dashboard-summary) | Sprint 1 Backlog | Nayan Makanjee, Jai Parbhoo | No | 14/14 | — | [Dashboard source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/dashboard) |
| [#44 — S1-06: Statistical Overview](https://trello.com/c/1JfVLaM8/44-s1-06-statistical-overview) | Sprint 1 Backlog | Jai Parbhoo | No | 18/18 | — | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#39 — S1-07: Automated Testing](https://trello.com/c/IPDaf8KK/39-s1-07-automated-testing) | Sprint 1 Backlog | Saurav Lall | No | 16/16 | — | [Testing guide](../Quality/testing-and-qa.md) |
| [#52 — S1-08 How It Works Page](https://trello.com/c/B9P9W2ON/52-s1-08-how-it-works-page) | Sprint 1 Backlog | Nayan Makanjee | No | 10/10 | — | [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages) |
| [#53 — S1-09 User Profile Management](https://trello.com/c/PpO7KIjF/53-s1-09-user-profile-management) | Sprint 1 Backlog | Ayesha Ally | No | 12/12 | PB-05 | [Profile source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/profile) |
| [#54 — S1-10 Features Page](https://trello.com/c/O92Dliwx/54-s1-10-features-page) | Sprint 1 Backlog | Hemesh Parshotam | No | 10/10 | — | [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages) |
| [#66 — S2: Assistant Role and Permissions](https://trello.com/c/kCKi09ea/66-s2-assistant-role-and-permissions) | Completed | Ayesha Ally | No | 5/5 | PB-06 | [Team access source](https://github.com/nayan-m15/Gaffer/blob/development/backend/src/common/team-access.ts) |
| [#67 — S2: Live Event Logging](https://trello.com/c/FeahTBSE/67-s2-live-event-logging) | Completed | Roko Vidjak | No | 5/5 | PB-07 | [Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches) |
| [#70 — S2: Event and Team Statistics](https://trello.com/c/KFDDIj0d/70-s2-event-and-team-statistics) | Completed | Hemesh Parshotam, Roko Vidjak | No | 5/5 | PB-10 | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#69 — S2: Athlete Statistics](https://trello.com/c/L6mvVSzk/69-s2-athlete-statistics) | Completed | Ayesha Ally | No | 5/5 | PB-09 | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#71 — S2: Season Statistics and Trends](https://trello.com/c/1vhuPSwf/71-s2-season-statistics-and-trends) | Completed | Saurav Lall | No | 5/5 | PB-11 | [Seasons source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/seasons) |
| [#133 — S2: API for Team Formation and Tactics](https://trello.com/c/YZMvbXlb/133-s2-api-for-team-formation-and-tactics) | Completed | Saurav Lall | No | 5/5 | — | [Public API source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/public-api) |
| [#72 — S3: Performance Comparisons](https://trello.com/c/gMYOG8Fe/72-s3-performance-comparisons) | Completed | Saurav Lall | No | 4/4 | PB-12 | [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics) |
| [#74 — S2: Player RSVPs, Roles and permissions](https://trello.com/c/rHGqemSt/74-s2-player-rsvps-roles-and-permissions) | Completed | Jai Parbhoo | No | 5/5 | PB-14 | [Player and RSVP source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/player) |
| [#75 — S2: Shared Calendar](https://trello.com/c/4rqouzCz/75-s2-shared-calendar) | Completed | Hemesh Parshotam, Nayan Makanjee | No | 5/5 | PB-15 | [Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events) |
| [#68 — S2: Event Log Correction](https://trello.com/c/wy2UgcLj/68-s2-event-log-correction) | Completed | Roko Vidjak | No | 5/5 | PB-08 | [Matches source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/matches) |
| [#76 — S2: Weather and Location Information](https://trello.com/c/4yss4qLJ/76-s2-weather-and-location-information) | Completed | Hemesh Parshotam | No | 5/5 | PB-16 | [Weather source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/weather) |
| [#128 — S2: Add Privacy Policy and Terms of Service](https://trello.com/c/KrQufWs6/128-s2-add-privacy-policy-and-terms-of-service) | Completed | Nayan Makanjee | No | 5/5 | — | [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages) |
| [#77 — S2: Event Reminders](https://trello.com/c/IUtmDU9s/77-s2-event-reminders) | Completed | Ayesha Ally | No | 5/5 | PB-17 | [Reminder UI source](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/features/reminders) |
| [#84 — S3: Sharing and Report Export](https://trello.com/c/7dWBTlFi/84-s3-sharing-and-report-export) | Backlog | Nayan Makanjee | No | No checklist | PB-24 | Not mapped |
| [#73 — S3: Fixtures Setup with Opponents](https://trello.com/c/aX7Zsfza/73-s3-fixtures-setup-with-opponents) | Backlog | Unassigned | No | No checklist | PB-13 | Not mapped |
| [#78 — S3: Offline Event Logging](https://trello.com/c/cCbQvUoL/78-s3-offline-event-logging) | Backlog | Unassigned | No | No checklist | PB-18 | Not mapped |
| [#79 — S3: Concurrent Event Logging](https://trello.com/c/VENCiu0p/79-s3-concurrent-event-logging) | Backlog | Unassigned | No | No checklist | PB-19 | Not mapped |
| [#80 — S3: League and Standings Management](https://trello.com/c/DQMVQqjx/80-s3-league-and-standings-management) | Backlog | Unassigned | No | No checklist | PB-20 | Not mapped |
| [#81 — S3: Automated Performance Insights](https://trello.com/c/tyi8IZ7F/81-s3-automated-performance-insights) | Backlog | Unassigned | No | No checklist | PB-21 | Not mapped |
| [#82 — S3: Player Selection Suggestions](https://trello.com/c/2UP8CQAb/82-s3-player-selection-suggestions) | Backlog | Unassigned | No | No checklist | PB-22 | Not mapped |
| [#83 — S3: Public Squad and Player Information](https://trello.com/c/zO3SXWRm/83-s3-public-squad-and-player-information) | Backlog | Unassigned | No | No checklist | PB-23 | Not mapped |
| [#85 — S3: Automatic Season Scheduling](https://trello.com/c/BhSiymWN/85-s3-automatic-season-scheduling) | Backlog | Unassigned | No | No checklist | PB-25 | Not mapped |
| [#86 — S3: Alternative Football Formats](https://trello.com/c/clwOaaP3/86-s3-alternative-football-formats) | Backlog | Unassigned | No | No checklist | PB-26 | Not mapped |

## Sprint 1 Backlog

### [#40 — S1-01: Documentation Site](https://trello.com/c/O2f6vDPm/40-s1-01-documentation-site)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Hemesh Parshotam, Nayan Makanjee
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 8/8
- **Implementation/evidence:** [Documentation repository](https://github.com/nayan-m15/SDP-Project-Documentation)

**Exported description/user story**

**Description**

> Create and maintain a central documentation site so that the development team can easily access the project's technical and development documentation.

**Acceptance Criteria**

- Documentation site is available to the development team.
- Existing project documentation is included.
- Documentation is organised and easy to navigate.
- Team members can update documentation as the project develops.

‌

**Priority:** Can be completed in parallel with development.

**Exported checklist state**

_Checklist_

- [x] Set up Document Website
- [x] Create docs-site/ folder.
- [x] Add existing tech stack documentation.
- [x] Add database schema documentation.
- [x] Add Sprint backlog documentation.
- [x] Add Git methodology/workflow documentation.
- [x] Organise documentation navigation.
- [x] Confirm documentation site runs locally.

### [#35 — S1-02: User Authentication](https://trello.com/c/3ZIEzf2l/35-s1-02-user-authentication)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Nayan Makanjee, Saurav Lall, Roko Vidjak, Jai Parbhoo
- **Archived:** No
- **Historical PB mapping:** PB-01
- **Exported checklist progress:** 23/23
- **Implementation/evidence:** [Authentication source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/auth)

**Exported description/user story**

**Description**

> As a coach, I want to securely register, log in and log out of the Sporting Coach system so that I can access and manage my team's information.

**Acceptance Criteria**

- Coach can register using an email address and password.
- Coach can provide a team name during registration.
- A team is automatically created when the coach registers.
- The coach is linked to the created team as its owner.
- Coach can log in using valid credentials.
- Coach can log out.
- Unauthenticated users cannot access protected pages.
- Unauthenticated users attempting to access protected pages are redirected to the login page.

‌

**Priority:** Highest

**Exported checklist state**

_Checklist_

- [x] Create Better Auth instance.
- [x] Connect Better Auth to Neon DB using the Drizzle adapter.
- [x] Implement POST /auth/sign-up.
- [x] Implement POST /auth/sign-in.
- [x] Implement POST /auth/sign-out.
- [x] Create NestJS authentication guard.
- [x] Validate sessions on protected routes.
- [x] Automatically create a team during coach registration.
- [x] Link coach as team owner using the team_members table.
- [x] Checklist — Frontend
- [x] Create Login page.
- [x] Add email and password fields to Login form.
- [x] Connect Login form to sign-in endpoint.
- [x] Create Register page.
- [x] Add email, password and team name fields to Register form.
- [x] Connect Register form to sign-up endpoint.
- [x] Add authentication state management.
- [x] Store/manage user session.
- [x] Add protected route wrapper.
- [x] Redirect unauthenticated users to /login.
- [x] Configure Google sign in and log in
- [x] Create Google OAuth client
- [x] Add email verification for manual sign up

### [#36 — S1-03: Athlete Roster Management](https://trello.com/c/AU3nh5bK/36-s1-03-athlete-roster-management)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Ayesha Ally
- **Archived:** No
- **Historical PB mapping:** PB-02
- **Exported checklist progress:** 26/26
- **Implementation/evidence:** [Athletes source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/athletes)

**Exported description/user story**

**Description**

> As a coach, I want to add, view, edit, search and archive athletes so that I can maintain an accurate and organised team roster.

**Acceptance Criteria**

- Coach can add a new athlete.
- Coach can view all athletes belonging to their team.
- Coach can view an individual athlete.
- Coach can edit athlete information.
- Coach can search/filter athletes by name.
- Coach can archive an athlete without permanently deleting their information.
- Archived athletes can be restored.
- Coaches cannot access athletes belonging to another team.
- Invalid athlete information is rejected.

**Exported checklist state**

_Checklist_

- [x]  Create athletes NestJS module.
- [x]  Create athletes controller.
- [x]  Create athletes service.
- [x]  Implement POST /athletes.
- [x]  Implement GET /athletes.
- [x]  Implement GET /athletes/:id.
- [x]  Implement PATCH /athletes/:id.
- [x]  Implement DELETE /athletes/:id.
- [x]  Implement soft-delete/archive functionality.
- [x]  Scope athlete data to the logged-in coach's team.
- [x]  Use authentication guard on athlete routes.
- [x]  Add Zod validation for create/update DTOs.
- [x] Checklist — Frontend
- [x]  Create Athletes List page.
- [x]  Display athlete name.
- [x]  Display athlete position.
- [x]  Display athlete status.
- [x]  Create Add Athlete form.
- [x]  Add athlete name field.
- [x]  Add jersey number field.
- [x]  Add position field.
- [x]  Add other required athlete information.
- [x]  Add Edit Athlete functionality.
- [x]  Add athlete search/filter by name.
- [x]  Add archive athlete option.
- [x]  Add restore athlete option.

### [#37 — S1-04: Event Management](https://trello.com/c/opUO7Scg/37-s1-04-event-management)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Roko Vidjak
- **Archived:** No
- **Historical PB mapping:** PB-03
- **Exported checklist progress:** 28/28
- **Implementation/evidence:** [Events source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/events)

**Exported description/user story**

**Description**

> As a coach, I want to create, view, edit and cancel team events so that I can organise training sessions, matches and meetings for my team.

**Acceptance Criteria**

- Coach can create an event.
- Coach can view their team's events.
- Coach can view an individual event.
- Coach can edit an existing event.
- Coach can cancel an event.
- Events can be classified as training, match or meeting.
- Events can have scheduled, cancelled or completed statuses.
- Upcoming events are displayed chronologically.
- Cancelled events are visually distinguishable.
- Coaches cannot access another team's events.

‌

**Priority:** High

**Exported checklist state**

_Checklist_

- [x] Create events NestJS module.
- [x] Create events controller.
- [x] Create events service.
- [x] Implement POST /events.
- [x] Implement GET /events.
- [x] Implement GET /events/:id.
- [x] Implement PATCH /events/:id.
- [x] Implement DELETE /events/:id.
- [x] Support training event type.
- [x] Support match event type.
- [x] Support meeting event type.
- [x] Support scheduled status.
- [x] Support cancelled status.
- [x] Support completed status.
- [x] Scope events to the logged-in coach's team.
- [x] Protect event routes using authentication.
- [x] Checklist — Frontend
- [x] Create Events List page.
- [x] Display events chronologically with upcoming events first.
- [x] Create Create Event form.
- [x] Add event title field.
- [x] Add event type field.
- [x] Add date/time field.
- [x] Add location field.
- [x] Add notes field.
- [x] Add Edit Event functionality.
- [x] Add Cancel Event functionality.
- [x] Display cancelled events differently (greyed out/strikethrough).

### [#38 — S1-05: Dashboard Summary](https://trello.com/c/jzuY2wxk/38-s1-05-dashboard-summary)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Nayan Makanjee, Jai Parbhoo
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 14/14
- **Implementation/evidence:** [Dashboard source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/dashboard)

**Exported description/user story**

**Description**

> As a coach, I want to see a summary of my athletes and upcoming events so that I can quickly understand the current state of my team and upcoming activities.

**Acceptance Criteria**

- Dashboard displays the number of active athletes.
- Dashboard displays the number of events.
- Dashboard displays the next five upcoming events.
- Upcoming events are ordered by date/time.
- Appropriate empty states are displayed when there are no athletes or events.
- Dashboard information only relates to the logged-in coach's team.

‌

**Priority:** Medium / Do after Athlete and Event functionality

**Exported checklist state**

_Checklist_

- [x] Create dashboard aggregation functionality.
- [x] Implement GET /dashboard.
- [x] Return total number of active athletes.
- [x] Return total number of events.
- [x] Return next 5 upcoming events.
- [x] Scope dashboard data to the logged-in coach's team.
- [x] Checklist — Frontend
- [x] Create Dashboard page.
- [x] Create Active Athletes stat card.
- [x] Create Events stat card.
- [x] Create Upcoming Events section.
- [x] Display next 5 upcoming events.
- [x] Add empty state when there are no athletes.
- [x] Add empty state when there are no upcoming events.

### [#44 — S1-06: Statistical Overview](https://trello.com/c/1JfVLaM8/44-s1-06-statistical-overview)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Jai Parbhoo
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 18/18
- **Implementation/evidence:** [Statistics source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/statistics)

**Exported description/user story**

As a coach, I want to view an overview of my team's and athletes' statistics so that I can quickly understand performance and identify trends across events.

**Acceptance Criteria**

- Coach can view an overview of team statistics.
- Coach can view statistics for individual athletes.
- Statistics are derived from recorded event data.
- Athlete statistics can be viewed across individual events.
- Team statistics can be viewed across events.
- Statistics are limited to athletes and events belonging to the coach's team.
- Appropriate empty states are displayed when no statistics are available.
- Statistics are presented in a clear and understandable format.

‌

**Priority:** Medium / Do after Athlete and Event functionality

**Exported checklist state**

_Checklist_

- [x] Create statistics NestJS module.
- [x] Create statistics controller.
- [x] Create statistics service.
- [x] Implement GET /statistics.
- [x] Implement GET /statistics/athletes/.
- [x] Calculate statistics from recorded event data.
- [x] Calculate per-athlete statistics.
- [x] Calculate team-level statistics.
- [x] Scope statistics to the logged-in coach's team.
- [x] Protect statistics routes using authentication.
- [x] Add validation for statistic queries.
- [x] Create Statistics Overview page.
- [x] Display team statistics.
- [x] Display per-athlete statistics.
- [x] Add athlete selection/filtering.
- [x] Add event selection/filtering.
- [x] Display statistics in clear summary cards/tables.
- [x] Add appropriate empty states when no statistics are available.

### [#39 — S1-07: Automated Testing](https://trello.com/c/IPDaf8KK/39-s1-07-automated-testing)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Saurav Lall
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 16/16
- **Implementation/evidence:** [Testing guide](../Quality/testing-and-qa.md)

**Exported description/user story**

**Description**

> Implement automated testing for the core Sprint 1 functionality to ensure authentication, athlete management, event management and team isolation work correctly and reliably.

**Acceptance Criteria**

- Authentication flow has automated integration tests.
- Athlete CRUD operations are tested.
- Event CRUD operations are tested.
- Team isolation is tested.
- At least one end-to-end test covers the main user flow.
- Instructions for running tests are documented.

‌

**Priority:** Medium

**Exported checklist state**

_Checklist_

- [x] Set up API integration testing with Supertest.
- [x] Test user registration.
- [x] Test user sign-in.
- [x] Test user sign-out/authentication flow.
- [x] Test athlete creation.
- [x] Test retrieving athletes.
- [x] Test updating athletes.
- [x] Test archiving/deleting athletes.
- [x] Test event creation.
- [x] Test retrieving events.
- [x] Test updating events.
- [x] Test deleting/cancelling events.
- [x] Test team isolation.
- [x] Set up Playwright e2e testing.
- [x] Create at least one e2e test: Register → Create Athlete → See Athlete/Data on Dashboard.
- [x] Document how to run tests in README.

### [#52 — S1-08 How It Works Page](https://trello.com/c/B9P9W2ON/52-s1-08-how-it-works-page)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Nayan Makanjee
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 10/10
- **Implementation/evidence:** [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages)

**Exported description/user story**

As a user, I want to view a How It Works page so that I can understand how to use the Sport Coaching Tool and its main functionality.

**Exported checklist state**

_Checklist_

- [x] User can access the How It Works page
- [x]  Page explains how to get started with the application
- [x]  Page explains the Dashboard
- [x]  Page explains Athlete Roster management
- [x]  Page explains Events management
- [x]  Page explains Team/Lineup management
- [x]  Information is presented clearly and logically
- [x]  Page follows the existing application design
- [x]  Page is responsive
- [x]  Navigation to/from the page works correctly

### [#53 — S1-09 User Profile Management](https://trello.com/c/PpO7KIjF/53-s1-09-user-profile-management)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Ayesha Ally
- **Archived:** No
- **Historical PB mapping:** PB-05
- **Exported checklist progress:** 12/12
- **Implementation/evidence:** [Profile source](https://github.com/nayan-m15/Gaffer/tree/development/backend/src/profile)

**Exported description/user story**

**User Story:**
**As a logged-in user, I want to view and edit my profile so that I can keep my personal/account information up to date.**


Implement a profile page where the authenticated user can view their existing profile information and update the fields that are allowed to be edited.

**Exported checklist state**

_Checklist_

- [x] Logged-in user can access their Profile page
- [x]  Existing profile information is displayed
- [x]  Existing information is pre-filled when editing
- [x]  User can edit permitted profile fields
- [x]  Invalid information is rejected
- [x]  User can save valid changes
- [x]  Saved changes persist
- [x]  User receives success feedback after updating
- [x]  Errors are clearly displayed
- [x]  User cannot edit another user's profile
- [x]  Profile page matches existing application styling
- [x]  Page is responsive

### [#54 — S1-10 Features Page](https://trello.com/c/O92Dliwx/54-s1-10-features-page)

- **Current list:** Sprint 1 Backlog
- **Owner(s):** Hemesh Parshotam
- **Archived:** No
- **Historical PB mapping:** —
- **Exported checklist progress:** 10/10
- **Implementation/evidence:** [Frontend pages](https://github.com/nayan-m15/Gaffer/tree/development/frontend/src/pages)

**Exported description/user story**

**User Story:**
**As a user, I want to view the features offered by the Sport Coaching Tool so that I can understand what the application can help me do.**


Create a user-facing Features page that presents and explains the main capabilities available within the Sport Coaching Tool.

**Exported checklist state**

_Checklist_

- [x] User can access the Features page
- [x]  Athlete Roster Management is described
- [x]  Events Management is described
- [x]  Team/Lineup Management is described
- [x]  Dashboard functionality is described
- [x]  Each feature has a clear description
- [x]  Appropriate icons/visual elements are included where useful
- [x]  Page follows existing application branding
- [x]  Page is responsive
- [x]  Navigation to/from the Features page works correctly

## Completed

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

## Backlog

### [#84 — S3: Sharing and Report Export](https://trello.com/c/7dWBTlFi/84-s3-sharing-and-report-export)

- **Current list:** Backlog
- **Owner(s):** Nayan Makanjee
- **Archived:** No
- **Historical PB mapping:** PB-24
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

As a coach, I want to share results and export reports so that team and performance information can be distributed outside the platform.

**Exported checklist state**

_No checklist recorded in the export._

### [#73 — S3: Fixtures Setup with Opponents](https://trello.com/c/aX7Zsfza/73-s3-fixtures-setup-with-opponents)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-13
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

‌

As a coach, I want to organise fixtures with other teams so that upcoming competitions can be coordinated through the platform.

**Exported checklist state**

_No checklist recorded in the export._

### [#78 — S3: Offline Event Logging](https://trello.com/c/cCbQvUoL/78-s3-offline-event-logging)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-18
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#79 — S3: Concurrent Event Logging](https://trello.com/c/VENCiu0p/79-s3-concurrent-event-logging)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-19
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#80 — S3: League and Standings Management](https://trello.com/c/DQMVQqjx/80-s3-league-and-standings-management)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-20
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#81 — S3: Automated Performance Insights](https://trello.com/c/tyi8IZ7F/81-s3-automated-performance-insights)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-21
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#82 — S3: Player Selection Suggestions](https://trello.com/c/2UP8CQAb/82-s3-player-selection-suggestions)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-22
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#83 — S3: Public Squad and Player Information](https://trello.com/c/zO3SXWRm/83-s3-public-squad-and-player-information)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-23
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#85 — S3: Automatic Season Scheduling](https://trello.com/c/BhSiymWN/85-s3-automatic-season-scheduling)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-25
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._

### [#86 — S3: Alternative Football Formats](https://trello.com/c/clwOaaP3/86-s3-alternative-football-formats)

- **Current list:** Backlog
- **Owner(s):** Unassigned
- **Archived:** No
- **Historical PB mapping:** PB-26
- **Exported checklist progress:** No checklist
- **Implementation/evidence:** No card-specific repository evidence mapped in this audit.

**Exported description/user story**

_No description or user story recorded in the export._

**Exported checklist state**

_No checklist recorded in the export._
