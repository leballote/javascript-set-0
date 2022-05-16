let temp;
const grid = document.getElementById("grid");
const M = 5, N = 5; //rows, cols
const gridFragment = new DocumentFragment();

const firstRow = document.createElement("div");
firstRow.classList.add("row");

for (let j = 0; j < N; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = j;
    firstRow.appendChild(cell);
}

for (let i = 0; i < M; i++) {
    const row = firstRow.cloneNode(true);
    for (let j = 0; j < N; j++) {
        row.children[j].textContent = j + i*N;
    }
    gridFragment.appendChild(row);
}

grid.appendChild(gridFragment);

grid.addEventListener("click", e => {
    let cell = e.target.closest(".cell");
    if (cell) {
        alert(cell.textContent);
    }
});