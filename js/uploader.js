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
const dropzone = document.getElementById("dropzone");
const dropzoneText = document.getElementById("dropzoneText");

const conversionContainer = document.getElementById("conversionContainer");
const tabEdit = document.getElementById("tabEdit");
const tabPreview = document.getElementById("tabPreview");
const paneEdit = document.getElementById("paneEdit");
const panePreview = document.getElementById("panePreview");
const markdownTextarea = document.getElementById("markdownTextarea");
const livePreviewBody = document.getElementById("livePreviewBody");
const editorStats = document.getElementById("editorStats");

const uploadButton = document.getElementById("uploadButton");
const downloadMdBtn = document.getElementById("downloadMdBtn");
const uploadStatus = document.getElementById("uploadStatus");
const existingDocuments = document.getElementById("existingDocuments");
const docManagerSearch = document.getElementById("docManagerSearch");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const toastContainer = document.getElementById("toastContainer");

let convertedMarkdown = "";
let loadedManifestDocuments = [];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const PAGES_BASE = "https://nayan-m15.github.io/SDP-Project-Documentation";

function refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Toast Helper
function showToast(message, iconName = "check") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i data-lucide="${iconName}" class="svg-icon-sm"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    refreshIcons();

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "all 0.2s ease";
        setTimeout(() => toast.remove(), 250);
    }, 2800);
}

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem("sdp_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeUI(savedTheme);
}

function updateThemeUI(theme) {
    if (theme === "dark") {
        themeIcon.innerHTML = `<i data-lucide="sun" class="svg-icon-sm"></i>`;
        themeText.textContent = "Light Mode";
    } else {
        themeIcon.innerHTML = `<i data-lucide="moon" class="svg-icon-sm"></i>`;
        themeText.textContent = "Dark Mode";
    }
    refreshIcons();
}

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("sdp_theme", newTheme);
    updateThemeUI(newTheme);
});

// Mobile Sidebar Drawer
function toggleMobileMenu(open) {
    const shouldOpen = open !== undefined ? open : !sidebar.classList.contains("open");
    if (shouldOpen) {
        sidebar.classList.add("open");
        sidebarBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    } else {
        sidebar.classList.remove("open");
        sidebarBackdrop.classList.remove("active");
        document.body.style.overflow = "";
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", () => toggleMobileMenu());
if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", () => toggleMobileMenu(false));

// Save PAT in Session Storage for Convenience
if (sessionStorage.getItem("github_token")) {
    tokenInput.value = sessionStorage.getItem("github_token");
}
tokenInput.addEventListener("change", () => {
    if (tokenInput.value.trim()) {
        sessionStorage.setItem("github_token", tokenInput.value.trim());
    }
});

function getOrPromptToken() {
    let token = tokenInput.value.trim();
    if (!token) {
        token = sessionStorage.getItem("github_token") || "";
    }
    if (!token) {
        token = prompt("Please enter your GitHub Personal Access Token (PAT) to perform this action:");
        if (token && token.trim()) {
            token = token.trim();
            tokenInput.value = token;
            sessionStorage.setItem("github_token", token);
        }
    }
    return token;
}

// Quick Category Chips
document.querySelectorAll(".category-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        const folder = chip.dataset.folder;
        folderInput.value = folder;
        document.querySelectorAll(".category-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
    });
});

// Status helper
function showStatus(message, type) {
    uploadStatus.hidden = false;
    uploadStatus.innerHTML = message;
    uploadStatus.className = `upload-status ${type}`;
    refreshIcons();
}

// Update Editor Statistics & Live Preview
function updateLivePreview() {
    const md = markdownTextarea.value;
    const words = md.trim() ? md.trim().split(/\s+/).length : 0;
    const chars = md.length;

    if (editorStats) {
        editorStats.textContent = `${words.toLocaleString()} words · ${chars.toLocaleString()} chars`;
    }

    if (window.marked) {
        livePreviewBody.innerHTML = marked.parse(md);
    } else {
        livePreviewBody.textContent = md;
    }

    if (downloadMdBtn) {
        downloadMdBtn.style.display = md.trim() ? "inline-flex" : "none";
    }
    refreshIcons();
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

// Drag & Drop Handling
if (dropzone) {
    dropzone.addEventListener("click", () => docFileInput.click());

    ["dragenter", "dragover"].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add("drag-over");
        });
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove("drag-over");
        });
    });

    dropzone.addEventListener("drop", (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    });
}

docFileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
        handleFileSelection(e.target.files[0]);
    }
});

