/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { createBanner, showBanner, hideBanner, } from './components/stockBanner';
import { setup, fireEvent } from '../../../../../core-files/services';
import upsellProducts from './components/upsellProducts';
import shared from '../../../../../core-files/shared';


export default () => {
  const { ID, VARIATION } = shared;

  setup();
  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if(VARIATION !== 'Control') {

    createBanner();
    showBanner();
    hideBanner();
    upsellProducts();
    //addEvent();
  }

};
