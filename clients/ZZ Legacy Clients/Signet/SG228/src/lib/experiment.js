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

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)

  if(VARIATION === 'control') {
    return;
  }
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    // test code here

    const addBadge = () => {
      const badge = document.createElement('div');
      badge.classList.add(`${ID}-badge`);
      badge.innerHTML = `<span>Black friday - 60% OFF</span>`;
      document.querySelector('.product-gallery__main').appendChild(badge);
    }
    const addOfferMessage = () => {
      const offerMessage = document.createElement('div');
      offerMessage.classList.add(`${ID}-offer-message`);
      offerMessage.innerHTML = `
      <h3>Black Friday Deal</h3>
      <p>Save 60% on this product while stocks last. Discount will auto-apply at basket. Offer ends in: <span class="${ID}-countdown"></span></p>`
      
      if(document.querySelector('.product-summary .product-customer-rating-summary')) {
        document.querySelector('.product-summary .product-customer-rating-summary').insertAdjacentElement('beforebegin', offerMessage);
      } else {
        document.querySelector('.product-stock').insertAdjacentElement('beforebegin', offerMessage);
      }
    }
    
    const countdown = () => {
      var countDownDate = new Date("Nov 29, 2022 23:59:59").getTime();

      // Run myfunc every second
      var myfunc = setInterval(function() {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
            
        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

        document.querySelector(`.${ID}-countdown`).innerHTML = days + " days " + hours + " hours " + minutes + " minutes";
        if (timeleft < 0) {
            clearInterval(myfunc);
            document.querySelector(`.${ID}-offer-message`).classList.add('expired');
        }
      }, 1000);
    }

    // const changeFinance = () => {
    //   const productPriceEl = document.querySelector('.product-price--current').innerText;
    //   const price = parseFloat(productPriceEl.replace('£', ''));
    //   if(price >= 430) {
    //     const ifc = document.querySelector('finance-options');
    //     const financePrice = ifc.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);
    //     const offerPrice = price * 0.4;
    //     const deposit = offerPrice * 0.1;
    //     let monthlyTerm = 48;

    //     if (offerPrice < 300){
    //         monthlyTerm = 0;
    //     }
    //     if (offerPrice > 299 && offerPrice < 751){
    //         monthlyTerm = 12;
    //     }
    //     if (offerPrice > 750 && offerPrice < 1000){
    //         monthlyTerm = 30;
    //     }
    //     const monthlyNumber = (offerPrice - deposit) / monthlyTerm;

    //     const monthlyPayment = (monthlyNumber.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

    //     const financeMsg = document.createElement('div');
    //     financeMsg.classList.add(`${ID}-finance-msg`);
    //     financeMsg.innerHTML = `<p>
    //     From <span class="bf-finance">£${monthlyPayment}</span> p/m with 0% interest free credit when saving 60% with Black Friday. Usually <span class="normal-finance">${financePrice[0]}</span> p/m.
    //     <a class="finance-link">View options</a></p>`;

    //     document.querySelector('.product-price').insertAdjacentElement('afterend', financeMsg);

    //     financeMsg.addEventListener('click', () => {
    //       document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
    //     });
    //   } else {
    //     return;
    //   }
    // }

    // pollerLite(['finance-options',
    // () => {
    //   if(document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
    //     return true
    //   }
    // }
    // ], () => {
    //   changeFinance();
    // });
   

    addBadge();
    addOfferMessage();
    countdown();

  } else {
    // any control code here
  }
};
