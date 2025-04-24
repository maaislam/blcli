/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

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

  let travelodgeGDL = window.globalDataLayer;

  // Apple Pay Exclusions
  if (window.location.href.indexOf('basket') > -1 || window.location.href.indexOf('checkout') > -1) {

    if (travelodgeGDL.basketRoomCodePerRoom.indexOf('DHZN') > -1 ||
      travelodgeGDL.basketRoomCodePerRoom.indexOf('DAFN') > -1 ||
      travelodgeGDL.basketRoomCodePerRoom.indexOf('BRDHZN') > -1 ||
      travelodgeGDL.basketRoomCodePerRoom.indexOf('BRDAFN') > -1 ||
      travelodgeGDL.userType.indexOf('agent') > -1
    ) {

      document.documentElement.classList.add(`${ID}-hide-apple-pay`);
      fireEvent(`Interaction - apple pay is hidden from the ${window.location.href} page`, true);

    }

  } 

  // Apple Pay Event Listeners
  document.body.addEventListener('click', (e) => {

    if (e.target.closest('#ckoApplePay')) {
      fireEvent(`Click - Apple Pay Button clicked on the ${window.location.href} page`);
    } 

  });

};
