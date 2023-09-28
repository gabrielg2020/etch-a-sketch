// TODO: create the rainbow mode

// TODO: create the darken mode

const sketchPadController = {
    sketchPad: null,
    gridSize: 16,
    isDrawing: false,
    drawingColor: 'black',
    colorMode: 'color',

    init: function () {
        this.sketchPad = document.querySelector('.sketch-pad');
        this.createGrid();
        this.setupEventListeners();
    },

    createGrid: function() {
        this.sketchPad.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        this.sketchPad.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;
        this.removePixels()
    },

    removePixels: function() {
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

        const colorPixel = function (obj) {
            if (obj.colorMode === 'color'){
                pixel.style.backgroundColor = obj.drawingColor;
            } else if (obj.colorMode === 'rainbow'){
                const redValue = Math.floor(Math.random() * 256);
                const greenValue = Math.floor(Math.random() * 256);
                const blueValue = Math.floor(Math.random() * 256);

                const redHex = redValue.toString(16).padStart(2, '0');
                const greenHex = greenValue.toString(16).padStart(2, '0');
                const blueHex = blueValue.toString(16).padStart(2, '0');

                pixel.style.backgroundColor = `#${redHex}${greenHex}${blueHex}`;
            };
        };

        pixel.addEventListener('mousemove', () => {
            if (this.isDrawing) {
                colorPixel(this)
            };
        });

        pixel.addEventListener('click', () => {
            colorPixel(this)
        });
    },

    clearGrid: function() {
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = 'white';
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
            sketchPadController.clearGrid();
            return;
        };

        if (button.textContent === 'Color mode') {
            sketchPadController.colorMode = 'color';
        } else if (button.textContent === 'Rainbow mode'){
            sketchPadController.colorMode = 'rainbow';
        } else if (button.textContent === 'Darken mode'){
            sketchPadController.colorMode = 'darken'
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
