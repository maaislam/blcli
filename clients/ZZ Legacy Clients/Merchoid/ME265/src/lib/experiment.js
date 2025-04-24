import EmailPopup from './emailLightbox';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import submitForm from './submitForm';

export default () => {
  setup();
  const {
    ID 
  } = shared;

  if(!localStorage.getItem(`ME265-closed`)) {
    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    new EmailPopup();
    submitForm();
  }
};
