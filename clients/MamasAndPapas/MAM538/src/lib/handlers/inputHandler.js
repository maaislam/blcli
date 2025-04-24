const inputHandler = (id) => {
    console.log('inputHandler');
    const formRows = document.querySelectorAll(`.${id}__requiredInput`);

    formRows.forEach(function (formRow) {
        const input = formRow.querySelector('input');
        const requiredText = formRow.querySelector('.requiredText');
        const movingLabel = formRow.querySelector(`.${id}-moving-label`);
        // console.log('input', input);

        input.addEventListener('input', function () {
            // console.log('input');
            if (this.value.trim().length > 0) {
                requiredText.style.display = 'none';
                movingLabel.style.top = '4px';
                input.style.padding = '22px 12px 6px';
            } else {
                requiredText.style.display = 'inline-block';
                movingLabel.style.top = '13px';
                input.style.padding = '14px 12px';
            }
        });
    });

    const babyInfoInput = document.querySelector(`.babyInfo .${id}-babyNameInput`);
    // console.log('babyInfoInput', babyInfoInput);
    const babyInfoLabel = document.querySelector(`.babyInfo .${id}-babyNameLabel`);
    // console.log('babyInfoLabel', babyInfoLabel);

    babyInfoInput.addEventListener('input', function () {
        // console.log('babyInfoInput');
        if (this.value.trim().length > 0) {
            babyInfoLabel.style.top = '4px';
            babyInfoInput.style.padding = '22px 12px 6px';
        } else {
            babyInfoLabel.style.display = 'block';
            babyInfoLabel.style.top = '13px';
            babyInfoInput.style.padding = '14px 12px';
        }
    });
};
export default inputHandler;
