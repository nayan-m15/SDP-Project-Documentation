# Application API Guide

This guide covers the protected application API and its canonical request contracts. The [public API reference](Gaffer-Public-API-Reference.md) covers anonymous GET routes. Public Swagger UI/JSON/YAML exclude the protected route inventory below. The intended six-route public policy has a current source discrepancy described in the [public reference](Gaffer-Public-API-Reference.md#swagger-policy-and-current-source-discrepancy).

## Authentication, scope and errors

Backend paths below are relative to the backend origin. The deployed frontend uses same-origin `/api/*` rewrites for normal application calls and `/auth/*` for authentication. `apiFetch` sends the Better Auth cookie with `credentials: "include"`. Resolve user/team/role on the server; a client-selected resource ID is not an access grant. See [contracts and authorization](contracts-and-authorization.md).

Zod validates body/query contracts; UUID parameters are checked by pipes. Invalid inputs use 400, missing sessions 401, and scoped/forbidden resources 404/403 as implemented. State conflicts use the service's 400/409 response. Most responses are service DTOs rather than a universal `{success,data}` envelope. Deletes explicitly returning `{success:true}` and sync receipt envelopes are indicated by source. Controller links below resolve at the inspected application revision and provide exact parameter/schema/return delegation.

## Competition and event contracts

| Operation | Request / permission | Response or failure |
| --- | --- | --- |
| `PATCH /competitions/:id/hidden` | `{hidden:boolean}`; participant's resolved team, scoped to caller's user | `{hidden}`; bad boolean 400, absent competition 404, nonparticipant 403 |
| `PATCH /competitions/:id/archive` | `{archived:boolean}`; competition administrator | `{archived}`; bad boolean 400, nonadmin/absent 404, live fixture 409 |
| `POST /competitions/:id/fixtures/generate` | `{regenerate?:boolean,timezone?:string}`; admin; regenerate defaults false; timezone must be an accepted IANA zone | Service returns fixtures; unsafe regeneration/settings or participant changes reject rather than overwrite recorded play |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/accept` | `{expectedRevision:positiveInteger,competitionTeamId?:UUID}`; linked own coach, or admin for external slot | Revision-aware fixture schedule response |
| `POST /competitions/:id/fixtures/:fixtureId/schedule/propose` | Above revision/slot plus `scheduledAt` offset ISO datetime, optional note ≤500 | New schedule proposal resets applicable acceptance states |
| `POST /events` | Coach; title 1–150, event type, offset ISO `scheduledAt`; optional competition/friendly opponent, venue and notes fields | Creation requires a future scheduled instant for every event type; invalid/past time returns 400 |

Fixture generation uses the requested timezone or saved `competitions.schedule_timezone` (legacy default UTC). It interprets local start date, weekday and kickoff in that zone and persists UTC instants plus the timezone atomically. Calendar views use local calendar dates for display/filtering. Generation supports competition formats and safe regeneration; it does not implement every proposed automatic season-scheduling feature.

`friendlyPlayersPerSide` permits **5, 7 or 11**. Lineup/start services resolve the required starter count from competition format, friendly format, formation and default in the implemented order. Confirmed starters must be distinct, belong to the team and satisfy availability rules; bench cannot overlap. Formation `playerCount`/custom slot geometry must agree with the match format. The start schema's upper bound of eleven is not a fixed-eleven requirement.

## Shared logging, review and play state

`POST /matches/:matchId/events` uses `createMatchLogEventSchema`: required `clientRequestId` UUID, `team` own/opponent, `eventType`, integer `minute` 0–150; optional device/timestamp, period, elapsed time (0–10,800,000 ms), athlete or opponent identity, detail ≤500 and tactical-change delta. Own events cannot use opponent identity; opponent events cannot use private own-team athlete IDs. A substitution needs an incoming squad player where the roster-backed path applies. Scored penalties use a goal with `detail:"Penalty"`; misses use penalty with `detail:"Penalty missed"`. Tactical settings are own-team only, with public geometry sanitized before peer reads.

`POST /sync/upload` accepts `{items:[...]}` with 1–50 observations/operations. Observations contain `{kind:"observation",matchId,payload}`. Operations contain `{kind:"operation",id,matchId,operationType,causalParentIds}` and action-specific fields: correct (`canonicalEventId,replacement`), void (`canonicalEventId,reason?`) or resolve_review (`reviewId,resolution,explanation?`). Causal parents default to `[]`, maximum 50. Response is `{receipts:[...]}` with per-item accepted, dependency_pending or rejected outcomes. Lost responses retry the original ID/payload; ID reuse with changed content/user is rejected. Missing dependencies and missing receipts remain pending. See [offline collaboration](offline-collaboration.md).

| Route | Contract / result |
| --- | --- |
| `GET /matches/sessions/:sessionId/report`, `GET /matches/:matchId/session-report` | Authorized shared report including sporting timeline, score, clock, reviews/confirmation and revision state; private data sanitized |
| `POST /matches/:matchId/event-reviews/:reviewId/resolve` | Coach; `{resolution:"same_event"\|"separate_events",explanation?:string,operationId?:UUID,causalParentIds?:UUID[]}`; returns review state; cross-team matching decisions required |
| `POST /matches/:matchId/event-reviews/:reviewId/dispute` | Coach; records dispute through service; no body contract |
| `PATCH /matches/:matchId/events/:eventId` | Coach; nonempty partial update of identity, minute, event type/detail; returns changed event; report locks enforced |
| `DELETE /matches/:matchId/events/:eventId` | Coach; void/removal history and review cleanup; shared public event may originate on either sheet |
| `PATCH /matches/:matchId/clock` | Member; `{period,running,elapsedMs,operationId?,baseRevision?,clientCreatedAt?}`; base revision defaults 0 in request schema; returns refreshed match DTO |
| `POST /matches/:matchId/finish` | Member; no body; uses current authoritative revision, ends shared play, returns match DTO; UI confirms before calling |
| `POST /matches/:matchId/resume` | Coach; `{expectedClockRevision:integer≥0}`; restores latest playing half/elapsed time and clears pending confirmations; returns match DTO |
| `POST /matches/:matchId/finalise` | Coach; `{expectedRevision:integer≥1,expectedSessionRevision?:integer≥1}`; shared reports require the session revision; completed play, matching revisions and no unresolved public review required. Shared response `{confirmed:true,finalised:boolean}`; legacy response is the finalised projection. |
| `POST /matches/:matchId/reopen` | Coach; `{reason:string}` trimmed 3–500; shared pre-final report withdraws confirmation and returns `{withdrawn:true}`; published shared report rejects reopening |
| `POST /matches/:matchId/amendments` | Coach; stable `id`, `expectedSessionRevision≥1`, reason 3–500; action add + create replacement, correct + canonical ID/update replacement, or void + canonical ID; returns `{id,status:"pending"}` |
| `POST /matches/:matchId/amendments/:amendmentId/respond` | Coach; `{response:"approve"\|"reject"\|"request_changes"\|"withdraw",reason?}`; reason required for reject/request_changes; returns `{id,status}` |

Finalisation is bilateral for two connected teams. The unconnected competition opponent exception allows initial publication by the participating coach, subject to current revision, completion and review checks; it is not a timeout. Amendment acceptance **still requires valid home and away coach approvals**; the current code does not extend the single-coach exception to amendments. A pending/rejected/stale amendment preserves the published result. Queued obsolete review decisions cannot reopen reviews closed by deletion. Confirmed report locks and stale full-time checks protect a later resume.

## Controller route inventory

This inventory is extracted from current controller declarations. A named schema is the canonical input contract; “controller/service” means parameters or explicit validation should be read at the linked declaration. Better Auth's native catch-all paths are handled separately from controller-defined application routes. Guard presence is only the session layer; service role/state checks remain authoritative.

### ai-assistant

Source: [backend/src/ai-assistant/ai-assistant.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/ai-assistant/ai-assistant.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/ai-assistant/message` | `assistantMessageSchema`; session required |
| POST | `/ai-assistant/confirm` | `assistantConversationRefSchema`; session required |
| POST | `/ai-assistant/cancel` | `assistantConversationRefSchema`; session required |

### Application root

Source: [backend/src/app.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/app.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/` | Controller/service; see controller guard/token handling |

### athletes

Source: [backend/src/athletes/athletes.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/athletes/athletes.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/athletes` | `createAthleteSchema`; session required |
| GET | `/athletes` | Controller/service; session required |
| GET | `/athletes/archived` | Controller/service; session required |
| GET | `/athletes/:id` | Controller/service; session required |
| PATCH | `/athletes/:id` | `updateAthleteSchema`; session required |
| DELETE | `/athletes/:id` | Controller/service; session required |
| PATCH | `/athletes/:id/restore` | Controller/service; session required |
| POST | `/athletes/:athleteId/claim-invite` | `createClaimInviteSchema`; session required |
| DELETE | `/athletes/:athleteId/claim-invite` | Controller/service; session required |

### auth

Source: [backend/src/auth/auth.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/auth/auth.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/auth/sign-up` | `signUpSchema`; see controller guard/token handling |
| POST | `/auth/send-verification-email` | `resendVerificationEmailSchema`; see controller guard/token handling |
| GET | `/auth/verify-email` | Controller/service; see controller guard/token handling |
| POST | `/auth/forgot-password` | `requestPasswordResetSchema`; see controller guard/token handling |
| GET | `/auth/reset-password/:token` | Controller/service; see controller guard/token handling |
| POST | `/auth/reset-password` | `resetPasswordSchema`; see controller guard/token handling |
| POST | `/auth/sign-in` | `signInSchema`; see controller guard/token handling |
| POST | `/auth/change-email` | `changeEmailSchema`; session required |
| GET | `/auth/password-status` | Controller/service; session required |
| POST | `/auth/set-password` | `setPasswordSchema`; session required |
| POST | `/auth/change-password` | `changePasswordSchema`; session required |
| POST | `/auth/sign-out` | Controller/service; session required |
| GET | `/auth/session` | Controller/service; session required |
| POST | `/auth/sign-in/social` | Controller/service; see controller guard/token handling |
| GET | `/auth/callback/google` | Controller/service; see controller guard/token handling |

### claims

Source: [backend/src/claims/claims.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/claims/claims.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/claims/:token` | Controller/service; see controller guard/token handling |
| POST | `/claims/:token/accept` | Controller/service; session required |

### competition-invites

Source: [backend/src/competition-invites/competition-invites.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/competition-invites/competition-invites.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/competition-invites` | `createCompetitionInviteSchema`; session required |
| GET | `/competition-invites` | Controller/service; session required |
| DELETE | `/competition-invites/:id` | Controller/service; session required |
| POST | `/competition-invites/verification/:id/resolve` | `acceptVerificationSchema`; session required |
| GET | `/competition-invites/:token` | Controller/service; see controller guard/token handling |
| GET | `/competition-invites/:token/eligible-teams` | Controller/service; session required |
| POST | `/competition-invites/:token/request-representative` | Controller/service; session required |
| POST | `/competition-invites/:token/decline` | Controller/service; session required |
| POST | `/competition-invites/:token/accept` | `acceptCompetitionInviteSchema`; session required |

### competitions

Source: [backend/src/competitions/competitions.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/competitions/competitions.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/competitions/search` | `competitionSearchSchema`; session required |
| GET | `/competitions/mine` | Controller/service; session required |
| PATCH | `/competitions/:id/hidden` | Controller/service; session required |
| PATCH | `/competitions/:id/archive` | Controller/service; session required |
| GET | `/competitions/schedule-alerts` | Controller/service; session required |
| POST | `/competitions` | `createCompetitionSchema`; session required |
| GET | `/competitions/:id` | Controller/service; session required |
| PATCH | `/competitions/:id` | `updateCompetitionSchema`; session required |
| DELETE | `/competitions/:id` | Controller/service; session required |
| GET | `/competitions/:id/player-stats` | Controller/service; session required |
| GET | `/competitions/:id/fixtures` | Controller/service; session required |
| GET | `/competitions/:id/fixtures/:fixtureId/match-centre` | Controller/service; session required |
| POST | `/competitions/:id/fixtures/generate` | `generateFixturesSchema`; session required |
| POST | `/competitions/:id/fixtures/:fixtureId/schedule/accept` | `fixtureScheduleAcceptSchema`; session required |
| POST | `/competitions/:id/fixtures/:fixtureId/schedule/propose` | `fixtureScheduleProposalSchema`; session required |
| POST | `/competitions/:id/results` | `createCompetitionResultSchema`; session required |
| PATCH | `/competitions/:id/results/:resultId` | `updateCompetitionResultSchema`; session required |
| DELETE | `/competitions/:id/results/:resultId` | Controller/service; session required |
| POST | `/competitions/:id/teams` | `createCompetitionTeamSchema`; session required |
| PATCH | `/competitions/:id/teams/:competitionTeamId` | `renameCompetitionTeamSchema`; session required |
| DELETE | `/competitions/:id/teams/:competitionTeamId` | Controller/service; session required |

### dashboard

Source: [backend/src/dashboard/dashboard.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/dashboard/dashboard.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/dashboard` | Controller/service; session required |

### Database health

Source: [backend/src/database/database-health.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/database/database-health.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/health/database` | Controller/service; see controller guard/token handling |

### Operations health

Source: [backend/src/database/operations-health.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/database/operations-health.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/health/operations` | Controller/service; see controller guard/token handling |

### events

Source: [backend/src/events/events.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/events/events.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/events` | `createEventSchema`; session required |
| GET | `/events` | Controller/service; session required |
| GET | `/events/:eventId/link-diagnostic` | Controller/service; session required |
| POST | `/events/:eventId/start-match` | `startMatchSchema`; session required |
| POST | `/events/:eventId/rsvp` | `createRsvpSchema`; session required |
| GET | `/events/:eventId/rsvps` | Controller/service; session required |
| GET | `/events` | Controller/service; session required |
| GET | `/events/:eventId/competition-suspensions` | Controller/service; session required |
| PUT | `/events/:eventId/lineup` | `confirmLineupSchema`; session required |
| GET | `/events/:eventId/lineup` | Controller/service; session required |
| GET | `/events/:id` | Controller/service; session required |
| GET | `/events/:id/weather` | Controller/service; session required |
| PATCH | `/events/:id` | `updateEventSchema`; session required |
| DELETE | `/events/:id` | Controller/service; session required |

### friendly-fixtures

Source: [backend/src/friendly-fixtures/friendly-fixtures.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/friendly-fixtures/friendly-fixtures.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/friendly-fixtures/incoming` | Controller/service; session required |
| POST | `/friendly-fixtures/:id/accept` | Controller/service; session required |
| POST | `/friendly-fixtures/:id/decline` | Controller/service; session required |

### game-plans

Source: [backend/src/game-plans/game-plans.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/game-plans/game-plans.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/game-plans` | Controller/service; session required |
| GET | `/game-plans/:id` | Controller/service; session required |
| POST | `/game-plans` | `createGamePlanSchema`; session required |
| PATCH | `/game-plans/:id` | `updateGamePlanSchema`; session required |
| DELETE | `/game-plans/:id` | Controller/service; session required |

### injuries

Source: [backend/src/injuries/injuries.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/injuries/injuries.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/injuries` | `createInjurySchema`; session required |
| GET | `/injuries` | `listInjuriesQuerySchema`; session required |
| GET | `/injuries/protocol` | `injuryProtocolQuerySchema`; session required |
| GET | `/injuries/recovery/:athleteId` | Controller/service; session required |
| GET | `/injuries/:id` | Controller/service; session required |
| PATCH | `/injuries/:id` | `updateInjurySchema`; session required |
| PATCH | `/injuries/:id/close` | `closeInjurySchema`; session required |
| POST | `/injuries/:id/timeline` | `createInjuryTimelineEntrySchema`; session required |
| DELETE | `/injuries/:id` | Controller/service; session required |

### matches

Source: [backend/src/matches/matches.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/matches/matches.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/matches/sessions/:sessionId/report` | Controller/service; session required |
| GET | `/matches/:matchId/session-report` | Controller/service; session required |
| GET | `/matches/:matchId/squad` | Controller/service; session required |
| GET | `/matches/:matchId/opponent-squad` | Controller/service; session required |
| GET | `/matches/:matchId/insight` | Controller/service; session required |
| GET | `/matches/:matchId/events` | Controller/service; session required |
| POST | `/matches/:matchId/events` | `createMatchLogEventSchema`; session required |
| GET | `/matches/:matchId/event-reviews` | Controller/service; session required |
| GET | `/matches/:matchId/event-operations` | Controller/service; session required |
| POST | `/matches/:matchId/event-reviews/:reviewId/resolve` | `resolveMatchEventReviewRequestSchema`; session required |
| POST | `/matches/:matchId/event-reviews/:reviewId/dispute` | Controller/service; session required |
| PATCH | `/matches/:matchId/events/:eventId` | `updateMatchLogEventSchema`; session required |
| DELETE | `/matches/:matchId/events/:eventId` | Controller/service; session required |
| POST | `/matches/:matchId/finish` | Controller/service; session required |
| POST | `/matches/:matchId/resume` | `resumeMatchSchema`; session required |
| POST | `/matches/:matchId/finalise` | `finaliseMatchProjectionSchema`; session required |
| GET | `/matches/:matchId/amendments` | Controller/service; session required |
| POST | `/matches/:matchId/amendments` | `requestMatchAmendmentSchema`; session required |
| POST | `/matches/:matchId/amendments/:amendmentId/respond` | `respondMatchAmendmentSchema`; session required |
| POST | `/matches/:matchId/reopen` | `reopenMatchProjectionSchema`; session required |
| PATCH | `/matches/:matchId/clock` | `updateMatchClockSchema`; session required |
| GET | `/matches/:matchId/clock-operations` | Controller/service; session required |
| GET | `/matches/:matchId` | Controller/service; session required |

### player

Source: [backend/src/player/player.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/player/player.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/player/me` | Controller/service; session required |
| GET | `/player/team` | Controller/service; session required |
| GET | `/player/events` | Controller/service; session required |
| GET | `/player/standings` | Controller/service; session required |

### profile

Source: [backend/src/profile/profile.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/profile/profile.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/profile` | Controller/service; session required |
| PATCH | `/profile` | `updateProfileSchema`; session required |
| DELETE | `/profile` | Controller/service; session required |

### seasons

Source: [backend/src/seasons/seasons.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/seasons/seasons.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/seasons` | Controller/service; session required |
| POST | `/seasons` | `createSeasonSchema`; session required |
| PATCH | `/seasons/:id` | `updateSeasonSchema`; session required |
| DELETE | `/seasons/:id` | Controller/service; session required |

### statistics

Source: [backend/src/statistics/statistics.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/statistics/statistics.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/statistics/season-insight` | Controller/service; session required |
| POST | `/statistics/season-insight` | `generateSeasonInsightSchema`; session required |
| POST | `/statistics/assistant` | `askAssistantSchema`; session required |
| GET | `/statistics` | Controller/service; session required |
| GET | `/statistics/athletes/:id` | Controller/service; session required |
| GET | `/statistics/compare` | `compareAthletesSchema`; session required |
| GET | `/statistics/competitions` | Controller/service; session required |
| POST | `/statistics/competitions` | `createCompetitionSchema`; session required |
| PATCH | `/statistics/competitions/:id` | `updateCompetitionSchema`; session required |
| DELETE | `/statistics/competitions/:id` | Controller/service; session required |
| POST | `/statistics/competitions/:id/standings` | `createStandingSchema`; session required |
| PATCH | `/statistics/standings/:id` | `updateStandingSchema`; session required |
| DELETE | `/statistics/standings/:id` | Controller/service; session required |

### sync

Source: [backend/src/sync/sync-jwks.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync-jwks.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/sync/jwks` | Controller/service; see controller guard/token handling |

### sync

Source: [backend/src/sync/sync.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/sync/sync.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/sync/token` | Controller/service; session required |
| POST | `/sync/upload` | `syncUploadSchema`; session required |
| POST | `/sync/telemetry` | `syncTelemetrySchema`; session required |

### team-invites

Source: [backend/src/team-invites/team-invites.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/team-invites/team-invites.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| POST | `/team-invites` | `createTeamInviteSchema`; session required |
| GET | `/team-invites` | Controller/service; session required |
| GET | `/team-invites/assistants` | Controller/service; session required |
| DELETE | `/team-invites/:id` | Controller/service; session required |
| DELETE | `/team-invites/assistants/:id` | Controller/service; session required |
| GET | `/team-invites/:token` | Controller/service; see controller guard/token handling |
| POST | `/team-invites/:token/accept` | Controller/service; session required |

### teams

Source: [backend/src/teams/teams.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/teams/teams.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/teams/search` | `teamSearchSchema`; session required |
| POST | `/teams` | `createTeamSchema`; session required |
| PATCH | `/teams` | `updateTeamSchema`; session required |

### weather

Source: [backend/src/weather/locations.controller.ts](https://sdp.ms.wits.ac.za/SDP-Interlude/SportCoachingTool/src/commit/f23cbd1c53fbc14dd4579467bcb38f43df0335d0/backend/src/weather/locations.controller.ts).

| Method | Path | Input / session layer |
| --- | --- | --- |
| GET | `/locations/search` | Controller/service; session required |
| GET | `/locations/reverse` | Controller/service; session required |

## Operational boundaries

`GET /sync/token` is session-protected and returns `{endpoint,token,expiresAt}` with five-minute expiry. `GET /sync/jwks` is a verification-key endpoint, not a protected application write. `/health/operations` uses its dedicated bearer token. See [operations](operations/offline-operations-runbook.md), [PowerSync security](security/powersync-security.md) and [refresh](automatic-data-refresh.md).
