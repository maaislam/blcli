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
import renderBtnsBlock from './components/buttonBlock';
import { getCookie, localStorageSave, localStorageGet, setCookie } from './helpers/storage';
import triggerEvent from './helpers/triggerEvent';

const { ID, VARIATION } = shared;

const init = (mutation) => {
  // Experiment Code...
  setup();

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
  const runTest = () => {
    const isLoggedIn = getCookie('isLoggedIn');
    const userSeenTest = localStorageGet('TP229-usertype');
    if ((!isLoggedIn || isLoggedIn == 'false') && !userSeenTest) {
      return true;
    }
  };
  //console.log(runTest());
  if (mutation.addedNodes.length > 0) {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType != 3) {
        if (node.matches('[class^="DeliveryAddressSelector__StyledButtonWr-sc"]') && runTest()) {
          const btnContainer = document.querySelector('[class^="DeliveryAddressSelector__StyledButtonWr-sc"]');

          renderBtnsBlock(ID, btnContainer);
          fireEvent('Conditions Met');
        }
      }
    });
  }
};

export default () => {
  setup();
  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    fireEvent('Test Code Fired');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        init(mutation);
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
    document.body.addEventListener('click', (e) => {
      const applyBtn = document.querySelector('[class^="DeliveryAddressSelector__ApplyButton-sc"] button');
      const target = e.target;
      const tradeBtn = '.trade--btn';
      const diyBtn = '.diy--btn';
      const neitherBtn = '.neither--btn';
      if (target.matches(tradeBtn) && applyBtn) {
        triggerEvent('trade', fireEvent, localStorageSave, setCookie);

        //for var =2 /////

        const signinBtn =
          document.querySelector('[class^="ControlsBarDesktopstyled__AccountLink-sc"] a') ||
          document.querySelector('[data-test-id="header-account-button"]');

        signinBtn.click();
        //for var =2 ////
      } else if (target.matches(diyBtn) && applyBtn) {
        triggerEvent('diy', fireEvent, localStorageSave, setCookie);
      } else if (target.matches(neitherBtn) && applyBtn) {
        triggerEvent('neither', fireEvent, localStorageSave, setCookie);
      }
    });
  });
};
