/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import data from './hotelData';
import Swiper from "swiper/swiper-bundle";
import { observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // Loop through results
  const addImages = () => {
    const allResults = document.querySelectorAll('.search-page .hotel-card');
    
    for (let index = 0; index < allResults.length; index += 1) {
      const element = allResults[index];
      const hotelName = element.querySelector('.qa-hotel-name-link').innerText;

      if(data[hotelName]) {
        const imagesToAdd = data[hotelName];
        const images = `
        <div class="${ID}-hotelCarousel swiper" hotel-attr="${hotelName}">
          <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="${imagesToAdd.img1}"/></div>
            <div class="swiper-slide"><img src="${imagesToAdd.img2}"/></div>
            <div class="swiper-slide"><img src="${imagesToAdd.img3}"/></div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>`;

        element.querySelector('a.link').innerHTML = images;
      }
    }
  }

  addImages();


const buildSwiperSlider = sliderElm => {
    const sliderIdentifier = sliderElm.getAttribute('hotel-attr');
    return new Swiper(`.${ID}-hotelCarousel[hotel-attr="${sliderIdentifier}"]`, {
        navigation: {
            nextEl: `.${ID}-hotelCarousel[hotel-attr="${sliderIdentifier}"] .swiper-button-next`,
            prevEl: `.${ID}-hotelCarousel[hotel-attr="${sliderIdentifier}"] .swiper-button-prev`
        },
    });
}

const initSwiper = () => {
  const allSliders = document.querySelectorAll(`.${ID}-hotelCarousel`);
  allSliders.forEach(slider => buildSwiperSlider(slider)); 
}
initSwiper();

const removeAllSliders = () => {
  const allSwipers = document.querySelectorAll(`.${ID}-hotelCarousel`);
  for (let index = 0; index < allSwipers.length; index += 1) {
    const element = allSwipers[index];
    element.remove();
  }
}

const carouselTracking = () => {
  const allCarousels = document.querySelectorAll(`.${ID}-hotelCarousel`);
  for (let index = 0; index < allCarousels.length; index += 1) {
    const carousel = allCarousels[index];
    if(carousel.swiper) {
      carousel.swiper.on('slideChange', () => {
        fireEvent('Used carousel', true);
      });
    }
  }
}

carouselTracking();


observer.connect(document.querySelector('.search-page.qa-search-page .container:not(.search-form--container)'), () => {
  removeAllSliders();
  addImages();
  initSwiper();
  carouselTracking();
}, {
  throttle: 200,
  config: {
    attributes: false,
    childList: true,
    subTree: true
  },
});
  
};
