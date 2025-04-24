/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';

export default () => {

  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'SD029 Control', 'SD029 Control is active');

    const adBanner = document.querySelector('.basketad');
    adBanner.addEventListener('click', () => {
      events.send(ID, 'SD029 Click', 'SD029 User clicked on ad banner');
    });
    return false;
  } else {
    events.send(ID, `SD029 Variation ${VARIATION}`, `SD029 Variation ${VARIATION} is active`);
  }

  setup();

  // Write experiment code here
};
