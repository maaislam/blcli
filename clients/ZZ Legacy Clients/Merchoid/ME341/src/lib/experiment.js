/**
 * ME309 - Price Testing
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observePageChange, pollerLite, setCookie } from './../../../../../lib/utils';
import { applyDiscountCode, discountCheckoutPrice, discountMiniCart, discountPLP, isChristmas, newProductPrice } from './helpers';

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
  // Write experiment code here
  // -----------------------------
  // ...

  if(VARIATION == 'control') {
    return;
  } else {

    const url = window.location.href;
    const regex = new RegExp('.*(christmas)(-)(sweater|jumper).*');

    // if xmas PDP
    if(regex.test(url) && document.querySelector('.catalog-product-view')) {
      setCookie('JumperTest', '1');
      if (window.location.search.indexOf('?gclid') > -1 || window.location.search.indexOf('&gclid') > -1) {
        fireEvent('Google Lander');
      } else {
        document.documentElement.classList.add(`${ID}-christmas`);
        newProductPrice();
      }
    }

    // if basket
    if(window.location.pathname.indexOf('/checkout/cart/') > -1) {
      if(!sessionStorage.getItem(`${ID}-voucherRemoved`)) {
        if(isChristmas()) {
          applyDiscountCode();
          fireEvent('Voucher added');
        }
      }
    }

    // if PLP
    if(url.indexOf('/brand/') >-1 || url.indexOf('christmas-sweaters-jumpers') > -1 || url.indexOf('geeks-guide') > -1 || document.querySelector('.catalog-category-view .item.product.product-item') || document.querySelector('.cms-home') || url.indexOf('/bestsellers/') > -1 || url.indexOf('/new/') >-1 || document.querySelector('.catalogsearch-result-index')) {
      discountPLP();
    } 

    // if checkout

    let doOnce = false;
    if(url.indexOf('/checkout') >-1) {
      pollerLite(['#checkout .minicart-items .product-item', '.subtotal .cart-price .price'], () => {
        if(doOnce === false) {
          discountCheckoutPrice();
          doOnce = true;
        }
      });

      const init = () => {
        discountCheckoutPrice();
      }
    

      // wait for payment step to load in
      observePageChange(document.body, (p) => {
        pollerLite(['.opc-block-summary', '#checkout .minicart-items .product-item', '.subtotal .cart-price .price', '.control.braintree-card-control', '.grand.totals .price', '.action.primary.checkout', '.billing-address-details'], () => {
            init(); 
        });
      });
    }

    pollerLite(['#mini-cart .product-item', '.price-wrapper .minicart-price .price', '#minicart-content-wrapper .subtotal .price-wrapper .price', '.minicart-wrapper__summary-subtotal'], () => {      
      discountMiniCart();      
    });
  }
  

  
};
