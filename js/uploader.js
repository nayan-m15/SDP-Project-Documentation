const ownerInput =
    document.getElementById("owner");

const repoInput =
    document.getElementById("repo");

const tokenInput =
    document.getElementById("token");

const fileInput =
    document.getElementById("pdfFile");

const uploadButton =
    document.getElementById("uploadButton");

const uploadStatus =
    document.getElementById("uploadStatus");


/*Set Max size of PDF to 25 MB. */
 
const MAX_FILE_SIZE =
    25 * 1024 * 1024;


/*
 * Display a status message.
 */
function showStatus(message, type) {

    uploadStatus.hidden = false;

    uploadStatus.textContent = message;

    uploadStatus.className =
        `upload-status ${type}`;
}


/*
 * Validate the form.
 */
function validateForm() {

    const owner =
        ownerInput.value.trim();

    const repo =
        repoInput.value.trim();

    const token =
        tokenInput.value.trim();

    const file =
        fileInput.files[0];


    if (!owner) {

        showStatus(
            "Please enter the GitHub username or organisation.",
            "error"
        );

        return false;
    }


    if (!repo) {

        showStatus(
            "Please enter the repository name.",
            "error"
        );

        return false;
    }


    if (!token) {

        showStatus(
            "Please enter your GitHub token.",
            "error"
        );

        return false;
    }


    if (!file) {

        showStatus(
            "Please select a PDF.",
            "error"
        );

        return false;
    }


    if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    ) {

        showStatus(
            "Only PDF files are allowed.",
            "error"
        );

        return false;
    }


    if (file.size > MAX_FILE_SIZE) {

        showStatus(
            "The PDF is too large. Maximum size is 25 MB.",
            "error"
        );

        return false;
    }

    return true;
}

/* Convert a File into a Base64 string. */
function fileToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader =
            new FileReader();


        reader.onload = () => {

            const result =
                reader.result;

            const base64 =
                result.split(",")[1];

            resolve(base64);
        };

        reader.onerror = () => {

            reject(
                new Error(
                    "Failed to read the PDF."
                )
            );

        };
        reader.readAsDataURL(file);

    });
}

async function uploadPDF(
    token,
    owner,
    repo,
    file
) {

    const base64 =
        await fileToBase64(file);


    const path =
        `pdfs/${file.name}`;


    const apiUrl =
        `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;


    const response =
        await fetch(apiUrl, {

            method: "PUT",

            headers: {

                "Authorization":
                    `Bearer ${token}`,

                "Accept":
                    "application/vnd.github+json",

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                message:
                    `Add document: ${file.name}`,

                content:
                    base64

            })

        });

    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "GitHub rejected the upload."
        );

    }
    return result;
}

uploadButton.addEventListener(
    "click",
    async () => {

        uploadStatus.hidden = true;


        /* Validate everything first. */
        if (!validateForm()) {
            return;
        }


        const owner =
            ownerInput.value.trim();

        const repo =
            repoInput.value.trim();

        const token =
            tokenInput.value.trim();

        const file =
            fileInput.files[0];


        /* Disable the button while the upload is happening.*/
        uploadButton.disabled = true;

        uploadButton.textContent =
            "Uploading...";


        try {

            showStatus(
                "Uploading PDF to GitHub...",
                "info"
            );


            await uploadPDF(
                token,
                owner,
                repo,
                file
            );


            showStatus(
                "PDF uploaded successfully. The documentation site will update shortly.",
                "success"
            );


            /* Clear the file input. */
            fileInput.value = "";


        } catch (error) {

            console.error(error);

            showStatus(
                error.message ||
                "Something went wrong during the upload.",
                "error"
            );


        } finally {

            uploadButton.disabled = false;

            uploadButton.textContent =
                "Upload PDF";

        }

    }
);