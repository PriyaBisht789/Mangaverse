// ======================================================
// POPUP EXTRA CSS
// ======================================================

const style = document.createElement("style");

style.textContent = `

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.popup-layout {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.popup-container {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);
    gap: 30px;
    align-items: start;
}

.popup-info {
    flex: 1;
    min-width: 0;
}

.popup-info p {
    display: flex;
    margin: 12px 0;
}

.label {
    width: 110px;
    flex-shrink: 0;
    font-weight: 600;
    letter-spacing: .3px;
    color: #b9b3e6;
}

.label::after {
    content: ":";
    margin-left: 5px;
    color: #7a72b8;
}

.value {
    color: white;
}

.manga-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 46px;
    font-weight: 400;
    letter-spacing: .5px;
    margin-top: 10px;
    margin-bottom: 22px;
    color: white;
    line-height: 1.05;
    display: inline-block;
}

.manga-title::after {
    content: "";
    display: block;
    width: 72px;
    height: 5px;
    margin-top: 12px;
    border-radius: 3px;
    background: linear-gradient(90deg, #FFD54F, #b48cff);
}

.popup-info p {
    margin: 12px 0;
    font-size: 20px;
}

.popup-cover-section {
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 18px;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px;
}

.popup-cover {
    width: 100%;
    height: auto;
    border-radius: 18px;
    object-fit: cover;
    box-shadow:
        0 0 0 3px rgba(255,213,79,.12),
        0 0 45px rgba(180,140,255,.25),
        0 12px 30px rgba(0,0,0,.45);
}

.rating {
    margin-top: 20px;
    font-size: 22px;
    font-weight: bold;
    color: #1b1533;
    background: linear-gradient(90deg, #FFD54F, #ffe9a8);
    padding: 8px 20px;
    border-radius: 999px;
    box-shadow: 0 4px 14px rgba(255,213,79,.35);
}

.popup-content {
    width: 92vw;
    max-width: 1000px;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 25px;
    box-sizing: border-box;
}

.notes {
    margin-top: 20px;
    width: 100%;
    font-size: 17px;
    font-style: italic;
    color: #e9e6ff;
    line-height: 1.5;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,.1);
}

.synopsis {
    padding-top: 30px;
    padding-bottom: 20px;
}

.synopsis h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 25px;
    font-weight: 400;
    letter-spacing: 1.8px;
    color: #FFD54F;
    margin: 0 0 10px 0;
    padding-left: 14px;
    border-left: 2px solid #b48cff;
    border-radius: 10px;
    text-transform: uppercase;
}

.close-btn {
    transition: 0.15s;
}

.close-btn:hover {
    transform: none;
    color: white;
    opacity: .8;
}


/* Loading message */

.loading-message {
    text-align: center;
    padding: 50px 20px;
    font-size: 22px;
    color: #e9e6ff;
}


/* Error message */

.error-message {
    text-align: center;
    padding: 40px 20px;
}

.error-message h2 {
    color: #FFD54F;
    margin-bottom: 15px;
}

.error-message p {
    color: #ddd;
    line-height: 1.6;
}


/* API source */

.api-source {
    margin-top: 15px;
    font-size: 13px;
    color: #aaa;
    text-align: center;
}


@media (max-width: 700px) {

    .popup-container {
        grid-template-columns: 1fr;
    }

    .popup-cover-section {
        max-width: 260px;
        margin: auto;
    }

    .manga-title {
        font-size: 38px;
    }

    .popup-info p {
        font-size: 17px;
    }

    .label {
        width: 90px;
    }
}

`;

document.head.appendChild(style);


// ======================================================
// TITLE CORRECTIONS
// ======================================================

// Your card title does not always have to be exactly
// the same as the title used by AniList/Jikan.

