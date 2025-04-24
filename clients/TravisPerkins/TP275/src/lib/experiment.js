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
import { tradeContainer } from './components/tradeContainer';
import quantityHandler from './handlers/quantityHandler';
import initSwiper from './helpers/initSwiper';
import swiper from './helpers/swiper';
import { addForDelivery } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 3000;
const init = () => {
  const loggedIn = sessionStorage.getItem('loggedIn') === 'Yes';

  const tradeUser = sessionStorage.getItem('loggedInType') === 'TCC';

  if (window.location.pathname !== '/' || loggedIn || tradeUser) {
    //remove test DOM
    const testDOM = document.querySelector(`.${ID}__tradeContainer`);
    if (testDOM) testDOM.remove();
    return;
  }

  fireEvent('Conditions Met');
  // Experiment Code...

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

  pollerLite(
    [
      () => typeof window.Swiper === 'function',
      () => document.querySelectorAll('[data-test-id="homepage-main"] [class*="CmsContainerItem__ContainerItem"]').length > 5,
    ],
    () => {
      const attachpoint = document.querySelectorAll(
        '[data-test-id="homepage-main"] [class*="CmsContainerItem__ContainerItem"]'
      )[1];
      if (!attachpoint) return;
      attachpoint.insertAdjacentHTML('beforebegin', tradeContainer(ID));
      initSwiper(`.${ID}__tradeProdsList`);
    }
  );
};

export default () => {
  setup();
  swiper();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    quantityHandler(ID, target);
    if (target.closest(`.${ID}__atcContainer`)) {
      // const parentElement = target.closest(`.${ID}__tradeProdItem`);
      // const atcBtn = parentElement.querySelector(`.${ID}__atcContainer`);
      // const sku = parentElement.dataset.sku;
      // const quantity = parentElement.querySelector(`.${ID}__quantity-val`).innerText;
      // atcBtn.classList.add('adding');
      // addForDelivery(sku, Number(quantity)).then(() => {
      //   fireEvent('User adds product to bag from Carousel');
      //   atcBtn.classList.remove('adding');
      //   window.location.reload();
      // });
      window.location.href = '/login';
    } else if (target.closest('.content-wrapper')) {
      fireEvent('User interacts with product and views PDP');
    }
  });

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  pollerLite(['#app-container'], () => {
    const appContainer = document.querySelector('#app-container');

    let oldHref = document.location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          setTimeout(init, DOM_RENDER_DELAY);
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
