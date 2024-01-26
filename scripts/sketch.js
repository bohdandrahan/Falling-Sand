let selectedColor = "#ff0000";
let grid;
let w = 2;
let strokeValue = 3;
let cols, rows;
let color = selectedColor;
let increment = 3;

function setup() {
    let canvasContainer = document.getElementById('canvas-container');
    let containerWidth = canvasContainer.offsetWidth;
    let containerHeight = canvasContainer.offsetHeight;
    let roundedWidth = Math.floor(containerWidth / w) * w;
    let roundedHeight = Math.floor(containerHeight / w) * w;
    createCanvas(roundedWidth, roundedHeight).parent(canvasContainer);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = [0, 'black']
        }
    }
}

function draw() {
    background('#161616');

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            noStroke()
            if (grid[i][j][0] === 1) {
                fill(grid[i][j][1])

                let x = i * w;
                let y = j * w;
                square(x, y, w)
            }
        }
    }

    let nextGrid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j][0];
            if (state === 1) {
                if (j >= rows - 1) {
                    nextGrid[i][j] = grid[i][j]
                    continue
                }

                let below = grid[i][j + 1][0];
                let belowL = i !== 0 ? grid[i - 1][j + 1][0] : 1;
                let belowR = i !== cols - 1 ? grid[i + 1][j + 1][0] : 1;

                if (below === 0) {
                    nextGrid[i][j + 1] = grid[i][j]
                }
                else if (belowL === 0 && belowR === 0) {
                    sign = Math.random() > 0.5 ? -1 : 1
                    nextGrid[i + sign][j + 1] = grid[i][j]
                }
                else if (belowL === 0) {
                    nextGrid[i - 1][j + 1] = grid[i][j]
                }
                else if (belowR === 0) {
                    nextGrid[i + 1][j + 1] = grid[i][j]
                }
                else {
                    nextGrid[i][j] = grid[i][j]
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
function mousePressed() {
    mouseDragged()
}
function mouseDragged() {
    let col = floor(mouseX / w);
    let row = floor(mouseY / w);

    newCol < cols && newRow < rows && newCol >= 0 && newRow >= 0
    color = graduallyChangeColor(color, increment);
    for (let i = -strokeValue; i <= strokeValue; i++) {
        for (let j = -strokeValue; j <= strokeValue; j++) {
            let newCol = col + i;
            let newRow = row + j;

            if (newCol < cols && newRow < rows && newCol >= 0 && newRow >= 0) {
                grid[newCol][newRow] = [1, color];
            }
        }
    }
}

function mouseRelesed() {
    color = selectedColor;

}

function updateColor() {
    let colorPicker = document.getElementById("colorPicker");
    selectedColor = colorPicker.value;
    color = selectedColor
}

function updateStroke() {
    strokeValue = document.getElementById("strokeSlider").value;
}
function updateIncrement() {
    increment = document.getElementById("incrementSlider").value;
}

function resetCanvas() {
    grid = make2DArray(cols, rows)

}

function hexToRgb(hex) {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function rgbToHex(r, g, b) {
    // Convert RGB values to hex
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function graduallyChangeColor(hexColor, increment) {

    // Get RGB components from hex color
    let { r, g, b } = hexToRgb(hexColor);

    const incrementR = (Math.random() * 2 * increment) - increment + 0.5;
    const incrementG = (Math.random() * 2 * increment) - increment + 0.5;
    const incrementB = (Math.random() * 2 * increment) - increment + 0.5;

    // Update RGB values with random increments
    const newR = Math.min(255, Math.max(0, r + incrementR));
    const newG = Math.min(255, Math.max(0, g + incrementG));
    const newB = Math.min(255, Math.max(0, b + incrementB));


    // Convert updated RGB values back to hex
    const newHexColor = rgbToHex(newR, newG, newB);

    // Apply the new color to your element or use it as needed

    return newHexColor;
}
