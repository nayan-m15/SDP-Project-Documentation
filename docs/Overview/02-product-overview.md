# Gaffer Product Overview

This page describes current source capabilities. The retained 14 September inventory is historical and must not be used as the current feature contract. See the [source basis](../Architecture/tech-stack/architecture-overview.md#source-basis).

## Product purpose

Gaffer supports grassroots football coaches, assistants, and claimed players. The primary loop is to create a team, maintain a roster and calendar, confirm a match squad, record match events, review a report, and inspect team/player statistics.

## Current application capabilities

| Area | Implemented behavior |
| --- | --- |
| Accounts and roles | Verified email/password and Google sign-in, session management, password reset/change, email-change workflow and account deletion that anonymizes retained historical actor references. Coaches manage resources; assistants read, log matches and report injuries; claimed players use their own hub/RSVP. |
| Roster and planning | Athlete management/archive/status, game plans, public preset and private custom formations, tactics/roles/instructions, confirmed match lineups and availability checks. Supported formats are 5, 7 and 11 per side. |
| Registered friendlies | Scheduling a manual match against a registered team creates an inbound friendly request. The opponent coach accepts/declines; accepted fixtures link the teams' private sheets to one session when shared logging is enabled. Free-text external opponents remain supported separately. |
| Competitions | Administrator-managed participant invitations, league/knockout/hybrid fixtures, schedule acceptance/proposals, manual or published match results and result-driven standings. Fixture generation interprets local weekdays/kickoff in the saved/requested IANA timezone. |
| Competition lifecycle | Global archive/restore is administrator-only, preserves history and blocks ordinary mutations until restore; live fixtures prevent archiving. Participant hide/unhide is a per-user list preference. |
| Match collaboration | Local observations and operations upload with stable IDs, reconcile into shared public events and revision-bound reviews, and return receipts; authorized API reads and configured PowerSync deliver canonical state. Both coaches can log either side. Private tactics, notes, injuries and roster IDs are excluded. |
| Play and approval | End Match asks for confirmation; cancellation leaves play running. Resume restores the latest playing half/elapsed time and clears pending approvals. Two connected teams approve bilaterally; an unconnected competition opponent permits participating-coach publication subject to current checks. Published results change through accepted amendments, not silent edits. |
| Statistics and insights | Team/athlete/season statistics, two/three-athlete comparisons, statistics reports, read-only statistics Q&A and configured match/season narrative insights. Guided AI conversations support roster, injury, competition and lineup workflows, with explicit confirmation and normal service authorization for proposed writes. |
| Public information | Anonymous sporting dashboard with server-filtered incremental player/match lists, complete filtered match summaries, standings, and public GET API endpoints. Public catalogs never expose a team's saved tactics. |

Competition fixture generation is not evidence that every proposed automatic season-scheduling feature exists. AI narratives require configured provider access and can be unavailable; a suggestion is not an automatic authorized write. Source implementation does not establish production deployment, field readiness or stakeholder acceptance.

## Statistics reports and sharing

Coaches can download a team performance report as **PDF or CSV** from Statistics. Print and Share open a review dialog containing the summary, charts, match results and player tables. The operation captures the selected team, season, competition/date scope and a generation timestamp when it starts; background refresh or a later filter change does not silently change that active report.

Only one report operation runs at a time, including rapid repeated clicks. The current Print action opens an isolated PDF tab directly from the confirmation click and generates the same chart-bearing PDF as Download/Share. It does not print the surrounding application screen. Popup blocking produces an explicit error. Cancelling/closing the review or unmounting aborts preparatory work, and temporary links/object URLs are cleaned up or revoked after the viewer's loading window. Native sharing must settle before another operation starts.

**Share currently sends the PDF file** using native file sharing where supported, with PDF download fallback. A native share cancellation ends the operation without a success notice. **CSV is a download**, not a native CSV-sharing flow in this checkout. Clipboard fallback belongs to the separate match-report story/link share action. These distinctions follow current source rather than an older proposed export workflow.

Statistics exports are distinct from the in-app match report and its story/link sharing, the live-match report exporter, game-plan/injury PDFs, and unsent offline recovery JSON. A recovery JSON file restores queued evidence; it is not a sporting report. Each feature must be evaluated through its own source path.

## Historical 14 September implementation inventory

| Area | What the application implemented in that snapshot | Historical qualification |
| --- | --- | --- |
| Authentication | Email/password registration, verification and session cookies; Google sign-in; sign-out; protected routes. | Better Auth is configured. Password reset and account deletion are not implemented. |
| Roles and teams | Coach ownership, assistant invitations, player claim invitations, coach/member/player route separation, and server-side team scoping. | A database foreign key does not enforce role or same-team ownership; controllers/services do. |
| Roster | Create, read, edit, search, archive, restore, athlete status and claimed player linkage. | Archive preserves history; deletion is also exposed and must respect service validation. |
| Scheduling | Match/training/meeting CRUD, calendar views, venue details, competition link and player-facing shared schedule. | Opponent name is free text; this does not arrange a fixture with another platform user. |
| Match preparation | Named game plans, formation/tactics, exact starting XI, bench, home/away colours and opponent information modes. | Opponent modes are none, shirt numbers, or full names/details. |
| Live match | Persisted clock, goals, assists, key passes, cards, substitutions, penalties and injuries; finish-match workflow. | The app uses REST. Installed Socket.io packages and an adapter do not provide collaborative broadcasting. |
| Corrections | Post-match create, update and delete operations on match events; adjusted events are flagged. | A report is an in-app page. No report-file download/export is implemented. |
| Statistics | Team summary, recent form, season trends, competition standings, athlete detail and comparison of two or three athletes. | No athlete-versus-opponent-player or cross-team comparison exists; standings are manually entered. |
| Player participation | Claim flow, player dashboard/team/events/standings views, and RSVP with optional note. | A claimed athlete is required. |
| Weather/location | Authenticated Open-Meteo geocoding and per-event hourly forecast with caching and a stale-cache fallback. | No map rendering or Mapbox/OpenWeatherMap integration exists. |
| Reminders | Dashboard banner for scheduled events in the next 24 hours with per-device dismissal. | In-app only; no email, push or background delivery. |
| Public content | Marketing landing page, features, how-it-works content, privacy policy and terms. | Team/squad data is not published publicly. |

Current source: [frontend/src/App.tsx](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/App.tsx), [frontend/src/features/statistics/ReportActions.tsx](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/features/statistics/ReportActions.tsx), [frontend/src/features/statistics/report-export.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/features/statistics/report-export.ts), [frontend/src/features/statistics/report-share.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/frontend/src/features/statistics/report-share.ts), [backend/src/ai-assistant/ai-assistant.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/ai-assistant/ai-assistant.service.ts), [backend/src/competitions/competitions.service.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/competitions/competitions.service.ts).

## Roles

- **Coach:** creates/manages a team and mutates roster, events, tactics, seasons, competitions and standings.
- **Assistant:** joins through an email-bound invite; can read team data and participate in live match logging, but coach-only mutations remain restricted.
- **Player:** signs in and claims an athlete record through a one-time token; can view their team context and RSVP.

The API resolves team identity from the authenticated session. Clients do not choose a `teamId` for normal team-scoped operations. Resource queries are additionally scoped by that resolved team ID.

## Operational limits and related guides

Prepare authorized match data while online before offline capture and export unsent work before clearing browser storage. Email/push event reminders and every proposed automatic season-scheduling capability are not established by fixture generation. Hosted configuration and acceptance remain separate from source behavior.

See [authorization](../Architecture/contracts-and-authorization.md), [collaboration](../Architecture/offline-collaboration.md), [public API](../Architecture/Gaffer-Public-API-Reference.md), [operations](../Architecture/operations/offline-operations-runbook.md), [requirements](Functional-Requirements-and-System-Analysis.md) and the historical [backlog](../Project%20Management/product-backlog.md).
