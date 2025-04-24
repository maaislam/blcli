import shared from '../../../../../core-files/shared';
import updateProducts from './updateProducts';
import { fireEvent } from '../../../../../core-files/services';
const { ID, VARIATION } = shared;

const addToBagTracking = (modal, addToBagButton) => {
    addToBagButton.addEventListener('click', (e) => {
        // Set timeout to wait for error to exist/not exist
        setTimeout(() => {
            const hasError = modal.querySelector('.sizeerror');
            if (!hasError) {
                fireEvent('Add to bag - Quick View modal');
            }
        }, 200);
    });
};

const handleModalChange = (modal) => {

    const addToBagButton = modal.querySelector('#addHotspotToBag');
    const viewProduct = modal.querySelector('#hsViewProduct').cloneNode(true);
    const priceWrapper = modal.querySelector('#hsPriceWrapper');

    addToBagTracking(modal, addToBagButton);

    if (VARIATION == 'control') {
        return;
    }

    // Change text
    const colourLabel = modal.querySelector('.ColourLabel');
    const sizeLabel = modal.querySelector('.hsSizeLabel');

    colourLabel.innerText = 'select colour';
    sizeLabel.innerText = 'select size';

    addToBagTracking(modal, addToBagButton);

    // Add view product after price wrapper
    priceWrapper.appendChild(viewProduct);
};

export default handleModalChange;