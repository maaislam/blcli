/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { createBanner, showBanner, hideBanner, } from './components/stockBanner';
import { setup, bootsEvents, fireBootsEvent } from '../../../../../core-files/services';
import upsellProducts from './components/upsellProducts';
import shared from '../../../../../core-files/shared';


export default () => {
  const { ID, VARIATION } = shared;

  const testID = `${ID}| OOS recs - redesign`; // same as triggers.js
  const testVariant = `${VARIATION === 'control' ? 'Control' : `V${VARIATION}`}`;
  const testIDAndVariant = `${testID}|${testVariant}`;

  bootsEvents.initiate = true;
  bootsEvents.methods = ['datalayer'];
  bootsEvents.property = 'G-C3KVJJE2RH';
  bootsEvents.testID = testIDAndVariant;

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION !== 'Control') {
    createBanner();
    showBanner();
    hideBanner();
    upsellProducts();
  }

};
