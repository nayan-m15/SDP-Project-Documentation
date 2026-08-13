// DOM Element References
const treeContainer = document.getElementById("treeContainer");
const treeSearch = document.getElementById("treeSearch");
const readerLayout = document.getElementById("readerLayout");
const emptyState = document.getElementById("emptyState");
const markdownWrapper = document.getElementById("markdownWrapper");
const markdownViewer = document.getElementById("markdownViewer");
const pdfViewer = document.getElementById("pdfViewer");
const tocSidebar = document.getElementById("tocSidebar");
const tocList = document.getElementById("tocList");
const breadcrumbs = document.getElementById("breadcrumbs");
const viewerTitle = document.getElementById("viewerTitle");
const rawLink = document.getElementById("rawLink");
const githubEditLink = document.getElementById("githubEditLink");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const PAGES_BASE = "https://nayan-m15.github.io/SDP-Project-Documentation";
const GITHUB_REPO = "nayan-m15/SDP-Project-Documentation";

let allDocuments = [];
let currentDoc = null;

// Initialize Theme
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

// Helper to probe local filesystem vs GitHub repository sources for a working raw URL
async function resolveWorkingUrl(path) {
    const encoded = encodeURI(path);
    const candidateUrls = [
        `./${encoded}`,
        `${PAGES_BASE}/${encoded}`,
        `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${encoded}`,
        `https://raw.githubusercontent.com/${GITHUB_REPO}/Ui-Improvements/${encoded}`
    ];

    for (const url of candidateUrls) {
        try {
            const res = await fetch(url);
            if (res.ok) return url;
        } catch (e) {}
    }
    return `./${encoded}`;
}

// Fetch Manifest & Load Documents
async function loadDocuments() {
    try {
        let response = await fetch(`${PAGES_BASE}/pdfs/manifest.json`);
        if (!response.ok) {
            response = await fetch("./pdfs/manifest.json");
        }
        if (!response.ok) {
            throw new Error("Failed to load manifest.json");
        }

        allDocuments = await response.json();
        renderTree(allDocuments);

        // Check URL hash for initial document load
        const hash = window.location.hash.slice(1);
        if (hash) {
            const found = allDocuments.find(d => d.path === decodeURIComponent(hash));
            if (found) {
                selectDocument(found);
            }
        }
    } catch (error) {
        console.error("Error loading document manifest:", error);
        treeContainer.innerHTML = `
            <div style="padding: 12px; color: var(--danger); font-size: 12px;">
                Unable to load documents manifest. Please check repository setup.
            </div>
        `;
    }
}

// Render Folder Tree Sidebar
function renderTree(documents) {
    treeContainer.innerHTML = "";

    // Group documents by folder
    const groups = {};
    documents.forEach((doc) => {
        let folderName = doc.folder;
        if (!folderName) {
            // Infer folder from path if missing
            const parts = doc.path.split("/");
            folderName = parts.length > 2 ? parts[1] : "General";
        }
        if (!groups[folderName]) {
            groups[folderName] = [];
        }
        groups[folderName].push(doc);
    });

    // Create tree elements
    Object.keys(groups).forEach((folderName, index) => {
        const folderDiv = document.createElement("div");
        folderDiv.className = "tree-folder open"; // Default open
        folderDiv.dataset.folder = folderName.toLowerCase();

        const folderHeader = document.createElement("button");
        folderHeader.className = "tree-folder-header";
        folderHeader.type = "button";
        folderHeader.innerHTML = `
            <span class="folder-arrow">▶</span>
            <span class="folder-icon">📁</span>
            <span class="folder-name">${folderName}</span>
        `;

        folderHeader.addEventListener("click", () => {
            folderDiv.classList.toggle("open");
        });

        const contentsDiv = document.createElement("div");
        contentsDiv.className = "tree-folder-contents";

        groups[folderName].forEach((doc) => {
            const docBtn = document.createElement("button");
            docBtn.className = "document-button";
            docBtn.type = "button";
            docBtn.dataset.path = doc.path;
            docBtn.dataset.name = doc.name.toLowerCase();

            const isMd = doc.type === "md" || doc.path.endsWith(".md");
            const badgeClass = isMd ? "md" : "pdf";
            const badgeText = isMd ? "MD" : "PDF";

            docBtn.innerHTML = `
                <span class="doc-badge ${badgeClass}">${badgeText}</span>
                <span class="document-name">${doc.name}</span>
            `;

            docBtn.addEventListener("click", () => {
                selectDocument(doc, docBtn);
            });

            contentsDiv.appendChild(docBtn);
        });

        folderDiv.appendChild(folderHeader);
        folderDiv.appendChild(contentsDiv);
        treeContainer.appendChild(folderDiv);
    });
}

// Tree Search Filter
treeSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const folderElements = treeContainer.querySelectorAll(".tree-folder");

    folderElements.forEach((folderEl) => {
        let hasVisibleDoc = false;
        const docBtns = folderEl.querySelectorAll(".document-button");

        docBtns.forEach((docBtn) => {
            const name = docBtn.dataset.name;
            const path = docBtn.dataset.path.toLowerCase();
            if (!query || name.includes(query) || path.includes(query)) {
                docBtn.style.display = "flex";
                hasVisibleDoc = true;
            } else {
                docBtn.style.display = "none";
            }
        });

        if (hasVisibleDoc || !query) {
            folderEl.style.display = "block";
            if (query) {
                folderEl.classList.add("open");
            }
        } else {
            folderEl.style.display = "none";
        }
    });
});

