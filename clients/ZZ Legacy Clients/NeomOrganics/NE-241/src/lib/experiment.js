/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { elementIsInView } from '../../../../../lib/utils';
import debounce from 'lodash/debounce';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  const element = document.querySelector('.section .columns');

	if(element) {
    if(elementIsInView(element, false)) {
      fireEvent('In View', true);
    }

    window.addEventListener('scroll', debounce(() => {
      if(elementIsInView(element, false)) {
        fireEvent('In View', true);
      }
    }, 100));
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }
  
};
