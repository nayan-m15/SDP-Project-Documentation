# SDP Project Documentation

This repository contains a static documentation portal for the SDP Interlude
group. It presents project PDF files in a browser-based document library and
includes a simple upload page for adding new PDFs to the repository through the
GitHub Contents API.

## Project Overview

- `index.html` is the main document viewer.
- `upload.html` provides a browser form for uploading PDFs to GitHub.
- `styles.css` contains the shared layout and interface styling.
- `js/viewer.js` loads the PDF manifest and displays the selected document.
- `js/uploader.js` validates uploads, sends PDFs to GitHub, and updates the
  manifest.
- `pdfs/` stores the PDF files and `manifest.json` document list.

## How It Works

The document viewer fetches `pdfs/manifest.json` from the live GitHub Pages
deployment so every team member always sees the latest documents without needing
to pull local changes. If the site is unreachable (e.g. offline development),
it falls back to the local manifest file. Selecting a document loads the
matching PDF from GitHub Pages into the embedded viewer.

The upload page comes pre-filled with the repository owner and name. Team
members only need to provide:

- A GitHub fine-grained personal access token with write access to this
  repository.
- A PDF file no larger than 25 MB.

After validation, the uploader sends the PDF to the `pdfs/` folder and updates
`pdfs/manifest.json` so the document appears in the library.

## Team Setup Guide

The viewer works for anyone — no token required. Only the upload page needs
authentication.

### For viewers (read-only)

Open the deployed GitHub Pages URL. The document list and PDFs load
automatically from the live site.

### For uploaders (team members)

Each team member must create their own fine-grained personal access token.

#### Prerequisites

Before creating a token, make sure you have **accepted the collaboration
invitation** for this repository. The repo owner must invite you as a
collaborator and you must accept the invitation (check your email or visit
the repository page while logged in). Without an accepted invitation, the
repository will not appear in the token's repository access list.

#### Creating the token

1. Go to **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens**.
2. Click **Generate new token**.
3. Under **Repository access**, choose one of the following options:

   - **Only select repositories** — search for
     `nayan-m15/SDP-Project-Documentation` in the dropdown. This option only
     works if you have accepted the collaboration invite. If the repository
     does not appear, use the "All repositories" option below.
   - **All repositories** — if the repo does not show up under "Only select
     repositories", choose this instead. The token's permissions (set in the
     next step) still limit what it can do. Since the only permission granted
     is Contents read and write, the token cannot affect any other aspect of
     your repositories.

4. Under **Repository permissions**, set **Contents** to **Read and write**.
   Leave all other permissions at **No access**.
5. Choose an expiration period.
6. Copy the generated `github_pat_...` token and keep it private.
7. Open the upload page, paste the token into the GitHub token field, select a
   PDF, and click **Upload PDF**.

The owner and repository fields are already filled in — just add your token and
you are ready to upload.

## How to get a Github Token
Go to your GitHub account's:

Settings → Developer settings → Personal access tokens → Fine-grained tokens

Create a token with access to only this repository.

For permissions, give it:
```bash
Contents
    Read and write
```
Add an expiry period for some level of security. 

KEEP THIS TOKEN PRIVATE

## Running Locally

This is a static site, so it can be opened directly in a browser. For the most
reliable local testing experience, run a small local web server from the project
root and open the served URL:

```bash
git clone https://github.com/nayan-m15/SDP-Project-Documentation
cd SDP-Project-Documentation
```
Install this extension for Live Server
```bash
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
```

Then click Go Live at the bottom right of Visual Studio Code

## Maintaining Documents

When adding documents manually, place the PDF in the `pdfs/` folder and add a
matching entry to `pdfs/manifest.json` using this structure:

```json
{
  "name": "example.pdf",
  "path": "pdfs/example.pdf",
  "size": 123456,
  "date": "2026-08-08T00:00:00.000Z"
}
```

Keep the manifest valid JSON so the viewer can load the document list.

## AI Declaration

This repository contains AI-generated code.

This README was AI-generated and reviewed by Codex using the GPT-5 model.

Code in `js/viewer.js` and `upload.html` was modified with AI assistance (Qoder) to
add GitHub Pages fetching and pre-filled repository configuration. All changes
were reviewed by the repository owner before commit.

Granola AI was used to record and transcribe selected project meetings and to assist in generating structured meeting notes. Generated meeting notes were subsequently reviewed by the team for accuracy before being included in the project documentation.
