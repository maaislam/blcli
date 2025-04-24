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
import { getProducts, obsIntersection } from './helpers/utils';
import productRecs from './productRecs';
import initSwiper from './helpers/initSwiper';
import handleHiddenSlideInsertion from './helpers/handleHiddenSlideInsertion';
import loader from './loader';

const { ID, VARIATION } = shared;

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
};

const resetDom = () => {
  const recsContainer = document.querySelector(`.${ID}-product-recs-container`);
  const newBasketTab = document.querySelector(`.${ID}-tab`);
  const originalBasketTab = document.querySelector(`.${ID}-original-basket-tab`);
  const originalBasketContent = document.querySelector('[data-element="Basket - Recommended"]');

  if (recsContainer) recsContainer.remove();
  if (newBasketTab) newBasketTab.remove();

  if (originalBasketTab) originalBasketTab.classList.add('oct-tab--active');
  if (originalBasketContent) originalBasketContent.classList.remove(`${ID}-display-none`);
};

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

const hideNewBasketTab = () => {
  const newBasketRecs = document.querySelector(`.${ID}-product-recs-container`);
  const swiperParent = document.querySelector(`.${ID}-swiper`);
  newBasketRecs.classList.add(`${ID}-display-none`);
  swiperParent.classList.add(`${ID}-display-none`);
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

const renderLoader = (state = 'show') => {
  if (state === 'hide') {
    const loaderElem = document.querySelector('.oct-loading-spinner-overlay');
    loaderElem?.remove();
    return;
  }
  const loaderAttchPoint = document.querySelector('[data-testid="visible-overlay-id"]');
  loaderAttchPoint.insertAdjacentHTML('beforebegin', loader());
};

const addToCart = (sku) => {
  return fetch('/api/checkout/basket/items', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      adrum: 'isAjax:true',
      channel: 'Ecommerce',
      'content-type': 'application/json',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      siteid: 'UK',
    },

    body: `{"calculateInventory":true,"quickBuy":false,"orderItems":[{"partNumber":"${sku}","quantity":1}]}`,
    method: 'POST',
  }).then((res) => res.json());
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
};

const controlTracking = (target) => {
  if (
    target.classList.contains('#oct-basket #Recommended-tab') ||
    target.closest('#oct-basket .oct-tab .oct-tab__btn[aria-controls="Recommended-tab"]')
  ) {
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.click_cta,
      action_detail: 'User has clicked on the Recommended tab',
    });
  }

  if (
    target.classList.contains('#oct-basket .oct-product-card__button') ||
    target.closest('#oct-basket .oct-product-card__button')
  ) {
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.view_product,
      action_detail: 'User has clicked on the View Product button',
    });
  }

  if (
    target.classList.contains('#oct-basket .oct-product-card__badge--offer') ||
    target.closest('#oct-basket .oct-product-card__badge--offer')
  ) {
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.click_cta,
      action_detail: 'User has clicked on the Offer Roundel',
    });
  }

  if (
    target.classList.contains('#oct-basket .oct-product-card__offer') ||
    target.closest('#oct-basket .oct-product-card__offer__container')
  ) {
    fireBootsEvent('', true, eventTypes.experience_action, {
      action: actionTypes.click_promotion,
      action_detail: 'User has clicked on the Offer Detail',
    });
  }

  // const originalProducts = document.querySelectorAll('#oct-basket .oct-products .oct-tabs__content .oct-product-card');
  // originalProducts.forEach((product, index) => {
  //   const productName = product['data-productname'];
  //   const positionInCarousel = index + 1;

  //   fireBootsEvent('User views product in carousel', true, eventTypes.experience_action, {
  //     action: actionTypes.view_product,
  //     action_detail: `Product ${productName} in position ${positionInCarousel} in the carousel`,
  //   });
  // });
};

const intersectionCallback = (entry, observer) => {
  //console.log(' ~ intersectionCallback ~ entry:', entry);
  if (entry.isIntersecting) {

    //document.body.classList.add(`${ID}-oct-basket--open`);
    // observer.disconnect();
    fireBootsEvent(
      `User ${VARIATION === 'control' ? 'would have' : ''} viewed product carousel`,
      true,
      eventTypes.experience_render,
      {
        render_element: elementTypes.Product_carousel,
        render_detail: `User ${VARIATION === 'control' ? 'would have' : ''} viewed product carousel`,
      }
    );
  }
};

