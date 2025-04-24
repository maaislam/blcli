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
import topContent from './topContent';
import { checkPurchaseMade, storeLastViewed } from './helpers';

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

  const sessionCount = () => {
    if (localStorage.getItem("BOcount") === null) {
      sessionStorage.setItem("BOcount", 's');
      localStorage.setItem("BOcount", 's');
    }
    else if (sessionStorage.getItem("BOcount") === null) {
      var lsCount = localStorage.getItem("BOcount");
      sessionStorage.setItem("BOcount", lsCount + 's');
      localStorage.setItem("BOcount", lsCount + 's');
    }
    
    var sessionRetrieve = sessionStorage.getItem("BOcount");
    return sessionRetrieve.length;
  }

   // purchase tracking
   if(VARIATION === '1' || VARIATION === '2') {
    sessionCount();
    checkPurchaseMade();

     // if new user has been stored, start storing page visits
    if(sessionStorage.getItem("BOcount").indexOf('ss') > -1) {
      localStorage.setItem(`${ID}-userType`, 'returning');
    }
  }

    
  // If homepage
    const url = window.location.href;
    if(url === 'https://www.boots.com/' || url.indexOf('https://www.boots.com/?') > -1) {
      topContent();

      if(VARIATION !== 'control') {
        // set first time stamp
        let timeSet = false;
        if(!localStorage.getItem(`${ID}-time`)) {
            localStorage.setItem(`${ID}-time`, (new Date()).getTime())
            timeSet = true;
        }
      }

      // tracking
      const allButtons = document.querySelectorAll(`.${ID}-buttons .${ID}-button`);
      if(allButtons) {
        for (let index = 0; index < allButtons.length; index += 1) {
          const element = allButtons[index];
          element.addEventListener('click', (e) => {
            fireEvent('Clicked CTA' + e.currentTarget.innerText.trim());
          });
        }
      }

      const allOffers = document.querySelectorAll(`.${ID}-offers .${ID}-offer`);
      if(allOffers) {
        for (let i = 0; i < allOffers.length; i += 1) {
          const offer = allOffers[i];
          offer.addEventListener('click', (e) => {
            fireEvent('Clicked Offer');
          });
        }
      }

    } else {
      if(VARIATION !== 'control') {

        // if a department PLP page
        const urlReg = window.location.pathname.match(/((\/)(health-pharmacy|beauty|fragrance|baby-child|wellness|toiletries|electrical|mens|christmas).*)/);
        if(urlReg) {
          storeLastViewed();
        }
        
      }
    }
    
};
