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

const { ID, VARIATION } = shared;

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent(`Interaction - page has loaded`);
};
