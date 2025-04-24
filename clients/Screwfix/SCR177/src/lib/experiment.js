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
//import pdpBanner from './components/pdpBanner';
import plpPromo from './components/plpPromo';
import plpPromoCard from './components/plpPromoCard';
import { skusArray } from './data/data';
import { obsIntersection, onUrlChange } from './helpers/utils';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const extractSKU = (input) => {
  const match = input.match(/[A-Za-z0-9]+/);
  return match ? match[0] : null;
};

const intersectionCallback = (entry) => {
  //console.log('🚀 ~ intersectionCallback ~ entry:', entry);
  if (entry.isIntersecting && !document.body.classList.contains('user-seen')) {
    //fireEvent('User has seen the promo banner');
    document.body.classList.add('user-seen');
  }
};

const resetDom = () => {
  const pdpBanner = document.querySelectorAll(`.${ID}__pdpBannerWrapper`);
  if (pdpBanner.length > 0) {
    pdpBanner.forEach((item) => item.remove());
  }

  const plpPromos = document.querySelectorAll(`.${ID}__plpPromoWrapper`);
  if (plpPromos.length > 0) {
    plpPromos.forEach((item) => item.remove());
  }

  const promoCards = document.querySelectorAll(`.${ID}__plpPromoCardWrapper`);
  if (promoCards.length > 0) {
    promoCards.forEach((item) => item.remove());
  }
};

const init = () => {
  //check if page is correct
  const pageCondition = window.utag.data.basicPageId === 'product page';

  if (!pageCondition) {
    resetDom();
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    document.body.classList.remove('user-seen');
    document.body.classList.remove('user-seen-tile');
    document.body.classList.remove('remove-customer-messaging');

    return;
  }

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  /*****add experiment specific code here*****/
  //pdp
  if (window.utag.data.basicPageId === 'product page') {
    const prodSku = window.utag.data.prodSku[0];
    const targetPoint = document.querySelector('[data-qaid="product-price"]');
    const isExistingSku = skusArray.filter((item) => item.toLowerCase() === prodSku.toLowerCase());

    //if (isExistingSku.length > 0) fireEvent('Conditions Met');

    if (!document.querySelector(`.${ID}__pdpBannerWrapper`) && isExistingSku.length > 0) {
      // obsIntersection(targetPoint, 1, intersectionCallback);
      setup();
      if (VARIATION === 'control') return;

      document.body.classList.add('remove-customer-messaging');
      //targetPoint.insertAdjacentHTML('afterend', plpPromo(ID, 'productPage'));
    }
  }

  //plp and search page
  // if (window.utag.data.basicPageId === 'lister Page' || window.utag.data.basicPageId === 'Search Results: Successful') {
  //   const productCards = document.querySelectorAll('[data-qaid="product-card"]');
  //   const pageHasValidSkus = Array.from(productCards).some((card) => {
  //     const prodSkuElement = card.querySelector('[data-qaid="sku"]');
  //     const prodSku = prodSkuElement ? extractSKU(prodSkuElement.textContent?.trim()) : '';
  //     return skusArray.some((item) => item.toLowerCase() === prodSku.toLowerCase());
  //   });

  //   productCards.forEach((card, i) => {
  //     const targetPoint = card.querySelector('[data-qaid="price"]')?.parentElement?.parentNode;
  //     const prodSkuElement = card.querySelector('[data-qaid="sku"]');
  //     const prodSku = prodSkuElement ? extractSKU(prodSkuElement.textContent?.trim()) : '';
  //     const isValidSku = skusArray.some((item) => item.toLowerCase() === prodSku.toLowerCase());
  //     const positionIndex = isMobile() ? 1 : 4;

  //     if (targetPoint && !card.querySelector(`.${ID}__plpPromoWrapper`) && isValidSku) {
  //       // obsIntersection(targetPoint, 1, intersectionCallback);
  //       card.classList.add('has-banner');
  //       setup();
  //       if (VARIATION !== 'control') {
  //         //targetPoint.insertAdjacentHTML('beforebegin', plpPromo(ID));
  //       }
  //     }

  //     const validPlps = [
  //       '/c/outdoor-gardening/garden-hoses/cat840692',
  //       '/c/outdoor-gardening/hedge-trimmers/cat840612',
  //       '/c/outdoor-gardening/chainsaws/cat840736',
  //       '/c/auto-cleaning/pressure-washers/cat810150',
  //       '/c/outdoor-gardening/water-pumps/cat840680',
  //       '/search?search=karcher+karcher',
  //     ];

  //     if (i === positionIndex && (pageHasValidSkus || validPlps.includes(window.location.pathname))) {
  //       // fireEvent('Conditions Met');
  //       const cardWrapper = card.parentElement;
  //       if (VARIATION !== 'control') {
  //         document.querySelectorAll(`.${ID}__plpPromoCardWrapper`).forEach((item) => item?.remove());
  //         //cardWrapper.insertAdjacentHTML('afterend', plpPromoCard(ID));
  //       }
  //       // obsIntersection(cardWrapper, 1, (entry) => {
  //       //   //console.log('🚀 ~ intersectionCallback ~ entry:', entry);
  //       //   if (entry.isIntersecting && !document.body.classList.contains('user-seen-tile')) {
  //       //     //fireEvent(`user seen tile banner`);
  //       //     document.body.classList.add('user-seen-tile');
  //       //   }
  //       // });
  //     }
  //   });
  // }
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

  // const clickHandler = (e) => {
  //   const { target } = e;
  //   if (target.closest('.promo-banner')) {
  //     fireEvent('User tried to click promo banner');
  //   } else if (target.closest('[data-qaid="product-card"]') && target.closest('.has-banner')) {
  //     fireEvent('User clicked on product card with promo banner');
  //   }
  //   //console.log('🚀 ~ clickHandler ~ target:', target);
  // };

  // document.body.removeEventListener('click', clickHandler);
  // document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    resetDom();
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
