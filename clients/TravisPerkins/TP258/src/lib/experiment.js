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
import { getCookie } from '../../../../../lib/utils';
import { finalBanner } from './files/finalBanner';
import { isMobile } from './files/data';

const { ID, VARIATION } = shared;
// check cookie if your sign in
const isLoggedIn = () => !!getCookie('access_token');
// check cookie if user seen banner already
const isVariationShown = () => !!getCookie('banner_shown');

const init = () => {
  console.log('BL TP258 - Trade Counter instruction banner: v: 01');
  // Experiment Code...
  setup();

  // Codition to remove banner
  if (
    !isLoggedIn() ||
    isVariationShown() ||
    isMobile() ||
    window.location.pathname.indexOf('/tc/') == -1 ||
    window.location.pathname.includes('/tc/basket') ||
    window.location.pathname.includes('/tc/payment')
  ) {
    setTimeout(() => {
      if (document.querySelector(`.${ID}__banner-container`)) {
        document.querySelector(`.${ID}__banner-container`).remove();
        return;
      }
    }, 100);
  }

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

  // show banner if user net condition
  if (
    isLoggedIn() &&
    !isMobile() &&
    window.location.pathname.indexOf('/tc/') > -1 &&
    !window.location.pathname.includes('/tc/basket') &&
    !window.location.pathname.includes('/tc/payment') &&
    !document.querySelector(`.${ID}__banner-container`) &&
    !isVariationShown()
  ) {
    document.querySelectorAll('div[data-test-id="order-hub-header"]')[0].insertAdjacentHTML('afterend', finalBanner(ID));
    sessionStorage.setItem('banner_shown_initially', true);
  }
  // Add cookie if user has seen the banner already
  if (sessionStorage.getItem('banner_shown_initially') === 'true' && window.location.pathname.indexOf('/tc/') == -1) {
    document.cookie = 'banner_shown=true; expires=Thu, 18 Dec 2027 12:00:00 UTC';
  }

  // Add eventlistener if user click on close CTA
  document.body.addEventListener('click', function (el) {
    if (el.target.className == 'close-btn') {
      document.cookie = 'banner_shown=true; expires=Thu, 18 Dec 2027 12:00:00 UTC';
      document.querySelector(`.${ID}__banner-container`).remove();
    }
  });
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(['#app-container', '[data-test-id="order-hub-header"]'], () => {
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

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 500);
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
