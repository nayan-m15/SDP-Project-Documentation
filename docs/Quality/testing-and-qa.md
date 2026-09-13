# Testing and Quality Assurance

## Procedures versus results

This page documents how tests are structured and how to perform acceptance checks. No stateful integration/browser test was run against a shared or production database while preparing the recorded Sprint 2 evidence.

## Recorded result (partial, local)

On 13 September 2026, application commit `aadf745eb7a9d309bf847bb3afb2789dbddbabc6`, Node `v24.14.0`, npm `11.9.0`:

- `npm --prefix backend test -- --runInBand`: 30/30 suites and 291/291 tests passed.
- all eight `frontend/src/**/*.node-test.mjs` files completed successfully when invoked individually.

This is not a full release result: integration and Playwright suites were not run, no coverage report was generated, and the output is not an immutable CI artifact. Only successful, completed commands are counted in the recorded result.

## Automated layers

| Layer | Command | Scope | Prerequisites |
| --- | --- | --- | --- |
| Backend unit | `npm test` | Jest `backend/src/**/*.spec.ts`; services/controllers mostly use mocks. | Installed backend packages; no test DB expected. |
| Backend integration | `npm run test:e2e` or `npm run test:integration` | Jest/Supertest `backend/test/**/*.e2e-spec.ts`, real Nest app and PostgreSQL. | Migrated disposable `TEST_DATABASE_URL`; it must differ from `DATABASE_URL`. |
| Browser end-to-end | `npm run test:e2e:ui` | Playwright `e2e/**/*.spec.ts`, real Vite and Nest processes. | Safe reachable database/configuration; test users/data are created. |
| Frontend model scripts | `node <path-to-file.node-test.mjs>` | Eight focused Node assertion scripts for match/statistics/formation models. | Run individually from repository root; no package script aggregates them. |

The root `npm test` invokes only backend Jest unit tests. The Playwright configuration has one project, `chromium` using Desktop Chrome, with one worker. Firefox, WebKit and mobile-device projects are **not** configured. Some specs change viewport sizes, but that is not equivalent to cross-browser coverage.

## Database isolation

`backend/test/setup-isolated-db.ts` loads the root `.env`, requires `TEST_DATABASE_URL`, refuses to continue if it equals `DATABASE_URL`, and then maps it to `DATABASE_URL` before importing the application. Integration helpers create unique test identities and clean up team/user data. This guard does not apply automatically to Playwright: its web server starts the normal backend, so the operator must explicitly point that run at a disposable database.

Never run stateful tests against the hosted/shared Neon database. Prefer a disposable database or Neon branch, migrate it, verify both URLs, run serially, then remove it according to team policy.

## Existing coverage areas

Backend specifications cover authentication, athlete/event validation and services, team isolation, dashboard, invitations/claims/player views, game plans, seasons/date windows, match contracts/services, statistics/trends, weather and email behaviour. Integration files cover app/auth, athletes, events, dashboard, statistics and team isolation. Browser specs cover main flows, invitations/team management and UI regression scenarios. Test presence is evidence of intent and coverage design, not a pass result.

## Manual acceptance checklist

Record environment, account role, commit/deployment, date, expected/actual result and evidence for every item.

### Authentication and authorisation

- [ ] Register by email; verify that sign-in is withheld until email verification; then sign in/out.
- [ ] Sign in through Google in the configured environment.
- [ ] Confirm a logged-out visitor is redirected from protected pages.
- [ ] Confirm assistant/player cannot perform coach-only mutations by direct API request, not only hidden UI.
- [ ] Confirm expired, revoked, reused and wrong-email assistant/claim links fail safely.

### Team isolation and roster

- [ ] With two teams, confirm neither role can read or mutate the other's athlete/event/match IDs.
- [ ] Create/edit/search/archive/restore an athlete and confirm history remains available.
- [ ] Exercise blank/overlong names, invalid status/position, duplicate selection and cross-team IDs.

