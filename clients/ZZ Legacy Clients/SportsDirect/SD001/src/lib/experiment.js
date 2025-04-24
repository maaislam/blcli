/**
 * SD001 - Voucher Code on Payment Page
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';
import { events, getCookie, setCookie, deleteCookie } from '../../../../../lib/utils';
import voucher from './voucher';

events.analyticsReference = '_gaUAT';

const activate = () => {

  if (window.hj) {
    window.hj('tagRecording', ['SD001 - Payment page']);
  }

  setup();

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'SD001 Control', 'Control is active');
    return false;
  }

  events.send(settings.ID, 'SD001 Active', 'Test is active');

  // Add input to voucher link
  let voucherRef = document.querySelector('.CheckoutLeft'); // Desktop

  if (voucherRef) {
    voucherRef.insertAdjacentHTML('beforeend', `
      <div class="SD001-voucherDropdown">
        <a href="" class="SD001_accordian-btn SD001_voucher">Promotional Code Entry</a> <input type="text" name="SD001-voucherCode"/> <button class="SD001-applyVoucher">Apply</button>
      </div>
    `);
  }
  
  // Add toggle
  const dropdownLink = document.querySelector('a.SD001_accordian-btn');
  if (dropdownLink) {
    dropdownLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.parentElement.classList.toggle('active');
    });
  }

  // Experiment code
  voucher.init();

  const addLoading = () => {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="loading-dots">
        <div class="dot one">&nbsp;</div>
        <div class="dot two">&nbsp;</div>
        <div class="dot three">&nbsp;</div>
      </div>
    `);
  };


  const showMessages = () => {
    // If discount was just added, show a message
    if (getCookie('SD001-addedDiscount') && !getCookie('SD001-messageShown')) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="SD001-discountMessage">
          <p>Discount has been applied.</p>
        </div>
      `);

      document.body.classList.add('SD001-discountAdded');

      events.send(settings.ID, 'SD001 Discount Added', 'Discount code applied');

      setTimeout(() => {
        const el = document.querySelector('.SD001-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('SD001-messageShown');
        deleteCookie('SD001-addedDiscount');
        // set cookie
        setCookie('SD001-messageShown', 'true', 2);
      }, 3500);
    }

    // If code applied failed, show message
    if (getCookie('SD001-voucherError') && !getCookie('SD001-messageShown')) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="SD001-discountMessage SD001-discountError">
          <p>This discount code is not valid.</p>
        </div>
      `);

      document.body.classList.remove('SD001-discountAdded');

      // events.send(settings.ID, 'SD001 Invalid Code', 'Discount code invalid');

      // Then remove
      setTimeout(() => {
        const el = document.querySelector('.SD001-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('SD001-messageShown');
        deleteCookie('SD001-voucherError')
        setCookie('SD001-messageShown', 'true', 2);
      }, 3500);
      // set cookie
    }

    // If card details fail
    if (getCookie('SD001-cardError') && !getCookie('SD001-messageShown') && window.location.href.indexOf('/carddetails') > -1) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="SD001-discountMessage SD001-discountError">
          <p>There was a problem with your card details, please try again.</p>
        </div>
      `);

      events.send(settings.ID, 'SD001 Invalid Card', 'Card details invalid');

      // Then remove
      setTimeout(() => {
        const el = document.querySelector('.SD001-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('SD001-messageShown');
        deleteCookie('SD001-cardError');
      }, 3500);
      // set cookie
      setCookie('SD001-messageShown', 'true', 2);
    }

    // If failed payment
    if (getCookie('SD001-payError') && !getCookie('SD001-messageShown')) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="SD001-discountMessage SD001-discountError">
          <p>Your card issuer has declined the payment. Please ensure that you enter all card details correctly and you have sufficient funds available to make the payment. If this problem persists, please contact your card issuer.</p>
        </div>
      `);

      events.send(settings.ID, 'SD001 Payment Failed', 'Payment failed on confirmation page');

      // Then remove
      setTimeout(() => {
        const el = document.querySelector('.SD001-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('SD001-messageShown');
        deleteCookie('SD001-payError');
      }, 3500);
      // set cookie
      setCookie('SD001-messageShown', 'true', 2);
    }
  }
  showMessages();

  // If user lands on checkout/usevoucher, 
  if (window.location.href.indexOf('/usevoucher') > -1) {

    // Add Loader.
    document.body.classList.add('SD001-loading');
    addLoading();

    // let the loader run for 1.5 seconds
    setTimeout(() => {
      // check for the discount applied message.
      pollerLite(['.PromGroup .ProValue'], () => {
        deleteCookie('SD001-addedDiscount');
        deleteCookie('SD001-messageShown');
        // Set cookie to showMessage
        setCookie('SD001-addedDiscount', 'true', 2);
        
        const continueBtn = document.querySelector('.AddressContainBut input[type="submit"]');
        if (continueBtn) {
          continueBtn.click();
        }
      });
  
      // Check for error message
      pollerLite(['#dnn_ctr76858_PromoCodeApplication_divVoucherError'], () => {
        deleteCookie('SD001-addedDiscount');
        deleteCookie('SD001-messageShown');
        // Set cookie to show message
        setCookie('SD001-voucherError', 'true', 2);
        // Redirect
        if (document.referrer === 'https://www.sportsdirect.com/checkout/payment') {
          window.location.href = 'https://www.sportsdirect.com/checkout/payment';
        } else {
          window.location.href = 'https://www.sportsdirect.com/checkout/payment';
        }
      });
    }, 1500);

  }
};

export default activate;
