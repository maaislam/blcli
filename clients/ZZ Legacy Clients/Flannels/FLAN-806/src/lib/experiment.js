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

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met - page URL: '+window.location.href);
};
