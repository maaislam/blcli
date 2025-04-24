/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getPageData, fireEvent } from './services';
import shared from './shared';
import { events, pollerLite, logMessage, observer } from '../../../../../lib/utils';
// set up variation control variables
const { ID, VARIATION, CLIENT } = shared;
// set SD analytics ref
events.analyticsReference = '_gaUAT';
let mySwiper;

const initiateSlider = () => {

  // Run slick
  let slider = document.querySelector('.'+ID+'-departmentalised-nav-holder');
  slider.classList.add('swiper-active');

  mySwiper = new Swiper(slider, {
    // Optional parameters
    init: false,
    loop: false,
    // If we need pagination
    slidesPerView: 2.5,
    slidesPerGroup: 2,
    spaceBetween: 0,
    // Disable preloading of all images
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    // Responsive breakpoints
    breakpoints: {
      350: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 10,
      }
    }
  
  })

  // Once the carousel is ready, initiate swiper and remove the loading spinner to display the carousel

  setTimeout(function() {
    mySwiper.init();
  }, 300);

  



}

const placeNewDepNav = () => {

  let insertedHTMLv1 = `
    <div class="${ID}-departmentalised-nav-holder variation1">

      <a href="/mens" class="${ID}-nav-item">
        <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-mens-v1.jpg" alt="mens nav item image" />
        <div class="${ID}-button" rel="button"> Shop Mens </div>
      </a>

      <a href="/ladies" class="${ID}-nav-item">
        <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-ladies-v1.jpg" alt="mens nav item image" />
        <div class="${ID}-button" rel="button"> Shop Ladies </div>
      </a>

      <a href="/kids" class="${ID}-nav-item">
        <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-kids-v1.jpg" alt="mens nav item image" />
        <div class="${ID}-button" rel="button"> Shop Kids </div>
      </a>

      <a href="/sale" class="${ID}-nav-item">
        <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-sale-v1.jpg" alt="mens nav item image" />
        <div class="${ID}-button" rel="button"> Shop Sale </div>
      </a>


    </div>

  `;

  let insertedHTMLv2 = `
    <div class="${ID}-departmentalised-nav-holder variation2">

      <a href="/mens" class="${ID}-nav-item">
        <div class="${ID}-button" rel="button"> Shop Mens </div>
      </a>

      <a href="/ladies" class="${ID}-nav-item">
        <div class="${ID}-button" rel="button"> Shop Ladies </div>
      </a>

      <a href="/kids" class="${ID}-nav-item">
        <div class="${ID}-button" rel="button"> Shop Kids </div>
      </a>

      <a href="/sale" class="${ID}-nav-item">
        <div class="${ID}-button" rel="button"> Shop Sale </div>
      </a>


    </div>
  `;

  let insertedHTMLv3 = `
    <div class="${ID}-departmentalised-nav-holder variation3 swiper-container">
      <div class="swiper-wrapper">
        <a href="/mens" class="${ID}-nav-item swiper-slide">
          <div class="${ID}-nav-item-inner">
            <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-mens-v2.jpg" alt="mens nav item image" />
            <div class="${ID}-button" rel="button"> Shop Mens </div>
          </div>
        </a>

        <a href="/ladies" class="${ID}-nav-item swiper-slide">
          <div class="${ID}-nav-item-inner">
            <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-ladies-v2.jpg" alt="mens nav item image" />
            <div class="${ID}-button" rel="button"> Shop Ladies </div>
          </div>
        </a>

        <a href="/kids" class="${ID}-nav-item swiper-slide">
          <div class="${ID}-nav-item-inner">
            <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-kids-v2.jpg" alt="mens nav item image" />
            <div class="${ID}-button" rel="button"> Shop Kids </div>
          </div>
        </a>

        <a href="/sale" class="${ID}-nav-item swiper-slide">
          <div class="${ID}-nav-item-inner">
            <img src="https://ab-test-sandbox.userconversion.com/experiments/SD-390-sale-v2.jpg" alt="mens nav item image" />
            <div class="${ID}-button" rel="button"> Shop Sale </div>
          </div>
        </a>
      </div>
      


    </div>
  `;

  let insertionPoint = document.getElementById('main-content');

  if(VARIATION == 1) {
    insertionPoint.insertAdjacentHTML('beforebegin', insertedHTMLv1);
  } else if(VARIATION == 2) {
    insertionPoint.insertAdjacentHTML('beforebegin', insertedHTMLv2);
  } else if(VARIATION == 3) {
    insertionPoint.insertAdjacentHTML('beforebegin', insertedHTMLv3);
    initiateSlider();
  }

  pollerLite([`.${ID}-nav-item`], () => {

    let allNavItems = document.querySelectorAll(`.${ID}-nav-item`);

    [].slice.call(allNavItems).forEach((item) => {

      item.addEventListener('click', (e) => {
        fireEvent('User clicked an experiment link and was taken to '+e.currentTarget.href);
      });

    })

  });

}

export default () => {
  setup();

  logMessage(ID + " Variation "+VARIATION);

  fireEvent('Conditions Met');

  if(VARIATION == "control") {
    return;
  }

  placeNewDepNav();

};
