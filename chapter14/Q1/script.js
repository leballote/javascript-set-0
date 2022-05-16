let applyButton = document.getElementById("apply")
let grid = document.getElementById("grid");
let nRowsInp = document.getElementById("nRows");
let nColsInp = document.getElementById("nCols");
let gridFragment = new DocumentFragment();


applyButton.addEventListener("click", (evt) => {
    grid.style.setProperty("--n-cols", nColsInp.value);
    let nCells = nColsInp.value*nRowsInp.value;
    for (let i = grid.children.length; i < nCells; i++) {
        const el = document.createElement("div");
        el.classList.add("cell");
        gridFragment.appendChild(el);
    }
    requestAnimationFrame(() => {
        grid.appendChild(gridFragment);
    });

    let cellsToDelete = [];
    for (let i = grid.children.length - 1; i >= nCells; i--) {
        cellsToDelete.push(grid.children[i]);
    }
    requestAnimationFrame(() => {
        for (let i = 0; i < cellsToDelete.length; i++) {
            grid.removeChild(cellsToDelete[i]);
        }
    });

});