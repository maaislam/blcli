/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';
import topContent from './topContent';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  if(VARIATION === '1' || VARIATION === '2') {
    topContent();

    // tracking
    const allButtons = document.querySelectorAll(`.${ID}-buttons .${ID}-button`);
    if(allButtons) {
      for (let index = 0; index < allButtons.length; index += 1) {
        const element = allButtons[index];
        element.addEventListener('click', (e) => {
          fireEvent('Clicked CTA' + e.currentTarget.innerText.trim());
        });
      }
    }

    const allOffers = document.querySelectorAll(`.${ID}-offers .${ID}-offer`);
    if(allOffers) {
      for (let i = 0; i < allOffers.length; i += 1) {
        const offer = allOffers[i];
        offer.addEventListener('click', (e) => {
          fireEvent('Clicked Offer');
        });
      }
    }

  } else {

    const heroBannerSlides = document.querySelectorAll(`.oct-carousel-hero__inner .swiper-slide a`);
    const paydaySlides = document.querySelectorAll(`#cu_2021_pay_day a`);
    if (heroBannerSlides){
    for (let index = 0; index < heroBannerSlides.length; index += 1) {
      const element = heroBannerSlides[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Hero Banner');
      });
    }
  }
  if (paydaySlides){
    for (let index = 0; index < paydaySlides.length; index += 1) {
      const element = paydaySlides[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked Hero Banner Payday');
      });
    }
  }
}
  
};
