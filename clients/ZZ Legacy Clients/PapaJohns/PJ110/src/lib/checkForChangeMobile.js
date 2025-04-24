import elements from './elements';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import handleChangeMobile from './handleChangeMobile';

const checkForChangeMobile = () => {
    if (elements.mobileContainer) {
        observer.connect(elements.mobileContainer, () => {
            handleChangeMobile();
        }, {
            config: {
                childList: true,
                subtree: true,
            }
        });
    }
};

export default checkForChangeMobile;