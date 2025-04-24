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
import Markup from './markup';
import recommendations from './recommendations';

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
    // 
  } else {

    document.body.insertAdjacentHTML('beforeend',  `<div class="${ID}-overlay"></div>`);

    new Markup();

    if(document.querySelector(`.${ID}-video video`)) {
      document.querySelector(`.${ID}-video video`).load();
    }

    pollerLite(['.rrPlacements[id*="rec1"]'], () => {
      recommendations();
    });

  }

  var maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var percentagesArr = [25,50,75,100];
  const showed = {};
  let timeout;
  let previousPercentage;
  window.addEventListener("scroll", function (event) {
      var scrollVal = this.scrollY;
      var scrollPercentage = Math.round(scrollVal / maxScrollHeight * 100);
      let currentPercentage = 0;
      let i = 0;
      while(percentagesArr[i] <= scrollPercentage) {
        currentPercentage = percentagesArr[i++];
      }
      if (previousPercentage !== currentPercentage) {
          clearTimeout(timeout);
          timeout = currentPercentage !== 0 && !showed[currentPercentage]
            ? setTimeout(() => {
                fireEvent(`User scrolled ${currentPercentage}% of the page`);
                showed[currentPercentage] = true;
              }, 1000)
            : null;
          previousPercentage = currentPercentage;
      }
  });
  
  window.addEventListener("resize", () => {
    maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  })

};
