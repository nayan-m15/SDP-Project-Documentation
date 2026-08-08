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

async function verifyGitHubAccess(
    token,
    owner,
    repo
) {

    const apiUrl =
        `https://api.github.com/repos/${owner}/${repo}`;


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

        if (response.status === 401) {

            throw new Error(
                "Invalid or expired GitHub token."
            );
        }

        if (response.status === 403) {

            throw new Error(
                "GitHub denied access. Check your token permissions."
            );
        }

        if (response.status === 404) {

            throw new Error(
                "Repository not found. Check the GitHub username and repository name."
            );
        }

        throw new Error(
            result.message ||
            "Unable to access the GitHub repository."
        );
    }
    return result;
}

function documentExists(
    manifest,
    file
) {

    const path =
        `pdfs/${file.name}`;


    return manifest.some(
        (item) =>
            item.path === path
    );
}

/*Get the existing manifest. */
async function getManifest(
    token,
    owner,
    repo
) {

    const apiUrl =
        getContentsUrl(
            owner,
            repo,
            "pdfs/manifest.json"
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

        if (response.status === 401) {

            throw new Error(
                "Invalid or expired GitHub token."
            );
        }

        if (response.status === 403) {

            throw new Error(
                "GitHub denied access to the repository."
            );
        }

        if (response.status === 404) {

            throw new Error(
                "manifest.json was not found. Make sure the pdfs folder and manifest.json exist."
            );
        }

        throw new Error(
            result.message ||
            "Unable to retrieve manifest.json."
        );
    }


    try {

        const decoded =
            atob(
                result.content.replace(/\n/g, "")
            );


        const manifest =
            JSON.parse(decoded);


        if (!Array.isArray(manifest)) {

            throw new Error(
                "Manifest must contain an array."
            );
        }


        return {
            manifest,
            sha: result.sha
        };

    } catch (error) {

        throw new Error(
            "manifest.json contains invalid JSON."
        );

    }
}


/*Update manifest.json. */
async function updateManifest(
    token,
    owner,
    repo,
    file,
    manifest,
    sha
) {

    const path =
        `pdfs/${file.name}`;


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

        if (response.status === 409) {

            throw new Error(
                "The document list changed while uploading. Please try again."
            );
        }


        if (response.status === 401) {

            throw new Error(
                "Your GitHub token is invalid or expired."
            );
        }


        if (response.status === 403) {

            throw new Error(
                "Your GitHub token does not have permission to modify the manifest."
            );
        }


        throw new Error(
            result.message ||
            "Failed to update manifest.json."
        );
    }


    return result;
}


/*Handle the Upload button. */
uploadButton.addEventListener(
    "click",
    async () => {

        uploadStatus.hidden = true;


        /*
         * Validate local inputs first.
         */
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
            "Checking...";


        try {


            showStatus(
                "Checking GitHub access...",
                "info"
            );


            await verifyGitHubAccess(
                token,
                owner,
                repo
            );

            showStatus(
                "Checking existing documents...",
                "info"
            );


            const {
                manifest,
                sha
            } = await getManifest(
                token,
                owner,
                repo
            );


            if (
                documentExists(
                    manifest,
                    file
                )
            ) {

                throw new Error(
                    `A document named "${file.name}" already exists. Rename the PDF and try again.`
                );
            }

            uploadButton.textContent =
                "Uploading...";


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

            uploadButton.textContent =
                "Publishing...";


            showStatus(
                "PDF uploaded. Updating document list...",
                "info"
            );


            await updateManifest(
                token,
                owner,
                repo,
                file,
                manifest,
                sha
            );

            showStatus(
                "Upload complete. GitHub Pages is now publishing the document. This usually takes about a minute.",
                "success"
            );


            fileInput.value = "";


        } catch (error) {

            console.error(
                "Upload error:",
                error
            );


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