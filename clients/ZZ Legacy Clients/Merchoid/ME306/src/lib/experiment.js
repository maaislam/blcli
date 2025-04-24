/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

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


  if(window.location.href.indexOf('checkout/cart') > -1) {
  
    const messageContent = (amount) => {
      let messaging;
      let jumperText;

      if(window.location.href.indexOf('/uk/') > -1) {
        jumperText = 'Jumper';
      } else {
        jumperText = 'Sweater';
      }

      if(VARIATION == '1') {
        messaging = `
        <div class="${ID}-heading">
          <h3>Feeling festive?</h3>
          <p>Why not add another Christmas ${jumperText}?</p>
        </div>
        <a href="/geeks-guide-to-ugly-christmas-sweaterjumpers/">Shop Christmas ${jumperText}s</a>`
      }

      if(VARIATION == '2'  || VARIATION === '3') {
        if(amount == 1) {
          messaging = `
          <p>Add another Christmas ${jumperText} to your basket and <b>save 10%</b></p>
          <a href="/geeks-guide-to-ugly-christmas-sweaterjumpers/">Shop Chrismas ${jumperText}s</a>`;

        } else {
          messaging = `
          <p>Just add voucher <b>UCMULTI</b> to save <b>10%</b> on your Christmas ${jumperText}s</p>`
        }
      }

      return messaging;
    }

    const checkAmount = () => {

      let amount = [];
      const allProducts = document.querySelectorAll('#shopping-cart-table .cart.item');

      for (let index = 0; index < allProducts.length; index +=1) {
        const element = allProducts[index];
        const elName = element.querySelector('.product-item-name a');

        if(elName.textContent.toLowerCase().match(/.*(christmas).*(jumper|sweater).*/)){
 
          const elQty = element.querySelector('.control.qty input').value;
            amount.push(parseFloat(elQty));
        }
      }

      function add(accumulator, a) {
        return accumulator + a;
      }

      const sum = amount.reduce(add,0);
      return sum;
    }

    const createBanner = () => {
      fireEvent('Banner shown');

      const messageBanner = document.createElement('div');
      messageBanner.classList.add(`${ID}-xmasMessage`);
      messageBanner.innerHTML = `
      <div class="${ID}-inner">
        ${messageContent(checkAmount())}
      </div>`

      document.querySelector('.cart.table-wrapper').insertAdjacentElement('beforebegin', messageBanner);

    }

    if(VARIATION === '3') {
      if(checkAmount() == 1) {
        localStorage.setItem(`${ID}-sawOnce`, true);
        createBanner();
      } else if(localStorage.getItem(`${ID}-sawOnce`) && checkAmount() > 0) {
        createBanner();
      } 
    } else {
      if(checkAmount() > 0) {
        createBanner();
      } else {
        return;
      }
    }
  }
  if(VARIATION == '3') {

      const isProductPage = () => {
        const elName = document.querySelector('.page-title .base');
        if(document.body.classList.contains('catalog-product-view') && elName.textContent.toLowerCase().match(/.*(christmas).*(jumper|sweater).*/)) {
          return true;
        }
      }

      if(isProductPage() === true) {
        const removeDidAddURL = () => {
          // remove the ?did add
          const query = window.location.search.substring(1)

          if(query.length) {
            if(window.history != undefined && window.history.pushState != undefined) {
                window.history.pushState({}, document.title, window.location.pathname);
            }
          }
        }

        const addedToBagMsg = () =>{
          const productMsg = document.createElement('div');
          productMsg.classList.add(`${ID}-addedMsg`);
          productMsg.innerHTML = `
          <div class="${ID}-inner">
            <div class="${ID}-productAdded">
              <span></span><p>Successfully added to your cart</p>
            </div>
            <div class="${ID}-buttons">
              <a class="${ID}-productCTA ${ID}-basket" href="/checkout/cart/">View Cart</a>
              <a class="${ID}-productCTA ${ID}-continue" href="/geeks-guide-to-ugly-christmas-sweaterjumpers/">Continue Shopping</a>
            </div>
          </div>`;

          document.querySelector('#maincontent').insertAdjacentElement('afterbegin', productMsg);
        }

        // check if product has been added
        const isAdded = () => {
          const url = window.location.href;
          if(url.indexOf('?didadd=1') > -1) {
            return true;
          }
        }

        const preventCartRedirect = () => {
          if(document.querySelector('#product_addtocart_form')) {
            const url = window.location.href;
            const returnHTML = `<input type="hidden" name="return_url" value="${url}?didadd=1">`;

            document.querySelector('#product_addtocart_form').insertAdjacentHTML('afterbegin', returnHTML);
          }
        }

        pollerLite(['.catalog-product-view', '#product_addtocart_form'], () => { 
          preventCartRedirect();
        });


        if(isAdded()) {
          pollerLite([
            '.price-container.amount .price-wrapper',
            '.paypal.checkout',
            '.minicart-container .ui-dialog.ui-widget.ui-widget-content', 
            '.minicart-items .item',
            '.minicart-items .product-image-container',
            '.price-container > .price-wrapper > .price-including-tax > .minicart-price > .price',
            '.minicart-container .amount.price-container',
            '.details-qty.qty input',
            '.counter.qty .counter-number',
            '.action.viewcart',
          ], () => {
            addedToBagMsg();
            removeDidAddURL();
          });
        }
      }
  }


};
