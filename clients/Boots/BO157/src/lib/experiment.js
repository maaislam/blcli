/**
 * BO157 - PLP Product Card
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, observer } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import { addOfferClickEvents } from './helpers';

const activate = () => {
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
    pollerLite(['span.plp-promotion-redesign'], () => {
      addOfferClickEvents();
    });
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  pollerLite(['span.plp-promotion-redesign'], () => {
    addOfferClickEvents();
  });

  

};

export default activate;
