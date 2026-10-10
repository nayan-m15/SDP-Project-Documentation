# Testing and Quality Assurance

## Evidence classification

Keep these states separate: a test exists; a local command passed; CI is configured; a specific CI run passed; a revision is deployed; a stakeholder accepted it. One state does not prove the next.

**Source of this revision, 10 October 2026:** the commands, suite sizes, browser suites and CI jobs below come from the application repository's testing and continuous-integration guide as of 10 October 2026. They describe what exists and what is configured; suite sizes are test counts, not pass results. No successful CI run, coverage percentage or production deployment was independently verified for this update. The 25 September configuration review (application commit `01bd478fbdb99fc1214c12f3723972d76448b3f2`) and the 14 September results below remain historical.

## Recorded results

**Documentation repository checks, 10 October 2026:**

- `npm.cmd run validate` - **passed**; all 52 manifest entries match the 52 Markdown files, and the validator reported no broken local links or other documentation errors.
- `git diff --check` - **passed**; no whitespace errors were reported for the changes checked.

These checks cover documentation inventory, local links and formatting only. They do not run or establish a pass for the Gaffer application's tests.

**Latest recorded application test run, 14 September 2026,** at application commit `e7285f533b854c4da753c73e22a2a38f580588dc`:

- `npm.cmd --prefix backend test -- --runInBand` — **32/32 suites and 312/312 tests passed; 0 snapshots**.
- Each of the eight `frontend/src/**/*.node-test.mjs` files completed successfully when run individually.

Integration and Playwright suites were not run because no safe disposable test database was prepared. That run predates the current suites (88 backend spec files and 33 frontend model files on 10 October) and is not a CI, coverage, deployment, release or acceptance result.

A supplied browser main-flow artifact recorded a failure: the Dashboard heading was missing while `Loading workspace...` remained visible. No full browser-suite pass has been recorded here.

## Test layers

Every pull request to `main`, `develop` or `development`, and every push to those branches, runs the application's `.gitea/workflows/test.yml` on the `ubuntu-latest` runner label with Node 22. Change `runs-on` if the enabled Linux/Docker runners use a different label.

Sizes are counts in the application source on 10 October 2026, not results. For dated, source-level performance observations, see the [Performance Status Review](performance-review.md).

