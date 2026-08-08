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


const MAX_FILE_SIZE =
    25 * 1024 * 1024;


/* Display a status message. */
function showStatus(message, type) {

    uploadStatus.hidden = false;

    uploadStatus.textContent = message;

    uploadStatus.className =
        `upload-status ${type}`;
}


/*Validate the form.*/
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


/*Convert a File to Base64. */
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


/* Build a GitHub Contents API URL.*/
function getContentsUrl(
    owner,
    repo,
    path
) {

    return (
        `https://api.github.com/repos/` +
        `${owner}/${repo}/contents/` +
        `${path}`
    );
}


/* Upload the PDF to GitHub.*/
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
        getContentsUrl(
            owner,
            repo,
            encodeURIComponent(path)
        );


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
            "GitHub rejected the PDF upload."
        );

    }


    return result;
}


/*Get the existing manifest. */
async function getManifest(
    token,
    owner,
    repo
) {

    const path =
        "pdfs/manifest.json";


    const apiUrl =
        getContentsUrl(
            owner,
            repo,
            path
        );


    const response =
        await fetch(apiUrl, {

            headers: {

                "Authorization":
                    `Bearer ${token}`,

                "Accept":
                    "application/vnd.github+json"

            }

        });


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Unable to retrieve manifest."
        );

    }


    /*GitHub returns the file contents Base64 encoded. */
    const decoded =
        atob(
            result.content.replace(/\n/g, "")
        );


    const manifest =
        JSON.parse(decoded);


    return {
        manifest,
        sha: result.sha
    };
}


/*Update manifest.json. */
async function updateManifest(
    token,
    owner,
    repo,
    file
) {

    const {
        manifest,
        sha
    } = await getManifest(
        token,
        owner,
        repo
    );


    const path =
        `pdfs/${file.name}`;


    /*Check whether this file already exists.*/
    const existingIndex =
        manifest.findIndex(
            (item) =>
                item.path === path
        );


    if (existingIndex !== -1) {

        throw new Error(
            `A document named "${file.name}" already exists.`
        );

    }


    /*Add the new document. */
    manifest.push({

        name:
            file.name,

        path:
            path,

        size:
            file.size,

        date:
            new Date().toISOString()

    });


    /*Convert the updated manifest back into Base64. */
    const content =
        btoa(
            JSON.stringify(
                manifest,
                null,
                2
            )
        );


    const apiUrl =
        getContentsUrl(
            owner,
            repo,
            "pdfs/manifest.json"
        );


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
                    `Update manifest for ${file.name}`,

                content:
                    content,

                sha:
                    sha

            })

        });


    const result =
        await response.json();


    if (!response.ok) {

        throw new Error(
            result.message ||
            "Unable to update manifest."
        );

    }


    return result;
}


/*Handle the Upload button. */
uploadButton.addEventListener(
    "click",
    async () => {

        uploadStatus.hidden = true;


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
                "PDF uploaded. Updating document list...",
                "info"
            );


            await updateManifest(
                token,
                owner,
                repo,
                file
            );

            showStatus(
                "Upload complete. GitHub Pages will publish the document shortly.",
                "success"
            );


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