// Process Selected File
async function handleFileSelection(file) {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
        showStatus("File is too large. Maximum size is 25 MB.", "error");
        return;
    }

    if (dropzoneText) {
        dropzoneText.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
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
            convertedMarkdown = await readTextFile(file);
        } else if (fileNameLower.endsWith(".docx")) {
            convertedMarkdown = await convertDocxToMarkdown(file);
        } else if (fileNameLower.endsWith(".pdf")) {
            convertedMarkdown = await convertPdfToMarkdown(file);
        } else {
            throw new Error("Unsupported file type. Please select a .pdf, .docx, .txt, or .md file.");
        }

        markdownTextarea.value = convertedMarkdown;
        updateLivePreview();
        showStatus(`Successfully converted "${file.name}" to Markdown! Review or edit below before saving.`, "success");
        showToast(`Converted "${file.name}" to Markdown`, "file-check");

    } catch (error) {
        console.error("Conversion error:", error);
        showStatus(`Conversion failed: ${error.message}`, "error");
    }
}

function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Failed to read text file"));
        reader.readAsText(file);
    });
}

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

function convertPdfToMarkdown(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                if (!window.pdfjsLib) {
                    throw new Error("PDF.js library not loaded");
                }

                const loadingTask = pdfjsLib.getDocument({ data: e.target.result });
                const pdf = await loadingTask.promise;

                let extractedMarkdown = `# ${docTitleInput.value.trim() || file.name}\n\n`;

                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    
                    let lastY = null;
                    let pageText = "";

                    textContent.items.forEach((item) => {
                        if (lastY !== null && Math.abs(item.transform[5] - lastY) > 6) {
                            pageText += "\n";
                        }
                        pageText += item.str + " ";
                        lastY = item.transform[5];
                    });

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

// One-Click Direct Download as .MD file
if (downloadMdBtn) {
    downloadMdBtn.addEventListener("click", () => {
        const content = markdownTextarea.value;
        if (!content.trim()) return;

        const title = docTitleInput.value.trim() || "document";
        const sanitizedFilename = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".md";

        const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = sanitizedFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast(`Downloaded ${sanitizedFilename}`, "download");
    });
}

// GitHub API: Commit/Upload a file
async function commitFileToGitHub(owner, repo, token, path, content, message) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    let sha = null;
    try {
        const checkRes = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });
        if (checkRes.ok) {
            const data = await checkRes.json();
            sha = data.sha;
        }
    } catch (e) {}

    const body = {
        message: message,
        content: btoa(unescape(encodeURIComponent(content))),
        ...(sha && { sha })
    };

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to commit file to GitHub");
    }

    return await res.json();
}

// GitHub API: Delete a file
async function deleteFileFromGitHub(token, owner, repo, path, message) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const checkRes = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });

    if (!checkRes.ok) {
        return true;
    }

    const data = await checkRes.json();
    const sha = data.sha;

    const delRes = await fetch(url, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message,
            sha: sha
        })
    });

    if (!delRes.ok) {
        const err = await delRes.json();
        throw new Error(err.message || "Failed to delete file from GitHub");
    }

    return true;
}

// GitHub API: Update manifest.json with a modifier callback function
async function updateManifestWithCallback(token, owner, repo, updateFn) {
    const manifestUrl = `https://api.github.com/repos/${owner}/${repo}/contents/pdfs/manifest.json`;

    const getRes = await fetch(manifestUrl, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json"
        }
    });

    if (!getRes.ok) throw new Error("Failed to fetch manifest.json from GitHub");

    const manifestData = await getRes.json();
    const rawManifestText = decodeURIComponent(escape(atob(manifestData.content.replace(/\s/g, ""))));
    let manifest = JSON.parse(rawManifestText);
    if (!Array.isArray(manifest)) manifest = [];

    manifest = updateFn(manifest);

    const updatedBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(manifest, null, 2))));

    const putRes = await fetch(manifestUrl, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Update manifest.json",
            content: updatedBase64,
            sha: manifestData.sha
        })
    });

    if (!putRes.ok) {
        const err = await putRes.json();
        throw new Error(err.message || "Failed to update manifest.json on GitHub");
    }

    return manifest;
}

