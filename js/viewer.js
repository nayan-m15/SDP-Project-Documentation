const documentsContainer =
    document.getElementById("documents");

const pdfViewer =
    document.getElementById("pdfViewer");

const emptyState =
    document.getElementById("emptyState");

const viewerTitle =
    document.getElementById("viewerTitle");

const viewerSubtitle =
    document.getElementById("viewerSubtitle");

const PAGES_BASE =
    "https://nayan-m15.github.io/SDP-Project-Documentation";


async function loadDocuments() {

    try {

        
        let response =
            await fetch(
                `${PAGES_BASE}/pdfs/manifest.json`
            );


        if (!response.ok) {

            response =
                await fetch(
                    "./pdfs/manifest.json"
                );
        }


        if (!response.ok) {
            throw new Error(
                "Failed to load manifest"
            );
        }

        const documents =
            await response.json();

        documentsContainer.innerHTML = "";


        documents.forEach((pdf) => {

            const button =
                document.createElement("button");

            button.className =
                "document-button";


            button.innerHTML = `
                <span class="document-icon">
                    PDF
                </span>

                <span class="document-name">
                    ${pdf.name}
                </span>
            `;


            button.addEventListener(
                "click",
                () => {

                    selectDocument(
                        pdf,
                        button
                    );

                }
            );


            documentsContainer.appendChild(
                button
            );

        });


    } catch (error) {

        console.error(error);

        documentsContainer.innerHTML = `
            <div style="
                padding: 10px;
                color: #b42318;
                font-size: 12px;
            ">
                Unable to load documents.
            </div>
        `;

    }

}


/* Select and display a PDF.*/
function selectDocument(pdf, button) {

    /* Remove active state from all document buttons. */
    document
        .querySelectorAll(".document-button")
        .forEach((item) => {

            item.classList.remove("active");

        });


    /*Mark selected document as active. */
    button.classList.add("active");


    /*Update viewer information.*/
    viewerTitle.textContent =
        pdf.name;

    viewerSubtitle.textContent =
        "Document preview";


    /* Hide empty state. */
    emptyState.style.display =
        "none";


    /* Show PDF viewer. */
    pdfViewer.style.display =
        "block";


    
    const remoteSrc =
        `${PAGES_BASE}/${pdf.path}`;

    const localSrc =
        `./${pdf.path}`;

    let usedFallback = false;


    pdfViewer.onerror = () => {

        if (!usedFallback) {

            usedFallback = true;
            pdfViewer.src = localSrc;
        }

    };


    pdfViewer.src = remoteSrc;
}


/*Load documents when page starts. */
loadDocuments();