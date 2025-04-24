import {
  events,
  observer
} from '../../../../../lib/utils';
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

  const { ID, VARIATION } = shared;
  
  let voucherCode;
  let voucherAmount;
  if (VARIATION === '1') {
    voucherCode = 'FREEDEL30';
    voucherAmount = '£30';
  } else if (VARIATION === '2') {
    voucherCode = 'FREEDEL40';
    voucherAmount = '£40';
  } else if (VARIATION === '3') {
    voucherCode = 'FREEDEL35';
    voucherAmount = '£35';
  }


  const deliveryBanner = () => {
    const deliveryMessage = document.createElement('div');
    deliveryMessage.classList.add(`${ID}-deliveryBanner`);
    deliveryMessage.innerHTML = `
    <div class="${ID}-innerContent">
      <span></span>
      <h3><b>Free Delivery</b> Worth £3.95 When You Spend Over ${voucherAmount}</h3>
    </div>`;

    document.querySelector('#main-header').insertAdjacentElement('beforebegin', deliveryMessage);

    events.send(`${ID} variation: ${VARIATION}`, 'banner show', `${voucherCode} free delivery banner shown`, { sendOnce: true });
  }

  const getFormURLandAddCode = () => {

    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.hotelchocolat.com/uk/basket', true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement('html');
        temp.innerHTML = request.responseText;

        const formAction = temp.querySelector('.cart-action-checkout').getAttribute('action');

        if (formAction) {
          window.jQuery.ajax({
            url: formAction,
            type: 'post',
            data: `dwfrm_cart_couponCode=${voucherCode}&dwfrm_cart_addCoupon=dwfrm_cart_addCoupon`,
          });

          events.send(`${ID} variation: ${VARIATION}`, 'voucher added', `${voucherCode} added to basket`, { sendOnce: true });
        }

      }
    };
    request.send();
  }

  const removebanner = () => {
    const banner = document.querySelector(`.${ID}-deliveryBanner`);
    if(banner) {
      banner.remove();
    }
  }


  const trigger = () => {

    const basketTotalEl = document.querySelector('.mini-cart-wrapper .mini-cart-subtotals .subtotal');

    let basketAmount = '';
    // if basket total, set basket amount
    if (basketTotalEl) {
      basketAmount = parseInt(basketTotalEl.textContent.replace('£', ''), 10);
    }

    if (VARIATION === '1') {
      // if basket is 0 or less than 30
      if (basketAmount === '' || basketAmount <= 30) {
        deliveryBanner();
      } else {
        removebanner();
        getFormURLandAddCode();
      }
    }

    if (VARIATION === '2') {
      // if basket is 0 or less than 40
      if (basketAmount === '' || basketAmount <= 40) {
        deliveryBanner();
      } else {
        removebanner();
        getFormURLandAddCode();
      }
    }
    if (VARIATION === '3') {
      // if basket is 0 or less than 40
      if (basketAmount === '' || basketAmount <= 35) {
        deliveryBanner();
      } else {
        removebanner();
        getFormURLandAddCode();
      }
    }
  }

  trigger();
  

  // when mini basket qty is updated
  observer.connect(document.querySelector('.minicart-total-qty'), () => {
    removebanner();
    trigger();
  }, {
    throttle: 1000,
    config: {
      attributes: false,
      childList: true,
      subtree: true,
    },
  });



};
