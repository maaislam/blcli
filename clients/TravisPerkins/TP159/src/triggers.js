/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from './lib/shared';

const pollAndRun = () => {
  pollerLite([
    'body',
    () => {
      return !!window.ga;
    }
  ], () => {
    // URL targeting
    if(window.location.pathname.match(/\/p\/\d+/ig) {

      // Run
      activate();
    }
  });
};

pollerLite([
  '#app-container',
], () => {
  const appContainer = document.querySelector('#app-container');

  // ------------------------------------
  // Poll and run on initial page load
  // ------------------------------------
  pollAndRun();

  // ------------------------------------
  // Added Poller:
  // Checks for page changes and checks
  // to see if the URL has changed
  // ------------------------------------
  let oldHref = document.location.href;
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;

        document.body.classList.remove(`${shared.ID}`);

        pollAndRun();
      }
    });
  });

  const config = {
      childList: true,
      subtree: true
  };

  observer.observe(appContainer, config);
});
