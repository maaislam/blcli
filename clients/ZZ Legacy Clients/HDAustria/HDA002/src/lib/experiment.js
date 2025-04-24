/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  // -----------------------------
  // Event Tracking for AA Test
  // -----------------------------
  fireEvent('Conditions Met', true);

  // -----------------------------
  // Page Load event
  // -----------------------------
  window.addEventListener('load', (event) => {
    const diff = Date.now() - window.performance.timing.navigationStart;

		fireEvent('Page Load - ' + diff, true);
	});


  // -----------------------------
  // Time to first byte event
  // -----------------------------
	if(window.performance && window.performance.timing) {
    fireEvent(
      'TTFB - ' + (window.performance.timing.responseStart - window.performance.timing.fetchStart),
      true
    );
  }
};
