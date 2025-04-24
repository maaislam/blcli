/**
 * ME294 - Checkout Restyle
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from './../../../../../lib/utils';
import ME255 from './ME255';
import { updateHeader, updateProgressContent, updateMainContent, updateCartSummary, updateSideCart, updateUserForm, generateMobileMiniCart, restyleShippingMethods, restylePaymentForm, restyleOrderSummary } from './checkoutPageComponents';
import { getCheckoutPage, generateNewProgressBar, pageUrlObserver } from './helpers';
import { generateDropdown } from './dropdownComponent';

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const pageStep = getCheckoutPage();
  // --- Add Page Type
  document.querySelector('#maincontent').classList.add(`${ID}-${pageStep}`);
  document.querySelector('.page-wrapper').classList.add(`${ID}-${pageStep}__wrapper`);
  pageUrlObserver();


  // --- Add Logo on Nav Menu
  let websiteUrl = '';
  if (document.querySelector('.logo-wrapper a')) {
    websiteUrl = document.querySelector('.logo-wrapper a').href;
  }
  if (pageStep == 'cart') {
    // --- Top Page Changes
    // ME255();


    // --- Cart Summary Changes
    pollerLite([`.minicart-wrapper__summary-subtotal span.price`], () => {
      updateCartSummary();
    });

    updateMainContent();
    
    generateDropdown();
  } else if (pageStep == 'checkout') {
    // --- Side Cart
    pollerLite([`.minicart-wrapper__summary-subtotal span.price`, '#checkout .opc-wrapper'], () => {
      updateSideCart();

      updateUserForm();

      restyleShippingMethods();

      if (window.innerWidth < 768) {
        generateMobileMiniCart();
      }
      
    });
    
  } else if (pageStep == 'payment') {
    // --- Run Payment Re-styling
    updateSideCart();
    
    restylePaymentForm();
    restyleOrderSummary();

    if (window.innerWidth < 768) {
      generateMobileMiniCart();
    }
  }

  updateProgressContent();
  pollerLite(['.cart-stock-guarantee__message'], () => {
    
  });

  

  
  generateNewProgressBar();
 
  
};
