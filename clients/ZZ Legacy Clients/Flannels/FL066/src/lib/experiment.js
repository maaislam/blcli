/**
 * FL066 - Payment Page Redesign
 * 
 * @author User Conversion
 */

// 1. User is not signed in => redirect to /carddetails
// 2. User then clicks paypal => redirect to /payment?paypal=yes
// 3. Or user makes payment
// 4. If user *is* signed in => stay on /payment
// 5. User then chooses a saved card => retain control functionality
// 6. User chooses add a new card => retain control functionality
// So when they’re signed in already, i see that as just restyling /payment
// If they’re not signed in, that’s where we have to do the redirect and bring things on to /carddetails


import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events, getCookie, setCookie, deleteCookie } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

// Get logged in status
import getUserStatus from './helpers/getUserStatus';
// Do we have saved cards?
import getSavedCards from './helpers/getSavedCards';

// Redirects
// import toCardDetails from './redirects/toCardDetails';
// import toPayments from './redirects/toPayments';

// Journeys
import guestUser from './journeys/guestUser';
import savedUser from './journeys/savedUser';

// Run previous tests
import FL021 from './helpers/FL021';
import FL022 from './helpers/FL022';
import goBack from './helpers/goBack';

events.analyticsReference = '_gaUAT';

const removeLoader = (el) => {
  el.parentNode.removeChild(el);
}

