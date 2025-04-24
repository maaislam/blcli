import settings from '../settings';

const { ID } = settings;

export default () => {

    let sizeSelected = false;
    let storedSize = '';

    const size = document.querySelector('.product-options-wrapper');
    size.insertAdjacentHTML('afterbegin', `<span class="${ID}-selectSize">Select your size to check availability</>`);
    size.insertAdjacentHTML('beforeend', `<span class="${ID}-limitedStock"><b>Limited stock available in your size!</b><br>Add to basket now to avoid missing out</>`);

    const sizeTitle = document.querySelector(`.${ID}-selectSize`);
    const limitedMessage = document.querySelector(`.${ID}-limitedStock`);

    const changeMessaging = () => {
        const selectBox = size.querySelector('select');
        selectBox.addEventListener('change', (e) => {
            const selectedSize = selectBox.options[selectBox.selectedIndex].text;
            
            // only store the first size chosen once
            if(sizeSelected === false) {
                storedSize = selectBox.options[selectBox.selectedIndex].text;
                sizeTitle.style.display = 'none';
                limitedMessage.style.display = 'block';
                sizeSelected = true;
            }

            // show the limited message if chosen size is selected again
            if(selectedSize === storedSize) {
                limitedMessage.style.display = 'block';
            } else {
                limitedMessage.style.display = 'none';
            }
        });
    }
    changeMessaging();
}