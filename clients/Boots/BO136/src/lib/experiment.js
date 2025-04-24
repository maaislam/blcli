/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import InfoModal from './components/lightbox';
import PageContent from './markup';
import { cookieOpt, fireEvent, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
    if(VARIATION !== 'control') {

      window.scrollTo(0,0);

      document.body.insertAdjacentHTML('beforeend',`<div class="${ID}-overlay"></div>`);
      new InfoModal();
      new PageContent();

      const desktopLogin = document.querySelector('#header-navbar-login-link');
      if(desktopLogin) {
        desktopLogin.addEventListener('click', () => {
          fireEvent('Click Login');
        });
      }
      

    } else {
      const orderButton = document.querySelector('[class*="styles-module__primary"]');
      const loginButton = document.querySelector('[class*="styles-module__secondary"]');
      const desktopLogin = document.querySelector('#header-navbar-login-link');

      orderButton.addEventListener('click', () => {
        fireEvent('Click Order now');
      });
      if(loginButton) {
        loginButton.addEventListener('click', () => {
          fireEvent('Click Login');
        });
      }
      if(desktopLogin) {
        desktopLogin.addEventListener('click', () => {
          fireEvent('Click Login')
        });
      }
    }
    

};
