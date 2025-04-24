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
import PageContent from './components/markup';
import otherWatches from './components/otherWatches';
import productCarousel from './components/productCarousel';
import productDetails from './components/productDetails';
import specifications from './components/specifications';
import uspBar from './uspBar';

const { ID, VARIATION } = shared;

// TO DO: - move over parts from EJ059, get all imagery and content

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
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {

    /** Scroll Effects */
    const addApi = () => {
      var tag = document.createElement('script');
      tag.className = `SGanimation`;
      tag.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    const runScript = () => {
        const script = document.querySelector('.SGanimation');
        script.addEventListener('load', function() {
            AOS.init();
        });
    }

  addApi();
  runScript();
   
    new PageContent();
    productCarousel();
    productDetails();
    specifications();
    uspBar();
    
    pollerLite(['#similar_items-syte-slider'], () => {
      otherWatches();
    });
    
    
  } else {
    // any control code here
  }
};
