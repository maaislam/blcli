/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import { getCookie } from '../../../../../lib/utils';
import formSubmit from '../formSubmit';
import EmailPopup from './emailBox';
import shared from './shared';

export default () => {

  const { ID } = shared;

  setup();

  // Write experiment code here
  // Create lightbox that will show, different class for each postion for slide out and up
  const createOverlay = () => {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }

  if(!getCookie(`${ID}-emailSignUp`)) {
    if(!localStorage.getItem(`${ID}-emailShow`)){
        createOverlay();
        new EmailPopup();
        formSubmit();
   }
  }
};