// Submit / Upload New Document to GitHub
uploadButton.addEventListener("click", async () => {
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    const token = getOrPromptToken();
    const folder = folderInput.value.trim() || "General";
    const title = docTitleInput.value.trim();
    const markdownContent = markdownTextarea.value.trim();

    if (!title) {
        showStatus("Please provide a Document Display Title.", "error");
        return;
    }

    if (!token) {
        showStatus("A GitHub Personal Access Token (PAT) is required to commit to the repository.", "error");
        return;
    }

    if (!markdownContent) {
        showStatus("Markdown content is empty. Please convert or write a document first.", "error");
        return;
    }

    uploadButton.disabled = true;
    uploadButton.innerHTML = `<i data-lucide="loader-2" class="svg-icon-sm"></i> Uploading to GitHub...`;
    refreshIcons();
    showStatus("Connecting to GitHub API and committing files...", "info");

    try {
        const sanitizedFilename = title.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-") + ".md";
        const docPath = `docs/${folder}/${sanitizedFilename}`;

        // 1. Commit Markdown file
        await commitFileToGitHub(
            owner,
            repo,
            token,
            docPath,
            markdownContent,
            `docs: add ${title} in ${folder}`
        );

        // 2. Update manifest.json
        const newDocEntry = {
            name: title,
            path: docPath,
            originalPath: docPath,
            folder: folder,
            size: new Blob([markdownContent]).size,
            date: new Date().toISOString(),
            type: "md"
        };

        await updateManifestWithCallback(token, owner, repo, (manifest) => {
            const existingIdx = manifest.findIndex(d => d.path === docPath);
            if (existingIdx >= 0) {
                manifest[existingIdx] = newDocEntry;
            } else {
                manifest.push(newDocEntry);
            }
            return manifest;
        });

        showStatus(`Successfully uploaded "<strong>${title}</strong>"! It will be available in the portal shortly.`, "success");
        showToast(`Published "${title}" to GitHub!`, "check-circle-2");
        loadExistingDocuments();

    } catch (err) {
        console.error("Upload error:", err);
        showStatus(`Upload failed: ${err.message}`, "error");
    } finally {
        uploadButton.disabled = false;
        uploadButton.innerHTML = `<i data-lucide="upload" class="svg-icon-sm"></i> Upload Document to GitHub`;
        refreshIcons();
    }
});

