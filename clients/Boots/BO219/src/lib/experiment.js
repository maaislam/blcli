/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    document.querySelectorAll('.with-site-login .gigya-composite-control.gigya-composite-control-link.boots-block.boots-button-secondary.boots-register')[1].addEventListener('click', () => {
      fireEvent('Clicked register');
    });
  } else {

    const newRegisterButton = `<a class="${ID}-register" href="https://www.boots.com/AdvantageCardApply">Register</a>`;
    document.querySelectorAll('.with-site-login .gigya-composite-control.gigya-composite-control-link.boots-block.boots-button-secondary.boots-register')[1].insertAdjacentHTML('beforebegin', newRegisterButton);

    document.querySelector(`.${ID}-register`).addEventListener('click', () => {
      fireEvent('Clicked register');
    });
  }
};
