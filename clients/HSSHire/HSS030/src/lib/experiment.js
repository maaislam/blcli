/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import shared from './shared';
import { setup, fireEvent } from './services';
import setupBranches from './setupBranches';
import overlay from './overlay';
import elements from './elements';

export default () => {
  setup();
  // Write experiment code here
  if (elements.branchesContainers && elements.branches) {
    fireEvent('Conditions met');
    // If is control, do nothing.
    if (shared.VARIATION == 'control') {
      return;
    }
    setupBranches();
    overlay.init();
  }
};
