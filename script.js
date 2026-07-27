function openPopup(title,image,rating,author,chapters,volumes,status,synopsis){

    const popupBody = document.getElementById("popupBody");

    popupBody.innerHTML = `
    
    <div class="popup-layout">

        <div class="left">

            <img src="${image}">

        </div>

        <div class="right">

            <h2>${title}</h2>

            <p><strong>Rating:</strong> ${rating}</p>

            <p><strong>Author:</strong> ${author}</p>

            <p><strong>Chapters:</strong> ${chapters}</p>

            <p><strong>Volumes:</strong> ${volumes}</p>

            <p><strong>Status:</strong> ${status}</p>

            <br>

            <h3>Synopsis</h3>

            <p>${synopsis}</p>

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
        openPopup(card);
    });
});
