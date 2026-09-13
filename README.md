# Gaffer / Sport Coaching Tool Documentation

This repository contains the static documentation portal for Gaffer. The published site is [nayan-m15.github.io/SDP-Project-Documentation](https://nayan-m15.github.io/SDP-Project-Documentation/); the application is maintained separately in [nayan-m15/Gaffer](https://github.com/nayan-m15/Gaffer).

## Structure

- `index.html`, `styles.css`, `js/viewer.js`: document reader, search, Markdown/Mermaid rendering and navigation.
- `docs/`: Markdown documentation, including overview, architecture, backlog, API, database and QA material.
- `assets/`: diagrams, wireframes, mockups, screenshots and branding.
- `pdfs/`: preserved source/meeting PDFs and `manifest.json`.
- `upload.html`, `js/uploader.js`: optional browser-side conversion/upload helper using the GitHub Contents API.

`pdfs/manifest.json` is the navigation source of truth. Every discoverable Markdown/PDF document needs an entry with `name`, repository-relative `path`, `originalPath`, `folder`, byte `size`, ISO `date` and `type`. Existing path names should be retained when possible because URL hashes use the document path as the deep-link identifier.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by `serve`. Do not open `index.html` directly from disk: browser fetch restrictions can prevent the manifest and Markdown from loading.

The site has no compile step. Verification should include JSON parsing, manifest target checks, Markdown link/asset checks, JavaScript syntax checks and a browser preview of representative pages (including Mermaid diagrams and mobile navigation).

## Edit documents manually

1. Add or update Markdown under `docs/` and assets under `assets/`.
2. Preserve meeting documents unless the team is intentionally uploading reviewed meeting evidence.
3. Keep implemented, planned and verified behaviour distinct. Application source/configuration/migrations/tests override outdated proposals.
4. Update `pdfs/manifest.json` and use the actual file size.
5. Check all local links and preview the portal.

Example entry:

```json
{
  "name": "REST API Guide",
  "path": "docs/Architecture/api-guide.md",
  "originalPath": "docs/Architecture/api-guide.md",
  "folder": "Architecture",
  "size": 12345,
  "date": "2026-09-13T00:00:00.000Z",
  "type": "md"
}
```

## Upload helper security

Reading the portal requires no token. The upload page accepts a fine-grained GitHub personal access token and sends it to the GitHub API from the browser. If the helper is used, grant only repository Contents read/write access, set an expiry, use a trusted machine, and revoke the token when it is no longer needed. Never commit or share it.

Manual review remains preferable for substantial documentation updates because converted PDFs can produce fragmented headings, lists and tables.

## AI declaration

This repository contains AI-assisted code and documentation. Historical declarations in existing documents are preserved where supplied; they should not be expanded with guessed tools or model names. AI output must be reviewed by the team before being represented as approved evidence.

The earlier README recorded Codex GPT-5 assistance for that README, Qoder assistance for GitHub Pages/viewer changes, and Granola AI use for selected meeting transcription/notes. This summary preserves those supplied declarations without independently verifying the historical tool records.