const titleMap = {

    "Ace of Diamond": "Diamond no Ace",

    "Welcome to the Ballroom": "Ballroom e Youkoso",

    "Run With the Wind": "Kaze ga Tsuyoku Fuiteiru",

    "Days": "Days",

    "Ao Ashi": "Ao Ashi",

    "Blue Lock": "Blue Lock",

    "Slam Dunk": "Slam Dunk",

    "Hajime no Ippo": "Hajime no Ippo",

    "Baby Steps": "Baby Steps",

    "Giant Killing": "Giant Killing",

    "Captain Tsubasa": "Captain Tsubasa",

    "Tsurune": "Tsurune",

    "Medalist": "Medalist",

    "Hanebado!": "Hanebado!",

    "MF Ghost": "MF Ghost",

    "Initial D": "Initial D",

    "Whistle!": "Whistle!"

};


// ======================================================
// OPEN POPUP
// ======================================================

function openPopup(
    title,
    image,
    rating,
    author,
    chapters,
    volumes,
    status,
    synopsis,
    note,
    source
) {

    const popupBody = document.getElementById("popupBody");

    if (!popupBody) {
        console.error("popupBody not found.");
        return;
    }


    // If no image is available
    const imageHTML = image
        ? `
            <img
                src="${image}"
                class="popup-cover"
                alt="${title}"
            >
        `
        : `
            <div style="
                width:100%;
                height:350px;
                display:flex;
                justify-content:center;
                align-items:center;
                background:#181532;
                border-radius:18px;
                color:#aaa;
                text-align:center;
            ">
                Cover not available
            </div>
        `;


    popupBody.innerHTML = `

        <div class="popup-layout">

            <div class="popup-container">


                <!-- LEFT SIDE INFORMATION -->

                <div class="popup-info">

                    <h1 class="manga-title">
                        ${title}
                    </h1>


                    <p>
                        <span class="label">Author</span>
                        <span class="value">${author}</span>
                    </p>


                    <p>
                        <span class="label">Chapters</span>
                        <span class="value">${chapters}</span>
                    </p>


                    <p>
                        <span class="label">Volumes</span>
                        <span class="value">${volumes}</span>
                    </p>


                    <p>
                        <span class="label">Status</span>
                        <span class="value">${status}</span>
                    </p>


                    <div class="synopsis">

                        <h3>Synopsis</h3>

                        <p>
                            ${synopsis}
                        </p>

                    </div>


                </div>


                <!-- RIGHT SIDE COVER -->

                <div class="popup-cover-section">

                    ${imageHTML}


                    <div class="rating">
                        ⭐ ${rating}/100
                    </div>


                    ${
                        note
                            ? `<div class="notes">${note}</div>`
                            : ""
                    }


                    ${
                        source
                            ? `<div class="api-source">
                                Information from ${source}
                               </div>`
                            : ""
                    }

                </div>


            </div>

        </div>

    `;


    const popup = document.getElementById("popup");

    if (popup) {
        popup.style.display = "flex";
    }
}


// ======================================================
// CLOSE POPUP
// ======================================================

function closePopup() {

    const popup = document.getElementById("popup");

    if (popup) {
        popup.style.display = "none";
    }
}


// ======================================================
// CLICK OUTSIDE POPUP TO CLOSE
// ======================================================

const popup = document.getElementById("popup");

if (popup) {

    popup.addEventListener("click", function(event) {

        if (event.target === popup) {
            closePopup();
        }

    });

}


// ======================================================
// SHOW LOADING MESSAGE
// ======================================================

function showLoading() {

    const popupBody = document.getElementById("popupBody");

    if (!popupBody) {
        return;
    }


    popupBody.innerHTML = `

        <div class="loading-message">

            <div style="font-size:40px;">
                📚
            </div>

            <br>

            Loading manga information...

        </div>

    `;


    document.getElementById("popup").style.display = "flex";
}


// ======================================================
// SHOW ERROR
// ======================================================

