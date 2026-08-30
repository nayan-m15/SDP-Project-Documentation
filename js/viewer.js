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
const shareDocBtn = document.getElementById("shareDocBtn");
const printDocBtn = document.getElementById("printDocBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");
const docCountBadge = document.getElementById("docCountBadge");

const readingProgressBar = document.getElementById("readingProgressBar");
const backToTopBtn = document.getElementById("backToTopBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const toastContainer = document.getElementById("toastContainer");

// Spotlight Search Elements
const spotlightModal = document.getElementById("spotlightModal");
const spotlightInput = document.getElementById("spotlightInput");
const spotlightResults = document.getElementById("spotlightResults");
const spotlightTriggerBtn = document.getElementById("spotlightTriggerBtn");
const searchShortcutPill = document.getElementById("searchShortcutPill");

// Document Meta Elements
const docMetaHeader = document.getElementById("docMetaHeader");
const metaCategory = document.getElementById("metaCategory");
const metaReadTime = document.getElementById("metaReadTime");
const metaWords = document.getElementById("metaWords");
const docPagination = document.getElementById("docPagination");

const PAGES_BASE = "https://nayan-m15.github.io/SDP-Project-Documentation";
const GITHUB_REPO = "nayan-m15/SDP-Project-Documentation";

let allDocuments = [];
let currentDoc = null;
let spotlightSelectedIndex = 0;
let spotlightMatches = [];

// Refresh Lucide Icons in DOM
function refreshIcons() {
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Initialize Mermaid.js
if (window.mermaid) {
    const isDark = (localStorage.getItem("sdp_theme") || "light") === "dark";
    mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        securityLevel: "loose"
    });
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

// Initialize Theme
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

    // Refresh mermaid diagrams if present
    if (window.mermaid && markdownViewer.querySelector(".mermaid")) {
        mermaid.initialize({
            startOnLoad: false,
            theme: newTheme === "dark" ? "dark" : "neutral"
        });
        if (currentDoc) selectDocument(currentDoc);
    }
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

// Reading Progress Bar & Back-to-Top Handler
if (markdownWrapper) {
    markdownWrapper.addEventListener("scroll", () => {
        const scrollTop = markdownWrapper.scrollTop;
        const scrollHeight = markdownWrapper.scrollHeight - markdownWrapper.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        if (readingProgressBar) {
            readingProgressBar.style.width = `${progress}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 250) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });
}

if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        if (markdownWrapper) {
            markdownWrapper.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}

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
            const res = await fetch(url, { cache: 'no-store' });
            if (res.ok) return url;
        } catch (e) {}
    }
    return `./${encoded}`;
}

// Fetch Manifest & Load Documents
async function loadDocuments() {
    try {
        let response = await fetch(`${PAGES_BASE}/pdfs/manifest.json`, { cache: 'no-store' });
        if (!response.ok) {
            response = await fetch("./pdfs/manifest.json", { cache: 'no-store' });
        }
        if (!response.ok) {
            throw new Error("Failed to load manifest.json");
        }

        allDocuments = await response.json();
        if (docCountBadge) {
            docCountBadge.textContent = `${allDocuments.length} docs`;
        }

        renderTree(allDocuments);

        // Check URL hash for initial document load
        const hash = window.location.hash.slice(1);
        if (hash) {
            const decoded = decodeURIComponent(hash);
            const found = allDocuments.find(d => d.path === decoded);
            if (found) {
                selectDocument(found);
            } else if (allDocuments.length > 0) {
                selectDocument(allDocuments[0]);
            }
        } else if (allDocuments.length > 0) {
            selectDocument(allDocuments[0]);
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

// Render Folder Tree Sidebar with Multi-Level Subfolder Hierarchy
function buildDocTree(documents) {
    const root = { name: "root", folders: {}, docs: [] };

    documents.forEach((doc) => {
        let pathStr = doc.path;
        if (pathStr.startsWith("docs/")) {
            pathStr = pathStr.slice(5);
        } else if (pathStr.startsWith("./docs/")) {
            pathStr = pathStr.slice(7);
        }

        const parts = pathStr.split("/").filter(Boolean);
        let curr = root;

        for (let i = 0; i < parts.length - 1; i++) {
            const folderName = parts[i];
            if (!curr.folders[folderName]) {
                curr.folders[folderName] = {
                    name: folderName,
                    folders: {},
                    docs: []
                };
            }
            curr = curr.folders[folderName];
        }

        curr.docs.push(doc);
    });

    return root;
}

function countTreeDocs(node) {
    let total = node.docs.length;
    Object.values(node.folders).forEach(childFolder => {
        total += countTreeDocs(childFolder);
    });
    return total;
}

function renderTreeBranch(node, containerElement) {
    // 1. Render child subfolders
    Object.keys(node.folders).forEach((folderName) => {
        const folderNode = node.folders[folderName];
        const count = countTreeDocs(folderNode);

        const folderDiv = document.createElement("div");
        folderDiv.className = "tree-folder open";
        folderDiv.dataset.folder = folderName.toLowerCase();

        const folderHeader = document.createElement("button");
        folderHeader.className = "tree-folder-header";
        folderHeader.type = "button";
        folderHeader.innerHTML = `
            <i data-lucide="chevron-right" class="svg-icon-sm folder-arrow"></i>
            <i data-lucide="folder" class="svg-icon-sm folder-icon"></i>
            <span class="folder-name">${folderName}</span>
            <span class="folder-count-badge">${count}</span>
        `;

        folderHeader.addEventListener("click", (e) => {
            e.stopPropagation();
            folderDiv.classList.toggle("open");
        });

        const contentsDiv = document.createElement("div");
        contentsDiv.className = "tree-folder-contents";

        renderTreeBranch(folderNode, contentsDiv);

        folderDiv.appendChild(folderHeader);
        folderDiv.appendChild(contentsDiv);
        containerElement.appendChild(folderDiv);
    });

    // 2. Render direct documents in this directory
    node.docs.forEach((doc) => {
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

        docBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            selectDocument(doc, docBtn);
            toggleMobileMenu(false);
        });

        containerElement.appendChild(docBtn);
    });
}

function renderTree(documents) {
    treeContainer.innerHTML = "";
    const rootNode = buildDocTree(documents);
    renderTreeBranch(rootNode, treeContainer);
    refreshIcons();
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
            if (query) folderEl.classList.add("open");
        } else {
            folderEl.style.display = "none";
        }
    });
});

// Transform GitHub Markdown Admonitions / Callouts ([!NOTE], [!TIP], [!WARNING], [!IMPORTANT], [!CAUTION])
function transformAdmonitions(container) {
    const blockquotes = container.querySelectorAll("blockquote");
    const calloutIcons = {
        note: "info",
        tip: "lightbulb",
        warning: "alert-triangle",
        important: "bookmark",
        caution: "shield-alert",
        danger: "shield-alert"
    };

    blockquotes.forEach((bq) => {
        const text = bq.innerText.trim();
        const match = text.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|DANGER)\]/i);
        if (match) {
            const type = match[1].toLowerCase();
            const calloutDiv = document.createElement("div");
            calloutDiv.className = `callout callout-${type}`;

            let innerHtml = bq.innerHTML.replace(/\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|DANGER)\]/i, "").trim();
            innerHtml = innerHtml.replace(/^<p>\s*(<br>)?\s*/i, "<p>").trim();

            const iconName = calloutIcons[type] || "info";

            calloutDiv.innerHTML = `
                <div class="callout-icon"><i data-lucide="${iconName}" class="svg-icon"></i></div>
                <div class="callout-content">
                    <div class="callout-title">${type}</div>
                    ${innerHtml}
                </div>
            `;
            bq.parentNode.replaceChild(calloutDiv, bq);
        }
    });
}

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

    const encodedPath = encodeURI(doc.path);
    const targetRawPath = doc.originalPath || doc.path;
    const encodedRawPath = encodeURI(targetRawPath);

    // Topbar action links setup
    rawLink.style.display = "inline-flex";
    rawLink.target = "_blank";
    rawLink.href = `./${encodedRawPath}`;
    rawLink.title = `View raw file: ${targetRawPath}`;

    resolveWorkingUrl(targetRawPath).then(workingUrl => {
        rawLink.href = workingUrl;
    });

    githubEditLink.style.display = "inline-flex";
    githubEditLink.target = "_blank";
    githubEditLink.href = `https://github.com/${GITHUB_REPO}/blob/main/${encodedPath}`;

    if (shareDocBtn) shareDocBtn.style.display = "inline-flex";
    if (printDocBtn) printDocBtn.style.display = "inline-flex";

    // Show Reader Layout & Hide Empty State
    emptyState.style.display = "none";
    readerLayout.style.display = "flex";

    const isMd = doc.type === "md" || doc.path.endsWith(".md");

    if (isMd) {
        pdfViewer.style.display = "none";
        markdownWrapper.style.display = "block";
        tocSidebar.style.display = "block";

        markdownViewer.innerHTML = `<div style="color: var(--text-tertiary); padding: 24px;">Loading documentation...</div>`;

        try {
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
                    const res = await fetch(url, { cache: 'no-store' });
                    if (res.ok) {
                        rawText = await res.text();
                        fetchSuccess = true;
                        break;
                    }
                } catch (e) {}
            }

            if (!fetchSuccess) {
                throw new Error(`Document file not found at ${doc.path}`);
            }

            // Calculate Reading Stats
            const words = rawText.trim().split(/\s+/).length;
            const readTimeMin = Math.max(1, Math.ceil(words / 200));

            if (docMetaHeader) {
                docMetaHeader.style.display = "flex";
                metaCategory.innerHTML = `<i data-lucide="folder" class="svg-icon-sm"></i> ${folderName}`;
                metaReadTime.innerHTML = `<i data-lucide="clock" class="svg-icon-sm"></i> ${readTimeMin} min read`;
                metaWords.innerHTML = `<i data-lucide="file-text" class="svg-icon-sm"></i> ${words.toLocaleString()} words`;
            }

            // Render Markdown
            if (window.marked) {
                markdownViewer.innerHTML = marked.parse(rawText);
            } else {
                markdownViewer.textContent = rawText;
            }

            // Transform Callout Banners
            transformAdmonitions(markdownViewer);

            // Render Mermaid Diagrams
            if (window.mermaid) {
                const mermaidBlocks = markdownViewer.querySelectorAll("pre code.language-mermaid");
                for (let i = 0; i < mermaidBlocks.length; i++) {
                    const block = mermaidBlocks[i];
                    const pre = block.parentElement;
                    const code = block.innerText;
                    const container = document.createElement("div");
                    container.className = "mermaid-diagram-container";
                    const id = `mermaid-graph-${i}-${Date.now()}`;
                    try {
                        const { svg } = await mermaid.render(id, code);
                        container.innerHTML = svg;
                        pre.parentNode.replaceChild(container, pre);
                    } catch (err) {
                        console.warn("Mermaid render error:", err);
                    }
                }
            }

            // Syntax Highlighting & Code Copy Buttons
            markdownViewer.querySelectorAll("pre code").forEach((codeBlock) => {
                if (window.hljs && !codeBlock.classList.contains("language-mermaid")) {
                    hljs.highlightElement(codeBlock);
                }
            });

            markdownViewer.querySelectorAll("pre").forEach((preBlock) => {
                const codeBlock = preBlock.querySelector("code");
                if (!codeBlock || codeBlock.classList.contains("language-mermaid")) return;

                const wrapper = document.createElement("div");
                wrapper.className = "code-block-wrapper";

                const langClass = Array.from(codeBlock.classList).find(c => c.startsWith("language-"));
                const lang = langClass ? langClass.replace("language-", "").toUpperCase() : "CODE";

                const header = document.createElement("div");
                header.className = "code-block-header";
                header.innerHTML = `
                    <span>${lang}</span>
                    <button class="copy-code-btn" type="button"><i data-lucide="copy" class="svg-icon-sm"></i> Copy</button>
                `;

                const copyBtn = header.querySelector(".copy-code-btn");
                copyBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText(codeBlock.innerText);
                    copyBtn.innerHTML = `<i data-lucide="check" class="svg-icon-sm"></i> Copied!`;
                    copyBtn.classList.add("copied");
                    refreshIcons();
                    setTimeout(() => {
                        copyBtn.innerHTML = `<i data-lucide="copy" class="svg-icon-sm"></i> Copy`;
                        copyBtn.classList.remove("copied");
                        refreshIcons();
                    }, 2000);
                });

                preBlock.parentNode.insertBefore(wrapper, preBlock);
                wrapper.appendChild(header);
                wrapper.appendChild(preBlock);
            });

            // Heading Anchors & Deep Linking
            const headings = markdownViewer.querySelectorAll("h1, h2, h3");
            headings.forEach((heading, idx) => {
                const id = `heading-${idx}`;
                heading.id = id;

                const anchor = document.createElement("a");
                anchor.className = "heading-anchor";
                anchor.href = `#${id}`;
                anchor.innerHTML = "#";
                anchor.title = "Copy link to section";
                anchor.addEventListener("click", (e) => {
                    e.preventDefault();
                    const url = `${window.location.origin}${window.location.pathname}#${encodeURIComponent(doc.path)}::${id}`;
                    navigator.clipboard.writeText(url);
                    showToast("Section link copied to clipboard!", "check");
                    heading.scrollIntoView({ behavior: "smooth" });
                });
                heading.appendChild(anchor);
            });

            // Build Table of Contents
            buildTOC(headings);

            // Build Previous / Next Document Pagination Cards
            buildPagination(doc);

            // Reset Scroll
            markdownWrapper.scrollTo({ top: 0, behavior: "auto" });

            refreshIcons();

        } catch (error) {
            console.error("Error loading markdown:", error);
            markdownViewer.innerHTML = `
                <div style="color: var(--danger); padding: 24px; background: var(--danger-soft); border-radius: var(--radius-md);">
                    <h3>Failed to load document</h3>
                    <p style="font-size: 13.5px; margin-top: 8px;">${error.message}</p>
                </div>
            `;
            tocSidebar.style.display = "none";
            if (docMetaHeader) docMetaHeader.style.display = "none";
            if (docPagination) docPagination.style.display = "none";
        }
    } else {
        // PDF Document View
        markdownWrapper.style.display = "none";
        tocSidebar.style.display = "none";
        pdfViewer.style.display = "block";

        resolveWorkingUrl(targetRawPath).then(workingUrl => {
            pdfViewer.src = workingUrl;
            rawLink.href = workingUrl;
        });
    }

    refreshIcons();
}

