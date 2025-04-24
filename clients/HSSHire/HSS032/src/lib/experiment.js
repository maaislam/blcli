/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import handleFunctionality from './handleFunctionality';

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  handleFunctionality();
};
