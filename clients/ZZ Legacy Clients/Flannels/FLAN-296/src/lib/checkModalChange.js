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
};

export default checkModalChange;