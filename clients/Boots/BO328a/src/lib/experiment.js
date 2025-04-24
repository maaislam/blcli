/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import skus from './skus';
import { getProducts } from './helpers/utils';
import productRecs from './productRecs';
import initSwiper from './helpers/initSwiper';
import handleHiddenSlideInsertion from './helpers/handleHiddenSlideInsertion';

const { ID } = shared;

const basketTabHtml = `
<div class="oct-tab ${ID}-tab"><button data-testid="button" class="oct-button oct-button--default oct-button--default-default oct-button--default-default-responsive oct-tab__btn" role="tab"><div class="oct-button__content"><p class="${ID}-BL-tab oct-text oct-text--bold oct-text--size_m oct-tab__text" data-testid="text">Frequently topped up</p></div></button><div class="oct-tab__line"></div></div>
`;
const revealDOM = () => {
  const cartLeftContent = document.querySelector('.oct-products');
  if (cartLeftContent) {
    cartLeftContent.classList.add('reveal');
  }
};

const isCartEmpty = () => {
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) ?? {};
  const products = orderDetails?.ecommerce?.checkout?.products ?? [];
  return products.length <= 0;
}

const resetDom = () => {
  const recsContainer = document.querySelector(`.${ID}-product-recs-container`);
  const newBasketTab = document.querySelector(`.${ID}-tab`);
  const originalBasketTab = document.querySelector(`.${ID}-original-basket-tab`);
  const originalBasketContent = document.querySelector('[data-element="Basket - Recommended"]');

  if (recsContainer) recsContainer.remove();
  if (newBasketTab) newBasketTab.remove();

  if (originalBasketTab) originalBasketTab.classList.add('oct-tab--active');
  if (originalBasketContent) originalBasketContent.classList.remove(`${ID}-display-none`);
}

const hideOriginalBasketTab = () => {
  const originalBasketTab = document.querySelector('.oct-tabs__labels .oct-tab.oct-tab--active');
  originalBasketTab.classList.add(`${ID}-original-basket-tab`);
  originalBasketTab.classList.remove('oct-tab--active');
  const newBasketTab = document.querySelector(`.${ID}-tab`);
  newBasketTab.classList.add('oct-tab--active');

  const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');
  originalBasketRecs.classList.add(`${ID}-display-none`);

  // add fixed width to overall container
  const tabContainer = document.querySelector('.oct-basket .oct-products .oct-tabs');
  const isDesktop = document.querySelector('.oct-basket').classList.contains(`${ID}-desktop-basket`);
  if (isDesktop) {
    tabContainer.style.width = '685px';
  }
};

const addTabEventListeners = () => {
  const newBasketTab = document.querySelector(`.${ID}-tab`);
  const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);
  const swiperParent = document.querySelector(`.${ID}-swiper`);

  const originalBasketTab = document.querySelector(`.${ID}-original-basket-tab`);
  const originalBasketRecs = document.querySelector('.oct-products .oct-tabs .oct-tabs__content');

  const savedBasket = document.querySelector('[aria-controls="Saved Items-tab"]');

  newBasketTab.addEventListener('click', () => {
    document.querySelectorAll('.oct-tab--active').forEach((tab) => tab.classList.remove('oct-tab--active'));

    newBasketTab.classList.add('oct-tab--active');
    originalBasketTab.classList.remove('oct-tab--active');

    newBasketRecs.classList.remove(`${ID}-display-none`);
    originalBasketRecs.classList.add(`${ID}-display-none`);
    swiperParent.classList.remove(`${ID}-display-none`);

    //window.slider.update();
  });

  originalBasketTab.addEventListener('click', () => {
    originalBasketTab.classList.add('oct-tab--active');
    newBasketTab.classList.remove('oct-tab--active');

    originalBasketRecs.classList.remove(`${ID}-display-none`);
    newBasketRecs.classList.add(`${ID}-display-none`);
    swiperParent.classList.add(`${ID}-display-none`);
  });

  if (!savedBasket) return;

  savedBasket.addEventListener('click', () => {
    const savedBasketTab = savedBasket.closest('.oct-tab');
    const savedBasketRecs = document.querySelector('.oct-tabs__content');

    savedBasketTab.classList.add('oct-tab--active');
    newBasketTab.classList.remove('oct-tab--active');

    newBasketRecs.classList.add(`${ID}-display-none`);
    savedBasketRecs.classList.remove(`${ID}-display-none`);
    swiperParent.classList.add(`${ID}-display-none`);
  });
};

