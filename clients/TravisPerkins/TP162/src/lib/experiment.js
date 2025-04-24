/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, isLoggedIn } from './services';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const init = () => {
  if (!window.location.pathname.match(/(\/)(trade-offers).*/)) {
    return;
  }

  pollerLite(['[class^=PLPDesktop__ProductListWrapper]'], () => {
    setup();

    // Remove any existing elements each time this runs
    const existingBanner = document.querySelector(`.${shared.ID}-banner`);
    if (existingBanner) {
      existingBanner.parentNode.removeChild(existingBanner);
    }

    const bannerMarkup = `
      <div class="${shared.ID}-banner">
        <div class="${shared.ID}-banner__logo">
          <div class="${shared.ID}-banner__logo--text">TP DIRECT</div>
        </div>
        <div class="${shared.ID}-banner__text">
          <div class="${shared.ID}-banner__text--pri">
            Order before 2pm for delivery within 72 hours
          </div>
          <div class="${shared.ID}-banner__text--sec">
            Exclusive for Trade Customers only
          </div>
        </div>
        <div class="${shared.ID}-banner__btn">
          <div class="${shared.ID}-banner__btn--login">
            <div class="${shared.ID}-banner__btn--login--text">
              LOGIN
            </div>
          </div>
        </div>
      </div>
    `;

    const bannerMarkupLoggedIn = `
      <div class="${shared.ID}-banner">
        <div class="${shared.ID}-banner__logo">
          <div class="${shared.ID}-banner__logo--text">TP DIRECT</div>
        </div>
        <div class="${shared.ID}-banner__text">
          <div class="${shared.ID}-banner__text--pri">
            Order before 2pm for delivery within 72 hours
          </div>
          <div class="${shared.ID}-banner__text--sec">
            Exclusive for Trade Customers only
          </div>
        </div>
      </div>
    `;

    const loginLinkClick = () => {
      const existingLinkButton = document.querySelector('[class^=HeaderControlBar__LinkButton]');

      if (existingLinkButton) {
        existingLinkButton.click();
      }
    };

    const plpDesktopBody = document.querySelector('[class^="PLPDesktop__PLPBody"]');

    const loggedIn = document.cookie.match(/access_token=[\w\d]+/i);

    if (loggedIn) {
      if (plpDesktopBody) {
        plpDesktopBody.insertAdjacentHTML('beforebegin', bannerMarkupLoggedIn);
      }
    } else {
      if (plpDesktopBody) {
        plpDesktopBody.insertAdjacentHTML('beforebegin', bannerMarkup);

        const btn = document.querySelector(`.${shared.ID}-banner__btn`);
        if (btn) {
          btn.addEventListener('click', loginLinkClick);
        }
      }
    }
  });
};

export default () => {
  init();

  // -----------------------------
  // Now also re-run when observers fire
  // Because site is an SPA
  // -----------------------------
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
};
