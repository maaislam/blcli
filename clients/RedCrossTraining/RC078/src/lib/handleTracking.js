import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';
import { elementIsInView } from "../../../../../lib/utils";
const { ID, VARIATION } = shared;

const trackButtonInView = (button) => {
    let buttonViewed = false;
    window.addEventListener('scroll', () => {
        if (elementIsInView(button) && !buttonViewed) {
            fireEvent('CTA viewed');
            buttonViewed = true;
        }
    });
};

const trackButtonInteraction = (button) => {
    button.addEventListener('click', () => {
        fireEvent('CTA click');
    });
};  

export default () => {
    const button = document.querySelector(`.${ID}-button`);
    trackButtonInView(button);
    trackButtonInteraction(button);
};