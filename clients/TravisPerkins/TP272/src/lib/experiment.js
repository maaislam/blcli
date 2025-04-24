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
  // Experiment Code...
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  //setinterval that stops ater 5 seconds
  // Function to be executed by setInterval

  const signuoElems = document.querySelectorAll('#bottom-account-credit [class^="HomepageSignUp__AttributeWr"]');
  signuoElems.forEach((item, i) => {
    const signupMessageElem = item.querySelector('[data-test-id="account-attr-credit"]');
    if (i === 1) {
      signupMessageElem.innerHTML = 'Up to 60 days credit <br/>(Ts & Cs apply)';
    }
    if (i === signuoElems.length - 2) {
      signupMessageElem.innerText = 'Personalised trade prices';
    }
    // if (i === signuoElems.length - 2) {
    //   signupMessageElem.closest('[class^="HomepageSignUp__AttributeWr"]').style.display = 'none';
    // }
  });
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
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
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
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest('[id^="monetate_selectorBanner"]') || target.closest('[data-test-id="account-link-credit"]')) {
      console.log('Customer Clicks “Create Credit Account”');
    } else if (target.closest('[data-test-id="call-out-block-link"]')) {
      fireEvent('Customer Clicks homepage banner');
    }
  });
};