const activate = () => {

  if (settings.VARIATION === '3') {

    events.send(settings.ID, 'FL066 Control', 'FL066 Control is active');
    return false;
  }
  
  setup();

  events.send(settings.ID, `FL066 V${settings.VARIATION} is Active`, 'Test is active');

  const userStatus = getUserStatus();
  const hasSavedCards = getSavedCards();
  const basket = document.querySelector('.CheckoutLeft .OrderSumm');
  let voucherLink;

  if (userStatus === 'logged+in') { // Logged in User

    document.body.classList.add('FL066-hasCards');
    // Add class to card list items
    const savedCards = document.querySelectorAll('.PaymentMethodList .savedcard');
    if (savedCards.length > 0) {
      // Add class for styling

      for (let i = 0; savedCards.length > i; i += 1) {
        if (savedCards[i]) {
          // Add text
          savedCards[i].insertAdjacentHTML('afterbegin', `
            <p>Previous payment card</p>
          `);
    
          // Add parent classes
          const parentLi = savedCards[i].parentElement;
          if (parentLi && parentLi.nodeName === 'LI') {
            parentLi.classList.add('FL066-savedCardLi');
            if (i === 0) {
              // Add active class to first card
              parentLi.classList.add('FL066-activeCard');
            }
          }
    
          savedCards[i].addEventListener('click', (e) => {
            if (!savedCards[i].parentElement.classList.contains('FL066-activeCard')) {
              e.preventDefault();
    
              // Remove 'active' status from others
              const currentActive = document.querySelector('.FL066-activeCard');
              if (currentActive) {
                currentActive.classList.remove('FL066-activeCard');
              }
    
              savedCards[i].parentElement.classList.add('FL066-activeCard');
            }
          });
        }
      }

    } else {
      // No saved cards. Make 'Pay with Card' a button and hide 'Pay By Card'
      document.body.classList.add('FL066-noCards');
    }

    // Add class to 'Add new card'
    const addNewCard = document.querySelector('a.CardsIcons.PaymentMethodSelectionLink');
    if (addNewCard && addNewCard.parentElement && addNewCard.parentElement.nodeName === 'LI') {
      addNewCard.parentElement.classList.add('FL066-addCard');
    }

    // Add input to voucher link
    voucherLink = document.querySelector('a.Voucher.PaymentMethodSelectionLink');
    if (voucherLink) {
      voucherLink.parentElement ? voucherLink.parentElement.innerHTML = '<a href="" class="FL006_accordian-btn FL006_voucher">Use Voucher Code</a> <input type="text" name="FL066-voucherCode"/> <button class="FL066-applyVoucher">Apply</button>' : null;
      voucherLink = document.querySelector('a.FL006_voucher');
    }


    // Add dummy 'Pay by card' button above paypal
    const payPalRef = document.querySelector('li[data-paymenttype="PayPal"]');
    if (payPalRef) {
      payPalRef.insertAdjacentHTML('beforebegin', `
        <li class="FL066-payCard">
        <button class="FL066-payCardBtn">
          Pay By Card
          </button>
        </li>
        <li class="FL066-or">
          <p>- or -</p>
        </li>
      `);

      // Add payPal logo
      const PayPalLogoRef = payPalRef.querySelector('span.PayText span.bold');
      if (PayPalLogoRef) {
        PayPalLogoRef.textContent = '';
        PayPalLogoRef.insertAdjacentHTML('beforeend', '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAASCAYAAADrL9giAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjg4NDZGN0Q2QTkxMTFFOTkxMzdENENDODlDQjQ3QTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg4NDZGN0U2QTkxMTFFOTkxMzdENENDODlDQjQ3QTIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCODg0NkY3QjZBOTExMUU5OTEzN0Q0Q0M4OUNCNDdBMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCODg0NkY3QzZBOTExMUU5OTEzN0Q0Q0M4OUNCNDdBMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp0PhrAAAAOqSURBVHja5FdbSFRhEN4VWSKWkEWW7YKISJAsUSKmIeGDSFiIRFRIhA/Rg4REQj0EQkhIDz2ED1EP9RAa3amIQqKy3BS7SNFFNEMMI0qSErOLtn1T34lx2j27BhuCAx//2Tkz88+Zf2b+Wa+HFI1G52Ep8PxNP4DPwCuv1/vJk0KCDzlYQoAPSCNk/0lgEPsP/YNNsVEJ+Ml6SvsjwDctWBZ1pwmgLsUBGE7gwylg/gxtLjU2qsirBhq0YEM0MU0BhSn6+OxocnRghna3Gf2QZIVkPBBIV7Kr1LOk/Gam3zqglnxJp3Io9mItA4qBLKaUlEc/cAap2ucEFcti2rkIfptyrAlLgD/bKaNpL/Cc9g+qFF4P7IP+CqylwEoggz5LWkeAc9hrkvLFyuZL8N/y+Qvxu06A9ypKt5SjPmBcvdsP1CYolXLqXlP8o8rmBsX/DuQBh02mhZT8afXuMX0ac/HhKmtfdHsUv8VmSBrXXCBT8TvU82pA1919YCFPvAu4ALSpE5RmWs/nV0ov5AQUS5PiH8OpyEnr0hpyToo1r5vzIyDIfXq592XRUTIV4jd0JWvyFD+SbJ3IaWwB9pjMeMHoB4F05/ZgXUWU3CW+26V4neTVKd4okEkbE+aUtwI7jF3JjCLKB1X2+k1WCRUAawwvP14AjiTRfEYdA1hLgZPAgHH8T5lQrlLx+qXpmIDuplxhkg2wkfJBlmIn/Zoycl8lc3iADo0x+2IG4KHLpqJ4Vq4OyjYm4WgVZfOMnWYTEB/ldia4eXqUzXwTxFjUQ9nzitce7+P9bEQOiVKYyNJRw/NyE+1mpmSNcSDLqV9jW+tuVHZbFH+c+4R5XweMv7oknjH18/k8reGauaIpXgBsndS63KnVSu4ja1Fq8ITiDzsdmDqvY5zQXWN3QL2LuOzvMyW3XR2MDnQND08HvDKWzXTTfYUeuMwVk+p5AW8EobDu0ujg+k6Xm2CJGa3r1UdJM8tR7+8lmG20D4egL/NKCb/FoW5+V5raszuWsTQzAMls/MRl85syk6vfYTVUxLtq7PzeigBpZ4rM+7gZAD3x77g5hBJehw59APrMdw2qAWi6TfkPQEO/JkAIXk8wWgY4jWVwUpOZYa3649IBGyNK/grlnQlzmf5TIyMwFn093XD708XyqmDWvANucy7IpcgI9O/wxsom7w14XZ7/TWxOU/YamxPE5thumqN/LgVgk+n8NbPRT28KAyB/iBapzt1qbodZQT8FGADgHSbTj8eMOQAAAABJRU5ErkJggg==" alt="PayPal"/>');
      }
    }
    const payCardBtn = document.querySelector('.FL066-payCardBtn');
    if (payCardBtn) {
      payCardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        events.send(settings.ID, 'FL066 Click', 'User clicked pay by card');
        const ogBtn = document.querySelector('li.FL066-activeCard a.PaymentMethodSelectionLink');
        if (ogBtn) {
          ogBtn.click();
        }
      });
    }

  } else if (userStatus !== 'logged+in') { // Guest
    // Run Prev Tests
    if (!document.querySelector('.FL021V2')) {
      FL021();
    }
    const addedTestFrame = document.querySelector('.FL006_accordian-content'); // Ref.
    const removeVoucherLink = document.querySelector('a#dnn_ctr88156_PaymentMethod_lbtnRemovePromoCode'); // To clear
    voucherLink = document.querySelector('.FL006_accordian-btn.FL006_voucher'); // To click
    // Move all buttons below iFrame.
    const addedAccordian = document.querySelector('.FL006_accordian');
    if (addedAccordian && addedTestFrame) {
      addedTestFrame.insertAdjacentElement('afterend', addedAccordian);
    }

    if (window.location.href.indexOf('/carddetails') > -1) {

      // Add back button
      goBack();

      // Add billing address message
      const billingMessage = document.querySelector('.FL066 .FL066-or');
      if (billingMessage) {
        billingMessage.insertAdjacentHTML('beforeend', `
          <p class="FL066-billingMessage">If you have selected a different billing address to your delivery address, you can add a new billing address on the next page, after payment.</p>
        `);
      }
  
    }
  }


  // Toggle voucher input
  if (voucherLink && voucherLink.parentElement) {
    const voucher = voucherLink.parentElement;
    voucherLink.addEventListener('click', (e) => {
      e.preventDefault();
      events.send(settings.ID, 'FL066 Click', 'User clicked toggle voucher');
      if (!voucher.classList.contains('FL066-showVoucher')) {
        voucher.classList.add('FL066-showVoucher');
      }
    });
  }

  // Run FL022
  FL022.init();

  

  const showMessages = () => {
    // If discount was just added, show a message
    if (getCookie('FL066-addedDiscount') && !getCookie('FL066-messageShown')) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="FL066-discountMessage">
          <p>Discount has been applied.</p>
        </div>
      `);

      document.body.classList.add('FL066-discountAdded');

      events.send(settings.ID, 'FL066 Discount Added', 'Discount code applied');

      setTimeout(() => {
        const el = document.querySelector('.FL066-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('FL066-messageShown');
        deleteCookie('FL066-addedDiscount');
        // set cookie
        setCookie('FL066-messageShown', 'true', 2);
      }, 3500);
    }

    // If code applied failed, show message
    if (getCookie('FL066-voucherError') && !getCookie('FL066-messageShown')) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="FL066-discountMessage FL066-discountError">
          <p>This discount code is not valid.</p>
        </div>
      `);

      document.body.classList.remove('FL066-discountAdded');

      events.send(settings.ID, 'FL066 Invalid Code', 'Discount code invalid');

      // Then remove
      setTimeout(() => {
        const el = document.querySelector('.FL066-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('FL066-messageShown');
        deleteCookie('FL066-voucherError')
        setCookie('FL066-messageShown', 'true', 2);
      }, 3500);
      // set cookie
    }

    // If card details fail
    if (getCookie('FL066-cardError') && !getCookie('FL066-messageShown') && window.location.href.indexOf('/carddetails') > -1) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="FL066-discountMessage FL066-discountError">
          <p>There was a problem with your card details, please try again.</p>
        </div>
      `);

      events.send(settings.ID, 'FL066 Invalid Card', 'Card details invalid');

      // Then remove
      setTimeout(() => {
        const el = document.querySelector('.FL066-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('FL066-messageShown');
        deleteCookie('FL066-cardError');
      }, 3500);
      // set cookie
      setCookie('FL066-messageShown', 'true', 2);
    }

    // If failed payment
    if (getCookie('FL066-payError') && !getCookie('FL066-messageShown')) {
      // Add message
      document.body.insertAdjacentHTML('afterbegin', `
        <div class="FL066-discountMessage FL066-discountError">
          <p>Your card issuer has declined the payment. Please ensure that you enter all card details correctly and you have sufficient funds available to make the payment. If this problem persists, please contact your card issuer.</p>
        </div>
      `);

      events.send(settings.ID, 'FL066 Payment Failed', 'Payment failed on confirmation page');

      // Then remove
      setTimeout(() => {
        const el = document.querySelector('.FL066-discountMessage');
        if (el) {
          el.parentNode.removeChild(el);
        }
        deleteCookie('FL066-messageShown');
        deleteCookie('FL066-payError');
      }, 3500);
      // set cookie
      setCookie('FL066-messageShown', 'true', 2);
    }
  }
  showMessages();

  // Add message to basket
  basket.insertAdjacentHTML('afterbegin', `
    <div class="FL066-message">
      <p>You can still review your order before purchasing on the next page</p>
    </div>
  `);

  if (window.location.href.indexOf('/carddetails') > -1) {
    setTimeout(() => {
      const iframeEl = document.querySelector('iframe#dnn_ctr88159_CardCapture_CardCaptureFrame');
      if (iframeEl) {
        iframeEl.src = iframeEl.src;
      }
    }, 800);
  }

  // If user lands on checkout/usevoucher, 
  if (window.location.href.indexOf('/usevoucher') > -1) {
    // check for the discount applied message.
    pollerLite(['.ProValue', '.AddressContainBut input[type="submit"]'], () => {
      deleteCookie('FL066-addedDiscount');
      deleteCookie('FL066-messageShown');
      // Set cookie to showMessage
      setCookie('FL066-addedDiscount', 'true', 2);
      // Redirect to /carddetails
      // if (document.referrer === 'https://www.flannels.com/checkout/payment') {
      //   window.location.href = 'https://www.flannels.com/checkout/payment';
      // } else {
      //   window.location.href = 'https://www.flannels.com/checkout/carddetails';
      // }
      const continueBtn = document.querySelector('.AddressContainBut input[type="submit"]');
      if (continueBtn) {
        continueBtn.click();
      }
    })

    // Check for error message
    pollerLite(['#dnn_ctr88158_PromoCodeApplication_divVoucherError'], () => {
      deleteCookie('FL066-addedDiscount');
      deleteCookie('FL066-messageShown');
      // Set cookie to show message
      setCookie('FL066-voucherError', 'true', 2);
      // Redirec
      if (document.referrer === 'https://www.flannels.com/checkout/payment') {
        window.location.href = 'https://www.flannels.com/checkout/payment';
      } else {
        window.location.href = 'https://www.flannels.com/checkout/carddetails';
      }
    });
  }


  // Add discount class is discount exists
  pollerLite(['#DiscountRow'], () => {
    const discountEl = document.querySelector('#DiscountRow');
    if (discountEl && discountEl.style.display == 'block') {
      document.body.classList.add('FL066-discountAdded');
    }
  });

  // Card error message
  if (window.location.href === 'https://www.flannels.com/checkout/payment?errorcode=100') {
    pollerLite(['.PaymentStage #dnn_ctr88156_PaymentMethod_ProcessingErrorMessage_ErrorPaymentMessage'], () => {
      deleteCookie('FL066-messageShown');
      // Set cookie to show message
      setCookie('FL066-cardError', 'true', 2);
      // Redirec
      window.location.href = 'https://www.flannels.com/checkout/payment';
      // if (document.referrer === 'https://www.flannels.com/checkout/payment') {
      // } else {
      //   window.location.href = 'https://www.flannels.com/checkout/carddetails';
      // }
    });
  }

  // Failed payment
  if (window.location.href.indexOf('payment?errorcode=101&ct=2')) {
    pollerLite(['.PaymentStage #dnn_ctr88156_PaymentMethod_ProcessingErrorMessage_ErrorPaymentMessage'], () => {
      deleteCookie('FL066-messageShown');

      // Set cookie to show message
      setCookie('FL066-payError', 'true', 2);
    });
  }

  
};

export default activate;
