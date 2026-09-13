# Sprint 2 Backlog and Delivery Record

**Sources:** Trello export dated 13 September 2026, [SDP-Interlude board](https://trello.com/b/cM6m3R0G/sdp-interlude), and application commit `aadf745eb7a9d309bf847bb3afb2789dbddbabc6`. The export contains 132 cards including archived cards. It records 11 active S2 cards in `Completed`, zero cards currently in `Sprint 2 Backlog`, and no active cards in `In Progress`.

`Completed on Trello` means the card is active in the Completed list. `5/5` means its exported checklist items are checked. Neither signal alone proves independent acceptance testing. The movement history shows the cards below entered the Sprint 2 flow; it does not reconstruct the original sprint commitment.

## Delivery summary

| Card | Recorded owner(s) | Priority | Sprint/list evidence | Checklist | Implementation evidence |
| --- | --- | --- | --- | --- | --- |
| [#66 Assistant Role and Permissions](https://trello.com/c/kCKi09ea/66-s2-assistant-role-and-permissions) | Ayesha Ally | Not specified on Trello | Backlog → Sprint 2 Backlog → Completed | 5/5 | Coach/assistant membership, invites, guards and team scoping exist. Acceptance verification pending. |
| [#67 Live Event Logging](https://trello.com/c/FeahTBSE/67-s2-live-event-logging) | Roko Vidjak | Not specified on Trello | Sprint 2 Backlog → In Progress → Completed, briefly returned to backlog, then Completed | 5/5 | REST logger, clock and persisted match events exist. No offline or socket collaboration. |
| [#68 Event Log Correction](https://trello.com/c/wy2UgcLj/68-s2-event-log-correction) | Roko Vidjak | Not specified on Trello | Sprint 2 Backlog → Completed → In Progress → Completed | 5/5 | Match-event create/update/delete and post-match editing exist. |
| [#69 Athlete Statistics](https://trello.com/c/L6mvVSzk/69-s2-athlete-statistics) | Ayesha Ally | Not specified on Trello | Sprint 2 Backlog → Completed | 5/5 | Event-derived athlete summaries/details exist. |
| [#70 Event and Team Statistics](https://trello.com/c/KFDDIj0d/70-s2-event-and-team-statistics) | Hemesh Parshotam; Roko Vidjak | Not specified on Trello | Sprint 2 Backlog → In Progress → Completed | 5/5 | Team/match summaries and charts exist. |
| [#71 Season Statistics and Trends](https://trello.com/c/1vhuPSwf/71-s2-season-statistics-and-trends) | Saurav Lall | Not specified on Trello | Sprint 2 Backlog → In Progress → Completed | 5/5 | Date-range seasons, aggregates, rolling/cumulative trends and period comparisons exist. |
| [#74 Player RSVPs, Roles and Permissions](https://trello.com/c/rHGqemSt/74-s2-player-rsvps-roles-and-permissions) | Jai Parbhoo | Not specified on Trello | Backlog → Sprint 2 Backlog → In Progress → Completed | 5/5 | Player claims, player views and three-state RSVP exist. |
| [#75 Shared Calendar](https://trello.com/c/4rqouzCz/75-s2-shared-calendar) | Hemesh Parshotam; Nayan Makanjee | Not specified on Trello | Backlog → Sprint 2 Backlog → In Progress → Completed | 5/5 | Coach calendar and player event feed use shared persisted events. |
| [#76 Weather and Location Information](https://trello.com/c/4yss4qLJ/76-s2-weather-and-location-information) | Hemesh Parshotam | Not specified on Trello | Sprint 2 Backlog → In Progress → Completed | 5/5 | Open-Meteo location search/weather and failure states exist. |
| [#77 Event Reminders](https://trello.com/c/IUtmDU9s/77-s2-event-reminders) | Ayesha Ally | Not specified on Trello | Sprint 2 Backlog → In Progress → Completed | 5/5 | Accepted card scope is met in code: next-24-hour coach/player dashboard banners and local dismissal persistence. Email/push is a separate capability. |
| [#128 Privacy Policy and Terms of Service](https://trello.com/c/KrQufWs6/128-s2-add-privacy-policy-and-terms-of-service) | Nayan Makanjee | Not specified on Trello | Sprint 2 Backlog → In Progress → Completed | 5/5 | Public policy pages and application links exist. Server-side acceptance storage is separately tracked in issue #129. |

## Stories and exported acceptance checklists

### #66 — Assistant Role and Permissions

The card has no description. Faithful description: establish assistant access with server and UI restrictions. Checked items: define roles/permissions; implement backend checks; add role management; restrict relevant UI/actions; test authorised and unauthorised access.

### #67 — Live Event Logging

**Recorded story:** As a coach, I want to record events during a live match so that match activity and player performance can be tracked accurately.

Checked items: implement logger; support required event types; link events to athletes/matches; persist through backend; test the complete flow. The description additionally calls for quick live-game use.

### #68 — Event Log Correction

**Recorded story:** As a coach, I want to correct incorrectly logged match events so that match records and derived statistics remain accurate.

Checked items: select logged events; correct them; persist corrections; update derived statistics; test common correction scenarios. This changes source events; it is not a direct arbitrary statistics override.

### #69 — Athlete Statistics

**Recorded story:** As a coach, I want to view statistics for individual athletes so that I can evaluate player performance and make informed coaching decisions.

Checked items: define measures; calculate from event data; connect to athletes; display in UI; test against known event data. No-data handling is also in the card description.

### #70 — Event and Team Statistics

**Recorded story:** As a coach, I want to view event and team statistics so that I can analyse the team's overall performance.

Checked items: determine measures; calculate from logs; implement API retrieval; display frontend results; test against known match data.

### #71 — Season Statistics and Trends

**Recorded story:** As a coach, I want to view statistics and performance trends across a season so that I can understand how my team and athletes are performing over time.

Checked items: define season measures; aggregate matches; calculate trends; display trends; test multiple-match aggregation. Current code compares periods within one team's season and up to three athletes; it does not compare different platform teams or an athlete statistically against opponent players.

### #74 — Player RSVPs, Roles and Permissions

**Recorded story:** As a coach, I want players to indicate their availability for upcoming activities so that I can plan attendance and team selection.

Checked items: player RSVP; available/unavailable response; coach status display; role restrictions; player/coach permission tests. Code also supports `maybe` and an optional note.

### #75 — Shared Calendar

**Recorded story:** As a user, I want upcoming training sessions, fixtures and competitions displayed on a shared calendar so that I can keep track of the team's schedule.

Checked items: team calendar; event types; detail view; updates after event changes; coach/player access. “Fixture” here is a scheduled team match, not platform-to-platform arrangement.

### #76 — Weather and Location Information

**Recorded story:** As a coach, I want weather and location information for upcoming events so that I can prepare the team appropriately.

Checked items: location; weather; correct event association; unavailable-data handling; display testing.

### #77 — Event Reminders

**Recorded story:** As a user, I want reminders about upcoming team activities so that I do not miss important events.

Checked items: detect next-24-hour events; coach banner; player banner; dismiss; persist dismissal. The checklist defines an in-app scope; push/email is not added as a missing criterion for this card.

### #128 — Privacy Policy and Terms of Service

The card has no description. Faithful description: publish both legal-information pages and link them before sign-in. Checked items: privacy page; terms page; app links; public access; link/mobile testing. Legal review or server-side consent storage is not evidenced by this card.

## Archived Sprint 2 signal

[Card #111, “S2: Player Role and Permissions”](https://trello.com/c/D8kYmcPM/111-s2-player-role-and-permissions) is archived, remains associated with `In Progress`, is assigned to Jai Parbhoo, and has no exported description/checklist. It is not counted as active or completed, and the export does not establish why it was archived. Related delivered behaviour is represented by card #74 and source evidence without treating #111 as done.
