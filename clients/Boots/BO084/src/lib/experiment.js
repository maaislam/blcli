/**
 * BO084 - FAQ Page Accordion
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup, addIconOnQuestions, clickEventsOnQuestions } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;


  if (VARIATION == 'control') {
    setup();
    cookieOpt();
    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }
    clickEventsOnQuestions();
  } else if (VARIATION == '1') {
    setup();
    cookieOpt();

    if (window.usabilla_live){
      window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
    }

    /*  ----------------
      Experiment code 
      ------------------ */
    addIconOnQuestions();
    clickEventsOnQuestions();
  }
  

};
