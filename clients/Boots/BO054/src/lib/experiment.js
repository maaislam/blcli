/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  // add login button 
  const addButton = () => {
    const loginButton = document.createElement('a');
    loginButton.classList.add(`${ID}-login`);
    loginButton.innerHTML = 'Login'
    loginButton.setAttribute('href', '/online/pharmacy/login');

    document.querySelector('.styles__content--Ej6ay button').insertAdjacentElement('afterend', loginButton);
  }

  const trackClicks = () => {

    document.body.addEventListener('click', (e) => {
      var btn = e.target;
      if (btn.className.match(/BO054-login/)) {
        window.cmCreateManualLinkClickTag(`/BO054?cm_sp=ClickedLogin-_-BO054-LoginButton-_-DHP`);
      } 
    });

  }

  addButton();
  trackClicks();
};
