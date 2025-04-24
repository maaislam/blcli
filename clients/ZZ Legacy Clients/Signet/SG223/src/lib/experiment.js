/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer } from '../../../../../lib/utils';
import products from './data';

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

  if(VARIATION === 'control') {
    return;
  }

  if(VARIATION !== 'control') {
    // test code here

   const createBadge = (el) => {
    const badge = document.createElement('div');
    badge.classList.add(`${ID}-badge`);
    badge.innerHTML = `<span>Price Guarantee</span>`;
    el.appendChild(badge);
   }

   const removeBadge = () => {
    const allBadges = document.querySelectorAll(`.${ID}-badge`);
    for (let index = 0; index < allBadges.length; index += 1) {
      const element = allBadges[index];
      element.remove();
    }
   }

   const checkProducts = () => {
    const allProducts = document.querySelectorAll('.product-card');
    for (let index = 0; index < allProducts.length; index += 1) {
      const element = allProducts[index];
      const elSku = element.getAttribute('data-insights-object-id');
      if (products.indexOf(elSku) > -1) {
        createBadge(element);
    }
   }
  }

  checkProducts();

  observer.connect(document.querySelector('.products.products-display--grid'), () => {
    removeBadge();
    checkProducts();
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
      subTree: true
    },
  });
    
  } 
};
