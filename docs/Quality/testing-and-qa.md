# Testing and Quality Assurance

## Evidence classification

Keep these states separate: a test exists; a local command passed; CI is configured; a specific CI run passed; a revision is deployed; a stakeholder accepted it. One state does not prove the next.

**Configuration review, 25 September 2026:** application commit `01bd478fbdb99fc1214c12f3723972d76448b3f2`. The changes since the 24 September source snapshot affect Playwright and Gitea Actions configuration. No successful CI run, current coverage percentage or production deployment was independently verified in this review. The 14 September results below remain historical.

## Current local result

On 14 September 2026 at application commit `e7285f533b854c4da753c73e22a2a38f580588dc`:

- `npm.cmd --prefix backend test -- --runInBand` — **32/32 suites and 312/312 tests passed; 0 snapshots**.
- Each of the eight `frontend/src/**/*.node-test.mjs` files completed successfully when run individually.

Integration and Playwright suites were not run because no safe disposable test database was prepared. This result is not a CI, coverage, deployment, release or acceptance result.

## Test pyramid and commands

| Layer | Command | What it exercises | Current result |
| --- | --- | --- | --- |
| Backend unit/component | `npm.cmd --prefix backend test -- --runInBand` | Jest `backend/src/**/*.spec.ts` | Passed locally as recorded above |
| Frontend model regression | `npm.cmd --prefix frontend test` | Frontend Node regression scripts | Historical individual files passed; current aggregate result unverified |
| API integration | `npm.cmd run test:integration` or `npm.cmd run test:e2e` | Jest/Supertest, Nest and PostgreSQL | Not run in this audit |
| Browser end-to-end | `npm.cmd run test:e2e:ui` | Playwright, Vite, Nest and database-backed flows | Supplied main-flow artifact is a failure: Dashboard heading missing while `Loading workspace...` remained visible. No current full-suite pass recorded. |
| Quality/build | `npm.cmd run lint` and `npm.cmd run build` | Frontend/backend lint and builds | CI-configured; no successful run evidence supplied |
| Coverage | `npm.cmd --prefix backend run test:cov` | Backend Jest coverage, consumed by SonarQube | Historical report mentioned, but no reproducible current percentage supplied; the brief's >30% and >60% bands are unverified. |

At the 25 September configuration review, root `npm test` runs match-domain and backend tests. `npm.cmd --prefix frontend test` runs the frontend Node tests. `npm run test:e2e:pwa` uses the separate PWA Playwright configuration. Test file presence and workflow configuration do not establish a pass. Record exact totals, command output and environment for any future claim.

## Disposable database protection

`backend/test/setup-isolated-db.ts` requires `TEST_DATABASE_URL`, refuses it when equal to `DATABASE_URL`, then maps the isolated value for application use. Use a disposable database or Neon branch, verify the two URLs differ, migrate it, run stateful tests serially, retain results, and dispose of it according to team policy. Do not point integration or Playwright tests at shared/production data.

The Playwright web-server path starts the normal backend, so the operator must also explicitly set both database variables to the disposable target for that run.

## Gitea Actions configuration

Application file `.gitea/workflows/test.yml` exists. Commit `94a8757c` added it; `33ce39b6` fixed the UI-server port collision; `47ee8c67` aligned UI locators; `effc97cf` merged the work into `development`; and `e7285f53` adjusted UI flows for CI database latency.

- **quality-and-build:** install root/frontend/backend dependencies, run frontend tests, lint, then build.
- **api-tests:** install backend dependencies, run unit tests, migrate `secrets.TEST_DATABASE_URL`, then run integration tests.
- **ui-tests-shard-1/2:** two separate runner jobs depend on `api-tests`, migrate the test database, install Playwright Chromium and run the two halves of the UI suite. Each shard uses one Playwright worker and a 30-minute suite limit; the first shard also runs the PWA checks. The job limits are 50 minutes at the reviewed commit.
- **failure artifacts:** on UI failure, uploads `playwright-report/` and `test-results/` through `actions/upload-artifact@v3` when present.

The runner requires compatible Ubuntu, Node 22, npm access, Playwright system dependencies, and a disposable `TEST_DATABASE_URL` secret. Auth/frontend URLs and a CI-only Better Auth secret are configured in the workflow.

### Branch trigger correction

The 14 September audit found that the workflow missed `development`. At application commit `ef2880ad`, `.gitea/workflows/test.yml` lists `[main, develop, development]` for both pushes and pull requests, so that source-level trigger defect has been corrected. A matching successful run and branch protection remain unverified.

The 25 September workflow source **does** run `npm --prefix frontend test` in its quality/build job. That establishes CI configuration for frontend Node tests, not a successful run.

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
