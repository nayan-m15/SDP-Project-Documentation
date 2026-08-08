const documentsContainer = document.getElementById("documents");
const pdfViewer = document.getElementById("pdfViewer");

async function loadDocuments() {
    try {
        const response = await fetch("./pdfs/manifest.json");

        if (!response.ok) {
            throw new Error("Failed to load manifest");
        }

        const documents = await response.json();

        documentsContainer.innerHTML = "";

        documents.forEach((pdf) => {
            const button = document.createElement("button");

            button.textContent = pdf.name;

            button.addEventListener("click", () => {
                pdfViewer.src = `./${pdf.path}`;
            });

            documentsContainer.appendChild(button);
            documentsContainer.appendChild(
                document.createElement("br")
            );
        });

    } catch (error) {
        console.error(error);

        documentsContainer.textContent =
            "Unable to load documents.";
    }
}

loadDocuments();