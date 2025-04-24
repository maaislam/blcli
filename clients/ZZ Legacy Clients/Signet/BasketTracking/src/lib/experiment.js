/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

var hitFunction = function () {
  // Get local time as ISO string with offset at the end
  var now = new Date();
  var tzo = -now.getTimezoneOffset();
  var dif = tzo >= 0 ? '+' : '-';
  var pad = function (num) {
    var norm = Math.abs(Math.floor(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  return now.getFullYear() +
    '-' + pad(now.getMonth() + 1) +
    '-' + pad(now.getDate()) +
    'T' + pad(now.getHours()) +
    ':' + pad(now.getMinutes()) +
    ':' + pad(now.getSeconds()) +
    '.' + pad(now.getMilliseconds()) +
    dif + pad(tzo / 60) +
    ':' + pad(tzo % 60);
}
//basket value
ga('create', 'UA-31570-8', 'auto');
var path = window.location.pathname;
if (path.indexOf('showbasket') > -1) {
  var value = window.digitalData.cart.attributes.basketTotal;
  ///total Saving
  if (document.getElementsByClassName("order-summary__row__divider").length > 1) {
    var totalSaving = document.getElementsByClassName("order-summary__row__divider")[1].innerText.split('£')[1].split(' ')[0];
  }
  //push basket products
  var array = [];
  var items = digitalData.cart.item;
  for (var i = 0; i < items.length; i++) {
    array.push(items[i].productInfo.productName)
    array.push(items[i].category.primaryCategory)
    array.push(items[i].price.basePrice)
  }
  array.splice(3, 0, ' | ')
  var prod = array.join(', ')
  var financeTerm;
  if (!!document.getElementById("ifcPaymentPlan")) {
    financeTerm = document.getElementById("ifcPaymentPlan").children[3].children[0].children[1].innerText;
    ga('send', 'event', 'Basket', 'Basket - Products', prod, {
      nonInteraction: true,
      dimension10: value,
      dimension11: totalSaving,
      dimension12: 'Finance In Basket',
      dimension13: financeTerm,
      dimension14: hitFunction()
    })
  } else {
    ga('send', 'event', 'Basket', 'Basket - Products', prod, {
      nonInteraction: true,
      dimension10: value,
      dimension11: totalSaving,
      dimension12: 'No Finance',
      dimension14: hitFunction()
    })
  }
  //voucher code entry
  var codeEntry = document.getElementById("promo-code-form");
  if (!!codeEntry) {
    var sessVoucherCode = sessionStorage.getItem('voucherCode');
    codeEntry.addEventListener('submit', function () {
      var voucherCode = document.getElementById("couponCode").value;
      ga('send', 'event', 'Basket', 'Voucher Code - Entry', voucherCode, {
        dimension14: hitFunction()
      })
      sessionStorage.setItem('voucherCode', voucherCode)
    })
  }
  //voucher code success/failure
  var promoError = document.getElementsByClassName("promo-code-input__error");
  var promoSuccess = document.getElementById("couponCodeRemove");
  var promoError2 = document.getElementsByClassName("message-list__item")[1].innerText;
  if (promoError.length > 0) {
    ga('send', 'event', 'Basket', 'Voucher Code - Error', sessVoucherCode, {
      nonInteraction: true,
      dimension14: hitFunction()
    })
  } else if (promoError2.indexOf('Your order does not qualify for discount') > -1) {
    var sessVoucherCode = sessionStorage.getItem('voucherCode');
    ga('send', 'event', 'Basket', 'Voucher Code - Did Not qualify', sessVoucherCode, {
      nonInteraction: true,
      dimension14: hitFunction()
    })
  } else if (!!promoSuccess) {
    var sessVoucherCode = sessionStorage.getItem('voucherCode');
    ga('send', 'event', 'Basket', 'Voucher Code - Success', sessVoucherCode, {
      nonInteraction: true,
      dimension14: hitFunction()
    })
  }
  //checkout method
  document.getElementById("checkout-form-1").addEventListener('click', function () {
    if (!!document.getElementById("ifcPaymentPlan")) {
      ga('send', 'event', 'Basket', 'Checkout Method', '0% Interest Finance - Step 2', {
        dimension14: hitFunction()
      })
    } else {
      ga('send', 'event', 'Basket', 'Checkout Method', 'Standard Checkout', {
        dimension14: hitFunction()
      })
    }
  })
  var checkoutOptions = document.getElementById("lower-button-group").children;
  for (var i = 0; i < checkoutOptions.length; i++) {
    checkoutOptions[i].addEventListener('click', function () {
      var method = this.className;
      if (method === 'basket__cta-form') {
        if (!!document.getElementById("ifcPaymentPlan")) {
          ga('send', 'event', 'Basket', 'Checkout Method', '0% Interest Finance - Step 2', {
            dimension14: hitFunction()
          })
        } else {
          ga('send', 'event', 'Basket', 'Checkout Method', 'Standard Checkout', {
            dimension14: hitFunction()
          })
        }
      } else if (method === 'basket__cta-form--paypal') {
        ga('send', 'event', 'Basket', 'Checkout Method', 'PayPal Checkout', {
          dimension14: hitFunction()
        })
      } else if (method === 'basket__cta-form--paypal-credit') {
        ga('send', 'event', 'Basket', 'Checkout Method', 'PayPal Credit Checkout', {
          dimension14: hitFunction()
        })
      } else if (method === 'cta--basket cta--secondary cta--ifc ifcBuyButton') {
        ga('send', 'event', 'Basket', 'Checkout Method', '0% Interest Finance - Step 1', {
          dimension14: hitFunction()
        })
      }
    })
  }
  //add gift wrapping
  if (!!document.querySelector('a.cta--secondary')) {
    document.querySelector('a.cta--secondary').addEventListener('click', function () {
      ga('send', 'event', 'Basket', 'Add Gift Packaging', {
        dimension14: hitFunction()
      })
    })
  }
  //paypal more info 
  var payPalInfo = document.getElementsByClassName("product-paypal-credit__link");
  for (var j = 0; j < payPalInfo.length; j++) {
    payPalInfo[j].addEventListener('click', function () {
      ga('send', 'event', 'Basket', 'PayPal Credit Info', {
        dimension14: hitFunction()
      })
    })
  }
}

};
