# Gaffer Product Overview

The detailed table below records the 14 September source review. Newer functionality is summarized under **Current boundaries and planned work**. Source code alone does not establish deployment or acceptance.

## Product purpose

Gaffer supports grassroots football coaches, assistants, and claimed players. The primary loop is to create a team, maintain a roster and calendar, confirm a match squad, record match events, review a report, and inspect team/player statistics.

## Historical 14 September implementation inventory

| Area | What the current application implements | Qualification |
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

Implementation evidence: [application routes](https://github.com/nayan-m15/Gaffer/blob/main/frontend/src/App.tsx), [backend modules](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/app.module.ts), [schema](https://github.com/nayan-m15/Gaffer/blob/main/backend/src/database/schema/index.ts), and [root scripts](https://github.com/nayan-m15/Gaffer/blob/main/package.json).

## Roles

- **Coach:** creates/manages a team and mutates roster, events, tactics, seasons, competitions and standings.
- **Assistant:** joins through an email-bound invite; can read team data and participate in live match logging, but coach-only mutations remain restricted.
- **Player:** signs in and claims an athlete record through a one-time token; can view their team context and RSVP.

The API resolves team identity from the authenticated session. Clients do not choose a `teamId` for normal team-scoped operations. Resource queries are additionally scoped by that resolved team ID.

## Current boundaries and planned work

At the 24 September source commit, browser offline logging and server upload/reconciliation code, competition membership/invitation/fixture flows, injury/recovery records and an anonymous public dashboard exist. Game-plan and injury PDF exports are also implemented in source. Their production configuration, full field behaviour and acceptance are unverified. **Match-report** file export, email/push reminders, password reset, account deletion, automatic season scheduling, AI insights and player-selection recommendations remain absent or unverified. Fixture negotiation and automatic standings have partial source implementations; see [requirements](Functional-Requirements-and-System-Analysis.md) and [backlog](../Project%20Management/product-backlog.md) for precise scope.

Historical design documents may describe these as proposed tiers. Those proposals remain useful product direction but must not be read as implementation evidence.

## Evidence status language

- **Implemented â€” acceptance verification pending:** code and routes exist, but no supplied assessment evidence proves the complete acceptance checklist.
- **Partial:** a useful subset exists, while a named part of the story does not.
- **Planned:** no implementation was found in the inspected source.
- **Verified:** reserved for a specifically identified test or review result. Procedures alone are not results.

See [Product Backlog](../Project%20Management/product-backlog.md) and [Sprint 3 delivery record](../Project%20Management/sprint-3-delivery.md).
