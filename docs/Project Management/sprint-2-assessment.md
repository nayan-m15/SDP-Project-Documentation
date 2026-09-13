# Sprint 2 Assessment Guide

This page is the assessment entry point. It maps rubric areas to current documentation and repository evidence without inventing acceptance, meetings, users, owners or test results.

## Rubric map

| Rubric area | Documentation and evidence | Current evidence note |
| --- | --- | --- |
| Core features | [Product Overview](../Overview/02-product-overview.md), [Backlog](product-backlog.md), [Sprint 2 evidence](sprint-2-evidence.md) | Code-backed implementation matrix; acceptance verification remains pending. |
| Automated testing | [Testing and QA](../Quality/testing-and-qa.md), [application tests](https://github.com/nayan-m15/Gaffer/tree/main/backend/test), [browser tests](https://github.com/nayan-m15/Gaffer/tree/main/e2e) | Test source exists. Commit/environment-specific run artifact not supplied. |
| Stakeholder reviews | Existing meeting documents in the site's Meetings navigation | Use only recorded outcomes in those documents. Additional evidence not yet supplied. |
| External API availability/documentation | [API Guide](../Architecture/api-guide.md), [Swagger](https://gaffer-api-ynaf.onrender.com/api/docs), [OpenAPI JSON](https://gaffer-api-ynaf.onrender.com/api/docs-json) | URLs returned 200 on 13 September; OpenAPI completeness limits documented. |
| External integration | [Architecture](../Architecture/tech-stack/architecture-overview.md), [API fallbacks](../Architecture/api-guide.md#external-integrations-and-fallbacks) | Open-Meteo, Google OAuth and Brevo implementation described; provider acceptance result not supplied. |
| User feedback | [Formal procedure/template](../Quality/testing-and-qa.md#formal-user-testing-procedure) | Evidence not yet supplied. |
| Project methodology | [Git Methodology](../Architecture/git-methodology.md), existing planning/standup/retrospective documents | Repository workflow discrepancies are explicit; do not infer agreement. |
| Bug tracking | [Sprint 2 evidence gaps](sprint-2-evidence.md#evidence-not-supplied) | Evidence not yet supplied. |
| Database documentation | [Current schema and ERD](../Architecture/data/database-schema.md) | 19 tables/14 enums, constraints, relationships and migration concerns. |
| Third-party code | [Third-party Code and Assets](../Architecture/third-party-code-and-assets.md) | Direct dependencies inventoried; unknown asset provenance is flagged. |
| Testing documentation | [Testing and QA](../Quality/testing-and-qa.md) | Commands, isolation, manual acceptance, user-test and results templates. |

## Short demo guide

Use a dedicated demo/test team; do not use production or personal data.

1. **Access and roles:** register/verify/sign in as coach, create a team, issue one assistant invite and one player claim. Show a permitted assistant read/live action and a rejected coach-only action.
2. **Roster and tactics:** add athletes with statuses, demonstrate archive/restore, build a named plan and show an injured/archived player cannot be selected.
3. **Schedule and participation:** create a match with a searched venue; sign in as the claimed player, view the shared event and RSVP; return as coach to show the response and reminder.
4. **Match setup:** confirm exactly 11 starters plus bench. Demonstrate the three opponent modes (`none`, `numbers`, `full`) using separate disposable matches or captured evidence.
5. **Live match:** run the clock; log goal/assist/card/substitution/penalty; retry one create with the same request ID; finish the match.
6. **Correction and analytics:** edit and delete a logged event from the report; show score/report/stat totals update; inspect athlete stats, season trends and a player comparison.
7. **API/operations:** open Swagger and database health; explain cookie authentication and the incomplete OpenAPI security/schema metadata; show a weather failure state if it can be induced safely.

Record commit/deployment, accounts/roles, expected results and screenshots/logs. Do not describe the demo as a passed test until results are captured.

## Known limitations

- Live logger uses REST; no collaborative Socket.io broadcasting.
- No durable offline queue/synchronisation; local UI drafts do not survive as an offline ledger.
- Opponent entry is not platform-user fixture arrangement.
- Match report is not downloadable/exportable.
- Reminders are in-app within 24 hours and dismissed locally; no email/push.
- Better Auth does not currently expose password reset/account deletion flows.
- Standings are manually entered; no automatic league ingestion/calculation.
- OpenAPI omits cookie security and most request/response schemas.
- Playwright is Chromium-only; accessibility and cross-browser acceptance remain manual/unverified.
- No workflow files prove CI/CD or automated deployment.
- Migration journal/order/redundant-index concerns need disposable fresh/upgrade verification.

## Assessment evidence still requiring team input

- Agreed Sprint 2 commitment, owners and Definition of Done
- Stakeholder review/approval and actionable feedback
- Completed user-testing records
- Bug tracker export/links and resolution evidence
- Test run artifacts for the assessed commit/environment
- Confirmed Git branching/merge/release policy and CI/branch-protection evidence
- Asset provenance/licence confirmations

These are labelled unavailable; no meeting placeholders were created and existing meeting materials were preserved.
