const colorWrapper = document.querySelector('.color-wrapper');
const colorPicker = document.querySelector('#color-picker');

colorPicker.addEventListener('input', () => {
    colorWrapper.style.cssText = `border-color: ${colorPicker.value}; background-color: ${colorPicker.value};`;

});