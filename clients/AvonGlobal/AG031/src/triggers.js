/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import Promise from 'promise-polyfill';
import activate from './lib/experiment';
import { share } from './lib/services';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

events.setPropertyId('UA-142145223-1');

const isSpecialOfferUrl = (url) => {
  const isSK = url.indexOf('specialne-ponuky') !== -1;

  if (isSK) return /specialne-ponuky/.test(url);
  return /special-offers/.test(url);
};

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['body'], () => {
    const { ID, VARIATION } = shared;

    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');

    // Send event so we know how many offers there are
    const completeOffers = (shared.cartScope?.CartData?.QualifiedPromotions || []);
    const completeOffersFiltered = completeOffers.filter((p) => !!p.Url && isSpecialOfferUrl(p.Url));
    const numCompleteOffers = completeOffers.length;
    const numUsableCompleteOffers = completeOffersFiltered.length;

    const partialOffers = (shared.cartScope?.CartData?.PartQualifiedPromotions || []);
    const partialOffersFiltered = partialOffers.filter((p) => !!p.Url && isSpecialOfferUrl(p.Url));
    const numPartialOffers = partialOffers.length;
    const numUsablePartialOffers = partialOffersFiltered.length;

    if(numUsableCompleteOffers + numUsablePartialOffers > 0) {
      events.send(`${ID}-${VARIATION}`, `offers-will-show`);
    }

    if(numUsableCompleteOffers + numUsablePartialOffers == 0 && numCompleteOffers + numPartialOffers > 0) {
      events.send(`${ID}-${VARIATION}`, `all-offers-missing-urls`);
    } else if(
      (numUsableCompleteOffers + numUsablePartialOffers < numCompleteOffers + numPartialOffers)
      &&
      (numCompleteOffers + numPartialOffers > 0)
    ) {
      events.send(`${ID}-${VARIATION}`, `some-offers-missing-urls`);
    }

    if(shared.VARIATION != 'control') {
      // Activate for non control variants
      activate();
    }
  });
};

/**
 * Resolve promise when the app has loaded
 * @returns {Promise}
 */
const waitForApp = () => new Promise((resolve) => {
  pollerLite([
    () => window.angular?.element,
    () => window.AppModule?.RootScope,
    () => window.AppModule?.RootScope?.$on,
  ], (elements) => {
    const [$, rootScope] = elements;
    resolve({ $, rootScope });
  });
});

/**
 * Resolve promise when the cart scope has loaded
 * @returns {Promise}
 */
const waitForCartScope = () => new Promise((resolve) => {
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
  pollAndFire();
});
