import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';

import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import heroProductPairs from './data';
import { getCleanPathAndSearch, getProductId, getProducts, getStarRating, obsIntersection } from './helpers/utils';
import { offerIcon } from './assets/icons';
import TestReporting from '../boots_tracking/TestReporting';

const { ID, VARIATION } = shared;

const testID = `${ID}|Paired with recs`; // same as triggers.js
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

const pairedProductCard = (productData) => {
  const {
    actionURL,
    referenceImageURL,
    offerName,
    regularPrice,
    currentPrice,
    averageReviewScore,
    numberOfReviews,
    promotionalText,
  } = productData;

  const hasDiscount = regularPrice > currentPrice;

  const htmlStr = `
  <div class="${ID}__product-card"
     id="product-card">
    <div class="product-header">The perfect pairing</div>
    <div class="product-content">
        <div class="${ID}__product-image-wrapper">
             <img src="${referenceImageURL}"
             alt="${offerName}"
             class="product-image">
        </div>
        <div class="product-details">
            <h2>${offerName}</h2>
            <div class="${ID}__priceWrapper">
              <p class="price"><strong>£${currentPrice.toFixed(2)}</strong> ${
    hasDiscount
      ? `<span class="old-price">Was
                    £${regularPrice.toFixed(2)}</span>`
      : ''
  }</p>
              ${
                numberOfReviews > 0
                  ? `<div class="rating">
                  <span class="stars">${getStarRating(averageReviewScore)}</span>
                  <span class="reviews">(${numberOfReviews})</span>
              </div>`
                  : ''
              }
            </div>  
            <a href="${actionURL}" class="offers ${promotionalText.length > 0 ? 'has-offers' : 'no-offers'}">
                <span class="offer-badge">
                  <span class="${ID}__icons">${offerIcon}</span>
                  <span class="${ID}__text">Offers</span>
                </span>
                <span class="offer-text">
                  <span>${promotionalText.length}</span> 
                  available.
                </span>

                <span class="offer-text-link">
                  View offers
                </span>
            </a>
        </div>
    </div>
    <a href="${actionURL}"
               class="view-product-btn">VIEW PRODUCT</a>
  </div>`;
  return htmlStr;
};

const init = () => {
  const currentPath = window.location.pathname;
  const currentSearch = getCleanPathAndSearch();

  const pairedProduct = heroProductPairs[currentPath] || heroProductPairs[currentSearch];

  if (!pairedProduct || currentPath === pairedProduct.pairingProductUrl) {
    return;
  }
  const reporting = new TestReporting(testID, testVariant);
  reporting.register();

  obsIntersection('#add2CartBtn', 0.5, (entry) => {
    if (entry.isIntersecting && entry.boundingClientRect.y > 0 && !document.body.classList.contains(`${ID}__viewed`)) {
      const eventLabel = `User ${VARIATION === 'control' ? 'would have' : ''} viewed recommended product`;
      fireBootsEvent(eventLabel, true, eventTypes.experience_render, {
        render_element: elementTypes.Promotions,
        render_detail: eventLabel,
      });
      document.body.classList.add(`${ID}__viewed`);
    }
  });

  if (VARIATION == 'control') {
    return;
  }

  const { pairingProductUrl, pairingProductCode } = pairedProduct;

  const productId = getProductId(pairingProductUrl) || pairingProductCode;

  //get paired prod data

  getProducts([productId]).then((data) => {
    // console.log(' getProducts ~ data:', data);

    const product = data[0];
    const attachPoint = document.querySelector('#add2CartBtn');

    if (!attachPoint) {
      return;
    }

    attachPoint.insertAdjacentHTML('afterend', pairedProductCard(product));
  });
};

export default () => {
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

    if (target.closest('.view-product-btn')) {
      const eventLabel = "'view product' CTA interations";

      fireBootsEvent(eventLabel, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: eventLabel,
      });
    } else if (target.closest('.offers') && target.closest('#product-card')) {
      const eventLabel = "'View Offers' interations";

      fireBootsEvent(eventLabel, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: eventLabel,
      });
    }
  });

  init();
};
