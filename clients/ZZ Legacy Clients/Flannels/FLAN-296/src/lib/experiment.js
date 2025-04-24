/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';
import checkModalChange from './checkModalChange';
import checkBasketChange from './checkBasketChange';
import updateProducts from './updateProducts';
import addTracking from './addTracking';
import addHammerJS from './addHammerJS';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  checkModalChange();
  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...
  checkBasketChange();
  updateProducts();
  addHammerJS();
};