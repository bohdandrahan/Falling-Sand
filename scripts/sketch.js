let selectedColor = 'red';
function setup() {
    let canvasContainer = document.getElementById('canvas-container');
    let containerWidth = canvasContainer.offsetWidth;
    let containerHeight = canvasContainer.offsetHeight;

    // Set canvas dimensions to match the div
    createCanvas(containerWidth, containerHeight).parent(canvasContainer);
}


function draw() {
    background(selectedColor);
}
function updateColor() {
    let colorPicker = document.getElementById("colorPicker");
    selectedColor = colorPicker.value;
}

