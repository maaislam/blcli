/**
 * ME312 - Christmas Messaging
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { generateScarcityMessages } from './components';

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
  let product = '';
  if (window.location.href.indexOf('/uk') > -1) {
    product = `Jumper`;
  } else {
    product = `Sweater`;
  }
  
  if (VARIATION == '1') {
    generateScarcityMessages(product);
  } else if (VARIATION == '2' || VARIATION == '3') {
    let newPricingMsg = '';
    if (VARIATION == '2') {
      newPricingMsg = `Christmas has never looked so good. Make sure you’ve got your <strong>Officially Licensed ${product}</strong> to celebrate. Buy now and save any disappointment later.`;
    } else {
      newPricingMsg = `We're expecting high demand for our <strong>Officially Licensed ${product}s</strong> this year. Buy yours now to avoid disappointment. Prices are guaranteed to stay the same.`;
    }

    document.querySelector('.product-info-main .product-info-price .product-info-price-inner .product-title-bottom-text p').innerHTML = newPricingMsg;
  } 

};
