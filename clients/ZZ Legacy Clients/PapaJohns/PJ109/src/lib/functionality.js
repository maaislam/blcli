import shared from './shared';
import overlay from './overlay';
const {ID, VARIATION} = shared;
import { fireEvent } from './services';

const functionality = () => {
    const banner = document.querySelector(`.${ID}-banner`);
    const button = document.querySelector(`.${ID}-button`);
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.open();
    });
};

export default functionality;