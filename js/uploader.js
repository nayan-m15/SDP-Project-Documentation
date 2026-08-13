// Configure PDF.js worker
if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

// Initialize Turndown HTML-to-Markdown converter
const turndownService = window.TurndownService ? new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced"
}) : null;

// DOM Elements
const ownerInput = document.getElementById("owner");
const repoInput = document.getElementById("repo");
const tokenInput = document.getElementById("token");
const folderInput = document.getElementById("folder");
const docTitleInput = document.getElementById("docTitle");
const docFileInput = document.getElementById("docFile");

const conversionContainer = document.getElementById("conversionContainer");
const tabEdit = document.getElementById("tabEdit");
const tabPreview = document.getElementById("tabPreview");
const paneEdit = document.getElementById("paneEdit");
const panePreview = document.getElementById("panePreview");
const markdownTextarea = document.getElementById("markdownTextarea");
const livePreviewBody = document.getElementById("livePreviewBody");

const uploadButton = document.getElementById("uploadButton");
const uploadStatus = document.getElementById("uploadStatus");
const existingDocuments = document.getElementById("existingDocuments");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

let convertedMarkdown = "";
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem("sdp_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeUI(savedTheme);
}

function updateThemeUI(theme) {
    if (theme === "dark") {
        themeIcon.textContent = "☀️";
        themeText.textContent = "Light Mode";
    } else {
        themeIcon.textContent = "🌙";
        themeText.textContent = "Dark Mode";
    }
}

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("sdp_theme", newTheme);
    updateThemeUI(newTheme);
});

// Save PAT in Session Storage for Convenience
if (sessionStorage.getItem("github_token")) {
    tokenInput.value = sessionStorage.getItem("github_token");
}
tokenInput.addEventListener("change", () => {
    if (tokenInput.value.trim()) {
        sessionStorage.setItem("github_token", tokenInput.value.trim());
    }
});

// UI Helper functions
function showStatus(message, type) {
    uploadStatus.hidden = false;
    uploadStatus.innerHTML = message;
    uploadStatus.className = `upload-status ${type}`;
}

function updateLivePreview() {
    const md = markdownTextarea.value;
    if (window.marked) {
        livePreviewBody.innerHTML = marked.parse(md);
    } else {
        livePreviewBody.textContent = md;
    }
}

markdownTextarea.addEventListener("input", updateLivePreview);

// Preview Tab Navigation
tabEdit.addEventListener("click", () => {
    tabEdit.classList.add("active");
    tabPreview.classList.remove("active");
    paneEdit.classList.add("active");
    panePreview.classList.remove("active");
});

tabPreview.addEventListener("click", () => {
    tabPreview.classList.add("active");
    tabEdit.classList.remove("active");
    panePreview.classList.add("active");
    paneEdit.classList.remove("active");
    updateLivePreview();
});

// Handle File Selection & Client-Side Conversion (Approach A)
docFileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
        showStatus("File is too large. Maximum size is 25 MB.", "error");
        return;
    }

    // Auto-fill Title if empty
    if (!docTitleInput.value.trim()) {
        const titleWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        docTitleInput.value = titleWithoutExt.charAt(0).toUpperCase() + titleWithoutExt.slice(1);
    }

    showStatus(`Processing "${file.name}"... Converting to Markdown.`, "info");
    conversionContainer.style.display = "block";

    const fileNameLower = file.name.toLowerCase();

    try {
        if (fileNameLower.endsWith(".txt") || fileNameLower.endsWith(".md")) {
            // Text or Markdown file
            convertedMarkdown = await readTextFile(file);
        } else if (fileNameLower.endsWith(".docx")) {
            // Word document conversion using mammoth + turndown
            convertedMarkdown = await convertDocxToMarkdown(file);
        } else if (fileNameLower.endsWith(".pdf")) {
            // PDF conversion using pdfjs-dist
            convertedMarkdown = await convertPdfToMarkdown(file);
        } else {
            throw new Error("Unsupported file type. Please select a .pdf, .docx, .txt, or .md file.");
        }

        markdownTextarea.value = convertedMarkdown;
        updateLivePreview();
        showStatus(`Successfully converted "${file.name}" to Markdown! Review or edit below before saving.`, "success");

    } catch (error) {
        console.error("Conversion error:", error);
        showStatus(`Conversion failed: ${error.message}`, "error");
    }
});

// Conversion Helper: Read plain text / markdown file
function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read text file"));
        reader.readAsText(file);
    });
}

// Conversion Helper: DOCX to Markdown via Mammoth & Turndown
function convertDocxToMarkdown(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result;
                if (!window.mammoth) {
                    throw new Error("Mammoth library not loaded");
                }
                const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
                const html = result.value;

                let md = turndownService ? turndownService.turndown(html) : html;
                
                // Add top header if missing
                const docTitle = docTitleInput.value.trim() || file.name;
                if (!md.startsWith("#")) {
                    md = `# ${docTitle}\n\n${md}`;
                }
                resolve(md);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(new Error("Failed to read DOCX file"));
        reader.readAsArrayBuffer(file);
    });
}

