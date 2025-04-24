/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { cookieOpt, setup } from './services';
import shared from './shared';
import CarouselMarkup from './markup';
import carousels from './carousels';
import inGrid from './inGrid';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
   new CarouselMarkup();
   carousels();

   if(VARIATION === '2') {
    // wait for products to have been pulled in before replacing content
    pollerLite([`.${ID}-tabCarousel[tab-data="new"] .${ID}-product`, `.${ID}-tabCarousel[tab-data="seasonal"] .${ID}-product`, `.${ID}-tabCarousel[tab-data="bestsellers"] .${ID}-product`], () => {
      inGrid();
    });
  }
  

};
