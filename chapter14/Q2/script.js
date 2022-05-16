const buttonGroup = document.getElementById("input-group-no-cols");
const article = document.getElementById("text-segment");
const articleContainer = document.getElementById("text-container"); 

buttonGroup.addEventListener("click", e => {
    let button = e.target.closest(".button-no-cols");
    if (button) {
        let noCols = button.getAttribute("data-no-cols");
        article.style.setProperty("--no-cols", noCols);
        article.remove();
        articleContainer.appendChild(article);
    }
});