const renderRecomButtons = () => {
  const recomCtaHTML = (sku) => `<a class="${ID}-recomATC" data-sku="${sku}">ADD TO BAG</a>`
  const skus = [];

  const recomViewBtns = document.querySelectorAll('[data-element="Recommended"] a[data-testid="button"]');
  recomViewBtns.forEach((recomViewBtn) => {
    const productCardElem = recomViewBtn.closest('.oct-product-card');
    recomViewBtn.classList.add(`${ID}__invisible`);

    let sku = productCardElem?.dataset?.productid;
    if (sku) {
      const match = sku.match(/\d+/); // This will match the numerical part of the string
      sku = match ? match[0] : null;
      skus.push(sku);
    }
  });

  getProducts(skus).then((products) => {
    products.forEach((product) => {
      const { hasVariants, model } = product;

      const btnAttachPoint = document.querySelector(`[data-element="Recommended"] [data-productid*="${model}"] a[data-testid="button"]`);

      if (!hasVariants) {
        const productCardElem = btnAttachPoint.closest('.oct-product-card');
        if (productCardElem) productCardElem.querySelector(`.${ID}-recomATC`)?.remove();

        btnAttachPoint.insertAdjacentHTML('afterend', recomCtaHTML(model));
        btnAttachPoint.classList.add(`${ID}__hide`);
      } else {
        btnAttachPoint.textContent = 'VIEW PRODUCT';
        btnAttachPoint.classList.add(`${ID}-recomViewProdCta`);
      }
    });
  });
}

const init = () => {
  //render stuff
  document.body.classList.remove(`${ID}-oct-basket--open`);
  const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) ?? {};
  const products = orderDetails?.ecommerce?.checkout?.products ?? [];

  if (products.length <= 0) {
    revealDOM();

    return;
  }

  const basketTab = document.querySelector('.oct-tabs__labels');

  if (document.querySelector(`.${ID}-tab`)) return;

  if (VARIATION === 'control') {
    obsIntersection(document.querySelector('#Recommended-tab'), 0.1, intersectionCallback);

    return;
  }
  obsIntersection(document.querySelector('#Recommended-tab'), 0.1, intersectionCallback);

  const attachPointPosition = VARIATION === '1' ? 'afterbegin' : VARIATION === '2' ? 'beforeend' : 'beforeend';
  basketTab.insertAdjacentHTML(attachPointPosition, basketTabHtml);

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

  renderRecomButtons();
  if (VARIATION === '2') {
    document.querySelector(`.${ID}-original-basket-tab`).click(); // show recommended tab by default for V2
  }
};

export default () => {
  const testID = `${ID}|One click checkout`; // same as triggers.js
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

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    //console.log(' ~ document.body.addEventListener ~ target:', target);
    if (VARIATION !== 'control') {
      variantTracking(target);
    } else if (VARIATION === 'control') {
      controlTracking(target);
    }

    setTimeout(() => {
      if (isCartEmpty()) {
        resetDom();
      }
    }, 1000);

    if (target.closest('#oct-basket-container') || target.closest('[data-track-element="View basket"]')) {
      pollerLite(
        [
          '.oct-basket__content',
          '.oct-tabs__labels',
          '.oct-products',
          () => window.skus && window.skus.length > 0,
          () => typeof window.Swiper === 'function',
        ],
        () => {
          init(true);
        }
      );
    } else if (target.closest(`.${ID}-atb`)) {
      const sku = target.dataset.object;
      renderLoader();
      addToCart(sku)
        .then(() => {
          renderLoader('hide');
          //console.log('Item added to cart', data);

          //const cartData = data.basketNotificationDetails;

          //const { totalItemCount } = cartData;

          //updateCartCirlce(totalItemCount);

          const cartBtn = document.querySelector('.oct-iconButton[aria-label="Basket"]');

          cartBtn ? cartBtn.click() : window.location.reload();

          //tracking

          fireBootsEvent(`Click - ATC clicked`, true, eventTypes.experience_action, {
            action: actionTypes.add_to_cart,
            action_detail: `View - user clicked ATC in carousel`,
          });

          pollerLite([() => !document.querySelector('.oct-loading-spinner-overlay')], () => {
            renderRecomButtons();
          });
        })
        .catch((err) => {
          console.error('Error adding item to cart', err);
          renderLoader('hide');
        });
    } else if (target.closest(`.${ID}-recomATC`)) {
      fireBootsEvent(`Click - ATC clicked`, true, eventTypes.experience_action, {
        action: actionTypes.add_to_cart,
        action_detail: `View - user clicked ATC in carousel (recom)`,
      });

      const sku = target.dataset.sku;
      addToCart(sku).then((data) => {
        document.querySelector('#oct-basket-container .oct-iconButton').click();

        pollerLite([() => !document.querySelector('.oct-loading-spinner-overlay')], () => {
          renderRecomButtons();
        });
      })
        .catch((err) => {
          console.error('Error adding item to cart', err);

        });
    }
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
            //init(true);
          }
        );
      }, 5000); // just in case user clicks before event listener is ready
    })
    .catch(revealDOM);

  setTimeout(revealDOM, 10000);
};
