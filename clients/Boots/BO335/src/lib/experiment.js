/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import { elementIsInView } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import eventTypes from './eventTypes';
import actionTypes from './actionTypes';
import elementTypes from './elementTypes';
import { onUrlChange } from './helpers/utils';
import getProducts from './helpers/getProducts';

const { ID, VARIATION } = shared;

const DOM_RENDER_DELAY = 2000;
const tagSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="#cc0033">
<path d="M16.2125 10.7476L10.835 16.1251C10.6957 16.2645 10.5303 16.3752 10.3482 16.4507C10.1661 16.5261 9.97089 16.565 9.77377 16.565C9.57665 16.565 9.38146 16.5261 9.19936 16.4507C9.01726 16.3752 8.85183 16.2645 8.71252 16.1251L2.27002 9.69006V2.19006H9.77002L16.2125 8.63256C16.4919 8.91361 16.6487 9.29378 16.6487 9.69006C16.6487 10.0863 16.4919 10.4665 16.2125 10.7476Z" stroke="#F9E5EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.01819 5.94006H6.02944" stroke="#fff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const pollerLite = (conditions, callback, maxTime = 20000) => {
  const POLLING_INTERVAL = 25;
  const startTime = Date.now();
  const interval = setInterval(() => {
    const allConditionsMet = conditions.every((condition) => {
      if (typeof condition === 'function') {
        return condition();
      }
      return !!document.querySelector(condition);
    });
    if (allConditionsMet) {
      clearInterval(interval);
      callback();
    } else if (Date.now() - startTime >= maxTime) {
      clearInterval(interval);
      console.error('Polling exceeded maximum time limit');
    }
  }, POLLING_INTERVAL);
};

const promoMsg = (count) => {
  const html = `
      
    <div class="${ID}__newpromo-msg">
      <div class="badge-container">
          <div class="badge-icon">${tagSVG}</div>
          <div class="badge-text">Offers</div>
      </div>
      <div class="msg-container">
          <div class="msg-promocount">${count}</div>
          <div class="msg-text">available.</div>
      </div>
    </div>
`;

  return html;
};

const init = () => {
  //remove if existing
  const newElems = document.querySelectorAll(`.${ID}__newpromo-msg`);

  newElems.forEach((newElem) => {
    newElem.remove();
  });

  pollerLite(['.oct-listers-hits', () => document.querySelectorAll('[data-testid="cell"]').length > 0], () => {
    const productCards = document.querySelectorAll('.oct-listers-hits [data-testid="cell"].oct-grid__cell');
    // console.log(productCards, 'PRODUCT CARD')
    const productSkus = [];
    productCards.forEach((productCard) => {
      const hasPromoBanner = productCard.querySelector('.oct-teaser__offer--isAvailable');
      if (!hasPromoBanner) return;
      //hasPromoBanner.style.border = '5px solid green';
      //console.log(' ~ productCards.forEach ~ hasPromoBanner:', hasPromoBanner);

      const productUrl = productCard.querySelector('a').href;
      const productSku = productUrl.split('-').pop();
      // console.log(' ~ productCards.forEach ~ productSku:', productSku);
      productSkus.push(productSku);
    });
    getProducts(productSkus).then((products) => {
      // console.log(' ~ getProducts ~ products', products);
      products.forEach((product) => {
        const productCardLinkElem = document.querySelector(`[href*="${product.model}"]`);
        const productCard = productCardLinkElem.closest('[data-testid="cell"]');
        const numberOfPromotions = product.promotionalText.length;

        //const newPromoMessage = `${numberOfPromotions} promotion${numberOfPromotions > 1 ? 's' : ''} available`;
        //place above original in a new div

        const orinalPromoBanner = productCard.querySelector('.oct-teaser__offer--isAvailable');
        if (orinalPromoBanner) {
          orinalPromoBanner.insertAdjacentHTML('beforebegin', promoMsg(numberOfPromotions));
          //hide oroginal
          orinalPromoBanner.style.display = 'none';
        }
      });
    });
  });
};

const downArrowSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="6 9 12 15 18 9"></polyline>
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
          ['#estore_product_promotions_on_pdp .pdp-promotion-redesign-container li'],
          () => {
            const promoDetail1 = document.querySelectorAll(
              '#estore_product_promotions_on_pdp .pdp-promotion-redesign-container .plpOverlay-newDesign li.redesign-promotionLink'
            );
            const promoDetail2 = document.querySelectorAll(
              '#estore_product_promotions_on_pdp .pdp-promotion-redesign-container li.pdp-promotion-redesign:not(.digital-offer)'
            );
            promotionDetails = promoDetail1.length > 0 ? promoDetail1 : promoDetail2;
            // Close the overlay (if needed)
            const interval = setInterval(() => {
              if (document.querySelector('.plpRedesignOverlay .close-btn')) {
                document.querySelectorAll('#overlay').forEach((item) => {
                  item.removeAttribute('style');
                  item.style.display = 'none';
                  item.click();
                });
                document.querySelector('.plpRedesignOverlay .close-btn').dispatchEvent(mousedown);
              }
            }, 100);
            setTimeout(() => {
              clearInterval(interval);
            }, 5000);
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
          fireBootsEvent('Click - PDP Offer details shown', true, eventTypes.experience_action, {
            action: actionTypes.click_promotion,
            action_detail: 'PDP Offer details shown',
          });
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
        fireBootsEvent('Click - PDP Offer shop all link clicked', true, eventTypes.experience_action, {
          action: actionTypes.click_promotion,
          action_detail: 'PDP Offer shop all link clicked',
        });
        const mousedown = new Event('mousedown', { bubbles: true });
        if (promotionDetails[index].querySelector('#estore_product_promotions')) {
          promotionDetails[index].querySelector('.product-desc a').dispatchEvent(mousedown);
        } else {
          promotionDetails[index].querySelector('a').dispatchEvent(mousedown);
        }
      });
    });

    // Define the event listener function
    const scrollHandler = (e) => {
      const offerDetailsContainer = document.querySelector(`#${ID}-offer-details-container`);
      if (elementIsInView(offerDetailsContainer)) {
        fireBootsEvent('PDP Offer details table shown', true, eventTypes.experience_render, {
          rendered_element: elementTypes.Promotions,
          rendered_detail: 'PDP Offer details table shown',
        });

        // Remove the event listener using the same function reference
        window.removeEventListener('scroll', scrollHandler);
      }
    };

    // Add the event listener
    window.addEventListener('scroll', scrollHandler);
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

    const usabillaTrigger = (action) => {
      if (window.usabilla_live) {
        window.usabilla_live('trigger', `${action}`);
      }
    };

    // Add event listener to the button
    const offerButton = document.querySelector(`.${ID}-offer-button`);
    offerButton.addEventListener('click', (e) => {
      e.preventDefault();
      fireBootsEvent('Click - PDP Details Offer button clicked', true, eventTypes.experience_action, {
        action: actionTypes.click_promotion,
        action_detail: 'PDP Details Offer button clicked',
      });
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
      if (e.target.closest('.shopperActions #add2CartBtn') && !interaction) {
        fireBootsEvent('Click - ATB clicked without offer interaction', true, eventTypes.experience_action, {
          action: actionTypes.add_to_cart,
          action_detail: 'ATB clicked without offer interaction',
        });
      } else if (e.target.closest('.shopperActions #add2CartBtn') && interaction) {
        fireBootsEvent('Click - ATB clicked with offer interaction', true, eventTypes.experience_action, {
          action: actionTypes.add_to_cart,
          action_detail: 'ATB clicked with offer interaction',
        });
      }
    });
  } else {
    let interaction = false;
    document.body.addEventListener('click', (e) => {
      if (e.target.closest(`.${ID}-product-detail-offer`)) {
        interaction = true;
      }

      if (e.target.closest('.shopperActions #add2CartBtn') && !interaction) {
        fireBootsEvent('Click - ATB clicked without offer interaction', true, eventTypes.experience_action, {
          action: actionTypes.add_to_cart,
          action_detail: 'ATB clicked without offer interaction',
        });
      } else if (e.target.closest('.shopperActions #add2CartBtn') && interaction) {
        fireBootsEvent('Click - ATB clicked with offer interaction', true, eventTypes.experience_action, {
          action: actionTypes.add_to_cart,
          action_detail: 'ATB clicked with offer interaction',
        });
      }
    });
  }
};

