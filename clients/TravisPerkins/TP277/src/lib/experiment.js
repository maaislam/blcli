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

const { ID, VARIATION } = shared;

const init = () => {
  const isPdp = window.location.pathname.includes('/p/');

  if (!isPdp) {
    return;
  }
  const validSkus = ['880480', '685222', '336489', '719838', '228498', '848598', '760051', '760054', '760084', '760046'];
  const sku = window.location.pathname.split('/').pop();
  const isValidSku = validSkus.includes(sku);

  if (!isValidSku) return;
  // Experiment Code...
  setup();

  fireEvent('Conditions Met');
  if (VARIATION === 'control') {
    return;
  }

  document.body.classList.add(`${ID}__validsku`);

  const videoElemText = document.querySelector('[class*="PDPDemoUpButton__DemoUpButtonLabel"]');

  const isMobile = !!document.querySelector('.MobileLayout__PageWrapper-sc-17hsgm3-0');
  if (!videoElemText && isMobile) {
    //render span with label

    document.body.classList.add(`${ID}__mobile-label`);
  }
};

export default () => {
  setup();
  setTimeout(() => {
    document.body.classList.remove(`${ID}__validsku`);
    init();
  }, 2000);

  document.body.addEventListener('pointerup', (e) => {
    const { target } = e;
    if (target.closest('#demoup_stage2_script')) {
      fireEvent('User interacts with watch video cta', shared);
    } else if (target.closest('.demoupUI-close') && target.closest('.demoupUI-popup')) {
      fireEvent('User interacts with close cta', shared);
    } else if (
      target.closest('button[data-test-id="view-less-button"]') &&
      target.closest('div[data-test-id="product-overview"]')
    ) {
      fireEvent('User interacts with view less on the overview', shared);
    } else if (
      target.closest('button[data-test-id="view-more-button"]') &&
      target.closest('div[data-test-id="product-overview"]')
    ) {
      fireEvent('User interacts with view more on the overview', shared);
    } else if (target.closest('.demoupUI-item') && target.closest('.demoupUI-popup')) {
      fireEvent('User interacts with other video content', shared);
    }
  });

  // Poll and re-run init
  pollerLite(['#app-container', '[class^="PDPDemoUpButton__DemoUpButtonWrapper"]'], () => {
    const appContainer = document.querySelector('#app-container');

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            document.body.classList.remove(`${ID}__validsku`);
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
