/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events } from '../../../../../lib/utils';
import { FL066OG } from './FL066';


events.analyticsReference = '_gaUAT';


const activate = () => {

  // Ensure currency is GBP only
  const { currency } = window.dataLayer[1];
  if (currency && currency !== 'GBP') return false;

  setup();

  const { VARIATION, ID } = settings;

  if (VARIATION == '3') {
    events.send(ID, 'Control', 'Control is active');
    return false;
  } else {
    events.send(ID, `Variation ${VARIATION}`, 'Test is active');
  }

  // Experiment code
  FL066OG();

  // Build and add events.
  const giftEl = document.querySelector('li[id*="PaymentMethod_UseGiftCardWrapper"] .PayText');
  const giftLink = document.querySelector('li[id*="PaymentMethod_UseGiftCardWrapper"] a.Vcodes');
  if (giftLink) {
    giftLink.setAttribute('href', '#');
  }
  if (giftEl) {
    giftEl.innerHTML = '';
    giftEl.insertAdjacentHTML('beforeend', `
      <p><a href="https://www.flannels.com/checkout/usegiftcard">Use Gift Card</a></p>
      <i class="FL066v2-icon">i</i>
      <div class="FL066v2-gift-text">
        <p>If you've recieved one of our gift cards, please enter the <a href="/checkout/usegiftcard">details here.</a></p>
      </div>
    `);

    const infoIcon = document.querySelector('li[id*="PaymentMethod_UseGiftCardWrapper"] .FL066v2-icon');
    const infoText = document.querySelector('li[id*="PaymentMethod_UseGiftCardWrapper"] .FL066v2-gift-text');
    infoIcon.addEventListener('click', (e) => {
      e.preventDefault();
      infoText.classList.add('show');
      setTimeout(() => {
        infoText.classList.remove('show');
      }, 4000);
    });
  }
  // Change promo code entry.
  const promoEl = document.querySelector('.FL006_accordian-btn.FL006_voucher');
  if (promoEl) {
    promoEl.textContent = 'Enter Promotional Code';
  }

  // Add 'Need Help?'
  const promoWrap = document.querySelector('.FL066-voucherWrap');
  if (promoWrap) {

    promoWrap.insertAdjacentHTML('beforeend', `
      <a class="needhelp" href="/customerservices">Need Help?</a>
    `);
  }

  // VAR 2
  if (VARIATION == 2) {


    // Add View cart and product table
    // First page? Pull in cart info.
    const fetchCartInfo = (cb) => {
      const request = new XMLHttpRequest();
      request.open('GET', 'https://www.flannels.com/Cart', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const div = document.createElement('div');
          const resp = request.responseText;
          div.innerHTML = resp;

          const info = div.querySelector('.Basket #BasketDiv table');
          cb(info.outerHTML);
        } else {
          // We reached our target server, but it returned an error
          console.error('Could not fetch cart info');
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
    }
    const subTotalRowEl = document.querySelector('#SubtotalRow');
    const subTotalLabelEl = document.querySelector('#SubtotalLabel');
    if (subTotalLabelEl) {
      subTotalLabelEl.insertAdjacentHTML('afterend', `
        <button class="FL066v2-viewItems">View items<span></span></button>
      `);
    }
    fetchCartInfo((infoEl) => {
      if (subTotalRowEl && infoEl) {
        subTotalRowEl.insertAdjacentHTML('afterend', `
          <div class="FL063-cartInfo">
            ${infoEl}
          </div>
        `);
      }

      const viewAllBtn = document.querySelector('button.FL066v2-viewItems');
      const cartInfo = document.querySelector('.FL063-cartInfo');

      if (viewAllBtn) {
        viewAllBtn.addEventListener('click', (e) => {
          e.preventDefault();
          cartInfo.classList.toggle('showItems');
          viewAllBtn.classList.toggle('showItems');
          if (viewAllBtn.textContent == 'View items') {
            viewAllBtn.textContent = 'Hide items';
          } else {
            viewAllBtn.textContent = 'View items';
          }
        });
      }

    });


  } else {
    document.body.classList.add('FL066v2-1');
  }

  // Add the go back popup
  document.body.insertAdjacentHTML('beforeend', `
    <div class="FL066v2-goBack">
      <div class="FL066v2-goBack--wrap">
        <div class="popupclose">
          <p>x</p>
        </div>
        <p>Are you sure you want to go back?</p>

        <a href="/checkout/deliverychoices" class="FL066v2-goBack-btns">Back to Delivery Options</a>
        
        <a href="/cart" class="FL066v2-goBack-btns">Back to Cart</a>
      </div>
    </div>
  `);

  const close = document.querySelector('.FL066v2-goBack .popupclose');
  const popup = document.querySelector('.FL066v2-goBack');
  const popupWrap = document.querySelector('.FL066v2-goBack .FL066v2-goBack--wrap');
  if (close) {
    close.addEventListener('click', () => {
      popup.classList.remove('showPopup');
    });
  }

  popup.addEventListener('click', (e) => {
    if (!popupWrap.contains(e.target)) {
      popup.classList.remove('showPopup');
    }
  });

  if (window.location.href !== 'https://www.flannels.com/checkout/usegiftcard') {
    const goBackEl = document.querySelector('.FL066-back');
    const originalBack = document.querySelector('.GoBackPage');
    const backArrow = document.querySelector('.CheckoutProgressBack');
    const logoBack = document.querySelector('.LogoCheck a');
    
    if (goBackEl) {
      goBackEl.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.add('showPopup');
      });
    }

    backArrow.addEventListener('click', (e) => {
      
      e.preventDefault();
      popup.classList.add('showPopup');
    });
    originalBack.addEventListener('click', (e) => {
      
      e.preventDefault();
      popup.classList.add('showPopup');
    });
    logoBack.addEventListener('click', (e) => {
      
      e.preventDefault();
      popup.classList.add('showPopup');
    });
  }
};

export default activate;
