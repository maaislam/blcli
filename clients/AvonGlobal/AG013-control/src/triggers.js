/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import Promise from 'promise-polyfill';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

/**
 * Poll for elements the run experiment
 */
const pollAndFire = () => {
  pollerLite([
    '[ng-controller="CartController"]',
  ], () => {
    const { ID, VARIATION } = shared;

    const isRussianSite = /https?:\/\/my\.avon\.ru\/*/.test(window.location.href);
    if (isRussianSite) events.setPropertyId('UA-142145223-1');

    events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
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

waitForApp().then(() => {
  pollAndFire();
});
