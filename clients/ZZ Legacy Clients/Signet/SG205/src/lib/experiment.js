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
import { addWarranty, financeInfo, productImage, scrollToElement, stockSlider, tabAccordion } from './helpers';
import Markup from './markup';
import recommendations from './recommendations';

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

    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    
    new Markup();
    productImage();
    financeInfo();
    stockSlider();
    tabAccordion();

    if(document.querySelector('.product-ring-size__select')) {
      document.querySelector('.product-ring-size__select option').textContent = 'Select a ring size';
    }

    pollerLite(['#syte-similar-items-container', '.syte-similar-items-item-container'], () => {
      recommendations();
    });

    if(VARIATION === '1') {
      pollerLite(['warranty-options', () => {
        if(document.querySelector('warranty-options').shadowRoot.querySelector('.c-modal.c-product-warranty-modal')) {
          return true
        }
      }], () => {
        addWarranty();
      });
    }

    if (document.querySelector(".product-customer-rating-summary")) { 
       document.querySelector(`#js-link-reviews`).addEventListener('click', (e) => {
        e.preventDefault();
        scrollToElement(document.querySelector(`.${ID}-allReviewsBlock`));
      });
    }
    
    
    
  } else {
    // any control code here
  }
};
