/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import EmailPopup from './emailBox';
import formSubmit from './formSubmit';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const {
    ID, VARIATION
  } = shared;

  const createOverlay = () => {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
  }


  if(VARIATION === '1') {
    createOverlay();
  }
  new EmailPopup();
  formSubmit();
 
};
