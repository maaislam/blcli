/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from '../../../../../core-files/shared';
import { h, render, Component } from 'preact';
import ReactComponent from './components/ReactComponent';
import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from '../../../../../lib/utils';

const waitForElm = async (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      resolve(document.querySelector(selector));
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  });
};

const removeDuplicate = () => {
  if (document.querySelector(`.${shared.ID}__component`) && sessionStorage.getItem('loggedIn') === 'Yes') {
    document.querySelectorAll(`.${shared.ID}__component`).forEach((elem) => {
      elem.remove();
    });
  }
};

const runChanges = () => {
  // Declare container markup for Component to sit inside
  const markup = `
    <div class="${shared.ID}__component">
    
    </div>
  `;

  // Get element from page where the component will sit
  const elementOnPage = document.querySelector(`[data-test-id="check-branch-stock-btn"]`);
  if (elementOnPage) {
    // Insert wrapper markup
    elementOnPage.insertAdjacentHTML('afterend', markup);
    // Grab wrapper element
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    // Render Component to wrapper
    if (reactWrapper) {
      render(<ReactComponent />, reactWrapper);
    }
  }

  const mobileElement = document.querySelector(`[class^="ProductDetailMobile__OrderButtonsWr"]`);
  if (mobileElement) {
    mobileElement.insertAdjacentHTML('afterend', markup);
    const reactWrapper = document.querySelector(`.${shared.ID}__component`);
    console.log('in');
    if (reactWrapper) {
      render(<ReactComponent />, reactWrapper);
    }
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');
  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    // if (document.querySelector(`.${shared.ID}__component`) && sessionStorage.getItem('loggedIn') === 'Yes') {
    //   document.querySelector(`.${shared.ID}__component`).remove();
    // }
    runChanges();
    fireEvent('Experiment running');
  };

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    fireEvent('Control running');
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();

  // Poll and re-run init
  pollerLite(['#app-container', `[data-test-id="check-branch-stock-btn"]`], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        removeDuplicate();
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            waitForElm(`[data-test-id="check-branch-stock-btn"]`).then(() => {
              init();
            });
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
