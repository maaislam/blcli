
import elements from './elements';
import handleSteelProps from './handleSteelProps';
import handleEdgeSanders from './handleEdgeSanders';
import settings from './settings';
import shared from './shared';
import { setup, fireEvent } from './services';

import popUpElementsToWaitFor from './popUpElementsToWaitFor';
import { observer, pollerLite } from '../../../../../lib/utils';

let cartSettings = {
    running: false
};

const checkCartChange = () => {
    // Observe when the popup changes.
    observer.connect(elements.preCartPopup, () => {
        if (!cartSettings.running) {
            cartSettings.running = true;
            pollerLite(popUpElementsToWaitFor, () => {
                fireEvent('Popup cart changed');
                if (shared.VARIATION == 'control') {
                    return;
                }
                if (settings.isSteelProps) {
                    handleSteelProps();
                } else if (settings.isEdgeSanders) {
                    handleEdgeSanders();
                }
                cartSettings.running = false;
            });
        }
    }, {
        config: {
            attributes: true,
            childList: true,
        }
    });
}

export default checkCartChange;