// Select and Display Document
async function selectDocument(doc, activeBtn) {
    currentDoc = doc;

    // Highlight active button in sidebar
    document.querySelectorAll(".document-button").forEach(btn => btn.classList.remove("active"));
    if (activeBtn) {
        activeBtn.classList.add("active");
    } else {
        const matchingBtn = document.querySelector(`.document-button[data-path="${CSS.escape(doc.path)}"]`);
        if (matchingBtn) matchingBtn.classList.add("active");
    }

    // Update URL hash
    window.location.hash = encodeURIComponent(doc.path);

    // Update Breadcrumbs & Header Links
    const folderName = doc.folder || "Docs";
    breadcrumbs.innerHTML = `
        <span class="breadcrumb-item">Docs</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item">${folderName}</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">${doc.name}</span>
    `;

    // Encode URI path safely for URLs with spaces/special characters
    const encodedPath = encodeURI(doc.path);
    const targetRawPath = doc.originalPath || doc.path;
    const encodedRawPath = encodeURI(targetRawPath);

    // Topbar action links setup
    rawLink.style.display = "inline-flex";
    rawLink.target = "_blank";
    rawLink.href = `./${encodedRawPath}`;
    rawLink.title = `View original file: ${targetRawPath}`;

    // Asynchronously resolve working URL for rawLink (local disk vs GitHub repository)
    resolveWorkingUrl(targetRawPath).then(workingUrl => {
        rawLink.href = workingUrl;
    });

    githubEditLink.style.display = "inline-flex";
    githubEditLink.target = "_blank";
    githubEditLink.href = `https://github.com/${GITHUB_REPO}/blob/main/${encodedPath}`;

    // Show Reader Layout & Hide Empty State
    emptyState.style.display = "none";
    readerLayout.style.display = "flex";

    const isMd = doc.type === "md" || doc.path.endsWith(".md");

    if (isMd) {
        // Render Markdown Document
        pdfViewer.style.display = "none";
        markdownWrapper.style.display = "block";
        tocSidebar.style.display = "block";

        markdownViewer.innerHTML = `<div style="color: var(--text-tertiary);">Loading markdown content...</div>`;

        try {
            // Probe sources in priority order to find working Markdown content
            const sources = [
                `./${encodedPath}`,
                `${PAGES_BASE}/${encodedPath}`,
                `https://raw.githubusercontent.com/${GITHUB_REPO}/Ui-Improvements/${encodedPath}`,
                `https://raw.githubusercontent.com/${GITHUB_REPO}/main/${encodedPath}`
            ];

            let rawText = "";
            let fetchSuccess = false;

            for (const url of sources) {
                try {
                    const res = await fetch(url);
                    if (res.ok) {
                        rawText = await res.text();
                        fetchSuccess = true;
                        break;
                    }
                } catch (e) {
                    // Continue to next fallback source
                }
            }

            if (!fetchSuccess) {
                throw new Error(`Document file not found at ${doc.path}`);
            }

            // Render HTML via Marked.js
            if (window.marked) {
                markdownViewer.innerHTML = marked.parse(rawText);
            } else {
                markdownViewer.textContent = rawText;
            }

            // Highlight syntax if highlight.js is loaded
            if (window.hljs) {
                markdownViewer.querySelectorAll("pre code").forEach((block) => {
                    hljs.highlightElement(block);
                });
            }

            // Add Copy Code Buttons to Code Blocks
            markdownViewer.querySelectorAll("pre").forEach((preBlock) => {
                const copyBtn = document.createElement("button");
                copyBtn.className = "copy-code-btn";
                copyBtn.textContent = "Copy";
                copyBtn.addEventListener("click", () => {
                    const codeText = preBlock.querySelector("code")?.innerText || preBlock.innerText;
                    navigator.clipboard.writeText(codeText);
                    copyBtn.textContent = "Copied!";
                    setTimeout(() => { copyBtn.textContent = "Copy"; }, 2000);
                });
                preBlock.appendChild(copyBtn);
            });

            // Generate Table of Contents
            buildTOC();

        } catch (error) {
            console.error("Error loading markdown:", error);
            markdownViewer.innerHTML = `
                <div style="color: var(--danger); padding: 20px;">
                    <h3>Failed to load markdown document</h3>
                    <p style="font-size: 13px; margin-top: 8px;">${error.message}</p>
                </div>
            `;
            tocSidebar.style.display = "none";
        }
    } else {
        // Render PDF Document Fallback
        markdownWrapper.style.display = "none";
        tocSidebar.style.display = "none";
        pdfViewer.style.display = "block";

        resolveWorkingUrl(targetRawPath).then(workingUrl => {
            pdfViewer.src = workingUrl;
            rawLink.href = workingUrl;
        });
    }
}

// Generate On-Page Table of Contents
function buildTOC() {
    tocList.innerHTML = "";
    const headings = markdownViewer.querySelectorAll("h1, h2, h3");

    if (headings.length === 0) {
        tocSidebar.style.display = "none";
        return;
    }

    tocSidebar.style.display = "block";

    headings.forEach((heading, idx) => {
        const id = `heading-${idx}`;
        heading.id = id;

        const level = parseInt(heading.tagName.replace("H", ""), 10);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = `toc-link indent-${level}`;
        a.href = `#${id}`;
        a.textContent = heading.innerText;

        a.addEventListener("click", (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: "smooth" });
        });

        li.appendChild(a);
        tocList.appendChild(li);
    });
}

// Initialize Application
initTheme();
loadDocuments();