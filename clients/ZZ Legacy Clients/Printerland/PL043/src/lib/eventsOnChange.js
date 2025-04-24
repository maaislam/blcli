import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import elements from './elements';
import clickEvents from './clickEvents';

const eventsOnChange = () => {

    // Get elements
    /* For some reason listTitle ID is used more than once.. */
    const consumablesTitleLink = elements.modal.querySelectorAll('#listTitle a');
    const productGoToBasket = document.querySelector(`.${ID}-go-to-basket`);
    const productAddToBasketButtons = elements.modal.querySelectorAll('.btn__atb');

    const consumablesImages = elements.modal.querySelectorAll('figure a');
    const consumablesTitles = elements.modal.querySelectorAll('td a:not(.btn__atb)');

    // Remove all events
    productGoToBasket.removeEventListener('click', clickEvents.gotoBasket, false);
    consumablesTitleLink.forEach(titleLink => {
        titleLink.removeEventListener('click', clickEvents.titleLink, false);
    });
    consumablesImages.forEach(image => {
        image.removeEventListener('click', clickEvents.upsellOption, false);
    });
    consumablesTitles.forEach(title => {
        title.removeEventListener('click', clickEvents.upsellOption, false);
    });
    productAddToBasketButtons.forEach(button => {
        button.removeEventListener('click', clickEvents.addToBasket, false);
    });

    // Add all events back
    productGoToBasket.addEventListener('click', (e) => {
        clickEvents.gotoBasket(e);
    });
    consumablesTitleLink.forEach(titleLink => {
        titleLink.addEventListener('click', (e) => {
            clickEvents.titleLink(e);
        });
    });
    consumablesImages.forEach(image => {
        image.addEventListener('click', (e) => {
            clickEvents.upsellOption(e);
        });
    });
    consumablesTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            clickEvents.upsellOption(e);
        });
    });

    productAddToBasketButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            clickEvents.addToBasket(e);
        });
    });
};

export default eventsOnChange;