### Match preparation

- [ ] Reject fewer/more than 11 starters, duplicate starters, starter/bench overlap, archived/injured/suspended players and more than 20 bench players.
- [ ] Start a match with opponent mode `none` and no opponent players.
- [ ] Start with `numbers`; require at least one unique 1–99 number and ensure names are not retained.
- [ ] Start with `full`; require names, preserve optional position and unique shirt number.
- [ ] Confirm selected game plan is snapshotted and later plan edits do not rewrite match history.

### Live logging, corrections and statistics

- [ ] Start/pause/half-time/resume/finish the clock and reload to confirm server persistence.
- [ ] Log each supported event type for own/opponent sides; verify score, timeline, pitch state and attribution.
- [ ] Repeat the same `clientRequestId` request and verify it does not create a duplicate.
- [ ] Edit participants/type/minute/detail, add a post-match event, delete it, and verify `manuallyAdjusted` behaviour.
- [ ] Verify linked goals/assists, substitutions, penalties and red cards remain internally consistent.
- [ ] Reconcile team totals, match report, athlete totals, recent form, season trend and comparison data against a small known event ledger.

### Scheduling, RSVPs, weather and reminders

- [ ] Create/edit/cancel/delete each event type and verify coach/player views show the same schedule.
- [ ] RSVP all three statuses with/without a note; verify update semantics and coach groups/no-response list.
- [ ] Search a valid location and verify weather; test missing location, cancelled event, past/future range and provider-unavailable UI.
- [ ] Verify only scheduled events in the next 24 hours produce an in-app reminder; dismiss/reload on the same device.
- [ ] Confirm no email/push reminder or cross-device dismissal is claimed.

### Layout, keyboard and accessibility

- [ ] Test supported phone, tablet and desktop widths for overflow, menus, dialogs, pitch and charts.
- [ ] Complete sign-in, roster, calendar, match setup/logger and RSVP using keyboard only.
- [ ] Confirm visible focus, dialog focus containment/return, Escape behaviour and meaningful control names.
- [ ] Check headings, landmarks, labels, validation announcements, colour contrast and zoom to 200%.
- [ ] Run an accessibility scanner, then manually assess findings; component libraries do not guarantee compliance.

## Formal user-testing procedure

1. Define the research question, participant profile, consent/privacy approach and safe test environment.
2. Freeze the tested commit/deployment and seed a non-sensitive scenario with known expected totals.
3. Give the participant neutral tasks, not instructions for each click. Suggested tasks: join a team, find an event/RSVP, prepare an XI, record/correct a goal, and explain a statistics trend.
4. Record task completion, errors, time/hesitation, quotes only with consent, accessibility needs and facilitator interventions.
5. Ask consistent post-task questions: confidence, difficulty, expected-versus-observed behaviour and most important improvement.
6. Remove identifiers, group findings by severity/frequency, link each accepted issue to the bug/product tracker, and record the team's decision.
7. Retest fixes against the same scenario. Keep raw consent/data according to the agreed retention policy.

## Reusable feedback record

```text
Session ID (non-identifying):
Date / facilitator:
Build or commit / environment:
Participant profile and relevant access needs:
Consent recorded at:

Task:
Expected outcome:
Completed? Yes / Partial / No
Time and observed path:
Errors, hesitation, assistance:
Participant feedback (paraphrase; quote only with consent):

Finding ID / severity / frequency:
Evidence link:
Recommended change:
Tracker link and owner (only after assignment):
Team decision / rationale:
Retest result and date:
```

## Test-result record

For any future claimed run, store: commit SHA, clean/dirty state, command, Node/npm/browser versions, database identifier (never credentials), start/end time, pass/fail/skip counts, logs/screenshots, known retries and a link to the immutable artifact.

The [Sprint 2 Test Report](sprint-2-test-report.md) records the authentic partial local result and a proposed change-to-test policy. Trello checklist ticks are board evidence, not substitutes for linked test output.
