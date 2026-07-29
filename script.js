const style = document.createElement("style");

style.textContent = `

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.popup-layout{
    display:flex;
    flex-direction:column;
    gap:25px;
}

.popup-container{
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(220px,300px);
    gap:30px;
    align-items:start;

}

.popup-info{
    flex:1;
    min-width:0;
}

.popup-info p{
    display:flex;
    margin:12px 0;

}


.label{
    width:110px;
    font-weight:600;
    letter-spacing:.3px;
    color:#b9b3e6;
}

.label::after{
    content:":";
    margin-left:5px;
    color:#7a72b8;
}

.value{
    color:white;

}

.manga-title{
    font-family:'Bebas Neue', sans-serif;
    font-size:46px;
    font-weight:400;
    letter-spacing:.5px;
    margin-top:10px;
    margin-bottom:22px;
    margin-left:0px;
    color:white;
    line-height:1.05;
    display:inline-block;
}

.manga-title::after{
    content:"";
    display:block;
    width:72px;
    height:5px;
    margin-top:12px;
    border-radius:3px;
    background:linear-gradient(90deg,#FFD54F,#b48cff);
}

.popup-info p{
    margin:12px 0;
    font-size:20px;
}


.left{
    width:260px;
    text-align:center;
}

.popup-cover{
    width:100%;
    height:auto;
    margin-top:0;
    border-radius:18px;
    object-fit:cover;
    box-shadow:
        0 0 0 3px rgba(255,213,79,.12),
        0 0 45px rgba(180,140,255,.25),
        0 12px 30px rgba(0,0,0,.45);
}

.popup-cover-section{
    width:100%;
    max-width:300px;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:22px 18px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.08);
    border-radius:20px;
}

.cover-title{
    margin-top:18px;
    font-size:32px;
    font-weight:700;
    letter-spacing:.3px;
    color:white;
    line-height:1.2;
}

.rating{
    margin-top:20px;
    font-size:22px;
    font-weight:bold;
    color:#1b1533;
    background:linear-gradient(90deg,#FFD54F,#ffe9a8);
    padding:8px 20px;
    border-radius:999px;
    box-shadow:0 4px 14px rgba(255,213,79,.35);
}
.popup-content{
    width: 92vw;
    max-width: 1000px;
    overflow-x:hidden;
    padding:25px;
    box-sizing:border-box;
}

.right{
    flex:1;
}

.info-box{
    background:#26234d;
    border-radius:14px;
    padding:18px;
    margin-bottom:20px;
    margin-right:20px;
}

.info-row{
    display:flex;
    justify-content:space-between;
    padding:8px 0;
    border-bottom:1px solid rgba(255,255,255,.08);
}

.info-row:last-child{
    border:none;
}

.popup-info > p{
    padding-bottom:10px;
    border-bottom:1px solid rgba(255,255,255,.07);
}

.popup-info > p:last-of-type{
    border-bottom:none;
    padding-bottom:0;
}

.close-btn{
    transition:0.15s;
}

.close-btn:hover{
    transform:none;
    color:white;
    opacity:.8;
}

.notes{
    margin-top:20px;
    width:100%;
    font-size:17px;
    font-style:italic;
    color:#e9e6ff;
    opacity:1;
    line-height:1.5;
    padding-top:14px;
    border-top:1px solid rgba(255,255,255,.1);
}

.synopsis{
    padding-top:30px;
    padding-bottom:20px;
}

.synopsis h3{
    font-family:'Bebas Neue', sans-serif;
    font-size:25px;
    font-weight:400;
    letter-spacing:1.8px;
    color:#FFD54F;
    margin:0 0 10px 0;
    padding-left:14px;
    border-left:2px solid #b48cff;
    border-radius:10px;
    text-transform:uppercase;
}


`;

document.head.appendChild(style);

function removeStrayNote() {
    document.querySelectorAll("body *").forEach(el => {
        if (
            el.children.length === 0 &&
            el.textContent.includes("Winner of the 45th Kodansha Manga Award")
        ) {
            el.remove();
        }
    });
}

removeStrayNote();

function openPopup(title,image,rating,author,chapters,volumes,status,synopsis,note){

    const popupBody = document.getElementById("popupBody");

    popupBody.innerHTML = `

    <div class="popup-layout">

        <div class="popup-header">

            <div class="popup-container">

            <div class="popup-info">

                <h1 class="manga-title">${title}</h1>


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

                    <p>${synopsis}</p>

                </div>


            </div>



            <div class="popup-cover-section">

                <img src="${image}" class="popup-cover">

                <div class="rating">
                    ⭐ ${rating}/100
                </div>

                ${note ? `<div class="notes">${note}</div>` : ""}
                </div>

            </div>


        </div>
                

    </div>


        `;
            

    document.getElementById("popup").style.display="flex";

}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function () {
        const title = card.querySelector("h3").textContent;

        getManga(title);
        
    });
});


async function getManga(title) {

    const query = `
    query ($search: String) {
        Media(search: $search, type: MANGA) {
            title {
                romaji
            }
            description
            averageScore
            chapters
            volumes

            coverImage {
                large
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
            query: query,
            variables: {
                search: title
            }
        })
    });

    const data = await response.json();
    const manga = data.data.Media;
    let description = manga.description || "No synopsis available.";
let note = "";

const noteMatch = description.match(/<i>\s*Notes?:[\s\S]*?<\/i>/i);
if (noteMatch) {
    note = noteMatch[0].replace(/<\/?i>/g, "").trim();
    description = description.replace(noteMatch[0], "").trim();
}

    const author =
    manga.staff?.edges?.length > 0
        ? manga.staff.edges[0].node.name.full
        : "Unknown";
    console.log(manga);
    openPopup(
    manga.title.romaji,
    manga.coverImage.large,
    manga.averageScore,
    author,
    manga.chapters ?? "Unknown",
    manga.volumes ?? "Unknown",
    manga.status ?? "Unknown",
    description,
    note
);
}