import { cardDetails, redirectToCardDetails, eventVoucher } from './experiment';
import flicker from './flickerPrevention';
import { poller } from '../../../../lib/uc-lib';
import { getCookie, deleteCookie, setCookie } from '../../../../lib/utils';

flicker();

/* eslint-disable */
const pathname = window.location.pathname;
const searchQuery = window.location.search;
const cookie = getCookie('FL006_paypal');
const cookieApple = getCookie('FL006_apple');
const savedCards = document.querySelectorAll('.savedcard');
/* eslint-enable */

// When user is on the /checkout/payment page without the paypal query, redirect to card detail page
poller([
  () => {
    let trigger = false;
    if (pathname.indexOf('/checkout/payment') > -1) {
      trigger = true;
      const form = JSON.stringify(document.querySelector('#__EVENTTARGET').parentNode.outerHTML);
      localStorage.setItem('FL021_form', form);

      if (document.querySelector('li[id*="divPaypalCheckoutButton"]') && !document.querySelector('li[id*="divPaypalCheckoutButton"]').classList.contains('hidden')) {
        setCookie('FL021_paypal', 'PayPalExists', 20000000000);
        localStorage.setItem('FL021_paypal-post', document.querySelector('li[id*="PaypalCheckoutButton"] .PaymentMethodSelectionLink').href);
      } else {
        deleteCookie('FL021_paypal');
      }
      if (document.getElementById('divApplePayCheckoutButton') && !document.getElementById('divApplePayCheckoutButton').classList.contains('hidden')) {
        setCookie('FL021_apple', 'ApplePayExists', 20000000000);
        localStorage.setItem('FL021_apple-post', document.querySelector('#divApplePayCheckoutButton .PaymentMethodSelectionLink').href);
      } else {
        deleteCookie('FL021_apple');
      }
      if (savedCards.length > 0) {
        const JObj = [];
        [].forEach.call(savedCards, (item) => {
          const cardEnd = item.querySelector('.CardNumber').innerText;
          const backgroundPos = window.getComputedStyle(item.querySelector('.PayImage'), null).backgroundPosition.trim().split(/\s+/);
          const backgroundImg = window.getComputedStyle(document.querySelector('.PaymentType_mastercard'), null).backgroundImage;

          JObj.push({
            num: cardEnd,
            img: backgroundImg,
            top: backgroundPos[0],
            left: backgroundPos[1],
            href: item.href,
          });
        });

        localStorage.setItem('FL021_saved', JSON.stringify(JObj));
      }
    }
    return trigger;
  },
], redirectToCardDetails);

// When user is on the /checkout/payment page with the paypal query, click the paypal button

poller([
  'iframe[id*="_CardCaptureFrame"]',
], cardDetails);

poller([
  '#FindGiftCardButton',
  () => {
    let trigger = false;
    if (pathname.indexOf('/checkout/usegiftcard') > -1) {
      trigger = true;
    }
    return trigger;
  },
], eventVoucher);

