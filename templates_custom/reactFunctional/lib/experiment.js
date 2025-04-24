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
import { h, render } from 'preact';
import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from '../../../../../lib/utils';

// Components
import { App } from './App';

// Utils

// Data

const conditionsMet = () => {};

const runChanges = () => {
  const idOrNameOfPlacementOnPage = '[data-test-id="check-branch-stock-btn"]';
  const placementonPage = document.querySelector(idOrNameOfPlacementOnPage);
  placementonPage.insertAdjacentHTML('afterend', "<div id='root'></div>");

  render(<App />, document.getElementById('root'));
  conditionsMet();
};

export default () => {
  setup();

  // Fire event when code is loaded
  fireEvent('Test Code Fired');

  if (shared.VARIATION === 'control') {
    conditionsMet();
    return;
  }

  if (!document.querySelector('#root')) {
    runChanges();
  }

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');
    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
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
    });
    const config = {
      childList: true,
      subtree: true,
    };
    observer.observe(appContainer, config);
  });
};