// Table of Contents & ScrollSpy
let tocObserver = null;

function buildTOC(headings) {
    tocList.innerHTML = "";

    if (!headings || headings.length === 0) {
        tocSidebar.style.display = "none";
        return;
    }

    tocSidebar.style.display = "block";

    if (tocObserver) {
        tocObserver.disconnect();
    }

    const tocLinks = [];

    headings.forEach((heading) => {
        const level = parseInt(heading.tagName.replace("H", ""), 10);
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = `toc-link indent-${level}`;
        a.href = `#${heading.id}`;
        a.textContent = heading.innerText.replace("#", "").trim();

        a.addEventListener("click", (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: "smooth" });
        });

        li.appendChild(a);
        tocList.appendChild(li);
        tocLinks.push({ heading, link: a });
    });

    const handleScrollSpy = () => {
        const wrapperTop = markdownWrapper.getBoundingClientRect().top;
        let activeLink = null;

        for (let i = 0; i < tocLinks.length; i++) {
            const { heading, link } = tocLinks[i];
            const rect = heading.getBoundingClientRect();
            if (rect.top - wrapperTop <= 100) {
                activeLink = link;
            }
        }

        tocLinks.forEach(({ link }) => link.classList.remove("active"));
        if (activeLink) {
            activeLink.classList.add("active");
        } else if (tocLinks.length > 0) {
            tocLinks[0].link.classList.add("active");
        }
    };

    markdownWrapper.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
}

