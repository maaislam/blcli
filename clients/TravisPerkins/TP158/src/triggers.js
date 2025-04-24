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
    shared.REQUIRED_SELECTOR,
    () => {
      return !!window.ga;
    }
  ], () => {
    // URL targeting
    if(/^(\/)((product).*|(.*(\/p\/).*)|(search).*|)$/.test(window.location.pathname)) {

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

        const f1 = document.querySelector('.tp158-banner-field-wrapper');
        if(f1) {
          f1.parentNode.removeChild(f1);
        }
        const f2 = document.querySelector('.tp158-banner-text-second');
        if(f2) {
          f2.parentNode.removeChild(f2);
        }

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