| Layer | Command | Size | Purpose |
| --- | --- | --- | --- |
| Code quality | `npm run lint` | — | Oxlint for the frontend (warnings fail the run) and ESLint for the backend. |
| Build | `npm run build` | — | Type-checks and builds both applications (`tsc -b && vite build`, `nest build`). |
| Shared domain | `npm --prefix packages/match-domain test` | 7 tests | Shared match-domain rules used by the backend. |
| Backend unit | `npm --prefix backend test` | 88 spec files, 1,430 tests | Isolated Jest service/controller tests under `backend/src`. Nine specs run real SQL against in-memory PGlite databases, which is why the script enables `--experimental-vm-modules`. |
| Frontend model | `npm --prefix frontend test` | 33 files, 154 tests | `node --test` over `src/**/*.node-test.mjs`, each file in its own process: match and team report models, live logging and session reports, statistics and season trends, injuries, formations and tactics, landing scene scheduling, offline sync, query caching and secure logout. |
| Migration regression | `npm run test:migrations` | 13 tests | Checks migration history planning and replays six recent migrations (0057–0061 and 0063) against disposable PGlite databases. |
| API/integration | `npm run test:integration` | 18 spec files | Supertest flows against a real, freshly migrated test database: authentication, password-reset rate limits, authorization, team isolation, athletes, events, injuries, game plans, competitions, friendly fixtures, dashboards, insights, statistics, the public API and offline sync. |
| Browser/UI | `npm run test:e2e:ui` | 82 tests in 11 files | Chromium against the real frontend and backend. See [Browser suites](#browser-suites). |
| Production PWA | `npm run test:e2e:pwa` | 1 test | Runs the built app with the service worker enabled, which every other browser suite blocks. |
| Coverage | `npm --prefix backend run test:cov` | — | Backend Jest coverage consumed by SonarQube. See [SonarQube](#sonarqube). |

`npm test` at the root runs the shared-domain tests and then the backend unit tests. Backend Jest options pass through it, for example `npm test -- --runInBand`.

Only backend code reports coverage; frontend tests do not emit LCOV yet. No reproducible current coverage percentage has been supplied, so the brief's >30% and >60% bands remain unverified.

**Documentation repository.** `npm run validate` checks manifest sizes and inventory, local Markdown links and repository documentation rules; `git diff --check` checks whitespace in changed tracked files. `.github/workflows/docs-validation.yml` runs `npm ci`, `npm run validate` and `npm run check:js` on pushes and pull requests. That is workflow configuration only; no successful run URL or log has been recorded.

## Run tests locally

Install the three dependency sets once:

```sh
npm ci
npm --prefix frontend ci
npm --prefix backend ci
```

Set `TEST_DATABASE_URL` in the uncommitted root `.env` to a dedicated PostgreSQL/Neon database. It must be different from `DATABASE_URL`; the integration setup (`backend/test/setup-isolated-db.ts`), the test migrator and the browser launcher all refuse to run when the two match. Never point tests at shared or production data.

```sh
npm run lint
npm run build
npm test
npm --prefix frontend test
npm run test:migrations
npm run test:integration
npm run test:e2e:ui
```

On Windows PowerShell, use `npm.cmd` if script execution blocks `npm`.

### Test database

`npm --prefix backend run db:migrate:test` **drops and recreates** the `public` and `drizzle` schemas of `TEST_DATABASE_URL`, then replays the full migration history. `npm run test:integration` runs it automatically before Jest, so every integration run starts from a clean schema. Browser tests do not reset the database; run `db:migrate:test` yourself before the first browser run and after pulling new migrations.

Never run `db:migrate:test` or `test:integration` while browser tests use the same database: the reset wipes the schema from under them.

To avoid sharing one test database, create a private throwaway database next to it. The role in `TEST_DATABASE_URL` must be allowed to create databases.

```sh
node backend/scripts/ci-test-database.mjs create local   # prints the new URL
```

Point `TEST_DATABASE_URL` at the printed URL for your session, run the suites, then remove it with `node backend/scripts/ci-test-database.mjs drop`. The script only drops databases it created (`ci_test_*`), and every `create` also sweeps `ci_test_*` databases older than three hours.

### Email and rate limits in tests

Integration tests (`backend/test/setup-isolated-db.ts`) and the browser launcher (`scripts/run-ui-tests.mjs`) both set `BREVO_API_KEY` to an empty string, so no test sends real email even when `.env` holds a live key. Because sign-up withholds the session until the address is verified, the backend helpers (`backend/test/utils/auth-helpers.ts`) set the verified flag directly in the database, and the browser helpers (`frontend/e2e/utils/auth.ts`) mint a verification token with `BETTER_AUTH_SECRET` and redeem it through `GET /auth/verify-email`.

Both also raise `AUTH_SIGN_IN_RATE_LIMIT` and `AUTH_EMAIL_RATE_LIMIT` to `10000:60` unless already set. Every suite signs up from the same loopback address, so production-sized budgets would be exhausted by unrelated tests. A suite that needs a real limit sets its own small budget per test.

Test sign-ups must satisfy the password policy: at least 8 characters with an uppercase letter, a lowercase letter, a number and a symbol (the browser helpers use `Password123!`).

## Browser suites

`npm run test:e2e:ui` runs `scripts/run-ui-tests.mjs`, which:

- requires `TEST_DATABASE_URL` and gives it to the API as `DATABASE_URL`;
- allocates two free local ports for the backend and frontend, so a running development server cannot serve the tests development data;
- blanks `BREVO_API_KEY` and raises the auth rate limits (see above);
- passes any extra arguments to `playwright test`, for example `npm run test:e2e:ui -- --grep "tactics"`.

Locally, the default config (`playwright.config.ts`) starts the backend with `start:dev` and the frontend with the Vite dev server. In CI, or with `UI_TEST_PRODUCTION=true` after `npm run build`, it serves the production builds (`start:prod` and `vite preview`) instead.

| Spec | Tests | Backend |
| --- | --- | --- |
| `player-instructions.spec.ts` | 1 | Real API and database |
| `tactics-save.spec.ts` | 2 | Real API and database |
| `team-management-status.spec.ts` | 1 | Real API and database |
| `team-mobile-layout.spec.ts` | 1 | Real API and database |
| `regression-ui.spec.ts` | 24 | Mocked API routes |
| `statistics-report.spec.ts` | 22 | Mocked API routes |
| `landing-scene.spec.ts` | 12 | Mocked API routes, WebGL scene |
| `offline-event-logging.spec.ts` | 8 | Mocked API routes |
| `public-dashboard-carousel.spec.ts` | 7 | Mocked API routes |
| `landing-theme.spec.ts` | 3 | Mocked API routes |
| `stadium-scene.spec.ts` | 1 | Mocked API routes, WebGL scene |

The full-stack specs create verified accounts through `frontend/e2e/utils/auth.ts`. Mocked specs still run with both servers started, but their API calls are answered by Playwright route handlers. Chromium renders WebGL through SwiftShader (software rendering).

Default config behaviour: one worker, `serviceWorkers: 'block'`, screenshots on failure and traces retained on failure. In CI it also sets a 180-second test timeout, a 30-second assertion timeout, a 30-minute global timeout per shard, one retry and `forbidOnly`. `fullyParallel` is on so `--shard` splits individual tests rather than whole files.

### Other Playwright configs (local only)

These are not run by CI. Apart from the PWA config, which builds when needed, they serve `frontend/dist` through `vite preview`, so run `npm --prefix frontend run build` first.

| Config | Command | Covers |
| --- | --- | --- |
| `playwright.pwa.config.ts` | `npm run test:e2e:pwa` | `pwa-production.spec.ts` (also run in CI, shard 1). Builds first unless `CI` or `UI_TEST_PRODUCTION=true`. |
| `playwright.offline.config.ts` | `npm run test:e2e:offline` | `offline-event-logging.spec.ts` on desktop and mobile (Pixel 7) Chromium, 16 tests. Builds first. |
| `playwright.landing.config.ts` | `npx playwright test --config playwright.landing.config.ts` | Landing, theme, stadium scene, public dashboard carousel and regression specs (47 tests). No backend or database needed. |
| `playwright.regression.config.ts` | `npx playwright test --config playwright.regression.config.ts` | `regression-ui.spec.ts` only. |
| `playwright.statistics.config.ts` | `npx playwright test --config playwright.statistics.config.ts` | `statistics-report.spec.ts` only. Set `REPORT_TEST_REUSE_SERVER=1` to reuse a running preview server. |

Install Chromium once on a new machine with `npx playwright install chromium`.

## Continuous integration

Configuration existence does not prove a successful Gitea Actions run. No run URL or log, branch-protection evidence or continuous-deployment job has been supplied. The workflow is CI, not continuous deployment.

### Jobs

All jobs start together. None depends on another (the `needs: api-tests` dependencies were removed on 9 October 2026), so a failing API job no longer skips the others.

| Job | Timeout | Steps |
| --- | --- | --- |
| **Code quality and build** | 20 min | Install all three dependency sets, `npm run lint`, frontend model tests, `npm run build`. |
| **API tests** | 30 min | Install backend dependencies, unit tests (`npm test`), migration regression tests, provision an isolated database, integration tests (which reset and migrate it), drop the database. |
| **SonarQube analysis** | 20 min | Push events only. Backend tests with coverage (`test:cov`), SonarQube scan, quality gate report. See [SonarQube](#sonarqube). |
| **UI tests (shard 1/4 … 4/4)** | 50 min each | Install all three dependency sets, provision an isolated database, `db:migrate:test`, `npm run build`, install Chromium with system dependencies, `npm run test:e2e:ui -- --shard=N/4`, drop the database. Shard 1 also runs the production PWA test whenever the build succeeded, even if the browser tests failed. |

The four UI shards are separate jobs rather than a matrix because this Gitea instance does not queue workflows that use `strategy.matrix`. Each shard runs a single Chromium worker, since software WebGL is CPU intensive.

### Isolated test databases

Each database job (API tests and every UI shard) creates its own throwaway database with `backend/scripts/ci-test-database.mjs create <label>`. It uses the `TEST_DATABASE_URL` secret as the base connection, creates `ci_test_<timestamp>_<run>_<label>_<random>` on the same server, masks the URL in the log and exports it as `TEST_DATABASE_URL` for the job's later steps. The drop step runs after the tests even when they fail, but only if the database was actually created. A runner that loses its connection before provisioning therefore reports no false test failure, and anything it leaves behind is swept by the next run's `create`.

Integration tests receive only `TEST_DATABASE_URL`; their setup maps it to `DATABASE_URL` before the application loads. The UI launcher does the same for the backend it starts.

### Environment

The database jobs set `NODE_OPTIONS=--network-family-autoselection-attempt-timeout=2500`. Neon hosts resolve to several IPv4 and IPv6 addresses, and Node's default 250 ms per attempt abandons IPv4 and then fails on unreachable IPv6 with `fetch failed`.

Jobs that start the API set CI-only `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` and `FRONTEND_URL` values. UI shards also set `CI=true` and `TWO_SIDED_LIVE_LOGGING_ENABLED=true`. The launcher replaces the workflow's `PORT` and URLs with the free ports it allocates.

### Failure artifacts

When a browser test fails, open the failed Gitea Actions run and download the `playwright-failure-artifacts-<shard>` artifact for that shard (1–4). Extract it, then inspect screenshots and traces under `test-results/`. Open the HTML report with:

```sh
npx playwright show-report playwright-report
```

### SonarQube

The `sonarqube` job runs on pushes only, because the Community Edition analyses a single branch and cannot decorate pull requests. It runs `npm --prefix backend run test:cov`, whose `posttest:cov` step (`backend/scripts/normalize-coverage.mjs`) rewrites `backend/coverage/lcov.info` paths to be repository-relative. The scan waits for the quality gate and fails the job when the gate is red. `scripts/sonar-quality-gate.mjs` then records this analysis's gate conditions in `.scannerwork/quality-gate.json`, uploaded as the `sonar-quality-gate` artifact. That report step and the upload are `continue-on-error`, so a diagnostics failure cannot turn a passing gate red. One-off SonarQube setup is described in the application repository's `sonarqube.md`.

Backend coverage relies on two overrides in `backend/package.json`: `js-yaml` for `@istanbuljs/load-nyc-config` and `handlebars` for `ts-jest` (see [dependency security](../Architecture/security/dependency-security.md)). After changing either, run `npm --prefix backend run test:cov` and confirm `backend/coverage/lcov.info` is written.

### Other workflow

`.github/workflows/offline-sync-health.yml` is a separate scheduled check (every five minutes, or on demand) that runs `backend/scripts/check-offline-health.mjs` against production queue and replication health. It needs the `OPERATIONS_HEALTH_URL` and `OPERATIONS_HEALTH_TOKEN` secrets and runs no tests. See the [offline operations runbook](../Architecture/operations/offline-operations-runbook.md).

### Changes since the 25 September review

The 25 September review described two UI shards that waited for the API job, a single shared test database migrated in place, and failure uploads of `playwright-report/` and `test-results/`. The application guide records these changes since then:

- **Triggers:** pull requests and pushes to `development` now run the workflow, as well as `main` and `develop`. This corrects the trigger gap found in the 14 September audit.
- **Job order:** all jobs start together; UI and SonarQube no longer wait for API tests (9 October).
- **UI sharding:** the browser suite runs as four single-worker shard jobs, split per test rather than per file, each with its own database and its own `playwright-failure-artifacts-<shard>` artifact. Shard 1 also runs the production PWA test. CI timeouts were raised for cold page loads and software WebGL (180 s per test, 30 s per assertion, 30 min per shard, 50 min per job).
- **Isolated databases:** every database job creates and drops its own `ci_test_*` database (`backend/scripts/ci-test-database.mjs`, 7 October). The `TEST_DATABASE_URL` secret is now a base connection that needs permission to create databases. The same script works for local runs.
- **Pipeline steps:** the quality job runs the frontend model tests; the API job runs the migration regression tests; the SonarQube job records quality gate diagnostics without letting their upload fail the job.
- **Test environment:** integration tests and the browser launcher blank `BREVO_API_KEY` and raise auth rate limits; the browser launcher picks free ports.
- **Local workflow:** `test:integration` resets and migrates the test database itself (`db:migrate:test`); browser tests need that run first. This replaces the old `DATABASE_URL="$TEST_DATABASE_URL" npm --prefix backend run db:migrate` step.
- **Removed tests:** `two-sided-release.spec.ts` (4 tests) and its CI job, `team-invite-flow.spec.ts` (3 tests) and the regression peer-halves test (1) on 8 October; `backend/test/auth-rate-limit.e2e-spec.ts` (13 HTTP scenarios) on 9 October. The limiter is still covered by `auth-rate-limit.service.spec.ts`.
- **Coverage tooling:** backend coverage depends on the `js-yaml` and `handlebars` overrides added by the dependency audit fix.

Earlier history: application commit `94a8757c` added the workflow; `33ce39b6` fixed the UI-server port collision; `47ee8c67` aligned UI locators; `effc97cf` merged the work into `development`; and `e7285f53` adjusted UI flows for CI database latency.

## Gitea setup

Create a PostgreSQL/Neon database used only by CI. In **Repository Settings → Actions → Secrets**, add its connection string as `TEST_DATABASE_URL`. CI never runs tests in that database itself; it is the base connection for creating per-run databases, so its role must be allowed to create and drop databases. Never put a development, personal or production database credential in the workflow or commit it to the repository.

The SonarQube job also needs `SONAR_TOKEN` and `SONAR_HOST_URL`.

Jobs run on any runner with the `ubuntu-latest` label: the instance's shared runners by default, or a runner registered only for this repository. The application's `.gitea/runner/README.md` documents a self-hosted Docker runner with Node 22 and Chromium pre-installed, which avoids queueing behind other repositories.

## Merge protection and assessment evidence

In **Repository Settings → Branches**, protect `main`: require pull requests, one approval, and successful `Test / Code quality and build`, `Test / API tests` and all four `Test / UI tests (shard N/4)` checks; disable direct pushes. SonarQube does not run on pull requests, so it cannot be a required check.

The remaining evidence must be captured in Gitea after the workflow is pushed. None of it has been recorded in this documentation yet:

- the enabled runners and their labels;
- one successful Actions run;
- one failed run with its test output and Playwright artifact;
- protected-branch settings requiring the checks;
- the application testing guide, the workflow file, and representative files from `backend/test/` and `frontend/e2e/`.

## Test expectations

Tests must be independent: create uniquely named records or use a documented test account, and clean up created data afterward. The backend helpers `uniqueTestIdentity()` and `cleanupUser()` in `backend/test/utils/test-db.ts` do this for integration tests. New features need tests at the appropriate layer. A bug is not considered fixed until a regression test reproduces and protects against it.

Prioritise authentication and email-verification restrictions, coach ownership, athlete archive/restore, cross-team isolation, event and RSVP flows, statistics and season filtering, validation errors, signed-out access, and key desktop and mobile journeys.

Record user feedback as a Gitea issue containing reproduction steps, severity, expected and actual behaviour, environment details, and a link to the added or planned regression test.

## Manual acceptance areas

- Authentication/verification and forbidden-action checks for coach, assistant and player roles
- Cross-team isolation, roster archive/restore and invalid data
- Match setup, opponent modes, live events, idempotency, correction and derived statistics
- Season boundaries, comparisons, standings, reminders and Open-Meteo states
- Responsive/mobile navigation, keyboard use, focus, contrast and browser coverage
- Public API list/filter/400/404, CORS and Swagger checks after deployment
- Two-coach live logging, using the retest below

## Two-coach release checks

These are release-plan steps 5(b) and 9 in the application guide.

### Automated coverage (step 5(b))

The automated paired-account browser suite (`frontend/e2e/two-sided-release.spec.ts`, 4 scenarios) and its dedicated CI job were removed on 8 October 2026, together with the two-browser team invite spec (`team-invite-flow.spec.ts`, 3 tests) and the shared-logger peer-halves test in `regression-ui.spec.ts`. No automated browser test now drives two coaches at once; use the manual retest below for browser-level two-coach behaviour.

**Backend.** Disposable `shared-session-integrity` coverage verifies both confirmation orders, canonical 2-1 publication, one standings result per fixture, score-change invalidation (migration 0053), both 24-hour timeout paths and distinct reverse round-robin legs. Run this from `backend/`:

```sh
npm.cmd run test -- --runInBand shared-session-integrity shared-session-privacy session-finalisation sync.controller sync-jwks.controller competition-standings
```

Confirm migrations 0052 and 0053 are present on the intended source. The application guide reports that main PowerSync Cloud sync-rule validation passed and that local HS256 (`gaffer-dev`) auth is still mismatched with the configured hosted RS256 JWKS; neither is independently verified here. Peer delivery and browser reloads remain unverified. Capture an accepted upload's canonical event ID in the peer's local synced tables, and repeat after reconnecting, independently of API polling.

**Frontend.** Run this from `frontend/`:

```sh
node --test --test-isolation=none src/features/matches/session-report.node-test.mjs src/features/events/opponent-confirmed-lineup.node-test.mjs
```

These cover shared orientation, cache and API fallback, authorization failures, synced final state and reviews, and lineup privacy. They do not replace the browser or deployed PowerSync checks below.

`node backend/scripts/check-two-sided-release.mjs test` is a release audit, not a test suite. It can fail solely because an API-only test target has no PowerSync publication or grants, so inspect its individual fields rather than treating that failure as a test failure.

### Manual two-browser retest (step 5(b))

Use two separate browser profiles and accounts and the same generated fixture. Enable the flag only in the controlled test backend, refresh both sync tokens, and validate and deploy the updated PowerSync streams first. The source publication and role must include `match_sessions` and `competition_fixtures`; the existing configuration helper (`npm --prefix backend run db:configure:powersync`) includes them. Stream SQL follows [PowerSync's supported SQL](https://docs.powersync.com/sync/supported-sql); Cloud validation remains required.

1. Confirm each side's lineup and start from its own generated event. Call `GET /events/:eventId/link-diagnostic` from each account. Record the fixture, event, sheet and session IDs: sheets differ, fixture and session match, and actual home/away follows the fixture. Keep different squad, tactics and notes on the two sheets.
2. Open both live routes. Log a home goal, then an away card. Within the polling/sync delay, compare home/away names, score, event IDs, sides, minutes, player labels, clock and the shared result card. Start and pause the clock from alternating coaches. Private squad, tactics and notes must remain the owning team's; the opponent's confirmed lineup is read only.
3. Produce a duplicate goal review from the two coaches. Both shared result cards must show the same review status. Resolve it and compare the decision and canonical timeline. Finish on one side: both pages must stop at full time and show awaiting confirmation. Standings remain unpublished while reviews are unresolved or before the bilateral/24-hour rule is met. Confirm both sides; both reports show the same final score and status, and standings count this fixture once.
4. After both clients finish syncing, take both offline and reload their report routes. Compare canonical score, timeline, clock, final state, confirmations and review decisions. The session DTO must have been fetched once before the offline reload; a cold client without a cached DTO shows a load failure rather than a private sheet substitute. On a live fixture, queue an offline event: it remains visibly pending on the writing coach's sheet until uploaded and reconciled. Reconnect and confirm one canonical event, no duplicate goal, and that both browsers converge.
5. Confirm the opponent lineup remains visible after kickoff and full time. Try a third account and a revoked membership: shared reads fail, and cached shared reports are not used for HTTP 4xx failures.
6. Repeat the score, clock and report checks for an accepted friendly (requester home, acceptor away). With the flag off and refreshed tokens, repeat an ordinary match: the existing timeline, clock, private report/insight and editable legacy opponent setup behave as before, and no session report request is made.

### Release evidence (step 9)

Record the release SHA, backend process flag values, migration journal and deployed PowerSync revision with the two-browser sign-off. For a double round robin, repeat the generated scenario for the reverse leg: fixture IDs and session IDs must differ between legs, sides must reverse, and each team must have two played results after both legs complete. Create the fixture and start one sheet while the flag is disabled, then enable it and retry: the original sheet ID survives and both sheets converge on the fixture session. Repeat with the flag disabled and fresh sync tokens to verify legacy start, logging, clock, report and opponent setup.

Run each full backend e2e file from `backend/` using `node node_modules/jest/bin/jest.js --config ./test/jest-e2e.json --runInBand <file>` for `test/competitions.e2e-spec.ts`, `test/friendly-fixtures.e2e-spec.ts`, `test/offline-sync.e2e-spec.ts` and `test/team-isolation.e2e-spec.ts`, without experimental VM modules. Run backend units with the repository's `npm test -- --runInBand` script (its PGlite tests require VM modules). Report real assertion failures separately from connection or cleanup failures; rerun a flaky database failure once and preserve both outcomes. Do not count local API or model tests as browser, CI or deployed-sync verification.

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
