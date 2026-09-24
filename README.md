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

## Current evidence snapshot (24 September 2026)

Documentation baseline `3d35fb124b282e761a070d0c14c3618732b27cc1`; application source `ef2880ad0018536c2b933754148e285b2a325ec7`; Trello export latest action 2026-09-24T19:20:21.943Z. The [Sprint 3 delivery record](docs/Project%20Management/sprint-3-delivery.md) and [test record](docs/Quality/sprint-3-test-report.md) separate tracker, code, test, deployment and acceptance evidence. The older audit remains below as a historical snapshot.

## Evidence snapshot

The 14 September 2026 audit used Trello activity through 2026-09-14T11:49:45.592Z and application commit `e7285f533b854c4da753c73e22a2a38f580588dc`. See the backlog, testing and API pages for precise limits.

## AI declaration

This repository contains AI-assisted code and documentation. Historical declarations are preserved where supplied; they are not expanded with guessed tools or approvals. This cleanup used OpenAI Codex to inspect supplied sources, generate tracker pages, migrate PDF material, edit the portal and run local validation. Team review remains required before representing the result as approved evidence.
