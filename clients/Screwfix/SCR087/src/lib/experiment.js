/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { extractNumber, obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 2000;

const init = () => {
  //check if page is correct

  const isPlp = window.location.pathname.includes('/c/') && window.utag.data.basicPageId === 'lister Page';
  const isPdp = window.location.pathname.includes('/p/');

  if (!isPlp && !isPdp) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);
    return;
  }

  //if either page is correct, set up events

  setup();
  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/
  fireEvent('Conditions Met');

  /*****add experiment specific code here*****/

  if (isPlp) {
    const productCards = document.querySelectorAll('[data-qaid="product-card"]');
    productCards.forEach((cardElem) => {
      const hasDiscount = cardElem.querySelector('[data-qaid="productCard-was-price"]');
      if (!hasDiscount) return;

      const wasPriceText = hasDiscount.textContent;
      const nowPriceText = cardElem.querySelector('[data-qaid="price"]').textContent;

      const wasPrice = extractNumber(wasPriceText);
      const nowPrice = extractNumber(nowPriceText);

      const discount = (wasPrice - nowPrice).toFixed(2);
      const discountArrowElem = cardElem.querySelector('[data-qaid="productCard-save-price"]');
      const discountElemInner = `
      <span class="nw2ke_">Save</span><span aria-hidden="true">-</span> £${discount}</span>
      `;

      const intersectionCallback = (entry) => {
        if (entry.isIntersecting) {
          const discountType = discount >= 100 ? `over` : `under`;
          fireEvent(`PLP discount of ${discountType} £100 viewed`);
        }
      };

      obsIntersection(discountArrowElem, 1, intersectionCallback);

      if (VARIATION === 'control') return;

      if ((VARIATION === '1' && discount < 100) || (VARIATION === '2' && discount >= 100)) {
        discountArrowElem.innerHTML = discountElemInner;
      }
    });

    return;
  }

  if (isPdp) {
    const hasDiscount = document.querySelector('[data-qaid="pdp-was-price"]');

    if (!hasDiscount) return;

    const wasPriceText = hasDiscount.textContent;
    const nowPriceText = document.querySelector('[data-qaid="pdp-price"]').textContent;

    const wasPrice = extractNumber(wasPriceText);
    const nowPrice = extractNumber(nowPriceText);

    const discount = (wasPrice - nowPrice).toFixed(2);

    const discountArrowElem = document.querySelector('[data-qaid="pdp-save-price"]');
    const discountElemInner = `
      <span class="nw2ke_">Save</span><span aria-hidden="true">-</span> £${discount}</span>
      `;

    const intersectionCallback = (entry) => {
      if (entry.isIntersecting) {
        const discountType = discount >= 100 ? `over` : `under`;
        fireEvent(`PDP discount of ${discountType} £100 viewed`);
      }
    };

    obsIntersection(discountArrowElem, 1, intersectionCallback);

    if (VARIATION === 'control') return;

    if ((VARIATION === '1' && discount < 100) || (VARIATION === '2' && discount >= 100)) {
      discountArrowElem.innerHTML = discountElemInner;
    }

    return;
  }
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }
  /*****Request from Screwfix*****/

  const clickHandler = (e) => {
    //check if page is correct
    //if (window.utag.data.basicPageId !== 'lister Page') return;

    const { target } = e;

    console.log('🚀 ~ clickHandler ~ target', target);
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    pollerLite(
      [
        () => typeof window.tealiumDataLayer === 'object',
        () => window.utag !== undefined,
        () => window.__NEXT_DATA__ !== undefined,
      ],
      () => {
        setTimeout(init, DOM_RENDER_DELAY);
      }
    );
  });
};
