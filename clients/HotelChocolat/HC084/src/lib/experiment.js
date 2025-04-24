/**
 * HC084 - Drop A Hint
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { showLightbox } from './helpers';
import wishlist from './components/wishlist';
import SavedProducts from './components/savedProducts';



export default () => {
  const { ID, VARIATION } = shared;

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if(VARIATION === '1' || VARIATION === '3') {
    if(document.querySelector('#pdpMain')) {
      document.querySelector('form.pdpForm').insertAdjacentHTML('beforeend', `<div class="${ID}-link__wrapper"><a>Drop a hint</a></div>`);

      const productUrl = window.location.pathname

      const lightbox = `<div class="${ID}-lightbox__wrapper hidden">
        <div class="${ID}-overlay"></div>
        <div class="${ID}-lightbox__container">
          <span class="${ID}-closeIcon ui-button-icon ui-icon ui-icon-closethick"></span>
          <p>We’re really sorry, our email drop a hint feature is currently under maintenance. You can always share this product via WhatsApp here.</p>
          <button id="${ID}-whatsapp-share"><a href="whatsapp://send?text=https://www.hotelchocolat.com${productUrl}" data-action="share/whatsapp/share">Share via WhatsApp</a></button>
        </div>
      </div>`;

      document.querySelector('body').insertAdjacentHTML('afterbegin', lightbox);

      showLightbox();
    }
  }


  // -----------------------------
  // Wishlist
  // -----------------------------
  // ...
  if(VARIATION === '2' || VARIATION === '3') {


    // All
    new SavedProducts();

    let prePinnedProducts = {};

    // if saved products
    if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
      prePinnedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));

      if (Object.keys(prePinnedProducts).length > 0) {
        document.querySelector(`.${ID}-tab`).classList.add('show');
      }
    }

    // PLP
    pollerLite([
      'body',
      '.search-result-content',
      '.grid-tile',
      () => {
        return !!window.jQuery
      }
    ], () => {
      wishlist();
    });


    // PDP
    pollerLite([
      'body',
      'form.pdpForm',
      '#pdpMain',
      '.product-image-container',
      () => {
        return !!window.jQuery
      }
    ], () => {
      wishlist();
    });

    const removeEverything = () => {
      const allIcons = document.querySelectorAll(`.${ID}-icon__wrapper`);
      for (let index = 0; index < allIcons.length; index++) {
        const element = allIcons[index];
        if(element) {
          element.remove();
        }
      }

      const savedItemsBox = document.querySelector(`.${ID}-savedProducts`);
      if(savedItemsBox) {
        savedItemsBox.remove();
      }

    }


    if(document.querySelector('.search-result-content')) {
      observer.connect(document.querySelector('.search-result-content'), () => {
        removeEverything();

        setTimeout(() => {
          new SavedProducts(); 
          wishlist();
        }, 1000);
      
      }, {
        config: { attributes: true, childList: true, subtree: false },
        throttle: 1000,
      });
    }
  }
  
};