// Previous / Next Document Pagination Cards
function buildPagination(currentDocument) {
    if (!docPagination || allDocuments.length <= 1) {
        if (docPagination) docPagination.style.display = "none";
        return;
    }

    const currentIndex = allDocuments.findIndex(d => d.path === currentDocument.path);
    if (currentIndex === -1) {
        docPagination.style.display = "none";
        return;
    }

    const prevDoc = currentIndex > 0 ? allDocuments[currentIndex - 1] : null;
    const nextDoc = currentIndex < allDocuments.length - 1 ? allDocuments[currentIndex + 1] : null;

    let html = "";
    if (prevDoc) {
        html += `
            <a href="#${encodeURIComponent(prevDoc.path)}" class="pagination-card prev" id="prevDocLink">
                <span class="pagination-label"><i data-lucide="arrow-left" class="svg-icon-sm"></i> Previous</span>
                <span class="pagination-title">${prevDoc.name}</span>
            </a>
        `;
    } else {
        html += `<div></div>`;
    }

    if (nextDoc) {
        html += `
            <a href="#${encodeURIComponent(nextDoc.path)}" class="pagination-card next" id="nextDocLink">
                <span class="pagination-label">Next <i data-lucide="arrow-right" class="svg-icon-sm"></i></span>
                <span class="pagination-title">${nextDoc.name}</span>
            </a>
        `;
    }

    docPagination.innerHTML = html;
    docPagination.style.display = "grid";

    const prevLink = document.getElementById("prevDocLink");
    const nextLink = document.getElementById("nextDocLink");

    if (prevLink && prevDoc) {
        prevLink.addEventListener("click", (e) => {
            e.preventDefault();
            selectDocument(prevDoc);
        });
    }

    if (nextLink && nextDoc) {
        nextLink.addEventListener("click", (e) => {
            e.preventDefault();
            selectDocument(nextDoc);
        });
    }

    refreshIcons();
}

