/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION } = shared;

const init = () => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  document.body.addEventListener('click', function (e) {
    const target = e.target;

    if (target.matches('[data-test-id="show-all-results-btn"]') || target.closest('[data-test-id="show-all-results-btn"]')) {
      fireEvent('user clicked see all results in the lightbox', true);
    } else if (target.matches('[href^="/search/?"]') || target.closest('[href^="/search/?"]')) {
      fireEvent('user clicked arrow, numbers or ellipsis in the new pagination area', true);
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    document.body.addEventListener('click', function (e) {
      const target = e.target;
      console.log(target);
      if (target.matches('[data-test-id="show-all-results-btn"]') || target.closest('[data-test-id="show-all-results-btn"]')) {
        fireEvent('user clicked see all results in the lightbox', true);
      }
    });
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;

        document.body.classList.remove(`${shared.ID}`);

        setTimeout(() => {
          // -----------------------------------
          // Timeout ensures router has started to rebuild DOM container
          // and we don't fire init() too early
          // -----------------------------------
          init();
        }, 2000);
      }
    });

    const config = {
      childList: true,
      subtree: false,
    };

    observer.observe(appContainer, config);
  });
};
