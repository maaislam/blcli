import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import data from './recommendedProductsData';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const addOutOfStockMessage = () => {
  const { ID, VARIATION } = shared;

  const prodName = document.querySelector('#pdpMain h1').innerText.trim();
  const etaDate = document.querySelector('.availability-block .availability-msg .preorder-msg').innerText.trim().replace('Available to ship', '');

  const outOfStockMessageContainer = `<div class="${ID}-outOfStock__wrapper">
    <div class="${ID}-outOfStock__container">
      <div class="${ID}-outOfStock__msg">More ${prodName} coming soon! You can pre-order now to ensure that yours is reserved and ready to send from <strong>${etaDate}</strong></div>
    </div>
  </div>`;
  document.querySelector('.availability-block .availability-msg .preorder-msg').insertAdjacentHTML('afterend', outOfStockMessageContainer);
};

export const changeCtaBtnText = () => {
  const { ID, VARIATION } = shared;

  document.querySelector('button#add-to-cart').innerText = 'Pre-order Now';
};

export const generateCarouselContent = () => {
  const { ID, VARIATION } = shared;

  let listOfRecommendedProducts = '';
  let currentProdPrice = document.querySelector('.price-wrapper .product-price .price-sales').innerText.trim().replace('£', '');
  currentProdPrice = parseFloat(currentProdPrice);

  let i = 0;
  
  /**
   * @desc Generate carousel items
   */
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let prod = data[key];
      if (window.location.pathname !== prod.url) {
        listOfRecommendedProducts += `<div class="${ID}-recommendation-item recommendation-item" style="width: 170px;" aria-hidden="false" tabindex="${i}">
          <div class="product-tile">
            <div class="product-image recommendation_image">
              <a href="${prod.url}" tabindex="${i}">
                  <img src="${prod.img}" alt="${prod.title}, , hi-res" title="${prod.title}, ">
              </a>
            </div>
            <div class="product-name">
              <a href="${prod.url}" title="${prod.title}" tabindex="${i}">${prod.title}</a>
            </div>
            <div class="product-price">
              <span class="price-sales">£${prod.price}</span>
            </div>
            <div class="tooltip-content" data-layout="medium">
              <div class="recommendation-tooltip-header">
                <div class="product-name">${prod.title}</div>			
                <div class="product-pricing">
                  <div class="product-price">
                    <span class="price-sales">£${prod.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

        i += 1;
      }  
    }
  }

  const recommendedProdContainer = `<div class="${ID}-recommendations__wrapper recommendations recommendations-pdp">
    <h4>Need something sooner?</h4>
    <div id="${ID}-carousel-recommendations">
      ${listOfRecommendedProducts}
    </div>
  </div>`;

  /**
   * @desc For Desktop devices, add carousel and amend columns content
   */
  if (window.innerWidth > 767) {
    document.querySelector('#pdpMain .product-col-1.product-image-container .product-detail').insertAdjacentHTML('beforebegin', recommendedProdContainer);
    document.querySelector(`.${ID}-recommendations__wrapper`).setAttribute('style', 'position: absolute;');
    // --- Get Recommended Carousel height
    const carouselHeight = document.querySelector(`.${ID}-recommendations__wrapper`).getBoundingClientRect().height;

    const newColumns = `<div class="${ID}-product-col-1 product-col-1 product-image-container" style="padding-top: 392px;"></div>
    <div class="${ID}-product-col-2 product-col-2 product-detail" style="padding-top: 392px;"></div>`;

    document.querySelector('#pdpMain .product-col-2.product-detail').insertAdjacentHTML('afterend', newColumns);

    const prodTabs = document.querySelector('.product-tabs.product-tabs-move.ui-tabs.ui-corner-all.ui-widget.ui-widget-content');
    document.querySelector(`.${ID}-product-col-1`).insertAdjacentElement('afterbegin', prodTabs);

    const paymentContent = document.querySelector('.product-col-2.product-detail .content-zone');
    const prodInfo = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-b');
    const prodDelivery = document.querySelector('.product-col-2.product-detail .prod-info.prod-info-c');
    document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', paymentContent);
    document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodInfo);
    document.querySelector(`.${ID}-product-col-2`).insertAdjacentElement('beforeend', prodDelivery);
  } else {
  /**
   * @desc Tablet and Mobile
   */
    // document.querySelector('.product-col-2.product-detail .tab-target-mobile').insertAdjacentHTML('beforebegin', recommendedProdContainer);
    document.querySelector('form.pdpForm').insertAdjacentHTML('afterend', recommendedProdContainer);
  }

};

export const getInitialCarouselPosition = () => {
  const { ID, VARIATION } = shared;

  let currentProdPrice = document.querySelector('.price-wrapper .product-price .price-sales').innerText.trim().replace('£', '');
  i = 0;
  let initialPosition = 0;

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let prod = data[key];
      let prodPrice = 0;
      let dataPosition = i + 1;
      if (key > 1) {
        prodPrice = parseFloat(prod.price);
        if (currentProdPrice <= prodPrice) {
          initialPosition = key - 1;

          break;
        }
      } else {
        initialPosition = 0;
      }

      i += 1;
    }
  }

  return initialPosition;
};

export const observeWindowWidthAndReload = () => {
  const { ID, VARIATION } = shared;

  let windowWidth = document.body.clientWidth;
  let device = '';
  if (windowWidth > 767) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  window.addEventListener("resize", function(event) {
    if (document.body.clientWidth > 767 && device == 'mobile') {
      device = 'desktop';
      // --- Window re-size - From MOBILE to DESKTOP
      // -- Reload
      window.location.reload();
    } else if (document.body.clientWidth <= 767 && device == 'desktop') {
      device = 'mobile';
      // --- Window re-size - From DESKTOP to MOBILE
      // -- Reload
      window.location.reload();
    }
  });
  
};