export default () => {
  // const { ID, VARIATION } = shared;
  let pageType = '';
  if(VARIATION === '1') {
    pageType = 'PDP Flash Offers';
  } else if(VARIATION === '2') {
    pageType = 'PLP Flash Offers';
  } else if(VARIATION === '3') {
    pageType = 'PDP && PLP Flash Offers';
  }

  const testID = `${ID}|${pageType}`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();
  fireBootsEvent('Conditions Met');

  const isChanelOrDior = window.location.href.indexOf('chanel') > -1 || window.location.href.indexOf('dior') > -1;
  if (isChanelOrDior) {
    return;
  }

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__newpromo-msg`)) {
      const parent = target.closest('.oct-teaser__wrap');
      const viewAllOfferBtn = parent.querySelector('button');
      viewAllOfferBtn.click();
    } else if (target.closest('a') && target.closest('[data-testid="cell"]')) {
      fireBootsEvent('Click - visited PDP ', true, eventTypes.experience_action, {
        action: actionTypes.click_product,
        action_detail: 'User visited PDP',
      });
    } else if (target.closest('.oct-teaser__wrap')) {
      fireBootsEvent('Click - offer Btn', true, eventTypes.experience_action, {
        action: actionTypes.click_promotion,
        action_detail: 'User clicked offer Btn',
      });

      const prodCardElem = target.closest('[data-testid="cell"]');
      prodCardElem.setAttribute('data-promointeraction', true);
    } else if (target.closest('[id*="add2CartBtn_"]') || target.closest('[id*="increseQty_"]')) {
      const prodCardElem = target.closest('[data-testid="cell"]');
      const hasInteracted = prodCardElem.getAttribute('data-promointeraction');

      fireBootsEvent(
        `Click - ATB Clicked ${hasInteracted ? 'with' : 'without'} offer interaction`,
        true,
        eventTypes.experience_action,
        {
          action: actionTypes.add_to_cart,
          action_detail: `ATB Clicked ${hasInteracted ? 'with' : 'without'} offer interaction`,
        }
      );

      prodCardElem.removeAttribute('data-promointeraction');
    }
  });

  const scrollHandlerControl = (e) => {
    const offerDetailsContainer = document.querySelector('.oct-teaser__offer--isAvailable');
    if (elementIsInView(offerDetailsContainer)) {
      //console.log(' ~ scrollHandler ~ offerDetailsContainer:', offerDetailsContainer);
      fireBootsEvent('PLP promo ribbon seen', true, eventTypes.experience_render, {
        rendered_element: elementTypes.Promotions,
        rendered_detail: 'PLP promo ribbon seen',
      });

      // Remove the event listener using the same function reference
      window.removeEventListener('scroll', scrollHandlerControl);
    }
  };

  const scrollHandlerVariation = (e) => {
    const offerDetailsContainer = document.querySelector(`.${ID}__newpromo-msg`);
    if (!offerDetailsContainer) return;
    if (elementIsInView(offerDetailsContainer)) {
      //console.log(' ~ scrollHandler ~ offerDetailsContainer:', offerDetailsContainer);
      fireBootsEvent('PLP promo ribbon seen', true, eventTypes.experience_render, {
        rendered_element: elementTypes.Promotions,
        rendered_detail: 'PLP promo ribbon seen',
      });

      // Remove the event listener using the same function reference
      window.removeEventListener('scroll', scrollHandlerVariation);
    }
  };

  // Add the event listener

  addTrackingATB();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    window.addEventListener('scroll', scrollHandlerControl);
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  //V1 = PDP Flash Offers
  //V2 = PLP Flash Offers
  //V3 = PDP && PLP Flash Offers
  if(VARIATION === '1') {
    console.log('V1');
    let currHref = window.location.href.toLowerCase();
    if (currHref.indexOf('dyson') == -1 && currHref.indexOf('chanel') == -1 && currHref.indexOf('dior') == -1) {
      pollerLite(['#estore_productpage_template_container #estore_product_promotions_on_pdp li.pdp-promotion-redesign'], () => {
        startExperiment();
      });
    }
  }
  if(VARIATION === '2') {
    setTimeout(init, DOM_RENDER_DELAY);
    scrollHandlerVariation();
  
    onUrlChange(() => {
      setTimeout(init, DOM_RENDER_DELAY);
      scrollHandlerVariation();
    });
  }

  if(VARIATION === '3') {
      setTimeout(init, DOM_RENDER_DELAY);
      scrollHandlerVariation();

      onUrlChange(() => {
        setTimeout(init, DOM_RENDER_DELAY);
        scrollHandlerVariation();
      });

      let currHref = window.location.href.toLowerCase();
      if (currHref.indexOf('dyson') == -1 && currHref.indexOf('chanel') == -1 && currHref.indexOf('dior') == -1) {
        pollerLite(['#estore_productpage_template_container #estore_product_promotions_on_pdp li.pdp-promotion-redesign'], () => {
          startExperiment();
        });
      }
  }
};