// Conversion Helper: PDF to Markdown via PDF.js
function convertPdfToMarkdown(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result;
                if (!window.pdfjsLib) {
                    throw new Error("PDF.js library not loaded");
                }

                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;

                let extractedMarkdown = `# ${docTitleInput.value.trim() || file.name}\n\n`;

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    
                    let lastY = null;
                    let pageText = "";

                    textContent.items.forEach((item) => {
                        // Check if item is on a new line
                        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 6) {
                            pageText += "\n";
                        }
                        pageText += item.str + " ";
                        lastY = item.transform[5];
                    });

                    // Format paragraphs and headers
                    const lines = pageText.split("\n");
                    lines.forEach((line) => {
                        const trimmed = line.trim();
                        if (!trimmed) return;

                        if (trimmed.length < 50 && (trimmed === trimmed.toUpperCase() || !trimmed.endsWith("."))) {
                            extractedMarkdown += `\n## ${trimmed}\n\n`;
                        } else {
                            extractedMarkdown += `${trimmed}\n\n`;
                        }
                    });

                    if (pageNum < pdf.numPages) {
                        extractedMarkdown += `\n---\n\n`;
                    }
                }

                resolve(extractedMarkdown);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(new Error("Failed to read PDF file"));
        reader.readAsArrayBuffer(file);
    });
}

// Helper: Convert binary File object to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            const base64 = result.split(",")[1];
            resolve(base64);
        };
        reader.onerror = () => reject(new Error("Failed to read binary file"));
        reader.readAsDataURL(file);
    });
}

// Base64 helper for UTF-8 strings
function utf8ToBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode("0x" + p1);
    }));
}

// GitHub API: Build contents URL
function getContentsUrl(owner, repo, path) {
    return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

// GitHub API: Upload file (supports create & update via SHA check)
async function uploadFileToGitHub(token, owner, repo, path, contentBase64, commitMessage) {
    const url = getContentsUrl(owner, repo, path);

    // Check if file exists to fetch sha (required by GitHub API for updates)
    let sha = null;
    try {
        const getRes = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github+json"
            }
        });
        if (getRes.ok) {
            const fileData = await getRes.json();
            sha = fileData.sha;
        }
    } catch (e) {
        // File does not exist yet
    }

    const payload = {
        message: commitMessage,
        content: contentBase64
    };
    if (sha) {
        payload.sha = sha;
    }

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || "GitHub API rejected upload");
    }
    return result;
}

// GitHub API: Fetch & update manifest.json
async function updateManifestOnGitHub(token, owner, repo, newDocEntry) {
    const manifestUrl = getContentsUrl(owner, repo, "pdfs/manifest.json");

    const getRes = await fetch(manifestUrl, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        }
    });

    if (!getRes.ok) {
        throw new Error("Failed to fetch manifest.json from repository");
    }

    const manifestData = await getRes.json();
    const decodedStr = atob(manifestData.content.replace(/\n/g, ""));
    let manifest = JSON.parse(decodedStr);

    if (!Array.isArray(manifest)) manifest = [];

    // Replace if existing path exists, else push
    const existingIndex = manifest.findIndex(item => item.path === newDocEntry.path);
    if (existingIndex >= 0) {
        manifest[existingIndex] = newDocEntry;
    } else {
        manifest.push(newDocEntry);
    }

    const updatedBase64 = btoa(JSON.stringify(manifest, null, 2));

    const putRes = await fetch(manifestUrl, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: `Update documentation manifest for ${newDocEntry.name}`,
            content: updatedBase64,
            sha: manifestData.sha
        })
    });

    if (!putRes.ok) {
        const errorResult = await putRes.json();
        throw new Error(errorResult.message || "Failed to update manifest.json on GitHub");
    }

    return manifest;
}

