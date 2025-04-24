/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import { countdown } from './countdown';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    let skuList;
    let voucherCode;

    if(getSiteFromHostname() == 'ernestjones') {
      skuList = ['1187104'];
      voucherCode = 'SHINE25';
    }

    if(getSiteFromHostname() == 'hsamuel') {
      skuList = ['1250507'];
      voucherCode = 'MUM25';
    }

   

    // loop through all basket and get the matching prices from the SKU
    const basketSaveprice = () => {
      const skuPrices = [];

      const allProducts = document.querySelectorAll(`.container .c-product-card`);
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const elSKU = element.querySelector('.c-product-sku').textContent.trim().match(/[0-9]+/)[0];
      
        if(elSKU && skuList.indexOf(elSKU) > -1) {
          
          const elPrice = element.querySelector('.c-product-price__current').textContent.trim().replace('£', '');
          if(elPrice) {
            skuPrices.push(parseFloat(elPrice));
          }
        }
      }

      const amount = skuPrices.reduce(function(a, b){
        return a + b;
      }, 0);

      return amount;
    }


    // Calculation to get amount saved
    const savePrice = () => {
      let currentPrice;
      if(window.digitalData.page.pageInfo.pageType === 'PDP') {
       currentPrice = window.digitalData.product[0].price.currentPrice;
      }

      else if(window.location.href.indexOf('/webstore/basket/') > -1) {
        currentPrice = basketSaveprice();
      }

      const saveAmount = 20; // percentage off 
      const percentCalc = saveAmount / 100;
      const totalValueAfterSavePrice = currentPrice - (currentPrice * percentCalc);
      const totalSaved = currentPrice - totalValueAfterSavePrice;
            
      return totalSaved.toFixed(2);
    }


    const voucherContent = () => {
      const voucherBox = document.createElement('div');
      voucherBox.classList.add(`${ID}-voucherBox`);
      if(window.digitalData.page.pageInfo.pageType === 'PDP') {
        voucherBox.innerHTML = `<div class="${ID}-inner">
          <p>Save <span class="${ID}-saveprice">£${savePrice()}</span> on this product when you purchase in the next 
          <span class="${ID}-countdown"></span>
          and use code <span class="${ID}-code">${voucherCode}</span>
          </p>
        </div>`;

        document.querySelector('.product-price  .product-price-pricing').insertAdjacentElement('afterend', voucherBox);
      }

      if(window.location.href.indexOf('/webstore/basket/') > -1) {
        voucherBox.innerHTML = `
        <p>Save <span class="${ID}-saveprice">£${savePrice()}</span> on your order when you purchase in the next 
          <span class="${ID}-countdown"></span>
          and use code <span class="${ID}-code">${voucherCode}</span>
          </p>
          <div class="${ID}-add">Add voucher</div>`;

        document.querySelector('.c-basket-header').insertAdjacentElement('afterend', voucherBox);
      }
    }
  

    const basketProducts = () => {
      const allProducts = document.querySelectorAll(`.container .c-product-card`);
      for (let index = 0; index < allProducts.length; index += 1) {
        const element = allProducts[index];
        const elSKU = element.querySelector('.c-product-sku').textContent.match(/[0-9]+/)[0];

        if(elSKU && skuList.indexOf(elSKU) > -1) {
          return true;
        }
      }
    }

    const addVoucher = () => {
      const voucherInput = document.querySelector('.voucher #labelled-by-add-promo-code');
     
      voucherInput.value = voucherCode;

      const focEventn = document.createEvent("Event");
      focEventn.initEvent("input", true, true);
      voucherInput.dispatchEvent(focEventn);
      
      const focEvent = document.createEvent("Event");
      focEvent.initEvent("change", true, true);
      voucherInput.dispatchEvent(focEvent);

      const keyEvent = document.createEvent("KeyboardEvent");
      keyEvent.initEvent("keypress", true, true);
      voucherInput.dispatchEvent(keyEvent);

      document.querySelector('.voucher__body--voucher-apply-button').click();
    

      if(document.querySelector('.voucher__body--error-message')) {
        // scroll to it 
        document.querySelector('.voucher-header').click();
        document.querySelector('.voucher-header').scrollIntoView();
      } 
    }

    


    if(window.digitalData.page.pageInfo.pageType === 'PDP') {
      voucherContent();
      countdown();
    }

    if(window.location.href.indexOf('/webstore/basket/') > -1) {
      document.body.classList.add(`${ID}-basket`);
      if(document.querySelector('.voucher__body--success-message b') && document.querySelector('.voucher__body--success-message b').textContent.trim().indexOf(voucherCode) === -1) {
        if(basketProducts()){
          voucherContent();
          countdown();
          basketSaveprice();

          document.querySelector(`.${ID}-voucherBox .${ID}-add`).addEventListener('click', () => {
            addVoucher();
            events.send(`${ID} Variation ${VARIATION}`,'click', 'Add voucher on basket');
          });
        }
      }
      
    }


   

   
  }
};
