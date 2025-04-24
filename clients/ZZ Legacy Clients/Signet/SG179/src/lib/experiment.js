/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { flagMessages } from './data';

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

  setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    // test code here

    const productSku = window.digitalData.product[0].productInfo.masterSku;

    // Create message markup
    const createMessage = (text, image) => {
      const message = document.createElement('div');
      message.classList.add(`${ID}-message`);
      message.innerHTML = `<span style="background-image:url(${image})"></span><p>${text}</p>`;

      return message;
    }

    // remove message
    const hideMessage = () => {
      if(document.querySelector(`.${ID}-message`)) {
        setTimeout(() => {
          document.querySelector(`.${ID}-message`).classList.add('hidden');
        }, 5000);

        setTimeout(() => {
          document.querySelector(`.${ID}-message`).remove();
        }, 7000)
      }
    }

    // add message if matching SKU
    Object.keys(flagMessages).forEach((i) => {
      const data = flagMessages[i];

      if(data.skus.indexOf(productSku) > -1) {
        document.querySelector('.product-gallery__main').insertAdjacentElement('afterbegin', createMessage([i][0], data.icon));
      }
    });

    

    hideMessage();
    


    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
    
  } else {
    // any control code here
  }
};
