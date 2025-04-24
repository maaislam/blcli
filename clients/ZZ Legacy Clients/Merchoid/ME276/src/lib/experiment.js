/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  
  const scrollToElement = (element) => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.getBoundingClientRect().top + window.scrollY - 10,
    });
  }

  const addTitleToBilling = () => {
    const title = `<div class="${ID}-billingTitle">
    <h3>Update Billing Address</h3>
    <p>Don’t forget to click update once you’ve updated</p>
    </div>`;

    document.querySelector('.billing-address-form').insertAdjacentHTML('afterbegin', title);
  }

  const createDeliveryPrompt = () => {
    let deliveryAdd = ''
    if (document.querySelector('.billing-address-details')){
      deliveryAdd = document.querySelector('.billing-address-details').innerText.replace('Your billing address:', '').replace(/(\r\n|\n|\r)/gm, " ").trim();
    }
    const deliveryPrompt = document.createElement('div');
    deliveryPrompt.classList.add(`${ID}-deliveryBox`);
    deliveryPrompt.innerHTML = `
    <h3>Is your billing address, the same as your delivery address <span class='deliveryAddressCheck'>(${deliveryAdd})</span>?</h3>
    <div class="${ID}-radioButtons">
      <div class="${ID}-radio ${ID}-yes">
        <input type="radio" name="deliveryAddress" value="yes" checked/>
        <span>Yes</span>
      </div>
      <div class="${ID}-radio ${ID}-no">
        <input type="radio" name="deliveryAddress" value="no"/>
        <span>No</span>
      </div>
    </div>
    `;


    document.querySelector('.payment-group .payment-method-title').insertAdjacentElement('afterend', deliveryPrompt);
  }
  

  const onRadioClick = () => {
    const billingAddressCheck = document.querySelector('.billing-address-same-as-shipping-block input');
    const yesRadio = document.querySelector(`.${ID}-radio.${ID}-yes`);
    const noRadio = document.querySelector(`.${ID}-radio.${ID}-no`);

    const billingForm = document.querySelector('.billing-address-form');

    if(billingAddressCheck.checked == true){
      yesRadio.checked;
    }

    yesRadio.addEventListener('click', () => {
      if(billingAddressCheck.checked !== true){
        yesRadio.querySelector('input').checked = true;
        billingAddressCheck.click();
      }
    });

    noRadio.addEventListener('click', () => {
      if(billingAddressCheck.checked === true){
        noRadio.querySelector('input').checked = true;
        billingAddressCheck.click();

        scrollToElement(billingForm)
      }
    });

  }
  createDeliveryPrompt();
  addTitleToBilling();
  onRadioClick();
};
