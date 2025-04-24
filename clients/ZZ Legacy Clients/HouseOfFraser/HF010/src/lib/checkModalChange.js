import { observer } from '../../../../../lib/uc-lib';
import { fireEvent } from '../../../../../core-files/services';
import handleModalChange from './handleModalChange';

const checkModalChange = () => {
    const modal = document.querySelector('#hotspotModal');
    // Observe when modal changes
    observer.connect(modal, () => {
        handleModalChange(modal);
    }, {
        config: {
            attributes: false,
            childList: true,
            subtree: true,
        }
    });

    // Tracking
    const classObserver = new MutationObserver(function (event) {
        const modalOpen = modal.classList.contains('in');
        if (!modalOpen) {
            fireEvent('Quick view closed');
        }
    });

    classObserver.observe(modal, {
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        characterData: false
    });
};

export default checkModalChange;