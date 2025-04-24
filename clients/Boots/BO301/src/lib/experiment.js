/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent, newEvents, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { pollerLite, elementIsInView, viewabilityTracker } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';

const { ID, VARIATION } = shared;
const testID = `${ID}-PL|PDP Flash Offers`;
const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
const testIDAndVariant = `${testID}|${testVariant}`;

const downArrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="6 9 12 15 18 9"></polyline>
</svg>
`;

const tagSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="#cc0033">
<path d="M16.2125 10.7476L10.835 16.1251C10.6957 16.2645 10.5303 16.3752 10.3482 16.4507C10.1661 16.5261 9.97089 16.565 9.77377 16.565C9.57665 16.565 9.38146 16.5261 9.19936 16.4507C9.01726 16.3752 8.85183 16.2645 8.71252 16.1251L2.27002 9.69006V2.19006H9.77002L16.2125 8.63256C16.4919 8.91361 16.6487 9.29378 16.6487 9.69006C16.6487 10.0863 16.4919 10.4665 16.2125 10.7476Z" stroke="#F9E5EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.01819 5.94006H6.02944" stroke="#F9E5EA" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const startExperiment = () => {
  const getPromotionDetails = async () => {
    const availablePromotionsUnformat = document.querySelectorAll(
      '#estore_productpage_template_container #estore_product_promotions_on_pdp li.pdp-promotion-redesign'
    );
    const availablePromotions = [];
    availablePromotionsUnformat.forEach((promotion) => {
      if (promotion.querySelector('a')) {
        availablePromotions.push(promotion);
      }
    });

    let promotionDetails = [];
    const promise = new Promise((resolve) => {
      availablePromotions[0].querySelector('a').addEventListener('mousedown', (e) => {
        e.preventDefault();
        pollerLite(
          ['#estore_product_promotions_on_pdp .pdp-promotion-redesign-container .plpOverlay-newDesign li.redesign-promotionLink'],
          () => {
            promotionDetails = document.querySelectorAll(
              '#estore_product_promotions_on_pdp .pdp-promotion-redesign-container .plpOverlay-newDesign li.redesign-promotionLink'
            );
            // Close the overlay (if needed)
            document.querySelector('.plpRedesignOverlay .close-btn').dispatchEvent(mousedown);
            resolve(promotionDetails);
          }
        );
      });
    });

    const mousedown = new Event('mousedown', { bubbles: true });
    // Trigger the click event
    setTimeout(() => {
      availablePromotions[0].querySelector('a').dispatchEvent(mousedown);
    }, 1000);
    // availablePromotions[0].querySelector('a').click();

    // Wait for the promise to resolve
    await promise;

    return promotionDetails;
  };

  const createAvailableOffers = (promotionDetails) => {
    const priceAdvantageDesc = `
    <p class="${ID}-offer-details-table-row-price-advantage-desc">
    Advantage Cardholders gain access to <a class="${ID}-price-advantage-link" href="https://www.boots.com/shopping/advantage-card">exclusive discounts</a> on selected products across boots.com, the Boots App and In-store.
    If you don't have an Advantage Card, why not <a class="${ID}-price-advantage-link" href="https://www.boots.com/shopping/advantage-card">sign up</a> today? It's free and only takes a couple of minutes.
    </p>`;

    const offerDetailsHtml = `
    <div class="${ID}-offer-details-container" id="${ID}-offer-details-container">
    <div class="${ID}-offer-details-header">
      <h2>Available Offers</h2>
      <p>You can combine promotions, but only one offer code can be used per transaction. Available offers will automatically be applied on checkout.</p>
    </div>
  
    <div class="${ID}-offer-details-table">
      ${Array.from(promotionDetails)
        .map((promotion) => {
          let offerTitle = '';
          let isPriceAdvantage = false;
          if (promotion.querySelector('a[data-promotype="Price advantage"]')) {
            isPriceAdvantage = true;
          }
          if (promotion.querySelector('span')) {
            offerTitle = promotion.querySelector('span').innerHTML;
          } else {
            offerTitle = promotion.innerText.trim().split('-')[0];
          }
          if (promotion.querySelector('#estore_product_promotions')) {
            //new promotion html - is duplicate
            offerTitle = promotion.querySelector('.product-desc').innerText.split('Shop all')[0].trim();
          }
          return `
          <div class="${ID}-offer-details-table-row">
          <div class="${ID}-offer-details-table-row-container">
            <div class="${ID}-offer-details-table-row-header">
              <h3>${offerTitle}</h3>
              ${downArrowSVG}
            </div>
            <div class="${ID}-offer-details-table-row-content ${ID}-display-none">
            ${isPriceAdvantage ? priceAdvantageDesc : ''}
              <p class="${ID}-shop-all">Shop all products in this offer</>
            </div>
          </div>
          </div>
        `;
        })
        .join('')}
    </div>
  </div>
    `;

    document
      .querySelector('#estore_productpage_template_container .template_row_spacer')
      .insertAdjacentHTML('afterend', offerDetailsHtml);

    // Add event listeners to the rows
    const offerRows = document.querySelectorAll(`.${ID}-offer-details-table-row-container`);
    offerRows.forEach((row) => {
      row.addEventListener('click', (e) => {
        const content = row.querySelector(`.${ID}-offer-details-table-row-content`);
        if (content.classList.contains(`${ID}-display-none`)) {
          // fireBootsEvent('Click - PDP Offer details shown', true, eventTypes.experience_action, {
          //   action: actionTypes.click_promotion,
          //   action_detail: 'PDP Offer details shown',
          // });
          content.classList.remove(`${ID}-display-none`);
          row.querySelector('svg').classList.add(`${ID}-rotate-180`);
        } else {
          content.classList.add(`${ID}-display-none`);
          row.querySelector('svg').classList.remove(`${ID}-rotate-180`);
        }
      });
    });
    if (offerRows.length === 1) {
      offerRows[0].click();
    }

    //add event listener to content
    const offerContentLinks = document.querySelectorAll(`.${ID}-offer-details-table-row-content .${ID}-shop-all`);
    offerContentLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // fireBootsEvent('Click - PDP Offer shop all link clicked', true, eventTypes.experience_action, {
        //   action: actionTypes.click_promotion,
        //   action_detail: 'PDP Offer shop all link clicked',
        // });
        const mousedown = new Event('mousedown', { bubbles: true });
        if (promotionDetails[index].querySelector('#estore_product_promotions')) {
          promotionDetails[index].querySelector('.product-desc a').dispatchEvent(mousedown);
        } else {
          promotionDetails[index].querySelector('a').dispatchEvent(mousedown);
        }
      });
    });

    // Define the event listener function
    // const scrollHandler = (e) => {
    //   const offerDetailsContainer = document.querySelector(`#${ID}-offer-details-container`);
    //   if (elementIsInView(offerDetailsContainer)) {
    //     // fireBootsEvent('PDP Offer details table shown', true, eventTypes.experience_render, {
    //     //   rendered_element: elementTypes.Promotions,
    //     //   rendered_detail: 'PDP Offer details table shown',
    //     // });

    //     // Remove the event listener using the same function reference
    //     window.removeEventListener('scroll', scrollHandler);
    //   }
    // };

    // // Add the event listener
    // window.addEventListener('scroll', scrollHandler);
  };

  const createProductDetailOffer = (promotionDetails) => {
    let promoText = '';
    if (promotionDetails[0].querySelector('span') && promotionDetails[0].querySelector('span').innerText !== '') {
      promoText = promotionDetails[0].querySelector('span').innerText;
    } else if (promotionDetails[0].querySelector('.product-desc')) {
      promoText = promotionDetails[0].querySelector('.product-desc').innerText;
    } else {
      promoText = promotionDetails[0].innerText;
    }
    const offerDetailsHtml = `
    <div class="${ID}-product-detail-offer">
      <div class="${ID}-product-detail-offer-tag">
        ${tagSVG} ${promotionDetails.length > 1 ? 'Offers' : 'Offer'}
      </div>
      <div class="${ID}-product-detail-offer-desc">
        ${
          promotionDetails.length > 1
            ? `<p class="${ID}-offer-num"><span>${promotionDetails.length}</span> available.</p>`
            : `<p class="${ID}-offer-num">${promoText}</p>`
        }
        <a class="${ID}-offer-button" href="#${ID}-offer-details-container">View ${
      promotionDetails.length > 1 ? 'Offers' : 'Offer'
    }</a>
      </div>
    </div>
    `;

    const targetContainer = document.querySelector('ul.pdp-promotion-redesign-container');
    targetContainer.insertAdjacentHTML('beforebegin', offerDetailsHtml);

    // fireBootsEvent('PDP product detail offer shown', true, eventTypes.experience_render, {
    //   rendered_element: elementTypes.Promotions,
    //   rendered_detail: 'PDP product detail offer shown',
    // });

    const usabillaTrigger = (action) => {
      if (window.usabilla_live) {
        window.usabilla_live('trigger', `${action}`);
      }
    };

    // Add event listener to the button
    const offerButton = document.querySelector(`.${ID}-offer-button`);
    offerButton.addEventListener('click', (e) => {
      e.preventDefault();
      // fireBootsEvent('Click - PDP Details Offer button clicked', true, eventTypes.experience_action, {
      //   action: actionTypes.click_promotion,
      //   action_detail: 'PDP Details Offer button clicked',
      // });
      const target = document.querySelector(`#${ID}-offer-details-container`);
      target.scrollIntoView({ behavior: 'smooth' });
      usabillaTrigger('BO301-1|PDP Flash Offers Design|offers seen');
    });
  };

  const getDetailsThenInsert = async () => {
    const promotionDetails = await getPromotionDetails();

    createProductDetailOffer(promotionDetails);
    createAvailableOffers(promotionDetails);
  };

  getDetailsThenInsert();
};

