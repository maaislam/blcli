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

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite(['body'], () => {
    const { ID, VARIATION } = shared;

    const isRussianSite = /https?:\/\/my\.avon\.ru\/*/.test(window.location.href);
    if (isRussianSite) events.setPropertyId('UA-142145223-1');

    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
    if (VARIATION.toLowerCase() !== 'control') activate();
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