function showError(title) {

    const popupBody = document.getElementById("popupBody");

    if (!popupBody) {
        return;
    }


    popupBody.innerHTML = `

        <div class="error-message">

            <div style="font-size:50px;">
                📚
            </div>

            <h2>
                Information Not Found
            </h2>

            <p>
                Sorry, we could not find information
                for <strong>${title}</strong>.
            </p>

            <br>

            <p>
                Please try again later or add this
                manga to your custom manga data.
            </p>

        </div>

    `;


    document.getElementById("popup").style.display = "flex";
}


// ======================================================
// GET ALL CARDS
// ======================================================

const cards = document.querySelectorAll(".card");


cards.forEach(card => {

    card.addEventListener("click", function() {


        const titleElement = card.querySelector("h3");


        if (!titleElement) {

            console.error(
                "This card does not contain an h3 title."
            );

            return;
        }


        const title =
            titleElement.textContent.trim();


        const searchTitle =
            titleMap[title] || title;


        console.log(
            "Card clicked:",
            title
        );


        showLoading();


        getManga(
            searchTitle,
            title
        );

    });

});


// ======================================================
// MAIN FUNCTION
// ======================================================

async function getManga(
    searchTitle,
    displayTitle
) {

    console.log(
        "Searching AniList for:",
        searchTitle
    );


    // --------------------------------------------------
    // FIRST: TRY ANILIST
    // --------------------------------------------------

    try {

        const aniManga =
            await getFromAniList(searchTitle);


        if (aniManga) {

            console.log(
                "Found on AniList:",
                aniManga
            );


            openPopup(
                aniManga.title,
                aniManga.image,
                aniManga.rating,
                aniManga.author,
                aniManga.chapters,
                aniManga.volumes,
                aniManga.status,
                aniManga.synopsis,
                aniManga.note,
                "AniList"
            );


            return;
        }


    } catch (error) {

        console.error(
            "AniList error:",
            error
        );

    }


    // --------------------------------------------------
    // SECOND: TRY JIKAN
    // --------------------------------------------------

    console.log(
        "AniList failed. Trying Jikan..."
    );


    try {

        const jikanManga =
            await getFromJikan(searchTitle);


        if (jikanManga) {

            console.log(
                "Found on Jikan:",
                jikanManga
            );


            openPopup(
                jikanManga.title,
                jikanManga.image,
                jikanManga.rating,
                jikanManga.author,
                jikanManga.chapters,
                jikanManga.volumes,
                jikanManga.status,
                jikanManga.synopsis,
                jikanManga.note,
                "Jikan"
            );


            return;
        }


    } catch (error) {

        console.error(
            "Jikan error:",
            error
        );

    }


    // --------------------------------------------------
    // BOTH FAILED
    // --------------------------------------------------

    showError(
        displayTitle || searchTitle
    );

}


// ======================================================
// ANILIST API
// ======================================================

async function getFromAniList(title) {


    const query = `

        query ($search: String) {

            Media(
                search: $search,
                type: MANGA
            ) {

                title {
                    romaji
                    english
                    native
                }

                description

                averageScore

                chapters

                volumes

                status

                coverImage {
                    large
                }

                staff {

                    edges {

                        node {

                            name {
                                full
                            }

                        }

                    }

                }

            }

        }

    `;


    const response = await fetch(
        "https://graphql.anilist.co",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                query: query,

                variables: {
                    search: title
                }

            })

        }
    );


    if (!response.ok) {

        throw new Error(
            "AniList HTTP error: " +
            response.status
        );

    }


    const data =
        await response.json();


    if (
        !data.data ||
        !data.data.Media
    ) {

        return null;

    }


    const manga =
        data.data.Media;


    // --------------------------------------------------
    // TITLE
    // --------------------------------------------------

    const mangaTitle =
        manga.title?.romaji ||
        manga.title?.english ||
        manga.title?.native ||
        title;


    // --------------------------------------------------
    // DESCRIPTION
    // --------------------------------------------------

    let description =
        manga.description ||
        "No synopsis available.";


    description = cleanDescription(
        description
    );


    // --------------------------------------------------
    // AUTHOR
    // --------------------------------------------------

    let author = "Unknown";


    if (
        manga.staff?.edges &&
        manga.staff.edges.length > 0
    ) {

        author =
            manga.staff.edges[0]
                ?.node
                ?.name
                ?.full ||
            "Unknown";

    }


    // --------------------------------------------------
    // RETURN STANDARD FORMAT
    // --------------------------------------------------

    return {

        title: mangaTitle,

        image:
            manga.coverImage?.large ||
            "",

        rating:
            manga.averageScore ??
            "N/A",

        author: author,

        chapters:
            manga.chapters ??
            "Unknown",

        volumes:
            manga.volumes ??
            "Unknown",

        status:
            manga.status ??
            "Unknown",

        synopsis:
            description,

        note: ""

    };

}


