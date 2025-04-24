/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie } from '../../../../../lib/utils';
import EmailPopup from './emailBox';
import formSubmit from './formSubmit';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

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
  if(!getCookie(`${ID}-emailSignUp`)) {
    if(!localStorage.getItem(`${ID}-emailShow`)){

      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
      new EmailPopup();
      formSubmit();
   }
 }
  
};
