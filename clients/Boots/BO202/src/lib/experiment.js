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
import Accordion from './components/accordion';
import Tabs from './components/tabs';
import { allContentTracking } from './helpers';
import OffersCarousel from './components/offers';

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

  window.addEventListener('load', () => {

    fireEvent('Code Triggered');

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

    
      if(VARIATION === '1' || VARIATION === '2') {
        new Accordion();
        allContentTracking();
      } else {
        new Tabs();
        allContentTracking();
      }


      if(VARIATION === '4') {
        new OffersCarousel();
      }

      fireEvent('Homepage Viewed');

  });
  

};
