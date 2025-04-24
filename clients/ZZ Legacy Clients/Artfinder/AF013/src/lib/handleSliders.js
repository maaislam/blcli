import shared from './shared';
const { ID, VARIATION } = shared;
import elements from './elements';
import buildUsps from './buildUsps';
import updateUsps from './updateUsps';
import isBasket from './isBasket';
import isMobile from './isMobile';
import handleBasketModals from './handleBasketModals';

const handleSliders = () => {
    // Desktop basket
    if (elements.basketView.desktop) {
        let basketViewDesktopUSPS = buildUsps({
            rows: 2,
            variableWidth: true
        });
        elements.basketView.desktop.insertAdjacentHTML('beforeend', basketViewDesktopUSPS);
    }

    // Basket page
    if (isBasket() && elements.basketMain.orderSummary && elements.basketMain.sidebarBox) {
        let basketMainUSPS = buildUsps({
            slidesToShow: !isMobile() ? 2 : null,
            classes: `${ID}-usps--bordered`
        });
        let basketMainElement = isMobile() ? elements.basketMain.orderSummary : elements.basketMain.sidebarBox;
        basketMainElement.insertAdjacentHTML('beforebegin', basketMainUSPS);
    }
    
    // Basket modals
    requestAnimationFrame(() => {
        handleBasketModals();
    });

    // Create usp slick sliders
    updateUsps();
};

export default handleSliders;