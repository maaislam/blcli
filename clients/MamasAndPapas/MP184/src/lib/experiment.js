/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite, events } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  // /Payment changes
  pollerLite([
    '.cardForm',
    '#ExpiryMonth',
    '.checkout_form',
    '#mnp_useSameAddress + span.sameAddressLabel',
    '#card form > .tooltip-elem + .sameAddressCheckboxWrapper',
    '.checkout__paypal',
    'label[for="ExpiryMonth"]',
    'label[for="ExpiryYear"]',
    'div[data-target="checkoutOrderDetails"]',
    'div[data-target="#card"]',
  ], () => {
    const expiryRow = cacheDom.get('#ExpiryMonth').closest('.row'); // Add 'Expiry Date'
    expiryRow ? expiryRow.insertAdjacentHTML('afterbegin', `
      <div class="col-xs-12 pl-0">
        <h4>Expiry Date</h4>
      </div>
    `) : null;


    const billingRow = cacheDom.get('#card form > .tooltip-elem'); // Add Main Title
    const billingRowTitle = billingRow.querySelector('h2.same-address');  // Change subtitle text
    const addBillingLabel = cacheDom.get('#mnp_useSameAddress + span.sameAddressLabel');
    billingRow ? billingRow.insertAdjacentHTML('afterbegin', `
      <div class="col-xs-12 clearfix">
        <h1>Billing Address</h1>
      </div>
    `) : null;

    billingRowTitle ? billingRowTitle.textContent = 'Same as Delivery Address' : null;
    
    addBillingLabel ? addBillingLabel.textContent = 'Add your billing address below' : null;


    const editRow = cacheDom.get('#card form > .tooltip-elem + .sameAddressCheckboxWrapper');
    
    editRow ? editRow.insertAdjacentHTML('afterend', `
      <div class="MP-editArr">
        <label htmlFor="#"></label>
        <input type="checkbox"/>
        <p class="MP184-editAddr show">Change billing address</p>
      </div>
    `) : null;
    const addedButton = document.querySelector('.MP-editArr');
    if (addedButton) {
      let run = false;
      const originalCheckbox = document.querySelector('#mnp_useSameAddress');
      const originalLabel = document.querySelector('#mnp_useSameAddress + .checkbox_label');

      // OG checkbox click
      originalCheckbox.addEventListener('click', () => {
        if (run) {
          addedButton.parentElement ? addedButton.parentElement.classList.remove('MP-active') : null;

          run = false;
        }
      });

      // Reset
      addedButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!run) {
          addedButton.parentElement ? addedButton.parentElement.classList.add('MP-active') : null;
  
          originalCheckbox ? originalCheckbox.click() : null
          originalLabel.classList.toggle('unActive');
          
          run = true; // Only runs once
        }
        events.send(ID, 'MP184 Click', 'Clicked edit address');
      });


      // Exp Month
      const expMonthLabel = cacheDom.get('label[for="ExpiryMonth"]');
      expMonthLabel.textContent = '';
      expMonthLabel.insertAdjacentHTML('beforeend', 'Exp Month<sup>*</sup>');

      // Exp Year
      const expYearLabel = cacheDom.get('label[for="ExpiryYear"]');
      expYearLabel.textContent = '';
      expYearLabel.insertAdjacentHTML('beforeend', 'Exp Year<sup>*</sup>');
      
    }


    // Move 'Same as delivery address' to within editRow for the new border
    editRow ? editRow.insertAdjacentElement('afterbegin', billingRowTitle) : null; 


    // Move PayPal below
    const payPalEl = cacheDom.get('.checkout__paypal');
    const cardPaymentOption = cacheDom.get('div[data-target="#card"]');
    let moved = false;
    cardPaymentOption.addEventListener('click', () => {
      if (moved) return;
      const ref = cacheDom.get('.checkout_form');
      ref.insertAdjacentElement('afterend', payPalEl);
      moved = true;
    });


    // V2 open payment summary
    if (VARIATION == 2) {
      const summaryEl = document.querySelector('div[data-target="checkoutOrderDetails"]');
      summaryEl ? summaryEl.click() : null;
    }


  });

  // Delivery Form
  pollerLite(['#mnpAddressForm .checkout__form__block'], () => {
    const ref = document.querySelector('#mnpAddressForm .checkout__form__block');
    ref.insertAdjacentHTML('afterend', `<p class="MP184-addrLabel">You can change or add a billing address on the payment page.</p>`);
  });
  
  
};
  