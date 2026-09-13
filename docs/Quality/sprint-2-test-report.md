# Sprint 2 Test Report

## Recorded result

| Field | Value |
| --- | --- |
| Application commit | `aadf745eb7a9d309bf847bb3afb2789dbddbabc6` |
| Date | 13 September 2026 |
| Local runtime | Node `v24.14.0`; npm `11.9.0` |
| Backend unit command | `npm --prefix backend test -- --runInBand` |
| Backend unit result | 30/30 suites; 291/291 tests passed; 0 snapshots |
| Frontend model result | All eight `frontend/src/**/*.node-test.mjs` files completed successfully when run individually; season-trends reported 11 assertions |
| Integration / Playwright / coverage | Not executed; no disposable database/result artefact was prepared |
| Deployed revision | Unverified. HTTP 200 availability does not identify the deployed commit. |

This is a partial local result, not stakeholder acceptance or a complete release report.

## Proposed testing policy

> [!NOTE]
> Proposed for team adoption; Trello does not establish this as current policy.

| Change | Minimum relevant evidence |
| --- | --- |
| Pure calculation/validation/service logic | Focused unit test, including boundary and failure cases. |
| API contract, authentication, role/team scoping or persistence | Unit tests plus isolated Supertest integration coverage. |
| User workflow, routing, responsive/keyboard behaviour or frontend/backend integration | Focused unit/model checks plus Chromium Playwright; manual accessibility/mobile checks where automation is insufficient. |
| Bug fix | Reproduction evidence, regression test that fails before/fixes after where practical, and retest of the original steps. |
| Migration | Fresh and upgrade runs against disposable databases, rollback/recovery notes, and health/data verification. |

Before review, record exact lint/build/relevant-test commands, results, commit, environment and database isolation. Skipped tests require a reason, impact and follow-up owner/card. Flaky tests must not be silently rerun until green: retain the failing attempt, investigate and quarantine only through an explicit team decision. Store artefacts in an agreed durable location and link them from Trello/PR.

## Reusable execution record

```text
Report ID / date / tester:
Commit and dirty/clean state:
Environment and deployed revision (if known):
Node/npm/browser versions:
Database identifier and isolation check (never credentials):

Command / scenario:
Expected result:
Pass / Fail / Skip / Flaky:
Counts, duration and retries:
Failure or skip reason:
Log, screenshot, trace or coverage link:
Related Trello card / bug / owner:
Retest result and date:
```

User-testing procedures and the manual acceptance checklist remain in [Testing and Quality Assurance](testing-and-qa.md). No completed user-testing session is inferred from Trello checklist ticks.

