# Sprint 2 Implementation and Evidence Summary

## Basis and limits

This is a repository-derived implementation summary, not a reconstruction of the agreed sprint backlog. Evidence was inspected at application commit `aadf745e` on 13 September 2026; the local `development` branch contained one additional commit, so the team should confirm which revision is the assessment baseline. No owners are inferred.

## Verifiable implementation areas

| Area | Repository evidence | Evidence strength / remaining acceptance work |
| --- | --- | --- |
| Roles and permissions | Auth guard, team access helpers, assistant invite and player claim modules; authorisation/unit/integration tests. | Code and automated test definitions exist; provide a named test run and manual forbidden-action demo. |
| Live logging | Match REST endpoints, persistent clock/events, live UI and request idempotency index. | Implemented via REST; no Socket.io collaboration or offline durability. |
| Corrections | PATCH/DELETE event endpoints and editable post-match report model/UI. | Code and focused model tests exist; demonstrate recomputed score/stat consistency. |
| Statistics/trends/comparison | Statistics service/controllers, season model, Recharts UI and up-to-four player comparison. | Unit/integration and `.node-test.mjs` files exist; no supplied executed-result artifact. |
| RSVPs/shared schedule | Player event feed, RSVP endpoint/table/widget, coach breakdown. | One per event/athlete; manually verify team isolation. |
| Location/weather | Open-Meteo geocoding and weather service with explicit fallback statuses. | Unit tests exist; provider-dependent manual demo needed. |
| Reminders | Next-24-hours banner and local dismissal. | Partial: in-app only, no email/push. |
| Game plans/match preparation | Game-plan CRUD, formation/tactics UI, match snapshots and XI/opponent validation. | Demonstrate exactly-11, ineligible player and all opponent modes. |

## Automated evidence present in source

- Backend Jest unit specifications under `backend/src/**/*.spec.ts`.
- Backend Supertest integration specifications under `backend/test/**/*.e2e-spec.ts`, with a guard requiring `TEST_DATABASE_URL` distinct from `DATABASE_URL`.
- Playwright specifications under `e2e/`, configured for one Chromium project, one worker and real local servers.
- Eight frontend `*.node-test.mjs` model scripts. Root/package scripts do not aggregate these.

### Audit-time safe test run

On 13 September 2026, against clean application commit `aadf745eb7a9d309bf847bb3afb2789dbddbabc6`, Node `v24.14.0` and npm `11.9.0`:

- `npm --prefix backend test -- --runInBand`: **30 suites passed, 291 tests passed, 0 snapshots**.
- all eight `frontend/src/**/*.node-test.mjs` scripts run individually with Node: **8 files completed successfully** (the season-trends script reported 11 assertions).

No integration or browser suite was run because those are stateful and no disposable test database was prepared. The first root-script attempt did not forward `--runInBand` and hit a sandbox process-spawn error; it is not counted as an application test result. The successful commands above are local audit output, not an immutable CI artifact or stakeholder acceptance.

## Deployment/API evidence

On 13 September 2026 the following returned HTTP 200: hosted frontend, API root, Swagger UI and OpenAPI JSON. The OpenAPI document exposed 53 paths, no declared security scheme and only two component schemas (`StartMatchBodyDto` and `OpponentSquadPlayerBodyDto`). See [API Guide](../Architecture/api-guide.md).

## Evidence not supplied

- An agreed Sprint 2 scope/commitment and named owners tied to tracker items
- Stakeholder review outcome or approval
- Formal user-testing sessions and feedback
- A retained/immutable test report for the full unit, integration and browser layers (the audit-time unit/model result above is only partial coverage)
- Bug tracker export/links showing triage and closure
- CI workflow/run and branch-protection evidence
- Fresh-install and upgrade migration results

Existing meeting documents are preserved and linked from the assessment landing page; future meeting uploads remain a team process.
