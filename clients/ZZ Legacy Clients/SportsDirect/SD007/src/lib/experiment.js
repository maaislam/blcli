/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { events, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();

  const { VARIATION, ID } = settings;
  // Control = V2
  if (VARIATION == '2') {
    events.send(ID, 'Control');
    return false;
  } else {
    events.send(ID, `Variation ${VARIATION}`);
  }


  // Run the custom js
  DeliveryPage_SetBillingAddressFormEnabled(true);

  // If have cookie, show billing
  const billingEl = document.getElementById('DeliveryAddressForm2_Billing');
  if (getCookie('BV016-changedB') && billingEl) {
    billingEl.style.display = 'block';
  }

  // un check tick box
  const tickbox = document.querySelector('.CheckWrap #DeliveryAddressForm2Wrapper .billGroup .checkbox input');
  if (tickbox) {

    tickbox.addEventListener('click', () => {
      events.send(ID, 'SD007 Click', 'SD007 Unchecked use this as billing address');

      // Remove if previously set
      if (getCookie('BV016-changedB')) {
        deleteCookie('BV016-changedB')
      } else {
        // Set Cookie  
        setCookie('BV016-changedB', 'true', 1);
      }

    });
  }

  // If Billing address div is blocked, un tick billing address.
  
  // Add message
  const message = 'Please note: if paying by PayPal, your billing address will be taken from your PayPal account, not by the details entered below';
  const ref = document.querySelector('.CheckWrap #DeliveryAddressForm2Wrapper .billGroup');
  ref.insertAdjacentHTML('afterend', `<p class="SD007-message">${message}</p>`);
  
};

export default activate;
