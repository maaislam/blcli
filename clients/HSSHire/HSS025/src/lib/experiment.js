/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import checkCartChange from './checkCartChange';

export default () => {
  setup();
  fireEvent('Conditions met');
  checkCartChange();
};
