# Sprint 2 Assessment Guide

This is the assessment entry point. It separates Trello state, implementation, local tests, CI configuration, deployment and acceptance.

## Rubric map

| Area | Canonical evidence | Current limitation |
| --- | --- | --- |
| Backlog/delivery | [Product Backlog](product-backlog.md), [Sprint 2 Delivery](sprint-2-delivery.md) | Trello has 13 active Completed cards; checklist state is not independent acceptance. |
| Implementation | [Sprint 2 Evidence](sprint-2-evidence.md), [Application API](../Architecture/api-guide.md) | Source inspected at `e7285f53`; deployed revision is unverified. |
| Public API | [Public API Reference](../Architecture/Gaffer-Public-API-Reference.md) | Implemented/tested in source; all four deployed URLs returned 404 on 14 September 2026. |
| Automated testing | [Testing and QA](../Quality/testing-and-qa.md), [Test Report](../Quality/sprint-2-test-report.md) | Unit/model commands passed locally; integration/browser/coverage/CI-run evidence is missing. |
| CI | [Testing and QA](../Quality/testing-and-qa.md#gitea-actions-configuration) | Gitea workflow exists, but misses the real `development` branch and does not run frontend Node scripts. |
| Meetings/stakeholder | [Meeting Register](../Meetings/index.md) | Use only recorded feedback; no additional approval is inferred. |
| Defects | [Bug Tracking](bug-tracking.md) | 48 active and 1 archived Issues/fixes cards; verified fix/retest remains separate. |
| Method | [Scrum](scrum-methodology.md), [Roadmap](roadmap.md), [Git](../Architecture/git-methodology.md) | Definition of Done, protection and release policy evidence remain incomplete. |
| Database | [Database Schema](../Architecture/data/database-schema.md) | Fresh/upgrade migration verification was not run. |

## Demonstration sequence

Use a disposable test team/database and identify the exact revision/deployment: verify roles and forbidden mutations; roster and tactics; calendar/RSVP/reminders; 11-player match setup and opponent modes; live events and correction; statistics/seasons/comparisons; then application API and Open-Meteo states. Treat the public API as a source/local demonstration until deployment verification passes.

Record expected/actual results and evidence. A planned demonstration is not a passed test or stakeholder acceptance.

## Known limitations and blockers

- No durable offline queue or collaborative WebSocket distribution.
- Opponent entry is not cross-account fixture arrangement; standings are manually managed.
- In-app reminders have local dismissal only; no email/push channel.
- Public formations/tactics API is not yet verified deployed.
- CI trigger uses `develop` instead of `development`; PRs to `development` are not watched.
- No successful Gitea Actions run, branch-protection, coverage, full integration/browser, deployment-revision or stakeholder-acceptance evidence was supplied.
- Migration-chain verification and asset provenance/licence confirmations remain open.
