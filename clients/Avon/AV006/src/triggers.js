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

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    '#CartPage',
    '.Cart-Products .Cart-Product',
  ], () => {
    const cartScope = $('#CartPage').scope();
    const hasOffers = (cartScope.CartData.QualifiedPromotions.length + cartScope.CartData.PartQualifiedPromotions.length) > 0;
    const hasFreeGift = !!$('.Cart-Products .Cart-Product')
      .filter((index, element) => $(element).scope()?.product?.ProductTotal === 0)
      .length;

    if (hasOffers || hasFreeGift) {
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
      activate();
    }
  });
};

waitForApp().then((data) => {
  share(data);
  pollAndFire();
});
