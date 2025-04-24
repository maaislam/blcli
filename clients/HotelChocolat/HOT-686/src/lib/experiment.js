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


const startExperiment = () => {
  console.log('Experiment started');
  pollerLite(['.pt_checkout #main .checkout-billing .checkout-tabs-nav'], () => {

    const appleButton = document.querySelector('.pt_checkout #main .checkout-billing .checkout-tabs-nav li[data-method="DW_APPLE_PAY"] a');
    console.log(appleButton);
    setTimeout(() => {
      if(!appleButton.closest('li').classList.contains('disabled'))
      appleButton.click();
    }, 1000);
    // debitButton.click();
  })
}

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
  function isSafari() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('edge');
  }

  if (isSafari()) {
    startExperiment();
  }

};
