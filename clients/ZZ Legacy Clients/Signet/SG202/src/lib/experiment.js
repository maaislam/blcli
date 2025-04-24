/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { addWarranty, initCarousel, insuranceScroll } from './helpers';
import Markup from './markup';
import recommendedProducts from './recommendedProducts';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
   new Markup();

   if(document.querySelectorAll('.product-gallery__image-container img').length > 1) {
    initCarousel();
   }

    pollerLite(['warranty-options', () => {
      if(document.querySelector('warranty-options').shadowRoot.querySelector('.c-modal.c-product-warranty-modal') && document.querySelector("warranty-options").shadowRoot.querySelector(".c-product-warranty-summary__starting-price")) {
        return true;
      }
    }], () => {
      addWarranty();
      insuranceScroll();
    });

    pollerLite(['#similar_items-syte-slider .syte-add-to-cart-item-wrapper-container'], () => {
      recommendedProducts();
    });

    // Ring select changes
    pollerLite(['.product-ring-size__will-it-fit'], () => {
      const willItFit = document.querySelector('.product-ring-size__will-it-fit');
      if(willItFit) {
        willItFit.textContent = 'Will it fit?';

        document.querySelector('.product-ring-size__select option').textContent = 'Please select a ring size';
      }
    });

    // Review changes
    pollerLite(['.product-customer-rating-summary'], () => {
        const reviews = document.querySelector(".product-customer-rating-summary");

        document.querySelector(`.${ID}-reviews`).appendChild(reviews);
  
        // restyle reviews
        const reviewRating = window.digitalData.product[0].productInfo.rating;
        const reviewsNo = window.digitalData.product[0].productInfo.ratingCount;
        const reviewLink = document.querySelector('.product-reviews__write-review-anchor').getAttribute('href');

        document.querySelector('.product-customer-rating-summary__text').textContent = `(${reviewsNo})`;
  
        document.querySelector('.product-reviews__overview__header').outerHTML = `
        <h3>Reviews</h3>
        <a class="${ID}-textLink" href="${reviewLink}">Write a review</a>
        <div class="${ID}-ratingSummary">
          <div class="${ID}-rating"><span></span><h2>${reviewRating}</h2></div>
          <div class="${ID}-reviewamount">${reviewsNo} reviews</div>
        </div>`
  
        const allReviews = document.querySelectorAll('.product-reviews__reviews__container');
        for (let index = 0; index < allReviews.length; index++) {
          const el = allReviews[index];
          el.querySelector('.product-reviews__star-rating-container').childNodes[0].remove();
          el.insertAdjacentElement('beforeend', el.querySelector('.product-reviews__reviews__meta'));
        }
        
    });

    
  } else {
    // any control code here
  }
};
