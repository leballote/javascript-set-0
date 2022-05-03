let body = document.getElementsByTagName("body")[0];

let applyButton = document.getElementById("apply")
let grid = document.getElementById("grid");
let nRowsInp = document.getElementById("nRows");
let nColsInp = document.getElementById("nCols");


applyButton.addEventListener("click", (evt) => {
    grid.style.setProperty("--n-cols", nColsInp.value);
    let cellsToCreate = [];
    let nCells = nColsInp.value*nRowsInp.value;
    for (let i = grid.children.length; i < nCells; i++) {
        const el = document.createElement("div");
        el.classList.add("cell");
        cellsToCreate.push(el);
    }
    for (let el of cellsToCreate) {
        grid.appendChild(el); 
    }
    let cellsToDelete = [];
    for (let i = grid.children.length - 1; i >= nCells; i--) {
        cellsToDelete.push(grid.children[i]);
    }
    for (let i = 0; i < cellsToDelete.length; i++) {
        grid.removeChild(cellsToDelete[i]);
    }

    //solution
    // while(grid.children.length > nCells) {
    //     grid.removeChild(document.getElementsByClassName("cell")[0]);
    // } 
});