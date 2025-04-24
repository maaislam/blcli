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
import { checkPurchaseMade, sessionCount, storeLastViewed, tracking } from './helpers';

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
    const url = window.location.href;
    if(url === 'https://www.boots.com/' || url.indexOf('https://www.boots.com/?') > -1) {
    fireEvent('Viewed Homepage');
    const heroBannerSlides = document.querySelectorAll('.oct-carousel-hero__inner a');
    if(heroBannerSlides) {
      for (let index = 0; index < heroBannerSlides.length; index++) {
        const element = heroBannerSlides[index];
        element.addEventListener('click', () => {
          fireEvent('Clicked hero banner links');
        })
      }
      }
    }
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  

  if(VARIATION === '1' || VARIATION === '3' || VARIATION === '4') {
    const url = window.location.href;
    if(url === 'https://www.boots.com/' || url.indexOf('https://www.boots.com/?') > -1) {
    topContent();
    fireEvent('Viewed Homepage');
    }
    tracking();
  }

  if(VARIATION === '2') {
    sessionCount();
    checkPurchaseMade();

     // if new user has been stored, start storing page visits
    if(sessionStorage.getItem("BOcount").indexOf('ss') > -1) {
      localStorage.setItem(`${ID}-userType`, 'returning');
    }

    const url = window.location.href;
    if(url === 'https://www.boots.com/' || url.indexOf('https://www.boots.com/?') > -1) {
      topContent();
      fireEvent('Viewed Homepage');

      let timeSet = false;
      if(!localStorage.getItem(`${ID}-time`)) {
          localStorage.setItem(`${ID}-time`, (new Date()).getTime())
          timeSet = true;
      }
      
    } else {
      const urlReg = window.location.pathname.match(/((\/)(health-pharmacy|beauty|fragrance|baby-child|wellness|toiletries|electrical|mens|christmas).*)/);
      if(urlReg) {
        // PLP
        pollerLite(['#estores_product_listing_widget'], () => {
          storeLastViewed();
        });

        // Department page
        pollerLite(['.oct-template','.oct-navigation__side'], () => {
          storeLastViewed();
        });

      }
    }

    tracking();
  }

};
