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

import imageSlider from './components/imageSlider';
import recommendedProducts from './components/recommendedProducts';
import uspBox from './components/uspBox';
import { addSpecs, addWarranty, featureCarousel, insuranceScroll, stockCheck } from './helpers';

import Markup from './markup';

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

    // Top elements
    imageSlider();
    stockCheck();
    uspBox();


    // Bottom elements
    featureCarousel();
    addSpecs();

    pollerLite(['warranty-options', () => {
      if(document.querySelector('warranty-options').shadowRoot.querySelector('.c-modal.c-product-warranty-modal')) {
        return true
      }
    }], () => {
      addWarranty();
      insuranceScroll();
    })
    pollerLite(['#syte-similar-items-container', '.syte-similar-items-item-container'], () => {
      recommendedProducts();
    });
  
    
  } else {
    // any control code here
  }
};
