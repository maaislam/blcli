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
import uspBox from './components/uspBox';
import { addSpecs, addWarranty, insuranceScroll } from './helpers';
import Markup from './markup';
//import Swiper from 'swiper/swiper-bundle';



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
  const loadScript = (scriptUrl) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
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


  if(VARIATION !== 'control') {
    
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.1.1/swiper-bundle.min.js').then(() => {
        if(typeof window.Swiper !== 'undefined') {
          new Markup();
          imageSlider();
          uspBox();

          const stockCheck = document.querySelector('.store-finder-flyout-drawer-section');
          document.body.appendChild(stockCheck);


          addSpecs();
        
          pollerLite(['.product-detail__warrantyuk', '.amor-container[data-sig-mod="productWarranty"]', () => {
            if(document.querySelectorAll('.product-detail-warranty-details strong')[1]) {
              return true
            }
          }], () => {
            const warrantyModal = document.querySelector('.amor-container[data-sig-mod="productWarranty"]');
            document.body.appendChild(warrantyModal);

            addWarranty();
            insuranceScroll();
          });

          // Add delivery date
          setTimeout(() => {
            const slideOutDate = document.querySelector(`.${ID}-inner.delivery .date`);
            const deliveryDate = document.querySelector('.product-delivery-mob-align');
            slideOutDate.innerText = deliveryDate.innerText;
          }, 3000);

          // Image Carousel

          if(document.querySelectorAll('.product-gallery .product-gallery__thumbs-container img').length > 1) {

            const mySwiper = new Swiper(`.${ID}-mainProductSlider .swiper-container`, {
                  
                  direction: 'horizontal',
                  loop: true,
                  effect: 'fade',
                  observer: true,  
                  observeParents: true,
                  pagination: {
                    el: `.${ID}-mainProductSlider .swiper-pagination`,
                    type: 'bullets',
                  },
                  paginationClickable: true,
                  navigation: {
                      nextEl: `.${ID}-mainProductSlider .${ID}-swiperNext`,
                      prevEl: `.${ID}-mainProductSlider .${ID}-swiperPrev`,
                      clickable: true
                  },
              
            });
            // if(mySwiper) {
            //     mySwiper.update();
            //     mySwiper.navigation.update();
            // }
          }

          // Feature carousel
          if(document.querySelector(`.${ID}-carouselModal`)) {
            const swiper = new Swiper(`.${ID}-carouselModal .${ID}-swiper`, {
              direction: 'horizontal',
              loop: true,
              fadeEffect: { crossFade: true },
              effect: 'fade',
              virtualTranslate: true,
              draggable: true,
              autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
              },
              speed: 1000, 
              slidesPerView: 1,
              initialSlide : 0,
              observer: true,  
              observeParents: true,
              paginationClickable: true,
              pagination: {
                  el: `.${ID}-progessPagination`,
                clickable: true
              },
              navigation: {
                nextEl: `.${ID}-modalInner .${ID}-swiperNext.swiper-button-next`,
                prevEl: `.${ID}-modalInner .${ID}-swiperPrev.swiper-button-prev`,
                clickable: true
              },
            });

            swiper.autoplay.running = true;
          }
        }
      });
    
  } else {
    // any control code here
  }
};
