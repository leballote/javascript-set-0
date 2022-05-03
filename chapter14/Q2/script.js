let buttonGroup = document.getElementById("input-group-no-cols");
let article = document.getElementById("text-segment");

buttonGroup.addEventListener("click", e => {
    let button = e.target.closest(".button-no-cols");
    if (button) {
        let noCols = button.getAttribute("data-no-cols");
        article.style.setProperty("--no-cols", noCols);
    }
});
