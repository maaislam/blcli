import shared from './shared';
import buildUsps from './buildUsps';
import updateUsps from './updateUsps';
import getBasketModals from './getBasketModals';
const { ID } = shared;

const handleBasketModals = () => {
    let basketModals = getBasketModals();
    basketModals.forEach(modal => {
        let usps = modal.querySelector(`.${ID}-usps`);
        let targetElement = modal.querySelector('.dropdown-section-title');
        let targetElementReact = modal.querySelector('.modal-footer');
        let target = targetElement ? targetElement : targetElementReact ? targetElementReact : null;
        if (target && !usps) {
            let modalUSPS = buildUsps();
            target.insertAdjacentHTML('afterend', modalUSPS);
            updateUsps();
        }
    });
    requestAnimationFrame(handleBasketModals);
}

export default handleBasketModals;