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
import loginBanner from './components/loginBanner';

import loginPromoData from './data';

const { ID, VARIATION } = shared;

const init = (mutation) => {
  if (
    localStorage.getItem('TP229-usertype') !== 'trade' ||
    localStorage.getItem('TP229-usertype') === null ||
    location.pathname !== '/' ||
    document.querySelectorAll('[data-test-id="account-menu-wrapper"]').length > 0
  ) {
    document.querySelectorAll(`.${ID}__loginbanner`).forEach((banner) => {
      banner?.remove();
    });
    return;
  }

  setup();

  if (VARIATION == 'control') {
    localStorage.getItem('TP229-usertype') == 'trade' && fireEvent('Conditions Met');
    return;
  }
  fireEvent('Conditions Met');

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const anchorElem = document.querySelector('[data-test-id="header-nav-menu"]');
  loginBanner(ID, anchorElem, loginPromoData);
};

export default () => {
  // Poll and re-run init
  document.querySelectorAll(`.${ID}__loginbanner`).forEach((banner) => {
    banner?.remove();
  });
  setTimeout(() => {
    init();
  }, 2000);

  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    document.body.addEventListener('click', (e) => {
      const target = e.target;
      //console.log(target);
      const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);
      const showHidebanner = (display) => {
        const banner = document.querySelector(`.${ID}__loginbanner`);
        const closedBanner = document.querySelector(`.${ID}__loginbanner--closed`);
        const openedBannerMsg = document.querySelector(`.${ID}__loginbanner--msg`);
        const openedBannerForm = document.querySelector(`.${ID}__loginbanner--form`);
        if (display === 'hide') {
          openedBannerMsg.classList.add(`${ID}__hide`);
          openedBannerForm.classList.add(`${ID}__hide`);
          closedBanner.classList.remove(`${ID}__hide`);
          banner.classList.add(`${ID}__animate-close`);
          banner.classList.remove(`${ID}__animate-open`);
          openedBannerForm.classList.add(`${ID}__invisible`);
          setTimeout(() => {
            closedBanner.classList.remove(`${ID}__invisible`);
          }, 500);
        } else {
          closedBanner.classList.add(`${ID}__hide`);
          openedBannerMsg.classList.remove(`${ID}__hide`);
          openedBannerForm.classList.remove(`${ID}__hide`);
          banner.classList.remove(`${ID}__animate-close`);
          banner.classList.add(`${ID}__animate-open`);
          setTimeout(() => {
            openedBannerForm.classList.remove(`${ID}__invisible`);
            closedBanner.classList.add(`${ID}__invisible`);
          }, 500);
        }
      };

      if (targetMatched(`.${ID}__banner-close`)) {
        showHidebanner('hide');
        fireEvent('Customer clicks close');
      } else if (targetMatched(`.${ID}__banner-open`)) {
        fireEvent('Customer clicks login');
        showHidebanner();
      } else if (targetMatched(`.${ID}__signup--btn`)) {
        fireEvent('Customer clicks register');
      }
    });

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // console.log(mutation);

        if (oldHref != location.href) {
          oldHref = location.href;
          document.querySelectorAll(`.${ID}__loginbanner`).forEach((banner) => {
            banner?.remove();
          });
          setTimeout(() => {
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
