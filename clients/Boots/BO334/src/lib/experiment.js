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
import loader from './components/loader';
import products from './components/products';
import pageArray from './data';

const { ID, VARIATION } = shared;

const renderLoader = (state = 'show') => {
  if (state === 'hide') {
    const loaderElem = document.querySelector('.oct-loading-spinner-overlay');
    loaderElem?.remove();
    return;
  }
  const loaderAttchPoint = document.querySelector('[data-testid="visible-overlay-id"]');
  loaderAttchPoint.insertAdjacentHTML('beforebegin', loader());
};

const removeDuplicateCartCircles = () => {
  const existingBadges = document.querySelectorAll('.oct-basket-icon__badge');

  if (existingBadges.length <= 1) return;
  existingBadges.forEach((badge, index) => {
    if (index !== existingBadges.length - 1) {
      badge.remove();
    }
  });
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
const addAllToBag = (SAPs, qty = 1) => {
  const orderItems = SAPs.map((SAP) => {
    return {
      partNumber: SAP,
      quantity: qty,
    };
  });
  window.dispatchEvent(
    new CustomEvent('oct-basket:add', {
      detail: {
        payload: {
          calculateInventory: false,
          channel: 'Ecommerce',
          quickBuy: false,
          orderItems: orderItems,
        },
        additionalDetails: {
          pageName: '',
          quickBuy: false,
        },
      },
      bubbles: true,
    })
  );
};

const updateCartCirlce = (quantity) => {
  const cartCircle = `<span class="${ID}__cartcircle oct-text oct-text--bold oct-text--size_xs oct-basket-icon__badge oct-basket-icon__badge--circle" data-testid="text">${quantity}</span>`;
  const attachPoint = document.querySelector('.oct-basket-icon > button');
  //if already exists, update innertext

  removeDuplicateCartCircles();

  const remainingCircle = document.querySelector('.oct-basket-icon__badge');

  if (remainingCircle) {
    remainingCircle.innerText = quantity;
    return;
  }

  attachPoint.insertAdjacentHTML('afterend', cartCircle);
};

const fetchProducts = (category) => {
  return fetch('https://www.boots-optimisation.co.uk/category-search/' + category, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      return responseJSON; // Resolve the promise with the response data
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

const scrollHandler = (e) => {
  const { target } = e;
  if (target.closest('.productsWrapper') && !document.body.classList.contains(`.${ID}__isScrolled`)) {
    fireBootsEvent(`Scroll - Users Scroll the new component`, true, eventTypes.experience_action, {
      action: actionTypes.scroll,
      action_detail: `Users Scroll the new component`,
    });

    document.body.classList.add(`.${ID}__isScrolled`);
  }
};

const init = () => {
  const currentPageUrl = window.location.href;
  const isPageUrlExist = pageArray.filter((item) => currentPageUrl.includes(item.currPageURL));
  //console.log('🚀 ~ init ~ isPageUrlExist:', isPageUrlExist);

  if (isPageUrlExist.length <= 0) return;

  if (VARIATION == 'control') {
    fireBootsEvent(`View - user would have seen new component`, true, eventTypes.experience_render, {
      render_element: elementTypes.Product_carousel,
      action_detail: `user would have seen new component ${window.location.pathname}`,
    });
    return;
  }

  if (document.querySelector(`.${ID}__container`)) {
    document.querySelector(`.${ID}__container`).remove();
  }

  fetchProducts(encodeURIComponent(isPageUrlExist[0].newPageCatString)).then((data) => {
    //console.log('🚀 ~ fetchProducts ~ data:', data);
    if (data.length) {
      pollerLite(
        ['#oct-notification-sticky [data-testid="basket-notification-element"] .oct-notification.oct-notification--visible'],
        () => {
          const targetPoint = document.querySelector(
            '#oct-notification-sticky [data-testid="basket-notification-element"] .oct-notification'
          );

          const inStockProducts = data.filter((product) => product.inStock);

          let productData = [];
          //make sure length is max 8
          if (inStockProducts.length > 8) {
            productData = inStockProducts.slice(0, 8);
          } else {
            productData = inStockProducts;
          }

          //console.log('🚀 ~ fetchProducts ~ targetPoint:', targetPoint);
          if (document.querySelector(`.${ID}__container`)) return;

          targetPoint.insertAdjacentHTML('beforeend', products(ID, productData));
          document.querySelector('#oct-notification-sticky').classList.add(`${ID}__overlay`);

          const allSAPs = productData.map((product) => {
            if (!product.variants || product.variants.length <= 0) {
              return product.model;
            }
          }).filter(Boolean);
          window[`${ID}__products`] = allSAPs;

          fireBootsEvent(`View - user sees new component`, true, eventTypes.experience_render, {
            render_element: elementTypes.Product_carousel,
            action_detail: `user sees new component ${window.location.pathname}`,
          });

          const scrollElement = document.querySelector(`.${ID}__container .productsWrapper`);
          scrollElement.removeEventListener('scroll', (e) => scrollHandler(e));
          scrollElement.addEventListener('scroll', (e) => scrollHandler(e));
        }
      );
    }
  });
};

export default () => {
  const testID = `${ID}|Post ATB Combinations`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('.oct-notification__header > button')) {
      const container = document.querySelector(`.${ID}__container`);
      if (container) {
        container.remove();
      }
      const stickyNotification = document.querySelector('#oct-notification-sticky');
      stickyNotification?.classList.contains(`${ID}__overlay`) && stickyNotification.classList.remove(`${ID}__overlay`);

      fireBootsEvent(`Click - user clicks exit cross`, true, eventTypes.experience_action, {
        action: actionTypes.close,
        action_detail: 'user clicks exit cross',
      });
    } else if (target.closest('span.oct-basket-icon')) {
      fireBootsEvent(`Click - user clicks basket`, true, eventTypes.experience_action, {
        action: actionTypes.view_cart,
        action_detail: 'user clicks basket',
      });
    } else if (target.closest('.oct-basket-header__close-btn')) {
      const stickyNotification = document.querySelector('#oct-notification-sticky');
      stickyNotification?.classList.contains(`${ID}__overlay`) && stickyNotification.classList.remove(`${ID}__overlay`);
    } else if (target.closest('.oct-add-to-basket__product_info-container button')) {
      init();
    } else if (target.closest('.oct-notification__ctas [data-track-element="View basket"]')) {
      fireBootsEvent(`Click - user clicks ‘view basket’ cta`, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: `user clicks ‘view basket’ cta`,
      });
    } else if (target.closest('.oct-notification__ctas [data-track-element="Checkout now"]')) {
      fireBootsEvent(`Click - user clicks ‘checkout now’ cta`, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: `user clicks ‘checkout now’ cta`,
      });
    } else if (target.closest('.product--details-section-content button.add-button')) {
      const sku = target.closest('button').dataset.sku;
      renderLoader();
      addToCart(sku)
        .then((data) => {
          renderLoader('hide');

          const cartData = data.basketNotificationDetails;

          const { totalItemCount } = cartData;

          updateCartCirlce(totalItemCount);

          fireBootsEvent(`Click - ATC clicked`, true, eventTypes.experience_action, {
            action: actionTypes.add_to_cart,
            action_detail: `Click - user clicked ATC in new component`,
          });
        })
        .catch((err) => {
          console.error('Error adding item to cart', err);
          renderLoader('hide');
        });
    } else if (target.closest(`.${ID}__shopall`)) {
      const allSAPs = window[`${ID}__products`];

      addAllToBag(allSAPs);
    } else if (target.closest(`.${ID}__overlay`) && !target.closest('.oct-notification')) {
      const closeBtn = document.querySelector('[data-testid="close-basket-notification"]');
      closeBtn.click();
    }
  });

  window.addEventListener('oct-basket:add', (e) => {
    //check if multiple quantity added
    const { orderItems } = e.detail.payload;

    //if orderItems is more than 1, then it is multiple quantity
    if (orderItems.length > 1) {
      fireBootsEvent(`Click - shop all button clicked’`, true, eventTypes.experience_action, {
        action: actionTypes.add_to_cart,
        action_detail: `Click - user clicked shop all in new component’`,
      });
    }
  });
};
