/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { Fragment, h, render } from 'preact';
import 'preact/debug';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { setup, fireEvent } from '../../../../../core-files/services';


// Components
import { PDPLogInLogOut } from './Components/PDP/index';
import { showBlackFridayOffer } from './Components/PLP/index';

// Utils

// Data

const runChanges = () => {
  if (document.querySelector('[data-test-id="plp-wrapper"]')) {
    showBlackFridayOffer();
  }

  /** ******************************
   ***** App Start *****
   ****************************** */
  const PDP = () => (
    <Fragment>
      <PDPLogInLogOut />
    </Fragment>
  );

  /** ******************************
   ***** App End *****
   ****************************** */

  /** ******************************
   ***** Placement On Page Start *****
   ****************************** */
  if (document.querySelector('[data-test-id="pdp-wrapper"]')) {
    const idOrNameOfPlacementOnPage = '[data-test-id="price"]';
    document.querySelector('[data-test-id="login-or-register-block"]').remove();
    const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);

    placementonPage.insertAdjacentHTML(
      'beforeend',
      "<div data-test-id='login-or-register-block' id='root'></div>",
    );
    render(<PDP />, document.getElementById('root'));
  }
  /** ******************************
   ***** Render App End *****
   ****************************** */
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION === 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  runChanges();

  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(((mutations) => {
      mutations.forEach((mutation) => {
        if (oldHref !== document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            runChanges();
          }, 2000);
        }
      });
    }));

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
