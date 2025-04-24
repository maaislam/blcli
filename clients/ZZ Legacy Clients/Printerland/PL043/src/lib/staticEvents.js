import shared from './shared';
import elements from './elements';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import clickEvents from './clickEvents';
import { fireEvent } from './services';

const staticEvents = () => {
    let scrolled = false;
    elements.modalClose.addEventListener('click', () => {
        clickEvents.modalClose();
    });
    elements.modalBody.addEventListener('scroll', () => {
        if (!scrolled) {
            fireEvent('User scrolling in upsell panel');
            scrolled = true;
        }
    });
};

export default staticEvents;