const addTrackingATB = () => {
  if (VARIATION === 'control') {
    let interaction = false;
    document.body.addEventListener('click', (e) => {
      if (e.target.closest('.pdp-promotion-redesign-container .pdp-promotion-redesign a')) {
        interaction = true;
      }
      // if (e.target.closest('.shopperActions #add2CartBtn') && !interaction) {
      //   fireBootsEvent('Click - ATB clicked without offer interaction', true, eventTypes.experience_action, {
      //     action: actionTypes.add_to_cart,
      //     action_detail: 'ATB clicked without offer interaction',
      //   });
      // } else if (e.target.closest('.shopperActions #add2CartBtn') && interaction) {
      //   fireBootsEvent('Click - ATB clicked with offer interaction', true, eventTypes.experience_action, {
      //     action: actionTypes.add_to_cart,
      //     action_detail: 'ATB clicked with offer interaction',
      //   });
      // }
    });
  } else {
    let interaction = false;
    document.body.addEventListener('click', (e) => {
      if (e.target.closest(`.${ID}-product-detail-offer`)) {
        interaction = true;
      }

      // if (e.target.closest('.shopperActions #add2CartBtn') && !interaction) {
      //   fireBootsEvent('Click - ATB clicked without offer interaction', true, eventTypes.experience_action, {
      //     action: actionTypes.add_to_cart,
      //     action_detail: 'ATB clicked without offer interaction',
      //   });
      // } else if (e.target.closest('.shopperActions #add2CartBtn') && interaction) {
      //   fireBootsEvent('Click - ATB clicked with offer interaction', true, eventTypes.experience_action, {
      //     action: actionTypes.add_to_cart,
      //     action_detail: 'ATB clicked with offer interaction',
      //   });
      // }
    });
  }
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

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTrackingATB();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  let currHref = window.location.href.toLowerCase();

  if (currHref.indexOf('dyson') == -1 && currHref.indexOf('chanel') == -1 && currHref.indexOf('dior') == -1) {
    pollerLite(
      [
        '#estore_productpage_template_container #estore_product_promotions_on_pdp li.pdp-promotion-redesign',
        'meta[name="layoutName"]'
      ],
      () => {
        const metaNameElem = document.querySelector('meta[name="layoutName"]');
        if (metaNameElem && metaNameElem.content.toLowerCase().includes('opticians')) {
          document.querySelector('html').classList.remove(`${ID}`);
          document.querySelector('html').classList.remove(`${ID}-${VARIATION}`);

          return;
        }
        // if (VARIATION == 'control') {
        //   const promosInView = elementIsInView(document.querySelector('#estore_productpage_template_container #estore_product_promotions_on_pdp li.pdp-promotion-redesign'));
        //   if(promosInView){
        //     fireBootsEvent('PDP product detail offers  would have shown', true, eventTypes.experience_render, {
        //       rendered_element: elementTypes.Promotions,
        //       rendered_detail: 'PDP product detail offers would have shown',
        //     });
        //   }

        //   const offerTablePosition = document.querySelector('#estore_productpage_template_container .template_row_spacer').nextElementSibling
        //   viewabilityTracker(offerTablePosition, () => {
        //     fireBootsEvent('PDP Offer details table would have shown', true, eventTypes.experience_render, {
        //       rendered_element: elementTypes.Promotions,
        //       rendered_detail: 'PDP Offer details table would have shown',
        //     });
        //   }, {
        //     removeOnView: true
        //   }
        //   );
        //   return;
        // }
        startExperiment();
      }
    );
  }
  //remove BO301 class from html root if dyson, chanel or dior - prevents css from working on these pages
  //const isOpticianPage = () => document.querySelector('meta[name="layoutName"]').content.toLowerCase().includes('opticians');

  if (currHref.indexOf('dyson') > -1 || currHref.indexOf('chanel') > -1 || currHref.indexOf('dior') > -1) {
    document.querySelector('html').classList.remove(`${ID}`);
  }
};
