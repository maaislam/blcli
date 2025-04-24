/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';
import { events } from '../../../../lib/utils';
import shared from './lib/shared';

events.setPropertyId('UA-142145223-1');

const { ID, VARIATION } = shared;

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    'pdp-shade-selector',
    '.Details .ListPrice',
    '.AddToCart',
  ], () => {
    // Exclude conditional products as these are too unpredictable to account for
    // E.g. Some can only be added to bag based on certain conditions being met
    // and you may only be able to add a certain amount of them
    const addToCartScope = $('.AddToCart').scope();
    const isConditionalProduct = addToCartScope.isConditional();
    if (!isConditionalProduct) {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions'); // GA

      events.send(`${ID}-${VARIATION}`, 'not-conditional-product'); // GA

      events.send(`${ID}-${VARIATION}`, 'is-shades-pdp'); // GA

      activate();
    }
  });
};

waitForApp().then((data) => {
  // Make data global
  share(data);


  pollAndFire();
});
