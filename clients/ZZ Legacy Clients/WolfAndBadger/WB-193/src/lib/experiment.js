/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { VARIATION } = shared;

const trackingMessages = {
  elementVisable: 'Checkout Securely Visable',
  elementRemoved: 'Checkout Securely Removed',
  controlEvent: 'Control Event Fired',
  viewBagElementClicked: 'View Bag has been clicked',
  viewBagElementClickedControl: 'View Bag has been clicked on control',
  checkoutSecurelyElement: 'Checkout Securely has been clicked',
};

const checkoutSecurelyParent = document.querySelectorAll('#right-nav .checkout-group .checkout-action-item')[0];
const viewBagElement = document.querySelectorAll('#cart-link .minicart a.large.button.secondary')[1];


/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION !== 'control') {
    // Tracking Customer Sees the basket
    fireEvent(trackingMessages.elementVisable);

    viewBagElement.addEventListener('click', fireEvent(trackingMessages.viewBagElementClicked));
  } else {
    // Customer clicks view bag
    viewBagElement.addEventListener('click', fireEvent(trackingMessages.viewBagElementClickedControl));

    // Customer clicks Checkout securely
    checkoutSecurelyParent.addEventListener('click', fireEvent(trackingMessages.checkoutSecurelyElement));
  }
};
