/**
 * HC075 - PDP USPs
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/patisserie-chocolate-box.html
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import uspData from './expData';
import { getProductID } from './helpers';
import initiateSlick from './initiateSlick';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const rightSideProductContent = document.querySelector('#product-content');
  const productId = getProductID();
  let itemList = '';
  for (let i = 2; i <= 4; i += 1) {
    const usp = uspData[`${productId}`];
    itemList += `<li class="${ID}-usp-msg" id="${ID}-usp-${i}">
      <div class="${ID}-usp__msg">
        <span>${usp[i]}</span>
      </div>
    </li>`;
  }

  const uspMessagesContainer = `<div class="${ID}-valueMessages__wrapper v${VARIATION}">
    <div class="${ID}-valueMessages__container">
      <ul class="${ID}-valueMessages__content">
        ${itemList}
      </ul>
    </div>
  </div>`;


  rightSideProductContent.querySelector('.pdpForm fieldset').insertAdjacentHTML('afterend', uspMessagesContainer);
  
  if (VARIATION == '1') {
    fireEvent('Visible - USP Messages');
  } else if (VARIATION == '2') {
    fireEvent('Visible - USP Carousel');
    initiateSlick();
  }

};
