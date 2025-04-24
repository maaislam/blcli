/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  document.body.addEventListener('click', e => {
    if(e.target.closest('.hd-Banner_Items')) {
      fireEvent('Desktop Navigation Interaction');
    }
    if(e.target.closest('.js-MobileNav')) {
      fireEvent('Mobile Navigation Interaction');
    }
    if(e.target.closest('[data-module-drawers-trigger="cart"]')) {
      fireEvent('Open Basket');
    }
    if(e.target.closest('.js-AddToCart_Submit')) {
      fireEvent('Add to Basket Btn Click');
    }
  });
  
};
