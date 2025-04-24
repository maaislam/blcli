/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import minusQty from './components/minusQty';
import plusQty from './components/plusQty';
import quantityHandler from './helpers/clickHandler';
import { getParentCategory } from './helpers/utils';

const { ID, VARIATION } = shared;

const init = (rerenderCall = false) => {
  if (VARIATION == 'control') {
    return;
  }

  pollerLite([() => typeof window.blDataLayer !== 'undefined', () => !document.querySelector('[data-qaid="loader"]')], () => {
    //console.log('blDataLayer init', window.blDataLayer);

    const { pageType } = window.blDataLayer;
    if (pageType === 'plp') {
      //change position of specs block
      !rerenderCall && fireEvent('Conditions Met');
      if (VARIATION === 'control') return;
      const productCards = document.querySelectorAll('[data-qaid="product-card"]');
      productCards.forEach((card) => {
        const qtyAlreadyIncreased = card.querySelector('[data-qaid="qa-stepper-decrement"]');
        const experimentContainer = card.querySelector(`.${ID}__quantitycontainer`);
        if (qtyAlreadyIncreased && experimentContainer) {
          experimentContainer.querySelector(`.${ID}__quantity-minuscontainer`)?.remove();
          experimentContainer.querySelector(`.${ID}__quantity-pluscontainer`)?.remove();
          experimentContainer.classList.remove(`${ID}__quantitycontainer`);
          return;
        }

        if (card.querySelector(`.${ID}__quantity-minuscontainer`)) return;

        const anchorPoint = card.querySelector('label[for^="product-quantity"]');
        if (!anchorPoint) return;
        anchorPoint.parentElement.classList.add(`${ID}__quantitycontainer`);

        anchorPoint.insertAdjacentHTML('beforebegin', minusQty(ID));
        anchorPoint.insertAdjacentHTML('afterend', plusQty(ID));
      });
    }
  });
};

export default () => {
  if (!document.documentElement.classList.contains(`${ID}`)) {
    document.body.addEventListener('click', (e) => {
      const { target } = e;

      setTimeout(() => {
        init(true);
      }, 1000);
      if (target.closest(`.${ID}__quantitycontainer`)) {
        quantityHandler(ID, target);
      }
    });
  }
  setup();
  fireEvent('Conditions Met');
  setTimeout(() => {
    getParentCategory();
    init();
  }, 2000);

  // Poll and re-run init
  pollerLite(['#__next'], () => {
    const appContainer = document.querySelector('#__next');
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            getParentCategory();
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
