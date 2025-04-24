/**
 * BO085 - PLP - Hide Reviews
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup, getPageType, pdpEvents, plpEvents, srpEvents } from './services';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
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
  if (VARIATION == 'control') {
    if (getPageType() == 'pdp') {
      // --- PDP Events
      pdpEvents();
    } else if (getPageType() == 'plp') {
      // --- PLP Events
      plpEvents();
    } else if (getPageType() == 'srp') {
      // --- SRP Events
      srpEvents();
    }
  } else if (VARIATION == '1') {
    if (getPageType() == 'pdp') {
      // --- PDP Events
      pdpEvents();
    } else if (getPageType() == 'plp') {
      // --- PLP Events
      plpEvents();
    } else if (getPageType() == 'srp') {
      // --- SRP Events
      srpEvents();
    }
  }
  

};
