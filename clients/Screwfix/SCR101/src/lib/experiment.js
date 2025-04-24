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
import pdpCard from './components/pdpCard';
import plpCard from './components/plpCard';

import setModalCard from './helpers/setModalCard';
import { onUrlChange } from './helpers/utils';
import skuList from './skuList';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const validPlps = () =>
  [
    '/c/heating-plumbing/central-heating-radiators/cat830988?brand=flomasta',
    '/search?search=flomasta+flomasta',
    '/c/heating-plumbing/central-heating-radiators/cat830988',
  ].some((path) => window.location.href.includes(path));

const validPdp = () => {
  const { basicPageId, prodBrand, prodCategory, prodSku } = window.utag.data;

  return (
    basicPageId === 'product page' &&
    prodBrand[0] === 'Flomasta' &&
    prodCategory[0] === 'Central Heating Radiators' &&
    skuList.includes(prodSku[0])
  );
};

const init = () => {
  //check if page is correct
  const pageCondition = validPlps() || validPdp();

  if (!pageCondition) {
    //remove setup
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.remove(`${ID}-${VARIATION}`);

    return;
  }

  setup();

  /*****this enabled GA4****/
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-74MS9KFBCG';
  /*****this enabled GA4****/

  fireEvent('Conditions Met');

  if (VARIATION === 'control') return;

  /*****add experiment specific code here*****/

  if (validPlps()) {
    fireEvent(`User interacts with the promotional banner on PLP`);
    const freeTravElems = document.querySelectorAll('[data-qaid="bulksave-banner"]');

    freeTravElems.forEach((freeTravElem) => {
      const cardElem = freeTravElem.closest('[data-qaid="product-card"]');
      const skuElement = cardElem.querySelector('[data-qaid="pdp-product-name"] span.oodeYO');
      const productSku = skuElement.innerText.replace(/[()]/g, '');

      const isFloormasterSku = skuList.includes(productSku);

      if (!isFloormasterSku) return;

      freeTravElem.style.display = 'none';
      if (cardElem.querySelector(`.${ID}__plpCard`)) return;
      freeTravElem.insertAdjacentHTML('afterend', plpCard(ID));
    });
  }

  if (validPdp()) {
    const prodTitle = document.querySelector('[data-qaid="product-tile"]');
    const attachPoint = prodTitle.parentElement;
    if (document.querySelector(`.${ID}__pdpCard`)) return;
    VARIATION === '1' && attachPoint.insertAdjacentHTML('beforeend', pdpCard(ID, VARIATION));
    !isMobile() &&
      VARIATION === '2' &&
      document
        .querySelector('[data-qaid="pdp_sticky_product_footer"] > div:first-child')
        .insertAdjacentHTML('afterend', pdpCard(ID, VARIATION));

    isMobile() &&
      VARIATION === '2' &&
      document.querySelector('[data-qaid="product-price"]').insertAdjacentHTML('afterend', pdpCard(ID, VARIATION));

    //add check box event
    const checkBoxElem = document.querySelector('#addToBasketCheckbox-v2');
    const msgElem = document.querySelector('.v2-message');
    checkBoxElem.addEventListener('change', () => {
      if (checkBoxElem.checked) {
        window.bundleBtnClick = true;

        //update messaging
        msgElem.classList.remove(`${ID}__hide`);
      } else {
        window.bundleBtnClick = false;
        msgElem.classList.add(`${ID}__hide`);
      }
    });
  }
};

const getQty = (target) => {
  let qty;
  if (validPdp()) {
    const qtyInputElem = document.querySelector('[data-qaid="pdp-product-quantity"]');

    qty = qtyInputElem ? qtyInputElem.value : 1;
  } else if (validPlps()) {
    const cardElem = target.closest('[data-qaid="product-card"]');
    const qtyInputElem = cardElem?.querySelector('[data-qaid="product-quantity"]');

    qty = qtyInputElem ? qtyInputElem.value : 1;
  }

  return qty;
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
    const pageCondition = validPlps() || validPdp();
    if (!pageCondition) return;

    const { target } = e;

    const deliveryBtn = document.querySelector('[data-qaid="pdp-button-deliver"]');
    const clickAndCollectIcon = document.querySelector('[data-qaid="pdp-button-click-and-collect"]');
    // const checkBoxContainerElem = document.querySelector(`.${ID}__checkbox-container`);
    // const prdQty = 1;

    if (target.closest(`.${ID}__delivery-btn`) && validPdp()) {
      fireEvent('User adds bundle to delivery');
      window.bundleBtnClick = true;
      deliveryBtn.click();

      //setModalCard(ID);
    } else if (target.closest(`.${ID}__click-collect-btn`) && validPdp()) {
      fireEvent('User adds bundle to click and collect');
      window.bundleBtnClick = true;
      clickAndCollectIcon.click();

      //setModalCard(ID);
    } else if (target.closest(['[data-qaid="button-deliver"]']) && validPlps()) {
      fireEvent('User adds bundle to basket');
      setModalCard(ID, getQty(target));
    } else if (target.closest(['[data-qaid="button-click-and-collect"]']) && validPlps()) {
      fireEvent('User adds bundle to basket');
      setModalCard(ID, getQty(target));
    } else if (target.closest('[data-qaid="pdp-view-all-link"]')) {
      fireEvent('User interacts with “view more”');
    } else if (target.closest('[data-qaid="bulksave-banner"]') || target.closest(`.${ID}__plpCard`)) {
      fireEvent(`User interacts with the promotional badge on PLP`);
      if (target.closest(`.${ID}__plpCard`)) {
        const prodCard = target.closest('[data-qaid="product-card"]');
        const prodLink = prodCard.querySelector('[data-qaid="product_description"]');
        prodLink?.click();
      }
    } else if (target.closest('[data-qaid="large-promo-banner"]')) {
      fireEvent(`User interacts with the promotional banner on PDP`);
    } else if (
      target.closest('[data-qaid="pdp-button-deliver"]') ||
      target.closest('[data-qaid="pdp-button-click-and-collect"]')
    ) {
      setModalCard(ID, getQty(target), target);
    } else if (target.closest(`.${ID}__offerContainer span`)) {
      fireEvent(`User interacts with claim offer`);

      const checkBoxElem = document.querySelector(`.${ID}__modalCard .${ID}__checkbox`);
      checkBoxElem.click();
    }
    //console.log('🚀 ~ clickHandler ~ target', target);
  };

  document.body.removeEventListener('click', clickHandler);
  document.body.addEventListener('click', clickHandler);

  setTimeout(init, DOM_RENDER_DELAY);

  // Poll and re-run init
  onUrlChange(() => {
    //remove old DOM element added by the experiment
    if (document.querySelector(`.${ID}__pdpCard`)) {
      document.querySelectorAll(`.${ID}__pdpCard`).forEach((elem) => elem.remove());
    }
    if (document.querySelector(`.${ID}__plpCard`)) {
      document.querySelectorAll(`.${ID}__plpCard`).forEach((elem) => elem.remove());
    }

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
