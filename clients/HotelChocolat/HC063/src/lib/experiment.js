/**
 * HC063 - Mobile Menu
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { generateNewMenu } from './menuComponents';

export default () => {
  const { ID, VARIATION } = shared;

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
  const menuCTA = document.querySelector('#navigation #hamburger-menu');
  menuCTA.addEventListener('touchend', (e) => {
    if (!menuCTA.classList.contains(`${ID}-newMenu`)) {
      generateNewMenu();
      document.querySelector('body').classList.add(`${ID}-noScroll`);

      menuCTA.classList.remove('hover');
      menuCTA.classList.add(`${ID}-newMenu`);

      fireEvent(`Click - Open mobile menu`);
    } else {
      document.querySelector(`.${ID}-menu__wrapper`).classList.add('show');
      document.querySelector('body').classList.add(`${ID}-noScroll`);

      menuCTA.classList.remove('hover');

      fireEvent(`Click - Open mobile menu`);
    }
    
  });
  

};
