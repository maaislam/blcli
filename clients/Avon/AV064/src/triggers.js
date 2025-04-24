/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share, getPageType } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

const { ID, VARIATION } = shared;

// Force set GA reference to 360 account
// As of March 2020 we noticed the default tracker isn't always
// this core account
events.setPropertyId('UA-142145223-1');

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(
    [
      // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
      // Specify polling elements
      // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
      'body',
      // () => !!$,
      '#MainContentWrapper',
    ],
    () => {
      // -- Get out of stock true/false
      const isOutOfStock = $('#MainContentWrapper').scope().ViewModel.Product.IsOutOfStock;

      // -- Check if is out of stock
      if( !isOutOfStock ) {

        // -- Establish date
        const date = new Date();
        const day = date.getDay();
        const hour = date.getHours();

        // -- Check if day = Monday - Thursday, time before 1pm
        // Fire did meet conditions
        events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
        if (VARIATION.toLowerCase() !== 'control') activate();
      };
    },
  );
};

/**
 * Top-level polling entry point for code execution
 */
// getPageType().then((pageType) => {
  // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
  // ^ Optionally filter by a page type
  // Remove if not required
  // --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
  // if (pageType === 'PLP') {
    waitForApp().then((data) => {
      // Make $ and rootScope global
      share(data);
      // share({ pageType });
      pollAndFire();
    });
  // }
// });
