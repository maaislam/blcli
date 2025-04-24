import { observer } from '../../../../../lib/uc-lib';
import updateProducts from './updateProducts';

const checkBasketChange = () => {
    const basket = document.querySelector('#divBagItems');
    // Observe when basket changes
    observer.connect(basket, () => {
        // Update products (add timeout to wait for items to be removed/added)
        setTimeout(() => {
            updateProducts();
        }, 1000);
    }, {
        config: {
            attributes: false,
            childList: true,
            subtree: true,
        }
    });
};

export default checkBasketChange;