// Share & Print Actions
if (shareDocBtn) {
    shareDocBtn.addEventListener("click", () => {
        if (!currentDoc) return;
        const shareUrl = `${window.location.origin}${window.location.pathname}#${encodeURIComponent(currentDoc.path)}`;
        navigator.clipboard.writeText(shareUrl);
        showToast("Document link copied to clipboard!", "link-2");
    });
}

if (printDocBtn) {
    printDocBtn.addEventListener("click", () => {
        window.print();
    });
}

// ==========================================================================
// SPOTLIGHT SEARCH (Ctrl + K)
// ==========================================================================
function openSpotlight() {
    if (!spotlightModal) return;
    spotlightModal.classList.add("open");
    spotlightInput.value = "";
    spotlightSelectedIndex = 0;
    renderSpotlightResults("");
    setTimeout(() => spotlightInput.focus(), 50);
}

function closeSpotlight() {
    if (!spotlightModal) return;
    spotlightModal.classList.remove("open");
}

function renderSpotlightResults(query) {
    spotlightResults.innerHTML = "";
    const cleanQuery = query.toLowerCase().trim();

    if (!cleanQuery) {
        spotlightMatches = allDocuments.slice(0, 8);
    } else {
        spotlightMatches = allDocuments.filter(d => 
            d.name.toLowerCase().includes(cleanQuery) || 
            (d.folder && d.folder.toLowerCase().includes(cleanQuery)) ||
            d.path.toLowerCase().includes(cleanQuery)
        );
    }

    if (spotlightMatches.length === 0) {
        spotlightResults.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--text-tertiary); font-size: 13px;">
                No matching documents found for "<strong>${query}</strong>"
            </div>
        `;
        return;
    }

    spotlightMatches.forEach((doc, idx) => {
        const item = document.createElement("div");
        item.className = `spotlight-item ${idx === spotlightSelectedIndex ? "selected" : ""}`;
        item.dataset.index = idx;

        const isMd = doc.type === "md" || doc.path.endsWith(".md");
        const badgeText = isMd ? "MD" : "PDF";
        const badgeClass = isMd ? "md" : "pdf";

        item.innerHTML = `
            <div class="spotlight-item-left">
                <span class="doc-badge ${badgeClass}">${badgeText}</span>
                <div>
                    <div class="spotlight-item-title">${doc.name}</div>
                    <div class="spotlight-item-folder">${doc.folder || "General"} · ${doc.path}</div>
                </div>
            </div>
            <span style="font-size: 12px; color: var(--text-tertiary);"><i data-lucide="corner-down-left" class="svg-icon-sm"></i></span>
        `;

        item.addEventListener("click", () => {
            selectDocument(doc);
            closeSpotlight();
        });

        spotlightResults.appendChild(item);
    });

    refreshIcons();
}

function updateSpotlightSelection() {
    const items = spotlightResults.querySelectorAll(".spotlight-item");
    items.forEach((item, idx) => {
        if (idx === spotlightSelectedIndex) {
            item.classList.add("selected");
            item.scrollIntoView({ block: "nearest" });
        } else {
            item.classList.remove("selected");
        }
    });
}

// Global Keyboard Shortcut Listener
window.addEventListener("keydown", (e) => {
    // Open Spotlight: Ctrl + K or Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (spotlightModal && spotlightModal.classList.contains("open")) {
            closeSpotlight();
        } else {
            openSpotlight();
        }
    }

    // Modal Navigation Keys
    if (spotlightModal && spotlightModal.classList.contains("open")) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeSpotlight();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (spotlightMatches.length > 0) {
                spotlightSelectedIndex = (spotlightSelectedIndex + 1) % spotlightMatches.length;
                updateSpotlightSelection();
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (spotlightMatches.length > 0) {
                spotlightSelectedIndex = (spotlightSelectedIndex - 1 + spotlightMatches.length) % spotlightMatches.length;
                updateSpotlightSelection();
            }
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (spotlightMatches[spotlightSelectedIndex]) {
                selectDocument(spotlightMatches[spotlightSelectedIndex]);
                closeSpotlight();
            }
        }
    }
});

if (spotlightInput) {
    spotlightInput.addEventListener("input", (e) => {
        spotlightSelectedIndex = 0;
        renderSpotlightResults(e.target.value);
    });
}

if (spotlightModal) {
    spotlightModal.addEventListener("click", (e) => {
        if (e.target === spotlightModal) closeSpotlight();
    });
}

if (spotlightTriggerBtn) spotlightTriggerBtn.addEventListener("click", openSpotlight);
if (searchShortcutPill) searchShortcutPill.addEventListener("click", openSpotlight);

// Initialize Application
initTheme();
loadDocuments();