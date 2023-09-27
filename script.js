// Color Picker
const colorWrapper = document.querySelector('.color-wrapper');
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('input', () => {
    colorWrapper.style.cssText = `border-color: ${colorPicker.value}; background-color: ${colorPicker.value};`;
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
    createGrid(e.target.value);
});



function createGrid (gridSize) {
    const sketchPad = document.querySelector('.sketch-pad');
    sketchPad.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    sketchPad.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    
    while (sketchPad.firstChild) {
        sketchPad.removeChild(sketchPad.firstChild);
    };

    let isDrawing = false;

    sketchPad.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    sketchPad.addEventListener('mouseup', () => {
        isDrawing = false;
    });


    for (let i = 0; i < gridSize * gridSize ; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        sketchPad.appendChild(pixel);

        pixel.addEventListener('mousemove', () => {
            if (isDrawing) {
                pixel.style.backgroundColor = 'black';
            };
        });

        pixel.addEventListener('click', () => {
            pixel.style.backgroundColor = 'black';
        });
    };
};