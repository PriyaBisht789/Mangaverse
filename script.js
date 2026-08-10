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

.left {
    width: 260px;
    text-align: center;
}

.popup-cover {
    width: 100%;
    height: auto;
    margin-top: 0;
    border-radius: 18px;
    object-fit: cover;
    box-shadow:
        0 0 0 3px rgba(255,213,79,.12),
        0 0 45px rgba(180,140,255,.25),
        0 12px 30px rgba(0,0,0,.45);
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
    overflow-x: hidden;
    padding: 25px;
    box-sizing: border-box;
}

.right {
    flex: 1;
}

.info-box {
    background: #26234d;
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 20px;
    margin-right: 20px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,.08);
}

.info-row:last-child {
    border: none;
}

.popup-info > p {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,.07);
}

.popup-info > p:last-of-type {
    border-bottom: none;
    padding-bottom: 0;
}

.close-btn {
    transition: 0.15s;
}

.close-btn:hover {
    transform: none;
    color: white;
    opacity: .8;
}

.notes {
    margin-top: 20px;
    width: 100%;
    font-size: 17px;
    font-style: italic;
    color: #e9e6ff;
    opacity: 1;
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
}

`;

document.head.appendChild(style);


// ----------------------------------------
// REMOVE UNWANTED NOTE
// ----------------------------------------

function removeStrayNote() {

    document.querySelectorAll("body *").forEach(el => {

        if (
            el.children.length === 0 &&
            el.textContent.includes(
                "Winner of the 45th Kodansha Manga Award"
            )
        ) {
            el.remove();
        }

    });
}

removeStrayNote();


// ----------------------------------------
// OPEN POPUP
// ----------------------------------------

function openPopup(
    title,
    image,
    rating,
    author,
    chapters,
    volumes,
    status,
    synopsis,
    note
) {

    const popupBody = document.getElementById("popupBody");

    if (!popupBody) {
        console.error("popupBody was not found.");
        return;
    }


    popupBody.innerHTML = `

        <div class="popup-layout">

            <div class="popup-container">

                <!-- Manga Information -->

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


                <!-- Manga Cover -->

                <div class="popup-cover-section">

                    <img
                        src="${image}"
                        class="popup-cover"
                        alt="${title}"
                    >


                    <div class="rating">

                        ⭐ ${rating}/100

                    </div>


                    ${
                        note
                            ? `<div class="notes">${note}</div>`
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


// ----------------------------------------
// CLOSE POPUP
// ----------------------------------------

function closePopup() {

    const popup = document.getElementById("popup");

    if (popup) {
        popup.style.display = "none";
    }
}


// ----------------------------------------
// CLOSE POPUP WHEN CLICKING OUTSIDE
// ----------------------------------------

const popup = document.getElementById("popup");

if (popup) {

    popup.addEventListener("click", function(event) {

        if (event.target === popup) {
            closePopup();
        }

    });

}


// ----------------------------------------
// MANGA TITLE CORRECTIONS
// ----------------------------------------

// Sometimes the name written on your card
// is different from the name used by AniList.

const titleMap = {

    "Ace of Diamond": "Diamond no Ace",

    "Welcome to the Ballroom":
        "Ballroom e Youkoso",

    "Run With the Wind":
        "Kaze ga Tsuyoku Fuiteiru",

    "MF Ghost":
        "MF Ghost",

    "Initial D":
        "Initial D",

    "Ao Ashi":
        "Ao Ashi",

    "Hajime no Ippo":
        "Hajime no Ippo",

    "Blue Lock":
        "Blue Lock",

    "Slam Dunk":
        "Slam Dunk"

};


// ----------------------------------------
// GET ALL MANGA CARDS
// ----------------------------------------

const cards = document.querySelectorAll(".card");


cards.forEach(card => {

    card.addEventListener("click", function() {

        const titleElement = card.querySelector("h3");

        if (!titleElement) {
            console.error("This card does not have an h3 title.");
            return;
        }


        const title = titleElement.textContent.trim();


        // Use corrected AniList title if available
        const searchTitle = titleMap[title] || title;


        getManga(searchTitle, title);

    });

});


// ----------------------------------------
// GET MANGA FROM ANILIST
// ----------------------------------------

async function getManga(searchTitle, displayTitle) {

    try {

        console.log("Searching AniList for:", searchTitle);


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


        // ----------------------------------------
        // SEND REQUEST
        // ----------------------------------------

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
                        search: searchTitle
                    }

                })

            }
        );


        // ----------------------------------------
        // CHECK RESPONSE
        // ----------------------------------------

        if (!response.ok) {

            throw new Error(
                "AniList request failed: " +
                response.status
            );

        }


        const data = await response.json();


        console.log("AniList response:", data);


        // ----------------------------------------
        // CHECK IF MANGA EXISTS
        // ----------------------------------------

        if (
            !data.data ||
            !data.data.Media
        ) {

            console.log(
                "Manga not found:",
                searchTitle
            );


            // Show popup even if API cannot find it
            openPopup(
                displayTitle || searchTitle,
                "",
                "N/A",
                "Information unavailable",
                "Unknown",
                "Unknown",
                "Unknown",
                "Sorry, information for this manga could not be found on AniList.",
                ""
            );

            return;
        }


        const manga = data.data.Media;


        // ----------------------------------------
        // TITLE
        // ----------------------------------------

        const mangaTitle =
            manga.title?.romaji ||
            manga.title?.english ||
            manga.title?.native ||
            displayTitle ||
            searchTitle;


        // ----------------------------------------
        // DESCRIPTION
        // ----------------------------------------

        let description =
            manga.description ||
            "No synopsis available.";


        // Remove HTML tags from description

        description = description
            .replace(/<br\s*\/?>/gi, " ")
            .replace(/<\/?i>/gi, "")
            .replace(/<[^>]*>/g, "")
            .trim();


        // ----------------------------------------
        // AUTHOR
        // ----------------------------------------

        let author = "Unknown";


        if (
            manga.staff &&
            manga.staff.edges &&
            manga.staff.edges.length > 0
        ) {

            author =
                manga.staff.edges[0]
                    ?.node
                    ?.name
                    ?.full || "Unknown";

        }


        // ----------------------------------------
        // CHAPTERS
        // ----------------------------------------

        const chapters =
            manga.chapters ?? "Unknown";


        // ----------------------------------------
        // VOLUMES
        // ----------------------------------------

        const volumes =
            manga.volumes ?? "Unknown";


        // ----------------------------------------
        // STATUS
        // ----------------------------------------

        const status =
            manga.status ?? "Unknown";


        // ----------------------------------------
        // RATING
        // ----------------------------------------

        const rating =
            manga.averageScore ?? "N/A";


        // ----------------------------------------
        // COVER
        // ----------------------------------------

        const image =
            manga.coverImage?.large || "";


        // ----------------------------------------
        // SHOW POPUP
        // ----------------------------------------

        openPopup(
            mangaTitle,
            image,
            rating,
            author,
            chapters,
            volumes,
            status,
            description,
            ""
        );


    } catch (error) {

        console.error(
            "Error fetching manga:",
            error
        );


        // ----------------------------------------
        // SHOW ERROR IN POPUP
        // ----------------------------------------

        openPopup(
            displayTitle || searchTitle,
            "",
            "N/A",
            "Unavailable",
            "Unknown",
            "Unknown",
            "Unknown",
            "There was a problem fetching information from AniList. Please try again.",
            ""
        );

    }

}
