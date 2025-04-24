import { observer } from '../../../../../lib/uc-lib';
import { fireEvent } from '../../../../../core-files/services';
import handleModalChange from './handleModalChange';
import { logMessage } from '../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;
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
            let qvMessage = "Quick view closed";
            logMessage(qvMessage);
            fireEvent(qvMessage);
            document.documentElement.classList.remove(`${ID}-noscroll`);
        } else {
            let qvMessage = "Quick view opened";
            logMessage(qvMessage);
            fireEvent(qvMessage);
            document.documentElement.classList.add(`${ID}-noscroll`);
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