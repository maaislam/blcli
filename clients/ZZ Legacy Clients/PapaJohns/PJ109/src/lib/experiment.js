/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from './shared';
import { setup, fireEvent } from './services';
import handlePage from './handlePage';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  fireEvent('Conditions met');
  // Write experiment code here
  if (VARIATION == '1') {
    handlePage();
  }
};
