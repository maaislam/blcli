/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import Promise from 'promise-polyfill';
import { events, pollerLite } from '../../../../lib/utils';
import { share } from './lib/services';
import shared from './lib/shared';

// Global UA account
events.setPropertyId('UA-142145223-1');

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

// Run when conditions met
if(window.location.pathname.match(/onlinecatalog/)) {
  waitForApp()
    .then((data) => {
      const { ID, VARIATION } = shared;

      const rootScope = data['rootScope'];

      rootScope.$on('CartService_GetCartSuccess', () => {
        events.send(`${ID}`, 'did-meet-conditions');
      });

    });
}
