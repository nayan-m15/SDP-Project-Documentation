# Sprint 2 Implementation and Evidence

## Evidence basis

- **Trello snapshot:** export activity through 2026-09-14T11:49:45.592Z; 13 active Completed cards, including #133 and S3-labelled #72.
- **Application source:** clean commit `e7285f533b854c4da753c73e22a2a38f580588dc`.
- **Local tests:** 32/32 backend suites and 312/312 tests passed with 0 snapshots; all eight frontend Node test files completed individually.
- **Not established:** integration/browser/coverage result, successful CI run, branch protection, deployed revision, full release verification or stakeholder acceptance.

## Implementation matrix

| Area | Source evidence | Classification / limitation |
| --- | --- | --- |
| Roles, player claims and RSVP | Auth/team access, invite/claim/player/events modules | Implemented in source; acceptance pending. |
| Live logging/correction | Match REST endpoints, event ledger, clock, report editing and idempotency | Implemented; no durable offline or collaborative sockets. |
| Statistics/seasons/comparisons | Statistics and season modules plus chart/model UI | Implemented scope; #72 title/checklist mismatch is retained in delivery record. |
| Calendar/weather/reminders | Event calendar, Open-Meteo services, dashboard banners | Implemented scope; reminders are in-app and locally dismissed. |
| Public API | `backend/src/public-api`, controllers/service/data, CORS config and tests | Implemented/tested in source; deployed availability pending. |
| CI | `.gitea/workflows/test.yml` | Configured CI, not a proven successful run or CD; branch trigger defect remains. |

## Two distinct APIs

The [Application REST API](../Architecture/api-guide.md) is the broad frontend-facing interface, normally cookie-authenticated and team-scoped. The [Gaffer Public API](../Architecture/Gaffer-Public-API-Reference.md) is only the unauthenticated read-only formations/tactics catalog. Open-Meteo is a separate external provider integration.

## Public API deployment status

On 14 September 2026, direct and frontend-proxy URLs for both `/v1/formations` and `/v1/tactics` returned 404. Deployed OpenAPI JSON omitted both routes and the `Public API` tag. Trello #133 being Completed and source tests existing do not override that deployment evidence.

## CI evidence and blocker

Commits `94a8757c`, `33ce39b6`, `47ee8c67`, `effc97cf` and `e7285f53` establish workflow implementation/history. The actual integration branch is `development`, while pushes watch `develop` and PRs only `main`; intended checks therefore miss `development` activity. The workflow also omits the eight frontend Node scripts. See [Testing and QA](../Quality/testing-and-qa.md).

## Evidence still required

- Safe disposable-database integration and Playwright runs with artifacts
- Coverage output and any adopted threshold
- Successful Gitea Actions run links and corrected branch triggers
- Public API deployment revision plus list/filter/400/404/CORS/Swagger results
- Stakeholder review decision and formal user-testing records
- Fresh-install and upgrade migration results
