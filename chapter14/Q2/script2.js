let buttonsNoCols = document.getElementsByClassName("button-no-cols");

let article = document.getElementById("text-segment");

for (let button of buttonsNoCols) {
    button.addEventListener("click", () => {
        let noCols = button.getAttribute("data-no-cols");
        article.style.setProperty("--no-cols", noCols);
    });
}
