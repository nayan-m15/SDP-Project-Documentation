# Testing and Quality Assurance

## Evidence classification

Keep these states separate: a test exists; a local command passed; CI is configured; a specific CI run passed; a revision is deployed; a stakeholder accepted it. One state does not prove the next.

## Current local result

On 14 September 2026 at application commit `e7285f533b854c4da753c73e22a2a38f580588dc`:

- `npm.cmd --prefix backend test -- --runInBand` — **32/32 suites and 312/312 tests passed; 0 snapshots**.
- Each of the eight `frontend/src/**/*.node-test.mjs` files completed successfully when run individually.

Integration and Playwright suites were not run because no safe disposable test database was prepared. This result is not a CI, coverage, deployment, release or acceptance result.

## Test pyramid and commands

| Layer | Command | What it exercises | Current result |
| --- | --- | --- | --- |
| Backend unit/component | `npm.cmd --prefix backend test -- --runInBand` | Jest `backend/src/**/*.spec.ts` | Passed locally as recorded above |
| Frontend model regression | `node <frontend/src/.../*.node-test.mjs>` | Eight focused match/statistics/formation model scripts | Passed locally, individually |
| API integration | `npm.cmd run test:integration` or `npm.cmd run test:e2e` | Jest/Supertest, Nest and PostgreSQL | Not run in this audit |
| Browser end-to-end | `npm.cmd run test:e2e:ui` | Playwright, Vite, Nest and database-backed flows | Not run in this audit |
| Quality/build | `npm.cmd run lint` and `npm.cmd run build` | Frontend/backend lint and builds | CI-configured; no successful run evidence supplied |
| Coverage | `npm.cmd --prefix backend run test:cov` | Backend Jest coverage, consumed by SonarQube | Passed, coverage report generated |

## Disposable database protection

`backend/test/setup-isolated-db.ts` requires `TEST_DATABASE_URL`, refuses it when equal to `DATABASE_URL`, then maps the isolated value for application use. Use a disposable database or Neon branch, verify the two URLs differ, migrate it, run stateful tests serially, retain results, and dispose of it according to team policy. Do not point integration or Playwright tests at shared/production data.

The Playwright web-server path starts the normal backend, so the operator must also explicitly set both database variables to the disposable target for that run.

## Gitea Actions configuration

Application file `.gitea/workflows/test.yml` exists. Commit `94a8757c` added it; `33ce39b6` fixed the UI-server port collision; `47ee8c67` aligned UI locators; `effc97cf` merged the work into `development`; and `e7285f53` adjusted UI flows for CI database latency.

- **quality-and-build:** install root/frontend/backend dependencies, lint, then build.
- **api-tests:** install backend dependencies, run unit tests, migrate `secrets.TEST_DATABASE_URL`, then run integration tests.
- **ui-tests:** depends on `api-tests`, uses port 3100, migrates the test database, installs Playwright Chromium and runs `npm run test:e2e:ui`.
- **failure artifacts:** on UI failure, uploads `playwright-report/` and `test-results/` through `actions/upload-artifact@v3` when present.

The runner requires compatible Ubuntu, Node 22, npm access, Playwright system dependencies, and a disposable `TEST_DATABASE_URL` secret. Auth/frontend URLs and a CI-only Better Auth secret are configured in the workflow.

### Open trigger blocker

The actual integration branch is `development`, but the workflow watches pushes to `[main, develop]` and pull requests only to `main`. Therefore pushes to `development` and pull requests targeting `development` miss the intended checks. This documentation repository does not fix the application workflow; the blocker remains until an application change and resulting run are verified.

The workflow also does **not** run the eight frontend `*.node-test.mjs` scripts. Add an aggregate application command/job before claiming CI coverage for them.

Configuration existence does not prove a successful Gitea Actions run. No run URL/log, branch-protection evidence or continuous-deployment job was supplied. The workflow is CI, not proven continuous deployment.

## Manual acceptance areas

- Authentication/verification and forbidden-action checks for coach, assistant and player roles
- Cross-team isolation, roster archive/restore and invalid data
- Match setup, opponent modes, live events, idempotency, correction and derived statistics
- Season boundaries, comparisons, standings, reminders and Open-Meteo states
- Responsive/mobile navigation, keyboard use, focus, contrast and browser coverage
- Public API list/filter/400/404, CORS and Swagger checks after deployment

## Evidence-record template

| Field | Record |
| --- | --- |
| Date/time and operator | |
| Repository/revision | |
| Environment and database identifier | |
| Exact command/scenario | |
| Expected and actual result | |
| Pass/fail/blocked | |
| Logs, screenshots, report or CI-run link | |
| Limitations/follow-up card | |
| Reviewer/stakeholder decision, if recorded | |

Never turn an unchecked template, existing test file, Trello checklist or demonstration plan into a claimed result.
