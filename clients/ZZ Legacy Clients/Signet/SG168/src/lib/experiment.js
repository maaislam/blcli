/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import otherWatches from './components/otherWatches';
import productCarousel from './components/productCarousel';
import productChanges from './components/productChanges';
import specifications from './components/specifications';
import usps from './components/usps';
import PageContent from './markup';

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

    document.body.classList.add(`${ID}-fossil`);
    new PageContent();
    productCarousel();
    productChanges();
    usps();
    specifications();
    otherWatches();


    const video = document.querySelector(`.${ID}-video video`);
    if(video) {
        video.onplaying = function() {
          fireEvent('Click play video');
        }
    };

    const otherWatch = document.querySelectorAll(`.${ID}__watchProduct`);

    for (let index = 0; index < otherWatch.length; index += 1) {
      const element = otherWatch[index];
      
      if(element) {
        element.addEventListener('click', () => {
         fireEvent('Clicked other watch');
        });
      }
    }

    const addBtn = document.querySelector('#js-add-to-basket');
    if(addBtn) {
      addBtn.addEventListener('click', () => {
        fireEvent('Clicked add to bag');
      });
    }
    
  } else {
    // any control code here
  }
};
