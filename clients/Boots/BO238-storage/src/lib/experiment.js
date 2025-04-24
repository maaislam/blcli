/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

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
   * Storage
   */

   if (!localStorage.getItem(`${ID}-RecentlyViewedCategories`)){
    localStorage.setItem(`${ID}-RecentlyViewedCategories`, "[]");
   } 

   const isPLP = document.querySelector("#estore_lister_template_container");
    if (isPLP && localStorage.getItem(`${ID}-RecentlyViewedCategories`) && window.location.href.indexOf('facet') === -1) {
      let recentlyViewedItems = JSON.parse(localStorage.getItem(`${ID}-RecentlyViewedCategories`));

      if (recentlyViewedItems.length === 6) {
        recentlyViewedItems.shift();
      }
      if (recentlyViewedItems.length < 7) {
        const PLPURL =  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const newItems = [...recentlyViewedItems, PLPURL];

        if (!recentlyViewedItems.includes(PLPURL)) {
          localStorage.setItem(`${ID}-RecentlyViewedCategories`, JSON.stringify(newItems));
        }
      }
    }

};
