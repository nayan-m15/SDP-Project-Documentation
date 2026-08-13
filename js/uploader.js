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

// GitHub API: Upload file
async function uploadFileToGitHub(token, owner, repo, path, contentBase64, commitMessage) {
    const url = getContentsUrl(owner, repo, path);
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: commitMessage,
            content: contentBase64
        })
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
uploadButton.addEventListener("click", async () => {
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

        // 1. Upload .md document file
        const base64Content = utf8ToBase64(finalMdContent);
        await uploadFileToGitHub(
            token,
            owner,
            repo,
            docPath,
            base64Content,
            `Add document: ${docTitle}`
        );

        showStatus("Document saved! Updating library manifest...", "info");

        // 2. Update manifest.json
        const newEntry = {
            name: docTitle,
            path: docPath,
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

// Load Existing Documents List in Right Card
async function loadExistingDocuments() {
    if (!existingDocuments) return;

    try {
        let response = await fetch("./pdfs/manifest.json");
        if (!response.ok) {
            existingDocuments.innerHTML = `<p style="font-size: 12px; color: var(--text-tertiary);">No documents registered yet.</p>`;
            return;
        }

        const manifest = await response.json();
        existingDocuments.innerHTML = "";

        manifest.forEach((doc) => {
            const item = document.createElement("div");
            item.className = "existing-document";
            const date = new Date(doc.date);
            const badgeClass = doc.type === "md" || doc.path.endsWith(".md") ? "md" : "pdf";
            const badgeText = doc.type === "md" || doc.path.endsWith(".md") ? "MD" : "PDF";

            item.innerHTML = `
                <span class="doc-badge ${badgeClass}">${badgeText}</span>
                <div class="existing-document-info">
                    <div class="existing-document-name">${doc.name}</div>
                    <div class="existing-document-meta">${doc.folder || "Docs"} · ${date.toLocaleDateString()}</div>
                </div>
            `;
            existingDocuments.appendChild(item);
        });
    } catch (err) {
        existingDocuments.innerHTML = `<p style="font-size: 12px; color: var(--text-tertiary);">Unable to load existing documents list.</p>`;
    }
}

// Initialize Uploader Page
initTheme();
loadExistingDocuments();