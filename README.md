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

The document viewer reads `pdfs/manifest.json` and builds the sidebar document
list from that file. Selecting a document loads the matching PDF path into the
embedded viewer.

The upload page requires:

- A GitHub username or organisation.
- The repository name.
- A GitHub token with permission to write repository contents.
- A PDF file no larger than 25 MB.

After validation, the uploader sends the PDF to the `pdfs/` folder and updates
`pdfs/manifest.json` so the document appears in the library.

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
