let row = 15;
let col = 15;
let grid = [];
let isMouseDown = false;
let myColor = "#ffffff"
let randomColor = false;

function createGrid(row,col) {
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
    randomColor = true;
    const letters = '0123456789ABCDEF';
    let newColor = '#';
    for (let i = 0; i < 6; i++) {
        newColor += letters[Math.floor(Math.random() * 16)];
    }
    return newColor;
}

function formatCells() {
    const container = document.querySelector('#container'); // id is `container`, not `.container`
    const containerStyles = window.getComputedStyle(container);
    const containerHeight = parseFloat(containerStyles.height);
    const containerWidth = parseFloat(containerStyles.width);
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.height = `${Math.floor(containerHeight / row)}px`;
        cell.style.width = `${Math.floor(containerWidth / col)}px`;
    })
    cells.forEach(cell => {
        cell.addEventListener('mousedown', () => {
            isMouseDown = true;
            if (randomColor) {
                cell.style.backgroundColor = getRandomColor()
            } else {
                cell.style.backgroundColor = myColor;
            }
        })
    });
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                if (randomColor) {
                    cell.style.backgroundColor = getRandomColor()
                } else {
                    cell.style.backgroundColor = myColor;
                }
            }
        })
    })
    cells.forEach(cell => {
        cell.addEventListener('mouseup', () => {
            isMouseDown = false;
        })
    })
}

function reset(){
    randomColor = false;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}

function openColorPicker() {
    randomColor = false;
    document.getElementById('colorPicker').click();
    document.getElementById('colorPicker').addEventListener('input', (e) => {
        myColor = e.target.value;
    });
}

function erase(){
    randomColor = false;
    myColor = "#ffffff"
}

document.addEventListener('DOMContentLoaded', () => {
    createGrid(col,row);
    renderGrid();
    formatCells();

    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('sliderValue');

    slider.addEventListener('input', () => {
        let val = parseInt(slider.value, 10);
        sliderValue.value = val.toString();
        row = val;
        col = val;
        createGrid();
        renderGrid();
        formatCells();
    });

    sliderValue.addEventListener('input', () => {
        let val = parseInt(sliderValue.value, 10);
        let min = parseInt(slider.min, 10);
        let max = parseInt(slider.max, 10);
        val = Math.min(Math.max(val, min), max);
        slider.value = val.toString();
        sliderValue.value = val.toString();
        row = val;
        col = val;
        createGrid();
        renderGrid();
        formatCells();
    });
});
