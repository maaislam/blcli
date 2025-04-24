import elements from './elements';
import eventsOnChange from './eventsOnChange';
import handleModalChange from './handleModalChange';
import { observer } from '../../../../../lib/uc-lib';

const checkModalChange = () => {
    observer.connect(elements.modalBody, () => {
        handleModalChange();
        eventsOnChange();
    }, {
        subtree: true
    });
};

export default checkModalChange;