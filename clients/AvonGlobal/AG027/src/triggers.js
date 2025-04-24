/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import Promise from 'promise-polyfill';
import activate from './lib/experiment';
import { events, pollerLite } from '../../../../lib/utils';
import shared from './lib/shared';

/**
 * Resolves when a page type is found
 * @returns {Promise}
 */
const isQualified = () => {
  // Run on PDP and PLP
  // PLP
  const categoryPage = new Promise((resolve, reject) => {
    pollerLite(['.Controller_Category'], resolve, { timeout: 10000 });
  });

  // PLP type 2
  const groupPage = new Promise((resolve, reject) => {
    pollerLite(['.Controller_Group'], resolve, { timeout: 10000 });
  });

  // PDP
  const productPage = new Promise((resolve, reject) => {
    pollerLite(['.Controller_Product'], resolve, { timeout: 10000 });
  });

  return Promise.race([categoryPage, groupPage, productPage]);
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

waitForApp()
  .then(() => {
    isQualified()
      .then(() => {
        const { ID, VARIATION } = shared;

        // Change GA reference if Russian site
        const isRussianSite = /https?:\/\/my\.avon\.ru\/*/.test(window.location.href);
        if (isRussianSite) events.setPropertyId('UA-142145223-2');

        events.send(`${ID}-${VARIATION}`, 'did-meet-conditions');
        activate();
      });
  });
