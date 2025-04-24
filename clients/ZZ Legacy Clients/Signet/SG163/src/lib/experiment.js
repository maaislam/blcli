/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import addToBag from './addToBag';
import { setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
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

  if (VARIATION !== 'control'){

  const siteIdent = getSiteFromHostname();
  if (siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

  const checkSession = setInterval(function () {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if (
      sessionStorage.getItem('analyticsDataSentFor') &&
      sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname
    ) {
      if (typeof s !== 'undefined') {
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }
      clearInterval(checkSession);
    }
  }, 1000);

  setInterval(function () {
    if (window._uxa) {
      window._uxa = window._uxa || [];
      window._uxa.push(['trackDynamicVariable', { key: `${ID}`, value: `Variation ${VARIATION}` }]);
    }
  }, 800);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (digitalData.page.pageInfo.pageType === 'Checkout') {
    var valueOfProducts = getCookie('products_value');
    const numberOfProducts = document.querySelector('span#js-shopping-bag-count');
    const productsValue = numberOfProducts && parseInt(numberOfProducts.innerText);

    if (parseInt(valueOfProducts) < productsValue) {
      fireEvent('Add to Basket');
      deleteCookie('products_value');
    } else {
      deleteCookie('products_value');
    }
  } else if (digitalData.page.pageInfo.pageType === 'PDP') {
    fireEvent('Conditions Met');
    document.querySelector('#basketForm .product-buy-now__button').addEventListener('click', () => {
      const select = document.querySelector('select[name="productNumber"]');
      const value = select.options[select.selectedIndex].value;
      if (!value) {
        fireEvent('Validation Errors');
      }
      const numberOfProducts = document.querySelector('span#js-shopping-bag-count');
      const productsValue = parseInt(numberOfProducts.innerText);
      setCookie('products_value', productsValue, 30);
    });
  }

  if (VARIATION !== 'control') {
    // test code here

    console.log(getSiteFromHostname());
    if (getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
      pollerLite(['main#access-content'], () => {
        const addToBasketWeb = document.querySelector('main#access-content');
        addToBasketWeb.classList.add(`${ID}-ernest`);
        document.querySelector(`.${ID}-ernest button.product-buy-now__button`) &&
          document.querySelector(`.${ID}-ernest button.product-buy-now__button`).addEventListener('click', () => {

            addToBag();
            fireEvent('Click Sticky Button');
          });
      });
    }

    if (getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
      pollerLite(['main#access-content'], () => {
        const addToBasketWeb = document.querySelector('main#access-content');
        addToBasketWeb.classList.add(`${ID}-hsamuel`);
        document.querySelector(`.${ID}-hsamuel button.product-buy-now__button`) &&
          document.querySelector(`.${ID}-hsamuel button.product-buy-now__button`).addEventListener('click', () => {
            addToBag();
            fireEvent('Click Sticky Button');
          });
      });
    }
  } else {
    // any control code here
  }
}
};
