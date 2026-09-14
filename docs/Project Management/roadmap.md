# Roadmap and Milestones

## Preliminary course milestones

The project brief supplied for the course lists these dates as preliminary planning milestones, not immutable deadlines:

| Milestone | Preliminary date | Evidence-oriented outcome |
| --- | --- | --- |
| Sprint 1 | 25 August 2026 | Foundation: documentation, authentication, roster, events, dashboard/statistical overview and public information pages. Trello retains 10 active S1-labelled cards in Sprint 1 Backlog. |
| Sprint 2 | 15 September 2026 | Roles, live logging/corrections, statistics/trends, player RSVP/calendar, weather/reminders, policies and public API source work. Trello records 13 active cards in Completed. |
| Sprint 3 | 29 September 2026 | Refine/implement selected S3 backlog items and resolve prioritised defects; scope requires planning confirmation. |
| Final submission | 11 October 2026 | Integrated, documented and evidenced submission against the rubric. |

Later course/team communication may supersede these dates; retain the source when recording any change.

## Delivered and evidenced scope

- **Sprint 1-labelled foundation:** application source contains authentication, roster/event management, dashboard, profile, landing/how-it-works/features pages and test foundations. Trello list placement is not a completion signal because those cards remain in Sprint 1 Backlog.
- **Sprint 2 delivery:** see the [Trello-backed delivery record](sprint-2-delivery.md). All 13 active Completed cards have fully checked exported checklists; repository implementation and local test evidence are documented separately.

## Current and future board scope

The active `Backlog` contains 10 cards. Performance Comparisons (#72) has moved to Completed, while remaining S3 cards include report export (#84), opponent fixture setup (#73), offline/concurrent logging (#78/#79), league/standings (#80), automated insights (#81), selection suggestions (#82), public squad information (#83), automatic season scheduling (#85), and alternative formats (#86).

Card #72 is S3-labelled and now Completed; that current state does not prove it belonged to the original Sprint 2 commitment. Card #80 remains Backlog despite manual-standings source evidence, so implementation and board state remain distinct.

The Potential Features/Additions list contains 19 active cards, including new #134 and #135. Issues/fixes contains 48 active cards plus one archived card, including new #136 and #137. Sprint 3 selection, priority and owners must come from planning; card position is only ordering.

## Recommendations for planning

1. Reconcile implemented-but-backlogged items and completed code fixes with Trello.
2. Prioritise integrity/security/accessibility defects before optional analytics breadth.
3. Treat offline and concurrent logging as separate, high-risk capabilities with dedicated architecture and tests.
4. Select only scope supported by capacity and an agreed Definition of Done; do not infer commitments from S3 titles alone.
