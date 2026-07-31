const fantasyContainer = document.getElementById("fantasy-container");

console.log(fantasyContainer);

async function loadFantasy() {

    const query = `
    query {
        Page(page: 1, perPage: 20) {

            media(
                type: MANGA
                genre: "Fantasy"
                sort: POPULARITY_DESC
            ) {

                id

                title {
                    romaji
                }

                coverImage {
                    large
                }

                averageScore

                description
            }
        }
    }
    `;

    const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query
        })
    });

    const data = await response.json();

    fantasyContainer.innerHTML = "";

    data.data.Page.media.forEach(manga => {

        const card = document.createElement("div");
        card.className = "card";

        const shortDescription = manga.description
    ? manga.description.replace(/<[^>]*>/g, "").slice(0, 70) + "..."
    : "No description available.";

card.innerHTML = `
    <img src="${manga.coverImage.large}" alt="${manga.title.romaji}">
    <h3>${manga.title.romaji}</h3>
    <p>${shortDescription}</p>
`;

        card.addEventListener("click", () => {
            getManga(manga.title.romaji);
        });

        fantasyContainer.appendChild(card);

    });

}

document.addEventListener("DOMContentLoaded", () => {
    loadFantasy();
});