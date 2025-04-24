/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  fireEvent('Activated');

  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  const filters = document.querySelector('.grid.grid__table');
  if(filters) {
    filters.classList.add('-mfilters-active');
  }
};
