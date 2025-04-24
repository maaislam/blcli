/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, storeOrderedSampleData, getFullProductIds } from './lib/services';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['#HeaderPlaceholder'], () => {
    const { ID, VARIATION } = shared;
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    activate();
  });
};

/**
 * Check if confirmation page
 * URL Example: https://www.avon.uk.com/checkoutmobile/confirmation/22333280/
 * @type {Boolean}
 */
const isConfirmation = /https?:\/\/www.avon.uk.com\/checkoutmobile\/confirmation\/?.*/.test(window.location.href);

if (isConfirmation) {
  storeOrderedSampleData();
} else {
  waitForApp().then((data) => {
    const fullProductIds = getFullProductIds();
    if (fullProductIds.length) {
      // Make data global
      share(data);
      share({ fullProductIds });
      pollAndFire();
    }
  });
}
