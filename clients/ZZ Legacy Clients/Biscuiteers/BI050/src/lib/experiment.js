/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getRootScope, isCurrentPagePlpOrPdp } from './services';
import { addPoller, addEventListener, addObserver } from './winstack';
import { events } from '../../../../../lib/utils';
import settings from './shared';

/**
 * Prevent multiple run of event listener
 */
let isRunning = false;

/**
 * Entry point for experiment
 */
export default () => {
  setup();

  const $rootScope = getRootScope();

  $rootScope.$on('basket.add.success', () => {
    if(isRunning) {
      return false;
    }

    if(!isCurrentPagePlpOrPdp()) {
      return false;
    }

    if(settings.VARIATION == 'control') {
      // Control behaviour flag event
      events.send(settings.ID, `${settings.ID}-control`, 'did-add-to-basket');
    } else {
      // Variation behaviour, flag event and do redirect
      events.send(settings.ID, `${settings.ID}-v${settings.VARIATION}`, 'did-add-to-basket');

      isRunning = true;

      // Active for 'loading' styles
      document.body.classList.add(`${settings.ID}-active`);

      // Redirect to Basket
      window.location = '/basket';

      // Reset flag for future calls
      isRunning = false;
    }
  });
};
