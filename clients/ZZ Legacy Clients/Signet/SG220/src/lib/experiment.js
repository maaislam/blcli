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
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    // test code here

    const voucherAmount = 10;
    const voucherCode = 'EXTRA10';

    const addNewPricing = () => {
      const currentPrice = document.querySelector('.product-price--current').innerText;
      const price = parseFloat(currentPrice.replace('£', ''));

      const amount = voucherAmount / 100;
      const total = price - (price * amount)

      const newPrice = `
      <div class="${ID}-price">
        <span class="${ID}-voucherPrice">£${total.toFixed(2)}</span> with code ${voucherCode} or ${currentPrice}
      </div>`;

      document.querySelector('.detail-page__right-column .product-price').insertAdjacentHTML('beforebegin', newPrice);
    }

    const addVoucherBox = () => {
      const voucherBox = document.createElement('div');
      voucherBox.classList.add(`${ID}-addvoucher-box`);
      voucherBox.innerHTML = `
      <div class="${ID}-voucherFlag"><span>Voucher</span></div>
      <div class="${ID}-voucherInput">
        <div class="inner">
          <input type="checkbox" id="${ID}-voucherCheck">
          <label for="${ID}-voucherCheck">Apply <span class="smallMobile">voucher</span><span class="normalText"><b>${voucherCode}</b> code</span> to basket</label>
        </div>
      </div>`;

      document.querySelector('.detail-page__right-column .product-price').insertAdjacentElement('afterend', voucherBox);
    }

    const changeFinance = () => {
      
      const ifc = document.querySelector('finance-options');

      const financePrice = ifc.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);
      

      ifc.shadowRoot.querySelector('.finance-options__button').style.display = 'none';
      ifc.shadowRoot.querySelector(' .finance-options > p[part]').style.display = 'none';
      ifc.shadowRoot.querySelector('.finance-options').style = `padding: 0px;`
     
      const financeMsg = document.createElement('div');
      financeMsg.classList.add(`${ID}-finance-msg`);
      financeMsg.innerHTML = `<p>
      From <span class="finance">${financePrice[0]}</span> p/m with 0% interest free credit.
      <a class="finance-link">View options</a></p>`;

      document.querySelector('.product-stock').insertAdjacentElement('beforebegin', financeMsg);

      financeMsg.addEventListener('click', () => {
        document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
      });
    }

    const storeVoucher = () => {
      const voucherCheck = document.querySelector(`#${ID}-voucherCheck`);

      // // If voucher already applied
      // if(sessionStorage.getItem('voucherApplied')) {
      //   voucherCheck.checked = true;
      // }

      voucherCheck.addEventListener('change', () => {
        if(voucherCheck.checked) {
          fireEvent('Checked apply voucher');
          sessionStorage.setItem('voucherChecked', voucherCode);
        } else {
          sessionStorage.removeItem('voucherChecked');
        }
      });
    }
    const moveReviewsAndCTA = () => {
      if(window.digitalData.product[0].productInfo.ratingCount > 0) {
        const topReviews = document.querySelector('.product-summary .product-customer-rating-summary');
        document.querySelector('.product-summary .product-name').insertAdjacentElement('afterend', topReviews);
      }

      const addBtn = document.querySelector('.product-buy-now');
      document.querySelector('collect-in-store').insertAdjacentElement('beforebegin', addBtn);
    }

    const addPromoToBasket = () => {

      if(sessionStorage.getItem('voucherChecked') && sessionStorage.getItem('voucherChecked') === voucherCode && !sessionStorage.getItem('voucherApplied')) {
        const code = sessionStorage.getItem('voucherChecked');

        if(document.querySelector('.voucher__body--success-message').textContent.indexOf(code) === -1) {
        
          const voucherInput = document.querySelector('.voucher #labelled-by-add-promo-code');
          voucherInput.value = code;
    
          const focEventn = document.createEvent("Event");
          focEventn.initEvent("input", true, true);
          voucherInput.dispatchEvent(focEventn);
          
          const focEvent = document.createEvent("Event");
          focEvent.initEvent("change", true, true);
          voucherInput.dispatchEvent(focEvent);
    
          const keyEvent = document.createEvent("KeyboardEvent");
          keyEvent.initEvent("keypress", true, true);
          voucherInput.dispatchEvent(keyEvent);
    
          document.querySelector('.voucher__body--voucher-apply-button').click();

          if(document.querySelector('.voucher__body--error-message').style.display !== 'none') {
            document.querySelector('.voucher-header').click();
          }  else {
            sessionStorage.removeItem('voucherChecked');
          }
        }
      }
    }

    // if PDP
    if(window.digitalData.page.pageInfo.pageType === 'PDP') {

      pollerLite(['finance-options',
      () => {
        if(document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
          return true
        }
      }
      ], () => {
        changeFinance();
      });
    
      moveReviewsAndCTA(); 
      addNewPricing();
      addVoucherBox();
      storeVoucher();
  }

  if(window.digitalData.page.pageInfo.pageType === 'Checkout') {
    addPromoToBasket();
  }
    
  } else {
    // any control code here
  }
};
