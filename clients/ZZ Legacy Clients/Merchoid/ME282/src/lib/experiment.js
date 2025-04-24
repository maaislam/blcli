/**
 * ME282 - Lowest Price Framing
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/eu/jurassic-park-silver-plated-vip-ticket/
 */
import { setup, generateLowPriceMessage } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  const prodUrl = window.location.pathname;
  let lowestPriceMsgShownOn = '';
  if (JSON.parse(sessionStorage.getItem(`ME282-lowest-price-message`)) !== null) {
    lowestPriceMsgShownOn = JSON.parse(sessionStorage.getItem(`ME282-lowest-price-message`));
    if (lowestPriceMsgShownOn[`${prodUrl}`] !== true) {
      generateLowPriceMessage(prodUrl);
    }
 } else {
    generateLowPriceMessage(prodUrl);
  }
  
};


export default activate;
