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
import { getData, pageType } from './helpers';

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
    return;
  }


  /**
   * 1. PLP - Start of journey. Store object
   */
  if(pageType() === 'plp') {
    // Put the object into storage - change to stare any plp amd pdp 
    if(!sessionStorage.getItem(`${ID}-journey`)) {
      const journeyObj = [
        {'plp': window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
         'pdp': ''
        }
      ];

      sessionStorage.setItem(`${ID}-journey`, JSON.stringify(journeyObj));
    }

     /**
      * 3. PLP - if plp matches this one and pdp has been visited add recs
      */
     else {
        const journeyObj = JSON.parse(sessionStorage.getItem(`${ID}-journey`));

        if(journeyObj[0].pdp && window.location.href.indexOf(journeyObj[0].plp) > -1) {

          const lastProduct = document.querySelector(`#estores_product_listing_widget a[href*="${journeyObj[0].pdp}"]`);
          if(lastProduct) {
            fireEvent('Intercept Shown');
            // Pull in data from current PLP if it matches
            if(VARIATION === '1') { //  && window.location.href.indexOf(journeyObj[0].plp) > -1 if only to show on matching PLP
              getData(`https://octopus-app-c6o8t.ondigitalocean.app/dynamic-navigation/data/${journeyObj[0].plp}`);
            }
            if(VARIATION === '2') {
              const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/
              const PDPcode = journeyObj[0].pdp.match(PDPRE)[2]; 
              if(PDPcode) {
                getData(`https://octopus-app-c6o8t.ondigitalocean.app/compare-similar-items/${PDPcode}/`);
              }
            }
          }
        }
     }
    
  }

  /**
   * 2. PDP - If on PDP store new PDP
   */
  if(pageType() === 'pdp') {
    if(sessionStorage.getItem(`${ID}-journey`)) {

      // if the last page was plp in storage, update storage
      const parseJourney = JSON.parse(sessionStorage.getItem(`${ID}-journey`));

        const pdpURL = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const updatedObj = [
          {'plp': parseJourney[0]['plp'],
           'pdp': pdpURL
          }
        ];
        sessionStorage.setItem(`${ID}-journey`, JSON.stringify(updatedObj));
    }
  }

};
