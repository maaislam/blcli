import shared from '../shared';

const { ID } = shared;

export default () => {

    const offerCheckbox = document.querySelector(`#${ID}-offerCheck`);
    offerCheckbox.addEventListener('change', () => {
        if(offerCheckbox.checked) {
            localStorage.setItem(`${ID}-offer`, 'yes');
        } else {
            if(localStorage.getItem(`${ID}-offer`)) {
                localStorage.removeItem(`${ID}-offer`);
            }
        }
    });
}