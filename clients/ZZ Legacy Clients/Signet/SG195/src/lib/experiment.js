/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

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

    const csBanner = () => {
      const banner = document.createElement('div');
      banner.classList.add(`${ID}-csBanner`);
      banner.innerHTML = `
      <h3>Coming Soon</h3>
      <p>Get in touch with your local store to register your interest</p>
      <a href="https://www.ernestjones.co.uk/webstore/secure/storeLocator.sdo?icid=ej-tn-topbar-store">Store Locator</a>`;

      document.querySelector('.product-stock').insertAdjacentElement('beforebegin', banner);

      document.querySelector(`.${ID}-csBanner a`).addEventListener('click', () => {
        fireEvent('Clicked store locater button');
      })
    }

    // change flag
    const OOSFlag = document.querySelector('.detail-page__right-column .product-messages .product-messages__item.product-messages__item-sale span');
    OOSFlag.textContent = 'Coming Soon';

    csBanner();
    
  } else {
    // any control code here
  }
};
