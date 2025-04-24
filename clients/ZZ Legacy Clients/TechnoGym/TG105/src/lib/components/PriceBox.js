import shared from '../shared';
import { __ } from '../helpers';

const { ID } = shared;

export default class PriceBox {
  constructor() {
    this.create();
    this.bindEvents();
    this.render();
  }

  create() {

    // get price amounts 
    const priceAmounts = document.querySelector('.totals #shopping-cart-totals-table');
    //const totalWithTax = priceAmounts.querySelector('tr:last-of-type .a-right .price');

    //const amountOfTax = priceAmounts.querySelector('tr:nth-child(2) .price');

    let taxAmount;
    let totalWithTax;
    let discountAmount;


    const allValues = priceAmounts.querySelectorAll('tr');
    for (let index = 0; index < allValues.length; index++) {
      const element = allValues[index];

      const allText = element.innerText;
      if(allText.indexOf('Included tax') > -1 || allText.indexOf('Tassa') > -1) {
        taxAmount = element.querySelector('.price');
      }

      if(allText.indexOf('Grand Total Incl. Tax') > -1 || allText.indexOf('Totale complessivo tasse incluse') > -1) {
        totalWithTax = element.querySelector('.price');
      }
      if(allText.indexOf('-£') > -1 || allText.indexOf('-€') > -1) {
        discountAmount = element.querySelector('.price');
      }

    }

    const discountCode = document.querySelector('#coupon_code');
  
    const element = document.createElement('div');
    element.classList.add(`${ID}_priceBox`);
    element.innerHTML = 
    `<div class="${ID}-priceWrapper">
      <div class="${ID}-price_inner">
        <div class="${ID}-grandTotal ${ID}-price_row">
            <h3>${__('Grand Total')}:</h3><p>${totalWithTax.textContent}</p>
        </div>
        <div class="${ID}-tax ${ID}-price_row">
            <h3>${__('Tax <span>included</span> in price')}:</h3><p>${taxAmount.textContent}</p>
        </div>
        ${discountCode.value !== '' ? 
        `<div class="${ID}-discount ${ID}-price_row">
          <h3>${__('Saving')}:</h3><p>${discountAmount.textContent}</p>
        </div>` : ''}
        <p class="${ID}-priceText_small">
           ${__('Delivery & installation, positioning and testing (if required) included in price.')}
        </p>
      </div>
      <div class="${ID}-checkout ${ID}-button"><a href="/${__('gb')}/onestepcheckout">${__('Proceed to checkout')}</a></div>
    </div>`;
    this.component = element;
  }

  bindEvents() {
    const { component } = this;
  }

  render() {
    const { component } = this;
    //document.querySelector('.cart .totals').insertAdjacentElement('beforebegin', component);
    document.querySelector('.wrapper').appendChild(component);
  }
}

