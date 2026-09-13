# Roadmap and Milestones

## Preliminary course milestones

The project brief supplied for the course lists these dates as preliminary planning milestones, not immutable deadlines:

| Milestone | Preliminary date | Evidence-oriented outcome |
| --- | --- | --- |
| Sprint 1 | 25 August 2026 | Foundation: documentation, authentication, roster, events, dashboard/statistical overview and public information pages. Trello retains 10 active S1-labelled cards in Sprint 1 Backlog. |
| Sprint 2 | 15 September 2026 | Roles, live logging/corrections, statistics/trends, player RSVP/calendar, weather/reminders and policies. Trello records 11 active S2 cards in Completed. |
| Sprint 3 | 29 September 2026 | Refine/implement selected S3 backlog items and resolve prioritised defects; scope requires planning confirmation. |
| Final submission | 11 October 2026 | Integrated, documented and evidenced submission against the rubric. |

Later course/team communication may supersede these dates; retain the source when recording any change.

## Delivered and evidenced scope

- **Sprint 1-labelled foundation:** application source contains authentication, roster/event management, dashboard, profile, landing/how-it-works/features pages and test foundations. Trello list placement is not a completion signal because those cards remain in Sprint 1 Backlog.
- **Sprint 2 delivery:** see the [Trello-backed delivery record](sprint-2-delivery.md). All 11 active completed cards have fully checked exported checklists; repository implementation and partial local tests are documented separately.

## Current and future board scope

The active `Backlog` contains 11 S3 cards: performance comparisons (#72), report export (#84), opponent fixture setup (#73), offline logging (#78), concurrent logging (#79), league/standings (#80), automated insights (#81), selection suggestions (#82), public squad information (#83), automatic season scheduling (#85), and alternative football formats (#86).

Implementation evidence already covers parts of #72 (up to three athlete-to-athlete comparisons and within-season period comparison) and #80 (manual standings). Trello still records both cards in Backlog, so board status and partial implementation must be reconciled rather than silently marked delivered.

The Potential Features list contains 17 active cards, including account deletion/password reset (#130), richer event statistics, UI refinements, calendar export and additional formations. The Issues/fixes list contains 46 active cards. Sprint 3 selection, priority and owners must come from planning; card position is only ordering.

## Recommendations for planning

1. Reconcile implemented-but-backlogged items and completed code fixes with Trello.
2. Prioritise integrity/security/accessibility defects before optional analytics breadth.
3. Treat offline and concurrent logging as separate, high-risk capabilities with dedicated architecture and tests.
4. Select only scope supported by capacity and an agreed Definition of Done; do not infer commitments from S3 titles alone.

