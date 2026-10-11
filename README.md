# Gaffer / Sport Coaching Tool Documentation

This repository contains the static documentation portal for Gaffer. The application is maintained separately in [nayan-m15/Gaffer](https://github.com/nayan-m15/Gaffer).

## Structure

- `index.html`, `styles.css`, `js/viewer.js`: searchable Markdown/Mermaid reader and navigation.
- `manifest.json`: navigation metadata and exact repository byte sizes, normalized to Git's LF line endings so validation is platform-independent.
- `docs/`: reviewed Markdown documentation.
- `assets/`: diagrams, wireframes, mockups, screenshots and branding.
- `scripts/validate-docs.mjs`: manifest, link, asset and legacy-file validation.

The browser upload helper was removed because reviewed Git changes are safer than collecting a GitHub personal access token in a public page. Markdown HTML is sanitized with a pinned DOMPurify dependency before insertion.

## Run and validate

```bash
npm install
npm run validate
npm run check:js
npm run dev
```

Open the URL printed by `serve`; direct `file://` use can block fetched content. Preview representative Overview, Project Management, Architecture, Quality and Meetings pages, including search, deep links, Mermaid, tables, code blocks and responsive navigation.

## Contribute through Git

1. Add or update Markdown under `docs/` and assets under `assets/`.
2. Keep implementation, local tests, CI configuration/runs, deployment and stakeholder acceptance distinct.
3. Run `npm run manifest` to regenerate canonical repository byte sizes and matching `path`/`originalPath` values.
4. Run both validation commands and preview the portal before review.

A documentation GitHub Actions workflow runs validation and JavaScript syntax checks on pushes and pull requests. Its existence does not prove a successful run or deployment.

## Evidence snapshot

The 14 September 2026 audit used Trello activity through 2026-09-14T11:49:45.592Z and application commit `e7285f533b854c4da753c73e22a2a38f580588dc`. See the backlog, testing and API pages for precise limits.

**External codebase comparison (reported, not independently verified; 29 September 2026):** A separate review of application checkout `03cfc17` reported a broader feature set than this README's existing summary, including competitions/fixtures, friendly fixtures, injuries/recovery, offline synchronization, AI features, player workflows, a public dashboard/API and game plans/tactics. The README needs direct source verification; these reported source capabilities do not establish delivery or deployment.

<!-- trello-status:start -->
## Current Trello documentation snapshot

**Board snapshot: 11 October 2026.** Latest recorded action: `2026-10-11T21:28:12.474Z` (UTC). See [export sources and reconciliation](docs/Project Management/trello-board-snapshot.md). List placement, the card completion marker (Trello `dueComplete`) and checked checklist items are recorded separately. They report tracker state, not an independently verified test, deployment or acceptance result.

The latest attached full-board export contains 192 cards, including 68 unarchived Issues/fixes cards marked complete, 20 unarchived cards in Completed, and 34 retained sprint cards marked complete with 279/279 checked criteria. The Excel attachment is a matching 10-card setup subset. See [backlog](docs/Project%20Management/product-backlog.md), [bug tracking](docs/Project%20Management/bug-tracking.md) and [Sprint 3 delivery](docs/Project%20Management/sprint-3-delivery.md). The earlier source audits below retain their original dates.
<!-- trello-status:end -->

## AI Declaration

This repository contains AI-assisted code and documentation. Historical declarations are preserved where supplied; they are not expanded with guessed tools or approvals. This cleanup used OpenAI Codex to inspect supplied sources, generate tracker pages, migrate PDF material, edit the portal and run local validation. Team review remains required before representing the result as approved evidence.
