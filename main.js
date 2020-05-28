let displayWidth = 50; // number of rows/columns in sketch display
let squareWidth = 10;  // width in pixels of squares in display      
const sketchDisplay = document.querySelector('#sketch-display');
let eraser = false; 
let drawColor = '#000000'

function formatSquares(width) {
  /* Set square width in pixels */
  const squares = document.querySelectorAll('.display-square');
  squares.forEach(square => {
    square.style.width = width + 'px';
    square.style.height = width + 'px';
  });
}

function createDisplay(width) {
  sketchDisplay.innerHTML = "";
  for (let i = 0; i < width**2; i++) {  // create display divs
    const square = document.createElement('div');
    square.className = 'display-square';
    square.addEventListener('click', draw)
    sketchDisplay.appendChild(square);
  }
  formatSquares(squareWidth)
}

/* Click-and-hold drawing functionality */
sketchDisplay.addEventListener('mousedown', event => {
  event.preventDefault();
  const squares = document.querySelectorAll('.display-square');
  squares.forEach(square => {
    square.addEventListener('mouseover', draw)
  });
});

/* Click-and-hold drawing functionality */
sketchDisplay.addEventListener('mouseup', () => {
  const squares = document.querySelectorAll('.display-square');
  squares.forEach(square => {
    square.removeEventListener('mouseover', draw)
  });
});

function draw(e) {
  const color = eraser ? 'white' : drawColor;
  e.target.style.backgroundColor = color;
}

function updateDisplayWidth(width) {
  sketchDisplay.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  createDisplay(width)
}

function setPencil() {
  sketchDisplay.classList.remove("eraser")
  sketchDisplay.classList.add('pencil')
  eraser = false;
}

function setEraser() {
  sketchDisplay.classList.remove("pencil")
  sketchDisplay.classList.add('eraser')
  eraser = true;
}

function changeColor(e) {
  console.log(e.target.value)
  drawColor = e.target.value
}

function updateDisplay() {
  updateDisplayWidth(displayWidthInput.value)
  formatSquares(squareWidthInput.value)
}

const eraserRadio = document.querySelector('#eraser')
eraserRadio.addEventListener('click', setEraser)

const pencilRadio = document.querySelector('#pencil')
pencilRadio.addEventListener('click', setPencil)

const colorInput = document.querySelector('#color')
colorInput.addEventListener('change', changeColor)
colorInput.value = drawColor

const displayWidthInput = document.querySelector('#display-width')
displayWidthInput.value = displayWidth;

const squareWidthInput = document.querySelector('#square-width')
squareWidthInput.value = squareWidth;

const updateDisplayBtn = document.querySelector('#update-display')
updateDisplayBtn.addEventListener('click', updateDisplay)

const clearBtn = document.querySelector('#clear')
clearBtn.addEventListener('click', () => {
  const squares = document.querySelectorAll('.display-square');
  squares.forEach(square => {
    square.style.backgroundColor = 'white';
  });
})

updateDisplayWidth(displayWidth)
setPencil()
