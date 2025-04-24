/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from './shared';
import handleProducts from './handleProducts';
import addProductEvents from './addProductEvents';
import { setup, fireEvent } from './services';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();
  // Write experiment code here
  fireEvent('Conditions met');
  if (VARIATION == '1') {
    handleProducts();
    addProductEvents();
  }
};
