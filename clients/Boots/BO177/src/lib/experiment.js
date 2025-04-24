/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import SignUpBanner from './signUp';
import type from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  document.addEventListener('DOMContentLoaded', function(){

    if (sessionStorage.getItem(`${ID}`) !== "Fired"){
    
      window.cmCreateManualLinkClickTag(`/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`);
     
      sessionStorage.setItem(`${ID}`, "Fired");
    }
      
  });

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

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if(type === 'parentClub') {
    sessionStorage.setItem('parentClub', true);
  }   

  if(type === 'account') {
    if(sessionStorage.getItem('parentClub')) {
      new SignUpBanner();
    }
  }

  if(type === 'register') {
    if(document.referrer.indexOf('/parenting-club') > -1) {
      document.documentElement.classList.add(`${ID}-clubSign`);
      new SignUpBanner();
      // if form
      const returningTitle = document.querySelector('#gigya-login-form .gigya-layout-cell.responsive.with-social-login h2');
      returningTitle.outerHTML = `<h2>Sign in and register to the club</h2><p>Already part of the Boots family? Sign in to register for Boots Parenting Club</p>`;
    }
  }

};
