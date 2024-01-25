let selectedColor = "#ff0000";
let grid;
let w = 25;
let cols, rows;

function setup() {
    let canvasContainer = document.getElementById('canvas-container');
    let containerWidth = canvasContainer.offsetWidth;
    let containerHeight = canvasContainer.offsetHeight;
    let roundedWidth = Math.floor(containerWidth / w) * w;
    let roundedHeight = Math.floor(containerHeight / w) * w;
    createCanvas(roundedWidth, roundedHeight).parent(canvasContainer);
    cols = width / w;
    rows = height / w;
    console.log(cols, rows)
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = [0, 'black']
        }
    }

    color = selectedColor
    grid[5][5] = [1, color]
}

function draw() {
    background('#161616');

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            stroke(255)
            fill(grid[i][j][1])

            let x = i * w;
            let y = j * w;
            square(x, y, w)
        }
    }

    let nextGrid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j][0];
            if (state === 1) {
                let below = grid[i][j + 1][0];
                if (below === 0) {
                    nextGrid[i][j][0] = 0;
                    nextGrid[i][j + 1] = grid[i][j]
                }
            }
        }
    }
    grid = nextGrid
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            arr[i][j] = [0, 'black']
        }
    }
    return arr;
}

function updateColor() {
    let colorPicker = document.getElementById("colorPicker");
    selectedColor = colorPicker.value;
}

