/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  document.querySelector('.oct-text.oct-text--standard.oct-text--size_m.oct-aem-text.oct-aem-text--h2--variant-1.oct-teaser__title').innerHTML = "Test Active"
"Test Active"

  /*  ----------------
    Experiment code 
    ------------------ */

};
