/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, observer, pollerLite } from '../../../../../lib/utils';
import UpsellLightbox, { upsellProducts } from './lightbox';
import { deliveryThreshold, getVoucherCode } from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

  setup();


  const checkStock = (id, link) => {
    return new Promise((res, rej) => {
      if(sessionStorage.getItem(`checked-${id}`)) {
        res();
        return;
      }

      $.ajax({
        url: link,
        success:(data) => {
          const dd = document.createElement('div');
          dd.innerHTML = data;
          sessionStorage.setItem('checked-' + id, 1);

          if(!dd.querySelector('.in-stock-msg')) {
            sessionStorage.setItem('oos-' + id, 1);
          }
          res();
        }
      });
    });
  };
  const upsellCopy = [];
  Object.keys(upsellProducts).forEach(k => {
    upsellCopy.push(upsellProducts[k])
  });
  function iterate() {
    checkStock(upsellCopy[0].id, upsellCopy[0].link).then(() => {
      upsellCopy.shift();
      if(upsellCopy.length > 0) {
        iterate();
      }
    });
  }
  iterate();


  const showMiniBasketOnUpsell = () => {
    
    if(sessionStorage.getItem(`${ID}-addedUpsell`)) {
      document.querySelector('#mini-cart').classList.add('hover');
      setTimeout(() => {
        document.querySelector('#mini-cart').classList.remove('hover');
        sessionStorage.removeItem(`${ID}-addedUpsell`)
      }, 2000);
    }
  }

  const deliveryBanner = () => {
    const deliveryMessage = document.createElement('div');
    deliveryMessage.classList.add(`${ID}-deliveryBanner`);
    deliveryMessage.innerHTML = `
    <div class="${ID}-innerContent">
      <span></span>
      <h3><b>Free Delivery</b> Worth £3.95 When You Spend Over £${deliveryThreshold()}. Use code <b>${getVoucherCode()}</b></h3>
    </div>`;

    document.querySelector('#main-header').insertAdjacentElement('beforebegin', deliveryMessage);

    events.send(`${ID} variation: ${VARIATION}`, 'banner show', `${deliveryThreshold()} free delivery banner shown`, { sendOnce: true });
  }

  deliveryBanner();

  const removebanner = () => {
    const banner = document.querySelector(`.${ID}-deliveryBanner`);
    if(banner) {
      banner.remove();
    }
  }


  // request to add voucher code
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
            data: `dwfrm_cart_couponCode=${getVoucherCode()}&dwfrm_cart_addCoupon=dwfrm_cart_addCoupon`,
          });

          events.send(`${ID} variation: ${VARIATION}`, 'voucher added', `${getVoucherCode()} added to basket`, { sendOnce: true });
        }

      }
    };
    request.send();
  }

  const basketTotalEl = document.querySelector('.mini-cart-wrapper .mini-cart-subtotals .subtotal');
  let basketAmount = '';
  // if basket total, set basket amount
  if (basketTotalEl) {
    basketAmount = parseFloat(basketTotalEl.textContent.replace('£', ''));
  }
  if (basketAmount === '' || basketAmount < deliveryThreshold()) {
    if(document.querySelector('.product-col-1.product-image-container')) {
      showMiniBasketOnUpsell();
    }
  } else {
    getFormURLandAddCode();
  }

  
  // remove the lightbox to be reupdated
  const removeLightbox = () => {
    const lightbox = document.querySelector(`.${ID}-modal`);
    if(lightbox) {
      lightbox.remove();
    }
  }


  const triggerTest = () => {
     // check basket amount
    const basketTotalEl = document.querySelector('.mini-cart-wrapper .mini-cart-subtotals .subtotal');
    let basketAmount = '';
    // if basket total, set basket amount
    if (basketTotalEl) {
      basketAmount = parseFloat(basketTotalEl.textContent.replace('£', ''));
    }

    // if basket is 0 or less than the delivery threshold
    if (basketAmount === '' || basketAmount < deliveryThreshold()) {
        new UpsellLightbox();
        events.send(`${ID} variation: ${VARIATION}`, 'view', `upsell lightbox`);
    } else {
      getFormURLandAddCode();
    }
  }

  // only on PDPs
  
  if(document.querySelector('.product-col-1.product-image-container')) {
    const addToBag = document.querySelector(`#product-content #add-to-cart`);
    addToBag.addEventListener('click', () => {
      removeLightbox();
      pollerLite(['.mini-cart-wrapper .mini-cart-subtotals .subtotal'], () => {
        setTimeout(() => {
          if(!sessionStorage.getItem(`${ID}-modalShown`)){
            triggerTest();
          }
      
      }, 200);
      }); 
    
    });  
  }

   // when mini basket qty is updated
   observer.connect(document.querySelector('.minicart-total-qty'), () => {
    removebanner();
    deliveryBanner();
  }, {
    throttle: 1000,
    config: {
      attributes: false,
      childList: true,
      subtree: true,
    },
  });
  

};
