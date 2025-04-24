/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie, logMessage, setCookie } from '../../../../../lib/utils';

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

  const getCode = () => {
    let storage = JSON.parse(localStorage.getItem('freddiesflowers') || null);
    let code;
    let codeCorrect;
    if (storage) {
        code = storage.register.details?.couponProperties?.reference;
        codeCorrect = typeof (code) !== 'undefined' && code != 'undefined' && code != null;
        if (codeCorrect) {
            return code;
        }
    }
    return null;
  };

  let code = getCode();

  logMessage("code: "+code);

  if(VARIATION == 1) {

    if(code !== null && window.location.href.indexOf('journey-coupon-homepage') == -1 && 
        (
          code.indexOf('STARTEROFFER') > -1 || 
          code.indexOf('WELCOMEOFFER') > -1 || 
          code.indexOf('VASESTARTERSET') > -1 || 
          code.indexOf('FFSTARTERSET') > -1 ||
          code.indexOf('BUDSET') > -1 ||
          code.indexOf('TIKTOKSTARTER') > -1 ||
          code.indexOf('KATIESTARTER') > -1 ||
          code.indexOf('STARTERSET') > -1)            
        ) {
      fireEvent('Interaction - redirecting to ?cms=journey-coupon-homepage, code used: '+code);
      window.location.href = "https://www.freddiesflowers.com/?cms=journey-coupon-homepage";
    } else {
      fireEvent('Code not found');
    }
  } else if (VARIATION == 2) {

    if(window.location.href.indexOf('freq=1') == -1) {
      fireEvent('Interaction - redirecting to ?freq=1, code used: '+code);
      window.location.href = "https://www.freddiesflowers.com/?freq=1";
    }
    

  } else {

    fireEvent('Interaction - no action as control, code used: '+code);

  }
};
