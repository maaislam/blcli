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

const { ID, VARIATION } = shared;

events.setPropertyId('UA-142145223-1');

const pollAndFire = () => {
  pollerLite([
    '.ProductDetail',
    '.ListPrice',
  ], () => {
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');

    if(VARIATION != 'control') {
      activate();
    }
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

waitForApp().then((data) => {
  share(data);
  pollAndFire();
});
