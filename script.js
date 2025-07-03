let row = 10;
let col = 10;
let grid = [];

function createGrid() {
    grid = [];
    for (let i = 0; i<row; i++) {
        const row = [];
        for (let j = 0; j<col; j++) {
            row.push(0)
        }
        grid.push(row);
    }
}

function renderGrid() {
    const gridContainer = document.getElementById('container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            gridContainer.appendChild(cell);
        }
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function formatCells() {
    const container = document.querySelector('#container'); // id is `container`, not `.container`
    const containerStyles = window.getComputedStyle(container);
    const containerHeight = parseFloat(containerStyles.height);
    const containerWidth = parseFloat(containerStyles.width);
    alert(containerHeight);
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.height = `${Math.floor((containerHeight - 15) / row)}px`;
        cell.style.width = `${Math.floor((containerWidth - 15) / col)}px`;
    })
    cells.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = getRandomColor();
        })
    });
}

function reset(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    renderGrid();
    formatCells();
});
