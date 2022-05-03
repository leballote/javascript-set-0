let grid = document.getElementById("grid");

grid.addEventListener("click", e => {
    let cell = e.target.closest(".cell");
    if (cell) {
        alert(cell.textContent);
    }
});