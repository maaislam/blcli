/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getCookie } from '../../../../../lib/utils';
import formSubmit from '../formSubmit';
import EmailPopup from './emailBox';
import { setup } from './services';
import shared from './shared';

export default () => {
 

  const { ID, VARIATION } = shared;

  
  // Create lightbox that will show, different class for each postion for slide out and up
  const createOverlay = () => {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }

  if(!getCookie(`${ID}-emailSignUp`)) {
    if(!localStorage.getItem(`${ID}-emailShow`)){
        setup();
        createOverlay();
        new EmailPopup();
        formSubmit();
    }
  }
};
