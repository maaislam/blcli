/**
 * HOF-297 one-size basket recommentatinons with ATB
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events, logMessage, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

const { ID, VARIATION } = shared;
let pageData,
  mySwiper,
  recsHolder,
  carouselLeftArrow,
  carouselRightArrow,
  carouselInner,
  carouselHolder;

const getPageData = () => {
  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.event && data.event === 'HOF_onLoad') {
      dataObject = data;
      break;
    }
  }
  return dataObject;
};

const initiateSlider = () => {
  // Run slick
  let slider = document.querySelector(`#${ID}-recs-carousel-inner`);
  slider.classList.add('swiper-active');
  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 10,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      1300: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      992: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
      },
      767: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      600: {
        slidesPerView: 1.2,
        slidesPerGroup: 1,
      },
    },
    navigation: {
      nextEl: `.${ID}-button-next`,
      prevEl: `.${ID}-button-prev`,
    },
  });

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel
  setTimeout(function () {
    mySwiper.init();
  }, 150);

  setTimeout(function () {
    carouselHolder.classList.remove('loading');
  }, 400);
};

const buildCarousel = () => {
  pollerLite(['#BasketDiv'], () => {
    let insertionPoint = document.getElementById('BasketDiv');

    let recsHTML = `

      <div class="${ID}-recs-holder" id="${ID}-recs-holder">

        <h2> You may like </h2>

        <div class="${ID}-recs-carousel-holder loading">

          <div class="${ID}-loading-spinner">
              <p> Updating... </p>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
              </svg>
          </div>

          <div id="${ID}-recs-carousel-inner" class="${ID}-recs-carousel-inner swiper-container">
            <div class="swiper-wrapper">

            </div>
          </div>

          <button class="${ID}-button ${ID}-button-prev"> <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="4.35 8.18 0.35 4.18 4.35 0.18"/></g></g></svg></button>
          <button class="${ID}-button ${ID}-button-next"> <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.53 8.35"><defs><style>.cls-1{stroke-miterlimit:10;stroke-width:0.5px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="0.18 0.18 4.18 4.18 0.18 8.18"/></g></g></svg></button>

        </div>


      </div>

    `;

    insertionPoint.insertAdjacentHTML('beforebegin', recsHTML);

    let shownMessage = 'Visible - the one-size product carousel has been shown';
    logMessage(shownMessage);
    fireEvent(shownMessage);

    carouselLeftArrow = document.querySelector(`.${ID}-button-prev`);
    carouselRightArrow = document.querySelector(`.${ID}-button-next`);
    carouselInner = document.querySelector(`.${ID}-recs-carousel-inner`);
    carouselHolder = document.querySelector(`.${ID}-recs-carousel-holder`);
    recsHolder = document.querySelector(`.${ID}-recs-holder`);

    getProductData();
  });
};

const formatPrice = (price) => {
  let currencyText = document.querySelector(
    '.spanCurrencyLanguageSelector > p'
  ).innerHTML;
  let currencyCode = currencyText
    .substring(currencyText.indexOf(' '), currencyText.length)
    .trim();
  let alteredPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  if (currencyCode == 'EUR') {
    alteredPrice = alteredPrice.replace('.', ',');
  }
  return alteredPrice;
};

const populateCarousel = (items) => {
  // get the carousel wrapper
  let recsRef = document.querySelector(
    `#${ID}-recs-carousel-inner .swiper-wrapper`
  );
  let slots = items;
  // create and insert HTML for each slot
  [].slice.call(slots).forEach((slot) => {
    let recsInnerHTML = `
        <div data-product-sku="${
          slot.item.sku
        }" class="swiper-slide ${ID}-carousel-slide">

              <a href="${slot.item.url}" class="${ID}-carousel-image">
                <img src="${
                  slot.item.image_url
                }" class="${ID}-carousel-image-element" alt="${
      slot.item.name
    } image" />
              </a>
              <div class="${ID}-carousel-product-info">
                <a href="${slot.item.url}">
                <p class="${ID}-product-brand"> ${slot.item.brand} </p>
                <p class="${ID}-product-name"> ${slot.item.name} </p>
                <p class="${ID}-prices ${
                  slot.item.price == slot.item.ticket_price ||
                  slot.item.ticket_price == '0.00'
                    ? 'equal-prices'
                    : ''
                }"> <span class="now-price">${formatPrice(
                  slot.item.price
                )}</span> <span class="was-price">${formatPrice(
                  slot.item.ticket_price
                )}</span> </p>
                </a>
                <button data-sku=${
                  slot.item.sku
                } class="${ID}-atb-button">Add to Bag</button>
              </div>

            </div>

        </div>
      `;

    recsRef.insertAdjacentHTML('beforeend', recsInnerHTML);
  });

  addATBFunctionality();

  setTimeout(() => {
    // initiate slider
    initiateSlider();
  }, 250);
};

const addATBFunctionality = () => {
  let allAtbButtons = document.querySelectorAll(`.${ID}-atb-button`);

  [].slice.call(allAtbButtons).forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      let newSKU = e.target.getAttribute('data-sku');

      let sizeVarId = newSKU.substring(0, newSKU.indexOf('-'));

      sizeVarId = sizeVarId + '000';

      let bagContent = [
        {
          sizeVariantId: sizeVarId,
          quantity: '1',
          personalisation: [],
          isProductRec: false,
        },
      ];

      $.ajax({
        type: 'POST',
        url: '/api/basket/v1/add',
        data: JSON.stringify(bagContent),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true,
        },
        success: function (data, error) {
          let addedMessage =
            'Click - product sizeVarId: ' + sizeVarId + ' added to basket';
          logMessage(addedMessage);
          fireEvent(addedMessage);

          window.location.reload();
        },
      });
    });
  });
};

const getProductData = () => {
  DYO.recommendationWidgetData(125396, {}, function (error, data) {
    populateCarousel(data.slots);
  });
};

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  pollerLite(
    [
      () => {
        if (typeof getPageData() !== 'undefined') {
          return true;
        }
      },
    ],
    () => {
      pageData = getPageData();

      if (pageData.transactionPurchaseQuantity > 0) {
        buildCarousel();
      } else {
        let noBasketItemsMessage = 'No items in basket';
        logMessage(noBasketItemsMessage);
        fireEvent(noBasketItemsMessage);
      }
    }
  );
};
