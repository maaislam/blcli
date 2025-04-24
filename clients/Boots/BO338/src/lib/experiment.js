/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';

import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

import { observeDOM, obsIntersection } from './helpers/utils';

const { ID, VARIATION } = shared;

const extractSku = (product) => {
  const url = product.href;
  const imageElem = product.querySelector('img');

  const fallbackUrl = imageElem.src;

  const regex = /(\d+)(?!.*\d)/;
  const fallbackRegex = /\/(\d+)\?/;
  const match = url.match(regex);
  const fallbackMatch = fallbackUrl.match(fallbackRegex);

  return match && match.length >= 7 ? match[0] : fallbackMatch ? fallbackMatch[1] : null;
};

const getProducts = (productsArr) => {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${productsArr.join('&')}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      return data;
    });
};

const buttonElem = (sku, prodTitle, btnText, isAtc = true) => {
  const btnHtml = `
      <button data-testid="button" data-sku="${sku}"
        class="${ID}__${isAtc ? 'atcbtn' : 'viewbtn'} ${ID}__cta"
        aria-label="Add ${prodTitle} to basket">
          <div class="oct-button__content"><span class="oct-add-to-basket_button_text button_text button_text_redesign">${btnText}</span>
          </div>
      </button>`;

  return btnHtml;
};

const addToBag = (SAP, qty = 1) => {
  window.dispatchEvent(
    new CustomEvent('oct-basket:add', {
      detail: {
        payload: {
          calculateInventory: false,
          channel: 'Ecommerce',
          quickBuy: false,
          orderItems: [
            {
              partNumber: `${SAP}`,
              quantity: qty,
            },
          ],
        },
        additionalDetails: {
          pageName: '',
          quickBuy: false,
          productId: `${SAP}`,
          quantity: qty,
        },
      },
      bubbles: true,
    })
  );
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

const init = () => {
  const skus = [];
  const products = document.querySelectorAll(`a[id*="_image"]:not(.${ID}__prodcard)`);

  if (products.length === 0) return;

  //console.log('init ~ products:', products);
  products.forEach((product) => {
    product.classList.add(`${ID}__prodcard`);
    const sku = extractSku(product);

    if (sku) {
      skus.push(sku);
      //add a class to the product
      product.classList.add(`${ID}__prodcard`);
    }
  });

  //get data for all SKUs

  getProducts(skus).then((data) => {
    products.forEach((product) => {
      const sku = extractSku(product);
      //find matching product data

      const productData = data.find((prod) => prod.model === sku);

      if (productData) {
        //console.log('products.forEach ~ productData:', productData);
        const { offerName, model, hasVariants, productAttributes } = productData;
        const isMedProduct = productAttributes.pharmacy_medicine;
        const btnText = hasVariants && isMedProduct ? 'VIEW PRODUCT' : 'ADD TO BASKET';
        //console.log('🚀 ~ products.forEach ~ isMedProduct:', isMedProduct);

        const button = buttonElem(model, offerName, btnText, !hasVariants);
        const cardElem = product.closest('.rrItemContainer');
        VARIATION !== 'control' && cardElem.insertAdjacentHTML('beforeend', button);
      }
    });
  });
  if (!document.body.classList.contains(`${ID}__rendered`)) {
    VARIATION !== 'pl' && fireBootsEvent(`User ${VARIATION === 'control' ? 'would have' : ''} viewed ATC`, true, eventTypes.experience_render, {
      render_element: elementTypes.CTA,
      render_detail: `User ${VARIATION === 'control' ? 'would have' : ''} viewed ATC`,
    });

    document.body.classList.add(`${ID}__rendered`);
  }
};

export default () => {
  const testID = `${ID}|One click ATB PDP`; // same as triggers.js
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

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.${ID}__atcbtn`)) {
      const sku = target.closest('button').dataset.sku;

      addToBag(sku);
      VARIATION !== 'pl' &&
        fireBootsEvent(`Click - ATC clicked`, true, eventTypes.experience_action, {
          action: actionTypes.add_to_cart,
          action_detail: `View - user clicked ATC in carousel`,
        });
    } else if (target.closest('[data-testid="close-basket-notification"]')) {
      const notifContainer = document.querySelector('.oct-notification');
      notifContainer.classList.remove('oct-notification--visible');
    } else if (target.closest('.rrItemContainer a')) {
      VARIATION !== 'pl' &&
        fireBootsEvent(`Click - carousel product cliked`, true, eventTypes.experience_action, {
          action: actionTypes.click_product,
          action_detail: `Click - user clicked to visit PDP from carousel`,
        });
    } else if (target.closest(`.${ID}__viewbtn`)) {
      VARIATION !== 'pl' &&
        fireBootsEvent(`Click - carousel product cliked`, true, eventTypes.experience_action, {
          action: actionTypes.click_product,
          action_detail: `Click - user clicked to view product from carousel`,
        });

      const cardElem = target.closest('.rrItemContainer');
      cardElem.querySelector('a').click();
    }
  });

  const carouselParentSelectors = ['[id="item_page.rec1"]', '[id="item_page.rec2"]', '#criteoSpContainer'];

  carouselParentSelectors.forEach((selector, index) => {
    const carouselParent = document.querySelector(selector);
    if (!carouselParent) return;
    const hasChildren = carouselParent?.querySelectorAll('.rrItemContainer');
    if (hasChildren.length === 0) return;

    obsIntersection(selector, 0.5, (entry) => {
      if (
        entry.isIntersecting &&
        entry.boundingClientRect.y > 0 &&
        !document.body.classList.contains(`${ID}__carousel${index + 1}-viewed`)
      ) {
        //console.log('Carousel in view', entry, selector);
        // if (index === 0) {

        // }

        VARIATION !== 'pl' &&
          fireBootsEvent(`View - carousel ${index + 1}`, true, eventTypes.experience_action, {
            action: actionTypes.view,
            action_detail: `View - user viewed promotional carousel ${index + 1}`,
          });
        document.body.classList.add(`${ID}__carousel${index + 1}-viewed`);
      }
    });

    document.body.addEventListener('pointerover', (e) => {
      if (e.target.closest(selector) && !document.body.classList.contains(`${ID}__carousel${index + 1}-hovered`)) {
        VARIATION !== 'pl' &&
          fireBootsEvent(`Hover/engage - carousel ${index + 1}`, true, eventTypes.experience_action, {
            action: actionTypes.hover,
            action_detail: `Hover/engage - user hovered over promotional carousel ${index + 1}`,
          });
        //console.log('Hovered over carousel', `Hover - user hovered over promotional carousel ${index + 1}`);
        document.body.classList.add(`${ID}__carousel${index + 1}-hovered`);
      }
    });
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  init();

  setTimeout(init, 5000);

  observeDOM('.oct-basket-icon', removeDuplicateCartCircles);
};
