/**
 * HC060 - Add to Basket Product Recommendations
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/strawberries-and-cream-puddles.html
 */
import { setup, appendModal, addCtaButtons, checkInLocalStorage, detectChangeOfDeviceOrientation, modalClickEvents, getProductDetails, storeInLocalStorage, populateRelatedProductsList, fireEvent } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import data from './data';
import initiateSlick from './initiateSlick';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  const prodUrl = window.location.pathname;
  let prodName = document.querySelector('#page_heading h1').innerText.trim();
  const addToCartCTA = document.querySelector('#main button#add-to-cart');

  /**
   * @desc Append Related Products Modal
   */
  appendModal(prodUrl, prodName);

  /**
   * @desc When user adds product to the basket
   * then modal content is generated
   */
  addToCartCTA.addEventListener('click', (e) => {
    if (!checkInLocalStorage(prodUrl)) {
      // --- Page NO SCROLL
      document.querySelector('body').classList.add(`${ID}-noScroll`);

      /**
       * @desc Depending on Variation
       * add pop up CTA Buttons
       */
      addCtaButtons();

      /**
       * @desc Add Related Products 
       */
      populateRelatedProductsList(prodUrl);

      // --- SHOW POP UP
      fireEvent('Modal visible');
      document.querySelector(`.${ID}-relatedPopUp__wrapper`).classList.add('visible');
      
      /**
       * @desc Click Events -- GA Events
       */
      pollerLite([`#${ID}-checkout`,
      `#${ID}-continute-shopping`,
      `.${ID}-button__close`,
      `.${ID}-relatedPopUp__overlay`,
      `ul.${ID}-relatedProds__list li`], () => {

        document.querySelector(`.${ID}-relatedPopUp__wrapper`).removeAttribute('style');
        modalClickEvents();

        detectChangeOfDeviceOrientation();

        // if (VARIATION == '1' || VARIATION == '2') {
        //   // setTimeout(() => {
        //   //   // initiateSlick();
        //   // }, 1500);
          
        // }

        /**
         * @desc Once modal has been shown,
         * store local storage item 
         */
        storeInLocalStorage(prodUrl);
        
      });
    }
  });
};


export default activate;
