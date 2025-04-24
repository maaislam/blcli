/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from './shared';
import { setup, fireEvent } from './services';
import checkModalChange from './checkModalChange';
import addModalElements from './addModalElements';
import staticEvents from './staticEvents';
import elements from './elements';

export default () => {
  setup();

  // Write experiment code here
  
  // Fire event for conditions met
  fireEvent('Conditions met');

  // Do nothing on control
  if (shared.VARIATION != 'control') {
    addModalElements();
    checkModalChange();
    staticEvents();
  }
};
