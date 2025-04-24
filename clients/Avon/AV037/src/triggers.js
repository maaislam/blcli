/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { waitForApp } from '../../../../lib/utils/avon';
import { share } from './lib/services';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    '[ng-controller="CartController"]',
    '.Cart-Footer .Cart-ButtonsBottom',
    '.Cart-Product',
  ], () => {
    const { ID, VARIATION } = shared;
    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    activate();
  });
};

/**
 * Resolve promise when the cart scope has loaded
 * @returns {Promise}
 */
const waitForCartScope = () => new Promise((resolve, reject) => {
  pollerLite(['[ng-controller="CartController"]'], () => {
    pollerLite([
      () => !!$('[ng-controller="CartController"]').scope()?.CartData?.Campaigns,
    ], resolve);
  });
});


Promise.all([waitForApp(), waitForCartScope()]).then((data) => {
  // Make data global
  const cartScope = $('[ng-controller="CartController"]').scope();
  share({ cartScope });
  share(data[0]);

  const { FREE_DELIVERY_THRESHOLD } = shared;

  if (cartScope.CartData.SubTotal >= FREE_DELIVERY_THRESHOLD) {
    pollAndFire();
  } else {
    const watchSubtotal = cartScope.$watch('CartData.SubTotal', (value) => {
      if (value >= FREE_DELIVERY_THRESHOLD) {
        watchSubtotal();
        pollAndFire();
      }
    });
  }
});
