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

/** Poll for elements the run experiment */
const pollAndFire = () => {
  pollerLite(['pdp-shade-selector', '.AddToCart'], () => {
    // Exclude conditional products as these are too unpredictable to account for
    // E.g. Some can only be added to bag based on certain conditions being met
    // and you may only be able to add a certain amount of them
    const addToCartScope = $('.AddToCart').scope();
    const isConditionalProduct = addToCartScope.isConditional();
    if (!isConditionalProduct) {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions'); // GA
      activate();
    }
  });
};

waitForApp().then((data) => {
  // Make $ and rootScope global
  /*
  --- NOT NEEDED ANYMORE DUE TO TARGETING BEING SET IN MAXYMISER ---

  const pageType = getPageType();
  if (pageType === 'foundationPDP') {
    share(data);
    pollAndFire();
  }
  */

  share(data);
  pollAndFire();
});
