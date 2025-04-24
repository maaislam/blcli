/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { initCarousel, elTracking, uspSwiper, bannerCarouselSwiper } from './helpers';
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
    
    // Carousels
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
          if(typeof window.Swiper !== 'undefined') {
              initCarousel(`.${ID}-categories`, 2.6, 5.5, 6.5, true);
              bannerCarouselSwiper();
              //initCarousel(`.${ID}-banners`, 1, 3, 3, false);
              initCarousel(`.${ID}-brands`, 1.5, 3.5, 4.5, true);
              initCarousel(`.${ID}-bestsellers`, 1.5, 3, 4, true);

              if(VARIATION === '1') {
                uspSwiper();

                window.addEventListener('resize', function() {
                  uspSwiper();
                });
            }

            /* Tracking */
            elTracking(`.${ID}-categories .${ID}-slide`, 'Category roundel');
            elTracking(`.${ID}-banners .${ID}-slide`, 'Main banner');
            elTracking(`.${ID}-bestsellers .${ID}-slide`, 'Best selling product');
            elTracking(`section.${ID}-brands .${ID}-slide`, 'Brand in brand bar');
            elTracking(`.${ID}-tabTop`, 'Tab CTA');
            elTracking(`.${ID}-trending .${ID}-brand`, 'Trending brand');
            elTracking(`.${ID}-block`, 'Content spot');

            if(VARIATION === '1') {
              document.querySelector(`.${ID}-offer a`).addEventListener('click', () => {
                fireEvent('Clicked large offer CTA');
              });
            }
          }
    });

    document.querySelector('.email-sign-up').insertAdjacentElement('beforebegin', document.querySelector('.tnc-banner'));

    /*
    window.addEventListener('resize', function() {
            runUSP();
        });
    */
  } else {
    // any control code here
  }
};
