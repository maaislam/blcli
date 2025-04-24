/**
 * SG141 - Auth stockist
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import { getPageType, getBrand } from './helpers';

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
    // test code here
    let pageType = getPageType();
    
    const newBrandMessage = `
    <div class="${ID}-brand-message__wrapper ${ID}-${pageType}">
      <div class="${ID}-message__container">
        <div class="${ID}-logo" data-img="${getBrand(getPageType())}""></div>
        <div class="${ID}-message">Authorised Retailer</div>
      </div>
    </div>`;
  
    //if(window.innerWidth <= 767) {
      document.querySelector('.product-gallery__main').insertAdjacentHTML('beforebegin', newBrandMessage);
    // } else {
    //   document.querySelector('.detail-page__right-column').insertAdjacentHTML('beforebegin', newBrandMessage);
    // }

    document.querySelector(`.${ID}-brand-message__wrapper `).classList.add(`${ID}-block`);

    pollerLite(['.EJ059-Omega__pageContent'], () => {
      if(window.innerWidth > 767) {
        document.querySelector('.product-summary').insertAdjacentElement('beforebegin', document.querySelector(`.${ID}-brand-message__wrapper`));
      } else {
        document.querySelector('.EJ059-Omega__pageContent').insertAdjacentElement('beforebegin', document.querySelector(`.${ID}-brand-message__wrapper`));
      }
    });

    fireEvent(`Visible - Authorised Retailer Message - PDP`);

    // if (pageType == 'plp') {
    //   pollerLite(['.browse__main-content'], () => {
    //     document.querySelector('.browse__main-content').insertAdjacentHTML('afterbegin', newBrandMessage);

    //     fireEvent(`Visible - Authorised Retailer Message - PLP`);
    //   });
    // } else if (pageType == 'pdp') { 
    //   pollerLite(['.product-gallery__main'], () => {
    //     const productGallery = document.querySelector('.product-gallery__main');
    //     if (VARIATION == '1') {
    //       pollerLite(['.swiper-wrapper .swiper-slide.product-gallery__item[aria-label]'], () => {
    //         const swiperContainer = document.querySelector(`.swiper-wrapper`);
    //         // const allSlides = swiperContainer.querySelectorAll('.swiper-slide.product-gallery__item');
    //         // let newSlidesTotal = allSlides.length + 1;


    //         const swiper = document.querySelector('.swiper-container').swiper;
            
    //         swiper.appendSlide(`<div class="swiper-slide product-gallery__item"><div class="${ID}-brand-message__wrapper ${ID}-${pageType} ${ID}-image-gallery">
    //           <div class="${ID}-message__container">
    //             <div class="${ID}-image" data-img="${getBrand(getPageType())}"></div>
    //             <div class="${ID}-message">Authorised Retailer</div>
    //           </div>
    //         </div></div>`);
    //         // swiper.addSlide(index, slides)
    //         swiper.update();
    //         swiper.updateSlides();
    //         swiper.updateSlidesClasses();

    //         fireEvent(`Visible - Authorised Retailer Message - PDP`);
    //       });
          
          
    //     } else if (VARIATION == '2') {
    //       // above image
          
    //       fireEvent(`Visible - Authorised Retailer Message - PDP`);
    //     } else if (VARIATION == '3') {
    //       // below image
    //       pollerLite(['.product-gallery__syte.js-syte-functionality'], () => {
    //         productGallery.insertAdjacentHTML('afterend', newBrandMessage);

    //         productGallery.classList.add(`${ID}-gallery-v${VARIATION}`);
    //         document.querySelector(`.${ID}-brand-message__wrapper `).classList.add(`${ID}-block`);
    //         fireEvent(`Visible - Authorised Retailer Message - PDP`);
    //       });
          
          
    //     }
    //   });
      
    // }

    

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
    
  } else {
    // any control code here
  }
};
