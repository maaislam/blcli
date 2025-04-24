/**
 * BO087 - Disable OOS at PLP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.boots.com/beauty/makeup/eyes
 * https://www.boots.com/sitesearch?searchTerm=mascara%20milani
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';
import shared from '../../../../../core-files/shared';
import { checkListProductsAndUpdate, getPageType } from './helpers';

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
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  checkListProductsAndUpdate();

  if (getPageType() == `${ID}-srp`
  && !document.querySelector(`body.${ID}-plpObserver`)) {
    observer.connect(document.querySelector('ul.grid_mode.grid'), () => {
      setTimeout(() => {
        checkListProductsAndUpdate();
      }, 1000);

      document.querySelector('body').classList.add(`${ID}-plpObserver`);
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  }
};
