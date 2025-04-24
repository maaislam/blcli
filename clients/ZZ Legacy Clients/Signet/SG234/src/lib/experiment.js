/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer, pollerLite } from '../../../../../lib/utils';
import products from './data';

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

  if(VARIATION === 'control') {
    return;
  }

  if(VARIATION !== 'control') {
    
  // IF PLP
  if (window.location.href.indexOf("webstore/l/") > -1) {
    document.documentElement.classList.add(`${ID}-plp`);

      const createBadge = (el) => {
        const badge = document.createElement('div');
        badge.classList.add(`${ID}-badge`);
        badge.innerHTML = `<span>20% OFF*</span>`;
        el.appendChild(badge);
        el.querySelector('.product-price').insertAdjacentHTML('beforebegin', `<span class="${ID}-additionalInfo">*Discount auto applied at basket</span>`);
      }

      const removeBadge = () => {
        const allBadges = document.querySelectorAll(`.${ID}-badge`);
        for (let index = 0; index < allBadges.length; index += 1) {
          const element = allBadges[index];
          element.remove();
        }
        const allText = document.querySelectorAll(`.${ID}-additionalInfo`);
        for (let index = 0; index < allText.length; index += 1) {
          const element = allText[index];
          element.remove();
        }
      }

      const checkProducts = () => {
        const allProducts = document.querySelectorAll('.product-card');
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          const elSku = element.getAttribute('data-insights-object-id');
          if (products.indexOf(elSku) > -1) {
            createBadge(element);
        }
      }
      }

      checkProducts();

      observer.connect(document.querySelector('.products.products-display--grid'), () => {
        removeBadge();
        checkProducts();
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          subTree: true
        },
      });
  }

  // IF PDP
  if(window.digitalData.page.pageInfo.pageType === 'PDP') {
    document.documentElement.classList.add(`${ID}-pdp`);

    const addBadge = () => {
      const badge = document.createElement('div');
      badge.classList.add(`${ID}-badge`);
      badge.innerHTML = `<span>20% OFF*</span>`;
      document.querySelector('.product-gallery__main').appendChild(badge);
    }
    const addOfferMessage = () => {
      const offerMessage = document.createElement('div');
      offerMessage.classList.add(`${ID}-offer-message`);
      offerMessage.innerHTML = `
      <h3>OFFER</h3>
      <p>Save 20% on this product. Discount auto applied at basket.</p>`
      

      if(document.querySelector('.product-summary .product-customer-rating-summary')) {
        document.querySelector('.product-summary .product-customer-rating-summary').insertAdjacentElement('beforebegin', offerMessage);
      } else {
        document.querySelector('.product-stock').insertAdjacentElement('beforebegin', offerMessage);
      }
    }
    

    const changeFinance = () => {
      

      const productPriceEl = document.querySelector('.product-price--current').innerText;
      const price = parseFloat(productPriceEl.replace('£', ''));
      if(price >= 430) {
        const ifc = document.querySelector('finance-options');


        const financePrice = ifc.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);


        ifc.shadowRoot.querySelector('.finance-options__button').style.display = 'none';
        ifc.shadowRoot.querySelector(' .finance-options > p[part]').style.display = 'none';
        ifc.shadowRoot.querySelector('.finance-options').style = `padding: 0px;`;

        
        const offerPrice = price * 0.70;
        const deposit = offerPrice * 0.1;
        let monthlyTerm = 48;

        if (offerPrice < 300){
            monthlyTerm = 0;
        }
        if (offerPrice > 299 && offerPrice < 751){
            monthlyTerm = 12;
        }
        if (offerPrice > 750 && offerPrice < 1000){
            monthlyTerm = 30;
        }
        const monthlyNumber = (offerPrice - deposit) / monthlyTerm;

        const monthlyPayment = (monthlyNumber.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        const financeMsg = document.createElement('div');
        financeMsg.classList.add(`${ID}-finance-msg`);
        financeMsg.innerHTML = `<p>
        From <span class="bf-finance">${financePrice[0]}</span> p/m with 0% interest free credit.<a class="finance-link">View options</a></p>`;

        document.querySelector('.product-price').insertAdjacentElement('afterend', financeMsg);

        financeMsg.addEventListener('click', () => {
          document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
        });
      } else {
        return;
      }
    }

    pollerLite(['finance-options',
    () => {
      if(document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
        return true
      }
    }
    ], () => {
      changeFinance();
    });

    addBadge();
    addOfferMessage();
  }
    
  } 
};
