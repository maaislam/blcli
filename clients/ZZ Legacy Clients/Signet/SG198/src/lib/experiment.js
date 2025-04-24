/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { bestSellersSwiper, swiperSlideTracking, uspSwiper } from './helpers';
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
     // Add swiper to page
     const loadScript = (scriptUrl) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      document.head.appendChild(script);
      
      return new Promise((res, rej) => {
        script.onload = function() {
          res();
        }
        script.onerror = function () {
          rej();
        }
      });
    }
    
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.0.7/swiper-bundle.min.js').then(() => {
      new Markup();   
      
      /* USPs */
      if(VARIATION === '1' || VARIATION === '4') {
        uspSwiper();

        window.addEventListener('resize', function() {
          uspSwiper();
        });
      }

      bestSellersSwiper();
      window.addEventListener('resize', function() {
        bestSellersSwiper();
      });

      // Tracking
      swiperSlideTracking(document.querySelectorAll(`.${ID}-brandBar .swiper-slide`), 'Brand');
      if(VARIATION == '1' || VARIATION === '4'){
        swiperSlideTracking(document.querySelectorAll(`.${ID}-tabContent .${ID}-product`), 'Tab product');
        swiperSlideTracking(document.querySelectorAll(`.${ID}-tabContent .${ID}-image`), 'Tab image');
      }
      swiperSlideTracking(document.querySelectorAll(`.${ID}-bestSellers .swiper-slide`), 'Best seller');
    });
  } else {
   return;
  }
};
