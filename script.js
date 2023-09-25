const colorWrapper = document.querySelector('.color-wrapper');
const colorPicker = document.querySelector('#color-picker');

colorPicker.addEventListener('input', () => {
    colorWrapper.style.cssText = `border-color: ${colorPicker.value}; background-color: ${colorPicker.value};`;
});

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
