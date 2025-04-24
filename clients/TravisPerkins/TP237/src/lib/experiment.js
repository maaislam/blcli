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
import reviewBanner from './components/reviewBanner';
import reviews from './components/reviews';
import { initExternalLib } from './helpers/addExternalLib';
import initSwiper from './helpers/initSwiper';
import obsIntersection from './helpers/observeIntersection';
import { swiperConfig } from './helpers/swiperConfigs';
import { reviewData } from './reviewData';

const { ID, VARIATION } = shared;

const init = () => {
  if (location.pathname.indexOf('/cart') !== -1 || location.pathname.indexOf('/checkout') !== -1) return;
  // Experiment Code...
  setup();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const isPDP = () => !!document.querySelector('[data-test-id="pdp-wrapper"]');
  if (VARIATION == 'control') {
    if (location.pathname === '/' || isPDP()) {
      fireEvent('Conditions Met');
    }
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const isMobile = !!document.querySelector('[class^="MobileMenustyled__Wrapper-sc"]');

  //renderBanner

  const bannerAnchor = isMobile
    ? document.querySelector('[data-test-id="header-control-bar"]') ||
      document.querySelector('[class^="ControlsBarDesktopstyled__Wrapper"]')
    : document.querySelector('[data-test-id="header-nav-menu"]');
  if (!bannerAnchor) return;
  document.querySelectorAll(`.${ID}__review-banner`).forEach((item) => {
    item?.remove();
  });
  bannerAnchor.insertAdjacentHTML('afterend', reviewBanner(ID));

  if (location.pathname === '/' || isPDP()) {
    fireEvent('Conditions Met');
    const reviewAnchor = isPDP()
      ? document.querySelector('[data-test-id="power-reviews-wrapper"]').closest('[class^="PDPStyles__Section-sc"]') ||
        document.querySelector('[data-test-id="product-reviews"]')
      : document.querySelector('footer');

    const reviewWrapper = document.querySelector(`.${ID}__reviews-wrapper`);
    !reviewWrapper && reviewAnchor.insertAdjacentHTML('beforebegin', reviews(ID, reviewData));

    //init swiper

    const swiperJs = 'https://m7cdn.io/common/js/swiper.js';
    const swiperCss = 'https://dev.m7cdn.io//common/css/swiper.css';
    const sliderContainer = `.${ID}__swiper-container`;

    const intersectionCallback = (entry) => {
      if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
        entry.target.classList.add(`${ID}__seen`);
        fireEvent('User sees Trustpilot reviews');
      }
    };
    const intersectionAnchor = document.querySelector(`.${ID}__reviews-wrapper`);

    isPDP() && intersectionAnchor.classList.add(`${ID}__pdp-adjustments`);

    initExternalLib(swiperJs, swiperCss);

    initSwiper(sliderContainer, swiperConfig(isPDP()), fireEvent);

    obsIntersection(intersectionAnchor, 0.5, intersectionCallback);

    //styling fix

    intersectionAnchor?.closest('section').classList.add(`${ID}__color-adjust`);
  }
};

export default () => {
  setTimeout(() => {
    init();
  }, 2000);

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (oldHref != location.href) {
          oldHref = location.href;

          document.body.classList.remove(`${shared.ID}`);

          document.querySelectorAll(`.${ID}__review-banner`).forEach((item) => {
            item?.remove();
          });
          document.querySelectorAll(`.${ID}__reviews-wrapper`).forEach((item) => {
            item?.remove();
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
