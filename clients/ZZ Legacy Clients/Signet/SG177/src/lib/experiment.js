/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { add } from 'lodash';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import NewCarouselThumbs from './carousel';
import productChanges from './productChanges';

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

    new NewCarouselThumbs();
    productChanges();
    
    var checkGAEvent = setInterval(function () {
      if (window.ga && window.ga.getAll) {
          clearInterval(checkGAEvent);
          addEvents();
      }
    }, 500)
    
    function addEvents(){
        var stockEl = document.querySelector('.SG177-stockCheck');
    if (stockEl) {
        var trackerName = window.ga.getAll()[0].get('name');
    
        stockEl.addEventListener("click", function() {
            window.ga(trackerName + '.send', 'event', 'Experimentation', 'Signet - SG177', 'Click Stock Check V1', {
                nonInteraction: true
              }); 
    
          });  
    }        
    }

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
    
  } else {
    var checkGAEvent = setInterval(function () {
      if (window.ga && window.ga.getAll) {
          clearInterval(checkGAEvent);
          addEvents();
      }
    }, 500)
    
    function addEvents(){
        var stockEl = document.querySelector('.cis-postcode-search');
    if (stockEl) {
        var trackerName = window.ga.getAll()[0].get('name');
    
        stockEl.addEventListener("click", function() {
            window.ga(trackerName + '.send', 'event', 'Experimentation', 'Signet - SG177', 'Click Stock Check Control', {
                nonInteraction: true
              }); 
    
          });  
    }  
    }
    
    // any control code here
  }
};
