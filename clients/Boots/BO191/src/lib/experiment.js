/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import heroFilters from './components/heroFilters';
import quicklinks from './components/quicklinks';

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
  const addHeroLinksBar = () => {
    const bar = `
    <div class="${ID}-topLinks">
      <div class="${ID}-quickLinks">
        <div class="${ID}-container"></div>
      </div>
      <div class="${ID}-heroFilters">
        <div class="${ID}-container"></div>
      </div>
    </div>`;

    if(!document.querySelector(`.${ID}-topLinks`)) {
     document.querySelector('#estores_product_listing_widget').insertAdjacentHTML('beforebegin', bar);
    }
  }

  addHeroLinksBar();
  heroFilters();

  if(VARIATION !== '3') {
    quicklinks();
  }

};
