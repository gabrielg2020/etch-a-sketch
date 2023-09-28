// TODO: have the color mode button be auto selected

// TODO: create the clear

// TODO: create the rainbow mode

// TODO: create the darken mode

const sketchPadController = {
    sketchPad: null,
    gridSize: 16,
    isDrawing: false,
    drawingColor: 'black',

    init: function () {

        this.sketchPad = document.querySelector('.sketch-pad');
        this.createGrid();
        this.setupEventListeners();
    },

    createGrid: function() {
        this.sketchPad.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        this.sketchPad.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;
        this.clearGrid()
    },

    clearGrid: function() {
        while (this.sketchPad.firstChild) {
            this.sketchPad.removeChild(this.sketchPad.firstChild);
        }; 
    },

    setupEventListeners: function() {
        this.sketchPad.addEventListener ('mousedown', (e) => {
            e.preventDefault(); // Stops the browser thinking we are trying to drag the sketchPad
            this.isDrawing = true;
        });

        this.sketchPad.addEventListener ('mouseup', () => {
            this.isDrawing = false;
        });

        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            this.createPixel();
        };
    },

    createPixel: function() {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel')
        this.sketchPad.appendChild(pixel);

        pixel.addEventListener('mousemove', () => {
            if (this.isDrawing) {
                pixel.style.backgroundColor = this.drawingColor;
            };
        });

        pixel.addEventListener('click', () => {
            pixel.style.backgroundColor = this.drawingColor;
        });
    },
};

Window.onload = sketchPadController.init();

// Color Picker
const colorWrapper = document.querySelector('.color-wrapper');
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', () => {
    colorWrapper.style.cssText = `border-color: ${colorPicker.value}; background-color: ${colorPicker.value};`;
    sketchPadController.drawingColor = String(colorPicker.value)
});
// Buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Clear') {
            return;
        };

        buttons.forEach((btn) => {
            btn.classList.remove('selected');
        });

        button.classList.toggle('selected');
    });
});
// Grid Size
const gridSizeRange = document.querySelector('.grid-size-range');
const gridSizeOutput = document.querySelector('.grid-size-output');
gridSizeRange.addEventListener('input', (e) => {
    gridSizeOutput.textContent = `${e.target.value}x${e.target.value}`;

});

gridSizeRange.addEventListener('change', (e) => {
    sketchPadController.gridSize = e.target.value;
    sketchPadController.init();
});
