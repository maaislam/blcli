/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observePageChange } from '../../../../../lib/utils';
import renderBanner from './components/renderBanner';

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
  if (VARIATION == 'control') {
    return;
  }
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'https://m7cdn.io/common/js/swiper.js';
  document.querySelector('head').append(s);

  var link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'https://dev.m7cdn.io//common/css/swiper.css';

  document.querySelector('head').append(link);

  renderBanner(ID, fireEvent);

  var swiperInterval = window.setInterval(mySlick, 300);

  function loadSwiper() {
    var swiper = new Swiper('.HDA009-swiper-container', {
      slidesPerView: 1,
      direction: 'horizontal',
      allowTouchMove: false,

      effect: 'slide',

      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.HDA009__swiper-pagination',
      },

      breakpoints: {
        768: {
          slidesPerView: 3,
          autoplay: false,
        },
      },
    });
  }
  function mySlick() {
    if (Swiper != 'undefined') {
      loadSwiper();
      window.clearInterval(swiperInterval);
    }
  }
};
