import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const classesNotInfo = [
    'hsColourSelection',
    'BuySizeText',
    'hsSizeSelection',
    'sizeGuideLink',
    'hsbottom',
    'hsColourDesc'
];

const updateModal = (elements) => {
    // Hide product infos
    elements.relatedProductInfos.forEach(info => {
        info.style.display = 'none';
    });
    // Move info to top
    let modalBodyHTML = `<div class="${ID}-info"></div>`;
    elements.modalBody.insertAdjacentHTML('afterbegin', modalBodyHTML);
    // Insert elements to info
    elements.relatedProductInfos.forEach(element => {
        let clonedElement = element.cloneNode(true);
        clonedElement.style.display = 'block';
        document.querySelector(`.${ID}-info`).appendChild(clonedElement);
    });
}


const addTracking = (elements) => {
    elements.addToBagButton.addEventListener('click', (e) => {
        fireEvent('Clicked - Add to bag');
    });
    elements.viewDetailsLink.addEventListener('click', (e) => {
        fireEvent('Clicked - View full product details');
    });
    elements.sizeSelect.addEventListener('change', () => {
        fireEvent('Change - size changed');
    });
    elements.colourSelect.addEventListener('change', () => {
        fireEvent('Change - colour changed');
    });
};

const handleModalChange = (modal) => {

    const allProductInfos = modal.querySelectorAll('.PinWrapText .col-xs-12');
    const relatedProductInfos = Array.prototype.filter.call(allProductInfos, (infoDiv) => {
        let hasClass = classesNotInfo.some((classString) => {
            return infoDiv.classList.contains(classString);
        });
        return !hasClass;
    });
    const elements = {
        modalBody: modal.querySelector('.modal-body'),
        addToBagButton: modal.querySelector('#addHotspotToBag'),
        viewDetailsLink: modal.querySelector('#hsViewProduct a'),
        sizeSelect: modal.querySelector('#hsSizeDdl'),
        colourSelect: modal.querySelector('#hsColourDdl'),
        allProductInfos,
        relatedProductInfos
    };

    // Check modal has changed (info will exist if it hasn't)
    const modalHasChanged = !document.querySelector(`.${ID}-info`);
    if (modalHasChanged) {

        // Update modal
        updateModal(elements);
        
        // Tracking
        addTracking(elements);
    }
};

export default handleModalChange;