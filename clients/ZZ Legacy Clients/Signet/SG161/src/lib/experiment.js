/* eslint-disable */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import ProductFinder from './ProductFinder';

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
  if (siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  const checkSession = setInterval(function () {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if (
      sessionStorage.getItem('analyticsDataSentFor') &&
      sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname
    ) {
      if (typeof s !== 'undefined') {
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }
      clearInterval(checkSession);
    }
  }, 1000);

  setInterval(function () {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      window._uxa.push(['trackDynamicVariable', { key: `${ID}`, value: `Variation ${VARIATION}` }]);
    }
  }, 800);

  var checkGA = setInterval(function () {
    if (window.ga && window.ga.getAll && document.querySelector('.SG161-button')) {
        clearInterval(checkGA);
        addTracking();
    }
}, 500)

function addTracking(){
        var trackerName = window.ga.getAll()[0].get('name');
        
        document.querySelector('.SG161-button').addEventListener("click", function() {
        
        window.ga(trackerName + '.send', 'event', 'experimentation', 'SG161 - V1', 'Clicked Try it Now', {
            nonInteraction: true
          }); 
})
}

var checkGA2 = setInterval(function () {
  if (window.ga && window.ga.getAll && document.querySelector('.SG161-filter-cta')) {
      clearInterval(checkGA2);
      addTracking2();
  }
}, 500)

function addTracking2(){
      var trackerName = window.ga.getAll()[0].get('name');
      
      document.querySelector('.SG161-filter-cta').addEventListener("click", function() {
      
      window.ga(trackerName + '.send', 'event', 'experimentation', 'SG161 - V1', 'Clicked Find My Watch', {
          nonInteraction: true
        }); 
})
}





  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION !== 'control') {
    if (getSiteFromHostname() == 'hsamuel') {
      ProductFinder();
    }
  } else {
    // any control code here
  }
};
