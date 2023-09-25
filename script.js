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