// Upload Button Click Handler
if (uploadButton) uploadButton.addEventListener("click", async () => {
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    const token = tokenInput.value.trim();
    const folder = folderInput.value.trim() || "General";
    const docTitle = docTitleInput.value.trim();
    const file = docFileInput.files[0];
    const finalMdContent = markdownTextarea.value.trim();

    if (!owner || !repo || !token) {
        showStatus("Please enter your GitHub owner, repo, and access token.", "error");
        return;
    }

    if (!docTitle) {
        showStatus("Please enter a document display title.", "error");
        return;
    }

    if (!finalMdContent) {
        showStatus("No markdown content to upload. Please select a file to convert first.", "error");
        return;
    }

    uploadButton.disabled = true;
    uploadButton.textContent = "Uploading to GitHub...";
    showStatus("Committing converted document to repository...", "info");

    try {
        // Sanitize filename
        const safeTitle = docTitle.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-");
        const docPath = `docs/${folder}/${safeTitle}.md`;

        // 1. Upload converted .md document file
        const base64Content = utf8ToBase64(finalMdContent);
        await uploadFileToGitHub(
            token,
            owner,
            repo,
            docPath,
            base64Content,
            `Add document: ${docTitle}`
        );

        // 2. Upload raw original file if selected (e.g. original PDF or DOCX)
        let originalPath = docPath;
        if (file) {
            try {
                showStatus("Saving original uploaded file to repository...", "info");
                const rawPath = `pdfs/${file.name}`;
                const rawBase64 = await fileToBase64(file);
                await uploadFileToGitHub(
                    token,
                    owner,
                    repo,
                    rawPath,
                    rawBase64,
                    `Add raw file: ${file.name}`
                );
                originalPath = rawPath;
            } catch (rawErr) {
                console.warn("Could not save original binary file, defaulting to markdown path:", rawErr);
            }
        }

        showStatus("Document saved! Updating library manifest...", "info");

        // 3. Update manifest.json with path and originalPath
        const newEntry = {
            name: docTitle,
            path: docPath,
            originalPath: originalPath,
            folder: folder,
            size: file ? file.size : finalMdContent.length,
            date: new Date().toISOString(),
            type: "md"
        };

        await updateManifestOnGitHub(token, owner, repo, newEntry);

        showStatus(`
            🎉 <strong>Success!</strong> "${docTitle}" has been converted and published.<br>
            <a href="./index.html#${encodeURIComponent(docPath)}" style="color: var(--accent); text-decoration: underline; margin-top: 6px; display: inline-block;">
                Click here to view it in the Documentation Reader →
            </a>
        `, "success");

        loadExistingDocuments();

    } catch (error) {
        console.error("Upload error:", error);
        showStatus(`Upload failed: ${error.message}`, "error");
    } finally {
        uploadButton.disabled = false;
        uploadButton.textContent = "Upload Document to GitHub";
    }
});

// GitHub API: Delete a file from the repository
async function deleteFileFromGitHub(token, owner, repo, path, commitMessage) {
    const url = getContentsUrl(owner, repo, path);

    const getRes = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        }
    });

    if (!getRes.ok) return null; // File doesn't exist, nothing to delete

    const fileData = await getRes.json();

    const delRes = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: commitMessage || `Delete ${path}`,
            sha: fileData.sha
        })
    });

    if (!delRes.ok) {
        const errResult = await delRes.json();
        throw new Error(errResult.message || `Failed to delete ${path}`);
    }

    return true;
}

// GitHub API: Update manifest.json with a callback function
async function updateManifestWithCallback(token, owner, repo, updateFn) {
    const manifestUrl = getContentsUrl(owner, repo, "pdfs/manifest.json");

    const getRes = await fetch(manifestUrl, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json"
        }
    });

    if (!getRes.ok) throw new Error("Failed to fetch manifest.json");

    const manifestData = await getRes.json();
    const decodedStr = atob(manifestData.content.replace(/\n/g, ""));
    let manifest = JSON.parse(decodedStr);
    if (!Array.isArray(manifest)) manifest = [];

    manifest = updateFn(manifest);

    const updatedBase64 = btoa(JSON.stringify(manifest, null, 2));

    const putRes = await fetch(manifestUrl, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Update manifest.json",
            content: updatedBase64,
            sha: manifestData.sha
        })
    });

    if (!putRes.ok) {
        const errorResult = await putRes.json();
        throw new Error(errorResult.message || "Failed to update manifest.json");
    }

    return manifest;
}

// Delete Document Handler
async function handleDeleteDocument(doc) {
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    let token = tokenInput.value.trim();

    if (!token) {
        token = prompt("Enter your GitHub Personal Access Token to delete this document:");
        if (!token) return;
        tokenInput.value = token;
        sessionStorage.setItem("github_token", token);
    }

    if (!confirm(`Are you sure you want to permanently delete "${doc.name}"?\n\nThis will remove both the converted markdown and the original uploaded file from the repository.`)) {
        return;
    }

    showStatus(`Deleting "${doc.name}" from repository...`, "info");

    try {
        // Delete converted .md file
        await deleteFileFromGitHub(token, owner, repo, doc.path, `Delete document: ${doc.name}`);

        // Delete raw original file if it's different from the .md file
        if (doc.originalPath && doc.originalPath !== doc.path) {
            await deleteFileFromGitHub(token, owner, repo, doc.originalPath, `Delete raw file for: ${doc.name}`);
        }

        // Remove from manifest.json
        await updateManifestWithCallback(token, owner, repo, (manifest) => {
            return manifest.filter(m => m.path !== doc.path);
        });

        showStatus(`✅ Successfully deleted "${doc.name}".`, "success");
        loadExistingDocuments();

    } catch (error) {
        console.error("Delete error:", error);
        showStatus(`Delete failed: ${error.message}`, "error");
    }
}

