/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { addCssToPage, addJsToPage } from '../../../../../lib/utils';
import { getCookie, pollerLite, setCookie } from './helpers/utils';
import getStrategyData from './helpers/getDyRecomm';
import getCart from './helpers/getCart';
import modalHTML from './components/modal';
import productCards from './components/productCards';
import initSwiper from './helpers/initSwiper';
import addToCart from './helpers/addToCart';
import spinner from './components/spinner';
import updateSideCart from './helpers/updateSideCart';
import productOptions from './components/optionsBlock';

let debug = getCookie('bl-debug') === 'true';
let debugScenario = getCookie('bl-debug-scenario');
const DY_RECOMM_ID = window.DYRecommID || 204543;

const { ID, VARIATION } = shared;
const getModalData = (callback) => {
  const currentDate = new Date();

  const cartCountElement = document.querySelector('[data-cart-count]');
  let cartItemCount = 0;

  if (cartCountElement) {
    cartItemCount = parseInt(cartCountElement.textContent);
  }

  const beforeFriday1st = currentDate < new Date('2023-12-01T00:00:00');
  const beforeSunday3rdMidnight = currentDate < new Date('2023-12-04T00:00:00'); // Checking until midnight of Sunday 3rd December
  const isFriday1st = currentDate.getDate() === 1 && currentDate.getMonth() === 11; // Month is 0-indexed, so December is 11

  const conditionsOne = debug ? debugScenario === 'option1' : beforeFriday1st && cartItemCount === 0;
  const conditionsTwo = debug ? debugScenario === 'option2' : isFriday1st && beforeSunday3rdMidnight && cartItemCount === 0;
  const conditionsThree = debug ? debugScenario === 'option3' : beforeFriday1st && cartItemCount > 0;
  const conditionsFour = debug ? debugScenario === 'option4' : isFriday1st && beforeSunday3rdMidnight && cartItemCount > 0;
  console.log('🚀 ~ file: experiment.js:48 ~ getModalData ~ conditionsOne:', conditionsOne);
  if (conditionsOne) {
    console.log('🚀 ~ file: experiment.js:48 ~ getModalData ~ conditionsOne:', conditionsOne);
    //get DY data

    getStrategyData(DY_RECOMM_ID)
      .then((shopifyProductData) => {
        const titleMsg = 'Catch a Cyber Week Deal Before You Go';

        //render modal
        callback(shopifyProductData, titleMsg);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (conditionsTwo) {
    const remainingMilliseconds = new Date('2023-12-04T00:00:00') - currentDate;
    const remainingHours = Math.ceil(remainingMilliseconds / (1000 * 60 * 60));
    getStrategyData(DY_RECOMM_ID).then((shopifyProductData) => {
      const titleMsg = `Catch a Cyber Week Deal Before You Go. Sale Ends in <b>${remainingHours}hrs</b>`;
      //render modal
      callback(shopifyProductData, titleMsg);
    });
    //dispatchCustomEvent('betweenFridaySundayNoItems', { remainingHours });
  } else if (conditionsThree) {
    const titleMsg = "You've Left Great Savings in Your Bag";
    getCart().then((shopifyProductData) => {
      //render modal
      callback(shopifyProductData, titleMsg);
    });
    //dispatchCustomEvent('beforeFridayWithItems');
  } else if (conditionsFour) {
    const remainingMilliseconds = new Date('2023-12-04T00:00:00') - currentDate;
    const remainingHours = Math.ceil(remainingMilliseconds / (1000 * 60 * 60));
    const titleMsg = `Complete Your Purchase in <b>${remainingHours}hrs</b> to enjoy Cyber Week Savings`;
    //dispatchCustomEvent('betweenFridaySundayWithItems', { remainingHours });
    getCart().then((shopifyProductData) => {
      //get product data for each
      callback(shopifyProductData, titleMsg);
      // Example usage:
    });
  }
};

const renderModal = (productData, titleMsg) => {
  let insertionPoint = document.querySelector('body');
  insertionPoint.insertAdjacentHTML('beforeend', modalHTML(ID));
  document.documentElement.classList.add(`${ID}-noscroll`);

  const modalInner = document.querySelector(`.${ID}-modal--carousel`);
  const innerCarousel = productCards(ID, productData, titleMsg);
  modalInner.insertAdjacentHTML('beforeend', innerCarousel);
  initSwiper(`.${ID}__productCards`);
};

const init = () => {
  getModalData(renderModal);
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  document.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__productATC.single`)) {
      const atcBtn = target.closest(`.${ID}__productATC`);
      const sku = atcBtn.dataset.sku;
      atcBtn.innerHTML = spinner();
      addToCart(sku).then(() => {
        updateSideCart();
        fireEvent('User added product to cart');
        //console.log(res);
        atcBtn.innerHTML = 'Added';
        setTimeout(() => {
          atcBtn.innerHTML = 'Add to Bag';
        }, 1000);
      });
    } else if (target.closest(`.${ID}__checkoutBtn`)) {
      fireEvent('User clicked checkout');
    } else if (target.closest(`.${ID}-close`)) {
      document.querySelector(`.${ID}-modal`).remove();
      document.documentElement.classList.remove(`${ID}-noscroll`);
      setCookie('MAM542-exitIntentModal', 'true', 1);
      fireEvent(`Click - Close Extras modal using close X`, true);
      window.location.reload();
    } else if (target.classList.contains(`${ID}-noscroll`) && !target.closest(`.${ID}-modal`)) {
      document.querySelector(`.${ID}-modal`).remove();
      document.documentElement.classList.remove(`${ID}-noscroll`);
      setCookie('MAM542-exitIntentModal', 'true', 1);
      fireEvent(`Click - Close Extras modal using overlay`, true);
      window.location.reload();
    } else if (target.closest(`.${ID}__productATC.view-options`)) {
      const carousel = document.querySelector(`.${ID}__modal-contentwrapper`);
      const optionsContainer = document.querySelector(`.${ID}__options-container`);
      const variants = JSON.parse(target.dataset.variants);
      const optionsHtml = productOptions(ID, variants);
      optionsContainer.innerHTML = optionsHtml;
      carousel.classList.add(`${ID}__hide`);
      optionsContainer.classList.remove(`${ID}__hide`);
    } else if (target.classList.contains(`${ID}-sizebutton`) && !target.classList.contains(`${ID}-disabled`)) {
      let allSizeButtons = [].slice.call(document.querySelectorAll(`.${ID}-sizebutton`));
      allSizeButtons.forEach((button) => {
        button.classList.remove(`${ID}-selected`);
      });
      e.target.classList.add(`${ID}-selected`);
      const productName = target.closest(`.${ID}__size-modal--content`).querySelector('h2').innerText;
      fireEvent(`Click - size button clicked for ${target.innerText} on ${productName}`, true);
    } else if (target.closest(`.${ID}-size-modal--atb`)) {
      const sku = document.querySelector(`.${ID}-sizebutton.${ID}-selected`).dataset.variantId;
      if (!sku) return;
      const atcBtn = target.closest(`.${ID}-size-modal--atb`);

      atcBtn.innerHTML = spinner();
      addToCart(sku).then(() => {
        updateSideCart();
        fireEvent('User added product to cart');
        //console.log(res);
        atcBtn.innerHTML = 'Added';
        setTimeout(() => {
          atcBtn.innerHTML = 'Add to Bag';
        }, 1000);
      });
    } else if (target.closest(`.${ID}-size-modal--close`)) {
      const carousel = document.querySelector(`.${ID}__modal-contentwrapper`);
      const optionsContainer = document.querySelector(`.${ID}__options-container`);
      carousel.classList.remove(`${ID}__hide`);
      optionsContainer.classList.add(`${ID}__hide`);
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const swiperJs = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
  const swiperCss = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';

  addJsToPage(swiperJs, `${ID}__swiperjs`);
  addCssToPage(swiperCss, `${ID}__swipercss`);
  pollerLite([() => window.Swiper !== undefined], () => {
    console.log('' + ID + ' - Swiper loaded');
    init();
    const miniCartIcon = document.querySelector('.site-header__cart-count');
    miniCartIcon.classList.remove('hide');
  });
};
