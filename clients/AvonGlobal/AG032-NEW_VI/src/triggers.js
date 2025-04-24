/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import Promise from 'promise-polyfill';
import activate from './lib/experiment';
import { share, getPageType } from './lib/services';
import { events, pollerLite, observePageChange } from '../../../../lib/utils';
import shared from './lib/shared';

events.setPropertyId('UA-142145223-1');

/**
 * Get elements to poll for based on the
 * page type
 * @param {String} pageType
 * @returns {Array}
 */
const getPollerElements = (pageType) => {
  const pollerElementsByPageType = {
    checkout: [
      '#section_items .title',
      '.section-subtotal',
      '.section-delivery',
      'mvp-delivery-selection',
      'mvp-payment-selection',
      '[ng-show="!VM.ShowAddressForm && VM.SelectedShippingOption && VM.SelectedPaymentOption"]',
    ],
    checkoutLogin: [
      '.container-login',
    ],
    default: undefined,
  };
  return pollerElementsByPageType[pageType];
};

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  const pageType = getPageType();
  share({ pageType });
  const pollerElements = getPollerElements(pageType);
  if (pollerElements) {
    pollerLite(pollerElements, () => {
      const { ID, VARIATION } = shared;

      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');

      if(VARIATION != 'control') {
        activate();
      }
    });
  }
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

waitForApp().then((data) => {
  // Make data global
  share(data);

  if(window.location.pathname.match(/checkoutmobile/)) {
    sessionStorage.setItem(`${shared.ID}-visited-checkoutmobile`, 1);

    pollAndFire();

    observePageChange(document.body, (p) => {
      pollAndFire();
    })
  } else if(window.location.pathname.match(/checkoutdirectdelivery\/prihlaseni\/?$/i) && sessionStorage.getItem(`${shared.ID}-visited-checkoutmobile`)) {
    window.location.href = '/checkoutmobile/';
  } else if(window.location.pathname.match(/checkoutdirectdelivery\/doruceni\/?$/i) && sessionStorage.getItem(`${shared.ID}-visited-checkoutmobile`)) {
    window.location.href = '/checkoutmobile/';

    return;
  }
});
