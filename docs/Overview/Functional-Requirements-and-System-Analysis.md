# Functional Requirements and System Analysis

## Document status and system boundary

Current behavior is derived from the inspected application source, request schemas and migrations. The [source basis](../Architecture/tech-stack/architecture-overview.md#source-basis) identifies the checkout. Historical tier/course records below preserve product intent rather than proving deployment or acceptance.

The React SPA serves coaches, assistants and claimed players. NestJS owns authentication, server-resolved tenancy, request validation, permissions and persistence. Local match capture queues authorized evidence; PostgreSQL reconciles it into canonical projections, which return through authorized reads and configured replication.

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

## Functional rules

- Match creation requires a future `scheduledAt` instant, not only a valid date string. Calendar selection uses local dates; competition generation persists the IANA schedule zone and corresponding UTC instants.
- Confirm/start lineup count follows the current match format (5/7/11), with unique own-team eligible starters, unique nonoverlapping bench, and compatible formation/coordinates. It is not fixed at eleven.
- Registered-team friendlies use request/acceptance; competition fixtures use participant slots and revision-aware schedule responses. Results feed standings and knockout progression through validated fixture-result paths.
- Team membership and resource scope are checked server-side. Assistants may log and report new injuries; injury amendment/closure/deletion and managed-resource mutation are coach-only. Competition administrator and participant permissions differ.
- Each evidence/operation ID is stable across retries; canonical events, unresolved reviews, receipts and replicated state are distinct. Deleting/undoing evidence closes obsolete reviews, while other unresolved candidates retain warnings.
- End Match confirms before changing play. Resume restores shared play and elapsed authority, clears pending approvals and rejects incompatible final report locks. Delayed full-time commands cannot defeat later resume.
- Two connected teams approve the current report bilaterally. A competition opponent with no connected Gaffer team permits initial publication by the participating coach, with revision/completion/review checks. Amendments still need home/away approvals and preserve the published result until accepted.
- RSVP is per athlete/event. Active roster reads exclude archived athletes; archival retains history. Account deletion removes sessions/provider accounts/membership/claims and anonymizes retained user references.
- Event/statistics edits keep unfinished drafts through background refresh. Ordinary mounted queries poll every five seconds while visible; session refresh is fifteen seconds with feature overrides.

## Statistics reports and sharing

Coaches can download a team performance report as **PDF or CSV** from Statistics. Print and Share open a review dialog containing the summary, charts, match results and player tables. The operation captures the selected team, season, competition/date scope and a generation timestamp when it starts; background refresh or a later filter change does not silently change that active report.

Only one report operation runs at a time, including rapid repeated clicks. The current Print action opens an isolated PDF tab directly from the confirmation click and generates the same chart-bearing PDF as Download/Share. It does not print the surrounding application screen. Popup blocking produces an explicit error. Cancelling/closing the review or unmounting aborts preparatory work, and temporary links/object URLs are cleaned up or revoked after the viewer's loading window. Native sharing must settle before another operation starts.

**Share currently sends the PDF file** using native file sharing where supported, with PDF download fallback. A native share cancellation ends the operation without a success notice. **CSV is a download**, not a native CSV-sharing flow in this checkout. Clipboard fallback belongs to the separate match-report story/link share action. These distinctions follow current source rather than an older proposed export workflow.

Statistics exports are distinct from the in-app match report and its story/link sharing, the live-match report exporter, game-plan/injury PDFs, and unsent offline recovery JSON. A recovery JSON file restores queued evidence; it is not a sporting report. Each feature must be evaluated through its own source path.

## Historical 14 September tier-plan traceability

| Tier/area | Requirement interpretation | Current evidence/status |
| --- | --- | --- |
| Basic — athlete/event management | Maintain athletes, schedule activities and show a useful dashboard. | Implemented; the REST-derived dashboard shows roster/event counts, upcoming events, recent matches, season record and rate statistics. |
| Basic — live record/results | Record match actions and preserve a correctable source of truth. | Implemented through persisted match events. Corrections change ledger events and derived statistics; there is no direct arbitrary statistics override. |
| Basic — accounts | Register/sign in/sign out and manage profile. | Sign-up/sign-in exist. The historical snapshot lacked password reset/account deletion; current source implements these flows. Tracker placement remains historical. |
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

The course brief states common requirements separately from the team's Basic/Intermediate/Advanced plan. The retained brief interpretation comes from the earlier review; the source behavior below is reconciled with the current checkout.

| Brief requirement | Source evidence | Status or gap |
| --- | --- | --- |
| Track events, player statistics and history | Events, matches, match events, athlete statistics and report routes | Implemented in source; current user testing and deployed revision unverified. |
| Compare with other teams | Competition teams, fixtures, results and standings; athlete comparison is within the user's team | Partial. The exact cross-team comparison required by the brief is not established by the current athlete comparison view. |
| Plan events with other platform users | Registered-team friendly requests/acceptance, competition invitations and revision-aware fixture scheduling | Implemented source flows; hosted deployment and acceptance are separate. |
| Assistants track event history | Team membership, match logging/clock/finish, report reads and new injury reporting | Assistants cannot amend clinical records, resolve reviews or approve final reports. |
| Sign up, sign in, reset password, delete account | Auth reset/change schemas/routes and `DELETE /profile` | Implemented. Deletion removes active account credentials/sessions, membership and claims while anonymizing historical actor references. Historical [backlog #130](https://trello.com/c/HG4lWTcB) placement does not establish current acceptance. |
| Hand-written API and external integration | NestJS controllers/services; Open-Meteo geocoding and forecast integration | Source evidence exists; deployed revision and external-service behaviour require verification. |
| Responsive/accessibility and CI/CD | Responsive components and workflow files | No current measured accessibility/mobile report or successful CI/deployment run supplied. |
| Documentation website | This static site and published GitHub Pages URL | Local source validated; published rendering could not be confirmed in this audit. |

The code contains responsive layouts, semantic labels and component-level accessibility features, but this does not establish automatic WCAG compliance. Security depends on session validation, CORS, server-side role/team scoping, input validation and safe secret handling. Availability and performance are hosting/provider dependent; no zero-latency or production-availability guarantee is documented.

## Historical product direction

Earlier requirements proposed offline capture, collaboration, public pages, automatic scheduling, reports and AI-assisted analysis. The implemented scope is described above: shared evidence requires explicit duplicate review, competition generation is narrower than every proposed season-scheduling feature, and each report/export workflow has its own contract. See the [historical stack proposal](../Architecture/tech-stack/tool-stack-plan.md) and preserved [backlog snapshot](../Project%20Management/product-backlog.md).

<!-- trello-status:start -->
## Trello requirement traceability

**Board snapshot: 11 October 2026.** Latest recorded action: `2026-10-11T21:28:12.474Z` (UTC). See [export sources and reconciliation](../Project Management/trello-board-snapshot.md). List placement, the card completion marker (Trello `dueComplete`) and checked checklist items are recorded separately. They report tracker state, not an independently verified test, deployment or acceptance result.

All 34 cards retained in Sprint 1/2/3 lists are marked complete with 279/279 checklist items checked. The [product backlog](../Project%20Management/product-backlog.md) preserves every supplied description and criterion. This updates tracker completion, not the source-based implementation contract above. Card #72 remains in Sprint 2 Backlog despite its S3 title; all 11 cards in Sprint 3 Backlog have 50/50 criteria checked.
<!-- trello-status:end -->

## AI Declaration

OpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.
