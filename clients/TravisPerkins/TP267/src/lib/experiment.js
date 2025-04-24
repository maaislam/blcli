/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getCookie } from './helpers/cookie';
import extractSearchTermFromURL from './helpers/extractSearchFromUrl';
import topLevelSearchtermConfig from './redirectConfig';

const { VARIATION } = shared;

const init = () => {
  const isLoggedIn = !!getCookie('access_token');
  const isTradedUser = localStorage.getItem('customerType').includes('Trade');
  if (!isLoggedIn || !isTradedUser || !window.location.href.includes('/search')) {
    return;
  }

  // Experiment Code...
  setup();

  //console.log('Conditions Met');

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

  //const plpWrapper = document.querySelector('[data-test-id="plp-wrapper"]');
  //plpWrapper.style.opacity = 0;

  //get earch term from URL
  const searchTerm = extractSearchTermFromURL(window.location.href);
  const topLevelTerms = Object.keys(topLevelSearchtermConfig);
  const topLevelTermTypedByUser = topLevelTerms.find((term) => term.includes(searchTerm.toLowerCase()));
  //plpWrapper.style.opacity = 1;
  if (!topLevelTermTypedByUser && !window.location.href.includes('/tc/search')) {
    window.location.href = `https://www.travisperkins.co.uk/tc/search/?text=${encodeURIComponent(searchTerm)}`;
  } else if (topLevelTermTypedByUser) {
    window.location.href = topLevelSearchtermConfig[topLevelTermTypedByUser].redirectTo;
  }
};

export default () => {
  setup();
  // newEvents.initiate = true;
  // newEvents.methods = ['ga4'];
  // newEvents.property = 'G-6EM3847CY9';
  // console.log('test1');
  if (document.querySelector('[data-test-id="account-menu-wrapper"]')) {
    sessionStorage.setItem('firstLogin', 'true');
    fireEvent('Conditions Met');
    sessionStorage.setItem('firstLogin', 'false');
  } else {
    sessionStorage.setItem('firstLogin', 'false');
  }

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
    if (target.closest('button') && target.closest('[data-test-id="sort-and-filters"]')) {
      fireEvent('User interacts with filters');
    } else if (target.closest('[data-test-id="sort-by"]')) {
      fireEvent('User interacts with sort by');
    } else if (target.closest('[data-test-id="suggested-search"]') && !sessionStorage.getItem('eventfiredonce')) {
      sessionStorage.setItem('eventfiredonce', 'true');
      fireEvent('Conditions Met');
    }
  });

  const searchInput = document.querySelector('[class*="Search__SearchForm"] input');
  searchInput.addEventListener('keydown', (event) => {
    // Check if the key code of the pressed key is 13 (which corresponds to the Enter key)
    if (event.keyCode === 13 && !sessionStorage.getItem('eventfiredonce')) {
      sessionStorage.setItem('eventfiredonce', 'true');
      fireEvent('Conditions Met');
    }
  });
};
