/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { waitForApp } from '../../../../lib/utils/avon';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

events.setPropertyId('UA-142145223-1');

const { ID, VARIATION } = shared;

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    '.ProductDetail',
    '.ListPrice',
  ], () => {

    const { ID, VARIATION } = shared;
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
  });

  pollerLite([
    'pdp-shade-selector',
  ], () => {
    events.send(`${ID}-${VARIATION}`, 'is-shades-pdp');

    const addToCartScope = $('.AddToCart').scope();
    if(addToCartScope) {
      const isConditionalProduct = addToCartScope.isConditional();
      if(!isConditionalProduct) {
        events.send(`${ID}-${VARIATION}`, 'not-conditional-product'); // GA
      }
    }
  }, {
    timeout: 5000
  });
};

waitForApp().then(() => {
  pollAndFire();
});
