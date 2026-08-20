# System Architecture Overview

This document provides a high-level overview of the system architecture for the **Gaffer** amateur football coaching platform.

---

## 1. Core Component Diagram

```
+-------------------------------------------------------------+
|                     Client Browser Layer                    |
|  +------------------------+    +-------------------------+  |
|  |   Markdown Reader UI   |    | In-Browser Document     |  |
|  |   & Search Sidebar     |    | Converter (PDF/DOCX/TXT)|  |
|  +-----------+------------+    +------------+------------+  |
+--------------|------------------------------|---------------+
               |                              |
               v                              v
+-------------------------------------------------------------+
|                     GitHub REST API                         |
|  - Raw Content Retrieval                                    |
|  - Manifest Management (`pdfs/manifest.json`)               |
|  - Direct Commits via GitHub Personal Access Tokens         |
+-------------------------------------------------------------+
```

---

## 2. Technical Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5, Modern CSS Variables, Vanilla JS | Lightweight, fast static site hosted on GitHub Pages |
| **Markdown Parser** | `marked.js` | Parses `.md` text into responsive HTML |
| **Syntax Highlighting**| `highlight.js` | Highlights code blocks in JS, Python, SQL, HTML, JSON |
| **Document Conversion**| `mammoth.js`, `pdfjs-dist`, `turndown.js` | Converts `.docx`, `.pdf`, `.txt` to Markdown client-side |

---

## 3. Directory & Manifest Schema

The project organizes documentation files under `docs/` and `pdfs/`. The file index is stored in `pdfs/manifest.json`:

```json
{
  "name": "System Architecture Overview",
  "path": "docs/Architecture/Overview.md",
  "folder": "Architecture",
  "size": 1542,
  "date": "2026-08-13T18:50:00.000Z",
  "type": "md"
}
```

---

## 4. Security Considerations

> [!WARNING]
> Personal Access Tokens (PATs) entered on the Upload page are stored exclusively in browser session memory (`sessionStorage`) and are never sent to external servers or persisted in the git repository.
