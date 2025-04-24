/**
 * FLAN-354 - Delivery costs on PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.flannels.com/stone-island-soft-shell-r-hooded-jacket-608355#colcode=60835571
 */
import { setup, stringFormat, fireEvent, lineContainsPrice } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

// Force set analytics reference
events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  if (VARIATION == 'control') {
    fireEvent('Conditions Met - Control');
  } else if (VARIATION == '1') {
    fireEvent('Conditions Met - V1');
    // Write experiment code here
    let allDeliveryLines = document.querySelectorAll('.innerInfoRow .left-info.info-box ul li');
    let newDeliveryInfoMsg = '';

    let brandName = document.getElementById('lblProductBrand').innerHTML.toLowerCase().trim();

    [].forEach.call(allDeliveryLines, (line) => {
      let msg = '';
      if (lineContainsPrice(line)) {
        msg = line.innerText.trim();
        msg = msg.replace(' | ', ' ').toLowerCase();

        msg = stringFormat(msg);
        newDeliveryInfoMsg += `<p>${msg}</p>`;
      }
    });

    if (newDeliveryInfoMsg !== '' && brandName !== "gift") {
      const deliveryInfoContainer = `<div class="${ID}-deliveryInfo__wrapper">${newDeliveryInfoMsg}</div>`;
      document.querySelector('.deliveryoptions.col-xs-12').insertAdjacentHTML('beforebegin', deliveryInfoContainer);

      fireEvent('Visible - Delivery info message added in product description');
    } else {
      fireEvent(`Conditions Met - Product is a gift card OR No delivery info available for this product - ${window.location.pathname}`);
    }
  }
  
  
};