const variantTracking = (target) => {
  if (target.classList.contains(`${ID}-BL-tab`) || target.closest(`.${ID}-tab`)) {
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.click_cta,
      action_detail: 'User has clicked on the Frequently topped up tab',
    });
  }

  // add tracking for user clicking original tab
  if (
    target.classList.contains('#oct-basket #Recommended-tab') ||
    target.closest('#oct-basket .oct-tab .oct-tab__btn[aria-controls="Recommended-tab"]')
  ) {
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.click_cta,
      action_detail: 'User has clicked on the Recommended tab',
    });
  }

  //add tracking for view product for each product and include that product name
  if (
    target.classList.contains(`${ID}-personalised--product--add`) ||
    target.closest(`#oct-basket .${ID}-personalised--product--add`)
  ) {
    const productName = target.closest(`.${ID}-personalised--product`).querySelector('h4').innerText;
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.view_product,
      action_detail: `User has clicked on the View Product for ${productName}`,
    });
  }

  //do the same for reviews
  if (
    target.classList.contains(`${ID}-personalised--product--rating`) ||
    target.closest(`.${ID}-personalised--product--rating`)
  ) {
    const productName = target.closest(`.${ID}-personalised--product`).querySelector('h4').innerText;
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.click_pdp_product_rating,
      action_detail: `User has clicked on the product rating for ${productName}`,
    });
  }

  //fire tracking for product positions in the carousel
  const personalisedProducts = document.querySelectorAll(`.${ID}-personalised--product`);
  personalisedProducts.forEach((product, index) => {
    const productName = product.querySelector('h4').innerText;
    const positionInCarousel = index + 1;

    fireBootsEvent('', true, eventTypes.experience_render, {
      render_element: elementTypes.Product_carousel,
      render_detail: `Product ${productName} in position ${positionInCarousel} in the carousel`,
    });
  });
};

const init = () => {
  //render stuff
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) ?? {};
  const products = orderDetails?.ecommerce?.checkout?.products ?? [];


  if (products.length <= 0) {
    revealDOM();

    return;
  }

  const basketTab = document.querySelector('.oct-tabs__labels');

  if (document.querySelector(`.${ID}-tab`)) return;

  basketTab.insertAdjacentHTML('afterbegin', basketTabHtml);

  const attachPoint = document.querySelector(`.oct-products .oct-tabs`);
  attachPoint.insertAdjacentHTML('beforeend', productRecs(window.skus));

  const productWrapper = document.querySelector(`.${ID}-product-wrapper`);
  const productSlideCount = document.querySelectorAll(`.${ID}-personalised--product`).length;

  const hiddenSlide = handleHiddenSlideInsertion(ID, productSlideCount);
  productWrapper.insertAdjacentHTML('beforeend', hiddenSlide);
  // console.log(' basket is open', window.skus);

  hideOriginalBasketTab();
  addTabEventListeners();

  initSwiper(`.${ID}-swiper`);

  revealDOM();

  pollerLite(['.bv_stars_button_container'], () => {
    const stars = document.querySelectorAll('.bv_stars_button_container svg');
    stars.forEach((star) => {
      //remove inline styles
      star.removeAttribute('style');
    });
  });
};

export default () => {
  const { ID, VARIATION } = shared;

  const testID = `${ID}|insert test name`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  // fireBootsEvent('Conditions Met');

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    document.body.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('#oct-basket #Recommended-tab') ||
        e.target.closest('#oct-basket .oct-tab .oct-tab__btn[aria-controls="Recommended-tab"]')
      ) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'User has clicked on the Recommended tab',
        });
      }

      if (
        e.target.classList.contains('#oct-basket .oct-product-card__button') ||
        e.target.closest('#oct-basket .oct-product-card__button')
      ) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.view_product,
          action_detail: 'User has clicked on the View Product button',
        });
      }

      if (
        e.target.classList.contains('#oct-basket .oct-product-card__badge--offer') ||
        e.target.closest('#oct-basket .oct-product-card__badge--offer')
      ) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_cta,
          action_detail: 'User has clicked on the Offer Roundel',
        });
      }

      if (
        e.target.classList.contains('#oct-basket .oct-product-card__offer') ||
        e.target.closest('#oct-basket .oct-product-card__offer__container')
      ) {
        fireBootsEvent('', true, eventTypes.experience_action, {
          action: actionTypes.click_promotion,
          action_detail: 'User has clicked on the Offer Detail',
        });
      }

      const originalProducts = document.querySelectorAll('#oct-basket .oct-products .oct-tabs__content .oct-product-card');
      originalProducts.forEach((product, index) => {
        const productName = product['data-productname'];
        const positionInCarousel = index + 1;

        fireBootsEvent('', true, eventTypes.experience_render, {
          render_element: elementTypes.Product_carousel,
          render_detail: `Product ${productName} in position ${positionInCarousel} in the carousel`,
        });
      });
    });

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...


  document.body.addEventListener('click', (e) => {
    const { target } = e;
    //console.log('🚀 ~ document.body.addEventListener ~ target:', target);
    variantTracking(target);

    setTimeout(() => {
      if (isCartEmpty()) {
        resetDom();
      }
    }, 1000);

    if (!target.closest('#oct-basket-container') && !target.closest('[data-track-element="View basket"]')) return;

    pollerLite(
      [
        '.oct-basket__content',
        '.oct-tabs__labels',
        '.oct-products',
        () => window.skus && window.skus.length > 0,
        () => typeof window.Swiper === 'function',
      ],
      () => {
        init();
      }
    );
  });

  getProducts(skus)
    .then((data) => {
      window.skus = data;
      setTimeout(() => {
        pollerLite(
          [
            '.oct-basket__content',
            '.oct-tabs__labels',
            '.oct-products',
            () => window.skus && window.skus.length > 0,
            () => typeof window.Swiper === 'function',
          ],
          () => {
            init();
          }
        );
      }, 5000); // just in case user clicks before event listener is ready
    })
    .catch(revealDOM);

  setTimeout(revealDOM, 10000);
};