// Rename Document Handler
async function handleRenameDocument(doc) {
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    let token = tokenInput.value.trim();

    if (!token) {
        token = prompt("Enter your GitHub Personal Access Token to rename this document:");
        if (!token) return;
        tokenInput.value = token;
        sessionStorage.setItem("github_token", token);
    }

    const newTitle = prompt("Enter new document display title:", doc.name);
    if (!newTitle || newTitle.trim() === doc.name) return;

    const newFolder = prompt("Enter target folder / category:", doc.folder || "General");
    if (newFolder === null) return; // cancelled

    showStatus(`Renaming "${doc.name}" to "${newTitle.trim()}"...`, "info");

    try {
        const safeTitle = newTitle.trim().replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-");
        const newPath = `docs/${newFolder.trim() || "General"}/${safeTitle}.md`;

        // Read old file content from GitHub
        const oldUrl = getContentsUrl(owner, repo, doc.path);
        const oldRes = await fetch(oldUrl, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github+json"
            }
        });

        if (oldRes.ok) {
            const oldData = await oldRes.json();
            // Create file at new path with same content
            await uploadFileToGitHub(token, owner, repo, newPath, oldData.content, `Rename: ${doc.name} → ${newTitle.trim()}`);
            // Delete old file
            await deleteFileFromGitHub(token, owner, repo, doc.path, `Remove old path after rename: ${doc.path}`);
        }

        // Update manifest entry
        await updateManifestWithCallback(token, owner, repo, (manifest) => {
            const idx = manifest.findIndex(m => m.path === doc.path);
            const updatedEntry = {
                ...doc,
                name: newTitle.trim(),
                path: newPath,
                folder: (newFolder.trim() || "General"),
                date: new Date().toISOString()
            };
            if (idx >= 0) manifest[idx] = updatedEntry;
            else manifest.push(updatedEntry);
            return manifest;
        });

        showStatus(`✅ Successfully renamed "${doc.name}" → "${newTitle.trim()}".`, "success");
        loadExistingDocuments();

    } catch (error) {
        console.error("Rename error:", error);
        showStatus(`Rename failed: ${error.message}`, "error");
    }
}


async function loadExistingDocuments() {
    if (!existingDocuments) return;

    try {
        let response = await fetch(`./pdfs/manifest.json`, { cache: 'no-store' });
        if (!response.ok) {
            response = await fetch(`https://nayan-m15.github.io/SDP-Project-Documentation/pdfs/manifest.json`, { cache: 'no-store' });
        }
        if (!response.ok) {
            response = await fetch(`https://raw.githubusercontent.com/nayan-m15/SDP-Project-Documentation/main/pdfs/manifest.json`, { cache: 'no-store' });
        }
        if (!response.ok) {
            existingDocuments.innerHTML = `<p style="font-size: 12px; color: var(--text-tertiary);">No documents registered yet.</p>`;
            return;
        }

        const manifest = await response.json();
        existingDocuments.innerHTML = "";

        if (manifest.length === 0) {
            existingDocuments.innerHTML = `<p style="font-size: 12px; color: var(--text-tertiary);">No documents uploaded yet.</p>`;
            return;
        }

        manifest.forEach((doc) => {
            const item = document.createElement("div");
            item.className = "existing-document";
            const date = new Date(doc.date);
            const isMd = doc.type === "md" || doc.path.endsWith(".md");
            const badgeClass = isMd ? "md" : "pdf";
            const badgeText = isMd ? "MD" : "PDF";

            item.innerHTML = `
                <span class="doc-badge ${badgeClass}">${badgeText}</span>
                <div class="existing-document-info">
                    <div class="existing-document-name">${doc.name}</div>
                    <div class="existing-document-meta">${doc.folder || "Docs"} · ${date.toLocaleDateString()}</div>
                </div>
                <div class="existing-doc-actions">
                    <button class="doc-action-btn rename-btn" title="Rename Document">✏️</button>
                    <button class="doc-action-btn delete-btn" title="Delete Document">🗑️</button>
                </div>
            `;

            item.querySelector(".rename-btn").addEventListener("click", () => handleRenameDocument(doc));
            item.querySelector(".delete-btn").addEventListener("click", () => handleDeleteDocument(doc));

            existingDocuments.appendChild(item);
        });
    } catch (err) {
        console.error("Failed to load existing documents:", err);
        existingDocuments.innerHTML = `<p style="font-size: 12px; color: var(--danger);">Unable to load existing documents list.</p>`;
    }
}

// Initialize Uploader Page
initTheme();
loadExistingDocuments();