// ======================================================
// JIKAN API
// ======================================================

async function getFromJikan(title) {


    // Encode title so spaces and special
    // characters work correctly.

    const encodedTitle =
        encodeURIComponent(title);


    const url =
        `https://api.jikan.moe/v4/manga?q=${encodedTitle}&limit=5`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            "Jikan HTTP error: " +
            response.status
        );

    }


    const data =
        await response.json();


    if (
        !data.data ||
        data.data.length === 0
    ) {

        return null;

    }


    // --------------------------------------------------
    // PICK BEST RESULT
    // --------------------------------------------------

    const manga =
        findBestJikanMatch(
            data.data,
            title
        );


    if (!manga) {

        return null;

    }


    // --------------------------------------------------
    // AUTHOR
    // --------------------------------------------------

    let author = "Unknown";


    if (
        manga.authors &&
        manga.authors.length > 0
    ) {

        author =
            manga.authors
                .map(author => author.name)
                .join(", ");

    }


    // --------------------------------------------------
    // DESCRIPTION
    // --------------------------------------------------

    const description =
        cleanDescription(
            manga.synopsis ||
            "No synopsis available."
        );


    // --------------------------------------------------
    // RATING
    // --------------------------------------------------

    let rating =
        manga.score;


    if (
        rating === null ||
        rating === undefined
    ) {

        rating = "N/A";

    } else {

        // Jikan score is out of 10.
        // Convert to 100.

        rating =
            Math.round(
                rating * 10
            );

    }


    // --------------------------------------------------
    // RETURN STANDARD FORMAT
    // --------------------------------------------------

    return {

        title:
            manga.title ||
            title,

        image:
            manga.images?.jpg?.large_image_url ||
            manga.images?.jpg?.image_url ||
            "",

        rating:
            rating,

        author:
            author,

        chapters:
            manga.chapters ??
            "Unknown",

        volumes:
            manga.volumes ??
            "Unknown",

        status:
            manga.status ??
            "Unknown",

        synopsis:
            description,

        note: ""

    };

}


// ======================================================
// FIND BEST JIKAN RESULT
// ======================================================

function findBestJikanMatch(
    results,
    searchTitle
) {


    const search =
        searchTitle
            .toLowerCase()
            .trim();


    // First look for exact title

    let exact =
        results.find(
            manga =>
                manga.title &&
                manga.title
                    .toLowerCase()
                    .trim() === search
        );


    if (exact) {
        return exact;
    }


    // Try English title

    exact =
        results.find(
            manga =>
                manga.title_english &&
                manga.title_english
                    .toLowerCase()
                    .trim() === search
        );


    if (exact) {
        return exact;
    }


    // Otherwise use first result

    return results[0] || null;

}


// ======================================================
// CLEAN DESCRIPTION
// ======================================================

function cleanDescription(
    description
) {

    if (!description) {

        return "No synopsis available.";

    }


    return description

        // Remove HTML tags

        .replace(
            /<[^>]*>/g,
            ""
        )

        // Replace multiple spaces

        .replace(
            /\s+/g,
            " "
        )

        // Remove leading/trailing spaces

        .trim();

}
