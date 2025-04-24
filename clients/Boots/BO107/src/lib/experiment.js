/**
 * BO107 - PDP Video
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.boots.com/dyson-supersonic-hairdryer-fuchsia-10217723
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
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
    pollerLite(['#estore_product_video'], () => {
      
      fireEvent('Control Conditions Met - Video Exists');
      
    });
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  pollerLite(['#estore_product_video'], () => {
    const prodVideoEl = document.querySelector('#estore_product_video');
    prodVideoEl.setAttribute('style', 'float: unset !important;max-width: 550px !important; margin: 60px auto 0 !important');

    document.querySelector('.row.template_row_spacer').insertAdjacentHTML('afterbegin', `<div class="${ID}-product-video__wrapper"></div>`);
    document.querySelector(`.${ID}-product-video__wrapper`).insertAdjacentElement('afterbegin', prodVideoEl);

    fireEvent('V1 Conditions Met - Video Exists');
    if (document.querySelector(`.${ID}-product-video__wrapper`)) {
      let jQuery = null;
      jQuery = window.jQuery || window.$;
      jQuery(window).blur(function () {
        // check focus
        if (jQuery('iframe').is(':focus')) {
          fireEvent('Click - User clicked on video');
        }           
      });

    }
    
  });

  
};