// Rename / Move Document Handler
async function handleRenameDocument(doc) {
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    const token = getOrPromptToken();

    if (!token) {
        showToast("GitHub token required to rename document", "alert-circle");
        return;
    }

    const newTitle = prompt("Enter new document display title:", doc.name);
    if (!newTitle || newTitle.trim() === "") return;

    const newFolder = prompt("Enter target folder / category:", doc.folder || "General");
    if (newFolder === null) return;

    const cleanTitle = newTitle.trim();
    const cleanFolder = newFolder.trim() || "General";

    if (cleanTitle === doc.name && cleanFolder === (doc.folder || "General")) {
        return;
    }

    showStatus(`Renaming "${doc.name}" → "${cleanTitle}"...`, "info");
    showToast(`Renaming "${doc.name}"...`, "clock");

    try {
        const safeTitle = cleanTitle.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-") + ".md";
        const newPath = `docs/${cleanFolder}/${safeTitle}`;

        const isMd = doc.type === "md" || doc.path.endsWith(".md");
        if (isMd && doc.path !== newPath) {
            const oldUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${doc.path}`;
            const oldRes = await fetch(oldUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            if (oldRes.ok) {
                const oldData = await oldRes.json();
                const rawContent = decodeURIComponent(escape(atob(oldData.content.replace(/\s/g, ""))));

                await commitFileToGitHub(
                    owner,
                    repo,
                    token,
                    newPath,
                    rawContent,
                    `docs: rename ${doc.name} → ${cleanTitle}`
                );

                await deleteFileFromGitHub(
                    token,
                    owner,
                    repo,
                    doc.path,
                    `docs: remove old path after rename: ${doc.path}`
                );
            }
        }

        // Update manifest.json
        await updateManifestWithCallback(token, owner, repo, (manifest) => {
            const idx = manifest.findIndex(m => m.path === doc.path);
            const updatedEntry = {
                ...doc,
                name: cleanTitle,
                path: (isMd ? newPath : doc.path),
                folder: cleanFolder,
                date: new Date().toISOString()
            };
            if (idx >= 0) manifest[idx] = updatedEntry;
            else manifest.push(updatedEntry);
            return manifest;
        });

        showStatus(`Successfully renamed "${doc.name}" → "${cleanTitle}".`, "success");
        showToast(`Renamed "${cleanTitle}"!`, "check");
        loadExistingDocuments();

    } catch (error) {
        console.error("Rename error:", error);
        showStatus(`Rename failed: ${error.message}`, "error");
        showToast(`Rename failed: ${error.message}`, "alert-triangle");
    }
}

// Delete Document Handler
async function handleDeleteDocument(doc) {
    const owner = ownerInput.value.trim();
    const repo = repoInput.value.trim();
    const token = getOrPromptToken();

    if (!token) {
        showToast("GitHub token required to delete document", "alert-circle");
        return;
    }

    if (!confirm(`Are you sure you want to permanently delete "${doc.name}"?\n\nThis will remove the document file and its entry from the portal manifest.`)) {
        return;
    }

    showStatus(`Deleting "${doc.name}" from repository...`, "info");
    showToast(`Deleting "${doc.name}"...`, "clock");

    try {
        await deleteFileFromGitHub(token, owner, repo, doc.path, `docs: delete ${doc.name}`);

        if (doc.originalPath && doc.originalPath !== doc.path) {
            await deleteFileFromGitHub(token, owner, repo, doc.originalPath, `docs: delete raw source for ${doc.name}`);
        }

        await updateManifestWithCallback(token, owner, repo, (manifest) => {
            return manifest.filter(m => m.path !== doc.path);
        });

        showStatus(`Successfully deleted "${doc.name}".`, "success");
        showToast(`Deleted "${doc.name}"`, "trash-2");
        loadExistingDocuments();

    } catch (error) {
        console.error("Delete error:", error);
        showStatus(`Delete failed: ${error.message}`, "error");
        showToast(`Delete failed: ${error.message}`, "alert-triangle");
    }
}

// Render Document Manager List
function renderExistingDocumentsList(docs) {
    if (!existingDocuments) return;
    existingDocuments.innerHTML = "";

    if (!docs || docs.length === 0) {
        existingDocuments.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-tertiary); font-size: 12.5px;">No documents found.</div>`;
        return;
    }

    docs.forEach((doc) => {
        const item = document.createElement("div");
        item.className = "existing-document";
        const isMd = doc.type === "md" || doc.path.endsWith(".md");
        const badgeClass = isMd ? "md" : "pdf";
        const badgeText = isMd ? "MD" : "PDF";

        const dateStr = doc.date ? new Date(doc.date).toLocaleDateString() : "Recent";
        const sizeStr = doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : "";

        item.innerHTML = `
            <span class="doc-badge ${badgeClass}">${badgeText}</span>
            <div class="existing-document-info">
                <div class="existing-document-name" title="${doc.name}">${doc.name}</div>
                <div class="existing-document-meta">
                    <span><i data-lucide="folder" class="svg-icon-sm"></i> ${doc.folder || "General"}</span>
                    <span><i data-lucide="calendar" class="svg-icon-sm"></i> ${dateStr}</span>
                    ${sizeStr ? `<span><i data-lucide="hard-drive" class="svg-icon-sm"></i> ${sizeStr}</span>` : ""}
                </div>
            </div>
            <div class="existing-doc-actions">
                <a href="./index.html#${encodeURIComponent(doc.path)}" class="doc-action-btn view-btn" title="View in Portal" target="_blank">
                    <i data-lucide="eye" class="svg-icon-sm"></i> <span>View</span>
                </a>
                <button type="button" class="doc-action-btn edit-btn" title="Edit name or category">
                    <i data-lucide="pencil" class="svg-icon-sm"></i> <span>Edit</span>
                </button>
                <button type="button" class="doc-action-btn delete-btn" title="Delete document">
                    <i data-lucide="trash-2" class="svg-icon-sm"></i>
                </button>
            </div>
        `;

        item.querySelector(".edit-btn").addEventListener("click", () => handleRenameDocument(doc));
        item.querySelector(".delete-btn").addEventListener("click", () => handleDeleteDocument(doc));

        existingDocuments.appendChild(item);
    });

    refreshIcons();
}

// Load and render existing documents
async function loadExistingDocuments() {
    try {
        let res = await fetch(`${PAGES_BASE}/pdfs/manifest.json`, { cache: 'no-store' });
        if (!res.ok) res = await fetch("./pdfs/manifest.json", { cache: 'no-store' });
        if (!res.ok) throw new Error("Could not load manifest.json");

        loadedManifestDocuments = await res.json();
        renderExistingDocumentsList(loadedManifestDocuments);
    } catch (e) {
        console.error("Failed to load existing documents:", e);
        if (existingDocuments) {
            existingDocuments.innerHTML = `<div style="color: var(--danger); font-size: 12px; padding: 12px;">Could not load document manifest.</div>`;
        }
    }
}

// Filter existing documents
if (docManagerSearch) {
    docManagerSearch.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
            renderExistingDocumentsList(loadedManifestDocuments);
        } else {
            const filtered = loadedManifestDocuments.filter(d => 
                d.name.toLowerCase().includes(q) || 
                (d.folder && d.folder.toLowerCase().includes(q)) ||
                d.path.toLowerCase().includes(q)
            );
            renderExistingDocumentsList(filtered);
        }
    });
}

// Initialize
initTheme();
loadExistingDocuments();