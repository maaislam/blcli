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
import { overlay } from './files/overlay';
import { getCookie } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;
const isLoggedIn = () => !!getCookie('access_token');

const init = () => {
  console.log('BL - TP260 - Hide Prices for logged out trade users: v:1.01');

  if (
    !isLoggedIn() &&
    localStorage.getItem('customerType') === '"Trade"' &&
    sessionStorage.getItem('DIY_user') !== 'true'
  ) {

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

    if (location.pathname.indexOf('/product/') > -1) {

      pollerLite(
        ['body',
          `div[data-test-id="product"] div[data-test-id="qty-selector"]`
        ], () => {

          document.querySelectorAll('div[data-test-id="product"]').forEach((target) => {

            if (!target.querySelector(`.${ID}__trade-overlay-wrapper`)) {

              if (!document.querySelector('[data-test-id="plp-wrapper"]').classList.contains('variation-added')) {
                document.querySelector('[data-test-id="plp-wrapper"]').classList.add('variation-added');
              }

              target.classList.add('plp-padlock-added');
              target.querySelector('div[data-test-id="qty-selector"]').insertAdjacentHTML("beforebegin", overlay(ID, 'plp_page'));

            }

          })

        });

    }

    if (location.pathname.indexOf('/p/') > -1) {

      pollerLite(['body', `[data-test-id="product-detail"] [data-test-id="price"]`], () => {

        if (!document.querySelector(`.${ID}__trade-overlay-wrapper`)) {
          if (!document.querySelector('[data-test-id="pdp-wrapper"]').classList.contains('variation-added')) {
            document.querySelector('[data-test-id="pdp-wrapper"]').classList.add('variation-added');
          }

          document.querySelectorAll('div[data-test-id="product-detail"] [data-test-id="price"]')[0].parentElement.insertAdjacentHTML("beforebegin", overlay(ID, 'pdp_page'));
          document.querySelectorAll('div[data-test-id="product-detail"] [data-test-id="price"]')[0].parentElement.classList.add('pdp-padlock-added');
        }

      });

    }

  }

};

export default () => {
  init();

  // click event listener
  document.addEventListener("click", function (event) {

    const { target } = event;

    // click handler for slider prev button
    if (target.closest('.DIY-user-btn')) {

      sessionStorage.setItem("DIY_user", true);
      fireEvent('Customer clicks "See prices as a DIY user"');
      window.location.reload();

    }

    if (target.closest('.log-in-btn')) {

      if (location.pathname.indexOf('/product/') > -1) {
        fireEvent('Customer clicks Login CTA on PLP page');
      }

      if (location.pathname.indexOf('/p/') > -1) {
        fireEvent('Customer clicks Login CTA on PDP page');
      }

    }

    if (target.closest('.create-account-btn')) {

      if (location.pathname.indexOf('/product/') > -1) {
        fireEvent('Customer clicks “Create an Account” CTA on PLP page');
      }

      if (location.pathname.indexOf('/p/') > -1) {
        fireEvent('Customer clicks “Create an Account” CTA on PDP page');
      }

    }

  })

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

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();

          }, 1000);
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
