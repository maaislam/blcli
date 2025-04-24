/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import Promise from 'promise-polyfill';
import { getPageType } from './lib/services';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

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
      '.delivery-tab.delivery-pickup',
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
  const pollerElements = getPollerElements(pageType);
  if (pollerElements) {
    pollerLite(pollerElements, () => {
      const { ID, VARIATION } = shared;
      events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
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

waitForApp().then(() => {
  // Change GA reference if Russian site
  const isRussianSite = /https?:\/\/my\.avon\.ru\/*/.test(window.location.href);
  if (isRussianSite) events.setPropertyId('UA-142145223-2');

  pollAndFire();
});
