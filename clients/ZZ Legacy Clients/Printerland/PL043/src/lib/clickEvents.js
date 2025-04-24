import { setup, fireEvent } from './services';

const clickEvents = {
    gotoBasket(e) {
        fireEvent('Click - Go to basket');
    },
    titleLink(e) {
        fireEvent('Click - upsell consumable title');
    },
    modalClose() {
        fireEvent('Click - modal close');
    },
    upsellOption(e) {
        fireEvent('Click - upsell option');
    },
    addToBasket(e) {
        fireEvent('Click - upsell add to basket');
    },
};

export default clickEvents;