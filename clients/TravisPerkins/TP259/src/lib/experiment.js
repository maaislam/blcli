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
import { mobileBanner } from '../lib/files/mobileBanner';
import { isMobile } from '../lib/files/data';

const { ID, VARIATION } = shared;

const init = () => {

  console.log('BL - TP259 - Mobile navigation Trade Counter: v:01');

  // Experiment Code...
  setup();

  if (!isMobile()) return;

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

    const tradeCounterEl = document.querySelector('a[href="/tc"][data-test-id="trade-counter-button-menu-item"]');
    if (tradeCounterEl) {
      tradeCounterEl.addEventListener('click', () => {
        fireEvent(`Customer clicks "Trade Counter"`);
        //console.log('BL event - Customer clicks "Trade Counter"');
      })
    }

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (
    isMobile() &&
    !document.querySelector(`.${ID}__trade-counter-wrapper`) &&
    document.querySelector('[data-test-id="header-mobile-nav-menu"]')
  ) {
    //console.log('BL - Insert Variation');
    document.querySelector('[data-test-id="header-mobile-nav-menu"]').insertAdjacentHTML("beforebegin", mobileBanner(ID));
    document.querySelector(`.${ID}__trade-button`).addEventListener('click', () => {
      fireEvent(`Customer clicks View Now`);
      //console.log('BL event - Customer clicks View Now');
    })

  } else {

    if (
      document.querySelector(`.${ID}__trade-counter-wrapper`) &&
      !document.querySelector('[data-test-id="header-mobile-nav-menu"]') &&
      !isMobile()
    ) {
      //console.log('BL - remove Variation');
      document.querySelector(`.${ID}__trade-counter-wrapper`).remove();
    }
  }

};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(['#app-container', '[data-test-id="header-mobile-nav-menu"]', isMobile()], () => {
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
            //console.log('BL - Init fn call via MO');
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
