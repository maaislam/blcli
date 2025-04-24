/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import MobileNavigation from './mobile/mobileMarkup';
import shared from './shared';
import mobileHeader from './mobile/mobileHeader';
import DesktopHeader from './desktop/desktopHeader';
import DesktopNavigation from './desktop/desktopNavMarkup';
import EmailPopup from './email/emailBox';
import formSubmit from './email/formSubmit';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  if(VARIATION === 'control') { 
    // ME280 Code
     /* Email Functions */
     const createOverlay = () => {
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    }
    createOverlay();
    new EmailPopup();
    formSubmit();
  }


  if(VARIATION !== 'control') { 
    if(window.innerWidth < 1024) {
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
      new MobileNavigation();
      mobileHeader();
    }

    if(window.innerWidth >= 1024) {
      new DesktopHeader();
      new DesktopNavigation();
    }

    /* Email Functions */
    const createOverlay = () => {
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    }
    createOverlay();
    new EmailPopup();
    formSubmit();
  }
    
};
