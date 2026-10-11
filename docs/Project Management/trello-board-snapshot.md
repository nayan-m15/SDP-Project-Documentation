# Trello Board Snapshot and Export Reconciliation

**Board snapshot: 11 October 2026.** Latest recorded action: `2026-10-11T21:28:12.474Z` (UTC). See [export sources and reconciliation](trello-board-snapshot.md). List placement, the card completion marker (Trello `dueComplete`) and checked checklist items are recorded separately. They report tracker state, not an independently verified test, deployment or acceptance result.

## Sources

The full JSON export of [SDP-Interlude](https://trello.com/b/cM6m3R0G/sdp-interlude) supplies the board inventory. The [normalized snapshot](../../data/trello-board-snapshot.json) retains card titles, descriptions, owners, list placement, archive flags, completion markers and checklist state. It omits account emails, avatars and board-action payloads.

| Supplied file | Scope | SHA-256 |
| --- | --- | --- |
| cM6m3R0G - sdp-interlude (4).json | Full board export | `2b1ce2b39b83f28ecd567a82f8a4abe9312ca23e8042248e419503b64b4b08b3` |
| SDP-Interlude.xlsx | Partial setup-card export | `9eb8da7264a249b33af444f3eca323935f4676271f6b60b455545155a5fe4663` |

The Excel export's `Cards` worksheet contains 10 setup cards (rows 2–11), not the full board. Its `Summary` records 10 rows exported on 11 October 2026. All 10 cards match the JSON on title, list, description and archive flag: #16, #17, #20, #15, #18, #3, #12, #13, #30, #34. The Excel completion-marker cells are blank for 10 of these rows, so the JSON supplies completion markers. Missing workbook rows are not treated as removed cards.

## Board inventory

192 cards are present: 178 unarchived cards and 14 archived cards. Two unarchived cards are in the archived Setup list; an unarchived card count is not a count of visible open work.

| Trello list | List archived | Unarchived cards | Archived cards | Marked complete (unarchived) |
| --- | --- | ---: | ---: | ---: |
| Setup | Yes | 2 | 2 | 2 |
| Register Accounts | Yes | 0 | 0 | 0 |
| Repo & project setup | No | 14 | 1 | 12 |
| Environment & tooling init | No | 15 | 0 | 15 |
| Team Process | Yes | 0 | 0 | 0 |
| Potential Features/Additions | No | 25 | 0 | 14 |
| Issues/fixes | No | 68 | 8 | 68 |
| Security Issues | No | 0 | 0 | 0 |
| Backlog | No | 0 | 0 | 0 |
| In Progress | No | 0 | 2 | 0 |
| Completed | No | 20 | 1 | 20 |
| Sprint 3 Backlog | No | 11 | 0 | 11 |
| Sprint 2 Backlog | No | 13 | 0 | 13 |
| Sprint 1 Backlog | No | 10 | 0 | 10 |

## Sprint completion records

| Retained sprint list | Cards | Marked complete | Checked checklist items |
| --- | ---: | ---: | ---: |
| Sprint 1 Backlog | 10 | 10 | 165/165 |
| Sprint 2 Backlog | 13 | 13 | 64/64 |
| Sprint 3 Backlog | 11 | 11 | 50/50 |

All 34 sprint cards retain their named sprint-list placement and are marked complete, with 279/279 checklist items checked. There are no unarchived In Progress cards. Preserve both dimensions rather than moving these stories into Completed in the documentation.

Compared with the 24 September snapshot, Issues/fixes has 68 unarchived cards rather than 56, Potential Features/Additions has 25 rather than 17, and Completed has 20 unarchived cards rather than three. The seven Sprint 3 stories formerly in In Progress or Completed now join the other four in Sprint 3 Backlog.

## Completion and checklist discrepancies

| Card | List | Owner(s) | Archived | Marked complete | Checklist |
| --- | --- | --- | --- | --- | --- |
| [#50 — Add Architecture / System Diagram](https://trello.com/c/QeL3yjfQ) | Issues/fixes | Roko Vidjak | No | Yes | 0/10 |
| [#176 — HARD-001: Remove Development Origins from Production Security Configuration](https://trello.com/c/k8eoIuiL) | Completed | Saurav Lall | No | Yes | 0/5 |

These completion markers coexist with unchecked checklist items. The export does not establish whether the remaining checks were executed. Card #184, “80% Code Coverage”, is marked complete in Completed but has no description or checklist; its title does not supply a coverage report.

## Completed list

| Card | Owner(s) | Archived | Marked complete | Checklist |
| --- | --- | --- | --- | --- |
| [#190 — Block background on page names for each page](https://trello.com/c/Z8Yq2XVj) | Nayan Makanjee | No | Yes | No checklist |
| [#130 — Add account deletion, email change, password reset and password change](https://trello.com/c/HG4lWTcB) | Jai Parbhoo | No | Yes | No checklist |
| [#164 — Frontend+Backend Vulnerabilities](https://trello.com/c/ry1vOuAj) | Ayesha Ally, Hemesh Parshotam | No | Yes | No checklist |
| [#189 — Review methodology docs - squash merge commit, reviewed as comments, commit after CI checks](https://trello.com/c/Y5uLqEnd) | Hemesh Parshotam | No | Yes | No checklist |
| [#176 — HARD-001: Remove Development Origins from Production Security Configuration](https://trello.com/c/k8eoIuiL) | Saurav Lall | No | Yes | 0/5 |
| [#155 — API](https://trello.com/c/gsI2Be31) | Unassigned | No | Yes | No checklist |
| [#177 — HARD-002: Review Public Swagger Exposure](https://trello.com/c/4haTTJUs) | Hemesh Parshotam | No | Yes | 4/4 |
| [#167 — SEC-003: Restore Login CSRF Protection](https://trello.com/c/PVvbkTY6) | Ayesha Ally | No | Yes | 4/4 |
| [#184 — 80% Code Coverage](https://trello.com/c/6QoDSYLD) | Saurav Lall | No | Yes | No checklist |
| [#172 — SEC-008: Rate Limit and Cache Public Dashboard Queries](https://trello.com/c/ut9fRVDX) | Saurav Lall | No | Yes | 5/5 |
| [#166 — SEC-002: Add Distributed Rate Limiting to Authentication Endpoints](https://trello.com/c/N73o6VcF) | Ayesha Ally | No | Yes | 6/6 |
| [#175 — SEC-011: Update Vulnerable Dependency Chains](https://trello.com/c/0biKPHQK) | Saurav Lall | No | Yes | 8/8 |
| [#178 — Check Audit Performace validation doc](https://trello.com/c/STlhB3Oc) | Hemesh Parshotam | No | Yes | No checklist |
| [#169 — SEC-005: Prevent CSV Formula Injection](https://trello.com/c/WgfUAl4H) | Ayesha Ally | No | Yes | 6/6 |
| [#168 — SEC-004: Minimize Player Roster API Response](https://trello.com/c/5EIJ7LSb) | Ayesha Ally | No | Yes | 6/6 |
| [#165 — SEC-001: Restrict Team Updates to Coaches](https://trello.com/c/4P228v86) | Ayesha Ally | No | Yes | 6/6 |
| [#170 — SEC-006: Fix Failed Logout Session Handling](https://trello.com/c/MWFXumTZ) | Ayesha Ally | No | Yes | 5/5 |
| [#171 — SEC-007: Prevent Verification and Invite Tokens from Being Logged in Production](https://trello.com/c/EH4DaJky) | Ayesha Ally | No | Yes | 5/5 |
| [#173 — SEC-009: Add Browser Security Headers](https://trello.com/c/qbVkvCTg) | Hemesh Parshotam | No | Yes | 6/6 |
| [#174 — SEC-010: Disable PowerSync Temporary Development Tokens in Production](https://trello.com/c/gikzrhiW) | Hemesh Parshotam | No | Yes | 4/4 |
| [#139 — PWA & Offline support](https://trello.com/c/hTk9q5jj) | Unassigned | Yes | No | No checklist |

Twenty unarchived cards are marked complete here, including 11 SEC cards, two HARD cards, account management (#130), API (#155), coverage (#184), performance-audit documentation (#178), methodology review (#189), vulnerability review (#164) and page styling (#190). Archived PWA card #139 is shown separately by its archive flag.

## Related records

- [Product backlog](product-backlog.md): every exported card, description and checklist.
- [Bug tracking](bug-tracking.md): issue and security records.
- [Sprint 3 delivery](sprint-3-delivery.md): retained sprint stories and checked criteria.
- [Roadmap](roadmap.md) and [Scrum methodology](scrum-methodology.md): board summaries.
- [Testing and QA](../Quality/testing-and-qa.md): execution evidence remains separate from tracker completion.

## AI Declaration

OpenAI Codex was used to assist with the preparation, structure and editing of this documentation. The project team remains responsible for verifying the content and reviewing the final document.
