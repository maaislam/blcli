/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { pollerLite } from '../../../../lib/uc-lib';
import { waitForApp } from '../../../../lib/utils/avon';
import { events } from '../../../../lib/utils';

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
      events.send('AV006-Control', 'did-meet-conditions');
    }
  });
};

waitForApp().then((data) => {
  pollAndFire();
});
